# Artist shipment reports

Business scope: domestic consumer orders. An Artist declares dispatch of all of their own order lines together, after ready_for_dispatch. This report is not carrier verification, delivery confirmation or settlement. Payment and inventory stay unchanged; no commission or AI.

## Contract
POST /api/v1/artist/orders/:id/shipment accepts only {version,carrierName,trackingCode}. Use the current Artist preparation revision. Carrier name is bounded plain text; tracking code is 1..100 ASCII letters/digits/hyphens. Persian/Arabic digits normalize to ASCII with leading zeroes preserved. Client timestamps, URLs, identity and verified/delivered flags are rejected.

Artist order reads and Customer order preparation groups expose shipment=null before reporting; afterwards they expose status=reported_dispatched, source=artist_report, carrierVerified=false, carrierName, trackingCode and server reportedAt. Private IDs, author and request metadata are excluded. No generated external tracking URL.

Each artist has one immutable report per order containing audit author, request and committed preparation revision. The same order lock used by payment/preparation protects readiness, ownership and concurrent writes. Report creation and revision increment commit together. An identical normalized retry with the original revision recovers the existing result; changed payload/revision returns 409. Report update/deletion and split/multiple packages are not exposed.

Unknown, foreign and unpaid orders return 404; other active roles return 403; missing authorization 401. Premature or stale dispatch returns 409. The Artist's preparation state remains ready_for_dispatch: shipment is a separate declaration, not an invented preparation/delivery transition.

## Validation and remaining work
Contract tests cover strict field validation, digit normalization and missing reports. PostgreSQL HTTP tests cover owned multi-artist scopes, customer tracking, independent reports, concurrent identical/conflicting retries, stale/readiness gates, auth, privileged field rejection, immutable audit and rollback. Full migration/security/lint/typecheck/build/browser CI is required.

No carrier integration, booking, label generation, carrier fee calculation, callback, confirmed delivery, settlement or UI binding. Correction/issue handling and customer delivery confirmation remain later workflows. Gateway remains disabled by default. API-only draft change, no merge/deploy.
