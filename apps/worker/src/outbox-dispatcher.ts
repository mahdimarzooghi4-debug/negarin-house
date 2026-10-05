import { randomUUID } from "node:crypto";
import { Pool, type PoolClient } from "pg";

export type ClaimedOutboxEvent = Readonly<{
  id: string;
  eventKey: string;
  type: string;
  aggregateType: string;
  aggregateId: string;
  payload: unknown;
  occurredAt: Date;
}>;

export type OutboxPublisher = (event: ClaimedOutboxEvent) => Promise<void>;

async function inTransaction<T>(pool: Pool, action: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await action(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export function createOutboxPool(databaseUrl: string): Pool {
  return new Pool({ connectionString: databaseUrl, max: 4 });
}

export async function claimOutboxBatch(
  pool: Pool,
  leaseOwner: string,
  limit = 50,
  leaseMilliseconds = 60_000,
  eventKeyPrefix?: string
): Promise<ClaimedOutboxEvent[]> {
  if (!leaseOwner || leaseOwner.length > 200 || !Number.isInteger(limit) || limit < 1 || limit > 200 ||
      !Number.isInteger(leaseMilliseconds) || leaseMilliseconds < 1_000 || leaseMilliseconds > 300_000) {
    throw new Error("invalid-outbox-claim");
  }

  return inTransaction(pool, async client => {
    const result = await client.query<ClaimedOutboxEvent>(\`
      WITH picked AS (
        SELECT "id"
        FROM "outbox_events"
        WHERE "dispatchedAt" IS NULL
          AND "nextAttemptAt" <= NOW()
          AND ("leaseUntil" IS NULL OR "leaseUntil" <= NOW())
          AND ($4::text IS NULL OR "eventKey" LIKE $4 || '%')
        ORDER BY "occurredAt" ASC, "id" ASC
        FOR UPDATE SKIP LOCKED
        LIMIT $1
      )
      UPDATE "outbox_events" o
      SET "leaseOwner" = $2,
          "leaseUntil" = NOW() + ($3::int * INTERVAL '1 millisecond'),
          "attemptCount" = o."attemptCount" + 1,
          "lastError" = NULL
      FROM picked
      WHERE o."id" = picked."id"
      RETURNING o."id", o."eventKey", o."type"::text AS "type",
                o."aggregateType", o."aggregateId", o."payload", o."occurredAt"
    \`, [limit, leaseOwner, leaseMilliseconds]);
    return result.rows;
  });
}

export async function markOutboxDispatched(pool: Pool, id: string, leaseOwner: string): Promise<void> {
  const result = await pool.query(\`
    UPDATE "outbox_events"
    SET "dispatchedAt" = NOW(), "leaseOwner" = NULL, "leaseUntil" = NULL, "lastError" = NULL
    WHERE "id" = $1::uuid AND "dispatchedAt" IS NULL AND "leaseOwner" = $2
  \`, [id, leaseOwner]);
  if (result.rowCount !== 1) throw new Error("outbox-lease-lost");
}

export async function markOutboxFailed(pool: Pool, id: string, leaseOwner: string, error: unknown): Promise<void> {
  const message = (error instanceof Error ? error.message : String(error)).slice(0, 4000);
  await pool.query(\`
    UPDATE "outbox_events"
    SET "leaseOwner" = NULL,
        "leaseUntil" = NULL,
        "lastError" = $3,
        "nextAttemptAt" = NOW() + INTERVAL '30 seconds'
    WHERE "id" = $1::uuid AND "dispatchedAt" IS NULL AND "leaseOwner" = $2
  \`, [id, leaseOwner, message]);
}

export async function dispatchOutboxOnce(
  pool: Pool,
  publish: OutboxPublisher,
  leaseOwner = randomUUID(),
  batchSize = 50,
  eventKeyPrefix?: string
): Promise<number> {
  const events = await claimOutboxBatch(pool, leaseOwner, batchSize, 60_000, eventKeyPrefix);
  for (const event of events) {
    try {
      await publish(event);
      await markOutboxDispatched(pool, event.id, leaseOwner);
    } catch (error) {
      await markOutboxFailed(pool, event.id, leaseOwner, error);
    }
  }
  return events.length;
}
