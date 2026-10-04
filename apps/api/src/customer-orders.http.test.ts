import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { CustomerOrdersService } from "./customer-orders.js";
import { PrismaService } from "./prisma.service.js";

describe("Customer orders HTTP and PostgreSQL concurrency", () => {
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
      data: { userId: user.userId, role, ...(role === "staff" ? { staffDomains: { create: [{ domain: "products" }] } } : {}) }
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
  const addressFields = { recipientName: "نگار", recipientPhone: "09123456789", province: "تهران", city: "تهران", postalCode: "1967654321", fullAddress: "خیابان نگار، پلاک ۲" };
  async function setup(p?: Awaited<ReturnType<typeof product>>, quantity = 2) {
    const user = await signIn("customer"); p ??= await product();
    const address = await app.inject({ method: "POST", url: "/api/v1/customer/addresses", headers: user.headers, payload: { ...addressFields, version: 0 } });
    expect(address.statusCode).toBe(201);
    const cart = await app.inject({ method: "PUT", url: `/api/v1/customer/cart/items/${p.id}`, headers: user.headers, payload: { version: 0, quantity } });
    expect(cart.statusCode).toBe(200);
    return { user, p, body: { cartVersion: 1, addressBookVersion: 1, addressId: address.json().addresses[0].id, idempotencyKey: randomUUID(), expectedSubtotalToman: (p.priceToman * BigInt(quantity)).toString() } };
  }
  function checkout(user: User, body: object) { return app.inject({ method: "POST", url: "/api/v1/customer/orders", headers: user.headers, payload: body }); }
  function get(user: User, id: string) { return app.inject({ method: "GET", url: `/api/v1/customer/orders/${id}`, headers: user.headers }); }
  function cancel(user: User, id: string, version = 0) { return app.inject({ method: "POST", url: `/api/v1/customer/orders/${id}/cancel`, headers: user.headers, payload: { version } }); }
  beforeAll(async () => { app = await createApplication(); await app.init(); await app.getHttpAdapter().getInstance().ready(); await database.$connect(); });
  afterAll(async () => { await app?.close(); await database.$disconnect(); });

  it("reserves exact prices, clears the cart atomically and preserves address/content snapshots", async () => {
    const { user, p, body } = await setup(await product({ priceToman: 9007199254740993n }));
    const response = await checkout(user, body); expect(response.statusCode).toBe(201); expect(response.headers["cache-control"]).toBe("no-store");
    const order = response.json(); expect(order).toMatchObject({ version: 0, status: "reserved", subtotalToman: "18014398509481986", shippingAddress: { ...addressFields, recipientPhone: "+989123456789" }, items: [{ quantity: 2, unitPriceToman: "9007199254740993", lineSubtotalToman: "18014398509481986" }] });
    expect(order).not.toHaveProperty("userId"); expect(order).not.toHaveProperty("requestHash"); expect(order).not.toHaveProperty("totalToman");
    expect(new Date(order.reservedUntil).getTime() - new Date(order.createdAt).getTime()).toBeGreaterThan(1700000);
    expect(await database.artistProduct.findUniqueOrThrow({ where: { id: p.id } })).toMatchObject({ stockQuantity: 98, inventoryVersion: 1 });
    expect(await database.productInventoryEvent.findFirstOrThrow({ where: { orderId: order.id } })).toMatchObject({ actorUserId: user.userId, previousQuantity: 100, stockQuantity: 98, reason: "order-reserved" });
    expect((await app.inject({ method: "GET", url: "/api/v1/customer/cart", headers: user.headers })).json()).toMatchObject({ version: 2, items: [] });
    await database.artistProduct.update({ where: { id: p.id }, data: { title: "عنوان جدید", priceToman: 1n, archivedAt: new Date() } });
    await app.inject({ method: "DELETE", url: `/api/v1/customer/addresses/${body.addressId}`, headers: user.headers, payload: { version: 1 } });
    expect((await get(user, order.id)).json()).toEqual(order);
    expect((await checkout(user, body)).json()).toEqual(order);
    expect(await database.customerOrder.count({ where: { userId: user.userId } })).toBe(1);
  });

  it("serializes same-key retries and rejects reuse with changed payload", async () => {
    const { user, p, body } = await setup();
    const responses = await Promise.all([checkout(user, body), checkout(user, body), checkout(user, body)]);
    expect(responses.every(r => r.statusCode === 201)).toBe(true);
    expect(new Set(responses.map(r => r.json().id)).size).toBe(1);
    expect(await database.artistProduct.findUniqueOrThrow({ where: { id: p.id } })).toMatchObject({ stockQuantity: 98, inventoryVersion: 1 });
    expect((await checkout(user, { ...body, expectedSubtotalToman: "1" })).statusCode).toBe(409);
    expect((await checkout(user, { ...body, idempotencyKey: randomUUID() })).statusCode).toBe(409);
  });

  it("never oversells the last unit across separate customer carts", async () => {
    const p = await product({ stockQuantity: 1 }); const a = await setup(p, 1), b = await setup(p, 1);
    const responses = await Promise.all([checkout(a.user, a.body), checkout(b.user, b.body)]);
    expect(responses.map(r => r.statusCode).sort()).toEqual([201, 409]);
    expect(await database.artistProduct.findUniqueOrThrow({ where: { id: p.id } })).toMatchObject({ stockQuantity: 0, inventoryVersion: 1 });
    const loser = responses[0]!.statusCode === 409 ? a : b;
    expect((await app.inject({ method: "GET", url: "/api/v1/customer/cart", headers: loser.user.headers })).json()).toMatchObject({ version: 1, items: [{ quantity: 1 }] });
  });

  it("rejects changed price/cart/address and unavailable products without consuming stock", async () => {
    const { user, p, body } = await setup();
    expect((await checkout(user, { ...body, expectedSubtotalToman: "1" })).statusCode).toBe(409);
    expect((await checkout(user, { ...body, cartVersion: 0 })).statusCode).toBe(409);
    expect((await checkout(user, { ...body, addressBookVersion: 0 })).statusCode).toBe(409);
    await database.artistProduct.update({ where: { id: p.id }, data: { priceToman: 150000n } });
    expect((await checkout(user, body)).statusCode).toBe(409);
    await database.artistProduct.update({ where: { id: p.id }, data: { priceToman: 100000n } });
    expect((await app.inject({ method: "PUT", url: `/api/v1/customer/addresses/${body.addressId}`, headers: user.headers, payload: { ...addressFields, version: 1, city: "کرج" } })).statusCode).toBe(200);
    expect((await checkout(user, body)).statusCode).toBe(409);
    const current = { ...body, addressBookVersion: 2 };
    const other = await setup(p);
    expect((await checkout(user, { ...current, addressId: other.body.addressId })).statusCode).toBe(404);
    await database.artistProduct.update({ where: { id: p.id }, data: { publicationStatus: "draft" } });
    expect((await checkout(user, current)).statusCode).toBe(409);
    expect(await database.customerOrder.count({ where: { userId: user.userId } })).toBe(0);
    expect(await database.artistProduct.findUniqueOrThrow({ where: { id: p.id } })).toMatchObject({ stockQuantity: 100, inventoryVersion: 0 });
    expect((await app.inject({ method: "GET", url: "/api/v1/customer/cart", headers: user.headers })).json().version).toBe(1);
  });

  it("isolates orders and denies other roles, unknown fields and malformed queries", async () => {
    const { user, body } = await setup(); const order = (await checkout(user, body)).json(); const other = await signIn("customer");
    expect((await get(other, order.id)).statusCode).toBe(404); expect((await cancel(other, order.id)).statusCode).toBe(404);
    expect((await app.inject({ method: "GET", url: "/api/v1/customer/orders", headers: other.headers })).json().items).toEqual([]);
    for (const role of ["artist", "staff"] as const) { const denied = await signIn(role); expect((await checkout(denied, body)).statusCode).toBe(403); expect((await get(denied, order.id)).statusCode).toBe(403); expect((await cancel(denied, order.id)).statusCode).toBe(403); }
    expect((await app.inject({ method: "GET", url: "/api/v1/customer/orders" })).statusCode).toBe(401);
    expect((await checkout(user, { ...body, userId: other.userId })).statusCode).toBe(400);
    expect((await app.inject({ method: "GET", url: "/api/v1/customer/orders?pageSize=51", headers: user.headers })).statusCode).toBe(400);
    expect((await app.inject({ method: "GET", url: "/api/v1/customer/orders?userId=other", headers: user.headers })).statusCode).toBe(400);
    expect((await get(user, "invalid")).statusCode).toBe(400);
  });

  it("cancels concurrently once, restores stock after artist restocking and remains replayable", async () => {
    const { user, p, body } = await setup(); const order = (await checkout(user, body)).json();
    expect((await cancel(user, order.id, 1)).statusCode).toBe(409);
    const artist = await database.identityUser.findUniqueOrThrow({ where: { id: p.artistUserId } });
    const later = new Date(Date.now() + 61000); await identity.requestCode(artist.phone, later); const session = await identity.verifyCode(artist.phone, codes.get(artist.phone)!, later);
    const grant = await database.roleGrant.findFirstOrThrow({ where: { userId: artist.id, role: "artist" } }); await contexts.select(session.sessionToken, grant.id);
    expect((await app.inject({ method: "PATCH", url: `/api/v1/artist/products/${p.id}/inventory`, headers: { authorization: `Bearer ${session.sessionToken}` }, payload: { stockQuantity: 103, inventoryVersion: 1 } })).statusCode).toBe(200);
    await database.artistProduct.update({ where: { id: p.id }, data: { archivedAt: new Date() } });
    const responses = await Promise.all([cancel(user, order.id), cancel(user, order.id)]);
    expect(responses.every(r => r.statusCode === 201 && r.json().status === "cancelled" && r.json().version === 1)).toBe(true);
    expect(await database.artistProduct.findUniqueOrThrow({ where: { id: p.id } })).toMatchObject({ stockQuantity: 105, inventoryVersion: 3 });
    expect(await database.productInventoryEvent.count({ where: { orderId: order.id, reason: "order-cancelled" } })).toBe(1);
    expect((await checkout(user, body)).json().status).toBe("cancelled");
  });

  it("expires reservations on reads or internal batch processing without double release", async () => {
    const a = await setup(); const oa = (await checkout(a.user, a.body)).json();
    await database.customerOrder.update({ where: { id: oa.id }, data: { reservedUntil: new Date(Date.now() - 1000) } });
    expect((await get(a.user, oa.id)).json()).toMatchObject({ status: "expired", version: 1 });
    expect(await database.productInventoryEvent.findFirstOrThrow({ where: { orderId: oa.id, reason: "order-expired" } })).toMatchObject({ actorUserId: null });
    const b = await setup(); const ob = (await checkout(b.user, b.body)).json();
    await database.customerOrder.update({ where: { id: ob.id }, data: { reservedUntil: new Date(Date.now() - 1000) } });
    await Promise.all([app.get(CustomerOrdersService).expirePending(), cancel(b.user, ob.id)]);
    expect((await checkout(b.user, b.body)).json().status).toBe("expired");
    expect(await database.artistProduct.findUniqueOrThrow({ where: { id: b.p.id } })).toMatchObject({ stockQuantity: 100, inventoryVersion: 2 });
    expect(await database.productInventoryEvent.count({ where: { orderId: ob.id, reason: "order-expired" } })).toBe(1);
    await app.get(CustomerOrdersService).expirePending();
    expect(await database.productInventoryEvent.count({ where: { orderId: ob.id } })).toBe(2);
  });

  it("rolls back multi-product stock, audit, cart and order if a later reservation audit fails", async () => {
    const a = await setup(); const p2 = await product();
    const put = await app.inject({ method: "PUT", url: `/api/v1/customer/cart/items/${p2.id}`, headers: a.user.headers, payload: { version: 1, quantity: 1 } }); expect(put.statusCode).toBe(200);
    const lastId = [a.p.id, p2.id].sort()[1]!; const name = "order_test_" + randomUUID().replaceAll("-", "");
    await database.$executeRawUnsafe(`CREATE FUNCTION "${name}"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."productId" = '${lastId}'::uuid AND NEW."reason" = 'order-reserved' THEN RAISE EXCEPTION 'order audit test failure'; END IF; RETURN NEW; END $$`);
    try { await database.$executeRawUnsafe(`CREATE TRIGGER "${name}" BEFORE INSERT ON "product_inventory_events" FOR EACH ROW EXECUTE FUNCTION "${name}"()`);
      try {
        const response = await checkout(a.user, { ...a.body, cartVersion: 2, expectedSubtotalToman: "300000" }); expect(response.statusCode).toBe(500);
        expect(await database.customerOrder.count({ where: { userId: a.user.userId } })).toBe(0);
        for (const id of [a.p.id, p2.id]) { expect(await database.artistProduct.findUniqueOrThrow({ where: { id } })).toMatchObject({ stockQuantity: 100, inventoryVersion: 0 }); expect(await database.productInventoryEvent.count({ where: { productId: id } })).toBe(0); }
        expect((await app.inject({ method: "GET", url: "/api/v1/customer/cart", headers: a.user.headers })).json()).toMatchObject({ version: 2 });
        expect((await app.inject({ method: "GET", url: "/api/v1/customer/cart", headers: a.user.headers })).json().items).toHaveLength(2);
      } finally { await database.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "${name}" ON "product_inventory_events"`); }
    } finally { await database.$executeRawUnsafe(`DROP FUNCTION IF EXISTS "${name}"()`); }
  });

  it("rolls back failed release completely and allows a later safe retry", async () => {
    const a = await setup(); const order = (await checkout(a.user, a.body)).json();
    const name = "release_test_" + randomUUID().replaceAll("-", "");
    await database.$executeRawUnsafe(`CREATE FUNCTION "${name}"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."orderId" = '${order.id}'::uuid AND NEW."reason" = 'order-cancelled' THEN RAISE EXCEPTION 'release audit test failure'; END IF; RETURN NEW; END $$`);
    try { await database.$executeRawUnsafe(`CREATE TRIGGER "${name}" BEFORE INSERT ON "product_inventory_events" FOR EACH ROW EXECUTE FUNCTION "${name}"()`);
      try {
        expect((await cancel(a.user, order.id)).statusCode).toBe(500);
        expect((await get(a.user, order.id)).json()).toMatchObject({ version: 0, status: "reserved", releasedAt: null });
        expect(await database.artistProduct.findUniqueOrThrow({ where: { id: a.p.id } })).toMatchObject({ stockQuantity: 98, inventoryVersion: 1 });
        expect(await database.productInventoryEvent.count({ where: { orderId: order.id } })).toBe(1);
      } finally { await database.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "${name}" ON "product_inventory_events"`); }
    } finally { await database.$executeRawUnsafe(`DROP FUNCTION IF EXISTS "${name}"()`); }
    expect((await cancel(a.user, order.id)).json()).toMatchObject({ version: 1, status: "cancelled" });
    expect(await database.artistProduct.findUniqueOrThrow({ where: { id: a.p.id } })).toMatchObject({ stockQuantity: 100, inventoryVersion: 2 });
  });

  it("continues the expiry batch after one failed release and retries it later", async () => {
    const a = await setup(), b = await setup(); const oa = (await checkout(a.user, a.body)).json(), ob = (await checkout(b.user, b.body)).json();
    await database.customerOrder.updateMany({ where: { id: { in: [oa.id, ob.id] } }, data: { reservedUntil: new Date(Date.now() - 1000) } });
    const name = "expiry_test_" + randomUUID().replaceAll("-", "");
    await database.$executeRawUnsafe(`CREATE FUNCTION "${name}"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."orderId" = '${oa.id}'::uuid AND NEW."reason" = 'order-expired' THEN RAISE EXCEPTION 'expiry audit test failure'; END IF; RETURN NEW; END $$`);
    try { await database.$executeRawUnsafe(`CREATE TRIGGER "${name}" BEFORE INSERT ON "product_inventory_events" FOR EACH ROW EXECUTE FUNCTION "${name}"()`);
      try {
        expect((await app.get(CustomerOrdersService).expirePending()).failed).toBe(1);
        expect(await database.customerOrder.findUniqueOrThrow({ where: { id: oa.id } })).toMatchObject({ status: "reserved", version: 0 });
        expect(await database.customerOrder.findUniqueOrThrow({ where: { id: ob.id } })).toMatchObject({ status: "expired", version: 1 });
        expect(await database.artistProduct.findUniqueOrThrow({ where: { id: a.p.id } })).toMatchObject({ stockQuantity: 98, inventoryVersion: 1 });
        expect(await database.artistProduct.findUniqueOrThrow({ where: { id: b.p.id } })).toMatchObject({ stockQuantity: 100, inventoryVersion: 2 });
      } finally { await database.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "${name}" ON "product_inventory_events"`); }
    } finally { await database.$executeRawUnsafe(`DROP FUNCTION IF EXISTS "${name}"()`); }
    expect((await app.get(CustomerOrdersService).expirePending()).failed).toBe(0);
    expect((await get(a.user, oa.id)).json()).toMatchObject({ status: "expired", version: 1 });
  });

  it("lists only account orders with bounded stable pagination", async () => {
    const a = await setup(); const first = (await checkout(a.user, a.body)).json();
    await app.inject({ method: "PUT", url: `/api/v1/customer/cart/items/${a.p.id}`, headers: a.user.headers, payload: { version: 2, quantity: 1 } });
    const second = (await checkout(a.user, { ...a.body, cartVersion: 3, idempotencyKey: randomUUID(), expectedSubtotalToman: "100000" })).json();
    const page1 = (await app.inject({ method: "GET", url: "/api/v1/customer/orders?pageSize=1", headers: a.user.headers })).json();
    expect(page1).toMatchObject({ hasMore: true, items: [{ id: second.id }] });
    const page2 = (await app.inject({ method: "GET", url: "/api/v1/customer/orders?pageSize=1&page=2", headers: a.user.headers })).json(); expect(page2).toMatchObject({ hasMore: false, items: [{ id: first.id }] });
  });
});
