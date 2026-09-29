CREATE TYPE "ProductMediaStatus" AS ENUM ('pending', 'ready');

CREATE TABLE "artist_product_media" (
  "id" UUID NOT NULL,
  "productId" UUID NOT NULL,
  "objectKey" TEXT NOT NULL,
  "contentType" TEXT NOT NULL,
  "contentLength" INTEGER NOT NULL,
  "status" "ProductMediaStatus" NOT NULL DEFAULT 'pending',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "artist_product_media_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "artist_product_media_objectKey_key" ON "artist_product_media"("objectKey");
CREATE INDEX "artist_product_media_productId_status_createdAt_idx"
  ON "artist_product_media"("productId", "status", "createdAt");

ALTER TABLE "artist_product_media"
  ADD CONSTRAINT "artist_product_media_productId_fkey"
  FOREIGN KEY ("productId") REFERENCES "artist_products"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
