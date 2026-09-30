CREATE TABLE "service_deliverable_submissions" (
    "id" UUID NOT NULL,
    "deliverableId" UUID NOT NULL,
    "actorUserId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_deliverable_submissions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "service_deliverable_submissions_deliverableId_key"
    ON "service_deliverable_submissions"("deliverableId");

CREATE INDEX "service_deliverable_submissions_actorUserId_createdAt_idx"
    ON "service_deliverable_submissions"("actorUserId", "createdAt");

ALTER TABLE "service_deliverable_submissions"
    ADD CONSTRAINT "service_deliverable_submissions_deliverableId_fkey"
    FOREIGN KEY ("deliverableId") REFERENCES "service_deliverables"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "service_deliverable_submissions"
    ADD CONSTRAINT "service_deliverable_submissions_actorUserId_fkey"
    FOREIGN KEY ("actorUserId") REFERENCES "identity_users"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
