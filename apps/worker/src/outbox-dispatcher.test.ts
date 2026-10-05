import "dotenv/config";
import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { claimOutboxBatch, createOutboxPool, dispatchOutboxOnce, markOutboxFailed } from "./outbox-dispatcher.js";

describe("transactional outbox dispatcher", () => {
  const pool = createOutboxPool(process.env.DATABASE_URL!);

  beforeAll(async () => {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
    await pool.query("SELECT 1");
  });
  afterAll(async () => { await pool.end(); });

  async function insert(eventKey: string) {
    const id = randomUUID();
    await pool.query(`
      INSERT INTO "outbox_events"
        ("id","eventKey","type","aggregateType","aggregateId","payload","occurredAt")
      VALUES ($1::uuid,$2,'support_used','SupportAllocation',$3,$4::jsonb,NOW())
    `, [id, eventKey, randomUUID(), JSON.stringify({ marker: eventKey })]);
    return id;
  }

  it("leases with SKIP LOCKED and prevents two workers from claiming the same event", async () => {
    const id = await insert("worker-lease-" + randomUUID());
    const ownerA = "worker-a-" + randomUUID(), ownerB = "worker-b-" + randomUUID();
    const [a, b] = await Promise.all([
      claimOutboxBatch(pool, ownerA, 1, 60_000),
      claimOutboxBatch(pool, ownerB, 1, 60_000)
    ]);
    const claimed = [...a, ...b].filter(event => event.id === id);
    expect(claimed).toHaveLength(1);
    const owner = a.some(event => event.id === id) ? ownerA : ownerB;
    await markOutboxFailed(pool, id, owner, new Error("release test lease"));
  });

  it("marks successful publication exactly once and does not reclaim dispatched events", async () => {
    const eventKey = "worker-success-" + randomUUID();
    const id = await insert(eventKey), published: string[] = [];
    expect(await dispatchOutboxOnce(pool, async event => { if (event.id === id) published.push(event.eventKey); }, "worker-success", 50)).toBeGreaterThan(0);
    expect(published).toContain(eventKey);

    const row = (await pool.query<{
      dispatchedAt: Date | null; attemptCount: number; leaseOwner: string | null; leaseUntil: Date | null; lastError: string | null;
    }>('SELECT "dispatchedAt","attemptCount","leaseOwner","leaseUntil","lastError" FROM "outbox_events" WHERE "id"=$1::uuid', [id])).rows[0]!;
    expect(row.dispatchedAt).toBeInstanceOf(Date);
    expect(row.attemptCount).toBe(1);
    expect(row.leaseOwner).toBeNull();
    expect(row.leaseUntil).toBeNull();
    expect(row.lastError).toBeNull();

    const reclaimed = await claimOutboxBatch(pool, "worker-reclaim", 200, 60_000);
    expect(reclaimed.some(event => event.id === id)).toBe(false);
  });

  it("records publisher failure, releases the lease, and delays retry", async () => {
    const eventKey = "worker-failure-" + randomUUID(), id = await insert(eventKey);
    await dispatchOutboxOnce(pool, async event => {
      if (event.id === id) throw new Error("provider unavailable");
    }, "worker-failure", 50);

    const row = (await pool.query<{
      dispatchedAt: Date | null; attemptCount: number; leaseOwner: string | null; leaseUntil: Date | null; lastError: string | null; nextAttemptAt: Date;
    }>('SELECT "dispatchedAt","attemptCount","leaseOwner","leaseUntil","lastError","nextAttemptAt" FROM "outbox_events" WHERE "id"=$1::uuid', [id])).rows[0]!;
    expect(row.dispatchedAt).toBeNull();
    expect(row.attemptCount).toBe(1);
    expect(row.leaseOwner).toBeNull();
    expect(row.leaseUntil).toBeNull();
    expect(row.lastError).toBe("provider unavailable");
    expect(row.nextAttemptAt.getTime()).toBeGreaterThan(Date.now());

    const immediate = await claimOutboxBatch(pool, "worker-too-soon", 200, 60_000);
    expect(immediate.some(event => event.id === id)).toBe(false);
  });
});
