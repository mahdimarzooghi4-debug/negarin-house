CREATE TYPE "CustomerOrderStatus" AS ENUM ('reserved', 'cancelled', 'expired');
CREATE TABLE "customer_orders" (
  "id" UUID NOT NULL PRIMARY KEY,
  "userId" UUID NOT NULL REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "idempotencyKey" UUID NOT NULL,
  "requestHash" TEXT NOT NULL,
  "status" "CustomerOrderStatus" NOT NULL DEFAULT 'reserved',
  "version" INTEGER NOT NULL DEFAULT 0 CHECK ("version" >= 0),
  "shippingAddress" JSONB NOT NULL,
  "subtotalToman" TEXT NOT NULL CHECK ("subtotalToman" ~ '^[1-9][0-9]{0,22}$'),
  "reservedUntil" TIMESTAMP(3) NOT NULL,
  "releasedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (("status" = 'reserved' AND "releasedAt" IS NULL) OR ("status" <> 'reserved' AND "releasedAt" IS NOT NULL))
);
CREATE UNIQUE INDEX "customer_orders_userId_idempotencyKey_key" ON "customer_orders"("userId", "idempotencyKey");
CREATE INDEX "customer_orders_userId_createdAt_id_idx" ON "customer_orders"("userId", "createdAt", "id");
CREATE INDEX "customer_orders_status_reservedUntil_id_idx" ON "customer_orders"("status", "reservedUntil", "id");
CREATE TABLE "customer_order_items" (
  "orderId" UUID NOT NULL REFERENCES "customer_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "productId" UUID NOT NULL REFERENCES "artist_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "title" TEXT NOT NULL,
  "unitPriceToman" BIGINT NOT NULL CHECK ("unitPriceToman" > 0),
  "quantity" INTEGER NOT NULL CHECK ("quantity" BETWEEN 1 AND 100),
  "imageIds" UUID[] NOT NULL DEFAULT ARRAY[]::UUID[],
  PRIMARY KEY ("orderId", "productId")
);
CREATE INDEX "customer_order_items_productId_idx" ON "customer_order_items"("productId");
ALTER TABLE "product_inventory_events" ALTER COLUMN "actorUserId" DROP NOT NULL;
ALTER TABLE "product_inventory_events" ADD COLUMN "orderId" UUID REFERENCES "customer_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
