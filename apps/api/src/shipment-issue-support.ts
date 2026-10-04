import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { canAccessStaffDomain, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import { parseCartCommand } from "./customer-cart.js";
import { parseOrderPage } from "./customer-orders.js";
import type { Prisma } from "./generated/prisma/client.js";
import { PrismaService } from "./prisma.service.js";
export type SupportCommand = { version: number; status: "in_review" | "closed"; summary: string; resolution?: "customer_follow_up_complete" | "referred_for_refund_review" };
export function parseSupportCommand(body: unknown): SupportCommand {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const v = body as Record<string, unknown>;
  if (Object.keys(v).some(k => !["version", "status", "summary", "resolution"].includes(k)) ||
    !["in_review", "closed"].includes(v.status as string) || typeof v.summary !== "string" ||
    /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u.test(v.summary)) throw new BadRequestException();
  const { version } = parseCartCommand({ version: v.version });
  const summary = v.summary.trim();
  if (!summary || summary.length > 2000 || (v.status === "closed" ? !["customer_follow_up_complete", "referred_for_refund_review"].includes(v.resolution as string) : v.resolution !== undefined)) throw new BadRequestException();
  return { version, summary, status: v.status as SupportCommand["status"], ...(v.status === "closed" ? { resolution: v.resolution as SupportCommand["resolution"] } : {}) };
}
export function parseSupportPage(query: Record<string, unknown>) {
  const { status, ...paging } = query;
  if (status !== undefined && !["open", "in_review", "closed"].includes(status as string)) throw new BadRequestException();
  return { ...parseOrderPage(paging), status: status as "open" | "in_review" | "closed" | undefined };
}
const include = { events: { orderBy: { version: "asc" } }, shipment: { select: { orderId: true, carrierName: true, trackingCode: true } } } satisfies Prisma.CustomerShipmentIssueInclude;
type Issue = Prisma.CustomerShipmentIssueGetPayload<{ include: typeof include }>;
function view(i: Issue, detail = false) {
  return { shipmentId: i.shipmentId, orderId: i.shipment.orderId, status: i.status, version: i.version, kind: i.kind, description: i.description,
    reportedAt: i.reportedAt.toISOString(), resolution: i.resolution, resolutionSummary: i.resolutionSummary,
    ...(detail ? { carrierName: i.shipment.carrierName, trackingCode: i.shipment.trackingCode,
      history: i.events.map(e => ({ version: e.version, fromStatus: e.fromStatus, toStatus: e.toStatus, resolution: e.resolution, summary: e.summary, actorUserId: e.actorUserId, createdAt: e.createdAt.toISOString() })) } : {}) };
}
@Injectable()
export class ShipmentIssueSupportService {
  constructor(private readonly db: PrismaService) {}
  async list(context: AuthorizationContext, query: ReturnType<typeof parseSupportPage>) {
    enforceDecision(canAccessStaffDomain(context, "orders"));
    const rows = await this.db.customerShipmentIssue.findMany({ where: { ...(query.status ? { status: query.status } : {}) }, include,
      orderBy: [{ reportedAt: "asc" }, { shipmentId: "asc" }], skip: (query.page - 1) * query.pageSize, take: query.pageSize + 1 });
    return { page: query.page, pageSize: query.pageSize, hasMore: rows.length > query.pageSize, items: rows.slice(0, query.pageSize).map(i => view(i)) };
  }
  async get(context: AuthorizationContext, shipmentId: string) {
    enforceDecision(canAccessStaffDomain(context, "orders"));
    const i = await this.db.customerShipmentIssue.findUnique({ where: { shipmentId }, include });
    if (!i) throw new NotFoundException();
    return view(i, true);
  }
  async change(context: AuthorizationContext, shipmentId: string, command: SupportCommand, requestId: string) {
    enforceDecision(canAccessStaffDomain(context, "orders"));
    const input = parseSupportCommand(command);
    return this.db.$transaction(async tx => {
      const rows = await tx.$queryRawUnsafe<Array<{ id: string }>>('SELECT o."id" FROM "customer_orders" o JOIN "artist_shipment_reports" s ON s."orderId" = o."id" JOIN "customer_shipment_issues" i ON i."shipmentId" = s."id" WHERE s."id" = $1::uuid FOR UPDATE OF o', shipmentId);
      if (!rows.length) throw new NotFoundException();
      const i = await tx.customerShipmentIssue.findUniqueOrThrow({ where: { shipmentId }, include });
      const last = i.events.at(-1);
      if (i.version === input.version + 1 && last?.actorUserId === context.userId && last.toStatus === input.status &&
        last.summary === input.summary && last.resolution === (input.resolution ?? null)) return view(i, true);
      if (await tx.shipmentRefundReview.count({ where: { shipmentId, decision: "approved" } })) throw new ConflictException("approved-refund-requires-finance-workflow");
      if (i.version !== input.version) throw new ConflictException("issue-state-changed");
      if (!(input.status === "in_review" && ["open", "closed"].includes(i.status)) && !(input.status === "closed" && i.status === "in_review")) throw new ConflictException("issue-transition-invalid");
      await tx.customerShipmentIssue.update({ where: { shipmentId }, data: { status: input.status, version: { increment: 1 }, resolution: input.resolution ?? null, resolutionSummary: input.status === "closed" ? input.summary : null } });
      await tx.shipmentIssueEvent.create({ data: { shipmentId, version: i.version + 1, fromStatus: i.status, toStatus: input.status, resolution: input.resolution ?? null, summary: input.summary, actorUserId: context.userId, requestId } });
      return view(await tx.customerShipmentIssue.findUniqueOrThrow({ where: { shipmentId }, include }), true);
    });
  }
}
