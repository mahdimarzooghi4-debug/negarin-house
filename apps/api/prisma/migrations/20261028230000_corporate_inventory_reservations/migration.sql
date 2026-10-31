ALTER TABLE "product_inventory_events"
  ADD COLUMN "corporateOrderId" UUID,
  ADD CONSTRAINT "product_inventory_events_corporateOrderId_fkey"
    FOREIGN KEY ("corporateOrderId") REFERENCES "corporate_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "product_inventory_events_single_order_reference"
    CHECK ("orderId" IS NULL OR "corporateOrderId" IS NULL);

CREATE INDEX "product_inventory_events_corporateOrderId_idx" ON "product_inventory_events"("corporateOrderId");
