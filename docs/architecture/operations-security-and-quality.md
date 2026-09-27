# Operations, Security & Quality Baseline

Status: Accepted baseline.

## Environments

### Local
Developer environment with local/ephemeral dependencies.

### CI/Test
Automated isolated test environment.

### Stage
Production-like integration environment used for:

- migrations
- authorization QA
- external integration verification
- localization
- accessibility
- critical E2E journeys
- release candidate validation

### Production
Receives only approved artifacts that passed Stage and QA.

## Configuration

Use typed environment configuration.

Fail startup when required configuration is missing or invalid.

Never commit secrets.

## Database migrations

- schema changes are committed
- migration generation and validation run in CI
- destructive migrations require explicit review
- production migrations run as a controlled deploy step
- application deploy must tolerate safe rolling transition where required

## Backup / recovery

Minimum production requirements:

- automated PostgreSQL backups
- point-in-time recovery where hosting supports it
- object-storage durability/versioning strategy where appropriate
- documented recovery procedure
- periodic restore test

A backup that has never been restored is not considered verified.

## Audit log

Audit sensitive actions such as:

- role/permission changes
- publication decisions
- Growth changes
- sensitive finance transitions
- payment state mutation
- settlement eligibility/release
- issue resolution
- support allocation changes
- organization-user access changes

Audit entries should include:

- actor
- active context
- action
- resource type/ID
- timestamp
- request/correlation ID
- result
- safe change metadata

Do not place full sensitive payloads in audit logs.

## Security baseline

### Authentication
- OTP rate limiting
- challenge expiry
- retry limits
- session rotation/revocation
- secure cookie settings

### Authorization
- server-side object-level checks
- tenant/relationship scoping
- policy tests
- no security by hidden navigation

### API
- payload size limits
- input validation
- rate limiting
- secure headers
- CORS allow-list
- CSRF controls where applicable

### Files
- allow-listed MIME/type/size
- signed access
- randomized object keys
- no public-by-default private evidence files

### Secrets
Use deployment-platform secret storage.

### Supply chain
CI should run dependency/security scanning and lockfile integrity checks.

## Observability

### Logs
Structured JSON with:
- timestamp
- level
- service
- request ID
- trace ID
- safe actor/resource IDs
- event/action

### Traces
OpenTelemetry-compatible instrumentation across web/API/worker and external adapters where practical.

### Metrics
At minimum:
- HTTP request count/latency/error
- DB connection pool
- queue lag/failures
- worker job duration
- webhook failures
- auth/OTP abnormal rates
- payment integration failure rate
- settlement job failure rate

### Alerts
Operational alerts should focus on actionable service health and critical integration failures.

## Testing

### Unit
Domain policies, state transition guards, value objects.

### Integration
Database repositories, module services, payment/webhook idempotency, outbox.

### Authorization
Explicit positive/negative tests for every role/resource family.

### Contract
OpenAPI/schema compatibility.

### E2E
Canonical journeys from Product/UX handoff.

### Localization
Exactly seven Partner locales, RTL/LTR behavior, bidi IDs/currency, no Portuguese.

### Accessibility
Critical flows:
- keyboard/focus
- contrast
- labels/errors
- status not color-only
- mobile target sizing

## Canonical E2E release journeys

At minimum:

1. Artist Product Publication
2. Customer Purchase → Artist Fulfillment
3. Artist Finance / Settlement
4. Growth
5. Service Partner Assigned Execution
6. Supporting Organization Referral / Support Usage
7. Corporate Request → Proposal → Multi-Artist Order → Delivery
8. Export Product → Partner Order → Protected Funds → Artist Fulfillment → Quality/Delivery → Artist Settlement
9. Unauthorized cross-tenant/deep-link attempts

## Definition of Done for implementation stories

A story is not done unless applicable items are complete:

- acceptance criteria
- authorization
- validation
- error/empty/loading states
- tests
- audit event if sensitive
- observability
- localization
- accessibility
- migration/data impact
- docs/API contract
- Stage validation

## Release process

```text
Implementation
→ Code Review
→ Stage
→ QA / Testing
→ Release Approval
→ Production
→ Monitoring
→ Improvement
```

The Figma/Product/UX release gate does not replace technical QA or production approval.
