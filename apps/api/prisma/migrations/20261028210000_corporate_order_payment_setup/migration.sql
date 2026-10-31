ALTER TABLE "corporate_orders"
  ADD COLUMN "paymentAmountToman" BIGINT,
  ADD COLUMN "paymentDueAt" TIMESTAMP(3),
  ADD COLUMN "paymentInstructions" TEXT;

ALTER TABLE "corporate_orders" ADD CONSTRAINT "corporate_orders_payment_setup_valid" CHECK (
  ("paymentAmountToman" IS NULL AND "paymentDueAt" IS NULL AND "paymentInstructions" IS NULL)
  OR ("paymentAmountToman" > 0 AND "paymentDueAt" IS NOT NULL AND char_length(btrim("paymentInstructions")) BETWEEN 1 AND 2000)
);
ALTER TABLE "corporate_orders" ADD CONSTRAINT "corporate_orders_awaiting_payment_valid" CHECK (
  "status" NOT IN ('awaiting_payment', 'paid', 'fulfilling', 'completed')
  OR ("shippingAddress" IS NOT NULL AND "paymentAmountToman" IS NOT NULL AND "paymentDueAt" IS NOT NULL AND "paymentInstructions" IS NOT NULL)
);

ALTER TABLE "corporate_order_events" DROP CONSTRAINT "corporate_order_events_valid";
ALTER TABLE "corporate_order_events" ADD CONSTRAINT "corporate_order_events_valid"
  CHECK ("version" >= 0 AND "action" IN ('created_from_accepted_proposal', 'shipping_address_set', 'payment_setup_completed'));
