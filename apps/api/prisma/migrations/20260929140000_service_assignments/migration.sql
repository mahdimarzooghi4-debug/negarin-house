CREATE TABLE "service_requests" (
  "id" UUID NOT NULL,
  "partnerTitle" TEXT NOT NULL,
  "partnerSummary" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "service_requests_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "service_assignments" (
  "id" UUID NOT NULL,
  "serviceRequestId" UUID NOT NULL,
  "partnerOrganizationId" UUID NOT NULL,
  "assignedPartnerUserId" UUID,
  "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "service_assignments_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "service_assignments_partnerOrganizationId_assignedPartnerUserId_assignedAt_idx"
  ON "service_assignments"("partnerOrganizationId", "assignedPartnerUserId", "assignedAt");
CREATE INDEX "service_assignments_serviceRequestId_assignedAt_idx"
  ON "service_assignments"("serviceRequestId", "assignedAt");

ALTER TABLE "service_assignments"
  ADD CONSTRAINT "service_assignments_serviceRequestId_fkey"
  FOREIGN KEY ("serviceRequestId") REFERENCES "service_requests"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "service_assignments"
  ADD CONSTRAINT "service_assignments_assignedPartnerUserId_fkey"
  FOREIGN KEY ("assignedPartnerUserId") REFERENCES "identity_users"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
