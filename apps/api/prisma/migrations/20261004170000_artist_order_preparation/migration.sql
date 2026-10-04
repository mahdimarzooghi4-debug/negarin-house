CREATE TYPE "OrderPreparationStatus" AS ENUM ('awaiting_acceptance','accepted','preparing','packaging','ready_for_dispatch');
CREATE TABLE "artist_order_preparations" (
 "orderId" UUID NOT NULL REFERENCES "customer_orders"("id") ON DELETE RESTRICT,
 "artistUserId" UUID NOT NULL REFERENCES "identity_users"("id") ON DELETE RESTRICT,
 "status" "OrderPreparationStatus" NOT NULL DEFAULT 'awaiting_acceptance',
 "version" INTEGER NOT NULL DEFAULT 0 CHECK ("version" >= 0),
 "updatedAt" TIMESTAMP(3) NOT NULL,
 PRIMARY KEY ("orderId","artistUserId")
);
CREATE INDEX "artist_order_preparations_artistUserId_orderId_idx" ON "artist_order_preparations"("artistUserId","orderId");
ALTER TABLE "customer_order_items" ADD COLUMN "artistUserId" UUID;
UPDATE "customer_order_items" i SET "artistUserId" = p."artistUserId" FROM "artist_products" p WHERE p."id" = i."productId";
INSERT INTO "artist_order_preparations" ("orderId","artistUserId","updatedAt") SELECT DISTINCT "orderId","artistUserId", CURRENT_TIMESTAMP FROM "customer_order_items";
ALTER TABLE "customer_order_items" ALTER COLUMN "artistUserId" SET NOT NULL;
ALTER TABLE "customer_order_items" ADD CONSTRAINT "customer_order_items_orderId_artistUserId_fkey" FOREIGN KEY ("orderId","artistUserId") REFERENCES "artist_order_preparations"("orderId","artistUserId") ON DELETE RESTRICT;
CREATE TABLE "order_preparation_events" (
 "id" UUID NOT NULL PRIMARY KEY,
 "orderId" UUID NOT NULL,
 "artistUserId" UUID NOT NULL,
 "version" INTEGER NOT NULL CHECK ("version" > 0),
 "fromStatus" "OrderPreparationStatus" NOT NULL,
 "toStatus" "OrderPreparationStatus" NOT NULL,
 "actorUserId" UUID NOT NULL REFERENCES "identity_users"("id") ON DELETE RESTRICT,
 "requestId" TEXT NOT NULL,
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY ("orderId","artistUserId") REFERENCES "artist_order_preparations"("orderId","artistUserId") ON DELETE RESTRICT,
 CHECK ("fromStatus" <> "toStatus")
);
CREATE UNIQUE INDEX "order_preparation_events_orderId_artistUserId_version_key" ON "order_preparation_events"("orderId","artistUserId","version");
