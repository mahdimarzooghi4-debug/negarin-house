# E11 — Admin service trace read model

## Goal

Give Negarin service operations one read-only trace across ServiceRequest, assignment, execution, deliverables and support usage while preserving independent domain state.

## Acceptance

1. Requires Staff with the existing `services` permission domain.
2. Unknown ServiceRequest returns 404.
3. Trace keeps the original ServiceRequest ID and service catalog ID.
4. Request history exposes version/action/assignment/actor/trace identity, not raw command JSON.
5. Every assignment remains independently visible with partner organization/user and assignment status.
6. Execution state/history remains independent from assignment state.
7. Deliverable metadata excludes private storage object keys and upload idempotency/command hashes.
8. Support usage includes allocations that historically touched the request even after release/reversal makes `currentServiceRequestId` null.
9. Support money remains exact BigInt serialized as decimal Toman strings.
10. Support, service execution, Partner assignment and request state are never collapsed into one synthetic status.
11. No mutation or side effect is performed.
12. Multi-table reads execute under RepeatableRead isolation.

## API

`GET /api/v1/admin/service-requests/:id/trace`

## Out of scope

- Partner/Artist trace UI;
- new support rules;
- payment/settlement;
- Growth;
- signed file download;
- notification delivery;
- merge, Stage deployment, QA approval or Production release.
