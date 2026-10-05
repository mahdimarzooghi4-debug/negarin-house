# E6 — Artist service-request intake

Source: approved Phase 1 E6 service workflow and existing ServiceRequest foundation.

Current stacked acceptance:
1. An authenticated Artist can create a service request for self through `POST /api/v1/artist/service-requests`.
2. Artist identity is derived only from the active session/context.
3. Artist input is limited to `idempotencyKey`, an available catalog `serviceId`, and request-specific `description`.
4. Catalog title is server-resolved and snapshotted into the request; Artist cannot override title, identity, internal note, partner, price, Growth, membership or support-credit fields.
5. Creator and Artist are the same user; the request starts in `awaiting_assignment` and still requires Negarin staff assignment.
6. Exact retries are idempotent and remain replayable after later catalog deactivation; changed payload under the same key conflicts.
7. The shared service ID is retained across Artist/staff/Partner operational views.
8. Creation has no payment, credit, Growth, membership, settlement or partner-selection side effects.

The original Draft #56 intake accepted a bounded free-text title. The stacked service-catalog slice intentionally narrows new Artist creation to an active catalog service while retaining historical/staff-created requests without fabricated catalog links.

Out of scope: pricing/purchase, support-credit authorization/consumption, direct Artist-to-Partner selection, automatic scheduling, UI binding, merge or deployment.
