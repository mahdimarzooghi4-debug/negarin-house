# Refund finance review

Domestic consumer scope. Finance-domain Staff review closed shipment issues referred_for_refund_review. This is an immutable approval/rejection decision and reservation of an approved amount, not a refund transfer, settlement or gateway simulation.

GET /api/v1/admin/refund-reviews: strict bounded page/pageSize, referral cases including decisions.
GET /:shipmentId: case and decision history. POST /:shipmentId: {issueVersion,decision,reason,amountToman?}. Approved requires positive exact Toman text (up to 23 digits); rejected forbids amount. Reason is trimmed 1..2000 characters with controls rejected.

Approval requires placed/paid order plus succeeded payment and matching server receipt/provider/unit=Toman/amount/quote. Merchandise-only cap from immutable owned item snapshots; no shipping allocation inferred. The order-level sum of all approved amounts cannot exceed verified paid amount. Approvals for one shipment cannot be duplicated. No guessed commission, tax or fee.

Shared order lock serializes finance, support and customer operations. Decision is unique per issue version; original normalized same-actor retry recovers it, different/stale input conflicts. Rejection can be followed by support reopen/new referral and a new versioned decision. Approval blocks support reopening until a future finance amendment/cancellation workflow, preventing bypass of committed approval.

Audit stores receipt link, source issue version, actor/request and server timestamp. Customer/owning Artist projections expose current decision, amount, time and executionStatus=not_executed, without private reason/actor/receipt. Original issue, order/payment/preparation/customer revision and inventory are unchanged.

Validation: strict contracts and PostgreSQL HTTP test evidence/amount/referral gates, exact >2^53 amounts, retry/races, authorization, history, privacy and persistence failure. Full CI required.

Actual refund execution, approval cancellation, shipping refunds, settlement, UI binding and deployment are later work. Gateway remains disabled. No AI or commission.
