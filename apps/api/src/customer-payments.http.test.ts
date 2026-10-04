import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { CustomerPaymentsService, PaymentGateway, type GatewayStart, type GatewayVerification } from "./customer-payments.js";
import { CustomerOrdersService } from "./customer-orders.js";
import type { AuthorizationContext } from "@negarin/authz";
import { beforeEach } from "vitest";
import { PrismaService } from "./prisma.service.js";

describe("Customer payments HTTP and PostgreSQL", () => {
  let app: NestFastifyApplication;
  const database = new PrismaService();
  const codes = new Map<string, string>();
  const identity = new IdentityCore(database, {
    async send(phone, code) { codes.set(phone, code); }
  }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(database);

  async function signIn(role: "artist" | "staff" | "customer" = "artist") {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone);
    const user = await identity.verifyCode(phone, codes.get(phone) ?? "");
    const grant = await database.roleGrant.create({
      data: { userId: user.userId, role, ...(role === "staff" ? { staffDomains: { create: [{ domain: "finance" }] } } : {}) }
    });
    await contexts.select(user.sessionToken, grant.id);
    return { headers: { authorization: `Bearer ${user.sessionToken}` }, userId: user.userId };
  }

  async function product(extra: object = {}) {
    const artist = await signIn("artist");
    return database.artistProduct.create({ data: { artistUserId: artist.userId, title: "محصول دست‌ساز", priceToman: 100000n,
      publicationStatus: "published", stockQuantity: 100, ...extra } });
  }
  type User = Awaited<ReturnType<typeof signIn>>;
  let finance: AuthorizationContext;
  const sessions = new Map<string, { reference: string; amountToman: string }>();
  let startMode: "ready" | "unknown" | "unsafe" | "rejected" = "ready";
  let proof: GatewayVerification | undefined;
  let verifyWait: Promise<void> | undefined;
  let verifyEntered: (() => void) | undefined;
  let verifyCalls = 0;
  beforeAll(async () => {
    app = await createApplication(); await app.init(); await app.getHttpAdapter().getInstance().ready(); await database.$connect();
    const staff = await signIn("staff"); finance = (await contexts.resolve(staff.headers.authorization.slice(7)))!;
    Object.assign(app.get(PaymentGateway), {
      enabled: true, id: "ci-only-gateway", acceptsRedirect: (url: URL) => url.origin === "https://payments.example.test",
      start: async (input: { attemptId: string; amountToman: string }): Promise<GatewayStart> => {
        if (startMode === "unknown") return { kind: "unknown" };
        if (startMode === "rejected") return { kind: "rejected" };
        const record = sessions.get(input.attemptId) ?? { reference: "ref-" + input.attemptId, amountToman: input.amountToman };
        sessions.set(input.attemptId, record);
        return { kind: "ready", reference: record.reference, redirectUrl: startMode === "unsafe" ? "https://attacker.example.test/pay" : "https://payments.example.test/pay/" + input.attemptId };
      },
      verify: async (input: { reference: string; amountToman: string }): Promise<GatewayVerification> => {
        verifyCalls++; verifyEntered?.(); if (verifyWait) await verifyWait;
        return proof ?? { kind: "paid", reference: input.reference, transactionReference: "txn-" + input.reference, amount: input.amountToman, unit: "toman" };
      }
    });
  });
  beforeEach(() => { startMode = "ready"; proof = undefined; verifyWait = undefined; verifyEntered = undefined; verifyCalls = 0; });
  afterAll(async () => { await app?.close(); await database.$disconnect(); });
  async function reserve(quote = true) {
    const user = await signIn("customer"), p = await product({ priceToman: 9007199254740993n });
    const a = await app.inject({ method: "POST", url: "/api/v1/customer/addresses", headers: user.headers, payload: { version: 0, recipientName: "نگار", recipientPhone: "09123456789", province: "تهران", city: "تهران", postalCode: "1967654321", fullAddress: "خیابان نگار" } });
    expect(a.statusCode).toBe(201);
    expect((await app.inject({ method: "PUT", url: `/api/v1/customer/cart/items/${p.id}`, headers: user.headers, payload: { version: 0, quantity: 1 } })).statusCode).toBe(200);
    const r = await app.inject({ method: "POST", url: "/api/v1/customer/orders", headers: user.headers, payload: { cartVersion: 1, addressBookVersion: 1, addressId: a.json().addresses[0].id, idempotencyKey: randomUUID(), expectedSubtotalToman: p.priceToman.toString() } });
    expect(r.statusCode).toBe(201); const order = r.json();
    const quoteInput = { version: 0, shippingFeeToman: "5000", sourceReference: "CI-reviewed-shipping-" + order.id, expiresAt: new Date(new Date(order.reservedUntil).getTime() - 1000) };
    if (quote) await app.get(CustomerPaymentsService).recordQuote(finance, order.id, quoteInput);
    return { user, p, order, quoteInput, body: { version: quote ? 1 : 0, idempotencyKey: randomUUID(), expectedPayableToman: (p.priceToman + 5000n).toString() } };
  }
  function start(user: User, id: string, body: object) { return app.inject({ method: "POST", url: `/api/v1/customer/orders/${id}/payment`, headers: user.headers, payload: body }); }
  function verify(user: User, id: string, attemptId: string, payload: object = {}) { return app.inject({ method: "POST", url: `/api/v1/customer/orders/${id}/payment/${attemptId}/verify`, headers: user.headers, payload }); }
  function get(user: User, id: string) { return app.inject({ method: "GET", url: `/api/v1/customer/orders/${id}/payment`, headers: user.headers }); }
  function cancel(user: User, id: string, version = 1) { return app.inject({ method: "POST", url: `/api/v1/customer/orders/${id}/cancel`, headers: user.headers, payload: { version } }); }

  it("keeps the default unconfigured gateway disabled without creating attempts", async () => {
    const a = await reserve(false); const gateway = app.get(PaymentGateway);
    Object.assign(gateway, { enabled: false });
    try {
      expect((await get(a.user, a.order.id)).json()).toMatchObject({ enabled: false, quote: null, canStart: false, attempts: [] });
      expect((await start(a.user, a.order.id, a.body)).statusCode).toBe(503);
      expect(await database.paymentAttempt.count({ where: { orderId: a.order.id } })).toBe(0);
    } finally { Object.assign(gateway, { enabled: true }); }
  });

  it("requires a server quote, validates confirmed final amount and freezes quote author/source", async () => {
    const a = await reserve(false);
    expect((await start(a.user, a.order.id, a.body)).statusCode).toBe(409);
    const customer = (await contexts.resolve(a.user.headers.authorization.slice(7)))!;
    await expect(app.get(CustomerPaymentsService).recordQuote(customer, a.order.id, a.quoteInput)).rejects.toThrow();
    const q = await app.get(CustomerPaymentsService).recordQuote(finance, a.order.id, a.quoteInput);
    expect(q).toMatchObject({ createdByUserId: finance.userId, payableToman: "9007199254745993" });
    expect((await app.get(CustomerPaymentsService).recordQuote(finance, a.order.id, a.quoteInput)).payableToman).toBe(q.payableToman);
    await expect(app.get(CustomerPaymentsService).recordQuote(finance, a.order.id, { ...a.quoteInput, shippingFeeToman: "0" })).rejects.toThrow();
    expect((await start(a.user, a.order.id, { ...a.body, version: 1, expectedPayableToman: a.p.priceToman.toString() })).statusCode).toBe(409);
    expect((await start(a.user, a.order.id, { ...a.body, version: 0 })).statusCode).toBe(409);
    expect((await get(a.user, a.order.id)).json()).toMatchObject({ orderVersion: 1, canStart: true, quote: { shippingFeeToman: "5000", payableToman: q.payableToman } });
  });

  it("recovers concurrent same-key starts and allows only one active attempt", async () => {
    const a = await reserve(); const responses = await Promise.all([start(a.user, a.order.id, a.body), start(a.user, a.order.id, a.body)]);
    expect(responses.every(r => r.statusCode === 201 && r.json().status === "pending")).toBe(true);
    expect(new Set(responses.map(r => r.json().id)).size).toBe(1);
    expect(await database.paymentAttempt.count({ where: { orderId: a.order.id } })).toBe(1);
    expect((await start(a.user, a.order.id, { ...a.body, expectedPayableToman: "1" })).statusCode).toBe(409);
    expect((await start(a.user, a.order.id, { ...a.body, idempotencyKey: randomUUID() })).statusCode).toBe(409);
    expect((await get(a.user, a.order.id)).json().canStart).toBe(false);
    expect(await database.paymentEvent.count({ where: { attemptId: responses[0]!.json().id } })).toBe(2);
  });

  it("recovers uncertain starts with the same key and rejects unsafe redirects", async () => {
    const a = await reserve(); startMode = "unknown";
    expect((await start(a.user, a.order.id, a.body)).statusCode).toBe(503);
    const saved = await database.paymentAttempt.findFirstOrThrow({ where: { orderId: a.order.id } }); expect(saved.status).toBe("initializing");
    startMode = "unsafe"; expect((await start(a.user, a.order.id, a.body)).statusCode).toBe(503);
    startMode = "ready"; const response = await start(a.user, a.order.id, a.body); expect(response.json()).toMatchObject({ id: saved.id, status: "pending" });
    expect(await database.paymentAttempt.count({ where: { orderId: a.order.id } })).toBe(1);
  });

  it("marks paid only from server proof, records one receipt and prevents later cancellation/expiry", async () => {
    const a = await reserve(); const attempt = (await start(a.user, a.order.id, a.body)).json();
    expect((await verify(a.user, a.order.id, attempt.id, { status: "paid", amount: a.body.expectedPayableToman })).statusCode).toBe(400);
    const results = await Promise.all([verify(a.user, a.order.id, attempt.id), verify(a.user, a.order.id, attempt.id)]);
    expect(results.every(r => r.statusCode === 201 && r.json().status === "succeeded" && r.json().redirectUrl === null)).toBe(true);
    const order = await database.customerOrder.findUniqueOrThrow({ where: { id: a.order.id } }); expect(order).toMatchObject({ status: "placed", paymentStatus: "paid", version: 2 }); expect(order.paidAt).not.toBeNull();
    expect(await database.paymentReceipt.count({ where: { attemptId: attempt.id } })).toBe(1);
    expect(await database.financialEvent.count({ where: { orderId: a.order.id } })).toBe(2);
    expect(await database.paymentEvent.count({ where: { attemptId: attempt.id, reason: "server-verified-payment" } })).toBe(1);
    expect((await cancel(a.user, a.order.id, 2)).statusCode).toBe(409);
    await database.customerOrder.update({ where: { id: a.order.id }, data: { reservedUntil: new Date(Date.now() - 1000) } });
    await app.get(CustomerOrdersService).expirePending();
    expect(await database.artistProduct.findUniqueOrThrow({ where: { id: a.p.id } })).toMatchObject({ stockQuantity: 99, inventoryVersion: 1 });
    const calls = verifyCalls; expect((await verify(a.user, a.order.id, attempt.id)).json().status).toBe("succeeded"); expect(verifyCalls).toBe(calls);
  });

  it("preserves unknown verification and permits retry after definitive rejection", async () => {
    const a = await reserve(); const attempt = (await start(a.user, a.order.id, a.body)).json(); proof = { kind: "unknown" };
    expect((await verify(a.user, a.order.id, attempt.id)).statusCode).toBe(503);
    expect(await database.paymentAttempt.findUniqueOrThrow({ where: { id: attempt.id } })).toMatchObject({ status: "pending", version: 1 });
    proof = { kind: "rejected" }; expect((await verify(a.user, a.order.id, attempt.id)).json().status).toBe("failed");
    proof = undefined; expect((await start(a.user, a.order.id, { ...a.body, idempotencyKey: randomUUID() })).json().status).toBe("pending");
    expect(await database.customerOrder.findUniqueOrThrow({ where: { id: a.order.id } })).toMatchObject({ status: "reserved", paymentStatus: "unpaid" });
  });

  it("records mismatched money/unit for reconciliation and rejects malformed proof", async () => {
    const a = await reserve(); const attempt = (await start(a.user, a.order.id, a.body)).json();
    proof = { kind: "paid", reference: "wrong-session", transactionReference: "t", amount: "1", unit: "toman" };
    expect((await verify(a.user, a.order.id, attempt.id)).statusCode).toBe(503);
    expect(await database.paymentReceipt.count({ where: { attemptId: attempt.id } })).toBe(0);
    proof = { kind: "paid", reference: "ref-" + attempt.id, transactionReference: "mismatch-" + attempt.id, amount: "1", unit: "rial" };
    expect((await verify(a.user, a.order.id, attempt.id)).json().status).toBe("reconciliation_required");
    expect(await database.customerOrder.findUniqueOrThrow({ where: { id: a.order.id } })).toMatchObject({ status: "reserved", paymentStatus: "reconciliation_required", paidAt: null });
    expect(await database.paymentReceipt.findUniqueOrThrow({ where: { attemptId: attempt.id } })).toMatchObject({ amount: "1", unit: "rial" });
  });

  it("does not reuse one provider transaction for two orders", async () => {
    const a = await reserve(), b = await reserve(); const aa = (await start(a.user, a.order.id, a.body)).json(), ab = (await start(b.user, b.order.id, b.body)).json();
    proof = { kind: "paid", reference: "ref-" + aa.id, transactionReference: "duplicate-" + aa.id, amount: a.body.expectedPayableToman, unit: "toman" };
    expect((await verify(a.user, a.order.id, aa.id)).json().status).toBe("succeeded");
    proof = { ...proof, reference: "ref-" + ab.id }; expect((await verify(b.user, b.order.id, ab.id)).json().status).toBe("reconciliation_required");
    expect(await database.paymentReceipt.count({ where: { transactionReference: "duplicate-" + aa.id } })).toBe(1);
    expect(await database.customerOrder.findUniqueOrThrow({ where: { id: b.order.id } })).toMatchObject({ paymentStatus: "reconciliation_required", paidAt: null });
  });

  it("routes paid proof after cancellation to reconciliation without resurrecting stock", async () => {
    const a = await reserve(); const attempt = (await start(a.user, a.order.id, a.body)).json();
    let finish!: () => void; verifyWait = new Promise(resolve => { finish = resolve; });
    const entered = new Promise<void>(resolve => { verifyEntered = resolve; });
    const pending = Promise.resolve(verify(a.user, a.order.id, attempt.id)); await entered;
    expect((await cancel(a.user, a.order.id)).statusCode).toBe(201); finish();
    expect((await pending).json().status).toBe("reconciliation_required");
    expect(await database.customerOrder.findUniqueOrThrow({ where: { id: a.order.id } })).toMatchObject({ status: "cancelled", paymentStatus: "reconciliation_required", paidAt: null });
    expect(await database.artistProduct.findUniqueOrThrow({ where: { id: a.p.id } })).toMatchObject({ stockQuantity: 100, inventoryVersion: 2 });
  });

  it("treats a paid response after deadline as reconciliation and releases expired stock once", async () => {
    const a = await reserve(); const attempt = (await start(a.user, a.order.id, a.body)).json();
    await database.customerOrder.update({ where: { id: a.order.id }, data: { reservedUntil: new Date(Date.now() - 1000) } });
    expect((await verify(a.user, a.order.id, attempt.id)).json().status).toBe("reconciliation_required");
    await app.get(CustomerOrdersService).expirePending();
    expect(await database.customerOrder.findUniqueOrThrow({ where: { id: a.order.id } })).toMatchObject({ status: "expired", paymentStatus: "reconciliation_required" });
    expect((await get(a.user, a.order.id)).json().attempts[0].redirectUrl).toBeNull();
    expect(await database.artistProduct.findUniqueOrThrow({ where: { id: a.p.id } })).toMatchObject({ stockQuantity: 100, inventoryVersion: 2 });
  });

  it("isolates customers, blocks other roles and keeps gateway internals out of responses", async () => {
    const a = await reserve(), other = await signIn("customer"); const attempt = (await start(a.user, a.order.id, a.body)).json();
    expect((await get(other, a.order.id)).statusCode).toBe(404); expect((await start(other, a.order.id, a.body)).statusCode).toBe(404); expect((await verify(other, a.order.id, attempt.id)).statusCode).toBe(404);
    for (const role of ["artist", "staff"] as const) { const denied = await signIn(role); expect((await get(denied, a.order.id)).statusCode).toBe(403); expect((await start(denied, a.order.id, a.body)).statusCode).toBe(403); }
    expect((await app.inject({ method: "GET", url: `/api/v1/customer/orders/${a.order.id}/payment` })).statusCode).toBe(401);
    expect((await start(a.user, a.order.id, { ...a.body, userId: other.userId })).statusCode).toBe(400);
    expect((await verify(a.user, a.order.id, randomUUID())).statusCode).toBe(404);
    expect(attempt).not.toHaveProperty("providerReference"); expect(attempt).not.toHaveProperty("requestHash");
    expect((await get(a.user, a.order.id)).headers["cache-control"]).toBe("no-store");
  });

  it("rolls back receipt, payment audit and order on audit failure, then verifies safely on retry", async () => {
    const a = await reserve(); const attempt = (await start(a.user, a.order.id, a.body)).json();
    const name = "payment_test_" + randomUUID().replaceAll("-", "");
    await database.$executeRawUnsafe(`CREATE FUNCTION "${name}"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."attemptId" = '${attempt.id}'::uuid AND NEW."reason" = 'server-verified-payment' THEN RAISE EXCEPTION 'payment audit test failure'; END IF; RETURN NEW; END $$`);
    try { await database.$executeRawUnsafe(`CREATE TRIGGER "${name}" BEFORE INSERT ON "payment_events" FOR EACH ROW EXECUTE FUNCTION "${name}"()`);
      try {
        expect((await verify(a.user, a.order.id, attempt.id)).statusCode).toBe(500);
        expect(await database.paymentReceipt.count({ where: { attemptId: attempt.id } })).toBe(0);
        expect(await database.paymentAttempt.findUniqueOrThrow({ where: { id: attempt.id } })).toMatchObject({ status: "pending", version: 1 });
        expect(await database.customerOrder.findUniqueOrThrow({ where: { id: a.order.id } })).toMatchObject({ status: "reserved", paymentStatus: "unpaid", version: 1 });
      } finally { await database.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "${name}" ON "payment_events"`); }
    } finally { await database.$executeRawUnsafe(`DROP FUNCTION IF EXISTS "${name}"()`); }
    expect((await verify(a.user, a.order.id, attempt.id)).json().status).toBe("succeeded");
    expect(await database.paymentReceipt.count({ where: { attemptId: attempt.id } })).toBe(1);
    expect(await database.financialEvent.count({ where: { orderId: a.order.id } })).toBe(2);
  });
  it("rolls back verified payment and receipt if its financial journal fails", async () => {
    const a = await reserve(), attempt = (await start(a.user, a.order.id, a.body)).json();
    const name = "journal_" + randomUUID().replaceAll("-", "");
    await database.$executeRawUnsafe('CREATE FUNCTION "' + name + '"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."orderId" = ' + "'" + a.order.id + "'" + "::uuid THEN RAISE EXCEPTION 'journal failure'; END IF; RETURN NEW; END $$");
    try {
      await database.$executeRawUnsafe('CREATE TRIGGER "' + name + '" BEFORE INSERT ON "financial_events" FOR EACH ROW EXECUTE FUNCTION "' + name + '"()');
      try {
        expect((await verify(a.user, a.order.id, attempt.id)).statusCode).toBe(500);
        expect(await database.paymentReceipt.count({ where: { attemptId: attempt.id } })).toBe(0);
        expect(await database.financialEvent.count({ where: { orderId: a.order.id } })).toBe(0);
        expect(await database.customerOrder.findUniqueOrThrow({ where: { id: a.order.id } })).toMatchObject({ status: "reserved", paymentStatus: "unpaid" });
      } finally { await database.$executeRawUnsafe('DROP TRIGGER IF EXISTS "' + name + '" ON "financial_events"'); }
    } finally { await database.$executeRawUnsafe('DROP FUNCTION IF EXISTS "' + name + '"()'); }
    expect((await verify(a.user, a.order.id, attempt.id)).json().status).toBe("succeeded");
    const events = await database.financialEvent.findMany({ where: { orderId: a.order.id } });
    expect(events).toHaveLength(2);
    expect(events.find(e => e.kind === "payment_received")?.amountToman).toBe(a.body.expectedPayableToman);
    expect(events.find(e => e.kind === "sale_verified")).toMatchObject({ amountToman: a.p.priceToman.toString(), artistUserId: a.p.artistUserId });
  });

});
