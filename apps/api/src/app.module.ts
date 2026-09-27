import { Module } from "@nestjs/common";
import { FoundationController } from "./foundation.controller.js";
import { HealthController } from "./health.controller.js";
import { PrismaService } from "./prisma.service.js";
import { AuthorizationGuard } from "./authorization.guard.js";
import { IdentityContextController } from "./identity-context.controller.js";

@Module({
  controllers: [HealthController, FoundationController, IdentityContextController],
  providers: [PrismaService, AuthorizationGuard],
  exports: [AuthorizationGuard]
})
export class AppModule {}
