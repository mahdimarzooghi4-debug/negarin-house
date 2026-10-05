# E6 — Artist service-request intake

Source: approved Phase 1 E6 service workflow and existing ServiceRequest foundation.

Acceptance:
1. An authenticated Artist can create a service request for self through `POST /api/v1/artist/service-requests`.
2. Artist identity is derived only from the active session/context; the payload cannot supply `artistUserId`, internal notes, partner identity, price, Growth, membership or support-credit fields.
3. Input is limited to idempotencyKey, title and description using the existing bounded service-work-scope validation.
4. Creator and Artist are the same user; the request starts in `awaiting_assignment` and still requires Negarin staff assignment.
5. Artist retries with the same normalized command are idempotent; changed payload under the same key conflicts, including concurrent requests.
6. Artist response remains the existing public request view; staff can see the request through the current services-domain admin read model.
7. Creation has no payment, credit, Growth, membership, settlement or partner-selection side effects.

Out of scope: service catalog, pricing/purchase, support-credit authorization/consumption, direct Artist-to-Partner selection, scheduling before assignment, UI binding, merge or deployment.
