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
function lifecycleFromGroups(rows: Array<{ action: SupportCreditAction; _count: { _all: number }; _sum: { amountToman: bigint | null } }>) {
  const seed: Record<SupportCreditAction, { count: number; amountToman: bigint }> = {
    allocated: { count: 0, amountToman: 0n },
    reserved: { count: 0, amountToman: 0n },
    released: { count: 0, amountToman: 0n },
    consumed: { count: 0, amountToman: 0n },
    reversed: { count: 0, amountToman: 0n }
  };
  for (const row of rows) seed[row.action] = { count: row._count._all, amountToman: row._sum.amountToman ?? 0n };
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
      const [programs, relationshipGroups, eligibleGroups, allocationGroups, lifecycleGroups] = await Promise.all([
        tx.supportProgram.findMany({
          where: programWhere(context, audience),
          orderBy: [{ createdAt: "asc" }, { id: "asc" }],
          select: { id: true, source: true, organizationId: true, title: true, description: true, rules: true, createdAt: true }
        }),
        tx.supportRelationship.groupBy({
          by: ["programId"], where: relationshipWhere(context, audience), _count: { _all: true }
        }),
        tx.supportRelationship.groupBy({
          by: ["programId"], where: { AND: [relationshipWhere(context, audience), { negarinApprovedAt: { not: null } }] }, _count: { _all: true }
        }),
        tx.supportAllocation.groupBy({
          by: ["programId", "status"], where: allocationWhere(context, audience), _count: { _all: true }, _sum: { amountToman: true }
        }),
        tx.supportCreditEvent.groupBy({
          by: ["action"], where: eventWhere(context, audience), _count: { _all: true }, _sum: { amountToman: true }
        })
      ]);

      const relationshipCount = new Map(relationshipGroups.map(row => [row.programId, row._count._all]));
      const eligibleCount = new Map(eligibleGroups.map(row => [row.programId, row._count._all]));
      const allocationsByProgram = new Map<string, typeof allocationGroups>();
      for (const row of allocationGroups) {
        const rows = allocationsByProgram.get(row.programId) ?? [];
        rows.push(row);
        allocationsByProgram.set(row.programId, rows);
      }
      const amountFor = (rows: typeof allocationGroups, status?: "available" | "reserved" | "consumed") =>
        rows.filter(row => !status || row.status === status).reduce((sum, row) => sum + (row._sum.amountToman ?? 0n), 0n);
      const countFor = (rows: typeof allocationGroups) => rows.reduce((sum, row) => sum + row._count._all, 0);

      const items = programs.map(p => {
        const rows = allocationsByProgram.get(p.id) ?? [];
        const relationships = relationshipCount.get(p.id) ?? 0;
        const eligible = eligibleCount.get(p.id) ?? 0;
        return {
          program: {
            id: p.id, source: p.source, organizationId: p.organizationId, title: p.title,
            description: p.description, rules: p.rules, createdAt: p.createdAt.toISOString()
          },
          relationships: { total: relationships, eligible, pendingNegarinApproval: relationships - eligible },
          allocations: {
            total: countFor(rows),
            allocatedToman: amountFor(rows).toString(),
            currentAvailableToman: amountFor(rows, "available").toString(),
            currentReservedToman: amountFor(rows, "reserved").toString(),
            currentConsumedToman: amountFor(rows, "consumed").toString()
          }
        };
      });
      const sum = (field: "allocatedToman" | "currentAvailableToman" | "currentReservedToman" | "currentConsumedToman") =>
        items.reduce((v, p) => v + BigInt(p.allocations[field]), 0n).toString();
      const relationships = relationshipGroups.reduce((sum, row) => sum + row._count._all, 0);
      const eligibleRelationships = eligibleGroups.reduce((sum, row) => sum + row._count._all, 0);

      return {
        totals: {
          programs: programs.length,
          relationships,
          eligibleRelationships,
          pendingNegarinApprovalRelationships: relationships - eligibleRelationships,
          allocations: allocationGroups.reduce((sum, row) => sum + row._count._all, 0),
          allocatedToman: sum("allocatedToman"),
          currentAvailableToman: sum("currentAvailableToman"),
          currentReservedToman: sum("currentReservedToman"),
          currentConsumedToman: sum("currentConsumedToman")
        },
        lifecycle: lifecycleFromGroups(lifecycleGroups),
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
            id: true,
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
        allocation: { id: e.allocation.id },
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
