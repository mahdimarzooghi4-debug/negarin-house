import { describe, expect, it, vi } from "vitest";
import { BadRequestException, ConflictException, ForbiddenException, NotFoundException } from "@nestjs/common";
import type { ObjectStorage } from "@negarin/storage";
import type { AuthorizationContext } from "@negarin/authz";
import { ServiceDeliverablesService, parseServiceDeliverableUploadRequest } from "./service-deliverables.js";
import type { PrismaService } from "./prisma.service.js";

const assignmentId = "89e89ad6-603b-4b37-b252-31a9f03f0160";
const deliverableId = "c098bdf2-a2b5-4c61-93c7-4f498bf9dba0";
const userId = "bc0d7458-e796-4e6d-89cf-6805dfcb11e3";
const context: AuthorizationContext = {
  userId,
  activeRole: "service-partner",
  organizationId: "f83be9ac-9258-4fb4-b623-80960cf847f4"
};

function fixture(stored = { contentType: "application/pdf", contentLength: 2048 }) {
  const database = {
    serviceAssignment: {
      findFirst: vi.fn().mockResolvedValue({
        id: assignmentId,
        partnerOrganizationId: context.organizationId,
        assignedPartnerUserId: null,
        responseStatus: "accepted"
      })
    },
    serviceDeliverable: {
      create: vi.fn().mockResolvedValue({ id: deliverableId }),
      findFirst: vi.fn().mockResolvedValue({
        id: deliverableId, assignmentId, uploadedByUserId: userId,
        objectKey: `services/assignments/${assignmentId}/deliverables/${deliverableId}/stage`,
        fileName: "report.pdf", contentType: "application/pdf", contentLength: 2048, status: "pending"
      }),
      findMany: vi.fn().mockResolvedValue([]),
      findUnique: vi.fn(),
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      delete: vi.fn()
    }
  };
  Object.assign(database, {
    $transaction: vi.fn(async (callback: (transaction: typeof database) => Promise<unknown>) => callback(database))
  });
  const storage = {
    createUploadUrl: vi.fn().mockResolvedValue({ url: "https://storage/upload", expiresAt: "2026-09-30T12:00:00.000Z" }),
    createReadUrl: vi.fn().mockResolvedValue("https://storage/read"),
    getObjectMetadata: vi.fn().mockResolvedValue(stored),
    copyObject: vi.fn().mockResolvedValue(undefined),
    deleteObject: vi.fn().mockResolvedValue(undefined)
  };
  return {
    database,
    storage,
    service: new ServiceDeliverablesService(database as unknown as PrismaService, storage as unknown as ObjectStorage)
  };
}

