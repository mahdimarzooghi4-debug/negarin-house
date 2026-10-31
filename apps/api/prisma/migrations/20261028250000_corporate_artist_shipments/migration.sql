CREATE TABLE "corporate_order_shipment_reports" (
  "corporateOrderId" UUID NOT NULL,
  "artistUserId" UUID NOT NULL,
  "preparationVersion" INTEGER NOT NULL,
  "carrierName" TEXT NOT NULL,
  "trackingCode" TEXT NOT NULL,
  "reportedByUserId" UUID NOT NULL,
  "requestTraceId" TEXT NOT NULL,
  "reportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "corporate_order_shipment_reports_pkey" PRIMARY KEY ("corporateOrderId", "artistUserId"),
  CONSTRAINT "corporate_order_shipment_reports_preparation_version_key" UNIQUE ("corporateOrderId", "artistUserId", "preparationVersion"),
  CONSTRAINT "corporate_order_shipment_reports_valid" CHECK (
    "preparationVersion" > 0 AND char_length(btrim("carrierName")) BETWEEN 1 AND 100 AND
    char_length(btrim("trackingCode")) BETWEEN 1 AND 100 AND "trackingCode" ~ '^[A-Za-z0-9-]+$'
  ),
  CONSTRAINT "corporate_order_shipment_reports_preparation_fkey" FOREIGN KEY ("corporateOrderId", "artistUserId")
    REFERENCES "corporate_order_preparations"("corporateOrderId", "artistUserId") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "corporate_order_shipment_reports_reporter_fkey" FOREIGN KEY ("reportedByUserId")
    REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE FUNCTION corporate_order_shipment_reports_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Corporate order shipment reports are immutable'; END $$;
CREATE TRIGGER corporate_order_shipment_reports_immutable
BEFORE UPDATE OR DELETE ON "corporate_order_shipment_reports"
FOR EACH ROW EXECUTE FUNCTION corporate_order_shipment_reports_immutable();
