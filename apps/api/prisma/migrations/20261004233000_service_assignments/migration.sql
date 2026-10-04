-- CreateEnum
CREATE TYPE "ServiceRequestStatus" AS ENUM ('awaiting_assignment', 'assigned', 'accepted');

-- CreateEnum
CREATE TYPE "ServiceAssignmentStatus" AS ENUM ('assigned', 'accepted', 'declined');

-- CreateTable
CREATE TABLE "service_requests" (
    "id" UUID NOT NULL,
    "artistUserId" UUID NOT NULL,
    "createdByUserId" UUID NOT NULL,
    "idempotencyKey" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "internalNote" TEXT,
    "status" "ServiceRequestStatus" NOT NULL DEFAULT 'awaiting_assignment',
    "version" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_assignments" (
    "id" UUID NOT NULL,
    "requestId" UUID NOT NULL,
    "partnerOrganizationId" UUID NOT NULL,
    "partnerUserId" UUID NOT NULL,
    "assignedVersion" INTEGER NOT NULL,
    "status" "ServiceAssignmentStatus" NOT NULL DEFAULT 'assigned',
    "responseSummary" TEXT,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respondedAt" TIMESTAMP(3),

    CONSTRAINT "service_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_request_events" (
    "id" UUID NOT NULL,
    "requestId" UUID NOT NULL,
    "assignmentId" UUID,
    "version" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "actorUserId" UUID NOT NULL,
    "command" JSONB NOT NULL,
    "requestTraceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_request_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "service_requests_artistUserId_createdAt_id_idx" ON "service_requests"("artistUserId", "createdAt", "id");

-- CreateIndex
CREATE INDEX "service_requests_status_createdAt_id_idx" ON "service_requests"("status", "createdAt", "id");

-- CreateIndex
CREATE UNIQUE INDEX "service_requests_createdByUserId_idempotencyKey_key" ON "service_requests"("createdByUserId", "idempotencyKey");

-- CreateIndex
CREATE INDEX "service_assignments_partnerOrganizationId_partnerUserId_ass_idx" ON "service_assignments"("partnerOrganizationId", "partnerUserId", "assignedAt", "id");

-- CreateIndex
CREATE UNIQUE INDEX "service_assignments_requestId_assignedVersion_key" ON "service_assignments"("requestId", "assignedVersion");

-- CreateIndex
CREATE UNIQUE INDEX "service_assignments_id_requestId_key" ON "service_assignments"("id", "requestId");

-- CreateIndex
CREATE UNIQUE INDEX "service_request_events_requestId_version_key" ON "service_request_events"("requestId", "version");

-- AddForeignKey
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_artistUserId_fkey" FOREIGN KEY ("artistUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_assignments" ADD CONSTRAINT "service_assignments_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "service_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_assignments" ADD CONSTRAINT "service_assignments_partnerUserId_fkey" FOREIGN KEY ("partnerUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_request_events" ADD CONSTRAINT "service_request_events_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "service_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_request_events" ADD CONSTRAINT "service_request_events_assignmentId_requestId_fkey" FOREIGN KEY ("assignmentId", "requestId") REFERENCES "service_assignments"("id", "requestId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_request_events" ADD CONSTRAINT "service_request_events_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "service_requests" ADD CONSTRAINT "service_request_version_valid" CHECK ("version" >= 0);
ALTER TABLE "service_assignments" ADD CONSTRAINT "service_assignment_version_valid" CHECK ("assignedVersion" > 0);
ALTER TABLE "service_request_events" ADD CONSTRAINT "service_event_valid" CHECK ("version" >= 0 AND "action" IN ('created','assigned','accepted','declined'));
CREATE UNIQUE INDEX "service_one_active_assignment" ON "service_assignments"("requestId") WHERE "status" IN ('assigned','accepted');
CREATE FUNCTION service_events_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Service events are append-only'; END $$;
CREATE TRIGGER service_events_immutable BEFORE UPDATE OR DELETE ON "service_request_events" FOR EACH ROW EXECUTE FUNCTION service_events_immutable();
