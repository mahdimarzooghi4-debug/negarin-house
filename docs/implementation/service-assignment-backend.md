# Service assignment foundation — E6 / E10

Business source: approved Phase 1 handoff and E6 assignment-scoped execution backlog. This slice implements internal request intake, assignment to an active service-partner user in a specified organization, accept/decline, reassignment after decline, and scoped request/assignment history. Service purchase, pricing, credits, scheduling, deliverables and completion review are subsequent slices.

## Contract and authorization

- Services-domain staff: POST/GET `/api/v1/admin/service-requests`, GET `/:id`, POST `/:id/assignment`.
- Artist: GET `/api/v1/artist/service-requests` and `/:id`, scoped to own identity.
- Service Partner: GET `/api/v1/service-partner/assignments` and `/:id`, POST `/:id/response`, scoped to both active organization and assigned user. A colleague in the same organization is concealed with 404.
- Lists accept strict page/pageSize (max50), no client identity filters. All responses use no-store.
- Create input: idempotencyKey, artistUserId, title (200), description (2000), optional internalNote (2000). Artist must hold a live Artist role. Description is intentionally the partner-visible execution brief; internal notes must go in internalNote.
- Assign input: version, partnerOrganizationId, partnerUserId. Recipient must hold a live matching service_partner grant.
- Response input: assigned commandVersion as version, accepted/declined decision, public summary (2000).

The service request retains one shared ID in staff, Artist and Partner views. Partner reads only their immutable work brief and their assignment outcome. No Artist browsing, contact/address, finance, Growth, membership, other assignments, staff actor IDs, internal notes or audit commands are exposed. Artist sees own status and public action/time history, without internal notes, staff IDs or partner identities. Staff can trace assignment/actor IDs but requestTraceId and raw command remain internal.

## State, retry and audit

Request: awaiting_assignment → assigned → accepted. Decline returns the request to awaiting_assignment and preserves the prior declined assignment. Accepted is terminal for this foundation; it is not completed, paid or settled. No rescheduling/cancellation/reassignment of an accepted service is invented here.

Create uses creator+idempotencyKey uniqueness and transaction-scoped advisory lock. Identical normalized retry returns the current request; changed payload under that key conflicts. Assignment/response lock the shared request row, increment its version, and write an event atomically. Immediate identical staff retry replays; stale/different commands conflict. Partner can replay their original final response after reassignment, returning only their own assignment. Old partners cannot act on replacement assignments.

Versioned event history has source/assignment consistency FK, per-request unique version and a DB UPDATE/DELETE rejection trigger. A partial unique index permits at most one assigned/accepted assignment per request. Multi-query request reads use RepeatableRead for coherent state/history.

## QA and release boundary

Unit tests cover strict inputs, role/domain gates and no finance/Growth command injection. PostgreSQL HTTP tests cover concurrent create/assign/respond, replay/conflicts, user+organization isolation, Artist privacy, revoked grants, queries, reassignment and journal-failure rollback/immutability. CI migration reset/deploy, lint, types, tests, build and browser suite are required before review completion.

No AI, commission, service payment/credit deduction, Growth promotion, uploads, execution completion, UI binding, merge or deployment. This foundation records an internal operational brief; it does not claim that a priced service has been purchased or delivered.
