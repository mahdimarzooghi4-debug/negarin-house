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
  controllers: [CustomerOrdersController, CustomerAddressesController, CustomerCartController, PublicProductCatalogController, ArtistProductImagesController, AdminProductImagesController, ProductInventoryController, ArtistPublicationController, AdminProductReviewsController, HealthController, FoundationController, IdentityContextController, ArtistProductsController],
  providers: [OrderReservationExpiry, CustomerOrdersService, CustomerAddressesService, CustomerCartService, PublicProductCatalogService, ProductImagesService, ProductImageStorage, ProductInventoryService, ProductPublicationService, PrismaService, AuthorizationGuard, ArtistProductsService],
  exports: [AuthorizationGuard]
})
export class AppModule {}
