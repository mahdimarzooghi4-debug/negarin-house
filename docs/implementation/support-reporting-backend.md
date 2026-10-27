# Support reporting read models

This slice closes the E7 organization-scoped reporting gap using read-only projections over the support source of truth introduced by the monetary credit lifecycle.

## APIs

Supporting Organization:
- `GET /api/v1/supporting-organization/support-report`
- `GET /api/v1/supporting-organization/support-activity?page=&pageSize=`

Artist:
- `GET /api/v1/artist/support-report`
- `GET /api/v1/artist/support-activity?page=&pageSize=`

Negarin Staff:
- `GET /api/v1/admin/support-report`
- `GET /api/v1/admin/support-activity?page=&pageSize=`

Staff reporting requires the existing `reports` permission domain. This does not broaden `artists`, `services` or `finance` mutation permissions.

## Source of truth

No reporting/balance table is added. Summary queries read, in one RepeatableRead transaction:
- SupportProgram;
- SupportRelationship;
- SupportAllocation;
- SupportCreditEvent.

This prevents a second mutable balance from drifting from the append-only support ledger.

## Money semantics

All calculations use JavaScript BigInt over Prisma/PostgreSQL BIGINT values and serialize back to decimal strings.

Report fields deliberately separate stock from flow:

Current stock:
- `allocatedToman`: principal originally allocated across allocations in scope;
- `currentAvailableToman`;
- `currentReservedToman`;
- `currentConsumedToman`.

Historical flow:
- lifecycle counts and full-allocation Toman amounts for `allocated`, `reserved`, `released`, `consumed`, and `reversed`.

Released/reversed activity is not netted away from history. Current allocation state remains the balance truth.

## Scope

Supporting Organization:
- only `supporting_organization` programs whose organizationId matches authenticated organization context;
- only relationships, allocations and events under those programs.

Artist:
- only relationships where artistUserId equals authenticated user;
- includes both external organization support and Negarin CSR support.

Staff reports:
- all support records;
- requires reports permission.

Unauthorized roles fail before data access. An authorized user with no in-scope support receives zeros/empty arrays.

## Activity privacy

Activity normalizes the support command to an optional human-readable `reason`. It intentionally does not return raw command JSON or idempotency keys.

Returned linked ServiceRequest fields are limited to support-operational context:
- request ID;
- service ID;
- title;
- description;
- status.

No internal note, Partner data, Artist bank/private finance/Growth data, payment or settlement data is joined.

## Referral boundary

Architecture names `ReferralStatus` but does not define allowed values or transitions. This slice therefore does not invent an ArtistReferral state machine. Referral remains separate from SupportRelationship and cannot be inferred from report data.

## Release boundary

No schema migration is required. This Draft does not merge or deploy; Stage/QA/Release Approval remain separate gates.
