# Transactional outbox implementation

This slice implements the database-to-queue half of the accepted async-event architecture.

## Database

`OutboxEvent` stores immutable business event data and mutable delivery metadata.

The migration adds:
- event-key uniqueness;
- dispatch index;
- consistency checks for leases/errors/attempts;
- trigger protection for business fields;
- delete protection.

The first enum value is `support_used`. New event types must be added only when the corresponding domain transition is accepted and wired transactionally.

## API producer

`writeOutboxEvent(tx, event)` requires an existing Prisma transaction client.

Support consumption writes deterministic key:

`support-used:<allocationId>:<consumedVersion>`

Payload contains only operational IDs and exact Toman amount:
- allocation;
- service request;
- program;
- support relationship;
- Artist;
- amount string.

It contains no bank/payment/settlement data.

## Worker bridge

`apps/worker/src/outbox-dispatcher.ts` connects directly to PostgreSQL and claims due rows with leases + `SKIP LOCKED`, supporting multiple worker instances.

Successful claims are added to `domain-events` using:
- event type as job name;
- outbox UUID as stable BullMQ job ID;
- immutable outbox payload/identity.

The Worker then marks the database event dispatched. Failed publishes clear the lease, retain the event, store a bounded error, and move `nextAttemptAt` forward by 30 seconds.

The queue job is retained on complete/failure so a crash between queue insertion and DB acknowledgement does not create another job with the same ID.

## Boundary

This is infrastructure, not notification behavior. There is intentionally no generic “send message” consumer in this PR because recipient/channel/template rules belong to later domain-specific notification stories.
