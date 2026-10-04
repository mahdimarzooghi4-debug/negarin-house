ALTER TABLE "artist_shipment_reports" ADD COLUMN "customerVersion" INTEGER NOT NULL DEFAULT 0 CHECK ("customerVersion" >= 0);
CREATE TYPE "ShipmentIssueKind" AS ENUM ('not_received','damaged','wrong_items','missing_items');
CREATE TABLE "customer_shipment_receipts" (
 "shipmentId" UUID NOT NULL PRIMARY KEY REFERENCES "artist_shipment_reports"("id") ON DELETE RESTRICT,
 "commandVersion" INTEGER NOT NULL CHECK ("commandVersion" >= 0),
 "customerUserId" UUID NOT NULL REFERENCES "identity_users"("id") ON DELETE RESTRICT,
 "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "requestId" TEXT NOT NULL
);
CREATE TABLE "customer_shipment_issues" (
 "shipmentId" UUID NOT NULL PRIMARY KEY REFERENCES "artist_shipment_reports"("id") ON DELETE RESTRICT,
 "commandVersion" INTEGER NOT NULL CHECK ("commandVersion" >= 0),
 "customerUserId" UUID NOT NULL REFERENCES "identity_users"("id") ON DELETE RESTRICT,
 "kind" "ShipmentIssueKind" NOT NULL,
 "description" TEXT NOT NULL CHECK (char_length("description") BETWEEN 1 AND 2000),
 "reportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "requestId" TEXT NOT NULL
);
