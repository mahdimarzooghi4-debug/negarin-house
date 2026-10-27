import { recordPaymentFinancialEvents } from "./financial-events.js";
import { createHash, randomUUID } from "node:crypto";
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { canAccessStaffDomain, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { PrismaService } from "./prisma.service.js";
import type { PaymentAttempt, PaymentAttemptStatus, Prisma } from "./generated/prisma/client.js";

export type GatewayStart = { kind: "ready"; reference: string; redirectUrl: string } | { kind: "rejected" | "unknown" };
export type GatewayVerification = { kind: "paid"; reference: string; transactionReference: string; amount: string; unit: string } | { kind: "rejected" | "unknown" };
@Injectable()
export class PaymentGateway {
  readonly id: string = "unconfigured";
  readonly enabled: boolean = false;
  acceptsRedirect(_url: URL): boolean { return false; }
  async start(_input: { attemptId: string; orderId: string; amountToman: string; signal?: AbortSignal }): Promise<GatewayStart> { throw new ServiceUnavailableException("payment-gateway-unconfigured"); }
  async verify(_input: { reference: string; amountToman: string; signal?: AbortSignal }): Promise<GatewayVerification> { throw new ServiceUnavailableException("payment-gateway-unconfigured"); }
}
export async function gatewayCall<T>(run: (signal: AbortSignal) => Promise<T>, timeout = 10000): Promise<T> {
  const controller = new AbortController();
  let timer!: ReturnType<typeof setTimeout>;
  try {
    return await Promise.race([run(controller.signal), new Promise<never>((_, reject) => {
      timer = setTimeout(() => { controller.abort(); reject(new Error("gateway-timeout")); }, timeout);
    })]);
  } finally { clearTimeout(timer); }
}
export function parsePaymentStart(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const v = body as Record<string, unknown>;
  if (Object.keys(v).some(k => !["version", "idempotencyKey", "expectedPayableToman"].includes(k)) ||
    !Number.isInteger(v.version) || (v.version as number) < 0 || (v.version as number) >= 2147483647 ||
    typeof v.idempotencyKey !== "string" || typeof v.expectedPayableToman !== "string" || !/^[1-9][0-9]{0,23}$/.test(v.expectedPayableToman)) throw new BadRequestException();
  return { version: v.version as number, idempotencyKey: parseArtistProductId(v.idempotencyKey).toLowerCase(), expectedPayableToman: v.expectedPayableToman };
}
export function parseEmptyPaymentBody(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body) || Object.keys(body).length) throw new BadRequestException();
}
function reference(v: unknown): v is string { return typeof v === "string" && v.length > 0 && v.length <= 200 && !/[\u0000-\u001f\u007f]/.test(v); }
function view(a: PaymentAttempt, allowRedirect: boolean) {
  return { id: a.id, orderId: a.orderId, status: a.status, version: a.version, amountToman: a.amountToman,
    redirectUrl: allowRedirect && a.status === "pending" ? a.redirectUrl : null, createdAt: a.createdAt.toISOString() };
}
@Injectable()
export class CustomerPaymentsService {
  constructor(private readonly db: PrismaService, private readonly gateway: PaymentGateway) {}
  private customer(c: AuthorizationContext) { if (c.activeRole !== "customer") throw new ForbiddenException(); }
  private configured() { if (!this.gateway.enabled) throw new ServiceUnavailableException("payment-gateway-unconfigured"); }
  private async lockOrder(tx: Prisma.TransactionClient, id: string, userId?: string) {
    const rows = userId
      ? await tx.$queryRaw<Array<{ id: string }>>`SELECT "id" FROM "customer_orders" WHERE "id" = ${id}::uuid AND "userId" = ${userId}::uuid FOR UPDATE`
      : await tx.$queryRaw<Array<{ id: string }>>`SELECT "id" FROM "customer_orders" WHERE "id" = ${id}::uuid FOR UPDATE`;
    if (!rows.length) throw new NotFoundException();
    return tx.customerOrder.findUniqueOrThrow({ where: { id }, include: { payableQuote: true } });
  }
  private async transition(tx: Prisma.TransactionClient, a: PaymentAttempt, status: PaymentAttemptStatus, reason: string, actorUserId: string, requestId: string, extra: Prisma.PaymentAttemptUpdateInput = {}) {
    const next = await tx.paymentAttempt.update({ where: { id: a.id }, data: { ...extra, status, version: { increment: 1 } } });
    await tx.paymentEvent.create({ data: { attemptId: a.id, version: next.version, status, reason, actorUserId, requestId } });
    return next;
  }
  // Internal finance-authorized quote intake. No public fee writer or default free-shipping policy.
  async recordQuote(c: AuthorizationContext, orderId: string, input: { version: number; shippingFeeToman: string; sourceReference: string; expiresAt: Date }) {
    enforceDecision(canAccessStaffDomain(c, "finance"));
    if (!Number.isInteger(input.version) || input.version < 0 || input.version >= 2147483647 || !/^(0|[1-9][0-9]{0,22})$/.test(input.shippingFeeToman) ||
      !reference(input.sourceReference) || !Number.isFinite(input.expiresAt.getTime())) throw new BadRequestException();
    return this.db.$transaction(async tx => {
      const order = await this.lockOrder(tx, orderId);
      if (order.payableQuote) {
        const q = order.payableQuote;
        if (q.shippingFeeToman !== input.shippingFeeToman || q.sourceReference !== input.sourceReference || q.expiresAt.getTime() !== input.expiresAt.getTime()) throw new ConflictException("payable-quote-immutable");
        return q;
      }
      if (order.status !== "reserved" || order.paymentStatus !== "unpaid" || order.version !== input.version || input.expiresAt <= new Date() || input.expiresAt > order.reservedUntil) throw new ConflictException("order-not-quotable");
      const payableToman = (BigInt(order.subtotalToman) + BigInt(input.shippingFeeToman)).toString();
      const quote = await tx.orderPayableQuote.create({ data: { orderId, createdByUserId: c.userId, shippingFeeToman: input.shippingFeeToman, payableToman, sourceReference: input.sourceReference, expiresAt: input.expiresAt } });
      await tx.customerOrder.update({ where: { id: orderId }, data: { version: { increment: 1 } } });
      return quote;
    });
  }
  async get(c: AuthorizationContext, orderId: string) {
    this.customer(c);
    const order = await this.db.customerOrder.findFirst({ where: { id: orderId, userId: c.userId }, include: { payableQuote: true,
      payments: { orderBy: [{ createdAt: "desc" }, { id: "asc" }], take: 10 } } });
    if (!order) throw new NotFoundException();
    const valid = order.status === "reserved" && order.reservedUntil > new Date() && !!order.payableQuote && order.payableQuote.expiresAt > new Date();
    return { enabled: this.gateway.enabled, orderVersion: order.version, paymentStatus: order.paymentStatus,
      quote: order.payableQuote ? { shippingFeeToman: order.payableQuote.shippingFeeToman, payableToman: order.payableQuote.payableToman, expiresAt: order.payableQuote.expiresAt.toISOString() } : null,
      canStart: this.gateway.enabled && valid && order.paymentStatus === "unpaid" && !order.payments.some(a => ["initializing", "pending", "reconciliation_required"].includes(a.status)),
      attempts: order.payments.map(a => view(a, this.gateway.enabled && valid)) };
  }
  async start(c: AuthorizationContext, orderId: string, input: ReturnType<typeof parsePaymentStart>, requestId: string) {
    this.customer(c); this.configured();
    const hash = createHash("sha256").update(JSON.stringify(input)).digest("hex");
    const attempt = await this.db.$transaction(async tx => {
      const order = await this.lockOrder(tx, orderId, c.userId);
      const replay = await tx.paymentAttempt.findUnique({ where: { orderId_idempotencyKey: { orderId, idempotencyKey: input.idempotencyKey } } });
      if (replay) { if (replay.requestHash !== hash) throw new ConflictException("payment-key-reused"); return replay; }
      if (order.status !== "reserved" || order.paymentStatus !== "unpaid" || order.reservedUntil <= new Date() || order.version !== input.version) throw new ConflictException("order-not-payable");
      const q = order.payableQuote;
      if (!q || q.expiresAt <= new Date()) throw new ConflictException("payable-quote-required");
      if (q.payableToman !== input.expectedPayableToman) throw new ConflictException("payable-amount-changed");
      if (await tx.paymentAttempt.count({ where: { orderId, status: { in: ["initializing", "pending", "reconciliation_required"] } } })) throw new ConflictException("payment-already-active");
      const created = await tx.paymentAttempt.create({ data: { orderId, idempotencyKey: input.idempotencyKey, requestHash: hash, provider: this.gateway.id, amountToman: q.payableToman } });
      await tx.paymentEvent.create({ data: { attemptId: created.id, version: 0, status: "initializing", reason: "payment-started", actorUserId: c.userId, requestId } });
      return created;
    });
    if (attempt.status !== "initializing") return this.attemptView(c, attempt.id);
    const liveOrder = await this.db.customerOrder.findUniqueOrThrow({ where: { id: orderId }, include: { payableQuote: true } });
    if (liveOrder.status !== "reserved" || liveOrder.paymentStatus !== "unpaid" || liveOrder.reservedUntil <= new Date() || !liveOrder.payableQuote || liveOrder.payableQuote.expiresAt <= new Date()) return this.attemptView(c, attempt.id);
    if (attempt.provider !== this.gateway.id) throw new ServiceUnavailableException("payment-provider-unavailable");
    // No network call holds a PostgreSQL lock. Adapter must start idempotently by the persisted attempt ID.
    let result: GatewayStart;
    try { result = await gatewayCall(signal => this.gateway.start({ attemptId: attempt.id, orderId, amountToman: attempt.amountToman, signal })); }
    catch { throw new ServiceUnavailableException("payment-start-uncertain-retry-same-key"); }
    if (result.kind === "unknown") throw new ServiceUnavailableException("payment-start-uncertain-retry-same-key");
    if (result.kind === "ready") {
      let url: URL;
      try { url = new URL(result.redirectUrl); } catch { throw new ServiceUnavailableException("invalid-payment-provider-response"); }
      if (!reference(result.reference) || typeof result.redirectUrl !== "string" || result.redirectUrl.length > 2000 || url.protocol !== "https:" || url.username || url.password || !this.gateway.acceptsRedirect(url)) throw new ServiceUnavailableException("invalid-payment-provider-response");
    }
    await this.db.$transaction(async tx => {
      await this.lockOrder(tx, orderId, c.userId);
      const a = await tx.paymentAttempt.findUniqueOrThrow({ where: { id: attempt.id } });
      if (a.status !== "initializing") return;
      if (result.kind === "rejected") { await this.transition(tx, a, "failed", "gateway-rejected-start", c.userId, requestId); return; }
      if (result.kind !== "ready") return;
      const collision = await tx.paymentAttempt.findFirst({ where: { provider: a.provider, providerReference: result.reference, id: { not: a.id } } });
      if (collision) { await this.transition(tx, a, "reconciliation_required", "gateway-reference-reused", c.userId, requestId); return; }
      await this.transition(tx, a, "pending", "gateway-session-created", c.userId, requestId, { providerReference: result.reference, redirectUrl: result.redirectUrl });
    });
    return this.attemptView(c, attempt.id);
  }
  private async attemptView(c: AuthorizationContext, id: string) {
    const a = await this.db.paymentAttempt.findFirst({ where: { id, order: { userId: c.userId } }, include: { order: { include: { payableQuote: true } } } });
    if (!a) throw new NotFoundException();
    return view(a, this.gateway.enabled && a.order.status === "reserved" && a.order.reservedUntil > new Date() && !!a.order.payableQuote && a.order.payableQuote.expiresAt > new Date());
  }
  async verify(c: AuthorizationContext, orderId: string, attemptId: string, requestId: string) {
    this.customer(c); this.configured();
    const a = await this.db.paymentAttempt.findFirst({ where: { id: attemptId, orderId, order: { userId: c.userId } } });
    if (!a) throw new NotFoundException();
    if (["succeeded", "failed", "reconciliation_required"].includes(a.status)) return this.attemptView(c, a.id);
    if (a.status !== "pending" || !a.providerReference) throw new ConflictException("payment-session-not-ready");
    if (a.provider !== this.gateway.id) throw new ServiceUnavailableException("payment-provider-unavailable");
    let result: GatewayVerification;
    try { result = await gatewayCall(signal => this.gateway.verify({ reference: a.providerReference!, amountToman: a.amountToman, signal })); }
    catch { throw new ServiceUnavailableException("payment-verification-uncertain"); }
    if (result.kind === "unknown") throw new ServiceUnavailableException("payment-verification-uncertain");
    if (result.kind === "paid" && (!reference(result.reference) || result.reference !== a.providerReference || !reference(result.transactionReference) ||
      typeof result.amount !== "string" || !/^[1-9][0-9]{0,26}$/.test(result.amount) || typeof result.unit !== "string" || !/^[a-z]{1,20}$/.test(result.unit))) throw new ServiceUnavailableException("invalid-payment-provider-proof");
    await this.db.$transaction(async tx => {
      const order = await this.lockOrder(tx, orderId, c.userId);
      const current = await tx.paymentAttempt.findUniqueOrThrow({ where: { id: a.id } });
      if (current.status !== "pending") return;
      if (result.kind === "rejected") { await this.transition(tx, current, "failed", "gateway-rejected-payment", c.userId, requestId); return; }
      if (result.kind !== "paid") return;
      const receipt = await tx.paymentReceipt.createMany({ data: [{ id: randomUUID(), attemptId: a.id, provider: a.provider, transactionReference: result.transactionReference, amount: result.amount, unit: result.unit }], skipDuplicates: true });
      const q = order.payableQuote;
      const acceptable = receipt.count === 1 && result.unit === "toman" && result.amount === a.amountToman && q?.payableToman === a.amountToman &&
        order.status === "reserved" && order.paymentStatus === "unpaid" && order.reservedUntil > new Date() && q.expiresAt > new Date();
      if (!acceptable) {
        await this.transition(tx, current, "reconciliation_required", receipt.count === 0 ? "duplicate-provider-receipt" : "paid-proof-needs-reconciliation", c.userId, requestId);
        await tx.customerOrder.update({ where: { id: orderId }, data: { paymentStatus: "reconciliation_required", version: { increment: 1 } } });
        return;
      }
      await this.transition(tx, current, "succeeded", "server-verified-payment", c.userId, requestId);
      await tx.customerOrder.update({ where: { id: orderId }, data: { status: "placed", paymentStatus: "paid", paidAt: new Date(), version: { increment: 1 } } });
      const recordedReceipt = await tx.paymentReceipt.findUniqueOrThrow({ where: { attemptId: a.id } });
      await recordPaymentFinancialEvents(tx, orderId, recordedReceipt, c.userId, requestId);
    });
    return this.attemptView(c, a.id);
  }
}
