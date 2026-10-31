function record(value: unknown): Record<string, unknown> | null { return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null; }
const uuid = (value: unknown): value is string => typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
const money = (value: unknown): value is string => typeof value === "string" && /^(0|[1-9]\d*)$/.test(value);
const instant = (value: unknown): value is string => typeof value === "string" && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value;
export type PaymentAttempt = { id: string; orderId: string; status: "initializing" | "pending" | "succeeded" | "failed" | "reconciliation_required"; version: number; amountToman: string; redirectUrl: string | null; createdAt: string };
export type PaymentState = { enabled: boolean; orderVersion: number; paymentStatus: "unpaid" | "paid" | "reconciliation_required"; quote: { shippingFeeToman: string; payableToman: string; expiresAt: string } | null; canStart: boolean; attempts: PaymentAttempt[] };

export function parsePaymentAttempt(value: unknown): PaymentAttempt | null {
  const attempt = record(value);
  if (!attempt || !uuid(attempt.id) || !uuid(attempt.orderId) || !["initializing", "pending", "succeeded", "failed", "reconciliation_required"].includes(String(attempt.status)) ||
    !Number.isInteger(attempt.version) || !money(attempt.amountToman) || !instant(attempt.createdAt) ||
    !(attempt.redirectUrl === null || (typeof attempt.redirectUrl === "string" && attempt.redirectUrl.length <= 2000))) return null;
  if (attempt.redirectUrl !== null) {
    try { const url = new URL(attempt.redirectUrl); if (url.protocol !== "https:" || url.username || url.password) return null; } catch { return null; }
  }
  return { id: attempt.id, orderId: attempt.orderId, status: attempt.status as PaymentAttempt["status"], version: attempt.version as number,
    amountToman: attempt.amountToman, redirectUrl: attempt.redirectUrl as string | null, createdAt: attempt.createdAt };
}

export function parsePaymentState(value: unknown): PaymentState | null {
  const state = record(value);
  if (!state || typeof state.enabled !== "boolean" || !Number.isInteger(state.orderVersion) || (state.orderVersion as number) < 0 ||
    !["unpaid", "paid", "reconciliation_required"].includes(String(state.paymentStatus)) || typeof state.canStart !== "boolean" || !Array.isArray(state.attempts) || state.attempts.length > 10) return null;
  let quote: PaymentState["quote"] = null;
  if (state.quote !== null) {
    const raw = record(state.quote);
    if (!raw || !money(raw.shippingFeeToman) || !money(raw.payableToman) || !instant(raw.expiresAt)) return null;
    quote = { shippingFeeToman: raw.shippingFeeToman, payableToman: raw.payableToman, expiresAt: raw.expiresAt };
  }
  const attempts = state.attempts.map(parsePaymentAttempt);
  if (attempts.some(attempt => attempt === null)) return null;
  const resultAttempts = attempts as PaymentAttempt[];
  if (new Set(resultAttempts.map(attempt => attempt.id.toLowerCase())).size !== resultAttempts.length || resultAttempts.some(attempt => state.enabled === false && attempt.redirectUrl !== null)) return null;
  if (state.canStart && (!state.enabled || !quote || state.paymentStatus !== "unpaid")) return null;
  return { enabled: state.enabled, orderVersion: state.orderVersion as number, paymentStatus: state.paymentStatus as PaymentState["paymentStatus"], quote, canStart: state.canStart, attempts: resultAttempts };
}

export function formatPaymentToman(value: string) { return money(value) ? `${new Intl.NumberFormat("fa-IR").format(BigInt(value))} تومان` : "—"; }
