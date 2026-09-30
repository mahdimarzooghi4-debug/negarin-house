import { randomUUID } from "node:crypto";
import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { AuthorizationContext } from "@negarin/authz";
import { canReadServiceRequest } from "@negarin/authz";
import type { ObjectStorage } from "@negarin/storage";
import { PrismaService } from "./prisma.service.js";
import { enforceDecision } from "./authorization.guard.js";
import { OBJECT_STORAGE } from "./artist-product-media.js";

const acceptedTypes = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);
const maxDeliverableBytes = 10 * 1024 * 1024;

export type ServiceDeliverableUploadRequest = Readonly<{
  fileName: string;
  contentType: string;
  contentLength: number;
}>;

@Injectable()
export class ServiceDeliverablesService {
  constructor(
    private readonly database: PrismaService,
    @Inject(OBJECT_STORAGE) private readonly storage: ObjectStorage
  ) {}

  async list(context: AuthorizationContext, assignmentId: string) {
    await this.readableAssignment(context, assignmentId);
    const files = await this.database.serviceDeliverable.findMany({
      where: { assignmentId },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      select: {
        id: true, fileName: true, contentType: true, contentLength: true, status: true, objectKey: true, createdAt: true,
        submission: { select: { createdAt: true } }
      }
    });
    return Promise.all(files.map(async (file) => ({
      id: file.id,
      fileName: file.fileName,
      contentType: file.contentType,
      contentLength: file.contentLength,
      status: file.status,
      readUrl: file.status === "ready" ? await this.storage.createReadUrl(file.objectKey) : null,
      createdAt: file.createdAt.toISOString(),
      submittedAt: file.submission?.createdAt.toISOString() ?? null
    })));
  }

  async submit(context: AuthorizationContext, assignmentId: string, deliverableId: string) {
    await this.readableAssignment(context, assignmentId, this.database, true);
    const file = await this.database.serviceDeliverable.findFirst({
      where: { id: deliverableId, assignmentId },
      select: { id: true, status: true, submission: { select: { createdAt: true } } }
    });
    if (!file) throw new NotFoundException();
    if (file.status !== "ready") throw new ConflictException("deliverable-upload-not-ready");
    if (file.submission) throw new ConflictException("deliverable-already-submitted");

    return this.database.$transaction(async (transaction) => {
      await this.readableAssignment(context, assignmentId, transaction, true);
      const result = await transaction.serviceDeliverableSubmission.createMany({
        data: [{ deliverableId: file.id, actorUserId: context.userId }],
        skipDuplicates: true
      });
      if (result.count !== 1) throw new ConflictException("deliverable-already-submitted");
      const submission = await transaction.serviceDeliverableSubmission.findUnique({
        where: { deliverableId: file.id },
        select: { createdAt: true }
      });
      if (!submission) throw new ConflictException("deliverable-submission-not-recorded");
      return { deliverableId: file.id, submittedAt: submission.createdAt.toISOString() };
    });
  }

  async requestUpload(context: AuthorizationContext, assignmentId: string, input: ServiceDeliverableUploadRequest) {
    await this.readableAssignment(context, assignmentId, this.database, true);
    const id = randomUUID();
    const objectKey = `services/assignments/${assignmentId}/deliverables/${id}/${randomUUID()}`;
    const file = await this.database.serviceDeliverable.create({
      data: {
        id,
        assignmentId,
        uploadedByUserId: context.userId,
        objectKey,
        fileName: input.fileName,
        contentType: input.contentType,
        contentLength: input.contentLength
      },
      select: { id: true }
    });
    try {
      const upload = await this.storage.createUploadUrl({ objectKey, contentType: input.contentType, contentLength: input.contentLength });
      return { id: file.id, uploadUrl: upload.url, expiresAt: upload.expiresAt };
    } catch (error) {
      await this.database.serviceDeliverable.delete({ where: { id: file.id } });
      throw error;
    }
  }

  async refreshUploadUrl(context: AuthorizationContext, assignmentId: string, deliverableId: string) {
    await this.readableAssignment(context, assignmentId, this.database, true);
    const file = await this.database.serviceDeliverable.findFirst({ where: { id: deliverableId, assignmentId } });
    if (!file) throw new NotFoundException();
    if (file.status !== "pending") throw new ConflictException("deliverable-upload-not-pending");
    const upload = await this.storage.createUploadUrl({
      objectKey: file.objectKey,
      contentType: file.contentType,
      contentLength: file.contentLength
    });
    return { id: file.id, uploadUrl: upload.url, expiresAt: upload.expiresAt };
  }

