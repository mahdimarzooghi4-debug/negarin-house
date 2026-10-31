ALTER TABLE "artist_products"
  ADD COLUMN "preparationTime" TEXT,
  ADD COLUMN "inventoryConfigured" BOOLEAN NOT NULL DEFAULT false;

-- Existing positive balances and products with an inventory history already have a meaningful value.
UPDATE "artist_products"
SET "inventoryConfigured" = true
WHERE "stockQuantity" > 0 OR "inventoryVersion" > 0;
