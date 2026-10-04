# E6 / E10 — Service intake and assignment slice

Sources: Phase 1 Product/UX handoff; engineering backlog E6 Service Partner Execution and E10 Admin Operations. Scope: backend foundation, with subsequent UI integration.

Acceptance:
1. Services-domain staff can create a bounded operational brief for an active Artist, with stable idempotent identity.
2. Staff can assign only an active Service Partner user in the specified organization; no unrestricted Artist browsing is introduced.
3. Partner lists/detail/accept/decline are scoped to both organization and assigned user; unassigned deep links return 404.
4. Artist reads only own request; neither external view exposes internal notes, private Artist fields or other assignments.
5. Versioned commands, duplicate retry semantics and immutable audit history remain atomic; decline permits a new assignment while preserving old outcomes.
6. Acceptance does not alter payment, Growth, membership, delivery or settlement.
7. Type/schema/lint checks and actual PostgreSQL HTTP negative/concurrency/rollback tests pass in CI; draft review only before Stage/QA/Release approval.

Next dependent stories: execution progress, scheduling, deliverable storage/review, service catalog and Artist booking/support-credit authorization. This slice does not invent service pricing, completion-review requirements or finance rules.
