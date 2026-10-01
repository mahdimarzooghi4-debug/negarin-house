CREATE TYPE "ServiceDeliverableReviewDecision" AS ENUM ('approved', 'changes_requested');

ALTER TABLE "service_assignments"
  ADD COLUMN "completedAt" TIMESTAMP(3),
  ADD COLUMN "completedByUserId" UUID;

ALTER TABLE "service_assignments"
  ADD CONSTRAINT "service_assignments_completedByUserId_fkey"
  FOREIGN KEY ("completedByUserId") REFERENCES "identity_users"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "service_deliverable_review_events" (
  "id" UUID NOT NULL,
  "submissionId" UUID NOT NULL,
  "actorUserId" UUID NOT NULL,
  "decision" "ServiceDeliverableReviewDecision" NOT NULL,
  "feedback" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "service_deliverable_review_events_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "service_deliverable_review_events_submissionId_key"
  ON "service_deliverable_review_events"("submissionId");
CREATE INDEX "service_deliverable_review_events_actorUserId_createdAt_idx"
  ON "service_deliverable_review_events"("actorUserId", "createdAt");

ALTER TABLE "service_deliverable_review_events"
  ADD CONSTRAINT "service_deliverable_review_events_submissionId_fkey"
  FOREIGN KEY ("submissionId") REFERENCES "service_deliverable_submissions"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "service_deliverable_review_events"
  ADD CONSTRAINT "service_deliverable_review_events_actorUserId_fkey"
  FOREIGN KEY ("actorUserId") REFERENCES "identity_users"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
