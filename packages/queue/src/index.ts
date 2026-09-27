import { Queue, Worker, type Job, type Processor } from "bullmq";

export const FOUNDATION_QUEUE = "foundation";

export type FoundationJobData = Readonly<{
  requestedAt: string;
}>;

export function redisConnectionFromUrl(redisUrl: string) {
  const parsed = new URL(redisUrl);

  return {
    host: parsed.hostname,
    port: Number(parsed.port || "6379"),
    username: parsed.username || undefined,
    password: parsed.password || undefined,
    ...(parsed.protocol === "rediss:" ? { tls: {} } : {})
  };
}

export function createFoundationQueue(redisUrl: string): Queue<FoundationJobData> {
  return new Queue<FoundationJobData>(FOUNDATION_QUEUE, {
    connection: redisConnectionFromUrl(redisUrl)
  });
}

const defaultProcessor: Processor<FoundationJobData, unknown, string> = async (job: Job<FoundationJobData>) => ({
  jobId: job.id,
  name: job.name,
  processedAt: new Date().toISOString()
});

export function createFoundationWorker(
  redisUrl: string,
  processor: Processor<FoundationJobData, unknown, string> = defaultProcessor
): Worker<FoundationJobData, unknown, string> {
  return new Worker<FoundationJobData, unknown, string>(FOUNDATION_QUEUE, processor, {
    connection: redisConnectionFromUrl(redisUrl)
  });
}
