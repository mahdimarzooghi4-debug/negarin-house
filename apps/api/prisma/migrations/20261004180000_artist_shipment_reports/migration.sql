CREATE TABLE "artist_shipment_reports" (
 "id" UUID NOT NULL PRIMARY KEY,
 "orderId" UUID NOT NULL,
 "artistUserId" UUID NOT NULL,
 "preparationVersion" INTEGER NOT NULL CHECK ("preparationVersion" > 0),
 "carrierName" TEXT NOT NULL CHECK (char_length("carrierName") BETWEEN 1 AND 100),
 "trackingCode" TEXT NOT NULL CHECK (char_length("trackingCode") BETWEEN 1 AND 100 AND "trackingCode" ~ '^[A-Za-z0-9-]+$'),
 "reportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "reportedByUserId" UUID NOT NULL REFERENCES "identity_users"("id") ON DELETE RESTRICT,
 "requestId" TEXT NOT NULL,
 CONSTRAINT "artist_shipment_reports_preparation_fkey" FOREIGN KEY ("orderId","artistUserId") REFERENCES "artist_order_preparations"("orderId","artistUserId") ON DELETE RESTRICT,
 CHECK ("reportedByUserId" = "artistUserId")
);
CREATE UNIQUE INDEX "artist_shipment_reports_orderId_artistUserId_key" ON "artist_shipment_reports"("orderId","artistUserId");
