# Support credit backend — E7 lifecycle

This implementation adds the first transactional E7 support aggregate while preserving the existing separation between support, service execution, payment and settlement.

## APIs

Supporting Organization:
- GET/POST `/api/v1/supporting-organization/support-programs`
- GET `/api/v1/supporting-organization/support-programs/:id`
- POST `/api/v1/supporting-organization/support-programs/:id/relationships`
- GET `/api/v1/supporting-organization/support-relationships[/:id]`
- POST `/api/v1/supporting-organization/support-relationships/:id/allocations`
- GET `/api/v1/supporting-organization/support-allocations[/:id]`

Artist:
- GET `/api/v1/artist/support-relationships[/:id]`
- GET `/api/v1/artist/support-allocations[/:id]`

Negarin Staff:
- GET/POST `/api/v1/admin/support-programs`
- POST `/api/v1/admin/support-programs/:id/relationships`
- GET `/api/v1/admin/support-relationships[/:id]`
- POST `/api/v1/admin/support-relationships/:id/approve`
- POST `/api/v1/admin/support-relationships/:id/allocations`
- GET `/api/v1/admin/support-allocations[/:id]`
- POST `/api/v1/admin/support-allocations/:id/reserve`
- POST `/api/v1/admin/support-allocations/:id/consume`
- POST `/api/v1/admin/support-allocations/:id/release`
- POST `/api/v1/admin/support-allocations/:id/reverse`

Program and allocation source are inferred from authenticated context:
- Supporting Organization creates only programs/relationships/allocations in its own organization scope.
- Admin program creation creates only `negarin_csr` programs.
- Client payload cannot choose organization/source.

## Authorization

Existing permission domains are reused rather than inventing a new global Staff domain:
- `artists`: Negarin CSR program/relationship/allocation administration and explicit Negarin eligibility approval.
- `services`: reserve, consume and release against ServiceRequest.
- `finance`: reversal of a consumed monetary support allocation.

Service Partner has no support-credit endpoint. External organization queries are tenant-scoped by organizationId. Artist queries are self-scoped.

## Monetary safety

`amountToman` is accepted only as a positive integer decimal string and persisted as PostgreSQL BIGINT/Prisma BigInt. Lifecycle commands do not accept an amount. This makes partial use impossible through the API.

SupportAllocation immutable fields are database-protected:
- program/relationship;
- creator/idempotency key;
- amount;
- rules snapshot;
- createdAt.

The allocation itself cannot be deleted. Support program, relationship and credit event tables use append-only database triggers for their event history.

No expiry, wallet, payout, cash conversion or transfer field exists.

## Rules and eligibility

SupportProgram stores bounded `rules` text. Each allocation copies that text to `rulesSnapshot`, so later product evolution cannot silently reinterpret an existing allocation.

This slice deliberately does not invent a machine-readable policy language. Program-specific release/usage conditions remain human-governed and every operational transition requires a bounded reason. Once explicit rule schemas are approved, they can be added without changing the monetary identity/history model.

External relationship:
Supporting Organization sponsor approval → Negarin approval → eligible.

Negarin CSR relationship:
Negarin acting as sponsor creates the relationship → explicit Negarin approval → eligible.

Allocations cannot be created before the second approval.

## Service usage

Reservation validates that the ServiceRequest belongs to the supported Artist. It does not hardcode ServiceExecution status, which permits support at whichever service stage the approved program rules require.

A ServiceRequest may have multiple allocations from independent programs/sources. Each allocation remains independently versioned.

Supporting Organization and Artist allocation views include the linked request scope and current execution view, while unrelated Artist finance/bank/Growth/Admin data remains absent.

## Transactionality and retry

- program creation: creator + idempotency key + PostgreSQL advisory lock;
- relationship creation: program + Artist natural identity + advisory lock;
- allocation creation: creator + idempotency key + advisory lock;
- eligibility approval and credit lifecycle: row locks + optimistic version;
- state mutation and append-only audit event occur in one transaction;
- audit insertion failure rolls the state mutation back;
- exact lifecycle retry by the same actor is replay-safe;
- stale or changed commands conflict.

## Release boundary

This Draft does not merge or deploy. PostgreSQL migration must still be validated on Stage against stacked historical data. ArtistReferral, automated policy-rule evaluation, UI binding and any banking/settlement mechanism remain separate slices.


## Multi-organization retry isolation

SupportAllocation creation first resolves the target relationship under the authenticated owner scope. Only after that authorization succeeds does it acquire the advisory lock and resolve an idempotent retry.

The database key is `relationshipId + createdByUserId + idempotencyKey`, and the advisory lock uses the same relationship-aware scope. This prevents a user who switches between Supporting Organization contexts from replaying an allocation belonging to another organization while still allowing the same key to be used independently for a different authorized relationship.
