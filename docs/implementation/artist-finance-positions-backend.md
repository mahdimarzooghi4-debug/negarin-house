# Domestic Artist finance positions

Read-only finance statement projection over immutable order lines, verified payment receipts, customer receipt, issues and refund decisions. It is not an accounting journal, payout command or bank balance; no settlement is created.

Artist GET /api/v1/artist/finance/orders and /:orderId scope by the active session Artist's snapshotted order ownership. Staff finance-domain GET /api/v1/admin/domestic-finance/orders supports page/pageSize and optional artistUserId; /:orderId/artists/:artistUserId reads one position. Placed orders only; other/unknown ownership 404, unauthorized roles 403. Page size max50. Page totals cover only displayed items, never an implied full-account balance.

Projection: exact Toman merchandise subtotal, approved refund amount, remaining merchandise, reviewableForSettlementToman, independent settlementStatus/holds, commission=0, shippingAllocation=null. A single consistent succeeded payment receipt must match provider/unit/amount and the exact merchandise-plus-shipping quote. Receipt missing/inconsistent, unpaid order, missing customer receipt, open issue, pending refund review or approved-but-unexecuted refund blocks the reviewable amount. Invalid financial net becomes null and blocked.

A clear position is awaiting_finance_review, never settled or automatically entitled to a transfer. Banking, release approval and settlement policy remain boundaries. recordedSettledToman and recordedRefundExecutedToman are zero because execution records/workflows do not exist yet; they are not claims about external bank activity. Shipping revenue/allocation is excluded, not guessed.

Artist and Staff views use the same calculation. Artist view excludes customer address/phone, Staff notes/identities, provider/receipt references, other Artists' items or totals. RepeatableRead transactions keep nested facts and page totals coherent. No write routes, mutations or ledger duplication on reads.

Tests cover exact >2^53 arithmetic, hold reasons, inconsistent net, external role denials, owned snapshots, shared Staff/Artist positions, verified received versus unsettled states, unresolved complaints/refunds, strict pagination and bounded page totals. Full CI required.

No AI or commission. The Artist read-only finance workspace at `/artist/finance` consumes the paginated list and account-scoped detail. The Staff read-only workspace at `/admin/domestic-finance` consumes the finance-domain list/detail routes with an optional Artist UUID filter. Both use authenticated same-origin BFF routes, display page-only totals, exact order positions and hold reasons, and do not expose customer contact data or issue payout commands. Payout/refund execution, ledger journal, settlement and deployment remain outside this slice. Finance execution still requires auditable records under accepted banking policy.
