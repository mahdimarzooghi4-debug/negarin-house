# Artist-created service requests — backend slice

This slice closes the missing intake step in the existing E6 request → Negarin assignment → Partner execution flow without inventing service pricing, support-credit logic or partner selection.

## API

Artist:
- POST `/api/v1/artist/service-requests`
- Existing GET list/detail remain unchanged.

POST body is exactly:

```json
{
  "idempotencyKey": "uuid",
  "title": "bounded text",
  "description": "bounded text"
}
```

The API rejects identity and business-rule overrides such as `artistUserId`, `internalNote`, partner IDs, price, support credit, Growth or other unknown fields. The authenticated active Artist context becomes both `artistUserId` and `createdByUserId`.

## State and authorization

The new request uses the existing ServiceRequest aggregate and begins in `awaiting_assignment`. Only Negarin services-domain staff can assign a Service Partner; this endpoint does not let an Artist browse or choose partners. It creates no ServiceAssignment, ServiceExecution, financial event, Growth event, membership mutation or support-credit usage.

The public Artist response remains the existing privacy-filtered request view: no internal note, staff actor identity, assignment history collection or Artist identity field is returned. Staff can read the same request through the current admin endpoints.

## Retry and concurrency

The existing creator + idempotencyKey unique key and PostgreSQL advisory transaction lock are reused. An exact normalized retry returns the same request. Reusing the key with a changed command returns conflict. Concurrent identical Artist creation writes one request/event.

## Verification boundary

Unit contracts cover strict field acceptance and pre-storage role denial. PostgreSQL HTTP tests cover self-derived ownership, hidden staff fields, cross-Artist concealment, forbidden business overrides, customer denial, concurrent idempotency and absence of financial side effects.

No schema migration is required because this uses the existing ServiceRequest model. Service catalog and support-credit authorization remain separate product/backend slices and must not be inferred from this endpoint.
