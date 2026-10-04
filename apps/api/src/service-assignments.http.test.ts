import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";
describe("Service assignment HTTP and PostgreSQL", () => {
  let app: NestFastifyApplication;
  const db = new PrismaService(), codes = new Map<string, string>();
  const identity = new IdentityCore(db, { async send(phone, code) { codes.set(phone, code); } }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(db);
  async function signIn(role: "artist" | "customer" | "staff" | "service_partner" = "artist", domain?: string, organizationId?: string) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone); const u = await identity.verifyCode(phone, codes.get(phone)!);
    const grant = await db.roleGrant.create({ data: { userId: u.userId, role, organizationId, ...(domain ? { staffDomains: { create: [{ domain }] } } : {}) } });
    await contexts.select(u.sessionToken, grant.id);
    return { userId: u.userId, grantId: grant.id, headers: { authorization: `Bearer ${u.sessionToken}` } };
  }
  type User = Awaited<ReturnType<typeof signIn>>;
  beforeAll(async () => { app = await createApplication(); await app.init(); await app.getHttpAdapter().getInstance().ready(); await db.$connect(); });
  afterAll(async () => { await app?.close(); await db.$disconnect(); });
  async function setup() {
    const staff = await signIn("staff", "services"), artist = await signIn(), org = randomUUID(), partner = await signIn("service_partner", undefined, org);
    const command = { idempotencyKey: randomUUID(), artistUserId: artist.userId, title: "عکاسی محصول", description: "پنج تصویر محصول با زمینه سفید", internalNote: "یادداشت داخلی محرمانه" };
    const result = await app.inject({ method: "POST", url: "/api/v1/admin/service-requests", headers: staff.headers, payload: command });
    expect(result.statusCode).toBe(201);
    return { staff, artist, org, partner, command, id: result.json().id as string };
  }
  function assign(s: Awaited<ReturnType<typeof setup>>, version = 0, u = s.partner, org: string = s.org) {
    return app.inject({ method: "POST", url: `/api/v1/admin/service-requests/${s.id}/assignment`, headers: s.staff.headers, payload: { version, partnerOrganizationId: org, partnerUserId: u.userId } });
  }
  function get(u: User, id: string) { return app.inject({ method: "GET", url: `/api/v1/service-partner/assignments/${id}`, headers: u.headers }); }
  function response(u: User, id: string, version: number, decision = "accepted", summary = "پذیرفته شد") { return app.inject({ method: "POST", url: `/api/v1/service-partner/assignments/${id}/response`, headers: u.headers, payload: { version, decision, summary } }); }
  it("replays concurrent creation and rejects changed payload under the same key", async () => {
    const s = await setup(), command = { ...s.command, idempotencyKey: randomUUID() };
    const results = await Promise.all([1, 2].map(() => app.inject({ method: "POST", url: "/api/v1/admin/service-requests", headers: s.staff.headers, payload: command })));
    const id = results[0]!.json().id;
    expect(results.map(r => r.statusCode)).toEqual([201, 201]); expect(results.map(r => r.json().id)).toEqual([id, id]);
    expect((await app.inject({ method: "POST", url: "/api/v1/admin/service-requests", headers: s.staff.headers, payload: { ...command, title: "changed" } })).statusCode).toBe(409);
    expect(await db.serviceRequestEvent.count({ where: { requestId: id } })).toBe(1);
  });
  it("exposes own work scope and conceals another user, another organization and private Artist data", async () => {
    const s = await setup(), colleague = await signIn("service_partner", undefined, s.org), other = await signIn("service_partner", undefined, randomUUID());
    const id = (await assign(s)).json().assignment.id;
    const r = await get(s.partner, id); expect(r.statusCode).toBe(200); expect(r.headers["cache-control"]).toBe("no-store");
    expect(r.json()).toMatchObject({ requestId: s.id, title: s.command.title, commandVersion: 1, status: "assigned" });
    for (const key of ["artistUserId", "internalNote", "artist", "finance", "growth", "phone", "events", "partnerUserId", "requestTraceId"]) expect(r.json()).not.toHaveProperty(key);
    for (const u of [colleague, other]) {
      expect((await get(u, id)).statusCode).toBe(404);
      expect((await response(u, id, 1)).statusCode).toBe(404);
      expect((await app.inject({ method: "GET", url: "/api/v1/service-partner/assignments", headers: u.headers })).json().items).toEqual([]);
    }
    expect((await app.inject({ method: "GET", url: "/api/v1/service-partner/assignments", headers: s.partner.headers })).json().items).toHaveLength(1);
  });
  it("retries assignment and acceptance exactly once and rejects stale or changed commands", async () => {
    const s = await setup(); const a = await Promise.all([assign(s), assign(s)]);
    expect(a.map(r => r.statusCode)).toEqual([201, 201]); expect(a[0]!.json()).toEqual(a[1]!.json());
    const id = a[0]!.json().assignment.id;
    const accepted = await Promise.all([response(s.partner, id, 1), response(s.partner, id, 1)]);
    expect(accepted.map(r => r.statusCode)).toEqual([201, 201]); expect(accepted[0]!.json()).toEqual(accepted[1]!.json());
    expect((await response(s.partner, id, 1, "declined")).statusCode).toBe(409);
    expect((await response(s.partner, id, 2)).statusCode).toBe(409);
    expect((await assign(s, 2)).statusCode).toBe(409);
    expect(await db.serviceRequestEvent.count({ where: { requestId: s.id } })).toBe(3);
    expect(await db.serviceAssignment.count({ where: { requestId: s.id } })).toBe(1);
    expect(await db.financialEvent.count({ where: { actorUserId: s.partner.userId } })).toBe(0);
  });
  it("retains a declined assignment but reveals no replacement partner or later history", async () => {
    const s = await setup(), replacement = await signIn("service_partner", undefined, randomUUID()), replacementOrg = (await db.roleGrant.findUniqueOrThrow({ where: { id: replacement.grantId } })).organizationId!;
    const old = (await assign(s)).json().assignment.id;
    expect((await response(s.partner, old, 1, "declined", "زمان ندارم")).statusCode).toBe(201);
    const next = await assign(s, 2, replacement, replacementOrg); expect(next.statusCode).toBe(201);
    expect((await get(s.partner, next.json().assignment.id)).statusCode).toBe(404);
    const retry = await response(s.partner, old, 1, "declined", "زمان ندارم"); expect(retry.statusCode).toBe(201); expect(retry.json().status).toBe("declined");
    expect((await response(s.partner, old, 3)).statusCode).toBe(409);
    expect(await db.serviceRequestEvent.count({ where: { requestId: s.id } })).toBe(4);
  });
  it("gives the Artist only their request and public operational history", async () => {
    const s = await setup(), other = await signIn(); await assign(s);
    const r = await app.inject({ method: "GET", url: `/api/v1/artist/service-requests/${s.id}`, headers: s.artist.headers });
    expect(r.statusCode).toBe(200); expect(r.json().history).toHaveLength(2);
    for (const key of ["internalNote", "artistUserId", "assignments"]) expect(r.json()).not.toHaveProperty(key);
    expect(r.json().history[0]).not.toHaveProperty("actorUserId");
    expect((await app.inject({ method: "GET", url: `/api/v1/artist/service-requests/${s.id}`, headers: other.headers })).statusCode).toBe(404);
    expect((await app.inject({ method: "GET", url: "/api/v1/artist/service-requests", headers: other.headers })).json().items).toEqual([]);
  });
  it("denies non-services staff and external roles and requires a live matching partner grant", async () => {
    const s = await setup(), finance = await signIn("staff", "finance"), customer = await signIn("customer"), missing = randomUUID();
    for (const u of [finance, customer, s.artist, s.partner]) expect((await app.inject({ method: "GET", url: `/api/v1/admin/service-requests/${s.id}`, headers: u.headers })).statusCode).toBe(403);
    expect((await assign(s, 0, s.partner, missing)).statusCode).toBe(404);
    await db.roleGrant.update({ where: { id: s.partner.grantId }, data: { revokedAt: new Date() } });
    expect((await assign(s)).statusCode).toBe(404);
    expect(await db.serviceAssignment.count({ where: { requestId: s.id } })).toBe(0);
    expect((await app.inject({ method: "GET", url: "/api/v1/service-partner/assignments" })).statusCode).toBe(401);
  });
  it("strictly bounds queries and rejects identity/status overrides", async () => {
    const s = await setup();
    for (const q of ["pageSize=51", "partnerUserId=" + s.partner.userId, "page=1&page=2"]) expect((await app.inject({ method: "GET", url: "/api/v1/service-partner/assignments?" + q, headers: s.partner.headers })).statusCode).toBe(400);
    expect((await app.inject({ method: "POST", url: `/api/v1/admin/service-requests/${s.id}/assignment`, headers: s.staff.headers, payload: { version: 0, partnerOrganizationId: s.org, partnerUserId: s.partner.userId, status: "accepted" } })).statusCode).toBe(400);
  });
  it("rolls assignment and partner response back if their audit event fails", async () => {
    const s = await setup(), suffix = randomUUID().replaceAll("-", ""), name = "service_fail_" + suffix;
    await db.$executeRawUnsafe('CREATE FUNCTION ' + name + '() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."requestId" = \'' + s.id + '\'::uuid THEN RAISE EXCEPTION \'audit failure\'; END IF; RETURN NEW; END $$');
    await db.$executeRawUnsafe('CREATE TRIGGER ' + name + ' BEFORE INSERT ON "service_request_events" FOR EACH ROW EXECUTE FUNCTION ' + name + '()');
    try { expect((await assign(s)).statusCode).toBe(500); } finally { await db.$executeRawUnsafe('DROP TRIGGER ' + name + ' ON "service_request_events"'); }
    expect(await db.serviceAssignment.count({ where: { requestId: s.id } })).toBe(0);
    expect((await db.serviceRequest.findUniqueOrThrow({ where: { id: s.id } })).version).toBe(0);
    const id = (await assign(s)).json().assignment.id;
    await db.$executeRawUnsafe('CREATE TRIGGER ' + name + ' BEFORE INSERT ON "service_request_events" FOR EACH ROW EXECUTE FUNCTION ' + name + '()');
    try { expect((await response(s.partner, id, 1)).statusCode).toBe(500); } finally { await db.$executeRawUnsafe('DROP TRIGGER ' + name + ' ON "service_request_events"'); await db.$executeRawUnsafe('DROP FUNCTION ' + name + '()'); }
    expect((await get(s.partner, id)).json().status).toBe("assigned");
    expect((await db.serviceRequest.findUniqueOrThrow({ where: { id: s.id } })).version).toBe(1);
    expect((await response(s.partner, id, 1)).statusCode).toBe(201);
    await expect(db.serviceRequestEvent.updateMany({ where: { requestId: s.id }, data: { action: "declined" } })).rejects.toThrow();
    await expect(db.serviceRequestEvent.deleteMany({ where: { requestId: s.id } })).rejects.toThrow();
  });
});
