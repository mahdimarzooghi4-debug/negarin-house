import "dotenv/config";
import "reflect-metadata";
import { randomInt } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("Product publication review HTTP contract", () => {
  let app: NestFastifyApplication;
  const database = new PrismaService();
  const codes = new Map<string, string>();
  const identity = new IdentityCore(database, {
    async send(phone, code) { codes.set(phone, code); }
  }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(database);

  async function signIn(role: "artist" | "staff" | "customer" = "artist", canReview = false) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone);
    const user = await identity.verifyCode(phone, codes.get(phone) ?? "");
    const grant = await database.roleGrant.create({
      data: {
        userId: user.userId,
        role,
        ...(role === "staff" && canReview ? { staffDomains: { create: [{ domain: "products" }] } } : {})
      }
    });
    await contexts.select(user.sessionToken, grant.id);
    return { authorization: `Bearer ${user.sessionToken}` };
  }

  beforeAll(async () => {
    app = await createApplication();
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    await database.$connect();
  });
  afterAll(async () => { await app?.close(); await database.$disconnect(); });

  it("submits, requests content changes, resubmits and approves without changing Artist price", async () => {
    const artist = await signIn();
    const reviewer = await signIn("staff", true);
    const created = await app.inject({
      method: "POST", url: "/api/v1/artist/products", headers: artist,
      payload: { title: "گلدان سفال", description: "توضیح محصول", priceToman: "780000" }
    });
    const productId = created.json<{ id: string }>().id;

    const submitted = await app.inject({ method: "POST", url: `/api/v1/artist/products/${productId}/submit-review`, headers: artist });
    expect(submitted.statusCode).toBe(201);
    expect(submitted.json()).toEqual({ id: productId, publicationStatus: "under_review" });
    expect((await app.inject({
      method: "PATCH", url: `/api/v1/artist/products/${productId}`, headers: artist,
      payload: { title: "تغییر حین بررسی", priceToman: "780000" }
    })).statusCode).toBe(409);

    const queue = await app.inject({ method: "GET", url: "/api/v1/staff/publication-reviews", headers: reviewer });
    expect(queue.statusCode).toBe(200);
    expect(queue.json()).toHaveLength(1);
    expect(queue.json()[0]).not.toHaveProperty("priceToman");
    expect(queue.json()[0].media).toEqual([]);

    const requested = await app.inject({
      method: "POST", url: `/api/v1/staff/publication-reviews/${productId}/decision`, headers: reviewer,
      payload: { decision: "changes_requested", feedback: "تصویر محصول واضح‌تر باشد" }
    });
    expect(requested.statusCode).toBe(201);
    expect(requested.json().status).toBe("changes_requested");

    const history = await app.inject({ method: "GET", url: `/api/v1/artist/products/${productId}/review-history`, headers: artist });
    expect(history.json()).toEqual(expect.arrayContaining([
      expect.objectContaining({ status: "under_review", feedback: null }),
      expect.objectContaining({ status: "changes_requested", feedback: "تصویر محصول واضح‌تر باشد" })
    ]));

    await app.inject({ method: "POST", url: `/api/v1/artist/products/${productId}/submit-review`, headers: artist });
    const approved = await app.inject({
      method: "POST", url: `/api/v1/staff/publication-reviews/${productId}/decision`, headers: reviewer,
      payload: { decision: "approved" }
    });
    expect(approved.statusCode).toBe(201);
    const product = await app.inject({ method: "GET", url: `/api/v1/artist/products/${productId}`, headers: artist });
    expect(product.json().publicationStatus).toBe("approved");
    expect(product.json().priceToman).toBe("780000");

    const priceOnly = await app.inject({
      method: "PATCH", url: `/api/v1/artist/products/${productId}`, headers: artist,
      payload: { priceToman: "790000" }
    });
    expect(priceOnly.json().publicationStatus).toBe("approved");
    const priceHistory = await app.inject({ method: "GET", url: `/api/v1/artist/products/${productId}/review-history`, headers: artist });
    expect(priceHistory.json()).not.toEqual(expect.arrayContaining([
      expect.objectContaining({ status: "draft" })
    ]));
    const contentEdit = await app.inject({
      method: "PATCH", url: `/api/v1/artist/products/${productId}`, headers: artist,
      payload: { title: "گلدان سفال تازه" }
    });
    expect(contentEdit.json().publicationStatus).toBe("draft");
    expect(contentEdit.json().priceToman).toBe("790000");
    const updatedHistory = await app.inject({ method: "GET", url: `/api/v1/artist/products/${productId}/review-history`, headers: artist });
    expect(updatedHistory.json()).toEqual(expect.arrayContaining([
      expect.objectContaining({ status: "draft", feedback: null })
    ]));
  });

  it("requires the products staff permission and hides other Artists' review history", async () => {
    const artist = await signIn();
    const otherArtist = await signIn();
    const staffWithoutPermission = await signIn("staff");
    const created = await app.inject({
      method: "POST", url: "/api/v1/artist/products", headers: artist,
      payload: { title: "محصول", priceToman: "1000" }
    });
    const productId = created.json<{ id: string }>().id;

    expect((await app.inject({ method: "GET", url: "/api/v1/staff/publication-reviews", headers: staffWithoutPermission })).statusCode)
      .toBe(403);
    expect((await app.inject({ method: "GET", url: `/api/v1/artist/products/${productId}/review-history`, headers: otherArtist })).statusCode)
      .toBe(404);
  });
});
