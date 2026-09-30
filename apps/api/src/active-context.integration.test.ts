import "dotenv/config";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("active context from server grants", () => {
  const database = new PrismaService();
  const codes = new Map<string, string>();
  const identity = new IdentityCore(database, {
    async send(phone, code) { codes.set(phone, code); }
  }, "test-secret-with-at-least-thirty-two-characters");
  const resolver = new ActiveContextResolver(database);
  const phone = () => `+1555${randomInt(1_000_000, 9_999_999)}`;

  beforeAll(async () => database.$connect());
  afterAll(async () => database.$disconnect());

  async function signIn() {
    const number = phone();
    await identity.requestCode(number);
    return identity.verifyCode(number, codes.get(number) ?? "");
  }

  it("rejects another user's grant and rechecks revocation on every read", async () => {
    const first = await signIn();
    const second = await signIn();
    const organization = await database.organization.create({ data: { kind: "corporate_buyer" } });
    const grant = await database.roleGrant.create({ data: {
      userId: first.userId, role: "corporate_buyer", organizationId: organization.id
    } });

    expect(await resolver.select(second.sessionToken, grant.id)).toBeNull();
    expect(await resolver.resolve(second.sessionToken)).toBeNull();
    expect(await resolver.select(first.sessionToken, grant.id)).toEqual({
      userId: first.userId, activeRole: "corporate-buyer", organizationId: grant.organizationId
    });
    await database.roleGrant.update({ where: { id: grant.id }, data: { revokedAt: new Date() } });
    expect(await resolver.resolve(first.sessionToken)).toBeNull();
  });

  it("takes staff domains from live database grants rather than a session claim", async () => {
    const { userId, sessionToken } = await signIn();
    const grant = await database.roleGrant.create({ data: { userId, role: "staff" } });
    expect(await resolver.select(sessionToken, grant.id)).toEqual({
      userId, activeRole: "staff", staffPermissionDomains: []
    });
    const permission = await database.staffDomainGrant.create({ data: { roleGrantId: grant.id, domain: "finance" } });
    expect(await resolver.resolve(sessionToken)).toMatchObject({ staffPermissionDomains: ["finance"] });
    await database.staffDomainGrant.delete({ where: { id: permission.id } });
    expect(await resolver.resolve(sessionToken)).toMatchObject({ staffPermissionDomains: [] });
    await identity.revokeSession(sessionToken);
    expect(await resolver.resolve(sessionToken)).toBeNull();
  });

  it("fails closed for an invalid role scope", async () => {
    const { userId, sessionToken } = await signIn();
    const grant = await database.roleGrant.create({ data: { userId, role: "export_partner" } });
    expect(await resolver.select(sessionToken, grant.id)).toBeNull();
    expect(await resolver.resolve(sessionToken)).toBeNull();
  });

  it("resolves Export Partner scope from the registered organization and rejects legacy unregistered scope", async () => {
    const { userId, sessionToken } = await signIn();
    const unregistered = await database.roleGrant.create({ data: {
      userId, role: "export_partner", exportPartnerId: randomUUID()
    } });
    expect(await resolver.select(sessionToken, unregistered.id)).toBeNull();

    const organization = await database.organization.create({ data: { kind: "export_partner" } });
    const grant = await database.roleGrant.create({ data: {
      userId, role: "export_partner", organizationId: organization.id
    } });
    expect(await resolver.select(sessionToken, grant.id)).toEqual({
      userId, activeRole: "export-partner", exportPartnerId: organization.id
    });
  });

  it("fails closed when the organization kind does not match the granted role", async () => {
    const { userId, sessionToken } = await signIn();
    const organization = await database.organization.create({ data: { kind: "service_partner" } });
    const grant = await database.roleGrant.create({ data: {
      userId, role: "corporate_buyer", organizationId: organization.id
    } });
    expect(await resolver.select(sessionToken, grant.id)).toBeNull();
    expect(await resolver.resolve(sessionToken)).toBeNull();
  });
});
