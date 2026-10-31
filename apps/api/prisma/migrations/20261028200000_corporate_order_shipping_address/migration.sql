ALTER TABLE "corporate_orders" ADD COLUMN "shippingAddress" JSONB;

ALTER TABLE "corporate_order_events" DROP CONSTRAINT "corporate_order_events_valid";
ALTER TABLE "corporate_order_events" ADD CONSTRAINT "corporate_order_events_valid"
  CHECK ("version" >= 0 AND "action" IN ('created_from_accepted_proposal', 'shipping_address_set'));
