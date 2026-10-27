-- Existing products retain unknown specifications as NULL; no invented defaults.
ALTER TABLE "artist_products"
  ADD COLUMN "category" TEXT,
  ADD COLUMN "dimensions" TEXT,
  ADD COLUMN "materials" TEXT,
  ADD COLUMN "weight" TEXT,
  ADD COLUMN "color" TEXT,
  ADD COLUMN "technique" TEXT,
  ADD COLUMN "careInstructions" TEXT;
