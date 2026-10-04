import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { canAccessStaffDomain, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parseOrderPage } from "./customer-orders.js";
import type { PaymentReceipt, ShipmentRefundReview, Prisma } from "./generated/prisma/client.js";
import { PrismaService } from "./prisma.service.js";
export function artistSaleAmounts(items: ReadonlyArray<{ artistUserId: string; unitPriceToman: bigint; quantity: number }>) {
  const totals = new Map<string, bigint>();
  for (const i of items) totals.set(i.artistUserId, (totals.get(i.artistUserId) ?? 0n) + i.unitPriceToman * BigInt(i.quantity));
  return [...totals].sort(([a], [b]) => a.localeCompare(b)).map(([artistUserId, amount]) => ({ artistUserId, amountToman: amount.toString() }));
}
export async function recordPaymentFinancialEvents(tx: Prisma.TransactionClient, orderId: string, receipt: PaymentReceipt, actorUserId: string, requestId: string) {
  const items = await tx.customerOrderItem.findMany({ where: { orderId }, select: { artistUserId: true, unitPriceToman: true, quantity: true } });
  await tx.financialEvent.create({ data: { eventKey: "payment:" + receipt.id, kind: "payment_received", orderId, paymentReceiptId: receipt.id,
    amountToman: receipt.amount, actorUserId, requestId, occurredAt: receipt.receivedAt } });
  await tx.financialEvent.createMany({ data: artistSaleAmounts(items).map(i => ({ eventKey: "sale:" + receipt.id + ":" + i.artistUserId,
    kind: "sale_verified" as const, orderId, artistUserId: i.artistUserId, amountToman: i.amountToman, paymentReceiptId: receipt.id, actorUserId, requestId, occurredAt: receipt.receivedAt })) });
}
export async function recordRefundFinancialEvent(tx: Prisma.TransactionClient, r: ShipmentRefundReview, artistUserId: string) {
  await tx.financialEvent.create({ data: { eventKey: "refund:" + r.id, kind: r.decision === "approved" ? "refund_approved" : "refund_rejected",
    orderId: r.orderId, artistUserId, refundReviewId: r.id, amountToman: r.amountToman, actorUserId: r.actorUserId, requestId: r.requestId, occurredAt: r.reviewedAt } });
}
export function parseFinancialEventPage(query: Record<string, unknown>) {
  const { orderId, ...paging } = query;
  if (orderId !== undefined && typeof orderId !== "string") throw new BadRequestException();
  return { ...parseOrderPage(paging), ...(orderId === undefined ? {} : { orderId: parseArtistProductId(orderId) }) };
}
@Injectable()
export class FinancialEventsService {
  constructor(private readonly db: PrismaService) {}
  async artist(context: AuthorizationContext, query: ReturnType<typeof parseFinancialEventPage>) {
    if (context.activeRole !== "artist") throw new ForbiddenException();
    return this.list(query, context.userId, false);
  }
  async staff(context: AuthorizationContext, query: ReturnType<typeof parseFinancialEventPage>) {
    enforceDecision(canAccessStaffDomain(context, "finance"));
    return this.list(query, undefined, true);
  }
  private async list(query: ReturnType<typeof parseFinancialEventPage>, artistUserId: string | undefined, staff: boolean) {
    const rows = await this.db.financialEvent.findMany({ where: { ...(artistUserId ? { artistUserId } : {}), ...(query.orderId ? { orderId: query.orderId } : {}) },
      orderBy: [{ occurredAt: "desc" }, { id: "asc" }], skip: (query.page - 1) * query.pageSize, take: query.pageSize + 1 });
    return { page: query.page, pageSize: query.pageSize, hasMore: rows.length > query.pageSize, items: rows.slice(0, query.pageSize).map(r => ({
      id: r.id, orderId: r.orderId, kind: r.kind, amountToman: r.amountToman, currency: "toman", occurredAt: r.occurredAt.toISOString(), recordedAt: r.recordedAt.toISOString(),
      ...(staff ? { artistUserId: r.artistUserId, paymentReceiptId: r.paymentReceiptId, refundReviewId: r.refundReviewId, actorUserId: r.actorUserId } : {})
    })) };
  }
}
