import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "./prisma.service.js";

@Controller()
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get("health")
  health() {
    return {
      status: "ok",
      service: "negarin-api"
    };
  }

  @Get("ready")
  async ready() {
    await this.prisma.ping();

    return {
      status: "ready",
      database: "ok"
    };
  }
}
