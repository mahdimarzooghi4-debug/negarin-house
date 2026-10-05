import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("Corporate purchase request HTTP and PostgreSQL", () => {
  let app: NestFastifyApplication;
  const db = new PrismaService(), codes = new Map<string, string>();
  const identity = new IdentityCore(db, { async send(phone, code) { codes.set(phone, code); } }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(db);

  async function signIn(role: "artist" | "customer" | "staff" | "corporate_buyer" = "artist", domain?: string, organizationId?: string) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone); const u = await identity.verifyCode(phone, codes.get(phone)!);
    const grant = await db.roleGrant.create({ data: { userId: u.userId, role, organizationId, ...(domain ? { staffDomains: { create: [{ domain }] } } : {}) } });
    await contexts.select(u.sessionToken, grant.id);
    return { userId: u.userId, organizationId, headers: { authorization: `Bearer ${u.sessionToken}` } };
  }
  type User = Awaited<ReturnType<typeof signIn>>;

  async function product(artist: User, extra: Partial<{ publicationStatus: "draft" | "under_review" | "changes_requested" | "approved" | "published"; archivedAt: Date | null; stockQuantity: number; priceToman: bigint; category: string }> = {}) {
    return db.artistProduct.create({ data: {
      artistUserId: artist.userId, title: "محصول سازمانی " + randomUUID().slice(0, 8), description: "محصول منتشرشده",
      category: "corporate-" + randomUUID(), publicationStatus: "published", priceToman: 9007199254740993n, stockQuantity: 0, ...extra
    } });
  }

  beforeAll(async () => { app = await createApplication(); await app.init(); await app.getHttpAdapter().getInstance().ready(); await db.$connect(); });
  afterAll(async () => { await app?.close(); await db.$disconnect(); });

  it("provides a role-gated corporate product read model with Artist price strictly read-only", async () => {
    const artist = await signIn(), corp = await signIn("corporate_buyer", undefined, randomUUID()), customer = await signIn("customer");
    const visible = await product(artist), hidden = await product(artist, { publicationStatus: "approved" });
    const list = await app.inject({ method: "GET", url: `/api/v1/corporate/products?category=${encodeURIComponent(visible.category!)}`, headers: corp.headers });
    expect(list.statusCode).toBe(200); expect(list.headers["cache-control"]).toBe("no-store");
    expect(list.json().items).toHaveLength(1);
    expect(list.json().items[0]).toMatchObject({ id: visible.id, priceToman: "9007199254740993", availability: "out_of_stock" });
    for (const field of ["artistUserId", "publicationStatus", "inventoryVersion", "archivedAt"]) expect(list.json().items[0]).not.toHaveProperty(field);
    expect((await app.inject({ method: "GET", url: `/api/v1/corporate/products/${hidden.id}`, headers: corp.headers })).statusCode).toBe(404);
    expect((await app.inject({ method: "GET", url: "/api/v1/corporate/products", headers: customer.headers })).statusCode).toBe(403);
    expect((await app.inject({ method: "PATCH", url: `/api/v1/corporate/products/${visible.id}`, headers: corp.headers, payload: { priceToman: "1" } })).statusCode).toBe(404);
    expect((await db.artistProduct.findUniqueOrThrow({ where: { id: visible.id } })).priceToman).toBe(9007199254740993n);
  });

  it("creates an organization-scoped immutable draft from published products without price, inventory or finance side effects", async () => {
    const artist1 = await signIn(), artist2 = await signIn(), corp = await signIn("corporate_buyer", undefined, randomUUID());
    const outsider = await signIn("corporate_buyer", undefined, randomUUID()), customer = await signIn("customer");
    const orders = await signIn("staff", "orders"), reports = await signIn("staff", "reports");
    const first = await product(artist1, { stockQuantity: 3 }), second = await product(artist2, { stockQuantity: 0 });
    const beforeInventory = await db.productInventoryEvent.count({ where: { productId: { in: [first.id, second.id] } } });
    const payload = { idempotencyKey: randomUUID(), items: [{ productId: second.id, quantity: 9 }, { productId: first.id, quantity: 2 }] };
    const created = await app.inject({ method: "POST", url: "/api/v1/corporate/purchase-requests", headers: corp.headers, payload });
    expect(created.statusCode).toBe(201);
    expect(created.json()).toMatchObject({ status: "draft", version: 0, submittedAt: null });
    expect(created.json().items.map((i: { productId: string }) => i.productId)).toEqual([first.id, second.id].sort());
    for (const item of created.json().items) for (const field of ["priceToman", "artistUserId", "unitPriceToman"]) expect(item).not.toHaveProperty(field);
    for (const field of ["buyerOrganizationId", "createdByUserId"]) expect(created.json()).not.toHaveProperty(field);

    const raw = await db.corporatePurchaseRequest.findUniqueOrThrow({ where: { id: created.json().id }, include: { items: true } });
    expect(raw.buyerOrganizationId).toBe(corp.organizationId); expect(raw.createdByUserId).toBe(corp.userId);
    expect(new Map(raw.items.map(i => [i.productId, i.artistUserId]))).toEqual(new Map([[first.id, artist1.userId], [second.id, artist2.userId]]));
    expect(await db.productInventoryEvent.count({ where: { productId: { in: [first.id, second.id] } } })).toBe(beforeInventory);
    expect((await db.artistProduct.findUniqueOrThrow({ where: { id: first.id } })).stockQuantity).toBe(3);
    expect(await db.financialEvent.count({ where: { actorUserId: corp.userId } })).toBe(0);

    expect((await app.inject({ method: "GET", url: `/api/v1/corporate/purchase-requests/${created.json().id}`, headers: outsider.headers })).statusCode).toBe(404);
    expect((await app.inject({ method: "POST", url: "/api/v1/corporate/purchase-requests", headers: customer.headers, payload })).statusCode).toBe(403);
    const admin = await app.inject({ method: "GET", url: `/api/v1/admin/corporate/purchase-requests/${created.json().id}`, headers: orders.headers });
    expect(admin.statusCode).toBe(200); expect(admin.json()).toMatchObject({ buyerOrganizationId: corp.organizationId, createdByUserId: corp.userId });
    expect(admin.json().items).toEqual(expect.arrayContaining([
      expect.objectContaining({ productId: first.id, artistUserId: artist1.userId, quantity: 2 }),
      expect.objectContaining({ productId: second.id, artistUserId: artist2.userId, quantity: 9 })
    ]));
    expect((await app.inject({ method: "GET", url: "/api/v1/admin/corporate/purchase-requests", headers: reports.headers })).statusCode).toBe(403);

    for (const invalid of [
      { ...payload, idempotencyKey: randomUUID(), priceToman: "1" },
      { ...payload, idempotencyKey: randomUUID(), buyerOrganizationId: outsider.organizationId },
      { idempotencyKey: randomUUID(), items: [{ productId: first.id, quantity: 1, priceToman: "1" }] },
      { idempotencyKey: randomUUID(), items: [{ productId: first.id, quantity: 1 }, { productId: first.id, quantity: 2 }] }
    ]) expect((await app.inject({ method: "POST", url: "/api/v1/corporate/purchase-requests", headers: corp.headers, payload: invalid })).statusCode).toBe(400);

    const hidden = await product(artist1, { publicationStatus: "approved" });
    expect((await app.inject({ method: "POST", url: "/api/v1/corporate/purchase-requests", headers: corp.headers,
      payload: { idempotencyKey: randomUUID(), items: [{ productId: hidden.id, quantity: 1 }] } })).statusCode).toBe(404);
  });

  it("serializes exact create retries and conflicts changed reuse of the same key", async () => {
    const artist = await signIn(), corp = await signIn("corporate_buyer", undefined, randomUUID()), p = await product(artist);
    const key = randomUUID(), payload = { idempotencyKey: key, items: [{ productId: p.id, quantity: 5 }] };
    const copies = await Promise.all([1, 2].map(() => app.inject({ method: "POST", url: "/api/v1/corporate/purchase-requests", headers: corp.headers, payload })));
    expect(copies.map(r => r.statusCode)).toEqual([201, 201]);
    expect(copies[0]!.json().id).toBe(copies[1]!.json().id);
    expect((await app.inject({ method: "POST", url: "/api/v1/corporate/purchase-requests", headers: corp.headers,
      payload: { ...payload, items: [{ productId: p.id, quantity: 6 }] } })).statusCode).toBe(409);
    expect(await db.corporatePurchaseRequestEvent.count({ where: { requestId: copies[0]!.json().id } })).toBe(1);
  });

  it("submits a draft with optimistic versioning, revalidates product visibility, and never reserves stock", async () => {
    const artist = await signIn(), corp = await signIn("corporate_buyer", undefined, randomUUID()), p = await product(artist, { stockQuantity: 4 });
    const created = await app.inject({ method: "POST", url: "/api/v1/corporate/purchase-requests", headers: corp.headers,
      payload: { idempotencyKey: randomUUID(), items: [{ productId: p.id, quantity: 20 }] } });
    expect(created.statusCode).toBe(201);
    const inventoryVersion = (await db.artistProduct.findUniqueOrThrow({ where: { id: p.id } })).inventoryVersion;
    await db.artistProduct.update({ where: { id: p.id }, data: { priceToman: 123456789n } });

    const submitted = await app.inject({ method: "POST", url: `/api/v1/corporate/purchase-requests/${created.json().id}/submit`, headers: corp.headers, payload: { version: 0 } });
    expect(submitted.statusCode).toBe(201); expect(submitted.json()).toMatchObject({ status: "submitted", version: 1 });
    expect(submitted.json().submittedAt).toEqual(expect.any(String));
    for (const item of submitted.json().items) expect(item).not.toHaveProperty("priceToman");
    const productAfter = await db.artistProduct.findUniqueOrThrow({ where: { id: p.id } });
    expect(productAfter).toMatchObject({ stockQuantity: 4, inventoryVersion });
    expect(productAfter.priceToman).toBe(123456789n);
    expect((await app.inject({ method: "POST", url: `/api/v1/corporate/purchase-requests/${created.json().id}/submit`, headers: corp.headers, payload: { version: 0 } })).statusCode).toBe(201);
    await db.artistProduct.update({ where: { id: p.id }, data: { archivedAt: new Date() } });
    expect((await app.inject({ method: "POST", url: `/api/v1/corporate/purchase-requests/${created.json().id}/submit`, headers: corp.headers, payload: { version: 0 } })).statusCode).toBe(201);
    expect((await db.corporatePurchaseRequestEvent.findMany({ where: { requestId: created.json().id }, orderBy: { version: "asc" } })).map(e => e.action)).toEqual(["created", "submitted"]);
  });

  it("keeps an unavailable or unaudited submission in draft and protects item/event history at the database layer", async () => {
    const artist = await signIn(), corp = await signIn("corporate_buyer", undefined, randomUUID()), p = await product(artist);
    const created = await app.inject({ method: "POST", url: "/api/v1/corporate/purchase-requests", headers: corp.headers,
      payload: { idempotencyKey: randomUUID(), items: [{ productId: p.id, quantity: 1 }] } });
    const id = created.json().id as string;
    await db.artistProduct.update({ where: { id: p.id }, data: { archivedAt: new Date() } });
    expect((await app.inject({ method: "POST", url: `/api/v1/corporate/purchase-requests/${id}/submit`, headers: corp.headers, payload: { version: 0 } })).statusCode).toBe(409);
    expect(await db.corporatePurchaseRequest.findUniqueOrThrow({ where: { id } })).toMatchObject({ status: "draft", version: 0, submittedAt: null });
    await db.artistProduct.update({ where: { id: p.id }, data: { archivedAt: null } });

    const name = "corp_req_fail_" + randomUUID().replaceAll("-", "");
    await db.$executeRawUnsafe('CREATE FUNCTION ' + name + '() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."requestId" = \'' + id + '\'::uuid AND NEW."action" = \'submitted\' THEN RAISE EXCEPTION \'corporate audit failure\'; END IF; RETURN NEW; END $$');
    await db.$executeRawUnsafe('CREATE TRIGGER ' + name + ' BEFORE INSERT ON "corporate_purchase_request_events" FOR EACH ROW EXECUTE FUNCTION ' + name + '()');
    try {
      expect((await app.inject({ method: "POST", url: `/api/v1/corporate/purchase-requests/${id}/submit`, headers: corp.headers, payload: { version: 0 } })).statusCode).toBe(500);
    } finally {
      await db.$executeRawUnsafe('DROP TRIGGER ' + name + ' ON "corporate_purchase_request_events"');
      await db.$executeRawUnsafe('DROP FUNCTION ' + name + '()');
    }
    expect(await db.corporatePurchaseRequest.findUniqueOrThrow({ where: { id } })).toMatchObject({ status: "draft", version: 0, submittedAt: null });
    expect((await app.inject({ method: "POST", url: `/api/v1/corporate/purchase-requests/${id}/submit`, headers: corp.headers, payload: { version: 0 } })).statusCode).toBe(201);

    await expect(db.corporatePurchaseRequestEvent.updateMany({ where: { requestId: id }, data: { action: "created" } })).rejects.toThrow();
    await expect(db.corporatePurchaseRequestEvent.deleteMany({ where: { requestId: id } })).rejects.toThrow();
    await expect(db.corporatePurchaseRequestItem.updateMany({ where: { requestId: id }, data: { quantity: 2 } })).rejects.toThrow();
    await expect(db.corporatePurchaseRequestItem.deleteMany({ where: { requestId: id } })).rejects.toThrow();
    await expect(db.corporatePurchaseRequest.update({ where: { id }, data: { buyerOrganizationId: randomUUID() } })).rejects.toThrow();
    await expect(db.corporatePurchaseRequest.delete({ where: { id } })).rejects.toThrow();
  });
});
