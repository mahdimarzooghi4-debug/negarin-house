import "dotenv/config";
import "reflect-metadata";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { loadConfig } from "@negarin/config";
import { createFoundationWorker } from "@negarin/queue";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";

describe("API integration", () => {
  let app: NestFastifyApplication;
  let worker: ReturnType<typeof createFoundationWorker>;
  let processedJob: Promise<string>;

  beforeAll(async () => {
    const config = loadConfig();
    let resolveProcessed: (jobId: string) => void = () => undefined;

    processedJob = new Promise<string>((resolve) => {
      resolveProcessed = resolve;
    });

    worker = createFoundationWorker(config.REDIS_URL, async (job) => {
      resolveProcessed(String(job.id));
      return { processed: true };
    });

    await worker.waitUntilReady();

    app = await createApplication();
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await Promise.all([
      app.close(),
      worker.close(true)
    ]);
  }, 10_000);

  it("serves health through the real HTTP adapter", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/health",
      headers: { "x-request-id": "integration-request" }
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      status: "ok",
      service: "negarin-api"
    });
  });

  it("enqueues a foundation job that the worker processes", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/foundation/jobs"
    });

    expect(response.statusCode).toBe(201);

    const body = response.json<{ jobId: string; queue: string }>();
    const completedJobId = await Promise.race([
      processedJob,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Foundation job timed out")), 5000)
      )
    ]);

    expect(body.queue).toBe("foundation");
    expect(completedJobId).toBe(body.jobId);
  });
});
