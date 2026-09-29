import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("Staff Service Partner assignment authoring HTTP contract", () => {
  let app: NestFastifyApplication;
  const database = new PrismaService();
  const codes = new Map<string, string>();
  const identity = new IdentityCore(database, {
    async send(phone, code) { codes.set(phone, code); }
  }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(database);

  async function signInStaff(domains: string[]) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone);
    const user = await identity.verifyCode(phone, codes.get(phone) ?? "");
    const grant = await database.roleGrant.create({ data: { userId: user.userId, role: "staff" } });
    if (domains.length) await database.staffDomainGrant.createMany({
      data: domains.map((domain) => ({ roleGrantId: grant.id, domain }))
    });
    await contexts.select(user.sessionToken, grant.id);
    return { authorization: `Bearer ${user.sessionToken}`, userId: user.userId };
  }

  async function createPartnerMember(organizationId: string) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone);
    const user = await identity.verifyCode(phone, codes.get(phone) ?? "");
    await database.roleGrant.create({ data: {
      userId: user.userId, role: "service_partner", organizationId
    } });
    return user.userId;
  }

  beforeAll(async () => {
    app = await createApplication();
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    await database.$connect();
  });
  afterAll(async () => { await app?.close(); await database.$disconnect(); });

  it("lets services staff append assignments and records the author", async () => {
    const organization = await database.organization.create({ data: { kind: "service_partner" } });
    const memberId = await createPartnerMember(organization.id);
    const request = await database.serviceRequest.create({
      data: { partnerTitle: "Packing assistance", partnerSummary: "Prepare assigned items." }
    });
    const staff = await signInStaff(["services"]);
    const post = (payload: Record<string, unknown>, headers = staff) => app.inject({
      method: "POST", url: "/api/v1/admin/service-assignments", headers,
      payload: payload as object
    });

    const response = await post({ requestId: request.id, partnerOrganizationId: organization.id });
    expect(response.statusCode).toBe(201);
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.json()).toMatchObject({
      requestId: request.id,
      title: "Packing assistance",
      summary: "Prepare assigned items.",
      partnerOrganizationId: organization.id,
      assignedPartnerUserId: null,
      assignedByUserId: staff.userId
    });
    const stored = await database.serviceAssignment.findUnique({ where: { id: response.json().assignmentId } });
    expect(stored?.assignedByUserId).toBe(staff.userId);

    const userAssignment = await post({
      requestId: request.id,
      partnerOrganizationId: organization.id,
      assignedPartnerUserId: memberId
    });
    expect(userAssignment.statusCode).toBe(201);
    expect(userAssignment.json()).toMatchObject({ assignedPartnerUserId: memberId, assignedByUserId: staff.userId });
  });

  it("rejects missing membership, wrong staff domain, bad input, and unauthenticated writes", async () => {
    const organization = await database.organization.create({ data: { kind: "service_partner" } });
    const request = await database.serviceRequest.create({ data: { partnerTitle: "Local request" } });
    const staff = await signInStaff(["products"]);
    const payload = { requestId: request.id, partnerOrganizationId: organization.id };

    const noDomain = await app.inject({ method: "POST", url: "/api/v1/admin/service-assignments", headers: staff, payload });
    expect(noDomain.statusCode).toBe(403);
    expect((await app.inject({ method: "POST", url: "/api/v1/admin/service-assignments", payload })).statusCode).toBe(401);
    expect((await app.inject({ method: "POST", url: "/api/v1/admin/service-assignments", headers: staff,
      payload: { ...payload, extra: true } })).statusCode).toBe(400);
    expect((await app.inject({ method: "POST", url: "/api/v1/admin/service-assignments", headers: staff,
      payload: { ...payload, assignedPartnerUserId: randomUUID() } })).statusCode).toBe(400);

    const servicesStaff = await signInStaff(["services"]);
    expect((await app.inject({ method: "POST", url: "/api/v1/admin/service-assignments", headers: servicesStaff,
      payload: { ...payload, assignedPartnerUserId: randomUUID() } })).statusCode).toBe(400);
    expect((await app.inject({ method: "POST", url: "/api/v1/admin/service-assignments", headers: servicesStaff,
      payload: { ...payload, requestId: randomUUID() } })).statusCode).toBe(404);
    const wrongOrganization = await database.organization.create({ data: { kind: "corporate_buyer" } });
    expect((await app.inject({ method: "POST", url: "/api/v1/admin/service-assignments", headers: servicesStaff,
      payload: { ...payload, partnerOrganizationId: wrongOrganization.id } })).statusCode).toBe(404);
  });
});
