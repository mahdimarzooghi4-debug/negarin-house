ALTER TABLE "corporate_orders"
  ADD COLUMN "paymentReportedAmountToman" BIGINT,
  ADD COLUMN "paymentReference" TEXT,
  ADD COLUMN "paymentReportedAt" TIMESTAMP(3),
  ADD COLUMN "paymentVerifiedAt" TIMESTAMP(3);

ALTER TABLE "corporate_orders" ADD CONSTRAINT "corporate_orders_payment_report_valid" CHECK (
  ("paymentReportedAmountToman" IS NULL AND "paymentReference" IS NULL AND "paymentReportedAt" IS NULL)
  OR ("paymentReportedAmountToman" > 0 AND char_length(btrim("paymentReference")) BETWEEN 1 AND 120 AND "paymentReportedAt" IS NOT NULL)
);
ALTER TABLE "corporate_orders" ADD CONSTRAINT "corporate_orders_review_payment_valid" CHECK (
  "status" NOT IN ('payment_under_review', 'paid', 'fulfilling', 'completed')
  OR ("shippingAddress" IS NOT NULL AND "paymentAmountToman" IS NOT NULL AND "paymentReportedAmountToman" IS NOT NULL AND "paymentReference" IS NOT NULL AND "paymentReportedAt" IS NOT NULL)
);
ALTER TABLE "corporate_orders" ADD CONSTRAINT "corporate_orders_paid_verified_valid" CHECK (
  "status" NOT IN ('paid', 'fulfilling', 'completed') OR "paymentVerifiedAt" IS NOT NULL
);
ALTER TABLE "corporate_orders" ADD CONSTRAINT "corporate_orders_paid_amount_matches_valid" CHECK (
  "status" NOT IN ('paid', 'fulfilling', 'completed') OR "paymentReportedAmountToman" = "paymentAmountToman"
);

ALTER TABLE "corporate_order_events" DROP CONSTRAINT "corporate_order_events_valid";
ALTER TABLE "corporate_order_events" ADD CONSTRAINT "corporate_order_events_valid"
  CHECK ("version" >= 0 AND "action" IN ('created_from_accepted_proposal', 'shipping_address_set', 'payment_setup_completed', 'payment_reported', 'payment_verified', 'payment_review_returned'));
