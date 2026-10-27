import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { canAccessStaffDomain, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import { parseCartCommand } from "./customer-cart.js";
import type { Prisma } from "./generated/prisma/client.js";
import { PrismaService } from "./prisma.service.js";
export type RefundReviewCommand = { issueVersion: number; decision: "approved" | "rejected"; amountToman?: string; reason: string };
export function parseRefundReview(body: unknown): RefundReviewCommand {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const v = body as Record<string, unknown>;
  if (Object.keys(v).some(k => !["issueVersion", "decision", "amountToman", "reason"].includes(k)) ||
    !["approved", "rejected"].includes(v.decision as string) || typeof v.reason !== "string" ||
    /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u.test(v.reason)) throw new BadRequestException();
  const { version } = parseCartCommand({ version: v.issueVersion });
  const reason = v.reason.trim();
  if (!reason || reason.length > 2000 || (v.decision === "approved" ? typeof v.amountToman !== "string" || !/^[1-9][0-9]{0,22}$/.test(v.amountToman) : v.amountToman !== undefined)) throw new BadRequestException();
  return { issueVersion: version, decision: v.decision as RefundReviewCommand["decision"], reason, ...(v.decision === "approved" ? { amountToman: v.amountToman as string } : {}) };
}
const include = { refundReviews: { orderBy: { reviewedAt: "asc" } }, shipment: { include: { preparation: { include: { items: true, order: true } } } } } satisfies Prisma.CustomerShipmentIssueInclude;
type Issue = Prisma.CustomerShipmentIssueGetPayload<{ include: typeof include }>;
function view(i: Issue) {
  return { shipmentId: i.shipmentId, orderId: i.shipment.orderId, issueVersion: i.version, status: i.status, resolution: i.resolution,
    kind: i.kind, description: i.description, merchandiseSubtotalToman: i.shipment.preparation.items.reduce((s, p) => s + p.unitPriceToman * BigInt(p.quantity), 0n).toString(),
    reviews: i.refundReviews.map(r => ({ issueVersion: r.issueVersion, decision: r.decision, amountToman: r.amountToman, reason: r.reason, actorUserId: r.actorUserId, reviewedAt: r.reviewedAt.toISOString(), executionStatus: "not_executed" })) };
}
@Injectable()
export class RefundFinanceService {
  constructor(private readonly db: PrismaService) {}
  async list(context: AuthorizationContext, page: number, pageSize: number) {
    enforceDecision(canAccessStaffDomain(context, "finance"));
    const rows = await this.db.customerShipmentIssue.findMany({ where: { status: "closed", resolution: "referred_for_refund_review" }, include,
      orderBy: [{ reportedAt: "asc" }, { shipmentId: "asc" }], skip: (page - 1) * pageSize, take: pageSize + 1 });
    return { page, pageSize, hasMore: rows.length > pageSize, items: rows.slice(0, pageSize).map(view) };
  }
  async get(context: AuthorizationContext, shipmentId: string) {
    enforceDecision(canAccessStaffDomain(context, "finance"));
    const i = await this.db.customerShipmentIssue.findUnique({ where: { shipmentId }, include });
    if (!i) throw new NotFoundException();
    return view(i);
  }
  async review(context: AuthorizationContext, shipmentId: string, command: RefundReviewCommand, requestId: string) {
    enforceDecision(canAccessStaffDomain(context, "finance"));
    const input = parseRefundReview(command);
    return this.db.$transaction(async tx => {
      const rows = await tx.$queryRawUnsafe<Array<{ id: string }>>('SELECT o."id" FROM "customer_orders" o JOIN "artist_shipment_reports" s ON s."orderId" = o."id" JOIN "customer_shipment_issues" i ON i."shipmentId" = s."id" WHERE s."id" = $1::uuid FOR UPDATE OF o', shipmentId);
      if (!rows.length) throw new NotFoundException();
      const i = await tx.customerShipmentIssue.findUniqueOrThrow({ where: { shipmentId }, include });
      const replay = i.refundReviews.find(r => r.issueVersion === input.issueVersion);
      if (replay) {
        if (replay.actorUserId === context.userId && replay.decision === input.decision && replay.amountToman === (input.amountToman ?? null) && replay.reason === input.reason) return view(i);
        throw new ConflictException("refund-review-already-recorded");
      }
      if (i.version !== input.issueVersion || i.status !== "closed" || i.resolution !== "referred_for_refund_review") throw new ConflictException("refund-referral-state-changed");
      const order = i.shipment.preparation.order;
      if (order.status !== "placed" || order.paymentStatus !== "paid") throw new ConflictException("refund-order-not-paid");
      let receiptId: string | null = null;
      if (input.decision === "approved") {
        if (i.refundReviews.some(r => r.decision === "approved")) throw new ConflictException("refund-already-approved");
        const payment = await tx.paymentAttempt.findFirst({ where: { orderId: order.id, status: "succeeded", receipt: { is: { unit: "toman" } } }, include: { receipt: true, quote: true } });
        if (!payment?.receipt || payment.receipt.provider !== payment.provider || payment.receipt.amount !== payment.amountToman || payment.amountToman !== payment.quote.payableToman) throw new ConflictException("refund-verified-payment-required");
        const amount = BigInt(input.amountToman!);
        const merchandise = i.shipment.preparation.items.reduce((s, p) => s + p.unitPriceToman * BigInt(p.quantity), 0n);
        // Shipping allocation is not inferred. This slice only approves merchandise amounts.
        if (amount > merchandise) throw new ConflictException("refund-exceeds-shipment-merchandise");
        const approvals = await tx.shipmentRefundReview.findMany({ where: { orderId: order.id, decision: "approved" }, select: { amountToman: true } });
        if (approvals.reduce((s, r) => s + BigInt(r.amountToman!), amount) > BigInt(payment.receipt.amount)) throw new ConflictException("refund-exceeds-paid-amount");
        receiptId = payment.receipt.id;
      }
      await tx.shipmentRefundReview.create({ data: { shipmentId, issueVersion: i.version, orderId: order.id, receiptId, decision: input.decision,
        amountToman: input.amountToman ?? null, reason: input.reason, actorUserId: context.userId, requestId } });
      return view(await tx.customerShipmentIssue.findUniqueOrThrow({ where: { shipmentId }, include }));
    });
  }
}
