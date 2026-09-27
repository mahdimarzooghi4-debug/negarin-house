import { randomUUID } from "node:crypto";
import type { IncomingMessage } from "node:http";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, type NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { loadConfig } from "@negarin/config";
import { AppModule } from "./app.module.js";
import { ApiExceptionFilter } from "./api-exception.filter.js";

export async function createApplication(): Promise<NestFastifyApplication> {
  const config = loadConfig();

  const adapter = new FastifyAdapter({
    genReqId: (request: IncomingMessage) => {
      const incoming = request.headers["x-request-id"];
      return typeof incoming === "string" && incoming.length > 0 ? incoming : randomUUID();
    }
  });

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter, {
    logger: config.NODE_ENV === "test" ? false : undefined
  });

  app.setGlobalPrefix("api/v1");
  app.useGlobalFilters(new ApiExceptionFilter());
  app.enableShutdownHooks();

  const openApiConfig = new DocumentBuilder()
    .setTitle("Negarin House API")
    .setDescription("Phase 1 API")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, openApiConfig);

  if (config.NODE_ENV !== "production") {
    SwaggerModule.setup("docs", app, document);
  }

  return app;
}
