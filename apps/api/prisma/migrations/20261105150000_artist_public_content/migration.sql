CREATE TABLE "artist_public_profiles" (
 "artistId" UUID PRIMARY KEY REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
 "version" INTEGER NOT NULL DEFAULT 0 CHECK ("version" >= 0),
 "displayName" TEXT NOT NULL DEFAULT '', "biography" TEXT NOT NULL DEFAULT '',
 "craft" TEXT NOT NULL DEFAULT '', "city" TEXT NOT NULL DEFAULT '', "published" BOOLEAN NOT NULL DEFAULT false
);
CREATE TABLE "artist_stories" (
 "id" UUID PRIMARY KEY, "artistId" UUID NOT NULL REFERENCES "artist_public_profiles"("artistId") ON DELETE RESTRICT ON UPDATE CASCADE,
 "version" INTEGER NOT NULL DEFAULT 0 CHECK ("version" >= 0), "title" TEXT NOT NULL, "body" TEXT NOT NULL,
 "published" BOOLEAN NOT NULL DEFAULT false, "publishedAt" TIMESTAMP(3), "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "artist_stories_artistId_published_publishedAt_id_idx" ON "artist_stories"("artistId","published","publishedAt","id");
ALTER TABLE "artist_stories" ADD CONSTRAINT "story_publication_date" CHECK (NOT "published" OR "publishedAt" IS NOT NULL);
