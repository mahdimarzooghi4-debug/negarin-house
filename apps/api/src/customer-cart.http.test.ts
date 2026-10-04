import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("Customer cart HTTP and PostgreSQL concurrency", () => {
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
  type Customer = Awaited<ReturnType<typeof signIn>>;
  function get(user: Customer) { return app.inject({ method: "GET", url: "/api/v1/customer/cart", headers: user.headers }); }
  function put(user: Customer, id: string, quantity: number, version: number) {
    return app.inject({ method: "PUT", url: `/api/v1/customer/cart/items/${id}`, headers: user.headers, payload: { quantity, version } });
  }
  function remove(user: Customer, id: string, version: number) {
    return app.inject({ method: "DELETE", url: `/api/v1/customer/cart/items/${id}`, headers: user.headers, payload: { version } });
  }

  beforeAll(async () => {
    app = await createApplication();
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    await database.$connect();
  });
  afterAll(async () => { await app?.close(); await database.$disconnect(); });

  it("persists quantities across sessions, computes live exact prices and never reserves stock", async () => {
    const customer = await signIn("customer"); const p = await product({ priceToman: 9007199254740993n });
    expect((await get(customer)).json()).toEqual({ version: 0, items: [], subtotalToman: "0", canCheckout: false });
    const add = await put(customer, p.id, 2, 0);
    expect(add.statusCode).toBe(200); expect(add.headers["cache-control"]).toBe("no-store");
    expect(add.json()).toMatchObject({ version: 1, subtotalToman: "18014398509481986", canCheckout: true });
    expect((await put(customer, p.id, 2, 1)).json().version).toBe(1);
    expect((await put(customer, p.id, 3, 1)).json().version).toBe(2);
    await database.artistProduct.update({ where: { id: p.id }, data: { priceToman: 200000n } });
    expect((await get(customer)).json()).toMatchObject({ version: 2, subtotalToman: "600000" });
    expect(await database.artistProduct.findUniqueOrThrow({ where: { id: p.id } })).toMatchObject({ stockQuantity: 100, inventoryVersion: 0 });
    expect(await database.productInventoryEvent.count({ where: { productId: p.id } })).toBe(0);
    const phone = (await database.identityUser.findUniqueOrThrow({ where: { id: customer.userId } })).phone;
    const later = new Date(Date.now() + 61_000);
    await identity.requestCode(phone, later); const session = await identity.verifyCode(phone, codes.get(phone)!, later);
    const grant = await database.roleGrant.findFirstOrThrow({ where: { userId: customer.userId, role: "customer" } });
    await contexts.select(session.sessionToken, grant.id);
    expect((await get({ userId: customer.userId, headers: { authorization: `Bearer ${session.sessionToken}` } })).json().items[0].quantity).toBe(3);
    expect((await remove(customer, p.id, 2)).json()).toMatchObject({ version: 3, items: [], subtotalToman: "0" });
    expect((await remove(customer, p.id, 3)).json().version).toBe(3);
  });

  it("shares one cart across concurrent first visits", async () => {
    const customer = await signIn("customer");
    const visits = await Promise.all([get(customer), get(customer), get(customer)]);
    expect(visits.map((r) => r.statusCode)).toEqual([200, 200, 200]);
    expect(visits.every((r) => r.json().version === 0 && r.json().items.length === 0)).toBe(true);
    expect(await database.customerCart.count({ where: { userId: customer.userId } })).toBe(1);
  });

  it("isolates accounts and denies non-Customer contexts and client-supplied ownership/prices", async () => {
    const customer = await signIn("customer"), other = await signIn("customer"); const p = await product();
    await put(customer, p.id, 1, 0);
    expect((await get(other)).json().items).toEqual([]);
    expect((await remove(other, p.id, 0)).json().items).toEqual([]);
    expect((await get(customer)).json().items).toHaveLength(1);
    for (const role of ["artist", "staff"] as const) {
      const user = await signIn(role);
      expect((await get(user)).statusCode).toBe(403); expect((await put(user, p.id, 1, 0)).statusCode).toBe(403);
    }
    expect((await app.inject({ method: "GET", url: "/api/v1/customer/cart" })).statusCode).toBe(401);
    expect((await app.inject({ method: "PUT", url: `/api/v1/customer/cart/items/${p.id}`, headers: customer.headers,
      payload: { version: 1, quantity: 1, priceToman: "1", userId: other.userId } })).statusCode).toBe(400);
    expect((await app.inject({ method: "GET", url: `/api/v1/customer/cart?userId=${other.userId}`, headers: customer.headers })).statusCode).toBe(400);
  });

  it("blocks unavailable additions and reports stock or visibility changes without leaking hidden content", async () => {
    const customer = await signIn("customer"); const p = await product();
    const draft = await product({ publicationStatus: "draft" });
    expect((await put(customer, draft.id, 1, 0)).statusCode).toBe(404);
    expect((await put(customer, randomUUID(), 1, 0)).statusCode).toBe(404);
    expect((await put(customer, p.id, 101, 0)).statusCode).toBe(400);
    await put(customer, p.id, 5, 0);
    await database.artistProduct.update({ where: { id: p.id }, data: { stockQuantity: 3 } });
    expect((await get(customer)).json()).toMatchObject({ canCheckout: false, items: [{ status: "insufficient_stock" }] });
    expect((await put(customer, p.id, 5, 1)).statusCode).toBe(409);
    await database.artistProduct.update({ where: { id: p.id }, data: { stockQuantity: 0 } });
    expect((await get(customer)).json().items[0].status).toBe("out_of_stock");
    await database.artistProduct.update({ where: { id: p.id }, data: { archivedAt: new Date(), title: "PRIVATE NEW TITLE", priceToman: 1n } });
    const hidden = (await get(customer)).json();
    expect(hidden).toMatchObject({ version: 1, canCheckout: false, subtotalToman: null, items: [{ product: null, status: "unavailable" }] });
    expect(JSON.stringify(hidden)).not.toContain("PRIVATE NEW TITLE");
    expect((await put(customer, p.id, 1, 1)).statusCode).toBe(404);
    expect((await remove(customer, p.id, 1)).json().version).toBe(2);
  });

  it("allows only one concurrent mutation and rejects stale removals/clear", async () => {
    const customer = await signIn("customer"); const p = await product(); await get(customer);
    const results = await Promise.all([put(customer, p.id, 1, 0), put(customer, p.id, 2, 0)]);
    expect(results.map((r) => r.statusCode).sort()).toEqual([200, 409]);
    const state = (await get(customer)).json(); expect(state.version).toBe(1); expect(state.items).toHaveLength(1);
    expect((await remove(customer, p.id, 0)).statusCode).toBe(409);
    expect((await app.inject({ method: "DELETE", url: "/api/v1/customer/cart", headers: customer.headers, payload: { version: 0 } })).statusCode).toBe(409);
    const clear = await app.inject({ method: "DELETE", url: "/api/v1/customer/cart", headers: customer.headers, payload: { version: 1 } });
    expect(clear.json()).toMatchObject({ version: 2, items: [] });
  });

  it("rolls back the revision when inserting a cart item fails", async () => {
    const customer = await signIn("customer"), p = await product(); await get(customer);
    const cart = await database.customerCart.findUniqueOrThrow({ where: { userId: customer.userId } });
    const name = "cart_test_" + randomUUID().replaceAll("-", "");
    await database.$executeRawUnsafe(`CREATE FUNCTION "${name}"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."cartId" = '${cart.id}'::uuid THEN RAISE EXCEPTION 'cart item test failure'; END IF; RETURN NEW; END $$`);
    try {
      await database.$executeRawUnsafe(`CREATE TRIGGER "${name}" BEFORE INSERT ON "cart_items" FOR EACH ROW EXECUTE FUNCTION "${name}"()`);
      try {
        expect((await put(customer, p.id, 1, 0)).statusCode).toBe(500);
        expect((await get(customer)).json()).toMatchObject({ version: 0, items: [] });
      } finally { await database.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "${name}" ON "cart_items"`); }
    } finally { await database.$executeRawUnsafe(`DROP FUNCTION IF EXISTS "${name}"()`); }
  });

  it("enforces the line cap even for concurrent additions at the last free slot", async () => {
    const customer = await signIn("customer"), p = await product(); await get(customer);
    const cart = await database.customerCart.findUniqueOrThrow({ where: { userId: customer.userId } });
    const ids = Array.from({ length: 51 }, () => randomUUID());
    await database.artistProduct.createMany({ data: ids.map((id) => ({ id, artistUserId: p.artistUserId, title: "محصول", priceToman: 1n, stockQuantity: 10, publicationStatus: "published" })) });
    await database.cartItem.createMany({ data: ids.slice(0, 49).map((productId) => ({ cartId: cart.id, productId, quantity: 1 })) });
    const results = await Promise.all([put(customer, ids[49]!, 1, 0), put(customer, ids[50]!, 1, 0)]);
    expect(results.map((r) => r.statusCode).sort()).toEqual([200, 409]);
    expect((await get(customer)).json().items).toHaveLength(50);
    expect((await put(customer, p.id, 1, 1)).statusCode).toBe(409);
    expect((await get(customer)).json().version).toBe(1);
  });
});
