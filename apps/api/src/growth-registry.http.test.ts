import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("Growth registry HTTP", () => {
  let app: NestFastifyApplication;
  const db = new PrismaService(), codes = new Map<string, string>();
  const identity = new IdentityCore(db, { async send(phone, code) { codes.set(phone, code); } }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(db);

  async function signIn(role: "artist" | "customer" | "staff" = "artist", domain?: string) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone);
    const verified = await identity.verifyCode(phone, codes.get(phone)!);
    const grant = await db.roleGrant.create({
      data: {
        userId: verified.userId,
        role,
        ...(domain ? { staffDomains: { create: [{ domain }] } } : {})
      }
    });
    await contexts.select(verified.sessionToken, grant.id);
    return { userId: verified.userId, headers: { authorization: `Bearer ${verified.sessionToken}` } };
  }

  beforeAll(async () => {
    app = await createApplication();
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    await db.$connect();
  });

  afterAll(async () => {
    await app?.close();
    await db.$disconnect();
  });

  it("gives Artist the exact canonical Growth taxonomy with no thresholds or purchase controls", async () => {
    const artist = await signIn("artist");
    const response = await app.inject({ method: "GET", url: "/api/v1/artist/growth/levels", headers: artist.headers });
    expect(response.statusCode).toBe(200);
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.json()).toEqual({
      purchasable: false,
      levels: [
        { order: 1, name: "جوانه" },
        { order: 2, name: "شکوفه" },
        { order: 3, name: "سرو زرین" },
        { order: 4, name: "سفیر جهانی" }
      ]
    });
    for (const forbidden of ["threshold", "score", "price", "upgrade", "payment", "service", "training"]) {
      expect(JSON.stringify(response.json()).toLowerCase()).not.toContain(forbidden);
    }
  });

  it("requires the growth staff domain and denies unrelated roles", async () => {
    const growth = await signIn("staff", "growth"), finance = await signIn("staff", "finance"), customer = await signIn("customer");
    const allowed = await app.inject({ method: "GET", url: "/api/v1/admin/growth/levels", headers: growth.headers });
    expect(allowed.statusCode).toBe(200);
    expect(allowed.json().levels.map((x: { name: string }) => x.name)).toEqual(["جوانه", "شکوفه", "سرو زرین", "سفیر جهانی"]);
    expect((await app.inject({ method: "GET", url: "/api/v1/admin/growth/levels", headers: finance.headers })).statusCode).toBe(403);
    expect((await app.inject({ method: "GET", url: "/api/v1/artist/growth/levels", headers: customer.headers })).statusCode).toBe(403);
  });

  it("exposes no Growth purchase, promotion or level-mutation command", async () => {
    const artist = await signIn("artist"), growth = await signIn("staff", "growth");
    const attempts = [
      { method: "POST" as const, url: "/api/v1/artist/growth/levels", headers: artist.headers, payload: { level: "سفیر جهانی" } },
      { method: "POST" as const, url: "/api/v1/artist/growth/purchase", headers: artist.headers, payload: { level: "سفیر جهانی" } },
      { method: "POST" as const, url: "/api/v1/admin/growth/promote", headers: growth.headers, payload: { artistUserId: randomUUID(), level: "شکوفه" } },
      { method: "PATCH" as const, url: "/api/v1/admin/growth/levels/1", headers: growth.headers, payload: { name: "سطح جدید" } }
    ];
    for (const attempt of attempts) {
      const response = await app.inject(attempt);
      expect(response.statusCode).toBe(404);
    }
  });
});
