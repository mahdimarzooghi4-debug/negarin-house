CREATE TYPE "ServiceDeliverableStatus" AS ENUM ('pending', 'ready');

CREATE TABLE "service_deliverables" (
  "id" UUID NOT NULL,
  "assignmentId" UUID NOT NULL,
  "uploadedByUserId" UUID NOT NULL,
  "objectKey" TEXT NOT NULL,
  "fileName" TEXT NOT NULL,
  "contentType" TEXT NOT NULL,
  "contentLength" INTEGER NOT NULL,
  "status" "ServiceDeliverableStatus" NOT NULL DEFAULT 'pending',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "service_deliverables_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "service_deliverables_objectKey_key" ON "service_deliverables"("objectKey");
CREATE INDEX "service_deliverables_assignmentId_status_createdAt_idx"
  ON "service_deliverables"("assignmentId", "status", "createdAt");

ALTER TABLE "service_deliverables"
  ADD CONSTRAINT "service_deliverables_assignmentId_fkey"
  FOREIGN KEY ("assignmentId") REFERENCES "service_assignments"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "service_deliverables"
  ADD CONSTRAINT "service_deliverables_uploadedByUserId_fkey"
  FOREIGN KEY ("uploadedByUserId") REFERENCES "identity_users"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
