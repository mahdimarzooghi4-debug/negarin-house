import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { IdentityCore } from "./identity-core.js";
import { ActiveContextResolver } from "./active-context.js";
import { PrismaService } from "./prisma.service.js";
import sharp from "sharp";
import { ProductImageStorage } from "./product-images.js";
import type { ObjectStorage } from "@negarin/storage";

// Uses PostgreSQL and the actual HTTP/session/authorization layers, including concurrency.
describe("Product image HTTP and PostgreSQL transactions", () => {
  let app: NestFastifyApplication;
  const db = new PrismaService();
  const objects = new Map<string, Uint8Array>();
  let storageFails = false;
  const store: ObjectStorage = {
    async putImmutableObject(key, bytes) { if (storageFails) throw new Error("storage-down"); objects.set(key, bytes); },
    async createReadUrl(key) { if (!objects.has(key)) throw new Error("missing-object"); return `https://private-storage.test/${key}?signed=test`; },
    async deleteObject(key) { objects.delete(key); },
    async createUploadUrl() { throw new Error("client uploads disabled"); }
  };
  let base64: string;
  function upload(id: string, version: number, headers = owner) {
    return app.inject({ method: "POST", url: `/api/v1/artist/products/${id}/images`, headers, payload: { version, base64 } });
  }
  function gallery(id: string, version: number, imageIds: string[], headers = owner) {
    return app.inject({ method: "PATCH", url: `/api/v1/artist/products/${id}/images`, headers, payload: { version, imageIds } });
  }
  const codes = new Map<string, string>();
  const identity = new IdentityCore(db, { async send(phone, code) { codes.set(phone, code); } }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(db);
  type Headers = { authorization: string };
  let owner: Headers, other: Headers, reviewer: Headers, unrelatedStaff: Headers, customer: Headers;

  async function signIn(role: "artist" | "staff" | "customer", domain = "products") {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone);
    const user = await identity.verifyCode(phone, codes.get(phone)!);
    const grant = await db.roleGrant.create({ data: {
      userId: user.userId, role, ...(role === "staff" ? { staffDomains: { create: [{ domain }] } } : {})
    } });
    await contexts.select(user.sessionToken, grant.id);
    return { authorization: `Bearer ${user.sessionToken}` };
  }
  async function create() {
    const response = await app.inject({ method: "POST", url: "/api/v1/artist/products", headers: owner,
      payload: { title: "محصول دست‌ساز", description: "شرح محصول", priceToman: "100000" } });
    expect(response.statusCode).toBe(201);
    return response.json<{ id: string; version: number; publicationStatus: string }>();
  }
  function artist(id: string, command: string, payload: object, headers = owner) {
    return app.inject({ method: "POST", url: `/api/v1/artist/products/${id}/${command}`, headers, payload });
  }
  function admin(id: string, command: string, payload: object, headers = reviewer) {
    return app.inject({ method: "POST", url: `/api/v1/admin/product-reviews/${id}/${command}`, headers, payload });
  }
  beforeAll(async () => {
    app = await createApplication(); await app.init(); await app.getHttpAdapter().getInstance().ready(); await db.$connect();
    Object.defineProperty(app.get(ProductImageStorage), "store", { value: store });
    base64 = (await sharp({ create: { width: 12, height: 9, channels: 3, background: "red" } }).png().toBuffer()).toString("base64");
    owner = await signIn("artist"); other = await signIn("artist"); reviewer = await signIn("staff");
    unrelatedStaff = await signIn("staff", "finance"); customer = await signIn("customer");
  });
  afterAll(async () => { await app?.close(); await db.$disconnect(); });

  it("uploads, reads, reorders and detaches while retaining immutable review snapshots", async () => {
    const p = await create();
    const first = await upload(p.id, 0); expect(first.statusCode).toBe(201);
    const a = first.json(); expect(a).toMatchObject({ width: 12, height: 9, version: 1 });
    const second = await upload(p.id, 1); expect(second.statusCode).toBe(201); const b = second.json();
    const reordered = await gallery(p.id, 2, [b.id, a.id]);
    expect(reordered.json()).toEqual({ version: 3, imageIds: [b.id, a.id] });
    expect((await gallery(p.id, 3, [b.id, a.id])).json().version).toBe(3);
    await artist(p.id, "submit", { version: 3 });
    const review = await app.inject({ method: "GET", url: `/api/v1/admin/product-reviews/${p.id}`, headers: reviewer });
    expect(review.json().imageIds).toEqual([b.id, a.id]);
    await admin(p.id, "approve", { version: 4 });
    expect((await gallery(p.id, 5, [b.id])).json()).toEqual({ version: 6, imageIds: [b.id] });
    const current = await db.artistProduct.findUniqueOrThrow({ where: { id: p.id } });
    expect(current).toMatchObject({ publicationStatus: "draft", priceToman: 100000n, stockQuantity: 0, inventoryVersion: 0 });
    const history = (await app.inject({ method: "GET", url: `/api/v1/artist/products/${p.id}/publication-history`, headers: owner })).json();
    expect(history[3].content.imageIds).toEqual([b.id, a.id]);
    for (const [prefix, headers] of [["artist/products", owner], ["admin/product-reviews", reviewer]] as const) {
      const read = await app.inject({ method: "GET", url: `/api/v1/${prefix}/${p.id}/images/${a.id}`, headers });
      expect(read.statusCode).toBe(200); expect(read.headers["cache-control"]).toBe("no-store");
      expect(read.json()).toMatchObject({ contentType: "image/webp", expiresInSeconds: 300 });
      expect(read.json().url).toContain("signed=test"); expect(read.json()).not.toHaveProperty("objectKey");
    }
    expect(await db.productImage.count({ where: { productId: p.id } })).toBe(2);
  });

  it("conceals foreign images and denies unrelated roles and staff domains", async () => {
    const p = await create(); const image = (await upload(p.id, 0)).json();
    expect((await upload(p.id, 1, other)).statusCode).toBe(404);
    expect((await upload(p.id, 1, reviewer)).statusCode).toBe(403);
    expect((await upload(p.id, 1, customer)).statusCode).toBe(403);
    expect((await app.inject({ method: "POST", url: `/api/v1/artist/products/${p.id}/images`, payload: { version: 1, base64 } })).statusCode).toBe(401);
    expect((await gallery(p.id, 1, [], other)).statusCode).toBe(404);
    expect((await app.inject({ method: "GET", url: `/api/v1/artist/products/${p.id}/images/${image.id}`, headers: other })).statusCode).toBe(404);
    expect((await app.inject({ method: "GET", url: `/api/v1/admin/product-reviews/${p.id}/images/${image.id}`, headers: unrelatedStaff })).statusCode).toBe(403);
    const another = await create();
    expect((await gallery(another.id, 0, [image.id])).statusCode).toBe(404);
    expect((await app.inject({ method: "GET", url: `/api/v1/admin/product-reviews/${another.id}/images/${image.id}`, headers: reviewer })).statusCode).toBe(404);
  });

  it("rejects locked/stale media writes and allows only one concurrent upload", async () => {
    const p = await create();
    const before = objects.size;
    const results = await Promise.all([upload(p.id, 0), upload(p.id, 0)]);
    expect(results.map((r) => r.statusCode).sort()).toEqual([201, 409]);
    expect(objects.size).toBe(before + 1);
    expect(await db.productImage.count({ where: { productId: p.id } })).toBe(1);
    expect(await db.productPublicationEvent.count({ where: { productId: p.id } })).toBe(1);
    await artist(p.id, "submit", { version: 1 });
    expect((await upload(p.id, 2)).statusCode).toBe(409);
    await admin(p.id, "approve", { version: 2 }); await artist(p.id, "publish", { version: 3 });
    expect((await gallery(p.id, 4, [])).statusCode).toBe(409);
    await app.inject({ method: "POST", url: `/api/v1/artist/products/${p.id}/archive`, headers: owner });
    expect((await upload(p.id, 5)).statusCode).toBe(409);
    expect(objects.size).toBe(before + 1);
  });

  it("does not alter the database when decoding or storage fails", async () => {
    const p = await create();
    expect((await app.inject({ method: "POST", url: `/api/v1/artist/products/${p.id}/images`, headers: owner,
      payload: { version: 0, base64: Buffer.from("fake image").toString("base64") } })).statusCode).toBe(400);
    storageFails = true;
    try { expect((await upload(p.id, 0)).statusCode).toBe(503); } finally { storageFails = false; }
    expect(await db.artistProduct.findUniqueOrThrow({ where: { id: p.id } })).toMatchObject({ version: 0, imageIds: [] });
    expect(await db.productImage.count({ where: { productId: p.id } })).toBe(0);
    expect(await db.productPublicationEvent.count({ where: { productId: p.id } })).toBe(0);
  });

  it("rolls back failed history and cleans only uncommitted image objects", async () => {
    const p = await create(); const existing = (await upload(p.id, 0)).json(); const before = objects.size;
    const name = "images_test_" + randomUUID().replaceAll("-", "");
    await db.$executeRawUnsafe(`CREATE FUNCTION "${name}"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."productId" = '${p.id}'::uuid THEN RAISE EXCEPTION 'image audit test failure'; END IF; RETURN NEW; END $$`);
    try {
      await db.$executeRawUnsafe(`CREATE TRIGGER "${name}" BEFORE INSERT ON "product_publication_events" FOR EACH ROW EXECUTE FUNCTION "${name}"()`);
      try {
        expect((await upload(p.id, 1)).statusCode).toBe(500);
        expect((await gallery(p.id, 1, [])).statusCode).toBe(500);
        expect(objects.size).toBe(before);
        expect(await db.artistProduct.findUniqueOrThrow({ where: { id: p.id } })).toMatchObject({ version: 1, imageIds: [existing.id] });
        expect(await db.productImage.count({ where: { productId: p.id } })).toBe(1);
      } finally { await db.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "${name}" ON "product_publication_events"`); }
    } finally { await db.$executeRawUnsafe(`DROP FUNCTION IF EXISTS "${name}"()`); }
  });

  it("enforces a lifetime cap for retained history assets", async () => {
    const p = await create();
    await db.productImage.createMany({ data: Array.from({ length: 100 }, () => ({
      id: randomUUID(), productId: p.id, objectKey: `quota-test/${randomUUID()}.webp`, width: 1, height: 1, byteLength: 1
    })) });
    const before = objects.size;
    expect((await upload(p.id, 0)).statusCode).toBe(409);
    expect(objects.size).toBe(before);
  });

  it("bounds galleries and rejects duplicate entries", async () => {
    const p = await create();
    for (let version = 0; version < 8; version++) expect((await upload(p.id, version)).statusCode).toBe(201);
    expect((await upload(p.id, 8)).statusCode).toBe(409);
    const oversize = await app.inject({ method: "POST", url: `/api/v1/artist/products/${p.id}/images`, headers: owner,
      payload: { version: 8, base64: "A".repeat(8 * 1024 * 1024) } });
    expect(oversize.statusCode).toBe(413);
    const current = await db.artistProduct.findUniqueOrThrow({ where: { id: p.id } });
    expect((await gallery(p.id, 8, [current.imageIds[0]!, current.imageIds[0]!])).statusCode).toBe(400);
    expect((await gallery(p.id, 8, [])).statusCode).toBe(200);
    expect((await gallery(p.id, 8, current.imageIds)).statusCode).toBe(409);
  });
});
