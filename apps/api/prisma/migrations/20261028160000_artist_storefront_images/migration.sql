ALTER TABLE "artist_storefronts"
ADD COLUMN "coverImageId" UUID,
ADD COLUMN "avatarImageId" UUID;

CREATE TABLE "artist_storefront_images" (
    "id" UUID NOT NULL,
    "storefrontId" UUID NOT NULL,
    "objectKey" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "byteLength" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "artist_storefront_images_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "artist_storefront_images_objectKey_key" ON "artist_storefront_images"("objectKey");
CREATE INDEX "artist_storefront_images_storefrontId_createdAt_id_idx" ON "artist_storefront_images"("storefrontId", "createdAt", "id");
ALTER TABLE "artist_storefront_images" ADD CONSTRAINT "artist_storefront_images_storefrontId_fkey" FOREIGN KEY ("storefrontId") REFERENCES "artist_storefronts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
