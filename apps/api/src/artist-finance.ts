import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { canAccessStaffDomain, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import type { Prisma } from "./generated/prisma/client.js";
import { PrismaService } from "./prisma.service.js";
export type FinanceFacts = {
  merchandise: bigint; approvedRefund: bigint; paid: boolean; verifiedPayment: boolean;
  receiptConfirmed: boolean; issueOpen: boolean; refundReviewPending: boolean;
};
export function financeAmounts(f: FinanceFacts) {
  const holds: string[] = [];
  if (!f.paid) holds.push("order_not_paid");
  if (!f.verifiedPayment) holds.push("payment_evidence_missing_or_inconsistent");
  if (!f.receiptConfirmed) holds.push("customer_receipt_missing");
  if (f.issueOpen) holds.push("shipment_issue_open");
  if (f.refundReviewPending) holds.push("refund_review_pending");
  if (f.approvedRefund > 0n) holds.push("approved_refund_not_executed");
  const inconsistent = f.merchandise < 0n || f.approvedRefund < 0n || f.approvedRefund > f.merchandise;
  if (inconsistent) holds.push("financial_records_inconsistent");
  const remaining = inconsistent ? null : (f.merchandise - f.approvedRefund).toString();
  return { merchandiseSubtotalToman: f.merchandise.toString(), approvedRefundToman: f.approvedRefund.toString(),
    remainingMerchandiseToman: remaining, reviewableForSettlementToman: holds.length ? "0" : remaining!,
    commissionToman: "0", shippingAllocationToman: null, recordedRefundExecutedToman: "0", recordedSettledToman: "0",
    settlementStatus: holds.length ? "blocked" : "awaiting_finance_review", holds };
}
const include = {
  items: { orderBy: { productId: "asc" } },
  order: { include: { payments: { where: { status: "succeeded" }, include: { receipt: true, quote: true } } } },
  shipment: { include: { receipt: true, issue: { include: { refundReviews: true } } } }
} satisfies Prisma.ArtistOrderPreparationInclude;
type Position = Prisma.ArtistOrderPreparationGetPayload<{ include: typeof include }>;
function view(p: Position, staff: boolean) {
  const merchandise = p.items.reduce((s, i) => s + i.unitPriceToman * BigInt(i.quantity), 0n);
  const payment = p.order.payments.length === 1 ? p.order.payments[0] : undefined;
  const verified = Boolean(payment?.receipt && payment.receipt.unit === "toman" && payment.receipt.provider === payment.provider &&
    payment.receipt.amount === payment.amountToman && payment.amountToman === payment.quote.payableToman && payment.quote.payableToman === (BigInt(p.order.subtotalToman) + BigInt(payment.quote.shippingFeeToman)).toString());
  const issue = p.shipment?.issue;
  const approvals = issue?.refundReviews.filter(r => r.decision === "approved") ?? [];
  const approvedRefund = approvals.reduce((s, r) => s + BigInt(r.amountToman!), 0n);
  const currentReview = issue?.refundReviews.find(r => r.issueVersion === issue.version);
  const amounts = financeAmounts({ merchandise, approvedRefund, paid: p.order.status === "placed" && p.order.paymentStatus === "paid",
    verifiedPayment: verified, receiptConfirmed: Boolean(p.shipment?.receipt),
    issueOpen: Boolean(issue && issue.status !== "closed"),
    refundReviewPending: Boolean(issue?.status === "closed" && issue.resolution === "referred_for_refund_review" && !currentReview) });
  return { orderId: p.orderId, ...(staff ? { artistUserId: p.artistUserId } : {}), currency: "toman",
    createdAt: p.order.createdAt.toISOString(), paidAt: p.order.paidAt?.toISOString() ?? null,
    preparationStatus: p.status, customerReceiptConfirmed: Boolean(p.shipment?.receipt), ...amounts,
    items: p.items.map(i => ({ productId: i.productId, title: i.title, quantity: i.quantity, unitPriceToman: i.unitPriceToman.toString() })) };
}
@Injectable()
export class ArtistFinanceService {
  constructor(private readonly db: PrismaService) {}
  async listArtist(context: AuthorizationContext, page: number, pageSize: number) {
    if (context.activeRole !== "artist") throw new ForbiddenException();
    return this.list(context.userId, page, pageSize, false);
  }
  async listStaff(context: AuthorizationContext, page: number, pageSize: number, artistUserId?: string) {
    enforceDecision(canAccessStaffDomain(context, "finance"));
    return this.list(artistUserId, page, pageSize, true);
  }
  async getArtist(context: AuthorizationContext, orderId: string) {
    if (context.activeRole !== "artist") throw new ForbiddenException();
    return this.get(context.userId, orderId, false);
  }
  async getStaff(context: AuthorizationContext, artistUserId: string, orderId: string) {
    enforceDecision(canAccessStaffDomain(context, "finance"));
    return this.get(artistUserId, orderId, true);
  }
  private async list(artistUserId: string | undefined, page: number, pageSize: number, staff: boolean) {
    return this.db.$transaction(async tx => {
      const rows = await tx.artistOrderPreparation.findMany({ where: { ...(artistUserId ? { artistUserId } : {}), order: { status: "placed" } }, include,
        orderBy: [{ order: { createdAt: "desc" } }, { orderId: "asc" }, { artistUserId: "asc" }], skip: (page - 1) * pageSize, take: pageSize + 1 });
      const items = rows.slice(0, pageSize).map(p => view(p, staff));
      const sum = (key: "merchandiseSubtotalToman" | "approvedRefundToman" | "reviewableForSettlementToman") => items.reduce((s, i) => s + BigInt(i[key]), 0n).toString();
      return { page, pageSize, hasMore: rows.length > pageSize, items, pageTotals: { merchandiseSubtotalToman: sum("merchandiseSubtotalToman"),
        approvedRefundToman: sum("approvedRefundToman"), reviewableForSettlementToman: sum("reviewableForSettlementToman") } };
    }, { isolationLevel: "RepeatableRead" });
  }
  private async get(artistUserId: string, orderId: string, staff: boolean) {
    return this.db.$transaction(async tx => {
      const p = await tx.artistOrderPreparation.findFirst({ where: { artistUserId, orderId, order: { status: "placed" } }, include });
      if (!p) throw new NotFoundException();
      return view(p, staff);
    }, { isolationLevel: "RepeatableRead" });
  }
}
