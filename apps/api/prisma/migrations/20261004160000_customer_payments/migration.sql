ALTER TYPE "CustomerOrderStatus" ADD VALUE 'placed';
CREATE TYPE "OrderPaymentStatus" AS ENUM ('unpaid', 'paid', 'reconciliation_required');
CREATE TYPE "PaymentAttemptStatus" AS ENUM ('initializing', 'pending', 'failed', 'succeeded', 'reconciliation_required');
ALTER TABLE "customer_orders" ADD COLUMN "paymentStatus" "OrderPaymentStatus" NOT NULL DEFAULT 'unpaid', ADD COLUMN "paidAt" TIMESTAMP(3);
ALTER TABLE "customer_orders" DROP CONSTRAINT "customer_orders_check";
-- Compare status as text: the newly-added enum value is usable after this migration commits.
ALTER TABLE "customer_orders" ADD CONSTRAINT "customer_orders_release_state" CHECK (("status"::text IN ('reserved', 'placed') AND "releasedAt" IS NULL) OR ("status"::text IN ('cancelled', 'expired') AND "releasedAt" IS NOT NULL));
ALTER TABLE "customer_orders" ADD CONSTRAINT "customer_orders_paid_state" CHECK (("paymentStatus" <> 'paid' AND "paidAt" IS NULL) OR ("paymentStatus" = 'paid' AND "paidAt" IS NOT NULL AND "status"::text = 'placed'));
CREATE TABLE "order_payable_quotes" (
 "orderId" UUID PRIMARY KEY REFERENCES "customer_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
 "createdByUserId" UUID NOT NULL REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
 "shippingFeeToman" TEXT NOT NULL CHECK ("shippingFeeToman" ~ '^(0|[1-9][0-9]{0,22})$'),
 "payableToman" TEXT NOT NULL CHECK ("payableToman" ~ '^[1-9][0-9]{0,23}$'),
 "sourceReference" TEXT NOT NULL,
 "expiresAt" TIMESTAMP(3) NOT NULL,
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "payment_attempts" (
 "id" UUID PRIMARY KEY,
 "orderId" UUID NOT NULL REFERENCES "customer_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
 "idempotencyKey" UUID NOT NULL,
 "requestHash" TEXT NOT NULL,
 "provider" TEXT NOT NULL,
 "providerReference" TEXT,
 "redirectUrl" TEXT,
 "amountToman" TEXT NOT NULL CHECK ("amountToman" ~ '^[1-9][0-9]{0,23}$'),
 "status" "PaymentAttemptStatus" NOT NULL DEFAULT 'initializing',
 "version" INTEGER NOT NULL DEFAULT 0 CHECK ("version" >= 0),
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updatedAt" TIMESTAMP(3) NOT NULL
);
ALTER TABLE "payment_attempts" ADD CONSTRAINT "payment_attempts_quote_fkey" FOREIGN KEY ("orderId") REFERENCES "order_payable_quotes"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE UNIQUE INDEX "payment_attempts_orderId_idempotencyKey_key" ON "payment_attempts"("orderId", "idempotencyKey");
CREATE UNIQUE INDEX "payment_attempts_provider_providerReference_key" ON "payment_attempts"("provider", "providerReference");
CREATE INDEX "payment_attempts_orderId_createdAt_id_idx" ON "payment_attempts"("orderId", "createdAt", "id");
CREATE UNIQUE INDEX "payment_attempts_one_active" ON "payment_attempts"("orderId") WHERE "status" IN ('initializing', 'pending', 'reconciliation_required');
CREATE TABLE "payment_receipts" (
 "id" UUID PRIMARY KEY,
 "attemptId" UUID NOT NULL UNIQUE REFERENCES "payment_attempts"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
 "provider" TEXT NOT NULL,
 "transactionReference" TEXT NOT NULL,
 "amount" TEXT NOT NULL CHECK ("amount" ~ '^[1-9][0-9]{0,26}$'),
 "unit" TEXT NOT NULL,
 "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX "payment_receipts_provider_transactionReference_key" ON "payment_receipts"("provider", "transactionReference");
CREATE TABLE "payment_events" (
 "id" UUID PRIMARY KEY,
 "attemptId" UUID NOT NULL REFERENCES "payment_attempts"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
 "version" INTEGER NOT NULL CHECK ("version" >= 0),
 "status" "PaymentAttemptStatus" NOT NULL,
 "reason" TEXT NOT NULL,
 "actorUserId" UUID REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
 "requestId" TEXT NOT NULL,
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX "payment_events_attemptId_version_key" ON "payment_events"("attemptId", "version");
