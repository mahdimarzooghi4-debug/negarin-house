import "dotenv/config";
import { loadConfig } from "@negarin/config";
import { startNodeTelemetry } from "@negarin/observability";
import { createFoundationWorker, FOUNDATION_QUEUE } from "@negarin/queue";

const config = loadConfig();
const telemetry = await startNodeTelemetry("negarin-worker");
const worker = createFoundationWorker(config.REDIS_URL);

worker.on("completed", (job) => {
  console.info(JSON.stringify({ event: "job.completed", queue: FOUNDATION_QUEUE, jobId: job.id }));
});

worker.on("failed", (job, error) => {
  console.error(
    JSON.stringify({
      event: "job.failed",
      queue: FOUNDATION_QUEUE,
      jobId: job?.id,
      error: error.message
    })
  );
});

worker.on("error", (error) => {
  console.error(JSON.stringify({ event: "worker.error", error: error.message }));
});

async function shutdown(): Promise<void> {
  await worker.close();
  await telemetry.shutdown();
  process.exit(0);
}

process.on("SIGTERM", () => void shutdown());
process.on("SIGINT", () => void shutdown());
