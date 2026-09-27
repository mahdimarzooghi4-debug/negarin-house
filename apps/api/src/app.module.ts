import { Module } from "@nestjs/common";
import { FoundationController } from "./foundation.controller.js";
import { HealthController } from "./health.controller.js";
import { PrismaService } from "./prisma.service.js";

@Module({
  controllers: [HealthController, FoundationController],
  providers: [PrismaService]
})
export class AppModule {}
