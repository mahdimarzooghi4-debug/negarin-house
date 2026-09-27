import "dotenv/config";
import "reflect-metadata";
import { loadConfig } from "@negarin/config";
import { startNodeTelemetry } from "@negarin/observability";
import { createApplication } from "./app.js";

async function bootstrap(): Promise<void> {
  const config = loadConfig();
  const telemetry = await startNodeTelemetry("negarin-api");
  const app = await createApplication();

  const shutdownTelemetry = async () => {
    await telemetry.shutdown();
  };

  process.once("SIGTERM", () => void shutdownTelemetry());
  process.once("SIGINT", () => void shutdownTelemetry());

  await app.listen(config.API_PORT, "0.0.0.0");
}

void bootstrap();
