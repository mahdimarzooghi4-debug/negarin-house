# E11/Foundation — Transactional outbox and domain-event bridge

## Goal

Provide the accepted Phase 1 transactional-outbox boundary so business state and asynchronous event intent cannot diverge.

## First wired event

`support_used` is emitted only when a SupportAllocation successfully transitions from reserved to consumed.

The outbox event is inserted inside the same PostgreSQL transaction as:
- SupportAllocation state/version mutation; and
- append-only SupportCreditEvent creation.

If outbox insertion fails, the consumption transition and support ledger event roll back.

## Outbox contract

Each event contains:
- immutable unique `eventKey`;
- event `type`;
- aggregate type/id;
- immutable JSON payload;
- business occurrence time;
- delivery bookkeeping: dispatched time, attempt count, retry time, lease owner/expiry, last error.

Business identity/payload fields are database-immutable. Events cannot be deleted through ordinary DML.

## Dispatch semantics

The Worker:
1. claims due events in PostgreSQL with `FOR UPDATE SKIP LOCKED`;
2. leases each event before publishing;
3. publishes to the stable BullMQ `domain-events` queue;
4. uses the outbox UUID as BullMQ jobId;
5. marks the outbox row dispatched only after queue insertion succeeds;
6. releases failed leases, records a bounded error, and delays retry.

Stable job IDs make a retry after “queue succeeded / DB mark failed” idempotent at the queue boundary as long as the BullMQ job is retained.

## Safety

- PostgreSQL remains source of truth.
- Redis/BullMQ is delivery infrastructure only.
- Notification delivery is not authoritative business truth.
- No notification channel, provider, recipient formula, template, preference policy, or external callback is invented here.
- No business mutation is performed by the generic domain-event bridge.

## Tests

- Support consume + SupportCreditEvent + outbox event atomicity.
- Forced outbox failure rolls consumption back.
- Exact support consume retry does not duplicate the outbox event.
- Worker lease concurrency uses SKIP LOCKED.
- Success marks dispatched and cannot be reclaimed.
- Failure releases lease and defers retry.
- Worker integration tests isolate their event-key scope from concurrently running API tests.

## Out of scope

- domain-event consumers;
- SMS/email/push provider adapters;
- notification preferences/templates;
- report generation;
- webhook callbacks;
- merge, Stage deploy, QA approval, Production release.
