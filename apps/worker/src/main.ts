import "dotenv/config";
import { randomUUID } from "node:crypto";
import { loadConfig } from "@negarin/config";
import { startNodeTelemetry } from "@negarin/observability";
import {
  createDomainEventsQueue,
  createFoundationWorker,
  DOMAIN_EVENTS_QUEUE,
  FOUNDATION_QUEUE
} from "@negarin/queue";
import { createOutboxPool, dispatchOutboxOnce } from "./outbox-dispatcher.js";

const config = loadConfig();
const telemetry = await startNodeTelemetry("negarin-worker");
const foundationWorker = createFoundationWorker(config.REDIS_URL);
const domainEventsQueue = createDomainEventsQueue(config.REDIS_URL);
const outboxPool = createOutboxPool(config.DATABASE_URL);
const dispatcherId = `worker:${randomUUID()}`;
let stopping = false;

foundationWorker.on("completed", (job) => {
  console.info(JSON.stringify({ event: "job.completed", queue: FOUNDATION_QUEUE, jobId: job.id }));
});

foundationWorker.on("failed", (job, error) => {
  console.error(
    JSON.stringify({
      event: "job.failed",
      queue: FOUNDATION_QUEUE,
      jobId: job?.id,
      error: error.message
    })
  );
});

foundationWorker.on("error", (error) => {
  console.error(JSON.stringify({ event: "worker.error", queue: FOUNDATION_QUEUE, error: error.message }));
});

const sleep = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));

async function pumpOutbox(): Promise<void> {
  while (!stopping) {
    try {
      const claimed = await dispatchOutboxOnce(outboxPool, async event => {
        await domainEventsQueue.add(event.type, {
          eventId: event.id,
          eventKey: event.eventKey,
          type: event.type,
          aggregateType: event.aggregateType,
          aggregateId: event.aggregateId,
          payload: event.payload,
          occurredAt: event.occurredAt.toISOString()
        }, {
          jobId: event.id,
          removeOnComplete: false,
          removeOnFail: false
        });
      }, dispatcherId);
      if (claimed === 0) await sleep(1_000);
    } catch (error) {
      console.error(JSON.stringify({
        event: "outbox.dispatch.failed",
        queue: DOMAIN_EVENTS_QUEUE,
        error: error instanceof Error ? error.message : String(error)
      }));
      await sleep(1_000);
    }
  }
}

const outboxPump = pumpOutbox();

async function shutdown(): Promise<void> {
  stopping = true;
  await foundationWorker.close();
  await outboxPump;
  await domainEventsQueue.close();
  await outboxPool.end();
  await telemetry.shutdown();
  process.exit(0);
}

process.on("SIGTERM", () => void shutdown());
process.on("SIGINT", () => void shutdown());
