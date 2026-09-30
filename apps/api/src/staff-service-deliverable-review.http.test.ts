import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("Admin review of Service Partner deliverables HTTP contract", () => {
  let app: NestFastifyApplication;
  const database = new PrismaService();
  const codes = new Map<string, string>();
  const identity = new IdentityCore(database, {
    async send(phone, code) { codes.set(phone, code); }
  }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(database);

  async function signIn(role: "staff" | "service_partner", organizationId?: string, domains: string[] = []) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone);
    const user = await identity.verifyCode(phone, codes.get(phone) ?? "");
    const grant = await database.roleGrant.create({ data: {
      userId: user.userId,
      role,
      ...(organizationId ? { organizationId } : {})
    } });
    if (role === "staff" && domains.length) {
      await database.staffDomainGrant.createMany({ data: domains.map((domain) => ({ roleGrantId: grant.id, domain })) });
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

  it("records change requests and completion only after an authorized Admin approval", async () => {
    const organization = await database.organization.create({ data: { kind: "service_partner", displayName: "شریک خدمات" } });
    const partner = await signIn("service_partner", organization.id);
    const staff = await signIn("staff", undefined, ["services"]);
    const otherStaff = await signIn("staff", undefined, ["products"]);
    const request = await database.serviceRequest.create({ data: { partnerTitle: "عکاسی محصول", partnerSummary: "تصویرهای کاتالوگ" } });
    const assignment = await database.serviceAssignment.create({ data: {
      serviceRequestId: request.id, partnerOrganizationId: organization.id,
      responseStatus: "accepted", respondedAt: new Date()
    } });

    async function submitted(fileName: string) {
      const file = await database.serviceDeliverable.create({ data: {
        assignmentId: assignment.id, uploadedByUserId: partner.userId,
        objectKey: `services/assignments/${assignment.id}/deliverables/${randomUUID()}/ready`,
        fileName, contentType: "application/pdf", contentLength: 1024, status: "ready"
      } });
      await database.serviceDeliverableSubmission.create({ data: { deliverableId: file.id, actorUserId: partner.userId } });
      return file;
    }

    const first = await submitted("draft.pdf");
    const postReview = (deliverableId: string, payload: object, headers = staff) => app.inject({
      method: "POST", url: `/api/v1/admin/service-deliverables/${deliverableId}/review`, headers, payload
    });
    expect((await postReview(first.id, { decision: "approved" }, otherStaff)).statusCode).toBe(403);
    expect((await postReview(first.id, { decision: "changes_requested" })).statusCode).toBe(400);

    const changes = await postReview(first.id, { decision: "changes_requested", feedback: "نور عکس‌ها را اصلاح کنید." });
    expect(changes.statusCode).toBe(201);
    expect(changes.headers["cache-control"]).toBe("no-store");
    expect(changes.json()).toMatchObject({ decision: "changes_requested", completedAt: null, feedback: "نور عکس‌ها را اصلاح کنید." });
    expect((await database.serviceAssignment.findUnique({ where: { id: assignment.id } }))?.completedAt).toBeNull();

    const partnerFiles = await app.inject({ method: "GET", url: `/api/v1/service-partner/assignments/${assignment.id}/deliverables`, headers: partner });
    expect(partnerFiles.json()).toEqual([expect.objectContaining({
      id: first.id,
      review: expect.objectContaining({ decision: "changes_requested", feedback: "نور عکس‌ها را اصلاح کنید." })
    })]);
    const second = await submitted("revised.pdf");
    const approved = await postReview(second.id, { decision: "approved" });
    expect(approved.statusCode).toBe(201);
    expect(approved.json()).toMatchObject({ decision: "approved", completedAt: expect.any(String) });
    expect(await database.serviceDeliverableReviewEvent.count({ where: { actorUserId: staff.userId } })).toBe(2);

    const completed = await database.serviceAssignment.findUnique({ where: { id: assignment.id } });
    expect(completed?.completedAt).not.toBeNull();
    expect(completed?.completedByUserId).toBe(staff.userId);
    const detail = await app.inject({ method: "GET", url: `/api/v1/service-partner/assignments/${assignment.id}`, headers: partner });
    expect(detail.json()).toMatchObject({ completedAt: expect.any(String) });
    expect(detail.json().history).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: "deliverable_changes_requested", feedback: "نور عکس‌ها را اصلاح کنید." }),
      expect.objectContaining({ type: "deliverable_approved" }),
      expect.objectContaining({ type: "service_completed" })
    ]));

    expect((await app.inject({ method: "POST", url: `/api/v1/service-partner/assignments/${assignment.id}/deliverables/upload-url`, headers: partner,
      payload: { fileName: "late.pdf", contentType: "application/pdf", contentLength: 1024 } })).statusCode).toBe(409);
    expect((await postReview(second.id, { decision: "approved" })).statusCode).toBe(409);
    expect((await postReview(first.id, { decision: "approved" })).statusCode).toBe(409);
  });
});
