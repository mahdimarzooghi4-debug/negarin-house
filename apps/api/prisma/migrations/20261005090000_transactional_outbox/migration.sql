CREATE TYPE "OutboxEventType" AS ENUM ('support_used');

CREATE TABLE "outbox_events" (
  "id" UUID NOT NULL,
  "eventKey" TEXT NOT NULL,
  "type" "OutboxEventType" NOT NULL,
  "aggregateType" TEXT NOT NULL,
  "aggregateId" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "occurredAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "dispatchedAt" TIMESTAMP(3),
  "attemptCount" INTEGER NOT NULL DEFAULT 0,
  "nextAttemptAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "leaseOwner" TEXT,
  "leaseUntil" TIMESTAMP(3),
  "lastError" TEXT,
  CONSTRAINT "outbox_events_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "outbox_events_eventKey_key" ON "outbox_events"("eventKey");
CREATE INDEX "outbox_events_dispatch_idx"
  ON "outbox_events"("dispatchedAt","nextAttemptAt","leaseUntil","occurredAt","id");

ALTER TABLE "outbox_events" ADD CONSTRAINT "outbox_event_valid" CHECK (
  char_length(btrim("eventKey")) BETWEEN 1 AND 300
  AND char_length(btrim("aggregateType")) BETWEEN 1 AND 100
  AND char_length(btrim("aggregateId")) BETWEEN 1 AND 300
  AND "attemptCount" >= 0
  AND ("lastError" IS NULL OR char_length("lastError") <= 4000)
  AND (("leaseOwner" IS NULL AND "leaseUntil" IS NULL)
       OR ("leaseOwner" IS NOT NULL AND char_length(btrim("leaseOwner")) BETWEEN 1 AND 200 AND "leaseUntil" IS NOT NULL))
);

CREATE FUNCTION outbox_event_business_fields_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW."eventKey" IS DISTINCT FROM OLD."eventKey"
     OR NEW."type" IS DISTINCT FROM OLD."type"
     OR NEW."aggregateType" IS DISTINCT FROM OLD."aggregateType"
     OR NEW."aggregateId" IS DISTINCT FROM OLD."aggregateId"
     OR NEW."payload" IS DISTINCT FROM OLD."payload"
     OR NEW."occurredAt" IS DISTINCT FROM OLD."occurredAt"
     OR NEW."createdAt" IS DISTINCT FROM OLD."createdAt" THEN
    RAISE EXCEPTION 'Outbox business fields are immutable';
  END IF;
  RETURN NEW;
END $$;

CREATE TRIGGER outbox_event_business_fields_immutable
BEFORE UPDATE ON "outbox_events"
FOR EACH ROW EXECUTE FUNCTION outbox_event_business_fields_immutable();

CREATE FUNCTION outbox_event_no_delete() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Outbox events cannot be deleted'; END $$;

CREATE TRIGGER outbox_event_no_delete
BEFORE DELETE ON "outbox_events"
FOR EACH ROW EXECUTE FUNCTION outbox_event_no_delete();
