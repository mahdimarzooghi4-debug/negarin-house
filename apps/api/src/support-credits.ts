import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { canAccessStaffDomain, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parseCartCommand } from "./customer-cart.js";
import { executionInclude, executionView } from "./service-execution.js";
import type { Prisma, SupportCreditAction } from "./generated/prisma/client.js";
import { PrismaService } from "./prisma.service.js";

function object(body: unknown, keys: string[]) {
  if (!body || typeof body !== "object" || Array.isArray(body) || Object.keys(body).some(k => !keys.includes(k))) throw new BadRequestException();
  return body as Record<string, unknown>;
}
function text(value: unknown, max: number) {
  if (typeof value !== "string" || !value.trim() || value.trim().length > max || /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u.test(value)) throw new BadRequestException();
  return value.trim();
}
function money(value: unknown) {
  if (typeof value !== "string" || !/^[1-9][0-9]{0,18}$/.test(value)) throw new BadRequestException();
  if (BigInt(value) > 9_223_372_036_854_775_807n) throw new BadRequestException();
  return value;
}
export function parseSupportProgramCreate(body: unknown) {
  const b = object(body, ["idempotencyKey", "title", "description", "rules"]);
  return {
    idempotencyKey: parseArtistProductId(b.idempotencyKey as string),
    title: text(b.title, 200), description: text(b.description, 4000), rules: text(b.rules, 8000)
  };
}
export function parseSupportRelationshipCreate(body: unknown) {
  const b = object(body, ["artistUserId"]);
  return { artistUserId: parseArtistProductId(b.artistUserId as string) };
}
export function parseSupportRelationshipApproval(body: unknown) {
  const b = object(body, ["version"]);
  return parseCartCommand({ version: b.version });
}
export function parseSupportAllocationCreate(body: unknown) {
  const b = object(body, ["idempotencyKey", "amountToman"]);
  return { idempotencyKey: parseArtistProductId(b.idempotencyKey as string), amountToman: money(b.amountToman) };
}
export function parseSupportReserve(body: unknown) {
  const b = object(body, ["version", "serviceRequestId", "reason"]);
  return { ...parseCartCommand({ version: b.version }), serviceRequestId: parseArtistProductId(b.serviceRequestId as string), reason: text(b.reason, 2000) };
}
export function parseSupportTransition(body: unknown) {
  const b = object(body, ["version", "reason"]);
  return { ...parseCartCommand({ version: b.version }), reason: text(b.reason, 2000) };
}

