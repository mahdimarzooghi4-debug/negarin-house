import { createHash, randomUUID } from "node:crypto";
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { canAccessStaffDomain, canReadServiceRequest, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parseCartCommand } from "./customer-cart.js";
import { maxImageBytes, normalizeProductImage, ProductImageStorage } from "./product-images.js";
import { deliverableFileView } from "./service-execution.js";
import { PrismaService } from "./prisma.service.js";
export function parseDeliverableUpload(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const b = body as Record<string, unknown>;
  if (Object.keys(b).some(k => !["version", "idempotencyKey", "kind", "label", "base64"].includes(k)) || (b.kind !== "image" && b.kind !== "text") ||
    typeof b.label !== "string" || !b.label.trim() || b.label.trim().length > 200 || /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u.test(b.label)) throw new BadRequestException();
  const limit = b.kind === "image" ? maxImageBytes : 1024 * 1024;
  if (typeof b.base64 !== "string" || b.base64.length > Math.ceil(limit / 3) * 4 || !/^[A-Za-z0-9+/]*={0,2}$/.test(b.base64)) throw new BadRequestException();
  const bytes = Buffer.from(b.base64, "base64");
  if (!bytes.length || bytes.length > limit || bytes.toString("base64") !== b.base64) throw new BadRequestException();
  return { ...parseCartCommand({ version: b.version }), idempotencyKey: parseArtistProductId(b.idempotencyKey as string).toLowerCase(), kind: b.kind as "image" | "text", label: b.label.trim(), bytes };
}
export async function normalizeDeliverable(kind: "image" | "text", bytes: Buffer) {
  if (kind === "image") return { bytes: (await normalizeProductImage(bytes)).data, contentType: "image/webp", extension: "webp" };
  try {
    const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes).replace(/\r\n?/g, "\n");
    if (!decoded.trim() || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u.test(decoded)) throw new Error();
    return { bytes: Buffer.from(decoded, "utf8"), contentType: "text/plain; charset=utf-8", extension: "txt" };
  } catch { throw new BadRequestException("invalid-utf8-text"); }
}
function hash(value: Buffer | string) { return createHash("sha256").update(value).digest("hex"); }
@Injectable()
export class ServiceDeliverableStorage extends ProductImageStorage {}
@Injectable()
export class ServiceDeliverablesService {
  constructor(private readonly db: PrismaService, private readonly storage: ServiceDeliverableStorage) {}
  private async assigned(context: AuthorizationContext, id: string) {
    if (context.activeRole !== "service-partner" || !context.organizationId) throw new ForbiddenException();
    const a = await this.db.serviceAssignment.findUnique({ where: { id }, include: { execution: true } });
    if (!a) throw new NotFoundException();
    enforceDecision(canReadServiceRequest(context, { assignedPartnerOrganizationId: a.partnerOrganizationId, assignedPartnerUserId: a.partnerUserId }));
    return a;
  }
  async upload(context: AuthorizationContext, id: string, input: ReturnType<typeof parseDeliverableUpload>, trace: string) {
    const a = await this.assigned(context, id);
    const commandHash = hash(JSON.stringify({ version: input.version, kind: input.kind, label: input.label, inputHash: hash(input.bytes) }));
    const key = { assignmentId_idempotencyKey: { assignmentId: id, idempotencyKey: input.idempotencyKey } };
    const prior = await this.db.serviceDeliverableFile.findUnique({ where: key });
    if (prior) {
      if (prior.commandHash !== commandHash) throw new ConflictException("idempotency-key-reused");
      return { file: deliverableFileView(prior), version: prior.uploadedExecutionVersion };
    }
    if (a.status !== "accepted" || a.execution?.status !== "in_progress" || a.execution.version !== input.version) throw new ConflictException("service-execution-changed");
    if (await this.db.serviceDeliverableFile.count({ where: { assignmentId: id } }) >= 100) throw new ConflictException("service-file-limit");
    const normalized = await normalizeDeliverable(input.kind, input.bytes), fileId = randomUUID(), objectKey = `service-deliverables/${id}/${fileId}.${normalized.extension}`;
    try { await this.storage.store.putImmutableObject(objectKey, normalized.bytes, normalized.contentType); }
    catch { throw new ServiceUnavailableException("service-file-storage-unavailable"); }
    try {
      const result = await this.db.$transaction(async tx => {
        await tx.$queryRawUnsafe('SELECT "id" FROM "service_requests" WHERE "id" = $1::uuid FOR UPDATE', a.requestId);
        const existing = await tx.serviceDeliverableFile.findUnique({ where: key });
        if (existing) {
          if (existing.commandHash !== commandHash) throw new ConflictException("idempotency-key-reused");
          return { file: deliverableFileView(existing), version: existing.uploadedExecutionVersion };
        }
        const e = await tx.serviceExecution.findUnique({ where: { assignmentId: id } });
        if (!e || e.status !== "in_progress" || e.version !== input.version) throw new ConflictException("service-execution-changed");
        if (await tx.serviceDeliverableFile.count({ where: { assignmentId: id } }) >= 100) throw new ConflictException("service-file-limit");
        const file = await tx.serviceDeliverableFile.create({ data: { id: fileId, assignmentId: id, uploadedByUserId: context.userId, idempotencyKey: input.idempotencyKey,
          commandHash, uploadedExecutionVersion: e.version + 1, label: input.label, objectKey, contentType: normalized.contentType, byteLength: normalized.bytes.length, sha256: hash(normalized.bytes) } });
        await tx.serviceExecution.update({ where: { assignmentId: id }, data: { version: { increment: 1 } } });
        await tx.serviceExecutionEvent.create({ data: { assignmentId: id, version: e.version + 1, fromStatus: e.status, toStatus: e.status, summary: input.label,
          actorUserId: context.userId, command: { action: "file_uploaded", fileId, commandHash }, requestTraceId: trace } });
        return { file: deliverableFileView(file), version: e.version + 1 };
      });
      if (result.file.id !== fileId) await this.cleanup(fileId, objectKey);
      return result;
    } catch (error) { await this.cleanup(fileId, objectKey); throw error; }
  }
  private async cleanup(id: string, key: string) {
    // An uncertain commit must never delete a committed/history file.
    try { if (!await this.db.serviceDeliverableFile.findUnique({ where: { id } })) await this.storage.store.deleteObject(key); }
    catch { /* Uncertain private orphans require reconciliation; no public access is granted. */ }
  }
  async read(context: AuthorizationContext, assignmentId: string, fileId: string, audience: "partner" | "artist" | "staff") {
    if (audience === "staff") enforceDecision(canAccessStaffDomain(context, "services"));
    else if (audience === "partner") await this.assigned(context, assignmentId);
    else if (context.activeRole !== "artist") throw new ForbiddenException();
    const a = await this.db.serviceAssignment.findUnique({ where: { id: assignmentId }, include: { request: { select: { artistUserId: true } } } });
    if (!a || (audience === "artist" && a.request.artistUserId !== context.userId)) throw new NotFoundException();
    if (audience === "artist" && !await this.db.serviceExecutionEvent.findFirst({ where: { assignmentId, toStatus: "submitted", fileIds: { has: fileId } } })) throw new NotFoundException();
    const file = await this.db.serviceDeliverableFile.findFirst({ where: { id: fileId, assignmentId } });
    if (!file) throw new NotFoundException();
    try { return { ...deliverableFileView(file), url: await this.storage.store.createReadUrl(file.objectKey), expiresInSeconds: 300 }; }
    catch { throw new ServiceUnavailableException("service-file-storage-unavailable"); }
  }
}
