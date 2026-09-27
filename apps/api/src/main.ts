import "dotenv/config";
import "reflect-metadata";
import { loadConfig } from "@negarin/config";
import { createApplication } from "./app.js";

async function bootstrap(): Promise<void> {
  const config = loadConfig();
  const app = await createApplication();
  await app.listen(config.API_PORT, "0.0.0.0");
}

void bootstrap();
