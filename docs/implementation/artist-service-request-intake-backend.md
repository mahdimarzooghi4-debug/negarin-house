# Artist-created service requests — backend slice

Draft #56 introduced Artist self-service request creation. The stacked service-catalog slice now binds new Artist requests to an available catalog item so the request represents a defined service without inventing pricing or support-credit rules.

## API

Artist:
- POST `/api/v1/artist/service-requests`
- Existing GET list/detail remain unchanged.

Current POST body is exactly:

```json
{
  "idempotencyKey": "uuid",
  "serviceId": "uuid",
  "description": "request-specific scope"
}
```

The API rejects `title`, `artistUserId`, `internalNote`, partner IDs, price, support credit, Growth and all other unknown fields. The authenticated active Artist context becomes both `artistUserId` and `createdByUserId`. The service must be currently available; its title is resolved server-side and snapshotted into the request.

## State and authorization

The request uses the existing ServiceRequest aggregate and begins in `awaiting_assignment`. Only Negarin services-domain staff can assign a Service Partner. Artist cannot browse or choose partners. Creation makes no ServiceAssignment, ServiceExecution, financial event, Growth event, membership mutation or support-credit usage.

The public Artist response remains privacy-filtered. The service ID is shared across Artist, staff and assigned Partner operational views, while internal notes, staff actor identity and unrelated assignment details remain hidden.

## Retry and concurrency

Creator + idempotencyKey uniqueness and the PostgreSQL advisory transaction lock remain authoritative. The audit event stores the canonical Artist command (`serviceId` + description), not mutable catalog display data. Exact retries therefore return the same request even after the service is later deactivated; changed payload under the same key conflicts.

## Migration compatibility

Historical and staff-created ServiceRequest rows may have a null catalog service ID. No synthetic catalog mapping is invented for old data. New Artist-created requests require an active catalog item.

See `docs/implementation/service-catalog-booking-backend.md` for catalog availability, audit and migration details.
