DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM "role_grants"
    WHERE "role" = 'export_partner'
      AND "exportPartnerId" IS NOT NULL
      AND "organizationId" IS NOT NULL
  ) THEN
    RAISE EXCEPTION 'Export Partner grants contain both legacy and organization scopes; resolve before migration';
  END IF;

  IF EXISTS (
    SELECT scoped."id"
    FROM (
      SELECT "exportPartnerId" AS "id", 'export_partner' AS "kind"
      FROM "role_grants"
      WHERE "role" = 'export_partner' AND "exportPartnerId" IS NOT NULL
      UNION ALL
      SELECT "organizationId", CASE "role"
        WHEN 'service_partner' THEN 'service_partner'
        WHEN 'supporting_organization' THEN 'supporting_organization'
        WHEN 'corporate_buyer' THEN 'corporate_buyer'
      END
      FROM "role_grants"
      WHERE "organizationId" IS NOT NULL
        AND "role" IN ('service_partner', 'supporting_organization', 'corporate_buyer')
      UNION ALL
      SELECT "partnerOrganizationId", 'service_partner'
      FROM "service_assignments"
    ) scoped
    GROUP BY scoped."id"
    HAVING COUNT(DISTINCT scoped."kind") > 1
  ) THEN
    RAISE EXCEPTION 'An Export Partner scope ID is already registered as another organization kind';
  END IF;
END $$;

INSERT INTO "organizations" ("id", "kind", "displayName", "createdAt", "updatedAt")
SELECT DISTINCT "exportPartnerId", 'export_partner', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "role_grants"
WHERE "role" = 'export_partner' AND "exportPartnerId" IS NOT NULL
ON CONFLICT ("id") DO NOTHING;

UPDATE "role_grants"
SET "organizationId" = "exportPartnerId", "exportPartnerId" = NULL
WHERE "role" = 'export_partner' AND "exportPartnerId" IS NOT NULL;
