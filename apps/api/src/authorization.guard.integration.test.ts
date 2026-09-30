import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import {
  Controller, Get, Module, Param, Req, UseGuards
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, type NestFastifyApplication } from "@nestjs/platform-fastify";
import { canEditArtistProduct, canReadArtistDomesticFinance } from "@negarin/authz";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ActiveContextResolver } from "./active-context.js";
import { AuthorizationGuard, type AuthorizedRequest, enforceDecision } from "./authorization.guard.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

const database = new PrismaService();
const owners = new Map<string, string>();

@Controller("test-resources")
@UseGuards(AuthorizationGuard)
class TestResourceController {
  @Get("products/:id")
  product(@Req() request: AuthorizedRequest, @Param("id") id: string) {
    const owner = owners.get(id);
    if (!owner) return { missing: true }; // Test only: the assertions use existing resources.
    enforceDecision(canEditArtistProduct(request.authorizationContext!, { artistUserId: owner }));
    return { id };
  }

  @Get("finance/:id")
  finance(@Req() request: AuthorizedRequest, @Param("id") id: string) {
    const owner = owners.get(id);
    if (!owner) return { missing: true };
    enforceDecision(canReadArtistDomesticFinance(request.authorizationContext!, { artistUserId: owner }));
    return { id };
  }
}

@Module({
  controllers: [TestResourceController],
  providers: [{ provide: PrismaService, useValue: database }, AuthorizationGuard]
})
class TestModule {}

describe("HTTP authorization boundary", () => {
  let app: NestFastifyApplication;
  const codes = new Map<string, string>();
  const identity = new IdentityCore(database, {
    async send(phone, code) { codes.set(phone, code); }
  }, "test-secret-with-at-least-thirty-two-characters");
  const resolver = new ActiveContextResolver(database);

  async function session(role: "artist" | "staff" | "supporting_organization" | "corporate_buyer" | "export_partner", domains: string[] = []) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone);
    const signed = await identity.verifyCode(phone, codes.get(phone) ?? "");
    const organization = role === "supporting_organization" || role === "corporate_buyer"
      ? await database.organization.create({ data: { kind: role } })
      : undefined;
    const grant = await database.roleGrant.create({ data: {
      userId: signed.userId, role,
      ...(organization ? { organizationId: organization.id } : {}),
      ...(role === "export_partner" ? { exportPartnerId: randomUUID() } : {}),
      staffDomains: { create: domains.map((domain) => ({ domain })) }
    } });
    await resolver.select(signed.sessionToken, grant.id);
    return { ...signed, grant };
  }

  beforeAll(async () => {
    app = await NestFactory.create<NestFastifyApplication>(TestModule, new FastifyAdapter(), { logger: false });
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });
  afterAll(async () => app?.close());

  it("requires a live server grant and conceals another artist's product", async () => {
    const owner = await session("artist");
    const other = await session("artist");
    const id = randomUUID();
    owners.set(id, owner.userId);
    const url = `/test-resources/products/${id}`;
    const call = (token?: string) => app.inject({ method: "GET", url,
      headers: token ? { authorization: `Bearer ${token}` } : {} });

    expect((await call()).statusCode).toBe(401);
    expect((await call("invalid")).statusCode).toBe(401);
    expect((await call(other.sessionToken)).statusCode).toBe(404);
    expect((await call(owner.sessionToken)).statusCode).toBe(200);
    await database.roleGrant.update({ where: { id: owner.grant.id }, data: { revokedAt: new Date() } });
    expect((await call(owner.sessionToken)).statusCode).toBe(401);
  });

  it("returns 403 to staff without finance permission and rereads changes", async () => {
    const artist = await session("artist");
    const staff = await session("staff");
    const id = randomUUID();
    owners.set(id, artist.userId);
    const call = () => app.inject({ method: "GET", url: `/test-resources/finance/${id}`,
      headers: { authorization: `Bearer ${staff.sessionToken}` } });
    expect((await call()).statusCode).toBe(403);
    const permission = await database.staffDomainGrant.create({ data: {
      roleGrantId: staff.grant.id, domain: "finance"
    } });
    expect((await call()).statusCode).toBe(200);
    await database.staffDomainGrant.delete({ where: { id: permission.id } });
    expect((await call()).statusCode).toBe(403);
  });

  it("denies Supporting Organization access to Artist domestic finance over HTTP", async () => {
    const artist = await session("artist");
    const organization = await session("supporting_organization");
    const id = randomUUID();
    owners.set(id, artist.userId);

    const response = await app.inject({ method: "GET", url: `/test-resources/finance/${id}`,
      headers: { authorization: `Bearer ${organization.sessionToken}` } });

    expect(response.statusCode).toBe(403);
    expect(response.json()).not.toHaveProperty("id");
  });

  it("denies Corporate Buyer access to Artist domestic finance over HTTP", async () => {
    const artist = await session("artist");
    const buyer = await session("corporate_buyer");
    const id = randomUUID();
    owners.set(id, artist.userId);

    const response = await app.inject({ method: "GET", url: `/test-resources/finance/${id}`,
      headers: { authorization: `Bearer ${buyer.sessionToken}` } });

    expect(response.statusCode).toBe(403);
    expect(response.json()).not.toHaveProperty("id");
  });

  it("denies Export Partner access to Artist domestic finance over HTTP", async () => {
    const artist = await session("artist");
    const partner = await session("export_partner");
    const id = randomUUID();
    owners.set(id, artist.userId);

    const response = await app.inject({ method: "GET", url: `/test-resources/finance/${id}`,
      headers: { authorization: `Bearer ${partner.sessionToken}` } });

    expect(response.statusCode).toBe(403);
    expect(response.json()).not.toHaveProperty("id");
  });
});
