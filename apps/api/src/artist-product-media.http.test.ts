import "dotenv/config";
import "reflect-metadata";
import { randomInt } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("Artist product media HTTP contract", () => {
  let app: NestFastifyApplication;
  const database = new PrismaService();
  const codes = new Map<string, string>();
  const identity = new IdentityCore(database, {
    async send(phone, code) { codes.set(phone, code); }
  }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(database);

  async function signIn() {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone);
    const user = await identity.verifyCode(phone, codes.get(phone) ?? "");
    const grant = await database.roleGrant.create({ data: { userId: user.userId, role: "artist" } });
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

  it("issues a signed upload URL for the owning Artist and hides it from another Artist", async () => {
    const artist = await signIn();
    const otherArtist = await signIn();
    const created = await app.inject({
      method: "POST", url: "/api/v1/artist/products", headers: artist,
      payload: { title: "کاسه سفالی", priceToman: "340000" }
    });
    const productId = created.json<{ id: string }>().id;

    const upload = await app.inject({
      method: "POST", url: `/api/v1/artist/products/${productId}/media/upload-url`, headers: artist,
      payload: { contentType: "image/webp", contentLength: 2048 }
    });
    expect(upload.statusCode).toBe(201);
    expect(upload.headers["cache-control"]).toBe("no-store");
    expect(upload.json().uploadUrl).toContain("X-Amz-Signature");
    expect(upload.json()).not.toHaveProperty("objectKey");

    const mediaId = upload.json<{ id: string }>().id;
    const refreshed = await app.inject({
      method: "POST", url: `/api/v1/artist/products/${productId}/media/${mediaId}/upload-url`, headers: artist
    });
    expect(refreshed.statusCode).toBe(201);
    expect(refreshed.headers["cache-control"]).toBe("no-store");
    expect(refreshed.json().uploadUrl).toContain("X-Amz-Signature");
    expect(refreshed.json()).not.toHaveProperty("objectKey");

    expect((await app.inject({
      method: "POST", url: `/api/v1/artist/products/${productId}/submit-review`, headers: artist
    })).statusCode).toBe(409);

    expect((await app.inject({ method: "GET", url: `/api/v1/artist/products/${productId}/media`, headers: otherArtist })).statusCode)
      .toBe(404);
    expect((await app.inject({
      method: "POST", url: `/api/v1/artist/products/${productId}/media/upload-url`, headers: artist,
      payload: { contentType: "image/svg+xml", contentLength: 100 }
    })).statusCode).toBe(400);
    expect((await app.inject({
      method: "POST", url: `/api/v1/artist/products/${productId}/media/${mediaId}/upload-url`, headers: otherArtist
    })).statusCode).toBe(404);
  });
});
