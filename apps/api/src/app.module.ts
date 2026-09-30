import { Module } from "@nestjs/common";
import { loadConfig } from "@negarin/config";
import { S3ObjectStorage } from "@negarin/storage";
import { FoundationController } from "./foundation.controller.js";
import { HealthController } from "./health.controller.js";
import { PrismaService } from "./prisma.service.js";
import { AuthorizationGuard } from "./authorization.guard.js";
import { IdentityContextController } from "./identity-context.controller.js";
import { ArtistProductsController } from "./artist-products.controller.js";
import { ArtistProductsService } from "./artist-products.js";
import { PublicationReviewController } from "./publication-review.controller.js";
import { PublicationReviewService } from "./publication-review.js";
import { ArtistProductMediaController } from "./artist-product-media.controller.js";
import { ArtistProductMediaService, OBJECT_STORAGE } from "./artist-product-media.js";
import { ServicePartnerAssignmentsController } from "./service-partner-assignments.controller.js";
import { ServicePartnerAssignmentsService } from "./service-partner-assignments.js";
import { StaffServiceAssignmentsController } from "./staff-service-assignments.controller.js";
import { StaffServiceAssignmentsService } from "./staff-service-assignments.js";
import { StaffServiceRequestsController } from "./staff-service-requests.controller.js";
import { StaffServiceRequestsService } from "./staff-service-requests.js";
import { ServiceDeliverablesController } from "./service-deliverables.controller.js";
import { ServiceDeliverablesService } from "./service-deliverables.js";
import { StaffServiceDeliverablesController } from "./staff-service-deliverables.controller.js";
import { StaffServiceDeliverablesService } from "./staff-service-deliverables.js";
import { CustomerCatalogController } from "./customer-catalog.controller.js";
import { CustomerCatalogService } from "./customer-catalog.js";
import { ArtistServiceRequestsController } from "./artist-service-requests.controller.js";
import { ArtistServiceRequestsService } from "./artist-service-requests.js";
import { SupportProgramsController } from "./support-programs.controller.js";
import { SupportProgramsService } from "./support-programs.js";

@Module({
  controllers: [
    HealthController,
    FoundationController,
    IdentityContextController,
    ArtistProductsController,
    PublicationReviewController,
    ArtistProductMediaController,
    ServicePartnerAssignmentsController,
    ServiceDeliverablesController,
    StaffServiceAssignmentsController,
    StaffServiceRequestsController,
    StaffServiceDeliverablesController,
    CustomerCatalogController,
    ArtistServiceRequestsController,
    SupportProgramsController
  ],
  providers: [
    PrismaService,
    AuthorizationGuard,
    ArtistProductsService,
    PublicationReviewService,
    ArtistProductMediaService,
    ServicePartnerAssignmentsService,
    ServiceDeliverablesService,
    StaffServiceAssignmentsService,
    StaffServiceRequestsService,
    StaffServiceDeliverablesService,
    CustomerCatalogService,
    ArtistServiceRequestsService,
    SupportProgramsService,
    {
      provide: OBJECT_STORAGE,
      useFactory: () => {
        const config = loadConfig();
        return new S3ObjectStorage({
          endpoint: config.S3_ENDPOINT,
          region: config.S3_REGION,
          bucket: config.S3_BUCKET,
          accessKeyId: config.S3_ACCESS_KEY_ID,
          secretAccessKey: config.S3_SECRET_ACCESS_KEY
        });
      }
    }
  ],
  exports: [AuthorizationGuard]
})
export class AppModule {}
