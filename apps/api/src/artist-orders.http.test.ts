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
  async function signIn(role: "artist" | "customer" | "staff" = "artist") {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone); const u = await identity.verifyCode(phone, codes.get(phone)!);
    const g = await db.roleGrant.create({ data: { userId: u.userId, role } }); await contexts.select(u.sessionToken, g.id);
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
});
