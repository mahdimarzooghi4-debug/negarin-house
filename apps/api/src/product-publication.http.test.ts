import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { IdentityCore } from "./identity-core.js";
import { ActiveContextResolver } from "./active-context.js";
import { PrismaService } from "./prisma.service.js";
import { ProductPublicationService } from "./product-publication.js";

// Uses PostgreSQL and the actual HTTP/session/authorization layers, including concurrency.
describe("Product publication lifecycle HTTP", () => {
  let app: NestFastifyApplication;
  const db = new PrismaService();
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
    owner = await signIn("artist"); other = await signIn("artist"); reviewer = await signIn("staff");
    unrelatedStaff = await signIn("staff", "finance"); customer = await signIn("customer");
  });
  afterAll(async () => { await app?.close(); await db.$disconnect(); });

  it("submits, returns feedback, resubmits, approves and separately publishes with durable history", async () => {
    const p = await create();
    expect((await artist(p.id, "publish", { version: 0 })).statusCode).toBe(409);
    expect((await artist(p.id, "submit", { version: 0 })).json().publicationStatus).toBe("under_review");
    const queue = await app.inject({ method: "GET", url: "/api/v1/admin/product-reviews", headers: reviewer });
    expect(queue.statusCode).toBe(200); expect(queue.headers["cache-control"]).toBe("no-store");
    expect(queue.json().find((item: { id: string }) => item.id === p.id)).not.toHaveProperty("priceToman");
    const revision = await admin(p.id, "request-changes", { version: 1, reason: "شرح محصول را تکمیل کنید" });
    expect(revision.json().publicationStatus).toBe("changes_requested");
    const edit = await app.inject({ method: "PATCH", url: `/api/v1/artist/products/${p.id}`, headers: owner, payload: { description: "شرح کامل محصول" } });
    expect(edit.statusCode).toBe(200); expect(edit.json().version).toBe(3);
    expect((await artist(p.id, "submit", { version: 3 })).statusCode).toBe(201);
    expect((await admin(p.id, "approve", { version: 4 })).json().publicationStatus).toBe("approved");
    expect((await artist(p.id, "publish", { version: 5 })).json().publicationStatus).toBe("published");
    const history = await app.inject({ method: "GET", url: `/api/v1/artist/products/${p.id}/publication-history`, headers: owner });
    expect(history.json().map((event: { action: string }) => event.action)).toEqual(["submit", "request-changes", "content-updated", "submit", "approve", "publish"]);
    expect(history.json()[1].reason).toBe("شرح محصول را تکمیل کنید");
    expect(history.json()[4].content.description).toBe("شرح کامل محصول");
    expect(history.json()[0]).not.toHaveProperty("actorUserId");
    expect(history.json()[0].content).not.toHaveProperty("priceToman");
    const events = await db.productPublicationEvent.findMany({ where: { productId: p.id } });
    expect(events).toHaveLength(6); expect(events.every((e) => e.requestId && e.actorUserId)).toBe(true);
  });

  it("persists specifications, reviews exact snapshots and invalidates edited approval", async () => {
    const created = await app.inject({ method: "POST", url: "/api/v1/artist/products", headers: owner,
      payload: { title: "گلدان", priceToman: "120000", materials: "  مس  ", dimensions: "۲۵ سانتی‌متر",
        weight: "۸۵۰ گرم", color: "فیروزه‌ای", technique: "چرخ‌کاری دستی", category: "سفال", careInstructions: "شست‌وشو با دست" } });
    expect(created.statusCode).toBe(201);
    const p = created.json();
    expect(p.materials).toBe("مس");
    expect((await app.inject({ method: "GET", url: `/api/v1/artist/products/${p.id}`, headers: owner })).json().weight).toBe("۸۵۰ گرم");
    await artist(p.id, "submit", { version: 0 });
    const review = await app.inject({ method: "GET", url: `/api/v1/admin/product-reviews/${p.id}`, headers: reviewer });
    expect(review.json()).toMatchObject({ materials: "مس", technique: "چرخ‌کاری دستی", careInstructions: "شست‌وشو با دست" });
    expect(review.json()).not.toHaveProperty("priceToman");
    const patch = (payload: object, headers = owner) => app.inject({ method: "PATCH", url: `/api/v1/artist/products/${p.id}`, headers, payload });
    expect((await patch({ materials: "چوب", version: 1 })).statusCode).toBe(409);
    await admin(p.id, "approve", { version: 1 });
    expect((await patch({ materials: "چوب", version: 1 })).statusCode).toBe(409);
    const edit = await patch({ materials: "چوب", dimensions: null, version: 2 });
    expect(edit.statusCode).toBe(200);
    expect(edit.json()).toMatchObject({ publicationStatus: "draft", version: 3, materials: "چوب", dimensions: null, color: "فیروزه‌ای", priceToman: "120000" });
    expect((await artist(p.id, "publish", { version: 2 })).statusCode).toBe(409);
    const history = (await app.inject({ method: "GET", url: `/api/v1/artist/products/${p.id}/publication-history`, headers: owner })).json();
    expect(history[0].content).toMatchObject({ materials: "مس", dimensions: "۲۵ سانتی‌متر" });
    expect(history[1].content.materials).toBe("مس");
    expect(history[2].content).toMatchObject({ materials: "چوب", dimensions: null, weight: "۸۵۰ گرم" });
    await artist(p.id, "submit", { version: 3 }); await admin(p.id, "approve", { version: 4 }); await artist(p.id, "publish", { version: 5 });
    expect((await patch({ color: "سفید", version: 6 })).statusCode).toBe(409);
  });

  it("isolates specification writes, rejects stale concurrent edits and preserves unknown defaults", async () => {
    const p = await create();
    const get = await app.inject({ method: "GET", url: `/api/v1/artist/products/${p.id}`, headers: owner });
    expect(get.json()).toMatchObject({ materials: null, dimensions: null, category: null, weight: null, color: null, technique: null, careInstructions: null });
    const patch = (payload: object, headers = owner) => app.inject({ method: "PATCH", url: `/api/v1/artist/products/${p.id}`, headers, payload });
    expect((await patch({ materials: "مس" })).statusCode).toBe(400);
    expect((await patch({ materials: "مس", version: 0 }, other)).statusCode).toBe(404);
    expect((await patch({ materials: "مس", version: 0 }, reviewer)).statusCode).toBe(403);
    expect((await patch({ materials: "مس", version: 0 }, customer)).statusCode).toBe(403);
    const writes = await Promise.all([patch({ materials: "مس", version: 0 }), patch({ materials: "چوب", version: 0 })]);
    expect(writes.map((r) => r.statusCode).sort()).toEqual([200, 409]);
    const events = await db.productPublicationEvent.findMany({ where: { productId: p.id } });
    expect(events).toHaveLength(1);
    const current = await db.artistProduct.findUniqueOrThrow({ where: { id: p.id } });
    expect(events[0]!.content).toMatchObject({ materials: current.materials });
    expect(current.version).toBe(1); expect(current.inventoryVersion).toBe(0); expect(current.stockQuantity).toBe(0);
    await app.inject({ method: "POST", url: `/api/v1/artist/products/${p.id}/archive`, headers: owner });
    expect((await patch({ materials: "مس", version: 2 })).statusCode).toBe(409);
  });

  it("rolls specification edits back when the content audit insert fails", async () => {
    const p = await create();
    const name = "specifications_test_" + randomUUID().replaceAll("-", "");
    await db.$executeRawUnsafe(`CREATE FUNCTION "${name}"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."productId" = '${p.id}'::uuid THEN RAISE EXCEPTION 'specification audit test failure'; END IF; RETURN NEW; END $$`);
    try {
      await db.$executeRawUnsafe(`CREATE TRIGGER "${name}" BEFORE INSERT ON "product_publication_events" FOR EACH ROW EXECUTE FUNCTION "${name}"()`);
      try {
        const result = await app.inject({ method: "PATCH", url: `/api/v1/artist/products/${p.id}`, headers: owner,
          payload: { materials: "مس", version: 0, priceToman: "200000" } });
        expect(result.statusCode).toBe(500);
        expect(await db.artistProduct.findUniqueOrThrow({ where: { id: p.id } })).toMatchObject({ materials: null, version: 0, priceToman: 100000n });
        expect(await db.productPublicationEvent.count({ where: { productId: p.id } })).toBe(0);
      } finally { await db.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "${name}" ON "product_publication_events"`); }
    } finally { await db.$executeRawUnsafe(`DROP FUNCTION IF EXISTS "${name}"()`); }
  });

  it("conceals foreign ownership and blocks unrelated roles, domains and privilege escalation", async () => {
    const p = await create();
    expect((await artist(p.id, "submit", { version: 0 }, other)).statusCode).toBe(404);
    expect((await artist(p.id, "submit", { version: 0 }, reviewer)).statusCode).toBe(403);
    for (const headers of [owner, unrelatedStaff, customer]) {
      expect((await admin(p.id, "approve", { version: 0 }, headers)).statusCode).toBe(403);
      expect((await app.inject({ method: "GET", url: "/api/v1/admin/product-reviews", headers })).statusCode).toBe(403);
    }
    expect((await app.inject({ method: "GET", url: `/api/v1/artist/products/${p.id}/publication-history`, headers: other })).statusCode).toBe(404);
    expect((await app.inject({ method: "GET", url: `/api/v1/admin/product-reviews/${p.id}/history`, headers: unrelatedStaff })).statusCode).toBe(403);
    expect((await artist(p.id, "submit", { version: 0, publicationStatus: "published" })).statusCode).toBe(400);
    expect(await db.productPublicationEvent.count({ where: { productId: p.id } })).toBe(0);
  });

  it("preserves Artist price independence, locks reviewed content and invalidates edited approval", async () => {
    const p = await create(); await artist(p.id, "submit", { version: 0 });
    const patch = (payload: object) => app.inject({ method: "PATCH", url: `/api/v1/artist/products/${p.id}`, headers: owner, payload });
    expect((await patch({ title: "تغییر حین بررسی" })).statusCode).toBe(409);
    const price = await patch({ priceToman: "250000" });
    expect(price.statusCode).toBe(200); expect(price.json().version).toBe(1); expect(price.json().publicationStatus).toBe("under_review");
    expect((await admin(p.id, "approve", { version: 1, priceToman: "1" })).statusCode).toBe(400);
    expect((await admin(p.id, "approve", { version: 1 })).statusCode).toBe(201);
    const edited = await patch({ title: "محتوای جدید پس از تأیید" });
    expect(edited.json().publicationStatus).toBe("draft"); expect(edited.json().version).toBe(3);
    expect((await artist(p.id, "publish", { version: 2 })).statusCode).toBe(409);
    await artist(p.id, "submit", { version: 3 }); await admin(p.id, "approve", { version: 4 }); await artist(p.id, "publish", { version: 5 });
    expect((await patch({ description: "تغییر منتشرشده" })).statusCode).toBe(409);
    const final = await patch({ priceToman: "300000" });
    expect(final.json().publicationStatus).toBe("published"); expect(final.json().priceToman).toBe("300000");
  });

  it("allows only one concurrent decision and creates no orphan audit event", async () => {
    const p = await create(); await artist(p.id, "submit", { version: 0 });
    const results = await Promise.all([admin(p.id, "approve", { version: 1 }), admin(p.id, "request-changes", { version: 1, reason: "اصلاح لازم است" })]);
    expect(results.map((r) => r.statusCode).sort()).toEqual([201, 409]);
    const events = await db.productPublicationEvent.findMany({ where: { productId: p.id }, orderBy: { version: "asc" } });
    expect(events).toHaveLength(2); expect(events[1]!.version).toBe(2);
    expect((await db.artistProduct.findUniqueOrThrow({ where: { id: p.id } })).publicationStatus).toBe(events[1]!.toStatus);
  });


  it("rolls the state change back if durable history cannot be recorded", async () => {
    const p = await create(); await artist(p.id, "submit", { version: 0 });
    // A missing actor forces the history foreign key to fail after the conditional state write.
    const service = new ProductPublicationService(db);
    await expect(service.transition({ userId: randomUUID(), activeRole: "staff", staffPermissionDomains: ["products"] },
      p.id, "approve", { version: 1 }, "rollback-test")).rejects.toThrow();
    const current = await db.artistProduct.findUniqueOrThrow({ where: { id: p.id } });
    expect(current.publicationStatus).toBe("under_review"); expect(current.version).toBe(1);
    expect(await db.productPublicationEvent.count({ where: { productId: p.id } })).toBe(1);
  });

  it("rejects archived/stale commands, empty feedback and unauthenticated requests", async () => {
    const p = await create(); await artist(p.id, "submit", { version: 0 });
    expect((await admin(p.id, "request-changes", { version: 1, reason: "  " })).statusCode).toBe(400);
    expect((await admin(p.id, "approve", { version: 0 })).statusCode).toBe(409);
    expect((await artist(p.id, "submit", { version: -1 })).statusCode).toBe(400);
    await app.inject({ method: "POST", url: `/api/v1/artist/products/${p.id}/archive`, headers: owner });
    expect((await admin(p.id, "approve", { version: 2 })).statusCode).toBe(409);
    expect((await app.inject({ method: "POST", url: `/api/v1/admin/product-reviews/${p.id}/approve`, payload: { version: 2 } })).statusCode).toBe(401);
    expect(await db.productPublicationEvent.count({ where: { productId: p.id } })).toBe(1);
  });
});
