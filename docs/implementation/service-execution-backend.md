# E6 / E10 — Service execution and text handover

Extends the assignment foundation in PR #53 with independent execution state. Business source: Phase 1 E6 schedule/coordination, execution progress, traceable deliverables and Negarin review. ServiceAssignment remains accepted while its execution advances; no payment, membership, Growth or settlement changes follow.

## Commands and states

An accepted assignment creates ServiceExecution version0 plus an immutable acceptance event in the same transaction. Migration initializes existing accepted assignments using their response timestamp/summary; it never marks them delivered or completed. Declined/unanswered assignments get no execution.

- Partner POST `/api/v1/service-partner/assignments/:id/schedule`: `{version,scheduledStart,scheduledEnd,summary}`. Strict ISO UTC Z timestamps, normalized milliseconds, valid calendar/time, end>start, future start for a new schedule. Accepted/scheduled only. Rescheduling before start retains earlier plans in audit command history. Exact immediate replay remains valid even when the originally future timestamp passes.
- Partner POST `/:id/execution`: `{version,action,summary}`. `start`: scheduled or changes_requested → in_progress. `update`: in_progress → in_progress, with a new versioned progress report. `submit`: in_progress → submitted, with a text-report handover.
- Services-domain staff POST `/api/v1/admin/service-assignments/:id/execution-review`: `{version,decision,summary}`. Submitted → changes_requested or completed. Correction requires Partner restart and resubmission. No direct Partner completion command.

This foundation uses explicit staff review for completion. It does not invent automatic completion thresholds or a service-specific exemption policy. Scheduling is a Partner proposal, not Artist-confirmed appointment; it does not prevent reporting work started early. Progress/result are Partner reports, completion is staff_review. Text submission is not file upload, verified external delivery or customer receipt. Summary max4000, no control/bidi characters; fields are explicit, financial/status/identity overrides rejected.

## Security and concurrency

Partner commands require both active organization and assigned user. Unassigned cross-user/cross-org IDs return404, other active roles403. Reviews require services permission, not finance permission. All three portals read one execution attached to the same assignment/request IDs. Artist sees only own request; Partner only own assignment. Public projections omit actor IDs, command payloads, request traces, internal notes and Artist private data. Staff actor IDs permit traceability. Schedule/progress/submission/review summaries are deliberately shared operational text; internal notes belong in the existing staff-only field.

Execution has its own version, distinct from request version and original assignment response commandVersion. All execution commands lock the shared request row, then re-read execution, compare version, update state and insert event in one transaction. Identical same-actor immediate retry replays; stale/changed/different-actor attempts conflict. Completion is terminal. DB unique assignment/version plus append-only UPDATE/DELETE rejection protects history. RepeatableRead wraps nested multi-query views for coherent execution/history. Initial acceptance failure rolls back the assignment/request acceptance too.

## Validation and remaining work

Unit contracts cover UTC normalization, invalid dates/ranges, strict payloads and role/domain gates. PostgreSQL HTTP covers complete correction/review journey, concurrent retry, reschedule/skip/terminal rules, versioned progress reports, privacy/scoping, and trigger-driven acceptance/schedule/review failure rollback plus immutable history. Full CI required: migration reset/deploy, lint/types, dependency audit, tests, build and browser suite. Empty-DB CI does not replace staging QA of preexisting accepted-assignment backfill.

Next slices: validated private deliverable file storage and review references; service catalog/Artist booking; support-credit authorization; cancellation/exception workflows where product rules are specified; UI binding. No AI/commission, priced purchase, credit consumption, bank transfers, merge or deploy in this slice.
