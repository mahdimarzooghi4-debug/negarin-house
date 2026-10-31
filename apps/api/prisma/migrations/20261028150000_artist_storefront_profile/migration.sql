CREATE TABLE "artist_storefronts" (
    "id" UUID NOT NULL,
    "artistUserId" UUID NOT NULL,
    "storeName" TEXT NOT NULL DEFAULT '',
    "shortIntro" TEXT NOT NULL DEFAULT '',
    "about" TEXT NOT NULL DEFAULT '',
    "version" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "artist_storefronts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "artist_storefront_events" (
    "id" UUID NOT NULL,
    "storefrontId" UUID NOT NULL,
    "actorUserId" UUID NOT NULL,
    "version" INTEGER NOT NULL,
    "snapshot" JSONB NOT NULL,
    "requestId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "artist_storefront_events_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "artist_storefronts_artistUserId_key" ON "artist_storefronts"("artistUserId");
CREATE UNIQUE INDEX "artist_storefront_events_storefrontId_version_key" ON "artist_storefront_events"("storefrontId", "version");
ALTER TABLE "artist_storefronts" ADD CONSTRAINT "artist_storefronts_artistUserId_fkey" FOREIGN KEY ("artistUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "artist_storefront_events" ADD CONSTRAINT "artist_storefront_events_storefrontId_fkey" FOREIGN KEY ("storefrontId") REFERENCES "artist_storefronts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "artist_storefront_events" ADD CONSTRAINT "artist_storefront_events_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