  async completeUpload(context: AuthorizationContext, assignmentId: string, deliverableId: string) {
    await this.readableAssignment(context, assignmentId, this.database, true);
    const file = await this.database.serviceDeliverable.findFirst({ where: { id: deliverableId, assignmentId } });
    if (!file) throw new NotFoundException();
    if (file.status === "ready") return { id: file.id, status: file.status };

    const stored = await this.storage.getObjectMetadata(file.objectKey);
    if (!stored) throw new ConflictException("upload-not-found");
    if (stored.contentLength !== file.contentLength || stored.contentType !== file.contentType) {
      throw new BadRequestException("upload-metadata-mismatch");
    }

    const finalKey = `services/assignments/${assignmentId}/deliverables/${file.id}/${randomUUID()}`;
    await this.storage.copyObject(file.objectKey, finalKey);
    let result: { id: string; status: "ready"; objectKey: string };
    try {
      result = await this.database.$transaction(async (transaction) => {
        await this.readableAssignment(context, assignmentId, transaction, true);
        const current = await transaction.serviceDeliverable.findFirst({ where: { id: file.id, assignmentId } });
        if (!current) throw new NotFoundException();
        if (current.status === "ready") return { id: current.id, status: current.status, objectKey: current.objectKey };
        const updated = await transaction.serviceDeliverable.updateMany({
          where: { id: file.id, assignmentId, objectKey: file.objectKey, status: "pending" },
          data: { objectKey: finalKey, status: "ready" }
        });
        if (updated.count !== 1) {
          const latest = await transaction.serviceDeliverable.findUnique({ where: { id: file.id } });
          if (latest?.status === "ready") return { id: latest.id, status: latest.status, objectKey: latest.objectKey };
          throw new ConflictException("deliverable-state-changed");
        }
        return { id: file.id, status: "ready" as const, objectKey: finalKey };
      });
    } catch (error) {
      await this.storage.deleteObject(finalKey);
      throw error;
    }
    if (result.objectKey !== finalKey) await this.storage.deleteObject(finalKey);
    else await this.storage.deleteObject(file.objectKey);
    return { id: result.id, status: result.status };
  }

  private async readableAssignment(
    context: AuthorizationContext,
    assignmentId: string,
    database: Pick<PrismaService, "serviceAssignment"> = this.database,
    requireAccepted = false
  ) {
    if (context.activeRole !== "service-partner") throw new ForbiddenException();
    enforceDecision(canReadServiceRequest(context, {
      assignedPartnerOrganizationId: context.organizationId ?? null
    }));
    const assignment = await database.serviceAssignment.findFirst({
      where: {
        id: assignmentId,
        partnerOrganizationId: context.organizationId!,
        OR: [{ assignedPartnerUserId: null }, { assignedPartnerUserId: context.userId }]
      },
      select: {
        id: true,
        partnerOrganizationId: true,
        assignedPartnerUserId: true,
        responseStatus: true
      }
    });
    if (!assignment) throw new NotFoundException();
    if (requireAccepted && assignment.responseStatus !== "accepted") {
      throw new ConflictException("service-assignment-not-accepted");
    }
    enforceDecision(canReadServiceRequest(context, {
      assignedPartnerOrganizationId: assignment.partnerOrganizationId,
      assignedPartnerUserId: assignment.assignedPartnerUserId
    }));
    return assignment;
  }
}

export function parseServiceDeliverableUploadRequest(body: unknown): ServiceDeliverableUploadRequest {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const value = body as Record<string, unknown>;
  if (Object.keys(value).some((key) => !["fileName", "contentType", "contentLength"].includes(key))) {
    throw new BadRequestException();
  }
  if (typeof value.fileName !== "string") throw new BadRequestException();
  const fileName = value.fileName.replaceAll("\\", "/").split("/").pop()?.replace(/[\u0000-\u001f\u007f]/g, "").trim() ?? "";
  if (!fileName || fileName.length > 180) throw new BadRequestException();
  if (typeof value.contentType !== "string" || !acceptedTypes.has(value.contentType)) throw new BadRequestException();
  if (typeof value.contentLength !== "number" || !Number.isSafeInteger(value.contentLength) ||
    value.contentLength < 1 || value.contentLength > maxDeliverableBytes) throw new BadRequestException();
  return { fileName, contentType: value.contentType, contentLength: value.contentLength };
}
