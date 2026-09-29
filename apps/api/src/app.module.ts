import { Module } from "@nestjs/common";
import { FoundationController } from "./foundation.controller.js";
import { HealthController } from "./health.controller.js";
import { PrismaService } from "./prisma.service.js";
import { AuthorizationGuard } from "./authorization.guard.js";
import { IdentityContextController } from "./identity-context.controller.js";
import { ArtistProductsController } from "./artist-products.controller.js";
import { ArtistProductsService } from "./artist-products.js";
import { PublicationReviewController } from "./publication-review.controller.js";
import { PublicationReviewService } from "./publication-review.js";

@Module({
  controllers: [HealthController, FoundationController, IdentityContextController, ArtistProductsController, PublicationReviewController],
  providers: [PrismaService, AuthorizationGuard, ArtistProductsService, PublicationReviewService],
  exports: [AuthorizationGuard]
})
export class AppModule {}
