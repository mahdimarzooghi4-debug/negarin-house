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

  it("returns only real request and Service Partner organization choices to services staff", async () => {
    const organization = await database.organization.create({
      data: { kind: "service_partner", displayName: "بسته‌بندی" }
    });
    const unrelatedOrganization = await database.organization.create({
      data: { kind: "corporate_buyer", displayName: "خریدار سازمانی" }
    });
    const request = await database.serviceRequest.create({
      data: { partnerTitle: "بسته‌بندی سفارش", partnerSummary: "آماده‌سازی بسته." }
    });
    const servicesStaff = await signInStaff(["services"]);
    const options = await app.inject({
      method: "GET", url: "/api/v1/admin/service-assignments/options", headers: servicesStaff
    });
    expect(options.statusCode).toBe(200);
    expect(options.headers["cache-control"]).toBe("no-store");
    const visibleRequest = options.json().requests.find((item: { id: string }) => item.id === request.id);
    expect(visibleRequest).toMatchObject({
      id: request.id, title: "بسته‌بندی سفارش", summary: "آماده‌سازی بسته."
    });
    expect(visibleRequest).not.toHaveProperty("priceToman");
    expect(visibleRequest).not.toHaveProperty("artistUserId");
    expect(options.json().organizations).toContainEqual({ id: organization.id, displayName: "بسته‌بندی" });
    expect(options.json().organizations).not.toContainEqual(expect.objectContaining({ id: unrelatedOrganization.id }));

    const productsStaff = await signInStaff(["products"]);
    expect((await app.inject({
      method: "GET", url: "/api/v1/admin/service-assignments/options", headers: productsStaff
    })).statusCode).toBe(403);
    expect((await app.inject({ method: "GET", url: "/api/v1/admin/service-assignments/options" })).statusCode).toBe(401);
  });

  it("shows only submitted ready deliverables to services staff without exposing storage or actor identifiers", async () => {
    const organization = await database.organization.create({
      data: { kind: "service_partner", displayName: "بسته‌بندی نوین" }
    });
    const partnerUserId = await createPartnerMember(organization.id);
    const request = await database.serviceRequest.create({
      data: { partnerTitle: "آماده‌سازی سفارش", partnerSummary: "بسته‌بندی آثار تخصیص‌یافته." }
    });
    const assignment = await database.serviceAssignment.create({ data: {
      serviceRequestId: request.id,
      partnerOrganizationId: organization.id,
      responseStatus: "accepted"
    } });
    const readyDeliverable = await database.serviceDeliverable.create({ data: {
      assignmentId: assignment.id,
      uploadedByUserId: partnerUserId,
      objectKey: `services/assignments/${assignment.id}/deliverables/${randomUUID()}/ready`,
      fileName: "packing-list.pdf",
      contentType: "application/pdf",
      contentLength: 1200,
      status: "ready"
    } });
    const draftDeliverable = await database.serviceDeliverable.create({ data: {
      assignmentId: assignment.id,
      uploadedByUserId: partnerUserId,
      objectKey: `services/assignments/${assignment.id}/deliverables/${randomUUID()}/unsent`,
      fileName: "draft.pdf",
      contentType: "application/pdf",
      contentLength: 900,
      status: "ready"
    } });
    const pendingDeliverable = await database.serviceDeliverable.create({ data: {
      assignmentId: assignment.id,
      uploadedByUserId: partnerUserId,
      objectKey: `services/assignments/${assignment.id}/deliverables/${randomUUID()}/pending`,
      fileName: "uploading.pdf",
      contentType: "application/pdf",
      contentLength: 700,
      status: "pending"
    } });
    await database.serviceDeliverableSubmission.create({ data: {
      deliverableId: readyDeliverable.id,
      actorUserId: partnerUserId
    } });

    const servicesStaff = await signInStaff(["services"]);
    const response = await app.inject({
      method: "GET", url: "/api/v1/admin/service-deliverables", headers: servicesStaff
    });
    expect(response.statusCode).toBe(200);
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.json()).toEqual(expect.arrayContaining([expect.objectContaining({
      deliverableId: readyDeliverable.id,
      assignmentId: assignment.id,
      title: "آماده‌سازی سفارش",
      summary: "بسته‌بندی آثار تخصیص‌یافته.",
      partnerOrganizationName: "بسته‌بندی نوین",
      fileName: "packing-list.pdf",
      contentType: "application/pdf",
      contentLength: 1200
    })]));
    const listedSubmission = response.json().find((item: { deliverableId: string }) => item.deliverableId === readyDeliverable.id);
    expect(listedSubmission.readUrl).toContain("X-Amz-Signature");
    expect(listedSubmission).toHaveProperty("submittedAt");
    for (const field of ["objectKey", "actorUserId", "uploadedByUserId", "artistUserId", "priceToman"]) {
      expect(listedSubmission).not.toHaveProperty(field);
    }
    expect(response.json().some((item: { deliverableId: string }) => item.deliverableId === draftDeliverable.id)).toBe(false);
    expect(response.json().some((item: { deliverableId: string }) => item.deliverableId === pendingDeliverable.id)).toBe(false);
    expect((await app.inject({
      method: "GET", url: "/api/v1/admin/service-deliverables", headers: await signInStaff(["products"])
    })).statusCode).toBe(403);
    expect((await app.inject({ method: "GET", url: "/api/v1/admin/service-deliverables" })).statusCode).toBe(401);
  });

  it("rejects missing membership, wrong staff domain, bad input, and unauthenticated writes", async () => {
    const organization = await database.organization.create({ data: { kind: "service_partner" } });
    const request = await database.serviceRequest.create({ data: { partnerTitle: "Local request" } });
    const staff = await signInStaff(["products"]);
    const servicesStaff = await signInStaff(["services"]);
    const payload = { requestId: request.id, partnerOrganizationId: organization.id };

    const noDomain = await app.inject({ method: "POST", url: "/api/v1/admin/service-assignments", headers: staff, payload });
    expect(noDomain.statusCode).toBe(403);
    expect((await app.inject({ method: "POST", url: "/api/v1/admin/service-assignments", payload })).statusCode).toBe(401);
    expect((await app.inject({ method: "POST", url: "/api/v1/admin/service-assignments", headers: servicesStaff,
      payload: { ...payload, extra: true } })).statusCode).toBe(400);
    expect((await app.inject({ method: "POST", url: "/api/v1/admin/service-assignments", headers: servicesStaff,
      payload: { ...payload, assignedPartnerUserId: randomUUID() } })).statusCode).toBe(400);

    expect((await app.inject({ method: "POST", url: "/api/v1/admin/service-assignments", headers: servicesStaff,
      payload: { ...payload, assignedPartnerUserId: randomUUID() } })).statusCode).toBe(400);
    expect((await app.inject({ method: "POST", url: "/api/v1/admin/service-assignments", headers: servicesStaff,
      payload: { ...payload, requestId: randomUUID() } })).statusCode).toBe(404);
    const wrongOrganization = await database.organization.create({ data: { kind: "corporate_buyer" } });
    expect((await app.inject({ method: "POST", url: "/api/v1/admin/service-assignments", headers: servicesStaff,
      payload: { ...payload, partnerOrganizationId: wrongOrganization.id } })).statusCode).toBe(404);
  });
});
