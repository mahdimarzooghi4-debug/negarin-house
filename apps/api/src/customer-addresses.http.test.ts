import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("Customer addresses HTTP and PostgreSQL concurrency", () => {
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

  type Customer = Awaited<ReturnType<typeof signIn>>;
  const fields = { recipientName: "نگار", recipientPhone: "۰۹۱۲۳۴۵۶۷۸۹", province: "تهران", city: "تهران", postalCode: "۱۹۶۷۶۵۴۳۲۱", fullAddress: "خیابان نگار، پلاک ۲" };
  function get(user: Customer) { return app.inject({ method: "GET", url: "/api/v1/customer/addresses", headers: user.headers }); }
  function create(user: Customer, version: number, extra: object = {}) {
    return app.inject({ method: "POST", url: "/api/v1/customer/addresses", headers: user.headers, payload: { ...fields, version, ...extra } });
  }
  function change(user: Customer, id: string, version: number, action: "replace" | "delete" | "default", extra: object = {}) {
    return app.inject({ method: action === "delete" ? "DELETE" : "PUT", url: `/api/v1/customer/addresses/${id}${action === "default" ? "/default" : ""}`, headers: user.headers,
      payload: { ...(action === "replace" ? fields : {}), version, ...extra } });
  }
  beforeAll(async () => {
    app = await createApplication(); await app.init(); await app.getHttpAdapter().getInstance().ready(); await database.$connect();
  });
  afterAll(async () => { await app?.close(); await database.$disconnect(); });

  it("persists normalized addresses, replaces fields, promotes and repairs default after removal", async () => {
    const user = await signIn("customer");
    expect((await get(user)).json()).toEqual({ version: 0, addresses: [] });
    const first = await create(user, 0);
    expect(first.statusCode).toBe(201); expect(first.headers["cache-control"]).toBe("no-store");
    const a = first.json().addresses[0];
    expect(a).toMatchObject({ isDefault: true, recipientPhone: "+989123456789", postalCode: "1967654321" });
    expect(a).not.toHaveProperty("bookId"); expect(a).not.toHaveProperty("userId");
    const second = (await create(user, 1)).json(); const b = second.addresses[1];
    expect(b.isDefault).toBe(false);
    expect((await change(user, a.id, 2, "replace", { city: "کرج" })).json()).toMatchObject({ version: 3, addresses: [{ city: "کرج", isDefault: true }, { isDefault: false }] });
    expect((await change(user, b.id, 3, "default")).json()).toMatchObject({ version: 4, addresses: [{ isDefault: false }, { isDefault: true }] });
    expect((await change(user, b.id, 4, "default")).json().version).toBe(4);
    expect((await change(user, b.id, 4, "delete")).json()).toMatchObject({ version: 5, addresses: [{ id: a.id, isDefault: true }] });
    expect((await change(user, a.id, 5, "delete")).json()).toEqual({ version: 6, addresses: [] });
    expect((await create(user, 6)).json().addresses[0].isDefault).toBe(true);
  });

  it("persists across sessions and makes one book on concurrent first visits", async () => {
    const user = await signIn("customer");
    expect((await Promise.all([get(user), get(user), get(user)])).every((r) => r.statusCode === 200 && r.json().version === 0)).toBe(true);
    expect(await database.customerAddressBook.count({ where: { userId: user.userId } })).toBe(1);
    await create(user, 0);
    const phone = (await database.identityUser.findUniqueOrThrow({ where: { id: user.userId } })).phone;
    const later = new Date(Date.now() + 61000);
    await identity.requestCode(phone, later); const session = await identity.verifyCode(phone, codes.get(phone)!, later);
    const grant = await database.roleGrant.findFirstOrThrow({ where: { userId: user.userId, role: "customer" } });
    await contexts.select(session.sessionToken, grant.id);
    expect((await get({ userId: user.userId, headers: { authorization: `Bearer ${session.sessionToken}` } })).json()).toMatchObject({ version: 1, addresses: [{ recipientName: "نگار" }] });
  });

  it("isolates private addresses and rejects other roles, ownership overrides and invalid IDs", async () => {
    const user = await signIn("customer"), other = await signIn("customer");
    const id = (await create(user, 0)).json().addresses[0].id;
    expect((await get(other)).json().addresses).toEqual([]);
    for (const action of ["replace", "delete", "default"] as const) expect((await change(other, id, 0, action)).statusCode).toBe(404);
    expect((await get(other)).json().version).toBe(0); expect((await get(user)).json().addresses).toHaveLength(1);
    for (const role of ["artist", "staff"] as const) {
      const denied = await signIn(role); expect((await get(denied)).statusCode).toBe(403); expect((await create(denied, 0)).statusCode).toBe(403);
    }
    expect((await app.inject({ method: "GET", url: "/api/v1/customer/addresses" })).statusCode).toBe(401);
    expect((await create(user, 1, { userId: other.userId })).statusCode).toBe(400);
    expect((await change(user, "invalid", 1, "delete")).statusCode).toBe(400);
    expect((await change(user, randomUUID(), 1, "delete")).statusCode).toBe(404);
    expect((await app.inject({ method: "GET", url: "/api/v1/customer/addresses?userId=other", headers: user.headers })).statusCode).toBe(400);
  });

  it("supports atomic promotion on create/replace and leaves no-op revisions unchanged", async () => {
    const user = await signIn("customer"); const a = (await create(user, 0)).json().addresses[0];
    const b = (await create(user, 1, { makeDefault: true })).json().addresses[1];
    expect((await get(user)).json().addresses.map((a: { isDefault: boolean }) => a.isDefault)).toEqual([false, true]);
    expect((await change(user, b.id, 2, "replace")).json().version).toBe(2);
    expect((await change(user, a.id, 2, "replace", { makeDefault: true })).json()).toMatchObject({ version: 3, addresses: [{ isDefault: true }, { isDefault: false }] });
    expect((await change(user, a.id, 2, "default")).statusCode).toBe(409);
  });

  it("serializes concurrent default choices and rejects stale edit/delete", async () => {
    const user = await signIn("customer"); await create(user, 0); await create(user, 1);
    const state = (await create(user, 2)).json();
    const results = await Promise.all([change(user, state.addresses[1].id, 3, "default"), change(user, state.addresses[2].id, 3, "default")]);
    expect(results.map((r) => r.statusCode).sort()).toEqual([200, 409]);
    const after = (await get(user)).json(); expect(after.version).toBe(4);
    expect(after.addresses.filter((a: { isDefault: boolean }) => a.isDefault)).toHaveLength(1);
    expect((await change(user, state.addresses[0].id, 3, "replace")).statusCode).toBe(409);
    expect((await change(user, state.addresses[0].id, 3, "delete")).statusCode).toBe(409);
  });

  it("enforces the address cap under concurrent insertion", async () => {
    const user = await signIn("customer"); await get(user);
    const book = await database.customerAddressBook.findUniqueOrThrow({ where: { userId: user.userId } });
    await database.customerAddress.createMany({ data: Array.from({ length: 19 }, (_, i) => ({ bookId: book.id, ...fields, recipientPhone: "+989123456789", postalCode: "1967654321", isDefault: i === 0 })) });
    const results = await Promise.all([create(user, 0), create(user, 0)]);
    expect(results.map((r) => r.statusCode).sort()).toEqual([201, 409]);
    expect((await create(user, 1)).statusCode).toBe(409);
    expect((await get(user)).json()).toMatchObject({ version: 1 });
    expect((await get(user)).json().addresses).toHaveLength(20);
  });

  it("rolls back both revision and old default when insertion fails", async () => {
    const user = await signIn("customer"); await create(user, 0);
    const book = await database.customerAddressBook.findUniqueOrThrow({ where: { userId: user.userId } });
    const name = "address_test_" + randomUUID().replaceAll("-", "");
    await database.$executeRawUnsafe(`CREATE FUNCTION "${name}"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."bookId" = '${book.id}'::uuid THEN RAISE EXCEPTION 'address test failure'; END IF; RETURN NEW; END $$`);
    try {
      await database.$executeRawUnsafe(`CREATE TRIGGER "${name}" BEFORE INSERT ON "customer_addresses" FOR EACH ROW EXECUTE FUNCTION "${name}"()`);
      try {
        expect((await create(user, 1, { makeDefault: true })).statusCode).toBe(500);
        expect((await get(user)).json()).toMatchObject({ version: 1, addresses: [{ isDefault: true }] });
        expect((await get(user)).json().addresses).toHaveLength(1);
      } finally { await database.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "${name}" ON "customer_addresses"`); }
    } finally { await database.$executeRawUnsafe(`DROP FUNCTION IF EXISTS "${name}"()`); }
  });

  it("enforces the unique default in PostgreSQL even outside the service", async () => {
    const user = await signIn("customer"); const state = (await create(user, 0)).json(); await create(user, 1);
    const book = await database.customerAddressBook.findUniqueOrThrow({ where: { userId: user.userId } });
    await expect(database.customerAddress.updateMany({ where: { bookId: book.id, id: { not: state.addresses[0].id } }, data: { isDefault: true } })).rejects.toThrow();
    expect((await get(user)).json().addresses.filter((a: { isDefault: boolean }) => a.isDefault)).toHaveLength(1);
  });
});
