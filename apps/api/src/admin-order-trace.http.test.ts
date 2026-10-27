import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("Admin order trace HTTP", () => {
  let app: NestFastifyApplication;
  const db = new PrismaService(), codes = new Map<string, string>();
  const identity = new IdentityCore(db, { async send(phone, code) { codes.set(phone, code); } }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(db);

  async function signIn(role: "artist" | "customer" | "staff" = "customer", domain?: string) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone);
    const verified = await identity.verifyCode(phone, codes.get(phone)!);
    const grant = await db.roleGrant.create({
      data: { userId: verified.userId, role, ...(domain ? { staffDomains: { create: [{ domain }] } } : {}) }
    });
    await contexts.select(verified.sessionToken, grant.id);
    return { userId: verified.userId, headers: { authorization: `Bearer ${verified.sessionToken}` } };
  }

  beforeAll(async () => {
    app = await createApplication();
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    await db.$connect();
  });
  afterAll(async () => { await app?.close(); await db.$disconnect(); });

  it("traces independent order/payment/fulfillment/issue/refund/finance dimensions without collapsing them", async () => {
    const customer = await signIn("customer");
    const artist = await signIn("artist");
    const orders = await signIn("staff", "orders");
    const finance = await signIn("staff", "finance");

    const product = await db.artistProduct.create({ data: {
      artistUserId: artist.userId, title: "محصول رهگیری", description: "برای trace",
      priceToman: 100000n, publicationStatus: "published", stockQuantity: 4, inventoryVersion: 1
    } });
    const orderId = randomUUID(), now = new Date();
    await db.customerOrder.create({ data: {
      id: orderId, userId: customer.userId, idempotencyKey: randomUUID(), requestHash: "trace-order",
      status: "placed", version: 2, paymentStatus: "paid", paidAt: now,
      shippingAddress: { recipientName: "مشتری", recipientPhone: "09120000000", province: "تهران", city: "تهران", postalCode: "1111111111", fullAddress: "نشانی" },
      subtotalToman: "100000", reservedUntil: new Date(now.getTime() + 60_000),
      preparations: { create: [{ artistUserId: artist.userId, status: "ready_for_dispatch", version: 4 }] },
      items: { create: [{ artistUserId: artist.userId, productId: product.id, title: product.title, unitPriceToman: 100000n, quantity: 1, imageIds: [] }] }
    } });

    await db.productInventoryEvent.create({ data: {
      productId: product.id, orderId, actorUserId: customer.userId, previousQuantity: 5, stockQuantity: 4,
      inventoryVersion: 1, reason: "order-reserved", requestId: "trace-inventory"
    } });
    await db.orderPreparationEvent.create({ data: {
      orderId, artistUserId: artist.userId, version: 1, fromStatus: "awaiting_acceptance", toStatus: "accepted",
      actorUserId: artist.userId, requestId: "trace-preparation"
    } });

    await db.orderPayableQuote.create({ data: {
      orderId, createdByUserId: finance.userId, shippingFeeToman: "10000", payableToman: "110000",
      sourceReference: "trace-quote", expiresAt: new Date(now.getTime() + 60_000)
    } });
    const attempt = await db.paymentAttempt.create({ data: {
      orderId, idempotencyKey: randomUUID(), requestHash: "trace-payment", provider: "trace-provider",
      providerReference: "trace-provider-" + randomUUID(), amountToman: "110000", status: "succeeded", version: 1
    } });
    await db.paymentEvent.create({ data: {
      attemptId: attempt.id, version: 1, status: "succeeded", reason: "verified",
      actorUserId: customer.userId, requestId: "trace-payment-event"
    } });
    const receipt = await db.paymentReceipt.create({ data: {
      attemptId: attempt.id, provider: "trace-provider", transactionReference: "trace-tx-" + randomUUID(),
      amount: "110000", unit: "toman"
    } });

    const shipment = await db.artistShipmentReport.create({ data: {
      orderId, artistUserId: artist.userId, preparationVersion: 4, carrierName: "پست",
      trackingCode: "TRACE-123", reportedByUserId: artist.userId, requestId: "trace-shipment"
    } });
    await db.customerShipmentIssue.create({ data: {
      shipmentId: shipment.id, commandVersion: 0, customerUserId: customer.userId, kind: "damaged",
      description: "آسیب دیده", status: "closed", version: 2,
      resolution: "referred_for_refund_review", resolutionSummary: "ارجاع برای بررسی مالی",
      requestId: "trace-issue"
    } });
    await db.shipmentIssueEvent.createMany({ data: [
      { id: randomUUID(), shipmentId: shipment.id, version: 1, fromStatus: "open", toStatus: "in_review", resolution: null,
        summary: "بررسی آغاز شد", actorUserId: orders.userId, requestId: "trace-issue-1" },
      { id: randomUUID(), shipmentId: shipment.id, version: 2, fromStatus: "in_review", toStatus: "closed", resolution: "referred_for_refund_review",
        summary: "ارجاع مالی", actorUserId: orders.userId, requestId: "trace-issue-2" }
    ] });
    const refund = await db.shipmentRefundReview.create({ data: {
      shipmentId: shipment.id, issueVersion: 2, orderId, receiptId: receipt.id, decision: "approved",
      amountToman: "50000", reason: "بازپرداخت جزئی تایید شد", actorUserId: finance.userId, requestId: "trace-refund"
    } });

    await db.financialEvent.createMany({ data: [
      { id: randomUUID(), eventKey: "trace-payment-" + receipt.id, kind: "payment_received", orderId, paymentReceiptId: receipt.id,
        amountToman: "110000", actorUserId: customer.userId, requestId: "trace-finance-payment", occurredAt: now },
      { id: randomUUID(), eventKey: "trace-sale-" + receipt.id, kind: "sale_verified", orderId, artistUserId: artist.userId, paymentReceiptId: receipt.id,
        amountToman: "100000", actorUserId: customer.userId, requestId: "trace-finance-sale", occurredAt: now },
      { id: randomUUID(), eventKey: "trace-refund-" + refund.id, kind: "refund_approved", orderId, artistUserId: artist.userId, refundReviewId: refund.id,
        amountToman: "50000", actorUserId: finance.userId, requestId: "trace-finance-refund", occurredAt: now }
    ] });

    const response = await app.inject({ method: "GET", url: `/api/v1/admin/orders/${orderId}/trace`, headers: orders.headers });
    expect(response.statusCode).toBe(200);
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.json().order).toMatchObject({
      id: orderId, status: "placed", paymentStatus: "paid", subtotalToman: "100000",
      quote: { shippingFeeToman: "10000", payableToman: "110000" }
    });
    expect(response.json().order.items).toEqual([
      expect.objectContaining({ productId: product.id, artistUserId: artist.userId, quantity: 1, unitPriceToman: "100000", lineSubtotalToman: "100000" })
    ]);
    expect(response.json().payment).toEqual([
      expect.objectContaining({ id: attempt.id, status: "succeeded", amountToman: "110000", receipt: expect.objectContaining({ id: receipt.id, unit: "toman" }) })
    ]);
    expect(response.json().fulfillment).toEqual([
      expect.objectContaining({
        artistUserId: artist.userId, status: "ready_for_dispatch",
        shipment: expect.objectContaining({
          id: shipment.id,
          issue: expect.objectContaining({
            status: "closed", resolution: "referred_for_refund_review",
            refundReviews: [expect.objectContaining({ id: refund.id, decision: "approved", amountToman: "50000" })]
          })
        })
      })
    ]);
    expect(response.json().inventory).toEqual([
      expect.objectContaining({ productId: product.id, reason: "order-reserved", previousQuantity: 5, stockQuantity: 4 })
    ]);
    expect(new Set(response.json().finance.map((e: { kind: string }) => e.kind))).toEqual(new Set(["payment_received", "sale_verified", "refund_approved"]));
    expect(response.json().order.status).toBe("placed");
    expect(response.json().payment[0].status).toBe("succeeded");
    expect(response.json().fulfillment[0].status).toBe("ready_for_dispatch");
    expect(response.json().fulfillment[0].shipment.issue.status).toBe("closed");
  });

  it("requires orders-domain staff and returns 404 for an unknown order", async () => {
    const orders = await signIn("staff", "orders"), finance = await signIn("staff", "finance"), customer = await signIn("customer");
    const id = randomUUID();
    expect((await app.inject({ method: "GET", url: `/api/v1/admin/orders/${id}/trace`, headers: finance.headers })).statusCode).toBe(403);
    expect((await app.inject({ method: "GET", url: `/api/v1/admin/orders/${id}/trace`, headers: customer.headers })).statusCode).toBe(403);
    expect((await app.inject({ method: "GET", url: `/api/v1/admin/orders/${id}/trace`, headers: orders.headers })).statusCode).toBe(404);
  });
});