const requestSelect = {
  id: true, serviceCatalogItemId: true, title: true, description: true, status: true,
  assignments: { orderBy: { assignedVersion: "desc" }, take: 1, include: { execution: { include: executionInclude } } }
} satisfies Prisma.ServiceRequestSelect;
type SupportRequest = Prisma.ServiceRequestGetPayload<{ select: typeof requestSelect }>;
function requestView(r: SupportRequest | null | undefined) {
  if (!r) return null;
  const assignment = r.status === "awaiting_assignment" ? undefined : r.assignments[0];
  return {
    id: r.id, serviceId: r.serviceCatalogItemId, title: r.title, description: r.description, status: r.status,
    execution: executionView(assignment?.execution)
  };
}
const eventInclude = { serviceRequest: { select: { id: true, serviceCatalogItemId: true, title: true, description: true, status: true } } } satisfies Prisma.SupportCreditEventInclude;
const allocationInclude = {
  program: true,
  relationship: true,
  currentServiceRequest: { select: requestSelect },
  events: { orderBy: { version: "asc" }, include: eventInclude }
} satisfies Prisma.SupportAllocationInclude;
type Allocation = Prisma.SupportAllocationGetPayload<{ include: typeof allocationInclude }>;
function programView(p: { id: string; source: string; organizationId: string | null; title: string; description: string; rules: string; createdAt: Date }) {
  return { id: p.id, source: p.source, organizationId: p.organizationId, title: p.title, description: p.description, rules: p.rules, createdAt: p.createdAt.toISOString() };
}
function relationshipView(r: { id: string; programId: string; artistUserId: string; sponsorApprovedByUserId: string; sponsorApprovedAt: Date; negarinApprovedByUserId: string | null; negarinApprovedAt: Date | null; version: number; createdAt: Date }) {
  return {
    id: r.id, programId: r.programId, artistUserId: r.artistUserId,
    sponsorApproval: { approvedByUserId: r.sponsorApprovedByUserId, approvedAt: r.sponsorApprovedAt.toISOString() },
    negarinApproval: r.negarinApprovedAt ? { approvedByUserId: r.negarinApprovedByUserId, approvedAt: r.negarinApprovedAt.toISOString() } : null,
    eligible: !!r.negarinApprovedAt, version: r.version, createdAt: r.createdAt.toISOString()
  };
}
function allocationView(a: Allocation) {
  return {
    id: a.id, program: programView(a.program), relationship: relationshipView(a.relationship),
    amountToman: a.amountToman.toString(), rulesSnapshot: a.rulesSnapshot, status: a.status, version: a.version,
    currentServiceRequest: requestView(a.currentServiceRequest), createdAt: a.createdAt.toISOString(),
    history: a.events.map(e => ({
      version: e.version, action: e.action, amountToman: e.amountToman.toString(), actorUserId: e.actorUserId,
      serviceRequest: e.serviceRequest ? {
        id: e.serviceRequest.id, serviceId: e.serviceRequest.serviceCatalogItemId, title: e.serviceRequest.title,
        description: e.serviceRequest.description, status: e.serviceRequest.status
      } : null,
      createdAt: e.createdAt.toISOString()
    }))
  };
}
function sameCommand(a: unknown, b: Record<string, unknown>) {
  if (!a || typeof a !== "object" || Array.isArray(a)) return false;
  const x = a as Record<string, unknown>;
  return Object.keys(x).length === Object.keys(b).length && Object.keys(b).every(k => JSON.stringify(x[k]) === JSON.stringify(b[k]));
}
function organization(context: AuthorizationContext) {
  if (context.activeRole !== "supporting-organization" || !context.organizationId) throw new ForbiddenException();
}
function artist(context: AuthorizationContext) {
  if (context.activeRole !== "artist") throw new ForbiddenException();
}

@Injectable()
export class SupportCreditsService {
  constructor(private readonly db: PrismaService) {}

  async createOrganizationProgram(context: AuthorizationContext, input: ReturnType<typeof parseSupportProgramCreate>, trace: string) {
    organization(context);
    return this.createProgram(context, input, trace, "supporting_organization", context.organizationId!);
  }
  async createNegarinProgram(context: AuthorizationContext, input: ReturnType<typeof parseSupportProgramCreate>, trace: string) {
    enforceDecision(canAccessStaffDomain(context, "artists"));
    return this.createProgram(context, input, trace, "negarin_csr", null);
  }
  private async createProgram(context: AuthorizationContext, input: ReturnType<typeof parseSupportProgramCreate>, trace: string,
    source: "supporting_organization" | "negarin_csr", organizationId: string | null) {
    const command = parseSupportProgramCreate(input);
    return this.db.$transaction(async tx => {
      await tx.$queryRawUnsafe('SELECT 1 AS locked FROM pg_advisory_xact_lock(hashtextextended($1, 0))', "support-program:" + context.userId + ":" + command.idempotencyKey);
      const prior = await tx.supportProgram.findUnique({ where: { createdByUserId_idempotencyKey: { createdByUserId: context.userId, idempotencyKey: command.idempotencyKey } } });
      if (prior) {
        if (prior.source !== source || prior.organizationId !== organizationId || prior.title !== command.title || prior.description !== command.description || prior.rules !== command.rules) throw new ConflictException("idempotency-key-reused");
        return programView(prior);
      }
      const p = await tx.supportProgram.create({ data: { ...command, source, organizationId, createdByUserId: context.userId } });
      await tx.supportProgramEvent.create({ data: { programId: p.id, action: "created", actorUserId: context.userId, command, requestTraceId: trace } });
      return programView(p);
    });
  }

