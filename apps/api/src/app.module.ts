import { AdminServiceTraceService } from "./admin-service-trace.js";
import { AdminServiceTraceController } from "./admin-service-trace.controller.js";
import { AdminOrderTraceService } from "./admin-order-trace.js";
import { AdminOrderTraceController } from "./admin-order-trace.controller.js";
import { ArtistGrowthRegistryController, AdminGrowthRegistryController } from "./growth-registry.controller.js";
import { CorporateProcurementService } from "./corporate-procurement.js";
import { CorporateBuyerController, AdminCorporateProcurementController } from "./corporate-procurement.controller.js";
import { SupportReportingService } from "./support-reporting.js";
import { SupportingOrganizationSupportReportingController, ArtistSupportReportingController, AdminSupportReportingController } from "./support-reporting.controller.js";
import { SupportCreditsService } from "./support-credits.js";
import { SupportingOrganizationSupportController, ArtistSupportController, AdminSupportController } from "./support-credits.controller.js";
import { ServiceCatalogService } from "./service-catalog.js";
import { AdminServiceCatalogController, ArtistServiceCatalogController } from "./service-catalog.controller.js";
import { ServiceDeliverablesService, ServiceDeliverableStorage } from "./service-deliverables.js";
import { PartnerDeliverablesController, ArtistDeliverablesController, AdminDeliverablesController } from "./service-deliverables.controller.js";
import { ServiceExecutionService } from "./service-execution.js";
import { PartnerServiceExecutionController, AdminServiceExecutionController } from "./service-execution.controller.js";
import { AdminServiceRequestsController, ArtistServiceRequestsController, PartnerAssignmentsController } from "./service-assignments.controller.js";
import { ServiceAssignmentsService } from "./service-assignments.js";
import { ArtistFinancialEventsController, AdminFinancialEventsController } from "./financial-events.controller.js";
import { FinancialEventsService } from "./financial-events.js";
import { ArtistFinanceController, AdminDomesticFinanceController } from "./artist-finance.controller.js";
import { ArtistFinanceService } from "./artist-finance.js";
import { RefundFinanceController } from "./refund-finance.controller.js";
import { RefundFinanceService } from "./refund-finance.js";
import { ShipmentIssueSupportController } from "./shipment-issue-support.controller.js";
import { ShipmentIssueSupportService } from "./shipment-issue-support.js";
import { CustomerShipmentsController } from "./customer-shipments.controller.js";
import { CustomerShipmentsService } from "./customer-shipments.js";
import { ArtistOrdersController } from "./artist-orders.controller.js";
import { ArtistOrdersService } from "./artist-orders.js";
import { CustomerPaymentsController } from "./customer-payments.controller.js";
import { CustomerPaymentsService, PaymentGateway } from "./customer-payments.js";
import { OrderReservationExpiry } from "./order-reservation-expiry.js";
import { CustomerOrdersController } from "./customer-orders.controller.js";
import { CustomerOrdersService } from "./customer-orders.js";
import { CustomerAddressesController } from "./customer-addresses.controller.js";
import { CustomerAddressesService } from "./customer-addresses.js";
import { CustomerCartController } from "./customer-cart.controller.js";
import { CustomerCartService } from "./customer-cart.js";
import { PublicProductCatalogController } from "./public-product-catalog.controller.js";
import { PublicProductCatalogService } from "./public-product-catalog.js";
import { ArtistProductImagesController, AdminProductImagesController } from "./product-images.controller.js";
import { ProductImagesService, ProductImageStorage } from "./product-images.js";
import { Module } from "@nestjs/common";
import { ProductInventoryService } from "./product-inventory.js";
import { ProductInventoryController } from "./product-inventory.controller.js";
import { FoundationController } from "./foundation.controller.js";
import { HealthController } from "./health.controller.js";
import { PrismaService } from "./prisma.service.js";
import { AuthorizationGuard } from "./authorization.guard.js";
import { IdentityContextController } from "./identity-context.controller.js";
import { ArtistProductsController } from "./artist-products.controller.js";
import { ArtistProductsService } from "./artist-products.js";

import { ArtistPublicationController, AdminProductReviewsController } from "./product-publication.controller.js";
import { ProductPublicationService } from "./product-publication.js";

@Module({
  controllers: [AdminServiceTraceController, AdminOrderTraceController, ArtistGrowthRegistryController, AdminGrowthRegistryController, CorporateBuyerController, AdminCorporateProcurementController, SupportingOrganizationSupportReportingController, ArtistSupportReportingController, AdminSupportReportingController, SupportingOrganizationSupportController, ArtistSupportController, AdminSupportController, AdminServiceCatalogController, ArtistServiceCatalogController, PartnerDeliverablesController, ArtistDeliverablesController, AdminDeliverablesController, PartnerServiceExecutionController, AdminServiceExecutionController, AdminServiceRequestsController, ArtistServiceRequestsController, PartnerAssignmentsController, ArtistFinancialEventsController, AdminFinancialEventsController, ArtistFinanceController, AdminDomesticFinanceController, RefundFinanceController, ShipmentIssueSupportController, CustomerShipmentsController, ArtistOrdersController, CustomerPaymentsController, CustomerOrdersController, CustomerAddressesController, CustomerCartController, PublicProductCatalogController, ArtistProductImagesController, AdminProductImagesController, ProductInventoryController, ArtistPublicationController, AdminProductReviewsController, HealthController, FoundationController, IdentityContextController, ArtistProductsController],
  providers: [AdminServiceTraceService, AdminOrderTraceService, CorporateProcurementService, SupportReportingService, SupportCreditsService, ServiceCatalogService, ServiceDeliverablesService, ServiceDeliverableStorage, ServiceExecutionService, ServiceAssignmentsService, FinancialEventsService, ArtistFinanceService, RefundFinanceService, ShipmentIssueSupportService, CustomerShipmentsService, ArtistOrdersService, CustomerPaymentsService, PaymentGateway, OrderReservationExpiry, CustomerOrdersService, CustomerAddressesService, CustomerCartService, PublicProductCatalogService, ProductImagesService, ProductImageStorage, ProductInventoryService, ProductPublicationService, PrismaService, AuthorizationGuard, ArtistProductsService],
  exports: [AuthorizationGuard]
})
export class AppModule {}
