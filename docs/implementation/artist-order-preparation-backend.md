# Artist order preparation

Scope: domestic consumer orders only; preparation is separate from payment, carrier shipment, delivery and settlement. No commission or AI features.

## Contract
- GET /api/v1/artist/orders: bounded page/pageSize, paid/placed orders for the active Artist only. List omits shipping address.
- GET /api/v1/artist/orders/:id: immutable owned item snapshots, exact merchandise subtotal in Toman, execution shipping address and preparation history.
- POST /api/v1/artist/orders/:id/preparation: {version,status}.
- Sequence: awaiting_acceptance → accepted → preparing → packaging → ready_for_dispatch. No skips, reversal, shipment/delivery assertions, cancellation or settlement.
- Immediate retry with the same previous revision and target recovers the committed result. Other stale revisions return 409. Unknown/unpaid/foreign orders return 404; wrong active role 403.
- Each artist has an independent revision and history. Order-level locks coordinate with payment/cancellation, and updates plus audit are atomic. Inventory and payment state are untouched.
- Customer order views expose preparation grouped by owned product IDs, without Artist identity or private audit fields.

## Durable ownership and migration
Checkout snapshots artistUserId on each line and creates one preparation group per artist transactionally. Composite foreign keys bind items to groups. Existing lines/groups are backfilled from current product ownership; historical ownership before this migration cannot be reconstructed if previously edited outside the API. Later product edits cannot move order execution rights.

## Limits and validation
Gateway stays disabled by default. No operational fake payment. Paid fixtures exist only in integration tests. Artist list does not expose other artists' totals or items, customer account identifiers, quote/payment receipts or internal actor/request IDs. Detail shipping data is for execution.

Contract tests cover permitted transitions and strict payload validation. PostgreSQL HTTP tests cover multi-artist snapshot ownership, privacy, role/ownership gates, unpaid exclusion, retry concurrency, independent progress, customer tracking, exact amounts, audit rollback and stale/invalid transitions. Run the full CI including migration reset/deploy and browser regressions before review.

API only: UI binding, historical image delivery, carrier selection, dispatch/tracking, issues, delivery confirmation, refunds and settlement remain later work. No merge or deployment in this change.
