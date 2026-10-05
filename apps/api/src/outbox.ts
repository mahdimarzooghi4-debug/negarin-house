import type { Prisma } from "./generated/prisma/client.js";

export type OutboxWrite = Readonly<{
  eventKey: string;
  type: "support_used";
  aggregateType: string;
  aggregateId: string;
  payload: Prisma.InputJsonValue;
  occurredAt: Date;
}>;

export async function writeOutboxEvent(tx: Prisma.TransactionClient, event: OutboxWrite) {
  return tx.outboxEvent.create({ data: event });
}
