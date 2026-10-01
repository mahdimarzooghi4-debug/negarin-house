CREATE TYPE "ServiceAssignmentResponseStatus" AS ENUM ('awaiting_response', 'accepted', 'declined');

CREATE TYPE "ServiceAssignmentResponseEventType" AS ENUM ('accepted', 'declined');

ALTER TABLE "service_assignments"
ADD COLUMN "responseStatus" "ServiceAssignmentResponseStatus" NOT NULL DEFAULT 'awaiting_response',
ADD COLUMN "respondedAt" TIMESTAMP(3);

CREATE TABLE "service_assignment_events" (
  "id" UUID NOT NULL,
  "assignmentId" UUID NOT NULL,
  "actorUserId" UUID NOT NULL,
  "type" "ServiceAssignmentResponseEventType" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "service_assignment_events_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "service_assignment_events_assignmentId_createdAt_idx"
ON "service_assignment_events"("assignmentId", "createdAt");

ALTER TABLE "service_assignment_events"
ADD CONSTRAINT "service_assignment_events_assignmentId_fkey"
FOREIGN KEY ("assignmentId") REFERENCES "service_assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "service_assignment_events"
ADD CONSTRAINT "service_assignment_events_actorUserId_fkey"
FOREIGN KEY ("actorUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
