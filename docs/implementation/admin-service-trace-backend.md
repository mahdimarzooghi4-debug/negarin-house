# Admin service trace backend

The service trace is a read-only projection over existing E6/E7 source-of-truth records.

It reads:
- ServiceRequest and append-only ServiceRequestEvent history;
- all ServiceAssignments;
- ServiceExecution state and ServiceExecutionEvent history;
- immutable deliverable-file metadata;
- every SupportAllocation whose SupportCreditEvent historically referenced the request.

The support query is intentionally history-based instead of filtering only on `currentServiceRequestId`. This preserves traceability for allocations that were reserved and later released/reversed.

## Privacy

The trace omits:
- raw event command JSON;
- support/allocation idempotency keys;
- private storage objectKey;
- deliverable commandHash;
- signed download URLs;
- Artist bank/private finance;
- unrelated Growth/Admin data.

Internal ServiceRequest `internalNote` remains visible because the endpoint is restricted to the services staff domain.

## State separation

Request, assignment, execution and support credit statuses are returned in separate branches. No aggregate status is derived.

All reads execute in one `RepeatableRead` transaction. No schema migration is required.
