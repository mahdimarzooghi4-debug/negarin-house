import { Module } from "@nestjs/common";
import { FoundationController } from "./foundation.controller.js";
import { HealthController } from "./health.controller.js";
import { PrismaService } from "./prisma.service.js";
import { AuthorizationGuard } from "./authorization.guard.js";

@Module({
  controllers: [HealthController, FoundationController],
  providers: [PrismaService, AuthorizationGuard],
  exports: [AuthorizationGuard]
})
export class AppModule {}
