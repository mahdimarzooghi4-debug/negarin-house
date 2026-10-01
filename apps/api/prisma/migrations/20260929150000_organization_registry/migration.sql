CREATE TYPE "OrganizationKind" AS ENUM (
  'service_partner',
  'supporting_organization',
  'corporate_buyer'
);

CREATE TABLE "organizations" (
  "id" UUID NOT NULL,
  "kind" "OrganizationKind" NOT NULL,
  "displayName" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "organizations_kind_createdAt_idx"
  ON "organizations"("kind", "createdAt");

DO $$
BEGIN
  IF EXISTS (
    SELECT scoped."organizationId"
    FROM (
      SELECT
        "organizationId",
        CASE "role"
          WHEN 'service_partner' THEN 'service_partner'
          WHEN 'supporting_organization' THEN 'supporting_organization'
          WHEN 'corporate_buyer' THEN 'corporate_buyer'
        END AS "kind"
      FROM "role_grants"
      WHERE "organizationId" IS NOT NULL
        AND "role" IN ('service_partner', 'supporting_organization', 'corporate_buyer')
      UNION ALL
      SELECT "partnerOrganizationId", 'service_partner'
      FROM "service_assignments"
    ) AS scoped
    GROUP BY scoped."organizationId"
    HAVING COUNT(DISTINCT scoped."kind") > 1
  ) THEN
    RAISE EXCEPTION 'organization IDs are used by multiple organization kinds; resolve the collision before migrating';
  END IF;
END $$;

INSERT INTO "organizations" ("id", "kind", "createdAt", "updatedAt")
SELECT
  scoped."organizationId",
  MIN(scoped."kind")::"OrganizationKind",
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM (
  SELECT
    "organizationId",
    CASE "role"
      WHEN 'service_partner' THEN 'service_partner'
      WHEN 'supporting_organization' THEN 'supporting_organization'
      WHEN 'corporate_buyer' THEN 'corporate_buyer'
    END AS "kind"
  FROM "role_grants"
  WHERE "organizationId" IS NOT NULL
    AND "role" IN ('service_partner', 'supporting_organization', 'corporate_buyer')
  UNION
  SELECT "partnerOrganizationId", 'service_partner'
  FROM "service_assignments"
) AS scoped
GROUP BY scoped."organizationId";

ALTER TABLE "role_grants"
  ADD CONSTRAINT "role_grants_organizationId_fkey"
  FOREIGN KEY ("organizationId") REFERENCES "organizations"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE
  NOT VALID;

ALTER TABLE "service_assignments"
  ADD CONSTRAINT "service_assignments_partnerOrganizationId_fkey"
  FOREIGN KEY ("partnerOrganizationId") REFERENCES "organizations"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE INDEX "role_grants_organizationId_role_revokedAt_idx"
  ON "role_grants"("organizationId", "role", "revokedAt");
