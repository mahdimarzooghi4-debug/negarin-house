# Financial event journal

Append-only sourced event journal, not a double-entry accounting system, bank balance or cash-transfer endpoint. Types: payment_received (verified total including confirmed shipping), sale_verified (Artist merchandise snapshot only), refund_approved (decision, not transfer), refund_rejected (no amount).

Valid payment confirmation creates receipt, paid order, payment audit and all financial facts in one transaction. Each Artist's merchandise is grouped from immutable order lines, never today's product prices; Artist records do not expose another Artist's amounts or the total customer payment. Refund review and its journal fact commit together. Unknown/late/mismatched/reconciliation payment proofs do not generate verified-sale entries.

Every entry references its order and receipt or refund decision, private actor/request, source occurrence time and recording time. Deterministic event keys and source-level unique indexes prevent duplicates; DB triggers reject UPDATE/DELETE. Retries replay the source command and create no extra journal facts. Future corrections require compensating facts, not edits.

Migration backfills consistent succeeded/paid proof and existing decisions. It excludes reconciliation and amount/unit/provider/quote-inconsistent payments. Original occurrences are retained; recording time is migration time. API rollback tests use PostgreSQL triggers to exercise actual journal failures. CI validates reset/deploy on an empty DB; the legacy backfill predicates are not yet tested against a staged production dataset.

GET /api/v1/admin/financial-events requires finance domain and exposes source/actor IDs for tracing, without provider secrets. GET /api/v1/artist/finance/events only exposes own sale/refund events without source/actor/request metadata. Both accept strict page/pageSize/orderId, max50, stable time/ID ordering; no mutation routes.

Validation: exact grouped prices >2^53, query strictness and external role gates; PostgreSQL HTTP verifies payment/refund replay, privacy/ownership, source uniqueness, DB immutability and rollback of paid/order/receipt/refund changes on journal failure. Full CI required.

No AI/commission. No payout/refund execution, settlement status change, general accounting chart, UI binding, merge or deployment. Banking/settlement mechanism remains an accepted product-decision boundary.
