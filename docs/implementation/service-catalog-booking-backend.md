# Service catalog and catalog-bound Artist requests

This slice adds the minimal product-safe catalog needed before Artist service requests can be treated as requests for a defined service. It deliberately does not define commercial or support-credit rules.

## Catalog

Services staff:
- `GET /api/v1/admin/service-catalog`
- `GET /api/v1/admin/service-catalog/:id`
- `POST /api/v1/admin/service-catalog`
- `POST /api/v1/admin/service-catalog/:id/availability`

Artist:
- `GET /api/v1/artist/service-catalog`
- `GET /api/v1/artist/service-catalog/:id`

Create accepts exactly `idempotencyKey`, `title`, and `description`. New items are unavailable by default. Availability is an explicit `{version, available}` command. Artist reads return only ID, title and description and conceal inactive items with 404.

No catalog field represents price, currency, commission, Growth, membership, payment or support credit. Those domains remain separate until their own accepted rules exist.

Catalog creation uses creator + idempotencyKey uniqueness and a PostgreSQL advisory lock. Availability changes lock the catalog row and use optimistic versioning. Create/availability audit events commit in the same transaction; events are protected by a database UPDATE/DELETE rejection trigger.

## Artist request binding

Artist `POST /api/v1/artist/service-requests` now accepts exactly:

```json
{
  "idempotencyKey": "uuid",
  "serviceId": "uuid",
  "description": "request-specific scope"
}
```

The active Artist identity is server-derived. The selected service must currently be available. The request stores `serviceCatalogItemId` and snapshots the catalog title into the existing request title so later catalog availability changes do not rewrite historical work scope. The shared service ID is exposed in Artist, staff and assigned Partner operational views.

The idempotency event stores the Artist command, not mutable catalog presentation data. Therefore an exact retry of an already-created request remains stable even if the catalog item is later deactivated; a changed description/service under the same key conflicts.

Staff-created operational requests remain supported and may have a null service ID for backward compatibility with the existing Draft stack. This migration does not fabricate catalog records for historical requests.

## Safety and release boundary

Creation has no ServiceAssignment or ServiceExecution side effect and creates no financial event, support-credit usage, Growth change, membership change, payment, refund or settlement state.

PostgreSQL tests cover inactive/active visibility, role isolation, rejection of commercial fields, concurrent idempotency, availability rollback when audit insertion fails, immutable catalog audit, catalog-bound Artist ownership, inactive-service rejection, shared service identity across Partner view, and retry after catalog deactivation.

Stage must still validate migration behavior against stacked historical data. No merge, Stage deploy, QA sign-off or Production release is part of this Draft PR.
