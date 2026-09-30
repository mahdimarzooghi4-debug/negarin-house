import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("Service Partner assignments HTTP contract", () => {
  let app: NestFastifyApplication;
  const database = new PrismaService();
  const codes = new Map<string, string>();
  const identity = new IdentityCore(database, {
    async send(phone, code) { codes.set(phone, code); }
  }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(database);

  async function signIn(role: "service-partner" | "artist", organizationId?: string) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone);
    const user = await identity.verifyCode(phone, codes.get(phone) ?? "");
    const grant = await database.roleGrant.create({ data: {
      userId: user.userId,
      role: role === "service-partner" ? "service_partner" : "artist",
      ...(organizationId ? { organizationId } : {})
    } });
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

  it("returns only assignments for the active organization and user scope", async () => {
    const organizationId = randomUUID();
    const otherOrganizationId = randomUUID();
    await database.organization.createMany({ data: [
      { id: organizationId, kind: "service_partner" },
      { id: otherOrganizationId, kind: "service_partner" }
    ] });
    const partner = await signIn("service-partner", organizationId);
    const partnerColleague = await signIn("service-partner", organizationId);
    const otherPartner = await signIn("service-partner", otherOrganizationId);
    const otherArtist = await signIn("artist");
    const request = await database.serviceRequest.create({
      data: { partnerTitle: "Packing assistance", partnerSummary: "Prepare assigned items." }
    });
    const organizationAssignment = await database.serviceAssignment.create({
      data: { serviceRequestId: request.id, partnerOrganizationId: organizationId }
    });
    const userAssignment = await database.serviceAssignment.create({
      data: {
        serviceRequestId: request.id,
        partnerOrganizationId: organizationId,
        assignedPartnerUserId: partnerColleague.userId
      }
    });
    const otherOrganizationAssignment = await database.serviceAssignment.create({
      data: { serviceRequestId: request.id, partnerOrganizationId: otherOrganizationId }
    });

    const response = await app.inject({
      method: "GET", url: "/api/v1/service-partner/assignments", headers: partner
    });
    expect(response.statusCode).toBe(200);
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.json()).toHaveLength(1);
    expect(response.json()[0]).toMatchObject({
      requestId: request.id,
      title: "Packing assistance",
      summary: "Prepare assigned items."
    });
    expect(response.json()[0]).not.toHaveProperty("partnerOrganizationId");
    expect(response.json()[0]).not.toHaveProperty("assignedPartnerUserId");
    expect(response.json()[0]).not.toHaveProperty("artistUserId");
    expect(response.json()[0]).not.toHaveProperty("priceToman");

    const organizationDetail = await app.inject({
      method: "GET", url: `/api/v1/service-partner/assignments/${organizationAssignment.id}`, headers: partner
    });
    expect(organizationDetail.statusCode).toBe(200);
    expect(organizationDetail.headers["cache-control"]).toBe("no-store");
    expect(organizationDetail.json()).toMatchObject({ assignmentId: organizationAssignment.id, requestId: request.id });
    expect(organizationDetail.json()).not.toHaveProperty("partnerOrganizationId");

    const acceptedResponse = await app.inject({
      method: "POST",
      url: `/api/v1/service-partner/assignments/${organizationAssignment.id}/response`,
      headers: partner,
      payload: { response: "accepted" }
    });
    expect(acceptedResponse.statusCode).toBe(201);
    expect(acceptedResponse.headers["cache-control"]).toBe("no-store");
    expect(acceptedResponse.json()).toEqual({ assignmentId: organizationAssignment.id, responseStatus: "accepted" });
    expect(await database.serviceAssignmentEvent.count({ where: {
      assignmentId: organizationAssignment.id,
      actorUserId: partner.userId,
      type: "accepted"
    } })).toBe(1);
    expect((await app.inject({
      method: "GET", url: `/api/v1/service-partner/assignments/${organizationAssignment.id}`, headers: partner
    })).json()).toMatchObject({ responseStatus: "accepted" });
    expect((await app.inject({
      method: "POST",
      url: `/api/v1/service-partner/assignments/${organizationAssignment.id}/response`,
      headers: partner,
      payload: { response: "declined" }
    })).statusCode).toBe(409);
    expect((await app.inject({
      method: "POST",
      url: `/api/v1/service-partner/assignments/${userAssignment.id}/response`,
      headers: partner,
      payload: { response: "accepted" }
    })).statusCode).toBe(404);
    expect((await app.inject({
      method: "POST",
      url: `/api/v1/service-partner/assignments/${organizationAssignment.id}/response`,
      headers: otherArtist,
      payload: { response: "accepted" }
    })).statusCode).toBe(403);
    expect((await app.inject({
      method: "POST",
      url: `/api/v1/service-partner/assignments/${otherOrganizationAssignment.id}/response`,
      headers: otherPartner,
      payload: { response: "accepted" }
    })).statusCode).toBe(201);
    expect((await app.inject({
      method: "POST",
      url: `/api/v1/service-partner/assignments/${organizationAssignment.id}/response`,
      headers: partner,
      payload: { response: "complete", approved: true }
    })).statusCode).toBe(400);

    const deliverableUpload = await app.inject({
      method: "POST",
      url: `/api/v1/service-partner/assignments/${organizationAssignment.id}/deliverables/upload-url`,
      headers: partner,
      payload: { fileName: "report.pdf", contentType: "application/pdf", contentLength: 2048 }
    });
    expect(deliverableUpload.statusCode).toBe(201);
    expect(deliverableUpload.headers["cache-control"]).toBe("no-store");
    expect(deliverableUpload.json().uploadUrl).toContain("X-Amz-Signature");
    expect(deliverableUpload.json()).not.toHaveProperty("objectKey");

    const deliverableId = deliverableUpload.json<{ id: string }>().id;
    const listedDeliverables = await app.inject({
      method: "GET",
      url: `/api/v1/service-partner/assignments/${organizationAssignment.id}/deliverables`,
      headers: partner
    });
    expect(listedDeliverables.statusCode).toBe(200);
    expect(listedDeliverables.headers["cache-control"]).toBe("no-store");
    expect(listedDeliverables.json()).toEqual([expect.objectContaining({
      id: deliverableId,
      fileName: "report.pdf",
      contentType: "application/pdf",
      status: "pending",
      readUrl: null
    })]);
    expect(listedDeliverables.json()[0]).not.toHaveProperty("objectKey");
    expect(listedDeliverables.json()[0]).not.toHaveProperty("uploadedByUserId");

    expect((await app.inject({
      method: "POST",
      url: `/api/v1/service-partner/assignments/${userAssignment.id}/deliverables/upload-url`,
      headers: partner,
      payload: { fileName: "report.pdf", contentType: "application/pdf", contentLength: 2048 }
    })).statusCode).toBe(404);
    expect((await app.inject({
      method: "POST",
      url: `/api/v1/service-partner/assignments/${userAssignment.id}/deliverables/upload-url`,
      headers: partnerColleague,
      payload: { fileName: "report.pdf", contentType: "application/pdf", contentLength: 2048 }
    })).statusCode).toBe(201);
    expect((await app.inject({
      method: "POST",
      url: `/api/v1/service-partner/assignments/${organizationAssignment.id}/deliverables/upload-url`,
      headers: otherArtist,
      payload: { fileName: "report.pdf", contentType: "application/pdf", contentLength: 2048 }
    })).statusCode).toBe(403);
    expect((await app.inject({
      method: "POST",
      url: `/api/v1/service-partner/assignments/${organizationAssignment.id}/deliverables/upload-url`,
      headers: partner,
      payload: { fileName: "unsafe.svg", contentType: "image/svg+xml", contentLength: 2048 }
    })).statusCode).toBe(400);

    expect((await app.inject({
      method: "GET", url: `/api/v1/service-partner/assignments/${userAssignment.id}`, headers: partner
    })).statusCode).toBe(404);
    expect((await app.inject({
      method: "GET", url: `/api/v1/service-partner/assignments/${userAssignment.id}`, headers: partnerColleague
    })).statusCode).toBe(200);
    expect((await app.inject({
      method: "GET", url: `/api/v1/service-partner/assignments/${organizationAssignment.id}`, headers: otherPartner
    })).statusCode).toBe(404);
    expect((await app.inject({
      method: "GET", url: `/api/v1/service-partner/assignments/${otherOrganizationAssignment.id}`, headers: otherArtist
    })).statusCode).toBe(403);
    expect((await app.inject({
      method: "GET", url: `/api/v1/service-partner/assignments/${organizationAssignment.id}`
    })).statusCode).toBe(401);

    expect((await app.inject({ method: "GET", url: "/api/v1/service-partner/assignments", headers: otherPartner })).json()).toEqual([
      expect.objectContaining({ requestId: request.id })
    ]);
    expect((await app.inject({ method: "GET", url: "/api/v1/service-partner/assignments", headers: otherArtist })).statusCode).toBe(403);
    expect((await app.inject({ method: "GET", url: "/api/v1/service-partner/assignments" })).statusCode).toBe(401);
  });
});
