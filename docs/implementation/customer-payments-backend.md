# Customer payment core — gateway unconfigured

PaymentGateway is disabled by default and has no fake production implementation. The default API cannot create a gateway session or mark an order paid. CI overrides this provider only inside tests. Real provider credentials, protocol, callback URL/origin allowlist and operational acceptance remain future work.

## Endpoints

All require the active Customer session, account ownership and Cache-Control: no-store.

| Endpoint | Input | Result |
| --- | --- | --- |
| GET /api/v1/customer/orders/:orderId/payment | No query fields | enabled, orderVersion, paymentStatus, quote/null, canStart, last 10 attempts |
| POST same | version, idempotencyKey UUID, expectedPayableToman canonical text | 201 persisted attempt; 503 when provider is unconfigured/uncertain |
| POST same/:attemptId/verify | Empty object | 201 current attempt after server verification |

Browser payment statuses, receipt references and amounts are not accepted as proof. The core exposes neither gateway references nor request hashes. A pending redirect is exposed only while gateway, quote and reservation are valid. Invalid HTTPS destinations, credentials in URLs and destinations outside the provider's configured allowlist are rejected. API calls have a 10-second deadline/AbortSignal and hold no database lock during external I/O.

## Final payable quote

The internal recordQuote service requires a trusted Staff finance context and stores the author, opaque source reference, shipping fee, exact merchandise-plus-shipping amount and quote deadline. There is no public/admin HTTP fee-setting route. The quote is immutable and its deadline cannot exceed the reservation deadline; recording it increments the order revision. Identical intake can recover a retry; changed quotes conflict. Unknown shipping cost is not zero. Without an approved recorded final quote, payment start returns 409 even when a gateway adapter exists. The buyer must confirm the current quote amount.

No commission, tax, discount, currency conversion or free-shipping policy is invented. All core amounts are decimal text in Toman, using BigInt arithmetic. A future shipping service must provide an authorized quote; this intake does not authenticate an external shipping document by itself. Gateway adapters must normalize supported currency/unit conversions exactly; a mismatched unit is routed to reconciliation.

## Attempts, receipts and verification

Attempt states: initializing -> pending -> succeeded/failed/reconciliation_required. Startup persists an attempt and audit before gateway I/O. A per-order key plus canonical payload hash recovers identical requests; changed reuse conflicts. A PostgreSQL partial unique index permits one active/uncertain attempt per order. Gateway.start must itself be idempotent by the persisted attempt UUID; timeout is an uncertain outcome and must be retried with the same key. Definitive rejection permits a fresh attempt. Unknown verification stays pending and does not create a receipt or successful audit.

The server obtains proof directly from Gateway.verify using the stored gateway reference and expected amount. Proof must identify the exact session, transaction reference, exact amount and unit. The order row serializes payment verification, cancellation and expiry. Receipt + versioned audit + attempt transition + order payment state commit together. Provider/transaction references are globally unique per provider; one receipt cannot pay two orders. Duplicate proof is reconciled. A database failure before commit leaves the attempt recoverable; a later verification can recover already-accepted provider money.

Only matching live proof changes order status to placed, paymentStatus to paid and records paidAt. This records the order after payment; it does not mark fulfillment, shipment, delivery or Artist settlement complete. Available stock was already decremented by reservation and is not decremented again. Expiry cannot release a placed order; Customer cancellation of a paid order returns 409 until a refund workflow exists.

If verified money is wrong, uses another unit, arrives after quote/reservation expiry or races after cancellation, persist proof and reconciliation_required. Do not revive stock, declare the order paid or automatically refund/settle. Cancelled/expired order states are preserved. Repeated verification does not re-post receipts or audit transitions. A successfully received amount requiring review is not discarded.

## QA and remaining work

17 contract/default-gateway/timeout tests and 12 real PostgreSQL HTTP cases cover final quote guards, exact values beyond JavaScript safe integers, same-key startup concurrency, active-attempt limit, unknown/rejected outcomes, redirect safety, proof forgery, duplicated receipts, cancellation/expiry races, account isolation and transactional rollback/retry. CI also validates migrations, lint/types, production build and browser regressions.

UI binding, real provider/webhook integration, scheduled reconciliation/recovery, authoritative shipping quotation, refund operations, finance review UI, Artist fulfillment and deployment remain pending. There is no public webhook in this slice: customer verify initiates a server-to-provider check, never a browser assertion. Automatic detection of payments when the customer never returns requires the future authenticated provider webhook/reconciliation worker. This is a tested internal core, not a launched payment system.