  async programs(context: AuthorizationContext, page: number, pageSize: number, staff = false) {
    let where: Prisma.SupportProgramWhereInput;
    if (staff) { enforceDecision(canAccessStaffDomain(context, "artists")); where = {}; }
    else { organization(context); where = { source: "supporting_organization", organizationId: context.organizationId }; }
    const rows = await this.db.supportProgram.findMany({ where, orderBy: [{ createdAt: "desc" }, { id: "asc" }], skip: (page - 1) * pageSize, take: pageSize + 1 });
    return { page, pageSize, hasMore: rows.length > pageSize, items: rows.slice(0, pageSize).map(programView) };
  }
  async program(context: AuthorizationContext, id: string, staff = false) {
    let where: Prisma.SupportProgramWhereInput = { id };
    if (staff) enforceDecision(canAccessStaffDomain(context, "artists"));
    else { organization(context); where = { id, source: "supporting_organization", organizationId: context.organizationId }; }
    const p = await this.db.supportProgram.findFirst({ where });
    if (!p) throw new NotFoundException();
    return programView(p);
  }

  async createOrganizationRelationship(context: AuthorizationContext, programId: string, input: ReturnType<typeof parseSupportRelationshipCreate>, trace: string) {
    organization(context);
    return this.createRelationship(context, programId, input, trace, { source: "supporting_organization", organizationId: context.organizationId! });
  }
  async createNegarinRelationship(context: AuthorizationContext, programId: string, input: ReturnType<typeof parseSupportRelationshipCreate>, trace: string) {
    enforceDecision(canAccessStaffDomain(context, "artists"));
    return this.createRelationship(context, programId, input, trace, { source: "negarin_csr", organizationId: null });
  }
  private async createRelationship(context: AuthorizationContext, programId: string, input: ReturnType<typeof parseSupportRelationshipCreate>, trace: string,
    owner: { source: "supporting_organization" | "negarin_csr"; organizationId: string | null }) {
    const command = parseSupportRelationshipCreate(input);
    return this.db.$transaction(async tx => {
      const p = await tx.supportProgram.findFirst({ where: { id: programId, source: owner.source, organizationId: owner.organizationId } });
      if (!p) throw new NotFoundException();
      if (!await tx.roleGrant.findFirst({ where: { userId: command.artistUserId, role: "artist", revokedAt: null } })) throw new NotFoundException();
      await tx.$queryRawUnsafe('SELECT 1 AS locked FROM pg_advisory_xact_lock(hashtextextended($1, 0))', "support-relationship:" + programId + ":" + command.artistUserId);
      const prior = await tx.supportRelationship.findUnique({ where: { programId_artistUserId: { programId, artistUserId: command.artistUserId } } });
      if (prior) return relationshipView(prior);
      const relationship = await tx.supportRelationship.create({ data: {
        programId, artistUserId: command.artistUserId, sponsorApprovedByUserId: context.userId
      } });
      await tx.supportRelationshipEvent.create({ data: {
        relationshipId: relationship.id, version: 0, action: "sponsor_approved", actorUserId: context.userId, command, requestTraceId: trace
      } });
      return relationshipView(relationship);
    });
  }

  async approveRelationship(context: AuthorizationContext, id: string, input: ReturnType<typeof parseSupportRelationshipApproval>, trace: string) {
    enforceDecision(canAccessStaffDomain(context, "artists"));
    const command = parseSupportRelationshipApproval(input);
    return this.db.$transaction(async tx => {
      const rows = await tx.$queryRawUnsafe<Array<{ id: string }>>('SELECT "id" FROM "support_relationships" WHERE "id" = $1::uuid FOR UPDATE', id);
      if (!rows.length) throw new NotFoundException();
      const r = await tx.supportRelationship.findUniqueOrThrow({ where: { id }, include: { events: { orderBy: { version: "asc" } } } });
      const last = r.events.at(-1);
      if (r.version === command.version + 1 && r.negarinApprovedAt && last?.action === "negarin_approved" && last.actorUserId === context.userId && sameCommand(last.command, command)) return relationshipView(r);
      if (r.version !== command.version || r.negarinApprovedAt) throw new ConflictException("support-relationship-changed");
      const updated = await tx.supportRelationship.update({ where: { id }, data: {
        negarinApprovedByUserId: context.userId, negarinApprovedAt: new Date(), version: { increment: 1 }
      } });
      await tx.supportRelationshipEvent.create({ data: {
        relationshipId: id, version: r.version + 1, action: "negarin_approved", actorUserId: context.userId, command, requestTraceId: trace
      } });
      return relationshipView(updated);
    });
  }

