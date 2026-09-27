# API & Integration Architecture

Status: Accepted baseline.

## API convention

Base path:

```text
/api/v1
```

REST/JSON with OpenAPI generation.

Use plural resources and explicit command endpoints when a transition is not CRUD.

Examples:

```text
POST /api/v1/products
POST /api/v1/products/:id/submit-review
POST /api/v1/admin/publication-reviews/:id/approve
POST /api/v1/admin/publication-reviews/:id/request-revision

POST /api/v1/corporate/purchase-requests
POST /api/v1/corporate/proposals/:id/confirm
POST /api/v1/corporate/proposals/:id/request-revision

POST /api/v1/partner/orders
POST /api/v1/partner/orders/:id/submit

POST /api/v1/artist/allocations/:id/fulfillment-events

POST /api/v1/issues
POST /api/v1/admin/issues/:id/resolve
```

Endpoint names are illustrative conventions; the engineering backlog will define the complete contract.

## Error envelope

Use a consistent machine-readable error shape:

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Resource not found",
    "requestId": "..."
  }
}
```

Do not return stack traces or provider errors to clients.

## Validation

Validate at the API boundary:

- data shape
- field lengths
- enum values
- file metadata
- pagination
- locale

Validate business invariants in application/domain services.

## Idempotency

Require an idempotency key for commands where duplicate submission is dangerous, especially:

- order submission
- payment callback processing
- payment initiation where applicable
- settlement commands
- issue/report upload finalization if retryable

## Pagination

Prefer cursor pagination for operational lists.

Filters are explicit and allow-listed.

Never accept arbitrary field names/order expressions directly from the client.

## API contracts package

`packages/contracts` contains generated/shared schemas that are safe for both frontend and backend.

Use schema-first runtime validation (for example Zod or generated OpenAPI clients) rather than trusting TypeScript-only compile-time types.

## Integration adapters

All external providers sit behind interfaces.

### OTP

```ts
interface OtpProvider {
  sendChallenge(destination: string, code: string): Promise<void>
}
```

### Object storage

```ts
interface ObjectStorage {
  createUploadUrl(input: UploadRequest): Promise<SignedUpload>
  createReadUrl(objectKey: string): Promise<string>
  deleteObject(objectKey: string): Promise<void>
}
```

### Payment

Payment providers must map provider events into domain-neutral states.

No provider-specific status becomes the canonical business status.

### Notifications

Provider-neutral notification command:

```ts
type NotificationCommand = {
  recipientId: string
  template: string
  locale: string
  data: Record<string, unknown>
}
```

## Payment webhooks

Webhook processing must:

1. verify provider authenticity
2. store raw provider event metadata safely
3. deduplicate by provider event ID
4. map to domain payment event
5. update state transactionally
6. write outbox event
7. respond idempotently

## Financial abstraction

Phase 1 architecture defines these interfaces without choosing unresolved formulas:

```ts
interface FxPolicy {
  quote(input: FxQuoteRequest): Promise<FxQuote>
}

interface InternationalFeePolicy {
  calculate(input: InternationalFeeRequest): Promise<InternationalFeeResult>
}

interface SettlementRail {
  execute(input: SettlementInstruction): Promise<SettlementRailResult>
}
```

Until Product/Finance accepts the rules, production implementations must not invent conversion, fee, or settlement behavior.

A disabled/not-configured implementation is preferable to fabricated business logic.

## Domain events / outbox

Important business transitions emit events after committing state.

Consumers must be idempotent.

Events are internal implementation contracts, not user-facing status names.

## Reporting APIs

Reports are built from authorized read models.

CSV/report export accepts the same authorization scope as the UI and may not expose additional fields simply because the output is downloadable.

## Versioning

Use URL major versioning for public HTTP contracts.

Within Phase 1, prefer backward-compatible additions. Breaking changes require a new API version or coordinated release.
