import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";
describe("Artist preparation HTTP and PostgreSQL", () => {
  let app: NestFastifyApplication;
  const db = new PrismaService(), codes = new Map<string, string>();
  const identity = new IdentityCore(db, { async send(phone, code) { codes.set(phone, code); } }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(db);
  async function signIn(role: "artist" | "customer" | "staff" = "artist", domain?: string) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone); const u = await identity.verifyCode(phone, codes.get(phone)!);
    const g = await db.roleGrant.create({ data: { userId: u.userId, role, ...(domain ? { staffDomains: { create: [{ domain }] } } : {}) } }); await contexts.select(u.sessionToken, g.id);
    return { userId: u.userId, headers: { authorization: `Bearer ${u.sessionToken}` } };
  }
  type User = Awaited<ReturnType<typeof signIn>>;
  beforeAll(async () => { app = await createApplication(); await app.init(); await app.getHttpAdapter().getInstance().ready(); await db.$connect(); });
  afterAll(async () => { await app?.close(); await db.$disconnect(); });
  async function setup(paid = true) {
    const a = await signIn(), b = await signIn(), customer = await signIn("customer");
    const products = await Promise.all([a, b].map(u => db.artistProduct.create({ data: { artistUserId: u.userId, title: "عنوان اصلی", priceToman: 9007199254740993n, stockQuantity: 10, publicationStatus: "published" } })));
    const address = await app.inject({ method: "POST", url: "/api/v1/customer/addresses", headers: customer.headers, payload: { version: 0, recipientName: "نگار", recipientPhone: "09123456789", province: "تهران", city: "تهران", postalCode: "1967654321", fullAddress: "خیابان نگار" } });
    for (const [i, p] of products.entries()) expect((await app.inject({ method: "PUT", url: `/api/v1/customer/cart/items/${p.id}`, headers: customer.headers, payload: { version: i, quantity: 1 } })).statusCode).toBe(200);
    const order = await app.inject({ method: "POST", url: "/api/v1/customer/orders", headers: customer.headers, payload: { cartVersion: 2, addressBookVersion: 1, addressId: address.json().addresses[0].id, idempotencyKey: randomUUID(), expectedSubtotalToman: "18014398509481986" } });
    expect(order.statusCode).toBe(201);
    // A paid fixture bypasses the gateway ONLY in this test suite; production payment is server-verified.
    if (paid) await db.customerOrder.update({ where: { id: order.json().id }, data: { status: "placed", paymentStatus: "paid", paidAt: new Date(), version: 1 } });
    return { a, b, customer, products, id: order.json().id as string };
  }
  function get(u: User, id: string) { return app.inject({ method: "GET", url: `/api/v1/artist/orders/${id}`, headers: u.headers }); }
  function advance(u: User, id: string, version: number, status: string) { return app.inject({ method: "POST", url: `/api/v1/artist/orders/${id}/preparation`, headers: u.headers, payload: { version, status } }); }
  it("scopes multi-artist lines, exact totals and shipping details without finance/account leaks", async () => {
    const s = await setup();
    await db.artistProduct.update({ where: { id: s.products[0]!.id }, data: { title: "عنوان جدید", priceToman: 1n, archivedAt: new Date(), artistUserId: s.b.userId } });
    const r = await get(s.a, s.id); expect(r.statusCode).toBe(200); expect(r.headers["cache-control"]).toBe("no-store");
    expect(r.json()).toMatchObject({ status: "awaiting_acceptance", version: 0, merchandiseSubtotalToman: "9007199254740993", items: [{ productId: s.products[0]!.id, title: "عنوان اصلی", unitPriceToman: "9007199254740993" }] });
    expect(r.json().items).toHaveLength(1);
    for (const key of ["userId", "artistUserId", "subtotalToman", "payments", "payableQuote", "requestId"]) expect(r.json()).not.toHaveProperty(key);
    expect((await get(s.b, s.id)).json().items).toHaveLength(1);
    const list = await app.inject({ method: "GET", url: "/api/v1/artist/orders", headers: s.a.headers });
    expect(list.json().items).toHaveLength(1); expect(list.json().items[0]).not.toHaveProperty("shippingAddress");
  });
  it("hides unpaid orders and enforces active-role and ownership boundaries", async () => {
    const s = await setup(false), stranger = await signIn();
    expect((await get(s.a, s.id)).statusCode).toBe(404);
    expect((await advance(s.a, s.id, 0, "accepted")).statusCode).toBe(404);
    expect((await get(stranger, s.id)).statusCode).toBe(404);
    expect((await get(s.customer, s.id)).statusCode).toBe(403);
    expect((await get(await signIn("staff"), s.id)).statusCode).toBe(403);
    expect((await app.inject({ method: "GET", url: "/api/v1/artist/orders" })).statusCode).toBe(401);
    expect((await app.inject({ method: "GET", url: "/api/v1/artist/orders", headers: s.a.headers })).json().items).toEqual([]);
  });
  it("serializes retries and independent artist workflows without touching payment or inventory", async () => {
    const s = await setup();
    const results = await Promise.all([advance(s.a, s.id, 0, "accepted"), advance(s.a, s.id, 0, "accepted"), advance(s.b, s.id, 0, "accepted")]);
    expect(results.map(r => r.statusCode)).toEqual([201, 201, 201]); expect(results[0]!.json()).toEqual(results[1]!.json());
    for (const [v, status] of ["preparing", "packaging", "ready_for_dispatch"].entries()) expect((await advance(s.a, s.id, v + 1, status)).statusCode).toBe(201);
    expect((await get(s.b, s.id)).json()).toMatchObject({ status: "accepted", version: 1 });
    const own = (await get(s.a, s.id)).json(); expect(own.history).toHaveLength(4); expect(own.history[0]).not.toHaveProperty("actorUserId");
    expect(await db.orderPreparationEvent.count({ where: { orderId: s.id } })).toBe(5);
    expect(await db.customerOrder.findUniqueOrThrow({ where: { id: s.id } })).toMatchObject({ status: "placed", paymentStatus: "paid", version: 1 });
    expect((await db.artistProduct.findUniqueOrThrow({ where: { id: s.products[0]!.id } })).stockQuantity).toBe(9);
    const customer = await app.inject({ method: "GET", url: `/api/v1/customer/orders/${s.id}`, headers: s.customer.headers });
    expect(customer.json().preparation.map((p: { status: string }) => p.status).sort()).toEqual(["accepted", "ready_for_dispatch"]);
  });
  it("rejects skipped, reversed, stale and terminal transitions", async () => {
    const s = await setup();
    expect((await advance(s.a, s.id, 0, "packaging")).statusCode).toBe(409);
    expect((await advance(s.a, s.id, 0, "shipped")).statusCode).toBe(400);
    expect((await advance(s.a, s.id, 0, "accepted")).statusCode).toBe(201);
    expect((await advance(s.a, s.id, 0, "preparing")).statusCode).toBe(409);
    expect((await advance(s.a, s.id, 1, "accepted")).statusCode).toBe(409);
    expect((await advance(s.a, s.id, 1, "preparing")).statusCode).toBe(201);
    expect((await advance(s.a, s.id, 0, "accepted")).statusCode).toBe(409);
  });
  it("bounds pagination and rejects identity overrides", async () => {
    const s = await setup(); await setup();
    const r = await app.inject({ method: "GET", url: "/api/v1/artist/orders?pageSize=1", headers: s.a.headers });
    expect(r.json()).toMatchObject({ hasMore: false, items: [{ orderId: s.id }] });
    for (const q of ["pageSize=51", "artistUserId=" + s.b.userId]) expect((await app.inject({ method: "GET", url: "/api/v1/artist/orders?" + q, headers: s.a.headers })).statusCode).toBe(400);
  });
  it("rolls back state when audit writing fails, then permits retry", async () => {
    const s = await setup(), name = "prep_" + randomUUID().replaceAll("-", "");
    await db.$executeRawUnsafe(`CREATE FUNCTION "${name}"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."orderId" = '${s.id}'::uuid THEN RAISE EXCEPTION 'audit failure'; END IF; RETURN NEW; END $$`);
    try {
      await db.$executeRawUnsafe(`CREATE TRIGGER "${name}" BEFORE INSERT ON "order_preparation_events" FOR EACH ROW EXECUTE FUNCTION "${name}"()`);
      try {
        expect((await advance(s.a, s.id, 0, "accepted")).statusCode).toBe(500);
        expect((await get(s.a, s.id)).json()).toMatchObject({ status: "awaiting_acceptance", version: 0, history: [] });
      } finally { await db.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "${name}" ON "order_preparation_events"`); }
    } finally { await db.$executeRawUnsafe(`DROP FUNCTION IF EXISTS "${name}"()`); }
    expect((await advance(s.a, s.id, 0, "accepted")).statusCode).toBe(201);
  });
  function dispatch(u: User, id: string, payload: object = { version: 4, carrierName: "پست", trackingCode: "001234AB-5" }) {
    return app.inject({ method: "POST", url: `/api/v1/artist/orders/${id}/shipment`, headers: u.headers, payload });
  }
  async function ready(u: User, id: string) {
    for (const [version, status] of ["accepted", "preparing", "packaging", "ready_for_dispatch"].entries()) {
      expect((await advance(u, id, version, status)).statusCode).toBe(201);
    }
  }
  it("reports dispatch independently, exposing tracking to the customer without changing payment, stock or delivery", async () => {
    const s = await setup(); await ready(s.a, s.id);
    const before = await db.artistProduct.findUniqueOrThrow({ where: { id: s.products[0]!.id } });
    expect((await get(s.a, s.id)).json().shipment).toBeNull();
    const response = await dispatch(s.a, s.id);
    expect(response.statusCode).toBe(201); expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.json()).toMatchObject({ status: "ready_for_dispatch", version: 5, shipment: {
      status: "reported_dispatched", source: "artist_report", carrierVerified: false, carrierName: "پست", trackingCode: "001234AB-5"
    } });
    for (const key of ["artistUserId", "reportedByUserId", "requestId", "preparationVersion", "deliveredAt", "settledAt"]) expect(response.json().shipment).not.toHaveProperty(key);
    expect(response.json().history).toHaveLength(4);
    expect((await get(s.b, s.id)).json()).toMatchObject({ version: 0, shipment: null });
    const customer = await app.inject({ method: "GET", url: `/api/v1/customer/orders/${s.id}`, headers: s.customer.headers });
    const group = customer.json().preparation.find((p: { items: string[] }) => p.items.includes(s.products[0]!.id));
    expect(group.shipment).toEqual(response.json().shipment);
    expect(customer.json().preparation.filter((p: { shipment: unknown }) => p.shipment !== null)).toHaveLength(1);
    expect(await db.customerOrder.findUniqueOrThrow({ where: { id: s.id } })).toMatchObject({ status: "placed", paymentStatus: "paid", version: 1 });
    expect(await db.artistProduct.findUniqueOrThrow({ where: { id: s.products[0]!.id } })).toMatchObject({ stockQuantity: before.stockQuantity, inventoryVersion: before.inventoryVersion });
    const audit = await db.artistShipmentReport.findUniqueOrThrow({ where: { orderId_artistUserId: { orderId: s.id, artistUserId: s.a.userId } } });
    expect(audit.reportedByUserId).toBe(s.a.userId); expect(audit.requestId).toBeTruthy(); expect(audit.preparationVersion).toBe(5);
  });
  it("recovers concurrent identical dispatches with one immutable report", async () => {
    const s = await setup(); await ready(s.a, s.id);
    const result = await Promise.all([dispatch(s.a, s.id), dispatch(s.a, s.id), dispatch(s.a, s.id, { version: 4, carrierName: " پست ", trackingCode: "۰۰١٢٣٤AB-٥" })]);
    expect(result.map(r => r.statusCode)).toEqual([201, 201, 201]);
    expect(result[0]!.json()).toEqual(result[1]!.json()); expect(result[1]!.json()).toEqual(result[2]!.json());
    expect(await db.artistShipmentReport.count({ where: { orderId: s.id } })).toBe(1);
    expect((await get(s.a, s.id)).json().version).toBe(5);
  });
  it("rejects premature, stale and changed report attempts", async () => {
    const s = await setup();
    expect((await dispatch(s.a, s.id, { version: 0, carrierName: "پست", trackingCode: "123" })).statusCode).toBe(409);
    await ready(s.a, s.id);
    expect((await dispatch(s.a, s.id, { version: 3, carrierName: "پست", trackingCode: "123" })).statusCode).toBe(409);
    expect((await dispatch(s.a, s.id)).statusCode).toBe(201);
    expect((await dispatch(s.a, s.id, { version: 4, carrierName: "پست", trackingCode: "456" })).statusCode).toBe(409);
    expect((await dispatch(s.a, s.id, { version: 5, carrierName: "پست", trackingCode: "001234AB-5" })).statusCode).toBe(409);
    expect((await advance(s.a, s.id, 3, "ready_for_dispatch")).statusCode).toBe(409);
  });
  it("serializes conflicting dispatches without replacing the winning tracking code", async () => {
    const s = await setup(); await ready(s.a, s.id);
    const r = await Promise.all(["111", "222"].map(trackingCode => dispatch(s.a, s.id, { version: 4, carrierName: "پست", trackingCode })));
    expect(r.map(v => v.statusCode).sort()).toEqual([201, 409]);
    expect((await get(s.a, s.id)).json().shipment.trackingCode).toBe(r.find(v => v.statusCode === 201)!.json().shipment.trackingCode);
    expect(await db.artistShipmentReport.count({ where: { orderId: s.id } })).toBe(1);
  });
  it("enforces paid ownership and active role on dispatch, and refuses client verification/time overrides", async () => {
    const unpaid = await setup(false), paid = await setup(), stranger = await signIn();
    expect((await dispatch(unpaid.a, unpaid.id)).statusCode).toBe(404);
    expect((await dispatch(stranger, paid.id)).statusCode).toBe(404);
    expect((await dispatch(paid.customer, paid.id)).statusCode).toBe(403);
    expect((await dispatch(await signIn("staff"), paid.id)).statusCode).toBe(403);
    expect((await dispatch(paid.a, paid.id, { version: 4, carrierName: "پست", trackingCode: "123", carrierVerified: true })).statusCode).toBe(400);
    expect((await dispatch(paid.a, paid.id, { version: 4, carrierName: "پست", trackingCode: "123", reportedAt: "2020-01-01" })).statusCode).toBe(400);
    expect((await app.inject({ method: "POST", url: `/api/v1/artist/orders/${paid.id}/shipment`, payload: { version: 4, carrierName: "پست", trackingCode: "123" } })).statusCode).toBe(401);
  });
  it("rolls back the preparation revision on report persistence failure and recovers on retry", async () => {
    const s = await setup(); await ready(s.a, s.id);
    const name = "ship_" + randomUUID().replaceAll("-", "");
    await db.$executeRawUnsafe(`CREATE FUNCTION "${name}"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."orderId" = '${s.id}'::uuid THEN RAISE EXCEPTION 'shipment failure'; END IF; RETURN NEW; END $$`);
    try {
      await db.$executeRawUnsafe(`CREATE TRIGGER "${name}" BEFORE INSERT ON "artist_shipment_reports" FOR EACH ROW EXECUTE FUNCTION "${name}"()`);
      try {
        expect((await dispatch(s.a, s.id)).statusCode).toBe(500);
        expect((await get(s.a, s.id)).json()).toMatchObject({ version: 4, shipment: null });
        expect(await db.artistShipmentReport.count({ where: { orderId: s.id } })).toBe(0);
      } finally { await db.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "${name}" ON "artist_shipment_reports"`); }
    } finally { await db.$executeRawUnsafe(`DROP FUNCTION IF EXISTS "${name}"()`); }
    expect((await dispatch(s.a, s.id)).statusCode).toBe(201);
  });

  async function dispatched() {
    const s = await setup(); await ready(s.a, s.id);
    const shipment = (await dispatch(s.a, s.id)).json().shipment;
    return { ...s, shipmentId: shipment.id as string };
  }
  function outcome(u: User, orderId: string, shipmentId: string, action: string, payload: object) {
    return app.inject({ method: "POST", url: "/api/v1/customer/orders/" + orderId + "/shipments/" + shipmentId + "/" + action, headers: u.headers, payload });
  }
  const issueBody = { version: 0, kind: "damaged", description: "بسته آسیب دیده" };
  it("confirms a shipment once without touching finance or inventory", async () => {
    const s = await dispatched();
    const r = await Promise.all([outcome(s.customer, s.id, s.shipmentId, "receipt", { version: 0 }), outcome(s.customer, s.id, s.shipmentId, "receipt", { version: 0 })]);
    expect(r.map(v => v.statusCode)).toEqual([201, 201]); expect(r[0]!.json()).toEqual(r[1]!.json());
    expect(r[0]!.headers["cache-control"]).toBe("no-store");
    expect(r[0]!.json()).toMatchObject({ customerVersion: 1, carrierVerified: false, issue: null, receipt: { source: "customer_confirmation" } });
    for (const key of ["customerUserId", "requestId", "commandVersion"]) expect(r[0]!.json().receipt).not.toHaveProperty(key);
    expect(await db.customerShipmentReceipt.count({ where: { shipmentId: s.shipmentId } })).toBe(1);
    expect((await get(s.a, s.id)).json()).toMatchObject({ version: 5, shipment: { receipt: { source: "customer_confirmation" } } });
    expect((await get(s.b, s.id)).json().shipment).toBeNull();
    expect(await db.customerOrder.findUniqueOrThrow({ where: { id: s.id } })).toMatchObject({ status: "placed", paymentStatus: "paid", version: 1 });
    expect(await db.artistProduct.findUniqueOrThrow({ where: { id: s.products[0]!.id } })).toMatchObject({ stockQuantity: 9, inventoryVersion: 1 });
    expect((await outcome(s.customer, s.id, s.shipmentId, "receipt", { version: 1 })).statusCode).toBe(409);
  });
  it("records a scoped open issue once, and prevents receipt while it is open", async () => {
    const s = await dispatched();
    const r = await Promise.all([outcome(s.customer, s.id, s.shipmentId, "issues", issueBody), outcome(s.customer, s.id, s.shipmentId, "issues", { ...issueBody, description: " بسته آسیب دیده " })]);
    expect(r.map(v => v.statusCode)).toEqual([201, 201]); expect(r[0]!.json()).toEqual(r[1]!.json());
    expect(r[0]!.json()).toMatchObject({ customerVersion: 1, receipt: null, issue: { status: "open", kind: "damaged", description: issueBody.description } });
    const read = await app.inject({ method: "GET", url: "/api/v1/customer/orders/" + s.id + "/shipments/" + s.shipmentId, headers: s.customer.headers });
    expect(read.statusCode).toBe(200); expect(read.json()).toEqual(r[0]!.json());
    expect((await get(s.a, s.id)).json().shipment.issue).toEqual(read.json().issue);
    expect((await outcome(s.customer, s.id, s.shipmentId, "receipt", { version: 1 })).statusCode).toBe(409);
    expect((await outcome(s.customer, s.id, s.shipmentId, "issues", { ...issueBody, description: "تغییر" })).statusCode).toBe(409);
    expect(await db.customerShipmentIssue.count({ where: { shipmentId: s.shipmentId } })).toBe(1);
    expect(await db.customerShipmentIssue.findUniqueOrThrow({ where: { shipmentId: s.shipmentId } })).toMatchObject({ customerUserId: s.customer.userId, commandVersion: 0 });
  });
  it("permits damage after receipt but rejects contradictory nonreceipt", async () => {
    const s = await dispatched();
    expect((await outcome(s.customer, s.id, s.shipmentId, "receipt", { version: 0 })).statusCode).toBe(201);
    expect((await outcome(s.customer, s.id, s.shipmentId, "issues", { ...issueBody, version: 1, kind: "not_received" })).statusCode).toBe(409);
    expect((await outcome(s.customer, s.id, s.shipmentId, "issues", { ...issueBody, version: 1 })).statusCode).toBe(201);
    expect((await outcome(s.customer, s.id, s.shipmentId, "receipt", { version: 0 })).json()).toMatchObject({ customerVersion: 2, issue: { status: "open" }, receipt: { source: "customer_confirmation" } });
  });
  it("serializes receipt/nonreceipt races and conflicting issue descriptions", async () => {
    const s = await dispatched();
    const r = await Promise.all([outcome(s.customer, s.id, s.shipmentId, "receipt", { version: 0 }), outcome(s.customer, s.id, s.shipmentId, "issues", { ...issueBody, kind: "not_received" })]);
    expect(r.map(v => v.statusCode).sort()).toEqual([201, 409]);
    const report = await db.artistShipmentReport.findUniqueOrThrow({ where: { id: s.shipmentId }, include: { receipt: true, issue: true } });
    expect(report.customerVersion).toBe(1); expect(Boolean(report.receipt) !== Boolean(report.issue)).toBe(true);
    const t = await dispatched();
    const issues = await Promise.all(["اول", "دوم"].map(description => outcome(t.customer, t.id, t.shipmentId, "issues", { ...issueBody, description })));
    expect(issues.map(v => v.statusCode).sort()).toEqual([201, 409]);
  });
  it("enforces account/order/role/paid gates, stale data and forbids server timestamp overrides", async () => {
    const s = await dispatched(), stranger = await signIn("customer");
    for (const action of ["receipt", "issues"]) {
      const body = action === "receipt" ? { version: 0 } : issueBody;
      expect((await outcome(stranger, s.id, s.shipmentId, action, body)).statusCode).toBe(404);
      expect((await outcome(s.customer, randomUUID(), s.shipmentId, action, body)).statusCode).toBe(404);
      expect((await outcome(s.customer, s.id, randomUUID(), action, body)).statusCode).toBe(404);
      expect((await outcome(s.a, s.id, s.shipmentId, action, body)).statusCode).toBe(403);
      expect((await outcome(await signIn("staff"), s.id, s.shipmentId, action, body)).statusCode).toBe(403);
      expect((await outcome(s.customer, s.id, s.shipmentId, action, { ...body, version: 1 })).statusCode).toBe(409);
      expect((await outcome(s.customer, s.id, s.shipmentId, action, { ...body, receivedAt: "2000-01-01" })).statusCode).toBe(400);
    }
    const path = "/api/v1/customer/orders/" + s.id + "/shipments/" + s.shipmentId;
    expect((await app.inject({ method: "GET", url: path, headers: stranger.headers })).statusCode).toBe(404);
    expect((await app.inject({ method: "GET", url: path })).statusCode).toBe(401);
    await db.customerOrder.update({ where: { id: s.id }, data: { status: "reserved", paymentStatus: "unpaid", paidAt: null } });
    expect((await outcome(s.customer, s.id, s.shipmentId, "receipt", { version: 0 })).statusCode).toBe(404);
  });
  it("rolls back outcome revision on receipt and issue persistence failures", async () => {
    for (const action of ["receipt", "issues"]) {
      const s = await dispatched(), name = "outcome_" + randomUUID().replaceAll("-", "");
      const table = action === "receipt" ? "customer_shipment_receipts" : "customer_shipment_issues";
      const body = action === "receipt" ? { version: 0 } : issueBody;
      await db.$executeRawUnsafe('CREATE FUNCTION "' + name + '"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."shipmentId" = ' + "'" + s.shipmentId + "'" + "::uuid THEN RAISE EXCEPTION 'outcome failure'; END IF; RETURN NEW; END $$");
      try {
        await db.$executeRawUnsafe('CREATE TRIGGER "' + name + '" BEFORE INSERT ON "' + table + '" FOR EACH ROW EXECUTE FUNCTION "' + name + '"()');
        try {
          expect((await outcome(s.customer, s.id, s.shipmentId, action, body)).statusCode).toBe(500);
          expect(await db.artistShipmentReport.findUniqueOrThrow({ where: { id: s.shipmentId }, include: { receipt: true, issue: true } })).toMatchObject({ customerVersion: 0, receipt: null, issue: null });
        } finally { await db.$executeRawUnsafe('DROP TRIGGER IF EXISTS "' + name + '" ON "' + table + '"'); }
      } finally { await db.$executeRawUnsafe('DROP FUNCTION IF EXISTS "' + name + '"()'); }
      expect((await outcome(s.customer, s.id, s.shipmentId, action, body)).statusCode).toBe(201);
    }
  });

  async function supportCase() {
    const s = await dispatched();
    expect((await outcome(s.customer, s.id, s.shipmentId, "issues", { ...issueBody, kind: "not_received" })).statusCode).toBe(201);
    return { ...s, staff: await signIn("staff", "orders") };
  }
  function supportChange(u: User, id: string, body: object) {
    return app.inject({ method: "POST", url: "/api/v1/admin/shipment-issues/" + id + "/status", headers: u.headers, payload: body });
  }
  const reviewBody = { version: 0, status: "in_review", summary: "در حال پیگیری" };
  const closeBody = { version: 1, status: "closed", resolution: "customer_follow_up_complete", summary: "پیگیری تکمیل شد، مشتری می‌تواند دریافت را تأیید کند" };
  it("supports review, closure and reopening with immutable accountable history and public summaries", async () => {
    const s = await supportCase();
    const r = await Promise.all([supportChange(s.staff, s.shipmentId, reviewBody), supportChange(s.staff, s.shipmentId, reviewBody)]);
    expect(r.map(v => v.statusCode)).toEqual([201, 201]); expect(r[0]!.json()).toEqual(r[1]!.json());
    expect((await supportChange(s.staff, s.shipmentId, closeBody)).json()).toMatchObject({ status: "closed", version: 2, resolution: closeBody.resolution, history: [{ actorUserId: s.staff.userId }, { actorUserId: s.staff.userId }] });
    const customer = await app.inject({ method: "GET", url: "/api/v1/customer/orders/" + s.id + "/shipments/" + s.shipmentId, headers: s.customer.headers });
    expect(customer.json().issue).toMatchObject({ status: "closed", version: 2, resolutionSummary: closeBody.summary });
    expect(customer.json().issue).not.toHaveProperty("history"); expect(customer.json().issue).not.toHaveProperty("actorUserId");
    expect((await get(s.a, s.id)).json().shipment.issue).toEqual(customer.json().issue);
    expect((await get(s.b, s.id)).json().shipment).toBeNull();
    expect((await supportChange(s.staff, s.shipmentId, { ...reviewBody, version: 2, summary: "بازگشایی" })).json()).toMatchObject({ status: "in_review", version: 3, resolution: null, resolutionSummary: null });
    expect(await db.shipmentIssueEvent.count({ where: { shipmentId: s.shipmentId } })).toBe(3);
    expect((await outcome(s.customer, s.id, s.shipmentId, "receipt", { version: 1 })).statusCode).toBe(409);
  });
  it("allows customer receipt only after follow-up closure, without creating a receipt or refund on staff action", async () => {
    const s = await supportCase();
    await supportChange(s.staff, s.shipmentId, reviewBody); await supportChange(s.staff, s.shipmentId, closeBody);
    expect(await db.customerShipmentReceipt.count({ where: { shipmentId: s.shipmentId } })).toBe(0);
    expect((await outcome(s.customer, s.id, s.shipmentId, "receipt", { version: 1 })).statusCode).toBe(201);
    expect(await db.customerOrder.findUniqueOrThrow({ where: { id: s.id } })).toMatchObject({ paymentStatus: "paid", status: "placed", version: 1 });
    const t = await supportCase();
    await supportChange(t.staff, t.shipmentId, reviewBody);
    expect((await supportChange(t.staff, t.shipmentId, { ...closeBody, resolution: "referred_for_refund_review" })).statusCode).toBe(201);
    expect((await outcome(t.customer, t.id, t.shipmentId, "receipt", { version: 1 })).statusCode).toBe(409);
    expect(await db.artistProduct.findUniqueOrThrow({ where: { id: t.products[0]!.id } })).toMatchObject({ stockQuantity: 9, inventoryVersion: 1 });
  });
  it("limits support to the orders domain and bounds queue filters and pagination", async () => {
    const s = await supportCase(), path = "/api/v1/admin/shipment-issues";
    for (const u of [s.a, s.customer, await signIn("staff"), await signIn("staff", "finance")]) {
      expect((await app.inject({ method: "GET", url: path, headers: u.headers })).statusCode).toBe(403);
      expect((await supportChange(u, s.shipmentId, reviewBody)).statusCode).toBe(403);
    }
    const page = await app.inject({ method: "GET", url: path + "?status=open&pageSize=50", headers: s.staff.headers });
    expect(page.statusCode).toBe(200); expect(page.headers["cache-control"]).toBe("no-store");
    expect(page.json().items.some((i: { shipmentId: string }) => i.shipmentId === s.shipmentId)).toBe(true);
    expect(page.json().items.every((i: { status: string }) => i.status === "open")).toBe(true);
    for (const q of ["status=refunded", "pageSize=51", "userId=other"]) expect((await app.inject({ method: "GET", url: path + "?" + q, headers: s.staff.headers })).statusCode).toBe(400);
    expect((await supportChange(s.staff, randomUUID(), reviewBody)).statusCode).toBe(404);
  });
  it("rejects skipped/stale transitions and serializes competing staff decisions", async () => {
    const s = await supportCase();
    expect((await supportChange(s.staff, s.shipmentId, { ...closeBody, version: 0 })).statusCode).toBe(409);
    const other = await signIn("staff", "orders");
    const r = await Promise.all([supportChange(s.staff, s.shipmentId, reviewBody), supportChange(other, s.shipmentId, reviewBody)]);
    expect(r.map(v => v.statusCode).sort()).toEqual([201, 409]);
    expect((await supportChange(s.staff, s.shipmentId, { ...reviewBody, version: 1 })).statusCode).toBe(409);
    expect((await supportChange(s.staff, s.shipmentId, closeBody)).statusCode).toBe(201);
    expect((await supportChange(s.staff, s.shipmentId, reviewBody)).statusCode).toBe(409);
  });
  it("rolls back support state and receipt eligibility when audit persistence fails", async () => {
    const s = await supportCase(), name = "support_" + randomUUID().replaceAll("-", "");
    await supportChange(s.staff, s.shipmentId, reviewBody);
    await db.$executeRawUnsafe('CREATE FUNCTION "' + name + '"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."shipmentId" = ' + "'" + s.shipmentId + "'" + "::uuid THEN RAISE EXCEPTION 'support audit failure'; END IF; RETURN NEW; END $$");
    try {
      await db.$executeRawUnsafe('CREATE TRIGGER "' + name + '" BEFORE INSERT ON "shipment_issue_events" FOR EACH ROW EXECUTE FUNCTION "' + name + '"()');
      try {
        expect((await supportChange(s.staff, s.shipmentId, closeBody)).statusCode).toBe(500);
        expect(await db.customerShipmentIssue.findUniqueOrThrow({ where: { shipmentId: s.shipmentId } })).toMatchObject({ status: "in_review", version: 1, resolution: null });
        expect((await outcome(s.customer, s.id, s.shipmentId, "receipt", { version: 1 })).statusCode).toBe(409);
      } finally { await db.$executeRawUnsafe('DROP TRIGGER IF EXISTS "' + name + '" ON "shipment_issue_events"'); }
    } finally { await db.$executeRawUnsafe('DROP FUNCTION IF EXISTS "' + name + '"()'); }
    expect((await supportChange(s.staff, s.shipmentId, closeBody)).statusCode).toBe(201);
  });

  async function refundCase(proof = true) {
    const s = await supportCase(), finance = await signIn("staff", "finance");
    await supportChange(s.staff, s.shipmentId, reviewBody);
    await supportChange(s.staff, s.shipmentId, { ...closeBody, resolution: "referred_for_refund_review" });
    if (proof) {
      // CI-only server-verified payment fixture; no fake gateway is enabled in the application.
      await db.orderPayableQuote.create({ data: { orderId: s.id, createdByUserId: finance.userId, shippingFeeToman: "0", payableToman: "18014398509481986", sourceReference: "CI-payment-fixture", expiresAt: new Date(Date.now() + 60000) } });
      await db.paymentAttempt.create({ data: { orderId: s.id, idempotencyKey: randomUUID(), requestHash: "ci-proof", provider: "ci-only", providerReference: randomUUID(), amountToman: "18014398509481986", status: "succeeded",
        receipt: { create: { provider: "ci-only", transactionReference: randomUUID(), amount: "18014398509481986", unit: "toman" } } } });
    }
    return { ...s, finance };
  }
  function refund(u: User, id: string, body: object) {
    return app.inject({ method: "POST", url: "/api/v1/admin/refund-reviews/" + id, headers: u.headers, payload: body });
  }
  const approveBody = { issueVersion: 2, decision: "approved", amountToman: "9007199254740993", reason: "تأیید مبلغ اقلام" };
  it("approves exact merchandise amounts once, exposes nonexecuted status and freezes support reopening", async () => {
    const s = await refundCase();
    const r = await Promise.all([refund(s.finance, s.shipmentId, approveBody), refund(s.finance, s.shipmentId, approveBody)]);
    expect(r.map(v => v.statusCode)).toEqual([201, 201]); expect(r[0]!.json()).toEqual(r[1]!.json());
    expect(r[0]!.json()).toMatchObject({ merchandiseSubtotalToman: "9007199254740993", reviews: [{ amountToman: "9007199254740993", executionStatus: "not_executed" }] });
    expect(await db.shipmentRefundReview.count({ where: { shipmentId: s.shipmentId } })).toBe(1);
    const customer = await app.inject({ method: "GET", url: "/api/v1/customer/orders/" + s.id + "/shipments/" + s.shipmentId, headers: s.customer.headers });
    expect(customer.json().issue.refundReview).toMatchObject({ decision: "approved", amountToman: "9007199254740993", executionStatus: "not_executed" });
    expect(customer.json().issue.refundReview).not.toHaveProperty("reason"); expect(customer.json().issue.refundReview).not.toHaveProperty("actorUserId");
    expect((await supportChange(s.staff, s.shipmentId, { ...reviewBody, version: 2 })).statusCode).toBe(409);
    expect(await db.customerOrder.findUniqueOrThrow({ where: { id: s.id } })).toMatchObject({ paymentStatus: "paid", status: "placed", version: 1 });
    expect(await db.artistProduct.findUniqueOrThrow({ where: { id: s.products[0]!.id } })).toMatchObject({ stockQuantity: 9, inventoryVersion: 1 });
  });
  it("rejects missing payment evidence, excess amount and stale referral revision", async () => {
    const s = await refundCase(false);
    expect((await refund(s.finance, s.shipmentId, approveBody)).statusCode).toBe(409);
    const t = await refundCase();
    expect((await refund(t.finance, t.shipmentId, { ...approveBody, amountToman: "9007199254740994" })).statusCode).toBe(409);
    expect((await refund(t.finance, t.shipmentId, { ...approveBody, issueVersion: 1 })).statusCode).toBe(409);
    await supportChange(t.staff, t.shipmentId, { ...reviewBody, version: 2 });
    expect((await refund(t.finance, t.shipmentId, { ...approveBody, issueVersion: 3 })).statusCode).toBe(409);
  });
  it("records rejection without an amount and retains decisions across support reopening", async () => {
    const s = await refundCase();
    const rejected = { issueVersion: 2, decision: "rejected", reason: "مدارک کافی نیست" };
    expect((await refund(s.finance, s.shipmentId, rejected)).statusCode).toBe(201);
    expect((await refund(s.finance, s.shipmentId, rejected)).statusCode).toBe(201);
    expect((await supportChange(s.staff, s.shipmentId, { ...reviewBody, version: 2 })).statusCode).toBe(201);
    expect((await supportChange(s.staff, s.shipmentId, { ...closeBody, version: 3, resolution: "referred_for_refund_review" })).statusCode).toBe(201);
    expect((await refund(s.finance, s.shipmentId, { ...approveBody, issueVersion: 4 })).json().reviews).toHaveLength(2);
  });
  it("enforces finance-only access, bounded queue and one competing decision", async () => {
    const s = await refundCase(), path = "/api/v1/admin/refund-reviews";
    for (const u of [s.staff, s.customer, s.a, await signIn("staff")]) {
      expect((await refund(u, s.shipmentId, approveBody)).statusCode).toBe(403);
      expect((await app.inject({ method: "GET", url: path, headers: u.headers })).statusCode).toBe(403);
    }
    expect((await app.inject({ method: "GET", url: path + "?pageSize=51", headers: s.finance.headers })).statusCode).toBe(400);
    expect((await app.inject({ method: "GET", url: path + "?pageSize=50", headers: s.finance.headers })).json().items.some((i: { shipmentId: string }) => i.shipmentId === s.shipmentId)).toBe(true);
    const other = await signIn("staff", "finance");
    const r = await Promise.all([refund(s.finance, s.shipmentId, approveBody), refund(other, s.shipmentId, { issueVersion: 2, decision: "rejected", reason: "نیاز به بررسی" })]);
    expect(r.map(v => v.statusCode).sort()).toEqual([201, 409]);
  });
  it("rolls back failed review persistence, leaving support reopening and retry intact", async () => {
    const s = await refundCase(), name = "refund_" + randomUUID().replaceAll("-", "");
    await db.$executeRawUnsafe('CREATE FUNCTION "' + name + '"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."shipmentId" = ' + "'" + s.shipmentId + "'" + "::uuid THEN RAISE EXCEPTION 'refund persistence failure'; END IF; RETURN NEW; END $$");
    try {
      await db.$executeRawUnsafe('CREATE TRIGGER "' + name + '" BEFORE INSERT ON "shipment_refund_reviews" FOR EACH ROW EXECUTE FUNCTION "' + name + '"()');
      try {
        expect((await refund(s.finance, s.shipmentId, approveBody)).statusCode).toBe(500);
        expect(await db.shipmentRefundReview.count({ where: { shipmentId: s.shipmentId } })).toBe(0);
      } finally { await db.$executeRawUnsafe('DROP TRIGGER IF EXISTS "' + name + '" ON "shipment_refund_reviews"'); }
    } finally { await db.$executeRawUnsafe('DROP FUNCTION IF EXISTS "' + name + '"()'); }
    expect((await refund(s.finance, s.shipmentId, approveBody)).statusCode).toBe(201);
  });

  it("refuses inconsistent payment receipt unit, amount or provider", async () => {
    const s = await refundCase();
    const p = await db.paymentAttempt.findFirstOrThrow({ where: { orderId: s.id }, include: { receipt: true } });
    const where = { id: p.receipt!.id };
    for (const data of [{ unit: "rial" }, { unit: "toman", amount: "1" }, { amount: p.amountToman, provider: "different-provider" }]) {
      await db.paymentReceipt.update({ where, data });
      expect((await refund(s.finance, s.shipmentId, approveBody)).statusCode).toBe(409);
    }
    expect(await db.shipmentRefundReview.count({ where: { shipmentId: s.shipmentId } })).toBe(0);
    await db.paymentReceipt.update({ where, data: { provider: p.provider } });
    expect((await refund(s.finance, s.shipmentId, approveBody)).statusCode).toBe(201);
  });

});
