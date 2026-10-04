-- CreateEnum
CREATE TYPE "ServiceExecutionStatus" AS ENUM ('accepted', 'scheduled', 'in_progress', 'submitted', 'changes_requested', 'completed');

-- CreateTable
CREATE TABLE "service_executions" (
    "assignmentId" UUID NOT NULL,
    "status" "ServiceExecutionStatus" NOT NULL DEFAULT 'accepted',
    "version" INTEGER NOT NULL DEFAULT 0,
    "scheduledStart" TIMESTAMP(3),
    "scheduledEnd" TIMESTAMP(3),
    "scheduleSummary" TEXT,
    "progressSummary" TEXT,
    "submissionSummary" TEXT,
    "reviewSummary" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_executions_pkey" PRIMARY KEY ("assignmentId")
);

-- CreateTable
CREATE TABLE "service_execution_events" (
    "id" UUID NOT NULL,
    "assignmentId" UUID NOT NULL,
    "version" INTEGER NOT NULL,
    "fromStatus" "ServiceExecutionStatus",
    "toStatus" "ServiceExecutionStatus" NOT NULL,
    "summary" TEXT NOT NULL,
    "actorUserId" UUID NOT NULL,
    "command" JSONB NOT NULL,
    "requestTraceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_execution_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_execution_events_assignmentId_version_key" ON "service_execution_events"("assignmentId", "version");

-- AddForeignKey
ALTER TABLE "service_executions" ADD CONSTRAINT "service_executions_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "service_assignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_execution_events" ADD CONSTRAINT "service_execution_events_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "service_executions"("assignmentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_execution_events" ADD CONSTRAINT "service_execution_events_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "service_executions" ADD CONSTRAINT "service_execution_version_valid" CHECK ("version" >= 0);
ALTER TABLE "service_executions" ADD CONSTRAINT "service_execution_schedule_valid" CHECK (("scheduledStart" IS NULL AND "scheduledEnd" IS NULL) OR ("scheduledStart" IS NOT NULL AND "scheduledEnd" IS NOT NULL AND "scheduledEnd" > "scheduledStart"));
ALTER TABLE "service_execution_events" ADD CONSTRAINT "service_execution_event_valid" CHECK (("version" = 0 AND "fromStatus" IS NULL AND "toStatus" = 'accepted') OR ("version" > 0 AND "fromStatus" IS NOT NULL));
-- Existing accepted assignments gain execution foundations, never invented completion.
INSERT INTO "service_executions" ("assignmentId", "updatedAt") SELECT "id", COALESCE("respondedAt", "assignedAt") FROM "service_assignments" WHERE "status" = 'accepted';
INSERT INTO "service_execution_events" ("id","assignmentId","version","toStatus","summary","actorUserId","command","requestTraceId","createdAt")
SELECT gen_random_uuid(), "id", 0, 'accepted', COALESCE("responseSummary", 'Accepted assignment'), "partnerUserId", '{"source":"accepted_assignment"}'::jsonb, 'service-execution-backfill', COALESCE("respondedAt", "assignedAt") FROM "service_assignments" WHERE "status" = 'accepted';
CREATE FUNCTION service_execution_events_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Service execution events are append-only'; END $$;
CREATE TRIGGER service_execution_events_immutable BEFORE UPDATE OR DELETE ON "service_execution_events" FOR EACH ROW EXECUTE FUNCTION service_execution_events_immutable();
