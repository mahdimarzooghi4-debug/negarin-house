import { ForbiddenException, Injectable } from "@nestjs/common";
import { canAccessStaffDomain, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import type { Prisma, SupportCreditAction } from "./generated/prisma/client.js";
import { PrismaService } from "./prisma.service.js";

export type SupportReportingAudience = "organization" | "artist" | "staff";

function authorize(context: AuthorizationContext, audience: SupportReportingAudience) {
  if (audience === "staff") {
    enforceDecision(canAccessStaffDomain(context, "reports"));
    return;
  }
  if (audience === "artist") {
    if (context.activeRole !== "artist") throw new ForbiddenException();
    return;
  }
  if (context.activeRole !== "supporting-organization" || !context.organizationId) throw new ForbiddenException();
}

function programWhere(context: AuthorizationContext, audience: SupportReportingAudience): Prisma.SupportProgramWhereInput {
  if (audience === "staff") return {};
  if (audience === "artist") return { relationships: { some: { artistUserId: context.userId } } };
  return { source: "supporting_organization", organizationId: context.organizationId };
}
function relationshipWhere(context: AuthorizationContext, audience: SupportReportingAudience): Prisma.SupportRelationshipWhereInput {
  if (audience === "staff") return {};
  if (audience === "artist") return { artistUserId: context.userId };
  return { program: { source: "supporting_organization", organizationId: context.organizationId } };
}
function allocationWhere(context: AuthorizationContext, audience: SupportReportingAudience): Prisma.SupportAllocationWhereInput {
  if (audience === "staff") return {};
  if (audience === "artist") return { relationship: { artistUserId: context.userId } };
  return { program: { source: "supporting_organization", organizationId: context.organizationId } };
}
function eventWhere(context: AuthorizationContext, audience: SupportReportingAudience): Prisma.SupportCreditEventWhereInput {
  if (audience === "staff") return {};
  if (audience === "artist") return { allocation: { relationship: { artistUserId: context.userId } } };
  return { allocation: { program: { source: "supporting_organization", organizationId: context.organizationId } } };
}
function add(map: Map<string, bigint>, key: string, amount: bigint) {
  map.set(key, (map.get(key) ?? 0n) + amount);
}
function byAction(events: Array<{ action: SupportCreditAction; amountToman: bigint }>) {
  const seed = {
    allocated: { count: 0, amountToman: 0n },
    reserved: { count: 0, amountToman: 0n },
    released: { count: 0, amountToman: 0n },
    consumed: { count: 0, amountToman: 0n },
    reversed: { count: 0, amountToman: 0n }
  };
  for (const e of events) {
    seed[e.action].count++;
    seed[e.action].amountToman += e.amountToman;
  }
  return Object.fromEntries(Object.entries(seed).map(([action, v]) => [action, { count: v.count, amountToman: v.amountToman.toString() }]));
}
function reason(command: Prisma.JsonValue) {
  if (!command || typeof command !== "object" || Array.isArray(command)) return null;
  const value = (command as Record<string, Prisma.JsonValue>).reason;
  return typeof value === "string" ? value : null;
}

@Injectable()
export class SupportReportingService {
  constructor(private readonly db: PrismaService) {}

  async summary(context: AuthorizationContext, audience: SupportReportingAudience) {
    authorize(context, audience);
    return this.db.$transaction(async tx => {
      const [programs, relationships, allocations, events] = await Promise.all([
        tx.supportProgram.findMany({
          where: programWhere(context, audience),
          orderBy: [{ createdAt: "asc" }, { id: "asc" }],
          select: { id: true, source: true, organizationId: true, title: true, description: true, rules: true, createdAt: true }
        }),
        tx.supportRelationship.findMany({
          where: relationshipWhere(context, audience),
          select: { id: true, programId: true, artistUserId: true, negarinApprovedAt: true }
        }),
        tx.supportAllocation.findMany({
          where: allocationWhere(context, audience),
          select: { id: true, programId: true, relationshipId: true, amountToman: true, status: true }
        }),
        tx.supportCreditEvent.findMany({
          where: eventWhere(context, audience),
          select: { action: true, amountToman: true, allocation: { select: { programId: true } } }
        })
      ]);

      const relationshipCount = new Map<string, number>(), eligibleCount = new Map<string, number>(), allocationCount = new Map<string, number>();
      const total = new Map<string, bigint>(), available = new Map<string, bigint>(), reserved = new Map<string, bigint>(), consumed = new Map<string, bigint>();
      const programEvents = new Map<string, Array<{ action: SupportCreditAction; amountToman: bigint }>>();
      for (const r of relationships) {
        relationshipCount.set(r.programId, (relationshipCount.get(r.programId) ?? 0) + 1);
        if (r.negarinApprovedAt) eligibleCount.set(r.programId, (eligibleCount.get(r.programId) ?? 0) + 1);
      }
      for (const a of allocations) {
        allocationCount.set(a.programId, (allocationCount.get(a.programId) ?? 0) + 1);
        add(total, a.programId, a.amountToman);
        if (a.status === "available") add(available, a.programId, a.amountToman);
        if (a.status === "reserved") add(reserved, a.programId, a.amountToman);
        if (a.status === "consumed") add(consumed, a.programId, a.amountToman);
      }
      for (const e of events) {
        const list = programEvents.get(e.allocation.programId) ?? [];
        list.push({ action: e.action, amountToman: e.amountToman });
        programEvents.set(e.allocation.programId, list);
      }

      const item = (p: (typeof programs)[number]) => ({
        program: {
          id: p.id, source: p.source, organizationId: p.organizationId, title: p.title,
          description: p.description, rules: p.rules, createdAt: p.createdAt.toISOString()
        },
        relationships: {
          total: relationshipCount.get(p.id) ?? 0,
          eligible: eligibleCount.get(p.id) ?? 0,
          pendingNegarinApproval: (relationshipCount.get(p.id) ?? 0) - (eligibleCount.get(p.id) ?? 0)
        },
        allocations: {
          total: allocationCount.get(p.id) ?? 0,
          allocatedToman: (total.get(p.id) ?? 0n).toString(),
          currentAvailableToman: (available.get(p.id) ?? 0n).toString(),
          currentReservedToman: (reserved.get(p.id) ?? 0n).toString(),
          currentConsumedToman: (consumed.get(p.id) ?? 0n).toString()
        },
        lifecycle: byAction(programEvents.get(p.id) ?? [])
      });
      const items = programs.map(item);
      const sum = (field: "allocatedToman" | "currentAvailableToman" | "currentReservedToman" | "currentConsumedToman") =>
        items.reduce((v, p) => v + BigInt(p.allocations[field]), 0n).toString();

      return {
        totals: {
          programs: programs.length,
          relationships: relationships.length,
          eligibleRelationships: relationships.filter(r => !!r.negarinApprovedAt).length,
          pendingNegarinApprovalRelationships: relationships.filter(r => !r.negarinApprovedAt).length,
          allocations: allocations.length,
          allocatedToman: sum("allocatedToman"),
          currentAvailableToman: sum("currentAvailableToman"),
          currentReservedToman: sum("currentReservedToman"),
          currentConsumedToman: sum("currentConsumedToman")
        },
        lifecycle: byAction(events),
        programs: items
      };
    }, { isolationLevel: "RepeatableRead" });
  }

  async activity(context: AuthorizationContext, audience: SupportReportingAudience, page: number, pageSize: number) {
    authorize(context, audience);
    const rows = await this.db.$transaction(tx => tx.supportCreditEvent.findMany({
      where: eventWhere(context, audience),
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      skip: (page - 1) * pageSize,
      take: pageSize + 1,
      select: {
        id: true, version: true, action: true, amountToman: true, actorUserId: true, command: true, createdAt: true,
        allocation: {
          select: {
            id: true, status: true, version: true,
            program: { select: { id: true, source: true, organizationId: true, title: true } },
            relationship: { select: { id: true, artistUserId: true } }
          }
        },
        serviceRequest: { select: { id: true, serviceCatalogItemId: true, title: true, description: true, status: true } }
      }
    }), { isolationLevel: "RepeatableRead" });
    return {
      page, pageSize, hasMore: rows.length > pageSize,
      items: rows.slice(0, pageSize).map(e => ({
        id: e.id, version: e.version, action: e.action, amountToman: e.amountToman.toString(),
        actorUserId: e.actorUserId, reason: reason(e.command), createdAt: e.createdAt.toISOString(),
        allocation: { id: e.allocation.id, status: e.allocation.status, version: e.allocation.version },
        program: e.allocation.program,
        relationship: e.allocation.relationship,
        serviceRequest: e.serviceRequest ? {
          id: e.serviceRequest.id, serviceId: e.serviceRequest.serviceCatalogItemId, title: e.serviceRequest.title,
          description: e.serviceRequest.description, status: e.serviceRequest.status
        } : null
      }))
    };
  }
}
