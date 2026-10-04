import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { canAccessStaffDomain, canReadServiceRequest, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parseCartCommand } from "./customer-cart.js";
import type { Prisma } from "./generated/prisma/client.js";
import { PrismaService } from "./prisma.service.js";

function object(body: unknown, keys: string[]) {
  if (!body || typeof body !== "object" || Array.isArray(body) || Object.keys(body).some(k => !keys.includes(k))) throw new BadRequestException();
  return body as Record<string, unknown>;
}
function text(value: unknown, max: number) {
  if (typeof value !== "string" || !value.trim() || value.trim().length > max || /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u.test(value)) throw new BadRequestException();
  return value.trim();
}
export function parseServiceCreate(body: unknown) {
  const b = object(body, ["idempotencyKey", "artistUserId", "title", "description", "internalNote"]);
  return { idempotencyKey: parseArtistProductId(b.idempotencyKey as string), artistUserId: parseArtistProductId(b.artistUserId as string),
    title: text(b.title, 200), description: text(b.description, 2000), ...(b.internalNote === undefined ? {} : { internalNote: text(b.internalNote, 2000) }) };
}
export function parseServiceAssign(body: unknown) {
  const b = object(body, ["version", "partnerOrganizationId", "partnerUserId"]);
  return { ...parseCartCommand({ version: b.version }), partnerOrganizationId: parseArtistProductId(b.partnerOrganizationId as string), partnerUserId: parseArtistProductId(b.partnerUserId as string) };
}
export function parseServiceResponse(body: unknown) {
  const b = object(body, ["version", "decision", "summary"]);
  if (b.decision !== "accepted" && b.decision !== "declined") throw new BadRequestException();
  return { ...parseCartCommand({ version: b.version }), decision: b.decision as "accepted" | "declined", summary: text(b.summary, 2000) };
}
const include = { assignments: { orderBy: { assignedVersion: "desc" } }, events: { orderBy: { version: "asc" } } } satisfies Prisma.ServiceRequestInclude;
type Request = Prisma.ServiceRequestGetPayload<{ include: typeof include }>;
function requestView(r: Request, staff = false) {
  const current = r.status === "awaiting_assignment" ? undefined : r.assignments[0];
  return { id: r.id, title: r.title, description: r.description, status: r.status, version: r.version, createdAt: r.createdAt.toISOString(),
    assignment: current ? { id: current.id, status: current.status, responseSummary: current.responseSummary } : null,
    history: r.events.map(e => ({ version: e.version, action: e.action, createdAt: e.createdAt.toISOString(), ...(staff ? { actorUserId: e.actorUserId, assignmentId: e.assignmentId } : {}) })),
    ...(staff ? { artistUserId: r.artistUserId, internalNote: r.internalNote, assignments: r.assignments.map(a => ({ id: a.id, partnerOrganizationId: a.partnerOrganizationId, partnerUserId: a.partnerUserId, status: a.status, assignedVersion: a.assignedVersion, responseSummary: a.responseSummary })) } : {}) };
}
const assignmentInclude = { request: { select: { id: true, title: true, description: true } } } satisfies Prisma.ServiceAssignmentInclude;
type Assignment = Prisma.ServiceAssignmentGetPayload<{ include: typeof assignmentInclude }>;
function assignmentView(a: Assignment) {
  return { id: a.id, requestId: a.requestId, title: a.request.title, description: a.request.description,
    commandVersion: a.assignedVersion, status: a.status, responseSummary: a.responseSummary, assignedAt: a.assignedAt.toISOString(), respondedAt: a.respondedAt?.toISOString() ?? null };
}
function partner(context: AuthorizationContext) {
  if (context.activeRole !== "service-partner" || !context.organizationId) throw new ForbiddenException();
}
function own(context: AuthorizationContext, a: Assignment) {
  enforceDecision(canReadServiceRequest(context, { assignedPartnerOrganizationId: a.partnerOrganizationId, assignedPartnerUserId: a.partnerUserId }));
}
// PostgreSQL jsonb key ordering is not the caller's object key ordering.
function sameCommand(a: unknown, b: unknown): boolean {
  if (!a || !b || typeof a !== "object" || typeof b !== "object") return a === b;
  const x = a as Record<string, unknown>, y = b as Record<string, unknown>;
  return Object.keys(x).length === Object.keys(y).length && Object.keys(x).every(k => x[k] === y[k]);
}
@Injectable()
export class ServiceAssignmentsService {
  constructor(private readonly db: PrismaService) {}
  async create(context: AuthorizationContext, input: ReturnType<typeof parseServiceCreate>, trace: string) {
    enforceDecision(canAccessStaffDomain(context, "services"));
    const command = parseServiceCreate(input);
    return this.db.$transaction(async tx => {
      await tx.$queryRawUnsafe('SELECT 1 AS locked FROM pg_advisory_xact_lock(hashtextextended($1, 0))', "service-create:" + context.userId + ":" + command.idempotencyKey);
      const prior = await tx.serviceRequest.findUnique({ where: { createdByUserId_idempotencyKey: { createdByUserId: context.userId, idempotencyKey: command.idempotencyKey } }, include });
      if (prior) {
        if (!sameCommand(prior.events[0]?.command, command)) throw new ConflictException("idempotency-key-reused");
        return requestView(prior, true);
      }
      if (!await tx.roleGrant.findFirst({ where: { userId: command.artistUserId, role: "artist", revokedAt: null } })) throw new NotFoundException();
      const r = await tx.serviceRequest.create({ data: { ...command, createdByUserId: context.userId } });
      await tx.serviceRequestEvent.create({ data: { requestId: r.id, version: 0, action: "created", actorUserId: context.userId, command, requestTraceId: trace } });
      return requestView(await tx.serviceRequest.findUniqueOrThrow({ where: { id: r.id }, include }), true);
    });
  }
  async requests(context: AuthorizationContext, page: number, pageSize: number, staff = false) {
    if (staff) enforceDecision(canAccessStaffDomain(context, "services"));
    else if (context.activeRole !== "artist") throw new ForbiddenException();
    const rows = await this.db.$transaction(tx => tx.serviceRequest.findMany({ where: staff ? {} : { artistUserId: context.userId }, include,
      orderBy: [{ createdAt: "desc" }, { id: "asc" }], skip: (page - 1) * pageSize, take: pageSize + 1 }), { isolationLevel: "RepeatableRead" });
    return { page, pageSize, hasMore: rows.length > pageSize, items: rows.slice(0, pageSize).map(r => requestView(r, staff)) };
  }
  async request(context: AuthorizationContext, id: string, staff = false) {
    if (staff) enforceDecision(canAccessStaffDomain(context, "services"));
    else if (context.activeRole !== "artist") throw new ForbiddenException();
    const r = await this.db.$transaction(tx => tx.serviceRequest.findFirst({ where: { id, ...(staff ? {} : { artistUserId: context.userId }) }, include }), { isolationLevel: "RepeatableRead" });
    if (!r) throw new NotFoundException();
    return requestView(r, staff);
  }
  async assign(context: AuthorizationContext, id: string, input: ReturnType<typeof parseServiceAssign>, trace: string) {
    enforceDecision(canAccessStaffDomain(context, "services"));
    const command = parseServiceAssign(input);
    return this.db.$transaction(async tx => {
      await this.lock(tx, id);
      const r = await tx.serviceRequest.findUniqueOrThrow({ where: { id }, include });
      const last = r.events.at(-1);
      if (r.version === command.version + 1 && last?.actorUserId === context.userId && last.action === "assigned" && sameCommand(last.command, command)) return requestView(r, true);
      if (r.version !== command.version || r.status !== "awaiting_assignment") throw new ConflictException("service-state-changed");
      if (!await tx.roleGrant.findFirst({ where: { userId: command.partnerUserId, organizationId: command.partnerOrganizationId, role: "service_partner", revokedAt: null } })) throw new NotFoundException();
      const a = await tx.serviceAssignment.create({ data: { requestId: id, partnerOrganizationId: command.partnerOrganizationId, partnerUserId: command.partnerUserId, assignedVersion: r.version + 1 } });
      await tx.serviceRequest.update({ where: { id }, data: { status: "assigned", version: { increment: 1 } } });
      await tx.serviceRequestEvent.create({ data: { requestId: id, assignmentId: a.id, version: r.version + 1, action: "assigned", actorUserId: context.userId, command, requestTraceId: trace } });
      return requestView(await tx.serviceRequest.findUniqueOrThrow({ where: { id }, include }), true);
    });
  }
  async assignments(context: AuthorizationContext, page: number, pageSize: number) {
    partner(context);
    const rows = await this.db.serviceAssignment.findMany({ where: { partnerOrganizationId: context.organizationId, partnerUserId: context.userId }, include: assignmentInclude,
      orderBy: [{ assignedAt: "desc" }, { id: "asc" }], skip: (page - 1) * pageSize, take: pageSize + 1 });
    return { page, pageSize, hasMore: rows.length > pageSize, items: rows.slice(0, pageSize).map(assignmentView) };
  }
  async assignment(context: AuthorizationContext, id: string) {
    partner(context);
    const a = await this.db.serviceAssignment.findUnique({ where: { id }, include: assignmentInclude });
    if (!a) throw new NotFoundException();
    own(context, a);
    return assignmentView(a);
  }
  async respond(context: AuthorizationContext, id: string, input: ReturnType<typeof parseServiceResponse>, trace: string) {
    partner(context);
    const command = parseServiceResponse(input);
    return this.db.$transaction(async tx => {
      const initial = await tx.serviceAssignment.findUnique({ where: { id }, include: assignmentInclude });
      if (!initial) throw new NotFoundException();
      own(context, initial);
      await this.lock(tx, initial.requestId);
      const a = await tx.serviceAssignment.findUniqueOrThrow({ where: { id }, include: assignmentInclude });
      const r = await tx.serviceRequest.findUniqueOrThrow({ where: { id: a.requestId }, include });
      // An old partner may replay their own final response after reassignment, but sees only that assignment.
      if (a.status === command.decision && a.responseSummary === command.summary && a.assignedVersion === command.version) return assignmentView(a);
      if (a.status !== "assigned" || r.version !== command.version || a.assignedVersion !== command.version || r.status !== "assigned") throw new ConflictException("service-state-changed");
      await tx.serviceAssignment.update({ where: { id }, data: { status: command.decision, responseSummary: command.summary, respondedAt: new Date() } });
      await tx.serviceRequest.update({ where: { id: r.id }, data: { status: command.decision === "accepted" ? "accepted" : "awaiting_assignment", version: { increment: 1 } } });
      await tx.serviceRequestEvent.create({ data: { requestId: r.id, assignmentId: id, version: r.version + 1, action: command.decision, actorUserId: context.userId, command, requestTraceId: trace } });
      return assignmentView(await tx.serviceAssignment.findUniqueOrThrow({ where: { id }, include: assignmentInclude }));
    });
  }
  private async lock(tx: Prisma.TransactionClient, id: string) {
    const rows = await tx.$queryRawUnsafe<Array<{ id: string }>>('SELECT "id" FROM "service_requests" WHERE "id" = $1::uuid FOR UPDATE', id);
    if (!rows.length) throw new NotFoundException();
  }
}
