-- Existing requests predate staff author attribution and retain a null author.
ALTER TABLE "service_requests"
  ADD COLUMN "createdByUserId" UUID;

ALTER TABLE "service_requests"
  ADD CONSTRAINT "service_requests_createdByUserId_fkey"
  FOREIGN KEY ("createdByUserId") REFERENCES "identity_users"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

CREATE INDEX "service_requests_createdByUserId_createdAt_idx"
  ON "service_requests"("createdByUserId", "createdAt");