  async relationships(context: AuthorizationContext, page: number, pageSize: number, audience: "organization" | "artist" | "staff") {
    let where: Prisma.SupportRelationshipWhereInput;
    if (audience === "staff") { enforceDecision(canAccessStaffDomain(context, "artists")); where = {}; }
    else if (audience === "artist") { artist(context); where = { artistUserId: context.userId }; }
    else { organization(context); where = { program: { source: "supporting_organization", organizationId: context.organizationId } }; }
    const rows = await this.db.supportRelationship.findMany({ where, orderBy: [{ createdAt: "desc" }, { id: "asc" }], skip: (page - 1) * pageSize, take: pageSize + 1 });
    return { page, pageSize, hasMore: rows.length > pageSize, items: rows.slice(0, pageSize).map(relationshipView) };
  }
  async relationship(context: AuthorizationContext, id: string, audience: "organization" | "artist" | "staff") {
    let where: Prisma.SupportRelationshipWhereInput = { id };
    if (audience === "staff") enforceDecision(canAccessStaffDomain(context, "artists"));
    else if (audience === "artist") { artist(context); where = { id, artistUserId: context.userId }; }
    else { organization(context); where = { id, program: { source: "supporting_organization", organizationId: context.organizationId } }; }
    const r = await this.db.supportRelationship.findFirst({ where });
    if (!r) throw new NotFoundException();
    return relationshipView(r);
  }

  async createOrganizationAllocation(context: AuthorizationContext, relationshipId: string, input: ReturnType<typeof parseSupportAllocationCreate>, trace: string) {
    organization(context);
    return this.createAllocation(context, relationshipId, input, trace, { source: "supporting_organization", organizationId: context.organizationId! });
  }
  async createNegarinAllocation(context: AuthorizationContext, relationshipId: string, input: ReturnType<typeof parseSupportAllocationCreate>, trace: string) {
    enforceDecision(canAccessStaffDomain(context, "artists"));
    return this.createAllocation(context, relationshipId, input, trace, { source: "negarin_csr", organizationId: null });
  }
  private async createAllocation(context: AuthorizationContext, relationshipId: string, input: ReturnType<typeof parseSupportAllocationCreate>, trace: string,
    owner: { source: "supporting_organization" | "negarin_csr"; organizationId: string | null }) {
    const parsed = parseSupportAllocationCreate(input);
    const command = { relationshipId, ...parsed };
    return this.db.$transaction(async tx => {
      const relationship = await tx.supportRelationship.findFirst({ where: {
        id: relationshipId, negarinApprovedAt: { not: null }, program: { source: owner.source, organizationId: owner.organizationId }
      }, include: { program: true } });
      if (!relationship) throw new NotFoundException();

      await tx.$queryRawUnsafe('SELECT 1 AS locked FROM pg_advisory_xact_lock(hashtextextended($1, 0))', "support-allocation:" + relationshipId + ":" + context.userId + ":" + parsed.idempotencyKey);
      const prior = await tx.supportAllocation.findUnique({ where: {
        relationshipId_createdByUserId_idempotencyKey: {
          relationshipId, createdByUserId: context.userId, idempotencyKey: parsed.idempotencyKey
        }
      }, include: allocationInclude });
      if (prior) {
        if (prior.amountToman.toString() !== parsed.amountToman) throw new ConflictException("idempotency-key-reused");
        return allocationView(prior);
      }
      const allocation = await tx.supportAllocation.create({ data: {
        programId: relationship.programId, relationshipId, createdByUserId: context.userId, idempotencyKey: parsed.idempotencyKey,
        amountToman: BigInt(parsed.amountToman), rulesSnapshot: relationship.program.rules
      } });
      await tx.supportCreditEvent.create({ data: {
        allocationId: allocation.id, version: 0, action: "allocated", amountToman: BigInt(parsed.amountToman),
        actorUserId: context.userId, command, requestTraceId: trace
      } });
      return allocationView(await tx.supportAllocation.findUniqueOrThrow({ where: { id: allocation.id }, include: allocationInclude }));
    });
  }

