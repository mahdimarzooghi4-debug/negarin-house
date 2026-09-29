-- Legacy assignments predate actor tracking and retain a null author.
-- Every assignment created through the staff API records its author.
ALTER TABLE "service_assignments"
  ADD COLUMN "assignedByUserId" UUID;

ALTER TABLE "service_assignments"
  ADD CONSTRAINT "service_assignments_assignedByUserId_fkey"
  FOREIGN KEY ("assignedByUserId") REFERENCES "identity_users"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE INDEX "service_assignments_assignedByUserId_createdAt_idx"
  ON "service_assignments"("assignedByUserId", "createdAt");
