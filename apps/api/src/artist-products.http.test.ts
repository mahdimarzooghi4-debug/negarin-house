import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("Artist product HTTP contract", () => {
  let app: NestFastifyApplication;
  const database = new PrismaService();
  const codes = new Map<string, string>();
  const identity = new IdentityCore(database, {
    async send(phone, code) { codes.set(phone, code); }
  }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(database);

  async function signIn(role: "artist" | "staff" | "customer" | "supporting_organization" | "corporate_buyer" | "export_partner" = "artist", organizationId?: string) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone);
    const user = await identity.verifyCode(phone, codes.get(phone) ?? "");
    const grant = await database.roleGrant.create({
      data: {
        userId: user.userId,
        role,
        ...(organizationId ? { organizationId } : {}),
        ...(role === "export_partner" ? {
          organizationId: (await database.organization.create({ data: { kind: "export_partner" } })).id
        } : {}),
        ...(role === "staff" ? { staffDomains: { create: [{ domain: "products" }] } } : {})
      }
    });
    await contexts.select(user.sessionToken, grant.id);
    return { authorization: `Bearer ${user.sessionToken}`, userId: user.userId };
  }

  beforeAll(async () => {
    app = await createApplication();
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    await database.$connect();
  });
  afterAll(async () => { await app?.close(); await database.$disconnect(); });

  it("lets the owning Artist manage Toman price and archive without deleting the product", async () => {
    const owner = await signIn();
    const create = await app.inject({
      method: "POST", url: "/api/v1/artist/products", headers: owner,
      payload: { title: "بشقاب میناکاری", description: "طرح دست‌ساز", priceToman: "2450000" }
    });
    expect(create.statusCode).toBe(201);
    expect(create.headers["cache-control"]).toBe("no-store");
    const product = create.json<{ id: string; priceToman: string; availableQuantity: number; publicationStatus: string; archivedAt: string | null }>();
    expect(product.priceToman).toBe("2450000");
    expect(product.availableQuantity).toBe(1);
    expect(product.publicationStatus).toBe("draft");
    expect(product.archivedAt).toBeNull();

    const update = await app.inject({
      method: "PATCH", url: `/api/v1/artist/products/${product.id}`, headers: owner,
      payload: { priceToman: "2500000" }
    });
    expect(update.statusCode).toBe(200);
    expect(update.json().priceToman).toBe("2500000");
    const stockUpdate = await app.inject({ method: "PATCH", url: `/api/v1/artist/products/${product.id}`, headers: owner,
      payload: { availableQuantity: 12 } });
    expect(stockUpdate.json().availableQuantity).toBe(12);
    expect((await app.inject({ method: "PATCH", url: `/api/v1/artist/products/${product.id}`, headers: owner,
      payload: { availableQuantity: -1 } })).statusCode).toBe(400);

    const archive = await app.inject({ method: "POST", url: `/api/v1/artist/products/${product.id}/archive`, headers: owner });
    expect(archive.statusCode).toBe(201);
    expect(archive.json().archivedAt).toBeTruthy();
    expect((await app.inject({ method: "GET", url: "/api/v1/artist/products", headers: owner })).json()).toEqual([]);
    expect((await app.inject({ method: "GET", url: "/api/v1/artist/products?includeArchived=true", headers: owner })).json()).toHaveLength(1);

    const restore = await app.inject({ method: "POST", url: `/api/v1/artist/products/${product.id}/restore`, headers: owner });
    expect(restore.statusCode).toBe(201);
    expect(restore.json().archivedAt).toBeNull();
    expect((await app.inject({ method: "GET", url: "/api/v1/artist/products", headers: owner })).json()).toHaveLength(1);
  });

  it("conceals another Artist's product and denies staff price edits", async () => {
    const owner = await signIn();
    const other = await signIn();
    const staff = await signIn("staff");
    const created = await app.inject({
      method: "POST", url: "/api/v1/artist/products", headers: owner,
      payload: { title: "محصول آزمایشی", priceToman: "100000" }
    });
    const productId = created.json<{ id: string }>().id;

    expect((await app.inject({ method: "GET", url: `/api/v1/artist/products/${productId}`, headers: other })).statusCode).toBe(404);
    expect((await app.inject({ method: "PATCH", url: `/api/v1/artist/products/${productId}`, headers: other,
      payload: { priceToman: "1" } })).statusCode).toBe(404);
    expect((await app.inject({ method: "POST", url: `/api/v1/artist/products/${productId}/archive`, headers: other })).statusCode).toBe(404);
    expect((await app.inject({ method: "PATCH", url: `/api/v1/artist/products/${productId}`, headers: staff,
      payload: { priceToman: "1" } })).statusCode).toBe(403);
  });

  it("keeps Artist products and prices outside Supporting Organization authority", async () => {
    const owner = await signIn();
    const organization = await database.organization.create({ data: { kind: "supporting_organization" } });
    const support = await signIn("supporting_organization", organization.id);
    const created = await app.inject({
      method: "POST", url: "/api/v1/artist/products", headers: owner,
      payload: { title: "محصول هنرمند", priceToman: "2450000" }
    });
    const productId = created.json<{ id: string }>().id;
    const supportProductCount = await database.artistProduct.count({ where: { artistUserId: support.userId } });

    expect((await app.inject({ method: "GET", url: "/api/v1/artist/products", headers: support })).statusCode).toBe(403);
    expect((await app.inject({ method: "GET", url: `/api/v1/artist/products/${productId}`, headers: support })).statusCode).toBe(403);
    expect((await app.inject({ method: "POST", url: "/api/v1/artist/products", headers: support,
      payload: { title: "محصول سازمان", priceToman: "1" } })).statusCode).toBe(403);
    expect((await app.inject({ method: "PATCH", url: `/api/v1/artist/products/${productId}`, headers: support,
      payload: { priceToman: "1" } })).statusCode).toBe(403);
    expect((await app.inject({ method: "POST", url: `/api/v1/artist/products/${productId}/archive`, headers: support })).statusCode).toBe(403);

    expect(await database.artistProduct.count({ where: { artistUserId: support.userId } })).toBe(supportProductCount);
    const unchanged = await app.inject({ method: "GET", url: `/api/v1/artist/products/${productId}`, headers: owner });
    expect(unchanged.json()).toMatchObject({ priceToman: "2450000", archivedAt: null, publicationStatus: "draft" });
  });

  it("keeps Artist products and prices outside Corporate Buyer authority", async () => {
    const owner = await signIn();
    const organization = await database.organization.create({ data: { kind: "corporate_buyer" } });
    const buyer = await signIn("corporate_buyer", organization.id);
    const created = await app.inject({
      method: "POST", url: "/api/v1/artist/products", headers: owner,
      payload: { title: "محصول هنرمند", priceToman: "2450000" }
    });
    const productId = created.json<{ id: string }>().id;

    expect((await app.inject({ method: "GET", url: "/api/v1/artist/products", headers: buyer })).statusCode).toBe(403);
    expect((await app.inject({ method: "GET", url: `/api/v1/artist/products/${productId}`, headers: buyer })).statusCode).toBe(403);
    expect((await app.inject({ method: "POST", url: "/api/v1/artist/products", headers: buyer,
      payload: { title: "محصول خریدار", priceToman: "1" } })).statusCode).toBe(403);
    expect((await app.inject({ method: "PATCH", url: `/api/v1/artist/products/${productId}`, headers: buyer,
      payload: { priceToman: "1" } })).statusCode).toBe(403);
    expect((await app.inject({ method: "POST", url: `/api/v1/artist/products/${productId}/archive`, headers: buyer })).statusCode).toBe(403);

    const unchanged = await app.inject({ method: "GET", url: `/api/v1/artist/products/${productId}`, headers: owner });
    expect(unchanged.json()).toMatchObject({ priceToman: "2450000", archivedAt: null, publicationStatus: "draft" });
  });

  it("keeps Artist products and prices outside Export Partner authority", async () => {
    const owner = await signIn();
    const partner = await signIn("export_partner");
    const created = await app.inject({
      method: "POST", url: "/api/v1/artist/products", headers: owner,
      payload: { title: "محصول هنرمند", priceToman: "2450000" }
    });
    const productId = created.json<{ id: string }>().id;

    expect((await app.inject({ method: "GET", url: "/api/v1/artist/products", headers: partner })).statusCode).toBe(403);
    expect((await app.inject({ method: "GET", url: `/api/v1/artist/products/${productId}`, headers: partner })).statusCode).toBe(403);
    expect((await app.inject({ method: "POST", url: "/api/v1/artist/products", headers: partner,
      payload: { title: "محصول شریک", priceToman: "1" } })).statusCode).toBe(403);
    expect((await app.inject({ method: "PATCH", url: `/api/v1/artist/products/${productId}`, headers: partner,
      payload: { priceToman: "1" } })).statusCode).toBe(403);
    expect((await app.inject({ method: "POST", url: `/api/v1/artist/products/${productId}/archive`, headers: partner })).statusCode).toBe(403);

    const unchanged = await app.inject({ method: "GET", url: `/api/v1/artist/products/${productId}`, headers: owner });
    expect(unchanged.json()).toMatchObject({ priceToman: "2450000", archivedAt: null, publicationStatus: "draft" });
  });

  it("rejects numeric price values and unknown write fields", async () => {
    const artist = await signIn();
    expect((await app.inject({ method: "POST", url: "/api/v1/artist/products", headers: artist,
      payload: { title: "محصول", priceToman: 1200 } })).statusCode).toBe(400);
    expect((await app.inject({ method: "POST", url: "/api/v1/artist/products", headers: artist,
      payload: { title: "محصول", priceToman: "1200", artistUserId: randomUUID() } })).statusCode).toBe(400);
    expect((await app.inject({ method: "POST", url: "/api/v1/artist/products", payload: {
      title: "محصول", priceToman: "1200"
    } })).statusCode).toBe(401);
  });
});
