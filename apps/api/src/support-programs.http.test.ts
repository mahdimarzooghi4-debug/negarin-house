import "dotenv/config";
import "reflect-metadata";
import { randomInt } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("Supporting Organization support program HTTP contract", () => {
  let app: NestFastifyApplication;
  const database = new PrismaService();
  const codes = new Map<string, string>();
  const identity = new IdentityCore(database, {
    async send(phone, code) { codes.set(phone, code); }
  }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(database);

  async function signIn(role: "supporting_organization" | "artist", organizationId?: string) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone);
    const user = await identity.verifyCode(phone, codes.get(phone) ?? "");
    const grant = await database.roleGrant.create({ data: { userId: user.userId, role, organizationId } });
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

  it("creates and lists programs only inside the active Supporting Organization scope", async () => {
    const orgA = await database.organization.create({ data: { kind: "supporting_organization", displayName: "Org A" } });
    const orgB = await database.organization.create({ data: { kind: "supporting_organization", displayName: "Org B" } });
    const orgAMember = await signIn("supporting_organization", orgA.id);
    const orgBMember = await signIn("supporting_organization", orgB.id);
    const artist = await signIn("artist");

    const create = (payload: object, headers = orgAMember) => app.inject({
      method: "POST", url: "/api/v1/supporting-organization/programs", headers, payload
    });
    const created = await create({ name: "  آموزش سفال  ", description: "  دورهٔ آموزشی  " });
    expect(created.statusCode).toBe(201);
    expect(created.headers["cache-control"]).toBe("no-store");
    expect(created.json()).toMatchObject({ name: "آموزش سفال", description: "دورهٔ آموزشی" });
    expect(created.json()).not.toHaveProperty("organizationId");
    expect((await database.supportProgram.findUnique({ where: { id: created.json().id } }))?.organizationId).toBe(orgA.id);

    expect((await app.inject({ method: "GET", url: "/api/v1/supporting-organization/programs", headers: orgAMember })).json())
      .toEqual([expect.objectContaining({ id: created.json().id, name: "آموزش سفال" })]);
    expect((await app.inject({ method: "GET", url: "/api/v1/supporting-organization/programs", headers: orgBMember })).json()).toEqual([]);
    expect((await app.inject({ method: "GET", url: "/api/v1/supporting-organization/programs", headers: artist })).statusCode).toBe(403);
    expect((await app.inject({ method: "POST", url: "/api/v1/supporting-organization/programs", headers: artist, payload: { name: "X" } })).statusCode).toBe(403);
    expect((await app.inject({ method: "GET", url: "/api/v1/supporting-organization/programs" })).statusCode).toBe(401);
    expect((await create({ name: "   " })).statusCode).toBe(400);
    expect((await create({ name: "Valid", extra: true })).statusCode).toBe(400);
    expect((await create({ name: "Valid", description: "x".repeat(5001) })).statusCode).toBe(400);
  });
});
