import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("Support credit HTTP and PostgreSQL", () => {
  let app: NestFastifyApplication;
  const db = new PrismaService(), codes = new Map<string, string>();
  const identity = new IdentityCore(db, { async send(phone, code) { codes.set(phone, code); } }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(db);

  async function signIn(role: "artist" | "customer" | "staff" | "service_partner" | "supporting_organization" = "artist", domain?: string, organizationId?: string) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone); const u = await identity.verifyCode(phone, codes.get(phone)!);
    const grant = await db.roleGrant.create({ data: { userId: u.userId, role, organizationId, ...(domain ? { staffDomains: { create: [{ domain }] } } : {}) } });
    await contexts.select(u.sessionToken, grant.id);
    return { userId: u.userId, grantId: grant.id, organizationId, headers: { authorization: `Bearer ${u.sessionToken}` } };
  }
  type User = Awaited<ReturnType<typeof signIn>>;

  beforeAll(async () => { app = await createApplication(); await app.init(); await app.getHttpAdapter().getInstance().ready(); await db.$connect(); });
  afterAll(async () => { await app?.close(); await db.$disconnect(); });

  async function externalSupport() {
    const organizationId = randomUUID(), supporter = await signIn("supporting_organization", undefined, organizationId);
    const artist = await signIn(), staffArtists = await signIn("staff", "artists");
    const programCommand = { idempotencyKey: randomUUID(), title: "حمایت خدمات هنری", description: "اعتبار پولی غیرقابل نقدشدن", rules: "هر تخصیص به طور کامل استفاده می‌شود و قواعد لغو توسط برنامه تعیین می‌شود" };
    const program = await app.inject({ method: "POST", url: "/api/v1/supporting-organization/support-programs", headers: supporter.headers, payload: programCommand });
    expect(program.statusCode).toBe(201);
    const relationship = await app.inject({ method: "POST", url: `/api/v1/supporting-organization/support-programs/${program.json().id}/relationships`, headers: supporter.headers, payload: { artistUserId: artist.userId } });
    expect(relationship.statusCode).toBe(201); expect(relationship.json()).toMatchObject({ artistUserId: artist.userId, eligible: false, version: 0 });
    const approved = await app.inject({ method: "POST", url: `/api/v1/admin/support-relationships/${relationship.json().id}/approve`, headers: staffArtists.headers, payload: { version: 0 } });
    expect(approved.statusCode).toBe(201); expect(approved.json()).toMatchObject({ eligible: true, version: 1 });
    return { organizationId, supporter, artist, staffArtists, program: program.json(), relationship: approved.json(), programCommand };
  }

  async function allocation(s: Awaited<ReturnType<typeof externalSupport>>, amountToman = "500000", key = randomUUID()) {
    return app.inject({ method: "POST", url: `/api/v1/supporting-organization/support-relationships/${s.relationship.id}/allocations`, headers: s.supporter.headers, payload: { idempotencyKey: key, amountToman } });
  }

  async function serviceRequest(artist: User) {
    const staff = await signIn("staff", "services");
    const catalog = await app.inject({ method: "POST", url: "/api/v1/admin/service-catalog", headers: staff.headers,
      payload: { idempotencyKey: randomUUID(), title: "عکاسی محصول", description: "خدمت عکاسی", } });
    expect(catalog.statusCode).toBe(201);
    expect((await app.inject({ method: "POST", url: `/api/v1/admin/service-catalog/${catalog.json().id}/availability`, headers: staff.headers, payload: { version: 0, available: true } })).statusCode).toBe(201);
    const request = await app.inject({ method: "POST", url: "/api/v1/artist/service-requests", headers: artist.headers,
      payload: { idempotencyKey: randomUUID(), serviceId: catalog.json().id, description: "نیاز به اجرای خدمت با حمایت" } });
    expect(request.statusCode).toBe(201);
    return { staff, request: request.json() };
  }

  it("requires sponsor approval plus explicit Negarin approval and scopes external programs to their organization", async () => {
    const organizationId = randomUUID(), supporter = await signIn("supporting_organization", undefined, organizationId), outsider = await signIn("supporting_organization", undefined, randomUUID());
    const artist = await signIn(), customer = await signIn("customer"), staffArtists = await signIn("staff", "artists");
    const command = { idempotencyKey: randomUUID(), title: "برنامه حمایتی", description: "برای همه خدمات", rules: "استفاده کامل از هر تخصیص" };
    const copies = await Promise.all([1, 2].map(() => app.inject({ method: "POST", url: "/api/v1/supporting-organization/support-programs", headers: supporter.headers, payload: command })));
    expect(copies.map(r => r.statusCode)).toEqual([201, 201]); expect(copies[0]!.json().id).toBe(copies[1]!.json().id);
    const program = copies[0]!.json(); expect(program).toMatchObject({ source: "supporting_organization", organizationId, rules: command.rules });
    for (const key of ["wallet", "cashable", "transferAllowed", "expiresAt", "servicePriceToman"]) expect(program).not.toHaveProperty(key);
    expect((await app.inject({ method: "GET", url: `/api/v1/supporting-organization/support-programs/${program.id}`, headers: outsider.headers })).statusCode).toBe(404);
    expect((await app.inject({ method: "GET", url: "/api/v1/supporting-organization/support-programs", headers: customer.headers })).statusCode).toBe(403);
    expect((await app.inject({ method: "POST", url: "/api/v1/supporting-organization/support-programs", headers: supporter.headers, payload: { ...command, idempotencyKey: randomUUID(), expiresAt: "2027-01-01" } })).statusCode).toBe(400);

    const relationship = await app.inject({ method: "POST", url: `/api/v1/supporting-organization/support-programs/${program.id}/relationships`, headers: supporter.headers, payload: { artistUserId: artist.userId } });
    expect(relationship.statusCode).toBe(201); expect(relationship.json()).toMatchObject({ eligible: false, artistUserId: artist.userId, version: 0 });
    expect((await app.inject({ method: "POST", url: `/api/v1/supporting-organization/support-relationships/${relationship.json().id}/allocations`, headers: supporter.headers, payload: { idempotencyKey: randomUUID(), amountToman: "100000" } })).statusCode).toBe(404);
    const approved = await app.inject({ method: "POST", url: `/api/v1/admin/support-relationships/${relationship.json().id}/approve`, headers: staffArtists.headers, payload: { version: 0 } });
    expect(approved.statusCode).toBe(201); expect(approved.json().eligible).toBe(true);
    expect((await app.inject({ method: "GET", url: `/api/v1/artist/support-relationships/${relationship.json().id}`, headers: artist.headers })).statusCode).toBe(200);
  });

  it("keeps CSR programs inside Negarin while using the same dual-approval relationship and full-use allocation model", async () => {
    const staffArtists = await signIn("staff", "artists"), artist = await signIn(), supporter = await signIn("supporting_organization", undefined, randomUUID());
    const program = await app.inject({ method: "POST", url: "/api/v1/admin/support-programs", headers: staffArtists.headers,
      payload: { idempotencyKey: randomUUID(), title: "مسئولیت اجتماعی نگارین", description: "برنامه داخلی نگارین", rules: "اعتبار غیرقابل نقد و انتقال" } });
    expect(program.statusCode).toBe(201); expect(program.json()).toMatchObject({ source: "negarin_csr", organizationId: null });
    const relationship = await app.inject({ method: "POST", url: `/api/v1/admin/support-programs/${program.json().id}/relationships`, headers: staffArtists.headers, payload: { artistUserId: artist.userId } });
    expect(relationship.statusCode).toBe(201); expect(relationship.json().eligible).toBe(false);
    expect((await app.inject({ method: "POST", url: `/api/v1/admin/support-relationships/${relationship.json().id}/approve`, headers: staffArtists.headers, payload: { version: 0 } })).statusCode).toBe(201);
    const credit = await app.inject({ method: "POST", url: `/api/v1/admin/support-relationships/${relationship.json().id}/allocations`, headers: staffArtists.headers, payload: { idempotencyKey: randomUUID(), amountToman: "750000" } });
    expect(credit.statusCode).toBe(201); expect(credit.json()).toMatchObject({ amountToman: "750000", status: "available", version: 0 });
    expect((await app.inject({ method: "GET", url: `/api/v1/supporting-organization/support-allocations/${credit.json().id}`, headers: supporter.headers })).statusCode).toBe(404);
    const artistView = await app.inject({ method: "GET", url: `/api/v1/artist/support-allocations/${credit.json().id}`, headers: artist.headers });
    expect(artistView.statusCode).toBe(200); expect(artistView.json().program.source).toBe("negarin_csr");
  });

  it("reserves whole allocations, allows multiple support sources per request, and separates consume/release/reverse from payment", async () => {
    const s = await externalSupport(), usage = await serviceRequest(s.artist), finance = await signIn("staff", "finance"), staffArtistsOnly = await signIn("staff", "artists");
    const first = await allocation(s, "500000"), second = await allocation(s, "250000");
    expect(first.statusCode).toBe(201); expect(second.statusCode).toBe(201);
    expect(first.json().amountToman).toBe("500000"); expect(first.json()).not.toHaveProperty("expiresAt");
    const reserve = await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${first.json().id}/reserve`, headers: usage.staff.headers,
      payload: { version: 0, serviceRequestId: usage.request.id, reason: "رزرو کامل اعتبار برای این خدمت" } });
    expect(reserve.statusCode).toBe(201); expect(reserve.json()).toMatchObject({ amountToman: "500000", status: "reserved", version: 1 });
    expect(reserve.json().currentServiceRequest).toMatchObject({ id: usage.request.id, description: "نیاز به اجرای خدمت با حمایت" });
    expect((await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${second.json().id}/reserve`, headers: usage.staff.headers,
      payload: { version: 0, serviceRequestId: usage.request.id, reason: "منبع دوم حمایت" } })).statusCode).toBe(201);
    expect((await db.supportAllocation.count({ where: { currentServiceRequestId: usage.request.id, status: "reserved" } }))).toBe(2);

    expect((await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${first.json().id}/consume`, headers: usage.staff.headers,
      payload: { version: 1, reason: "مصرف کامل طبق قواعد برنامه" } })).json()).toMatchObject({ status: "consumed", version: 2, amountToman: "500000" });
    expect((await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${second.json().id}/release`, headers: usage.staff.headers,
      payload: { version: 1, reason: "نیاز خدمت لغو شد" } })).json()).toMatchObject({ status: "available", version: 2, currentServiceRequest: null });
    expect((await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${first.json().id}/reverse`, headers: usage.staff.headers,
      payload: { version: 2, reason: "wrong actor" } })).statusCode).toBe(403);
    expect((await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${first.json().id}/reverse`, headers: staffArtistsOnly.headers,
      payload: { version: 2, reason: "wrong domain" } })).statusCode).toBe(403);
    const reversed = await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${first.json().id}/reverse`, headers: finance.headers,
      payload: { version: 2, reason: "اصلاح مصرف اشتباه توسط نگارین" } });
    expect(reversed.statusCode).toBe(201); expect(reversed.json()).toMatchObject({ status: "available", version: 3, currentServiceRequest: null });
    expect(reversed.json().history.map((e: { action: string }) => e.action)).toEqual(["allocated", "reserved", "consumed", "reversed"]);
    expect(new Set(reversed.json().history.map((e: { amountToman: string }) => e.amountToman))).toEqual(new Set(["500000"]));
  });

  it("writes SupportUsed in the same transaction as consumption and rolls both back when outbox insertion fails", async () => {
    const s = await externalSupport(), usage = await serviceRequest(s.artist), credit = await allocation(s, "610000");
    const id = credit.json().id as string;
    expect((await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${id}/reserve`, headers: usage.staff.headers,
      payload: { version: 0, serviceRequestId: usage.request.id, reason: "رزرو برای آزمون outbox" } })).statusCode).toBe(201);

    const functionName = "support_outbox_fail_" + randomUUID().replaceAll("-", "");
    await db.$executeRawUnsafe('CREATE FUNCTION ' + functionName + '() RETURNS trigger LANGUAGE plpgsql AS $ BEGIN IF NEW."eventKey" = \'support-used:' + id + ':2\' THEN RAISE EXCEPTION \'outbox failure\'; END IF; RETURN NEW; END $');
    await db.$executeRawUnsafe('CREATE TRIGGER ' + functionName + ' BEFORE INSERT ON "outbox_events" FOR EACH ROW EXECUTE FUNCTION ' + functionName + '()');
    try {
      expect((await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${id}/consume`, headers: usage.staff.headers,
        payload: { version: 1, reason: "مصرف کامل" } })).statusCode).toBe(500);
    } finally {
      await db.$executeRawUnsafe('DROP TRIGGER ' + functionName + ' ON "outbox_events"');
      await db.$executeRawUnsafe('DROP FUNCTION ' + functionName + '()');
    }

    expect(await db.supportAllocation.findUniqueOrThrow({ where: { id } })).toMatchObject({
      status: "reserved", version: 1, currentServiceRequestId: usage.request.id
    });
    expect(await db.supportCreditEvent.count({ where: { allocationId: id, action: "consumed" } })).toBe(0);
    expect(await db.outboxEvent.count({ where: { eventKey: `support-used:${id}:2` } })).toBe(0);

    const consumed = await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${id}/consume`, headers: usage.staff.headers,
      payload: { version: 1, reason: "مصرف کامل" } });
    expect(consumed.statusCode).toBe(201);
    expect(consumed.json()).toMatchObject({ status: "consumed", version: 2, amountToman: "610000" });

    const event = await db.outboxEvent.findUniqueOrThrow({ where: { eventKey: `support-used:${id}:2` } });
    expect(event).toMatchObject({
      type: "support_used", aggregateType: "SupportAllocation", aggregateId: id,
      dispatchedAt: null, attemptCount: 0
    });
    expect(event.payload).toEqual({
      allocationId: id,
      serviceRequestId: usage.request.id,
      programId: s.program.id,
      relationshipId: s.relationship.id,
      artistUserId: s.artist.userId,
      amountToman: "610000"
    });

    expect((await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${id}/consume`, headers: usage.staff.headers,
      payload: { version: 1, reason: "مصرف کامل" } })).statusCode).toBe(201);
    expect(await db.outboxEvent.count({ where: { eventKey: `support-used:${id}:2` } })).toBe(1);

    await expect(db.outboxEvent.update({ where: { id: event.id }, data: { aggregateId: randomUUID() } })).rejects.toThrow();
    await expect(db.outboxEvent.delete({ where: { id: event.id } })).rejects.toThrow();
  });

  it("conceals support across Artists/organizations and gives the sponsor linked support usage details without exposing a transfer surface", async () => {
    const s = await externalSupport(), usage = await serviceRequest(s.artist), credit = await allocation(s), otherArtist = await signIn(), outsider = await signIn("supporting_organization", undefined, randomUUID()), partner = await signIn("service_partner", undefined, randomUUID());
    await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${credit.json().id}/reserve`, headers: usage.staff.headers,
      payload: { version: 0, serviceRequestId: usage.request.id, reason: "رزرو" } });
    const orgView = await app.inject({ method: "GET", url: `/api/v1/supporting-organization/support-allocations/${credit.json().id}`, headers: s.supporter.headers });
    expect(orgView.statusCode).toBe(200); expect(orgView.json().currentServiceRequest).toMatchObject({ id: usage.request.id, title: "عکاسی محصول", description: "نیاز به اجرای خدمت با حمایت" });
    expect((await app.inject({ method: "GET", url: `/api/v1/supporting-organization/support-allocations/${credit.json().id}`, headers: outsider.headers })).statusCode).toBe(404);
    expect((await app.inject({ method: "GET", url: `/api/v1/artist/support-allocations/${credit.json().id}`, headers: otherArtist.headers })).statusCode).toBe(404);
    expect((await app.inject({ method: "GET", url: "/api/v1/artist/support-allocations", headers: partner.headers })).statusCode).toBe(403);
    for (const key of ["transferToArtistUserId", "cashable", "walletBalance", "payout", "expiresAt"]) expect(orgView.json()).not.toHaveProperty(key);
  });

  it("authorizes support relationship scope before resolving retries across organization contexts", async () => {
    const firstOrg = randomUUID(), secondOrg = randomUUID();
    const supporter = await signIn("supporting_organization", undefined, firstOrg);
    const token = supporter.headers.authorization.replace("Bearer ", "");
    const secondGrant = await db.roleGrant.create({ data: { userId: supporter.userId, role: "supporting_organization", organizationId: secondOrg } });
    const artist = await signIn(), staffArtists = await signIn("staff", "artists");

    const createRelationship = async (organizationId: string, grantId: string, title: string) => {
      expect((await contexts.select(token, grantId))?.organizationId).toBe(organizationId);
      const program = await app.inject({ method: "POST", url: "/api/v1/supporting-organization/support-programs", headers: supporter.headers,
        payload: { idempotencyKey: randomUUID(), title, description: "برنامه چند سازمانی", rules: "استفاده کامل" } });
      expect(program.statusCode).toBe(201);
      const relationship = await app.inject({ method: "POST", url: `/api/v1/supporting-organization/support-programs/${program.json().id}/relationships`,
        headers: supporter.headers, payload: { artistUserId: artist.userId } });
      expect(relationship.statusCode).toBe(201);
      const approved = await app.inject({ method: "POST", url: `/api/v1/admin/support-relationships/${relationship.json().id}/approve`,
        headers: staffArtists.headers, payload: { version: 0 } });
      expect(approved.statusCode).toBe(201);
      return approved.json();
    };

    const firstRelationship = await createRelationship(firstOrg, supporter.grantId, "برنامه سازمان اول");
    const key = randomUUID();
    const first = await app.inject({ method: "POST", url: `/api/v1/supporting-organization/support-relationships/${firstRelationship.id}/allocations`,
      headers: supporter.headers, payload: { idempotencyKey: key, amountToman: "333000" } });
    expect(first.statusCode).toBe(201);
    expect(first.json().program.organizationId).toBe(firstOrg);

    expect((await contexts.select(token, secondGrant.id))?.organizationId).toBe(secondOrg);
    const leakedRetry = await app.inject({ method: "POST", url: `/api/v1/supporting-organization/support-relationships/${firstRelationship.id}/allocations`,
      headers: supporter.headers, payload: { idempotencyKey: key, amountToman: "333000" } });
    expect(leakedRetry.statusCode).toBe(404);

    const secondRelationship = await createRelationship(secondOrg, secondGrant.id, "برنامه سازمان دوم");
    const second = await app.inject({ method: "POST", url: `/api/v1/supporting-organization/support-relationships/${secondRelationship.id}/allocations`,
      headers: supporter.headers, payload: { idempotencyKey: key, amountToman: "333000" } });
    expect(second.statusCode).toBe(201);
    expect(second.json().id).not.toBe(first.json().id);
    expect(second.json().program.organizationId).toBe(secondOrg);
    expect(await db.supportAllocation.count({ where: { createdByUserId: supporter.userId, idempotencyKey: key } })).toBe(2);

    expect((await contexts.select(token, supporter.grantId))?.organizationId).toBe(firstOrg);
    const replay = await app.inject({ method: "POST", url: `/api/v1/supporting-organization/support-relationships/${firstRelationship.id}/allocations`,
      headers: supporter.headers, payload: { idempotencyKey: key, amountToman: "333000" } });
    expect(replay.statusCode).toBe(201);
    expect(replay.json().id).toBe(first.json().id);
  });

  it("serializes allocation idempotency and rolls lifecycle state back when the append-only support ledger fails", async () => {
    const s = await externalSupport(), usage = await serviceRequest(s.artist), key = randomUUID();
    const copies = await Promise.all([1, 2].map(() => allocation(s, "900000", key)));
    expect(copies.map(r => r.statusCode)).toEqual([201, 201]); expect(copies[0]!.json().id).toBe(copies[1]!.json().id);
    expect((await allocation(s, "900001", key)).statusCode).toBe(409);
    const id = copies[0]!.json().id as string, name = "support_fail_" + randomUUID().replaceAll("-", "");
    await db.$executeRawUnsafe('CREATE FUNCTION ' + name + '() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."allocationId" = \'' + id + '\'::uuid THEN RAISE EXCEPTION \'support audit failure\'; END IF; RETURN NEW; END $$');
    await db.$executeRawUnsafe('CREATE TRIGGER ' + name + ' BEFORE INSERT ON "support_credit_events" FOR EACH ROW EXECUTE FUNCTION ' + name + '()');
    try {
      expect((await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${id}/reserve`, headers: usage.staff.headers,
        payload: { version: 0, serviceRequestId: usage.request.id, reason: "rollback" } })).statusCode).toBe(500);
    } finally {
      await db.$executeRawUnsafe('DROP TRIGGER ' + name + ' ON "support_credit_events"');
      await db.$executeRawUnsafe('DROP FUNCTION ' + name + '()');
    }
    expect(await db.supportAllocation.findUniqueOrThrow({ where: { id } })).toMatchObject({ status: "available", version: 0, currentServiceRequestId: null });
    expect((await app.inject({ method: "POST", url: `/api/v1/admin/support-allocations/${id}/reserve`, headers: usage.staff.headers,
      payload: { version: 0, serviceRequestId: usage.request.id, reason: "retry" } })).statusCode).toBe(201);
    await expect(db.supportCreditEvent.updateMany({ where: { allocationId: id }, data: { amountToman: 1n } })).rejects.toThrow();
    await expect(db.supportCreditEvent.deleteMany({ where: { allocationId: id } })).rejects.toThrow();
    await expect(db.supportAllocation.update({ where: { id }, data: { amountToman: 1n } })).rejects.toThrow();
    await expect(db.supportAllocation.delete({ where: { id } })).rejects.toThrow();
  });
});