describe("Service Partner deliverables", () => {
  it.each(["application/pdf", "image/jpeg", "image/png", "image/webp"])("accepts bounded %s uploads", (contentType) => {
    expect(parseServiceDeliverableUploadRequest({ fileName: "report.pdf", contentType, contentLength: 2048 }))
      .toEqual({ fileName: "report.pdf", contentType, contentLength: 2048 });
  });

  it("reduces a submitted path to a safe display filename", () => {
    expect(parseServiceDeliverableUploadRequest({
      fileName: "C:\\private\\report.pdf",
      contentType: "application/pdf",
      contentLength: 2048
    }).fileName).toBe("report.pdf");
  });

  it.each([
    { fileName: "report.html", contentType: "text/html", contentLength: 64 },
    { fileName: "report.pdf", contentType: "application/pdf", contentLength: 0 },
    { fileName: "report.pdf", contentType: "application/pdf", contentLength: 10.5 },
    { fileName: "report.pdf", contentType: "application/pdf", contentLength: 10 * 1024 * 1024 + 1 },
    { fileName: "../report.pdf", contentType: "application/pdf", contentLength: 12, objectKey: "caller/key" },
    { fileName: "\u0000", contentType: "application/pdf", contentLength: 12 }
  ])("rejects unsafe upload metadata", (body) => {
    expect(() => parseServiceDeliverableUploadRequest(body)).toThrow(BadRequestException);
  });

  it("creates an upload using a server-owned key and records the uploading partner user", async () => {
    const { service, storage, database } = fixture();
    const result = await service.requestUpload(context, assignmentId, {
      fileName: "report.pdf", contentType: "application/pdf", contentLength: 2048
    });
    expect(result).toMatchObject({ id: deliverableId, uploadUrl: "https://storage/upload" });
    expect(database.serviceAssignment.findFirst).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ id: assignmentId, partnerOrganizationId: context.organizationId })
    }));
    expect(database.serviceDeliverable.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        assignmentId,
        uploadedByUserId: userId,
        fileName: "report.pdf",
        objectKey: expect.stringMatching(new RegExp(`^services/assignments/${assignmentId}/deliverables/`))
      })
    }));
    expect(storage.createUploadUrl).toHaveBeenCalledWith(expect.objectContaining({
      contentType: "application/pdf", contentLength: 2048,
      objectKey: expect.stringMatching(new RegExp(`^services/assignments/${assignmentId}/deliverables/`))
    }));
    expect(result).not.toHaveProperty("objectKey");
  });

  it("requires an accepted assignment before creating a deliverable upload", async () => {
    const { service, database, storage } = fixture();
    database.serviceAssignment.findFirst.mockResolvedValue({
      id: assignmentId,
      partnerOrganizationId: context.organizationId,
      assignedPartnerUserId: null,
      responseStatus: "awaiting_response"
    });
    await expect(service.requestUpload(context, assignmentId, {
      fileName: "report.pdf", contentType: "application/pdf", contentLength: 2048
    })).rejects.toThrow(ConflictException);
    expect(database.serviceDeliverable.create).not.toHaveBeenCalled();
    expect(storage.createUploadUrl).not.toHaveBeenCalled();
  });

  it("conceals assignments outside the active organization or individual scope", async () => {
    const { service, database, storage } = fixture();
    database.serviceAssignment.findFirst.mockResolvedValue(null);
    await expect(service.list(context, assignmentId)).rejects.toThrow(NotFoundException);
    expect(database.serviceDeliverable.findMany).not.toHaveBeenCalled();
    expect(storage.createReadUrl).not.toHaveBeenCalled();
  });

  it("denies non-Service-Partner roles before querying assignments", async () => {
    const { service, database } = fixture();
    await expect(service.list({ userId, activeRole: "artist" }, assignmentId)).rejects.toThrow(ForbiddenException);
    expect(database.serviceAssignment.findFirst).not.toHaveBeenCalled();
  });

  it("refreshes only a pending deliverable for the same assignment", async () => {
    const { service, storage, database } = fixture();
    await expect(service.refreshUploadUrl(context, assignmentId, deliverableId)).resolves.toMatchObject({
      id: deliverableId, uploadUrl: "https://storage/upload"
    });
    expect(storage.createUploadUrl).toHaveBeenCalledWith({
      objectKey: `services/assignments/${assignmentId}/deliverables/${deliverableId}/stage`,
      contentType: "application/pdf", contentLength: 2048
    });
    database.serviceDeliverable.findFirst.mockResolvedValue(null);
    await expect(service.refreshUploadUrl(context, assignmentId, deliverableId)).rejects.toThrow(NotFoundException);
  });

  it("promotes an upload only after object metadata matches and rechecks assignment scope", async () => {
    const { service, storage, database } = fixture();
    await expect(service.completeUpload(context, assignmentId, deliverableId)).resolves.toEqual({
      id: deliverableId, status: "ready"
    });
    expect(storage.getObjectMetadata).toHaveBeenCalledOnce();
    expect(storage.copyObject).toHaveBeenCalledWith(
      `services/assignments/${assignmentId}/deliverables/${deliverableId}/stage`,
      expect.stringMatching(new RegExp(`^services/assignments/${assignmentId}/deliverables/${deliverableId}/`))
    );
    expect(database.serviceDeliverable.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ id: deliverableId, assignmentId, status: "pending" }),
      data: expect.objectContaining({ status: "ready" })
    }));
    expect(storage.deleteObject).toHaveBeenCalledWith(
      `services/assignments/${assignmentId}/deliverables/${deliverableId}/stage`
    );
    expect(database.serviceAssignment.findFirst).toHaveBeenCalledTimes(2);
  });

  it("does not mark metadata-mismatched objects as ready", async () => {
    const { service, database } = fixture({ contentType: "application/pdf", contentLength: 1 });
    await expect(service.completeUpload(context, assignmentId, deliverableId)).rejects.toThrow(BadRequestException);
    expect(database.serviceDeliverable.updateMany).not.toHaveBeenCalled();
  });

  it("lists only safe metadata and signed read URLs for ready items", async () => {
    const { service, database, storage } = fixture();
    database.serviceDeliverable.findMany.mockResolvedValue([{
      id: deliverableId, fileName: "report.pdf", contentType: "application/pdf", contentLength: 2048,
      status: "ready", objectKey: "private/storage/key", createdAt: new Date("2026-09-30T10:00:00.000Z")
    }]);
    const result = await service.list(context, assignmentId);
    expect(result).toEqual([expect.objectContaining({
      id: deliverableId, fileName: "report.pdf", status: "ready", readUrl: "https://storage/read"
    })]);
    expect(result[0]).not.toHaveProperty("objectKey");
    expect(storage.createReadUrl).toHaveBeenCalledWith("private/storage/key");
  });

  it("does not complete an upload when stored metadata is absent", async () => {
    const { service, database } = fixture();
    const storage = (service as unknown as { storage: ObjectStorage }).storage;
    vi.spyOn(storage, "getObjectMetadata").mockResolvedValue(null);
    await expect(service.completeUpload(context, assignmentId, deliverableId)).rejects.toThrow(ConflictException);
    expect(database.serviceDeliverable.updateMany).not.toHaveBeenCalled();
  });
});
