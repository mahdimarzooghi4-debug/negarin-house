# Customer shipment outcomes

Domestic consumer scope. Receipt declares that the customer received one shipment; it does not verify the carrier, accept item quality or settle money. Issues never automatically refund, replenish inventory or transfer funds.

GET /api/v1/customer/orders/:orderId/shipments/:shipmentId reads an owned paid shipment.
POST .../:shipmentId/receipt accepts only {version}.
POST .../:shipmentId/issues accepts only {version,kind,description}; kinds: not_received, damaged, wrong_items, missing_items. Trimmed description 1..2000 characters; controls/bidi overrides rejected.

Shipment views now expose a public shipment UUID, independent customerVersion, receipt/source/time and issue/status/text/time. Private author/request/command metadata remain hidden. Artist reads remain scoped to their own shipment. Dispatch fields are immutable; customerVersion is separate from Artist preparation, order and payment revisions.

Same order lock, session ownership, paid/placed gates, atomic revision and immutable audit rows. One receipt and one initial issue per shipment. Identical normalized retries with the original command revision recover current state; other stale/different requests conflict. Foreign/unknown/unpaid 404, other roles 403.

An open issue blocks a new receipt pending support resolution. After receipt, damaged/wrong/missing issues remain possible; not_received conflicts. Concurrent receipt/nonreceipt cannot create both. No auto-confirmation deadline or settlement policy.

Validation: strict contract tests and PostgreSQL HTTP cover independent outcomes, roles/ownership, privacy, races, changed/stale commands, forgery, contradictory nonreceipt and rollback/retry for both audit tables. Full migration/security/lint/typecheck/build/browser CI required.

Support resolution, additional complaint history/evidence, refunds, shipment correction, carrier integration and settlement remain later work. Gateway stays disabled by default. API-only draft; no UI binding, merge or deploy.
