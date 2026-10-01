ALTER TABLE "corporate_purchase_requests"
  ADD COLUMN "proposedUnitPriceToman" BIGINT,
  ADD COLUMN "proposalNote" TEXT,
  ADD COLUMN "proposedAt" TIMESTAMP(3);

ALTER TABLE "corporate_purchase_request_events"
  ADD COLUMN "proposalUnitPriceToman" BIGINT,
  ADD COLUMN "proposalNote" TEXT;

ALTER TABLE "corporate_orders"
  ADD COLUMN "purchaseRequestId" UUID;

CREATE UNIQUE INDEX "corporate_orders_purchaseRequestId_key"
  ON "corporate_orders"("purchaseRequestId");

ALTER TABLE "corporate_orders"
  ADD CONSTRAINT "corporate_orders_purchaseRequestId_fkey"
  FOREIGN KEY ("purchaseRequestId") REFERENCES "corporate_purchase_requests"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
