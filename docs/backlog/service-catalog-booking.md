# E6 — Service catalog and catalog-bound Artist request

Source: Phase 1 E6 Service Partner Execution, existing ServiceRequest flow, and approved rule that unresolved pricing/support-credit/payment mechanics must not be invented.

Acceptance:
1. Services-domain staff can create descriptive service catalog items with title and description only.
2. New catalog items are unavailable by default; services staff explicitly changes availability with versioned, audited commands.
3. Artist can list/read only available catalog items. Other external roles and non-services staff are denied.
4. Catalog APIs contain no price, currency, commission, Growth, membership, payment or support-credit fields.
5. Artist service-request creation requires an available service ID plus request-specific description. Artist identity comes only from the live session.
6. ServiceRequest stores the catalog item ID and snapshots its title at request time; later catalog deactivation does not rewrite existing requests.
7. Existing exact idempotent request retry remains replayable after catalog deactivation; a changed command under the same key conflicts.
8. Catalog creation and availability changes are idempotent/versioned and audit history is append-only; audit failure rolls the state change back.
9. No service assignment, execution, payment, credit consumption, Growth, membership or settlement occurs at catalog/request creation.

Out of scope: service pricing/purchase, support-credit eligibility/allocation/consumption, banking, partner selection by Artist, automatic scheduling, UI binding, merge or deployment.
