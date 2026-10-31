CREATE TYPE "ProductChangeStatus" AS ENUM ('draft', 'under_review', 'changes_requested');

ALTER TABLE "artist_products"
  ADD COLUMN "changeStatus" "ProductChangeStatus",
  ADD COLUMN "changeContent" JSONB,
  ADD COLUMN "changeReason" TEXT,
  ADD CONSTRAINT "artist_products_change_proposal_state_check"
    CHECK (("changeStatus" IS NULL) = ("changeContent" IS NULL));

CREATE INDEX "artist_products_changeStatus_updatedAt_id_idx"
  ON "artist_products"("changeStatus", "updatedAt", "id");
