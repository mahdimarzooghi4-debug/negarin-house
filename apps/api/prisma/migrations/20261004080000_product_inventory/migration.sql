ALTER TABLE "artist_products"
ADD COLUMN "stockQuantity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "inventoryVersion" INTEGER NOT NULL DEFAULT 0,
ADD CONSTRAINT "artist_products_stock_nonnegative" CHECK ("stockQuantity" >= 0),
ADD CONSTRAINT "artist_products_inventory_version_nonnegative" CHECK ("inventoryVersion" >= 0);

CREATE TABLE "product_inventory_events" (
  "id" UUID NOT NULL,
  "productId" UUID NOT NULL,
  "actorUserId" UUID NOT NULL,
  "previousQuantity" INTEGER NOT NULL,
  "stockQuantity" INTEGER NOT NULL,
  "inventoryVersion" INTEGER NOT NULL,
  "reason" TEXT,
  "requestId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "product_inventory_events_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "product_inventory_events_quantities_nonnegative" CHECK ("previousQuantity" >= 0 AND "stockQuantity" >= 0),
  CONSTRAINT "product_inventory_events_version_positive" CHECK ("inventoryVersion" > 0),
  CONSTRAINT "product_inventory_events_productId_fkey" FOREIGN KEY ("productId") REFERENCES "artist_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "product_inventory_events_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "product_inventory_events_productId_inventoryVersion_key" ON "product_inventory_events"("productId", "inventoryVersion");

