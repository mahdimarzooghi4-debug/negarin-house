import "dotenv/config";
import "reflect-metadata";
import { randomUUID } from "node:crypto";
import { beforeAll, afterAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { PrismaService } from "./prisma.service.js";
import { ProductImageStorage } from "./product-images.js";
import type { ProductPublicationStatus } from "./generated/prisma/client.js";
import type { ObjectStorage } from "@negarin/storage";

describe("Public product catalog HTTP on PostgreSQL", () => {
  let app: NestFastifyApplication;
  const db = new PrismaService();
  let userId: string;
  let signedReads = 0;
  let storageFails = false;
  const store: ObjectStorage = {
    async createReadUrl(key) { signedReads++; if (storageFails) throw new Error("offline"); return `https://storage.test/${key}?signed=test`; },
    async createUploadUrl() { throw new Error("unused"); },
    async putImmutableObject() {}, async deleteObject() {}
  };
  const category = () => `catalog-${randomUUID()}`;
  async function product(group: string, status: ProductPublicationStatus = "published", extra: object = {}) {
    return db.artistProduct.create({ data: { artistUserId: userId, title: "محصول میناکاری", description: "هنر دست", category: group,
      publicationStatus: status, priceToman: 100000n, ...extra } });
  }
  function list(query = "") { return app.inject({ method: "GET", url: `/api/v1/catalog/products${query ? `?${query}` : ""}` }); }
  function get(id: string) { return app.inject({ method: "GET", url: `/api/v1/catalog/products/${id}` }); }
  function image(id: string, imageId: string) { return app.inject({ method: "GET", url: `/api/v1/catalog/products/${id}/images/${imageId}` }); }
  beforeAll(async () => {
    app = await createApplication(); await app.init(); await app.getHttpAdapter().getInstance().ready(); await db.$connect();
    Object.defineProperty(app.get(ProductImageStorage), "store", { value: store });
    userId = (await db.identityUser.create({ data: { phone: `catalog-test-${randomUUID()}` } })).id;
  });
  afterAll(async () => { await app?.close(); await db.$disconnect(); });

  it("exposes only published unarchived content to visitors and conceals all other states", async () => {
    const group = category(); const visible = await product(group);
    for (const status of ["draft", "under_review", "changes_requested", "approved"] as const) {
      const hidden = await product(group, status);
      expect((await get(hidden.id)).statusCode).toBe(404);
    }
    const archived = await product(group, "published", { archivedAt: new Date() });
    expect((await get(archived.id)).statusCode).toBe(404);
    const response = await list(`category=${group}`);
    expect(response.statusCode).toBe(200); expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.json().items.map((p: { id: string }) => p.id)).toEqual([visible.id]);
    const detail = await get(visible.id);
    expect(detail.json()).toMatchObject({ title: "محصول میناکاری", priceToman: "100000", availability: "out_of_stock", coverImageId: null });
    for (const field of ["artistUserId", "artist", "stockQuantity", "version", "inventoryVersion", "publicationStatus", "archivedAt", "publicationEvents"]) {
      expect(detail.json()).not.toHaveProperty(field); expect(response.json().items[0]).not.toHaveProperty(field);
    }
    expect((await get(randomUUID())).statusCode).toBe(404);
    expect((await get("bad-id")).statusCode).toBe(400);
    await db.artistProduct.update({ where: { id: visible.id }, data: { archivedAt: new Date() } });
    expect((await get(visible.id)).statusCode).toBe(404);
    expect((await list(`category=${group}`)).json().items).toEqual([]);
  });

  it("filters literal search, exact categories, availability and exact wide Toman amounts", async () => {
    const group = category();
    const a = await product(group, "published", { title: "Unique Needle_50%", description: "Back\\Slash", priceToman: 9007199254740993n, stockQuantity: 1 });
    await product(group, "published", { title: "Unique NeedleX50abc", priceToman: 9007199254740992n, stockQuantity: 0 });
    await product(group + "-other", "published", { title: "Unique Needle_50%", stockQuantity: 1 });
    for (const q of ["needle_50%", "Back\\Slash"]) {
      const response = await list(`category=${group}&q=${encodeURIComponent(q)}`);
      expect(response.json().items.map((p: { id: string }) => p.id)).toEqual([a.id]);
    }
    const range = await list(`category=${group}&minPriceToman=9007199254740993&maxPriceToman=9007199254740993&inStock=true`);
    expect(range.json().items[0].priceToman).toBe("9007199254740993"); expect(range.json().items).toHaveLength(1);
    expect((await list(`category=${group}&inStock=false`)).json().items).toHaveLength(1);
    const literalCategory = group + "_%";
    const literal = await product(literalCategory);
    await product(group + "Xabc");
    expect((await list(`category=${encodeURIComponent(literalCategory)}`)).json().items.map((p: { id: string }) => p.id)).toEqual([literal.id]);
  });

  it("sorts deterministically and paginates without duplicate rows in an unchanged catalog", async () => {
    const group = category(); const createdAt = new Date("2026-01-01T00:00:00Z");
    const products = await Promise.all([30n, 10n, 20n, 10n].map((priceToman) => product(group, "published", { priceToman, createdAt })));
    const expected = [...products].sort((a, b) => a.priceToman === b.priceToman ? a.id.localeCompare(b.id) : a.priceToman < b.priceToman ? -1 : 1);
    const first = (await list(`category=${group}&sort=price_asc&pageSize=2`)).json();
    const second = (await list(`category=${group}&sort=price_asc&pageSize=2&page=2`)).json();
    expect(first).toMatchObject({ page: 1, pageSize: 2, hasMore: true }); expect(second.hasMore).toBe(false);
    expect([...first.items, ...second.items].map((p: { id: string }) => p.id)).toEqual(expected.map((p) => p.id));
    const descending = (await list(`category=${group}&sort=price_desc`)).json().items;
    expect(descending.map((p: { priceToman: string }) => p.priceToman)).toEqual(["30", "20", "10", "10"]);
    const newest = (await list(`category=${group}`)).json().items;
    expect(newest.map((p: { id: string }) => p.id)).toEqual(products.map((p) => p.id).sort());
    expect((await list(`category=${group}&page=1000`)).json()).toMatchObject({ items: [], hasMore: false });
  });

  it("returns current public image URLs only and never signs detached, foreign or hidden assets", async () => {
    const group = category(); const p = await product(group); const foreign = await product(group);
    const attachedId = randomUUID(), detachedId = randomUUID(), foreignId = randomUUID();
    for (const [id, productId] of [[attachedId, p.id], [detachedId, p.id], [foreignId, foreign.id]]) {
      await db.productImage.create({ data: { id: id!, productId: productId!, objectKey: `catalog-test/${id}.webp`, width: 10, height: 9, byteLength: 100 } });
    }
    await db.artistProduct.update({ where: { id: p.id }, data: { imageIds: [attachedId] } });
    const response = await image(p.id, attachedId);
    expect(response.statusCode).toBe(200); expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.json()).toMatchObject({ contentType: "image/webp", expiresInSeconds: 300 });
    expect(response.json()).not.toHaveProperty("objectKey");
    expect((await get(p.id)).json()).toMatchObject({ imageIds: [attachedId], coverImageId: attachedId });
    const reads = signedReads;
    expect((await image(p.id, detachedId)).statusCode).toBe(404);
    expect((await image(p.id, foreignId)).statusCode).toBe(404);
    expect((await image(p.id, randomUUID())).statusCode).toBe(404);
    await db.artistProduct.update({ where: { id: p.id }, data: { publicationStatus: "approved" } });
    expect((await image(p.id, attachedId)).statusCode).toBe(404);
    await db.artistProduct.update({ where: { id: p.id }, data: { publicationStatus: "published", archivedAt: new Date() } });
    expect((await image(p.id, attachedId)).statusCode).toBe(404);
    expect(signedReads).toBe(reads);
    await db.artistProduct.update({ where: { id: p.id }, data: { archivedAt: null, imageIds: [] } });
    expect((await image(p.id, attachedId)).statusCode).toBe(404);
    await db.artistProduct.update({ where: { id: p.id }, data: { imageIds: [attachedId] } });
    storageFails = true;
    try { expect((await image(p.id, attachedId)).statusCode).toBe(503); } finally { storageFails = false; }
  });

  it("rejects malformed query fields and exposes no write surface", async () => {
    for (const query of ["publicationStatus=draft", "pageSize=51", "minPriceToman=2&maxPriceToman=1", "page=1&page=2", "q=", "inStock=yes"]) {
      expect((await list(query)).statusCode).toBe(400);
    }
    const p = await product(category());
    expect((await app.inject({ method: "PATCH", url: `/api/v1/catalog/products/${p.id}`, payload: { priceToman: "1" } })).statusCode).toBe(404);
    expect((await db.artistProduct.findUniqueOrThrow({ where: { id: p.id } })).priceToman).toBe(100000n);
  });
});
