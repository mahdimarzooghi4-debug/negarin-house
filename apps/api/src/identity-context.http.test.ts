import "dotenv/config";
import "reflect-metadata";
import { randomInt } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("identity context HTTP contract", () => {
  let app: NestFastifyApplication;
  const database = new PrismaService();
  const codes = new Map<string, string>();
  const identity = new IdentityCore(database, {
    async send(phone, code) { codes.set(phone, code); }
  }, "test-secret-with-at-least-thirty-two-characters");

  async function signIn() {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone);
    return identity.verifyCode(phone, codes.get(phone) ?? "");
  }

  beforeAll(async () => {
    app = await createApplication();
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    await database.$connect();
  });
  afterAll(async () => { await app?.close(); await database.$disconnect(); });

  it("lists only the user's grants, switches context, and reflects revocation", async () => {
    const user = await signIn();
    const other = await signIn();
    const organization = await database.organization.create({ data: { kind: "corporate_buyer" } });
    const grant = await database.roleGrant.create({ data: {
      userId: user.userId, role: "corporate_buyer", organizationId: organization.id
    } });
    const mismatchedOrganization = await database.organization.create({ data: { kind: "service_partner" } });
    const invalidGrant = await database.roleGrant.create({ data: {
      userId: user.userId, role: "corporate_buyer", organizationId: mismatchedOrganization.id
    } });
    const foreign = await database.roleGrant.create({ data: {
      userId: other.userId, role: "artist"
    } });
    const auth = { authorization: `Bearer ${user.sessionToken}` };
    const get = (url: string) => app.inject({ method: "GET", url: `/api/v1/identity/${url}`, headers: auth });
    const select = (grantId: string) => app.inject({ method: "POST", url: "/api/v1/identity/context/select",
      headers: auth, payload: { grantId } });

    expect((await get("context")).statusCode).toBe(401);
    const list = await get("grants");
    expect(list.statusCode).toBe(200);
    expect(list.headers["cache-control"]).toBe("no-store");
    expect(list.json().grants).toEqual([{ id: grant.id, role: "corporate_buyer",
      organizationId: grant.organizationId, exportPartnerId: null }]);
    expect(list.json().activeGrantId).toBeNull();
    expect((await select(foreign.id)).statusCode).toBe(401);
    expect((await select(invalidGrant.id)).statusCode).toBe(401);
    expect((await select("not-a-uuid")).statusCode).toBe(400);
    expect((await select(grant.id)).json()).toEqual({ userId: user.userId,
      activeRole: "corporate-buyer", organizationId: grant.organizationId });
    expect((await get("context")).statusCode).toBe(200);
    await database.roleGrant.update({ where: { id: grant.id }, data: { revokedAt: new Date() } });
    expect((await get("context")).statusCode).toBe(401);
    expect((await get("grants")).json()).toEqual({ activeGrantId: null, grants: [] });
    await identity.revokeSession(user.sessionToken);
    expect((await get("grants")).statusCode).toBe(401);
  });

  it("revokes a bearer session through logout before a role context is selected", async () => {
    const user = await signIn();
    const headers = { authorization: `Bearer ${user.sessionToken}` };
    const logout = () => app.inject({
      method: "POST",
      url: "/api/v1/identity/logout",
      headers
    });

    const response = await logout();
    expect(response.statusCode).toBe(204);
    expect(response.headers["cache-control"]).toBe("no-store");
    expect((await app.inject({
      method: "GET",
      url: "/api/v1/identity/grants",
      headers
    })).statusCode).toBe(401);
    expect((await logout()).statusCode).toBe(401);
  });
});
