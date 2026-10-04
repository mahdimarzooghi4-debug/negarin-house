CREATE INDEX "artist_products_publicationStatus_archivedAt_createdAt_id_idx"
  ON "artist_products"("publicationStatus", "archivedAt", "createdAt", "id");
CREATE INDEX "artist_products_publicationStatus_archivedAt_priceToman_id_idx"
  ON "artist_products"("publicationStatus", "archivedAt", "priceToman", "id");
