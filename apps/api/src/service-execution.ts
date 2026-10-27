import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { canAccessStaffDomain, canReadServiceRequest, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import { parseCartCommand } from "./customer-cart.js";
import type { Prisma, ServiceDeliverableFile, ServiceExecutionStatus } from "./generated/prisma/client.js";
import { PrismaService } from "./prisma.service.js";
export const executionInclude = { files: { orderBy: { uploadedExecutionVersion: "asc" } }, events: { orderBy: { version: "asc" } } } satisfies Prisma.ServiceExecutionInclude;
type Execution = Prisma.ServiceExecutionGetPayload<{ include: typeof executionInclude }>;
export function executionView(e: Execution | null | undefined, staff = false, artist = false) {
  if (!e) return null;
  return { status: e.status, version: e.version, scheduledStart: e.scheduledStart?.toISOString() ?? null, scheduledEnd: e.scheduledEnd?.toISOString() ?? null,
    scheduleSource: e.scheduledStart ? "partner_proposal" : null, scheduleSummary: e.scheduleSummary, progressSummary: e.progressSummary,
    submissionSummary: e.submissionSummary, submissionKind: e.submissionSummary ? (e.submittedFileIds.length ? "report_with_files" : "text_report") : null, progressSource: e.progressSummary ? "partner_report" : null,
    reviewSummary: e.reviewSummary, completionSource: e.status === "completed" ? "staff_review" : null, updatedAt: e.updatedAt.toISOString(),
    submittedFileIds: e.submittedFileIds, files: e.files.filter(f => !artist || e.events.some(v => v.fileIds.includes(f.id))).map(deliverableFileView),
    history: e.events.filter(v => !artist || !(v.command && typeof v.command === "object" && !Array.isArray(v.command) && v.command.action === "file_uploaded")).map(v => ({ fileIds: v.fileIds, version: v.version, fromStatus: v.fromStatus, toStatus: v.toStatus, summary: v.summary, createdAt: v.createdAt.toISOString(), ...(staff ? { actorUserId: v.actorUserId } : {}) })) };
}
export async function initializeServiceExecution(tx: Prisma.TransactionClient, assignmentId: string, actorUserId: string, summary: string, trace: string) {
  await tx.serviceExecution.create({ data: { assignmentId } });
  await tx.serviceExecutionEvent.create({ data: { assignmentId, version: 0, toStatus: "accepted", summary, actorUserId, command: { source: "accepted_assignment" }, requestTraceId: trace } });
}
export function deliverableFileView(f: ServiceDeliverableFile) {
  return { id: f.id, label: f.label, contentType: f.contentType, byteLength: f.byteLength, sha256: f.sha256, uploadedExecutionVersion: f.uploadedExecutionVersion, createdAt: f.createdAt.toISOString() };
}
function fields(body: unknown, keys: string[]) {
  if (!body || typeof body !== "object" || Array.isArray(body) || Object.keys(body).some(k => !keys.includes(k))) throw new BadRequestException();
  return body as Record<string, unknown>;
}
function summary(v: unknown) {
  if (typeof v !== "string" || !v.trim() || v.trim().length > 4000 || /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u.test(v)) throw new BadRequestException();
  return v.trim();
}
function timestamp(v: unknown) {
  if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(v)) throw new BadRequestException("utc-time-required");
  const d = new Date(v);
  if (!Number.isFinite(d.getTime()) || d.toISOString() !== (v.includes(".") ? v : v.replace("Z", ".000Z"))) throw new BadRequestException("invalid-time");
  return d.toISOString();
}
export function parseServiceSchedule(body: unknown) {
  const b = fields(body, ["version", "scheduledStart", "scheduledEnd", "summary"]);
  const scheduledStart = timestamp(b.scheduledStart), scheduledEnd = timestamp(b.scheduledEnd);
  if (scheduledEnd <= scheduledStart) throw new BadRequestException("invalid-time-range");
  return { ...parseCartCommand({ version: b.version }), scheduledStart, scheduledEnd, summary: summary(b.summary) };
}
export function parseServiceProgress(body: unknown) {
  const b = fields(body, ["version", "action", "summary", "fileIds"]);
  if (b.action !== "start" && b.action !== "update" && b.action !== "submit") throw new BadRequestException();
  if (b.action !== "submit" && b.fileIds !== undefined) throw new BadRequestException();
  const fileIds = b.fileIds ?? [];
  if (!Array.isArray(fileIds) || fileIds.length > 8 || fileIds.some(id => typeof id !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) || new Set(fileIds.map(id => id.toLowerCase())).size !== fileIds.length) throw new BadRequestException();
  return { ...parseCartCommand({ version: b.version }), action: b.action as "start" | "update" | "submit", summary: summary(b.summary), ...(b.action === "submit" ? { fileIds: (fileIds as string[]).map(id => id.toLowerCase()) } : {}) };
}
export function parseServiceExecutionReview(body: unknown) {
  const b = fields(body, ["version", "decision", "summary"]);
  if (b.decision !== "completed" && b.decision !== "changes_requested") throw new BadRequestException();
  return { ...parseCartCommand({ version: b.version }), decision: b.decision as "completed" | "changes_requested", summary: summary(b.summary) };
}
function sameCommand(a: unknown, b: Record<string, unknown>) {
  if (!a || typeof a !== "object") return false;
  const x = a as Record<string, unknown>;
  return Object.keys(x).length === Object.keys(b).length && Object.keys(b).every(k => JSON.stringify(x[k]) === JSON.stringify(b[k]));
}
@Injectable()
export class ServiceExecutionService {
  constructor(private readonly db: PrismaService) {}
  async schedule(context: AuthorizationContext, id: string, input: ReturnType<typeof parseServiceSchedule>, trace: string) {
    this.partner(context);
    const command = parseServiceSchedule(input);
    return this.change(context, id, command, "scheduled", trace, e => {
      if (!["accepted", "scheduled"].includes(e.status) || new Date(command.scheduledStart).getTime() <= Date.now()) throw new ConflictException("service-schedule-invalid");
      return { scheduledStart: new Date(command.scheduledStart), scheduledEnd: new Date(command.scheduledEnd), scheduleSummary: command.summary };
    });
  }
  async progress(context: AuthorizationContext, id: string, input: ReturnType<typeof parseServiceProgress>, trace: string) {
    this.partner(context);
    const command = parseServiceProgress(input), status = command.action === "submit" ? "submitted" : "in_progress";
    return this.change(context, id, command, status, trace, e => {
      if (command.action === "start") {
        if (!["scheduled", "changes_requested"].includes(e.status)) throw new ConflictException("service-transition-invalid");
        return { progressSummary: command.summary };
      }
      if (e.status !== "in_progress") throw new ConflictException("service-transition-invalid");
      if (command.action === "update") return { progressSummary: command.summary };
      if (command.fileIds?.some(id => !e.files.some(f => f.id === id))) throw new NotFoundException();
      return { submissionSummary: command.summary, submittedFileIds: command.fileIds ?? [], reviewSummary: null };
    });
  }
  async review(context: AuthorizationContext, id: string, input: ReturnType<typeof parseServiceExecutionReview>, trace: string) {
    enforceDecision(canAccessStaffDomain(context, "services"));
    const command = parseServiceExecutionReview(input);
    return this.change(context, id, command, command.decision, trace, e => {
      if (e.status !== "submitted") throw new ConflictException("service-transition-invalid");
      return { reviewSummary: command.summary };
    }, true);
  }
  private partner(context: AuthorizationContext) {
    if (context.activeRole !== "service-partner" || !context.organizationId) throw new ForbiddenException();
  }
  private async change(context: AuthorizationContext, id: string, command: { version: number; summary: string } & Record<string, string | number | string[] | undefined>, status: ServiceExecutionStatus, trace: string,
    update: (e: Execution) => Prisma.ServiceExecutionUpdateInput, staff = false) {
    return this.db.$transaction(async tx => {
      const a = await tx.serviceAssignment.findUnique({ where: { id } });
      if (!a) throw new NotFoundException();
      if (!staff) enforceDecision(canReadServiceRequest(context, { assignedPartnerOrganizationId: a.partnerOrganizationId, assignedPartnerUserId: a.partnerUserId }));
      await tx.$queryRawUnsafe('SELECT "id" FROM "service_requests" WHERE "id" = $1::uuid FOR UPDATE', a.requestId);
      const current = await tx.serviceAssignment.findUniqueOrThrow({ where: { id } });
      const e = await tx.serviceExecution.findUnique({ where: { assignmentId: id }, include: executionInclude });
      if (!e || current.status !== "accepted") throw new ConflictException("service-not-accepted");
      const last = e.events.at(-1);
      if (e.version === command.version + 1 && last?.actorUserId === context.userId && last.toStatus === status && sameCommand(last.command, command)) return executionView(e, staff);
      if (e.version !== command.version) throw new ConflictException("service-execution-changed");
      const data = update(e);
      await tx.serviceExecution.update({ where: { assignmentId: id }, data: { ...data, status, version: { increment: 1 } } });
      await tx.serviceExecutionEvent.create({ data: { assignmentId: id, version: e.version + 1, fromStatus: e.status, toStatus: status, summary: command.summary, actorUserId: context.userId, command: command as Prisma.InputJsonObject, requestTraceId: trace, fileIds: status === "submitted" ? (command.fileIds as string[] | undefined) ?? [] : e.submittedFileIds } });
      return executionView(await tx.serviceExecution.findUniqueOrThrow({ where: { assignmentId: id }, include: executionInclude }), staff);
    });
  }
}
