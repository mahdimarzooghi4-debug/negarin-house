import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "stage", "production"]).default("development"),
  WEB_URL: z.url().default("http://localhost:3000"),
  API_PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  S3_ENDPOINT: z.string().url().optional(),
  S3_REGION: z.string().min(1).default("us-east-1"),
  S3_BUCKET: z.string().min(1).default("negarin-local"),
  S3_ACCESS_KEY_ID: z.string().min(1).default("negarin"),
  S3_SECRET_ACCESS_KEY: z.string().min(1).default("negarin-local-secret")
});

export type AppConfig = z.infer<typeof schema>;

export function loadConfig(environment: NodeJS.ProcessEnv = process.env): AppConfig {
  return schema.parse(environment);
}
