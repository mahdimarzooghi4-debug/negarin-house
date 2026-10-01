ALTER TABLE "service_requests"
  ADD COLUMN "requestedByArtistUserId" UUID;

ALTER TABLE "service_requests"
  ADD CONSTRAINT "service_requests_requestedByArtistUserId_fkey"
  FOREIGN KEY ("requestedByArtistUserId") REFERENCES "identity_users"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE INDEX "service_requests_requestedByArtistUserId_createdAt_idx"
  ON "service_requests"("requestedByArtistUserId", "createdAt");
