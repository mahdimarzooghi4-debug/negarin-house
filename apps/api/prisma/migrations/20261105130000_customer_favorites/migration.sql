CREATE TABLE "customer_favorites" (
 "userId" UUID PRIMARY KEY REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
 "version" INTEGER NOT NULL DEFAULT 0 CHECK ("version" >= 0)
);
CREATE TABLE "customer_favorite_items" (
 "userId" UUID NOT NULL REFERENCES "customer_favorites"("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
 "productId" UUID NOT NULL REFERENCES "artist_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY ("userId", "productId")
);
CREATE INDEX "customer_favorite_items_userId_createdAt_productId_idx" ON "customer_favorite_items"("userId", "createdAt", "productId");
