import "dotenv/config";
import { Worker } from "bullmq";
import { loadConfig } from "@negarin/config";
import { redisConnectionFromUrl } from "./redis-connection.js";

const config = loadConfig();
const connection = redisConnectionFromUrl(config.REDIS_URL);

const worker = new Worker(
  "foundation",
  async (job) => ({
    jobId: job.id,
    name: job.name,
    processedAt: new Date().toISOString()
  }),
  { connection }
);

worker.on("completed", (job) => {
  console.info(JSON.stringify({ event: "job.completed", queue: "foundation", jobId: job.id }));
});

worker.on("failed", (job, error) => {
  console.error(
    JSON.stringify({
      event: "job.failed",
      queue: "foundation",
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
  process.exit(0);
}

process.on("SIGTERM", () => void shutdown());
process.on("SIGINT", () => void shutdown());
