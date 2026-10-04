# E6 / E10 — Execution continuation

Source: approved Phase 1 E6 schedule/coordination, progress, deliverables and Negarin review; service-assignment foundation acceptance.

Acceptance for this slice:
1. Accepted assignments obtain independent execution version/state atomically, preserving assignment/request identity.
2. Assigned Partner can propose/reschedule a bounded UTC schedule, start work, record progress and submit a text result.
3. Services-domain staff can request correction or explicitly complete submitted work; Partner cannot bypass review.
4. State transitions and retry/concurrency conflicts are audited atomically; past reports remain immutable.
5. Cross-user/org access is concealed; public views do not expose private Artist data, staff/internal command metadata or other assignments.
6. Payment, Growth, membership, delivery and settlement remain independent; proposed schedule and reported progress are labelled by source.
7. Local checks and real PostgreSQL negative/concurrency/rollback tests pass in CI; review precedes Stage/QA/Release approval.

Remaining scope is explicit: binary deliverable upload, pricing/booking/credits, cancellation and UI integration. No file upload or appointment confirmation is claimed by a text report or Partner proposal.