  async allocations(context: AuthorizationContext, page: number, pageSize: number, audience: "organization" | "artist" | "staff") {
    let where: Prisma.SupportAllocationWhereInput;
    if (audience === "staff") { enforceDecision(canAccessStaffDomain(context, "artists")); where = {}; }
    else if (audience === "artist") { artist(context); where = { relationship: { artistUserId: context.userId } }; }
    else { organization(context); where = { program: { source: "supporting_organization", organizationId: context.organizationId } }; }
    const rows = await this.db.supportAllocation.findMany({ where, include: allocationInclude, orderBy: [{ createdAt: "desc" }, { id: "asc" }], skip: (page - 1) * pageSize, take: pageSize + 1 });
    return { page, pageSize, hasMore: rows.length > pageSize, items: rows.slice(0, pageSize).map(allocationView) };
  }
  async allocation(context: AuthorizationContext, id: string, audience: "organization" | "artist" | "staff") {
    let where: Prisma.SupportAllocationWhereInput = { id };
    if (audience === "staff") enforceDecision(canAccessStaffDomain(context, "artists"));
    else if (audience === "artist") { artist(context); where = { id, relationship: { artistUserId: context.userId } }; }
    else { organization(context); where = { id, program: { source: "supporting_organization", organizationId: context.organizationId } }; }
    const a = await this.db.supportAllocation.findFirst({ where, include: allocationInclude });
    if (!a) throw new NotFoundException();
    return allocationView(a);
  }

  async reserve(context: AuthorizationContext, id: string, input: ReturnType<typeof parseSupportReserve>, trace: string) {
    enforceDecision(canAccessStaffDomain(context, "services"));
    const command = parseSupportReserve(input);
    return this.changeCredit(context, id, "reserved", command, "reserved", trace);
  }
  async consume(context: AuthorizationContext, id: string, input: ReturnType<typeof parseSupportTransition>, trace: string) {
    enforceDecision(canAccessStaffDomain(context, "services"));
    return this.changeCredit(context, id, "consumed", parseSupportTransition(input), "consumed", trace);
  }
  async release(context: AuthorizationContext, id: string, input: ReturnType<typeof parseSupportTransition>, trace: string) {
    enforceDecision(canAccessStaffDomain(context, "services"));
    return this.changeCredit(context, id, "available", parseSupportTransition(input), "released", trace);
  }
  async reverse(context: AuthorizationContext, id: string, input: ReturnType<typeof parseSupportTransition>, trace: string) {
    enforceDecision(canAccessStaffDomain(context, "finance"));
    return this.changeCredit(context, id, "available", parseSupportTransition(input), "reversed", trace);
  }

  private async changeCredit(context: AuthorizationContext, id: string, target: "available" | "reserved" | "consumed",
    command: ReturnType<typeof parseSupportTransition> | ReturnType<typeof parseSupportReserve>, action: SupportCreditAction, trace: string) {
    return this.db.$transaction(async tx => {
      const rows = await tx.$queryRawUnsafe<Array<{ id: string }>>('SELECT "id" FROM "support_allocations" WHERE "id" = $1::uuid FOR UPDATE', id);
      if (!rows.length) throw new NotFoundException();
      const a = await tx.supportAllocation.findUniqueOrThrow({ where: { id }, include: allocationInclude });
      const last = a.events.at(-1);
      if (a.version === command.version + 1 && last?.action === action && last.actorUserId === context.userId && sameCommand(last.command, command)) return allocationView(a);
      if (a.version !== command.version) throw new ConflictException("support-credit-changed");
      const valid = action === "reserved" ? a.status === "available"
        : action === "consumed" ? a.status === "reserved"
        : action === "released" ? a.status === "reserved"
        : a.status === "consumed";
      if (!valid) throw new ConflictException("support-credit-transition-invalid");

      let serviceRequestId = a.currentServiceRequestId;
      if (action === "reserved") {
        serviceRequestId = (command as ReturnType<typeof parseSupportReserve>).serviceRequestId;
        const request = await tx.serviceRequest.findFirst({ where: { id: serviceRequestId, artistUserId: a.relationship.artistUserId }, select: { id: true } });
        if (!request) throw new NotFoundException();
      }
      if (!serviceRequestId) throw new ConflictException("support-credit-request-missing");
      const currentServiceRequestId = target === "available" ? null : serviceRequestId;
      await tx.supportAllocation.update({ where: { id }, data: { status: target, currentServiceRequestId, version: { increment: 1 } } });
      await tx.supportCreditEvent.create({ data: {
        allocationId: id, version: a.version + 1, action, amountToman: a.amountToman, serviceRequestId,
        actorUserId: context.userId, command, requestTraceId: trace
      } });
      return allocationView(await tx.supportAllocation.findUniqueOrThrow({ where: { id }, include: allocationInclude }));
    });
  }
}
