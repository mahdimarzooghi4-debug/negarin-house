ALTER TABLE "artist_stories" ADD COLUMN "videoId" UUID;
CREATE TABLE "artist_story_videos" (
 "id" UUID PRIMARY KEY, "storyId" UUID NOT NULL, "objectKey" TEXT NOT NULL UNIQUE,
 "width" INTEGER NOT NULL, "height" INTEGER NOT NULL, "durationMs" INTEGER NOT NULL, "byteLength" INTEGER NOT NULL,
 CONSTRAINT "artist_story_videos_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "artist_stories"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX "artist_story_videos_storyId_idx" ON "artist_story_videos"("storyId");
