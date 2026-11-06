ALTER TABLE "artist_stories" ADD COLUMN "relatedProductId" UUID;
ALTER TABLE "artist_stories" ADD CONSTRAINT "artist_stories_relatedProductId_fkey" FOREIGN KEY ("relatedProductId") REFERENCES "artist_products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
CREATE INDEX "artist_stories_relatedProductId_idx" ON "artist_stories"("relatedProductId");
