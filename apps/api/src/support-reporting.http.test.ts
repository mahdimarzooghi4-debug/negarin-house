import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("Support reporting HTTP read models", () => {
  let app: NestFastifyApplication;
  const db = new PrismaService(), codes = new Map<string, string>();
  const identity = new IdentityCore(db, { async send(phone, code) { codes.set(phone, code); } }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(db);

  async function signIn(role: "artist" | "customer" | "staff" | "service_partner" | "supporting_organization" = "artist", domain?: string, organizationId?: string) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone); const u = await identity.verifyCode(phone, codes.get(phone)!);
    const grant = await db.roleGrant.create({ data: { userId: u.userId, role, organizationId, ...(domain ? { staffDomains: { create: [{ domain }] } } : {}) } });
    await contexts.select(u.sessionToken, grant.id);
    return { userId: u.userId, organizationId, headers: { authorization: `Bearer ${u.sessionToken}` } };
  }
  type User = Awaited<ReturnType<typeof signIn>>;

  beforeAll(async () => { app = await createApplication(); await app.init(); await app.getHttpAdapter().getInstance().ready(); await db.$connect(); });
  afterAll(async () => { await app?.close(); await db.$disconnect(); });

  async function createExternalCredit(supporter: User, artist: User, staffArtists: User, amountToman: string, title: string) {
    const program = await app.inject({ method: "POST", url: "/api/v1/supporting-organization/support-programs", headers: supporter.headers,
      payload: { idempotencyKey: randomUUID(), title, description: "گزارش‌پذیر", rules: "استفاده کامل از هر تخصیص" } });
    expect(program.statusCode).toBe(201);
    const relationship = await app.inject({ method: "POST", url: `/api/v1/supporting-organization/support-programs/${program.json().id}/relationships`, headers: supporter.headers, payload: { artistUserId: artist.userId } });
    expect(relationship.statusCode).toBe(201);
    const approved = await app.inject({ method: "POST", url: `/api/v1/admin/support-relationships/${relationship.json().id}/approve`, headers: staffArtists.headers, payload: { version: 0 } });
    expect(approved.statusCode).toBe(201);
    const allocation = await app.inject({ method: "POST", url: `/api/v1/supporting-organization/support-relationships/${relationship.json().id}/allocations`, headers: supporter.headers,
      payload: { idempotencyKey: randomUUID(), amountToman } });
    expect(allocation.statusCode).toBe(201);
    return { program: program.json(), relationship: approved.json(), allocation: allocation.json() };
  }

  async function createCsrCredit(artist: User, staffArtists: User, amountToman: string) {
    const program = await app.inject({ method: "POST", url: "/api/v1/admin/support-programs", headers: staffArtists.headers,
      payload: { idempotencyKey: randomUUID(), title: "CSR نگارین", description: "حمایت داخلی", rules: "استفاده کامل" } });
    expect(program.statusCode).toBe(201);
    const relationship = await app.inject({ method: "POST", url: `/api/v1/admin/support-programs/${program.json().id}/relationships`, headers: staffArtists.headers, payload: { artistUserId: artist.userId } });
    expect(relationship.statusCode).toBe(201);
    expect((await app.inject({ method: "POST", url: `/api/v1/admin/support-relationships/${relationship.json().id}/approve`, headers: staffArtists.headers, payload: { version: 0 } })).statusCode).toBe(201);
    const allocation = await app.inject({ method: "POST", url: `/api/v1/admin/support-relationships/${relationship.json().id}/allocations`, headers: staffArtists.headers,
      payload: { idempotencyKey: randomUUID(), amountToman } });
    expect(allocation.statusCode).toBe(201);
    return { program: program.json(), allocation: allocation.json() };
  }

  async function serviceRequest(artist: User, services: User) {
    const catalog = await app.inject({ method: "POST", url: "/api/v1/admin/service-catalog", headers: services.headers,
      payload: { idempotencyKey: randomUUID(), title: "عکاسی محصول", description: "خدمت برای گزارش حمایت" } });
    expect(catalog.statusCode).toBe(201);
    expect((await app.inject({ method: "POST", url: `/api/v1/admin/service-catalog/${catalog.json().id}/availability`, headers: services.headers, payload: { version: 0, available: true } })).statusCode).toBe(201);
    const request = await app.inject({ method: "POST", url: "/api/v1/artist/service-requests", headers: artist.headers,
      payload: { idempotencyKey: randomUUID(), serviceId: catalog.json().id, description: "درخواست متصل به گزارش حمایت" } });
    expect(request.statusCode).toBe(201);
    return request.json();
  }

  it("derives exact current balances and lifecycle volumes from the authoritative support ledger with tenant/self scope", async () => {
    const staffArtists = await signIn("staff", "artists"), services = await signIn("staff", "services"), reports = await signIn("staff", "reports");
    const org1 = await signIn("supporting_organization", undefined, randomUUID()), org2 = await signIn("supporting_organization", undefined, randomUUID());
    const artist1 = await signIn(), artist2 = await signIn(), otherArtist = await signIn();
    const first = await createExternalCredit(org1, artist1, staffArtists, "500000", "حمایت اول");
    const second = await app.inject({ method: "POST", url: `/api/v1/supporting-organization/support-relationships/${first.relationship.id}/allocations`, headers: org1.headers,
      payload: { idempotencyKey: randomUUID(), amountToman: "300000" } });
    expect(second.statusCode).toBe(201);
    await createCsrCredit(artist1, staffArtists, "200000");
    await createExternalCredit(org2, artist2, staffArtists, "700000", "حمایت سازمان دوم");
    const request = await serviceRequest(artist1, services);

    const reserve1 = await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${first.allocation.id}/reserve`, headers: services.headers,
      payload: { version: 0, serviceRequestId: request.id, reason: "رزرو برای خدمت" } });
    expect(reserve1.statusCode).toBe(201);
    expect((await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${first.allocation.id}/consume`, headers: services.headers,
      payload: { version: 1, reason: "مصرف کامل حمایت" } })).statusCode).toBe(201);

    const reserve2 = await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${second.json().id}/reserve`, headers: services.headers,
      payload: { version: 0, serviceRequestId: request.id, reason: "رزرو دوم" } });
    expect(reserve2.statusCode).toBe(201);
    expect((await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${second.json().id}/release`, headers: services.headers,
      payload: { version: 1, reason: "آزادسازی طبق قاعده برنامه" } })).statusCode).toBe(201);

    const orgReport = await app.inject({ method: "GET", url: "/api/v1/supporting-organization/support-report", headers: org1.headers });
    expect(orgReport.statusCode).toBe(200);
    expect(orgReport.json().totals).toEqual({
      programs: 1, relationships: 1, eligibleRelationships: 1, pendingNegarinApprovalRelationships: 0,
      allocations: 2, allocatedToman: "800000", currentAvailableToman: "300000", currentReservedToman: "0", currentConsumedToman: "500000"
    });
    expect(orgReport.json().lifecycle).toMatchObject({
      allocated: { count: 2, amountToman: "800000" },
      reserved: { count: 2, amountToman: "800000" },
      consumed: { count: 1, amountToman: "500000" },
      released: { count: 1, amountToman: "300000" },
      reversed: { count: 0, amountToman: "0" }
    });
    expect(orgReport.json().programs[0].program).toMatchObject({ id: first.program.id, organizationId: org1.organizationId, title: "حمایت اول" });

    const artistReport = await app.inject({ method: "GET", url: "/api/v1/artist/support-report", headers: artist1.headers });
    expect(artistReport.statusCode).toBe(200);
    expect(artistReport.json().totals).toMatchObject({
      programs: 2, relationships: 2, eligibleRelationships: 2, allocations: 3,
      allocatedToman: "1000000", currentAvailableToman: "500000", currentReservedToman: "0", currentConsumedToman: "500000"
    });
    expect((await app.inject({ method: "GET", url: "/api/v1/artist/support-report", headers: otherArtist.headers })).json().totals)
      .toEqual({ programs: 0, relationships: 0, eligibleRelationships: 0, pendingNegarinApprovalRelationships: 0, allocations: 0, allocatedToman: "0", currentAvailableToman: "0", currentReservedToman: "0", currentConsumedToman: "0" });

    const org2Report = await app.inject({ method: "GET", url: "/api/v1/supporting-organization/support-report", headers: org2.headers });
    expect(org2Report.json().totals).toMatchObject({ programs: 1, allocations: 1, allocatedToman: "700000", currentAvailableToman: "700000" });

    const admin = await app.inject({ method: "GET", url: "/api/v1/admin/support-report", headers: reports.headers });
    expect(admin.statusCode).toBe(200);
    const adminProgramIds = new Set(admin.json().programs.map((p: { program: { id: string } }) => p.program.id));
    expect(adminProgramIds.has(first.program.id)).toBe(true);
    expect(admin.json().programs.some((p: { program: { title: string } }) => p.program.title === "CSR نگارین")).toBe(true);
    expect(BigInt(admin.json().totals.allocatedToman)).toBeGreaterThanOrEqual(1_700_000n);
    expect((await app.inject({ method: "GET", url: "/api/v1/admin/support-report", headers: staffArtists.headers })).statusCode).toBe(403);
  });

  it("provides paginated support activity without leaking technical commands, other tenants, or Partner access", async () => {
    const staffArtists = await signIn("staff", "artists"), services = await signIn("staff", "services"), reports = await signIn("staff", "reports");
    const supporter = await signIn("supporting_organization", undefined, randomUUID()), outsider = await signIn("supporting_organization", undefined, randomUUID());
    const artist = await signIn(), partner = await signIn("service_partner", undefined, randomUUID());
    const credit = await createExternalCredit(supporter, artist, staffArtists, "410000", "گزارش فعالیت");
    const request = await serviceRequest(artist, services);
    expect((await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${credit.allocation.id}/reserve`, headers: services.headers,
      payload: { version: 0, serviceRequestId: request.id, reason: "رزرو گزارش‌شونده" } })).statusCode).toBe(201);
    expect((await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${credit.allocation.id}/release`, headers: services.headers,
      payload: { version: 1, reason: "آزادسازی گزارش‌شونده" } })).statusCode).toBe(201);

    const activity = await app.inject({ method: "GET", url: "/api/v1/supporting-organization/support-activity?page=1&pageSize=2", headers: supporter.headers });
    expect(activity.statusCode).toBe(200); expect(activity.json()).toMatchObject({ page: 1, pageSize: 2, hasMore: true });
    expect(activity.json().items).toHaveLength(2);
    for (const item of activity.json().items) {
      expect(item).not.toHaveProperty("command");
      expect(JSON.stringify(item)).not.toContain("idempotencyKey");
      expect(item.program).toMatchObject({ id: credit.program.id, organizationId: supporter.organizationId });
      expect(item.relationship).toMatchObject({ id: credit.relationship.id, artistUserId: artist.userId });
    }
    const fullOrgActivity = await app.inject({ method: "GET", url: "/api/v1/supporting-organization/support-activity?page=1&pageSize=10", headers: supporter.headers });
    const released = fullOrgActivity.json().items.find((e: { action: string }) => e.action === "released");
    expect(released).toMatchObject({
      action: "released", amountToman: "410000", reason: "آزادسازی گزارش‌شونده",
      serviceRequest: { id: request.id, title: "عکاسی محصول", description: "درخواست متصل به گزارش حمایت" }
    });

    const artistActivity = await app.inject({ method: "GET", url: "/api/v1/artist/support-activity?page=1&pageSize=10", headers: artist.headers });
    expect(artistActivity.statusCode).toBe(200); expect(artistActivity.json().items.map((e: { action: string }) => e.action).sort()).toEqual(["allocated", "released", "reserved"]);
    expect((await app.inject({ method: "GET", url: "/api/v1/supporting-organization/support-activity", headers: outsider.headers })).json().items).toEqual([]);
    expect((await app.inject({ method: "GET", url: "/api/v1/artist/support-activity", headers: partner.headers })).statusCode).toBe(403);
    const adminActivity = await app.inject({ method: "GET", url: "/api/v1/admin/support-activity?page=1&pageSize=50", headers: reports.headers });
    expect(adminActivity.statusCode).toBe(200); expect(adminActivity.json().items.some((e: { id: string }) => e.id === activity.json().items[0].id)).toBe(true);
  });
});
