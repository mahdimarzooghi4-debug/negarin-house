CREATE TYPE "ShipmentIssueStatus" AS ENUM ('open','in_review','closed');
CREATE TYPE "ShipmentIssueResolution" AS ENUM ('customer_follow_up_complete','referred_for_refund_review');
ALTER TABLE "customer_shipment_issues"
 ADD COLUMN "status" "ShipmentIssueStatus" NOT NULL DEFAULT 'open',
 ADD COLUMN "version" INTEGER NOT NULL DEFAULT 0 CHECK ("version" >= 0),
 ADD COLUMN "resolution" "ShipmentIssueResolution",
 ADD COLUMN "resolutionSummary" TEXT,
 ADD CONSTRAINT "shipment_issue_resolution_state_check" CHECK (
  ("status" = 'closed' AND "resolution" IS NOT NULL AND "resolutionSummary" IS NOT NULL AND char_length("resolutionSummary") BETWEEN 1 AND 2000)
  OR ("status" <> 'closed' AND "resolution" IS NULL AND "resolutionSummary" IS NULL));
CREATE TABLE "shipment_issue_events" (
 "id" UUID NOT NULL PRIMARY KEY,
 "shipmentId" UUID NOT NULL REFERENCES "customer_shipment_issues"("shipmentId") ON DELETE RESTRICT,
 "version" INTEGER NOT NULL CHECK ("version" > 0),
 "fromStatus" "ShipmentIssueStatus" NOT NULL,
 "toStatus" "ShipmentIssueStatus" NOT NULL,
 "resolution" "ShipmentIssueResolution",
 "summary" TEXT NOT NULL CHECK (char_length("summary") BETWEEN 1 AND 2000),
 "actorUserId" UUID NOT NULL REFERENCES "identity_users"("id") ON DELETE RESTRICT,
 "requestId" TEXT NOT NULL,
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CHECK ("fromStatus" <> "toStatus")
);
CREATE UNIQUE INDEX "shipment_issue_events_shipmentId_version_key" ON "shipment_issue_events"("shipmentId","version");
CREATE INDEX "customer_shipment_issues_status_reportedAt_shipmentId_idx" ON "customer_shipment_issues"("status","reportedAt","shipmentId");
