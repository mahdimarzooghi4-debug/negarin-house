import "dotenv/config";
import "reflect-metadata";
import { randomInt } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("Artist service request HTTP contract", () => {
  let app: NestFastifyApplication;
  const database = new PrismaService();
  const codes = new Map<string, string>();
  const identity = new IdentityCore(database, {
    async send(phone, code) { codes.set(phone, code); }
  }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(database);

  async function signIn(role: "artist" | "staff" | "customer", services = false) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone);
    const user = await identity.verifyCode(phone, codes.get(phone) ?? "");
    const grant = await database.roleGrant.create({ data: { userId: user.userId, role } });
    if (role === "staff" && services) {
      await database.staffDomainGrant.create({ data: { roleGrantId: grant.id, domain: "services" } });
    }
    await contexts.select(user.sessionToken, grant.id);
    return { authorization: `Bearer ${user.sessionToken}`, userId: user.userId };
  }

  beforeAll(async () => {
    app = await createApplication();
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    await database.$connect();
  });
  afterAll(async () => { await app?.close(); await database.$disconnect(); });

  it("lets an Artist submit and read only their own request while Admin assignment is reflected", async () => {
    const artist = await signIn("artist");
    const otherArtist = await signIn("artist");
    const staff = await signIn("staff", true);
    const create = (payload: object, headers = artist) => app.inject({
      method: "POST", url: "/api/v1/artist/service-requests", headers, payload
    });

    const created = await create({ title: "  عکاسی محصول  ", description: "  تصویرهای کاتالوگ  " });
    expect(created.statusCode).toBe(201);
    expect(created.headers["cache-control"]).toBe("no-store");
    expect(created.json()).toMatchObject({ title: "عکاسی محصول", description: "تصویرهای کاتالوگ", assignedAt: null });
    const stored = await database.serviceRequest.findUnique({ where: { id: created.json().requestId } });
    expect(stored?.requestedByArtistUserId).toBe(artist.userId);
    expect(stored?.createdByUserId).toBe(artist.userId);

    expect((await app.inject({ method: "GET", url: "/api/v1/artist/service-requests", headers: otherArtist })).json()).toEqual([]);
    expect((await app.inject({ method: "GET", url: "/api/v1/artist/service-requests", headers: staff })).statusCode).toBe(403);
    expect((await app.inject({ method: "POST", url: "/api/v1/artist/service-requests", headers: staff, payload: { title: "خدمت" } })).statusCode).toBe(403);
    expect((await app.inject({ method: "POST", url: "/api/v1/artist/service-requests", payload: { title: "بدون نشست" } })).statusCode).toBe(401);
    expect((await create({ title: "  " })).statusCode).toBe(400);
    expect((await create({ title: "درخواست", extra: true })).statusCode).toBe(400);
    expect((await create({ title: "درخواست", description: "x".repeat(5001) })).statusCode).toBe(400);

    const options = await app.inject({ method: "GET", url: "/api/v1/admin/service-assignments/options", headers: staff });
    expect(options.json().requests).toEqual(expect.arrayContaining([expect.objectContaining({ id: created.json().requestId })]));
    const partner = await database.organization.create({ data: { kind: "service_partner", displayName: "Service Partner" } });
    const assignment = await app.inject({ method: "POST", url: "/api/v1/admin/service-assignments", headers: staff, payload: {
      requestId: created.json().requestId, partnerOrganizationId: partner.id
    } });
    expect(assignment.statusCode).toBe(201);
    const ownRequests = await app.inject({ method: "GET", url: "/api/v1/artist/service-requests", headers: artist });
    expect(ownRequests.json()).toEqual([expect.objectContaining({
      requestId: created.json().requestId,
      title: "عکاسی محصول",
      assignedAt: expect.any(String)
    })]);
    expect(ownRequests.json()[0]).not.toHaveProperty("partnerOrganizationId");
  });
});
