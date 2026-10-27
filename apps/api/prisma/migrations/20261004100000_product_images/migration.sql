ALTER TABLE "artist_products" ADD COLUMN "imageIds" UUID[] NOT NULL DEFAULT ARRAY[]::UUID[];
ALTER TABLE "artist_products" ADD CONSTRAINT "product_gallery_size" CHECK (cardinality("imageIds") <= 8);
CREATE TABLE "product_images" (
  "id" UUID NOT NULL PRIMARY KEY,
  "productId" UUID NOT NULL REFERENCES "artist_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "objectKey" TEXT NOT NULL,
  "width" INTEGER NOT NULL CHECK ("width" > 0),
  "height" INTEGER NOT NULL CHECK ("height" > 0),
  "byteLength" INTEGER NOT NULL CHECK ("byteLength" > 0),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX "product_images_objectKey_key" ON "product_images"("objectKey");
CREATE INDEX "product_images_productId_idx" ON "product_images"("productId");
