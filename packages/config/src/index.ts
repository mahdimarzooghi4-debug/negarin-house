import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "stage", "production"]).default("development"),
  WEB_URL: z.url().default("http://localhost:3000"),
  API_PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1)
});

export type AppConfig = z.infer<typeof schema>;

export function loadConfig(environment: NodeJS.ProcessEnv = process.env): AppConfig {
  return schema.parse(environment);
}
