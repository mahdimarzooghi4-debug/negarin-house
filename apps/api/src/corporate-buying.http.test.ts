import "dotenv/config";
import "reflect-metadata";
import { randomInt } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("Corporate Buyer purchase request and order HTTP contract", () => {
  let app: NestFastifyApplication;
  const database = new PrismaService();
  const codes = new Map<string, string>();
  const identity = new IdentityCore(database, {
    async send(phone, code) { codes.set(phone, code); }
  }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(database);

  async function signIn(role: "artist" | "corporate_buyer" | "customer", organizationId?: string) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone);
    const user = await identity.verifyCode(phone, codes.get(phone) ?? "");
    const grant = await database.roleGrant.create({ data: { userId: user.userId, role, organizationId } });
    await contexts.select(user.sessionToken, grant.id);
    return { authorization: `Bearer ${user.sessionToken}`, userId: user.userId };
  }

  beforeAll(async () => {
    app = await createApplication();
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    await database.$connect();
  });
  afterAll(async () => { await app?.close(); await database.$disconnect(); });

  it("records requests without reserving stock and direct orders with organization-scoped stock reservation", async () => {
    const orgA = await database.organization.create({ data: { kind: "corporate_buyer", displayName: "Buyer A" } });
    const orgB = await database.organization.create({ data: { kind: "corporate_buyer", displayName: "Buyer B" } });
    const buyerA = await signIn("corporate_buyer", orgA.id);
    const buyerAColleague = await signIn("corporate_buyer", orgA.id);
    const buyerB = await signIn("corporate_buyer", orgB.id);
    const artist = await signIn("artist");
    const customer = await signIn("customer");
    const product = await database.artistProduct.create({ data: {
      artistUserId: artist.userId, title: "گلدان", description: null, priceToman: 120_000n,
      publicationStatus: "published", availableQuantity: 5
    } });
    const path = "/api/v1/corporate-buyer";

    const request = await app.inject({ method: "POST", url: `${path}/purchase-requests`, headers: buyerA,
      payload: { productId: product.id, quantity: 3, note: "ارسال برای شعبه مرکزی" } });
    expect(request.statusCode).toBe(201);
    expect(request.json()).toMatchObject({ productTitle: "گلدان", unitPriceToman: "120000", quantity: 3, totalToman: "360000", status: "submitted" });
    expect((await database.artistProduct.findUniqueOrThrow({ where: { id: product.id } })).availableQuantity).toBe(5);

    const order = await app.inject({ method: "POST", url: `${path}/orders`, headers: buyerA,
      payload: { productId: product.id, quantity: 2 } });
    expect(order.statusCode).toBe(201);
    expect(order.json()).toMatchObject({ productTitle: "گلدان", unitPriceToman: "120000", quantity: 2, totalToman: "240000", status: "awaiting_payment" });
    expect((await database.artistProduct.findUniqueOrThrow({ where: { id: product.id } })).availableQuantity).toBe(3);

    expect((await app.inject({ method: "GET", url: `${path}/purchase-requests`, headers: buyerAColleague })).json())
      .toEqual([expect.objectContaining({ id: request.json().id, note: "ارسال برای شعبه مرکزی" })]);
    expect((await app.inject({ method: "GET", url: `${path}/orders`, headers: buyerAColleague })).json())
      .toEqual([expect.objectContaining({ id: order.json().id, status: "awaiting_payment" })]);
    expect((await app.inject({ method: "GET", url: `${path}/orders`, headers: buyerB })).json()).toEqual([]);

    const cancel = await app.inject({ method: "POST", url: `${path}/orders/${order.json().id}/cancel`, headers: buyerA });
    expect(cancel.statusCode).toBe(201);
    expect(cancel.json().status).toBe("cancelled");
    expect((await database.artistProduct.findUniqueOrThrow({ where: { id: product.id } })).availableQuantity).toBe(5);
    expect((await app.inject({ method: "POST", url: `${path}/orders/${order.json().id}/cancel`, headers: buyerA })).statusCode).toBe(404);

    expect((await app.inject({ method: "POST", url: `${path}/orders`, headers: buyerA,
      payload: { productId: product.id, quantity: 4 } })).statusCode).toBe(409);
    expect((await app.inject({ method: "POST", url: `${path}/orders`, headers: buyerA,
      payload: { productId: product.id, quantity: 1, buyerOrganizationId: orgB.id } })).statusCode).toBe(400);
    expect((await app.inject({ method: "POST", url: `${path}/orders`, headers: artist,
      payload: { productId: product.id, quantity: 1 } })).statusCode).toBe(403);
    expect((await app.inject({ method: "GET", url: `${path}/purchase-requests`, headers: customer })).statusCode).toBe(403);
    expect((await app.inject({ method: "POST", url: `${path}/orders`, payload: { productId: product.id, quantity: 1 } })).statusCode).toBe(401);
    expect((await app.inject({ method: "POST", url: `${path}/purchase-requests`, headers: buyerA,
      payload: { productId: product.id, quantity: 0 } })).statusCode).toBe(400);
  });
});
