import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("Admin service trace HTTP", () => {
  let app: NestFastifyApplication;
  const db = new PrismaService(), codes = new Map<string, string>();
  const identity = new IdentityCore(db, { async send(phone, code) { codes.set(phone, code); } }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(db);

  async function signIn(role: "artist" | "customer" | "staff" | "service_partner" = "artist", domain?: string, organizationId?: string) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone);
    const verified = await identity.verifyCode(phone, codes.get(phone)!);
    const grant = await db.roleGrant.create({
      data: { userId: verified.userId, role, organizationId, ...(domain ? { staffDomains: { create: [{ domain }] } } : {}) }
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
  afterAll(async () => { await app?.close(); await db.$disconnect(); });

  it("traces request, assignment, execution, deliverables and historical support usage without raw commands", async () => {
    const artist = await signIn("artist");
    const services = await signIn("staff", "services");
    const partnerOrg = randomUUID();
    const partner = await signIn("service_partner", undefined, partnerOrg);

    const request = await db.serviceRequest.create({ data: {
      artistUserId: artist.userId, createdByUserId: artist.userId, idempotencyKey: randomUUID(),
      title: "عکاسی محصول", description: "اجرای خدمت", internalNote: "یادداشت داخلی",
      status: "accepted", version: 2
    } });
    const assignment = await db.serviceAssignment.create({ data: {
      requestId: request.id, partnerOrganizationId: partnerOrg, partnerUserId: partner.userId,
      assignedVersion: 1, status: "accepted", responseSummary: "پذیرفته شد", respondedAt: new Date()
    } });
    await db.serviceRequestEvent.createMany({ data: [
      { id: randomUUID(), requestId: request.id, assignmentId: null, version: 0, action: "created",
        actorUserId: artist.userId, command: { source: "test" }, requestTraceId: "trace-service-0" },
      { id: randomUUID(), requestId: request.id, assignmentId: assignment.id, version: 1, action: "assigned",
        actorUserId: services.userId, command: { source: "test" }, requestTraceId: "trace-service-1" },
      { id: randomUUID(), requestId: request.id, assignmentId: assignment.id, version: 2, action: "accepted",
        actorUserId: partner.userId, command: { source: "test" }, requestTraceId: "trace-service-2" }
    ] });

    const fileId = randomUUID();
    await db.serviceExecution.create({ data: {
      assignmentId: assignment.id, status: "completed", version: 2,
      submissionSummary: "تحویل شد", reviewSummary: "تایید شد", submittedFileIds: [fileId]
    } });
    await db.serviceExecutionEvent.createMany({ data: [
      { id: randomUUID(), assignmentId: assignment.id, version: 0, fromStatus: null, toStatus: "accepted",
        summary: "accepted", actorUserId: partner.userId, command: { source: "test" }, requestTraceId: "trace-exec-0", fileIds: [] },
      { id: randomUUID(), assignmentId: assignment.id, version: 1, fromStatus: "accepted", toStatus: "submitted",
        summary: "submitted", actorUserId: partner.userId, command: { source: "test" }, requestTraceId: "trace-exec-1", fileIds: [fileId] },
      { id: randomUUID(), assignmentId: assignment.id, version: 2, fromStatus: "submitted", toStatus: "completed",
        summary: "completed", actorUserId: services.userId, command: { source: "test" }, requestTraceId: "trace-exec-2", fileIds: [fileId] }
    ] });
    await db.serviceDeliverableFile.create({ data: {
      id: fileId, assignmentId: assignment.id, uploadedByUserId: partner.userId, idempotencyKey: randomUUID(),
      commandHash: "a".repeat(64), uploadedExecutionVersion: 1, label: "خروجی نهایی",
      objectKey: "trace/" + randomUUID(), contentType: "text/plain; charset=utf-8", byteLength: 12,
      sha256: "b".repeat(64)
    } });

    const program = await db.supportProgram.create({ data: {
      source: "negarin_csr", organizationId: null, createdByUserId: services.userId, idempotencyKey: randomUUID(),
      title: "حمایت خدمات", description: "برنامه", rules: "استفاده کامل"
    } });
    const relationship = await db.supportRelationship.create({ data: {
      programId: program.id, artistUserId: artist.userId, sponsorApprovedByUserId: services.userId,
      negarinApprovedByUserId: services.userId, negarinApprovedAt: new Date(), version: 1
    } });
    const allocation = await db.supportAllocation.create({ data: {
      programId: program.id, relationshipId: relationship.id, createdByUserId: services.userId,
      idempotencyKey: randomUUID(), amountToman: 400000n, rulesSnapshot: program.rules,
      status: "available", version: 2, currentServiceRequestId: null
    } });
    await db.supportCreditEvent.createMany({ data: [
      { id: randomUUID(), allocationId: allocation.id, version: 0, action: "allocated", amountToman: 400000n,
        serviceRequestId: null, actorUserId: services.userId, command: { source: "test" }, requestTraceId: "trace-support-0" },
      { id: randomUUID(), allocationId: allocation.id, version: 1, action: "reserved", amountToman: 400000n,
        serviceRequestId: request.id, actorUserId: services.userId, command: { reason: "رزرو" }, requestTraceId: "trace-support-1" },
      { id: randomUUID(), allocationId: allocation.id, version: 2, action: "released", amountToman: 400000n,
        serviceRequestId: request.id, actorUserId: services.userId, command: { reason: "آزادسازی" }, requestTraceId: "trace-support-2" }
    ] });

    const response = await app.inject({ method: "GET", url: `/api/v1/admin/service-requests/${request.id}/trace`, headers: services.headers });
    expect(response.statusCode).toBe(200);
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.json().request).toMatchObject({
      id: request.id, artistUserId: artist.userId, status: "accepted", version: 2,
      internalNote: "یادداشت داخلی"
    });
    expect(response.json().request.history.map((e: { action: string }) => e.action)).toEqual(["created", "assigned", "accepted"]);
    expect(response.json().assignments).toEqual([
      expect.objectContaining({
        id: assignment.id, partnerOrganizationId: partnerOrg, partnerUserId: partner.userId, status: "accepted",
        execution: expect.objectContaining({
          status: "completed", version: 2, submittedFileIds: [fileId],
          files: [expect.objectContaining({ id: fileId, label: "خروجی نهایی", contentType: "text/plain; charset=utf-8" })]
        })
      })
    ]);
    expect(response.json().support).toEqual([
      expect.objectContaining({
        id: allocation.id, amountToman: "400000", status: "available", currentServiceRequestId: null,
        history: [
          expect.objectContaining({ version: 1, action: "reserved", amountToman: "400000" }),
          expect.objectContaining({ version: 2, action: "released", amountToman: "400000" })
        ]
      })
    ]);
    expect(JSON.stringify(response.json())).not.toContain("idempotencyKey");
    expect(JSON.stringify(response.json())).not.toContain("objectKey");
    expect(JSON.stringify(response.json())).not.toContain('"command"');
  });

  it("requires services-domain staff and conceals an unknown request", async () => {
    const services = await signIn("staff", "services"), finance = await signIn("staff", "finance"), artist = await signIn("artist");
    const id = randomUUID();
    expect((await app.inject({ method: "GET", url: `/api/v1/admin/service-requests/${id}/trace`, headers: finance.headers })).statusCode).toBe(403);
    expect((await app.inject({ method: "GET", url: `/api/v1/admin/service-requests/${id}/trace`, headers: artist.headers })).statusCode).toBe(403);
    expect((await app.inject({ method: "GET", url: `/api/v1/admin/service-requests/${id}/trace`, headers: services.headers })).statusCode).toBe(404);
  });
});
