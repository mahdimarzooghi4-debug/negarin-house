import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";
import { ServiceDeliverableStorage } from "./service-deliverables.js";
import type { ObjectStorage } from "@negarin/storage";
import sharp from "sharp";
describe("Service assignment HTTP and PostgreSQL", () => {
  let app: NestFastifyApplication;
  const db = new PrismaService(), codes = new Map<string, string>();
  const identity = new IdentityCore(db, { async send(phone, code) { codes.set(phone, code); } }, "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(db);
  const fileObjects = new Map<string, { bytes: Uint8Array; type: string }>();
  let fileStorageFails = false, imageBase64: string;
  const fileStore: ObjectStorage = {
    async putImmutableObject(key, bytes, type) { if (fileStorageFails) throw new Error("storage-down"); if (fileObjects.has(key)) throw new Error("immutable-key"); fileObjects.set(key, { bytes, type }); },
    async createReadUrl(key) { if (fileStorageFails || !fileObjects.has(key)) throw new Error("storage-down"); return "https://private-storage.test/" + key + "?signed=test"; },
    async deleteObject(key) { fileObjects.delete(key); },
    async createUploadUrl() { throw new Error("direct-client-upload-disabled"); }
  };
  async function signIn(role: "artist" | "customer" | "staff" | "service_partner" = "artist", domain?: string, organizationId?: string) {
    const phone = `+1555${randomInt(1_000_000, 9_999_999)}`;
    await identity.requestCode(phone); const u = await identity.verifyCode(phone, codes.get(phone)!);
    const grant = await db.roleGrant.create({ data: { userId: u.userId, role, organizationId, ...(domain ? { staffDomains: { create: [{ domain }] } } : {}) } });
    await contexts.select(u.sessionToken, grant.id);
    return { userId: u.userId, grantId: grant.id, headers: { authorization: `Bearer ${u.sessionToken}` } };
  }
  type User = Awaited<ReturnType<typeof signIn>>;
  beforeAll(async () => { app = await createApplication(); await app.init(); await app.getHttpAdapter().getInstance().ready(); await db.$connect();
    Object.defineProperty(app.get(ServiceDeliverableStorage), "store", { value: fileStore });
    imageBase64 = (await sharp({ create: { width: 10, height: 8, channels: 3, background: "red" } }).png().toBuffer()).toString("base64");
  });
  afterAll(async () => { await app?.close(); await db.$disconnect(); });
  async function setup() {
    const staff = await signIn("staff", "services"), artist = await signIn(), org = randomUUID(), partner = await signIn("service_partner", undefined, org);
    const command = { idempotencyKey: randomUUID(), artistUserId: artist.userId, title: "عکاسی محصول", description: "پنج تصویر محصول با زمینه سفید", internalNote: "یادداشت داخلی محرمانه" };
    const result = await app.inject({ method: "POST", url: "/api/v1/admin/service-requests", headers: staff.headers, payload: command });
    expect(result.statusCode).toBe(201);
    return { staff, artist, org, partner, command, id: result.json().id as string };
  }
  async function catalog(staff: User, title = "عکاسی محصول") {
    const created = await app.inject({ method: "POST", url: "/api/v1/admin/service-catalog", headers: staff.headers,
      payload: { idempotencyKey: randomUUID(), title, description: "شرح خدمت قابل درخواست" } });
    expect(created.statusCode).toBe(201); expect(created.json()).toMatchObject({ title, available: false, version: 0 });
    const active = await app.inject({ method: "POST", url: `/api/v1/admin/service-catalog/${created.json().id}/availability`, headers: staff.headers, payload: { version: 0, available: true } });
    expect(active.statusCode).toBe(201); return active.json();
  }
  function assign(s: Awaited<ReturnType<typeof setup>>, version = 0, u = s.partner, org: string = s.org) {
    return app.inject({ method: "POST", url: `/api/v1/admin/service-requests/${s.id}/assignment`, headers: s.staff.headers, payload: { version, partnerOrganizationId: org, partnerUserId: u.userId } });
  }
  function get(u: User, id: string) { return app.inject({ method: "GET", url: `/api/v1/service-partner/assignments/${id}`, headers: u.headers }); }
  function response(u: User, id: string, version: number, decision = "accepted", summary = "پذیرفته شد") { return app.inject({ method: "POST", url: `/api/v1/service-partner/assignments/${id}/response`, headers: u.headers, payload: { version, decision, summary } }); }
  async function accepted() {
    const s = await setup(), assignmentId = (await assign(s)).json().assignment.id as string;
    expect((await response(s.partner, assignmentId, 1)).statusCode).toBe(201);
    return { ...s, assignmentId };
  }
  function times() { return { scheduledStart: new Date(Date.now() + 3600000).toISOString(), scheduledEnd: new Date(Date.now() + 7200000).toISOString() }; }
  function schedule(u: User, id: string, version: number, dates = times()) { return app.inject({ method: "POST", url: `/api/v1/service-partner/assignments/${id}/schedule`, headers: u.headers, payload: { version, ...dates, summary: "برنامه پیشنهادی" } }); }
  function progress(u: User, id: string, version: number, action = "start", summary = "شروع کار") { return app.inject({ method: "POST", url: `/api/v1/service-partner/assignments/${id}/execution`, headers: u.headers, payload: { version, action, summary } }); }
  function review(u: User, id: string, version: number, decision = "completed", summary = "خروجی تأیید شد") { return app.inject({ method: "POST", url: `/api/v1/admin/service-assignments/${id}/execution-review`, headers: u.headers, payload: { version, decision, summary } }); }
  async function working() { const s = await accepted(); await schedule(s.partner, s.assignmentId, 0); await progress(s.partner, s.assignmentId, 1); return s; }
  function fileCommand(version: number, kind = "text", base64 = Buffer.from("گزارش\r\nمتنی").toString("base64")) { return { version, idempotencyKey: randomUUID(), kind, label: "خروجی خدمت", base64 }; }
  function uploadFile(u: User, id: string, payload: object) { return app.inject({ method: "POST", url: `/api/v1/service-partner/assignments/${id}/files`, headers: u.headers, payload }); }
  function readFile(u: User, id: string, fileId: string, audience = "service-partner/assignments") { return app.inject({ method: "GET", url: `/api/v1/${audience}/${id}/files/${fileId}`, headers: u.headers }); }
  function submitFiles(u: User, id: string, version: number, fileIds: string[]) { return app.inject({ method: "POST", url: `/api/v1/service-partner/assignments/${id}/execution`, headers: u.headers, payload: { version, action: "submit", summary: "نتیجه همراه فایل", fileIds } }); }
  it("stores normalized private files and grants Artist access only after explicit submission", async () => {
    const s = await working();
    const uploaded = await uploadFile(s.partner, s.assignmentId, fileCommand(2)); expect(uploaded.statusCode).toBe(201);
    const f = uploaded.json().file; expect(f).toMatchObject({ contentType: "text/plain; charset=utf-8", uploadedExecutionVersion: 3 });
    for (const key of ["objectKey", "uploadedByUserId", "commandHash", "url"]) expect(f).not.toHaveProperty(key);
    const stored = [...fileObjects.entries()].find(([key]) => key.includes(f.id))![1]; expect(Buffer.from(stored.bytes).toString()).toBe("گزارش\nمتنی");
    expect((await readFile(s.artist, s.assignmentId, f.id, "artist/service-assignments")).statusCode).toBe(404);
    const draft = (await app.inject({ method: "GET", url: `/api/v1/artist/service-requests/${s.id}`, headers: s.artist.headers })).json();
    expect(draft.assignment.execution.files).toEqual([]); expect(draft.assignment.execution.history).toHaveLength(3);
    expect((await readFile(s.staff, s.assignmentId, f.id, "admin/service-assignments")).statusCode).toBe(200);
    const submitted = await submitFiles(s.partner, s.assignmentId, 3, [f.id]); expect(submitted.statusCode).toBe(201);
    expect(submitted.json()).toMatchObject({ submissionKind: "report_with_files", submittedFileIds: [f.id] });
    const read = await readFile(s.artist, s.assignmentId, f.id, "artist/service-assignments"); expect(read.statusCode).toBe(200); expect(read.headers["cache-control"]).toBe("no-store"); expect(read.json().expiresInSeconds).toBe(300);
    expect((await review(s.staff, s.assignmentId, 4)).json().history[5].fileIds).toEqual([f.id]);
  });
  it("fully decodes/re-encodes images and rejects fake content without changing execution", async () => {
    const s = await working();
    expect((await uploadFile(s.partner, s.assignmentId, fileCommand(2, "image", Buffer.from("%PDF-1.7").toString("base64")))).statusCode).toBe(400);
    const image = await uploadFile(s.partner, s.assignmentId, fileCommand(2, "image", imageBase64)); expect(image.statusCode).toBe(201);
    const f = image.json().file, object = [...fileObjects.entries()].find(([key]) => key.includes(f.id))![1];
    expect(object.type).toBe("image/webp"); expect((await sharp(object.bytes).metadata()).format).toBe("webp");
    expect(await db.serviceDeliverableFile.count({ where: { assignmentId: s.assignmentId } })).toBe(1);
  });
  it("replays concurrent upload keys and conflicts competing uploads without private orphan leaks", async () => {
    const s = await working(), command = fileCommand(2), before = fileObjects.size;
    const replies = await Promise.all([uploadFile(s.partner, s.assignmentId, command), uploadFile(s.partner, s.assignmentId, command)]);
    expect(replies.map(r => r.statusCode)).toEqual([201, 201]); expect(replies[0]!.json()).toEqual(replies[1]!.json()); expect(fileObjects.size).toBe(before + 1);
    expect((await uploadFile(s.partner, s.assignmentId, { ...command, label: "changed" })).statusCode).toBe(409);
    const competing = await Promise.all([uploadFile(s.partner, s.assignmentId, fileCommand(3)), uploadFile(s.partner, s.assignmentId, fileCommand(3))]);
    expect(competing.map(r => r.statusCode).sort()).toEqual([201, 409]); expect(fileObjects.size).toBe(before + 2);
    const f = replies[0]!.json().file; await submitFiles(s.partner, s.assignmentId, 4, [f.id]); await review(s.staff, s.assignmentId, 5);
    expect((await uploadFile(s.partner, s.assignmentId, command)).json()).toEqual(replies[0]!.json());
    expect((await uploadFile(s.partner, s.assignmentId, fileCommand(6))).statusCode).toBe(409);
  });
  it("conceals files across users, organizations, Artists and assignments and rejects unrelated submission IDs", async () => {
    const s = await working(), colleague = await signIn("service_partner", undefined, s.org), outsider = await signIn("service_partner", undefined, randomUUID()), otherArtist = await signIn(), finance = await signIn("staff", "finance"), other = await working();
    const id = (await uploadFile(s.partner, s.assignmentId, fileCommand(2))).json().file.id;
    for (const u of [colleague, outsider]) { expect((await uploadFile(u, s.assignmentId, fileCommand(3))).statusCode).toBe(404); expect((await readFile(u, s.assignmentId, id)).statusCode).toBe(404); }
    expect((await submitFiles(other.partner, other.assignmentId, 2, [id])).statusCode).toBe(404);
    expect((await readFile(other.partner, other.assignmentId, id)).statusCode).toBe(404);
    await submitFiles(s.partner, s.assignmentId, 3, [id]);
    expect((await readFile(otherArtist, s.assignmentId, id, "artist/service-assignments")).statusCode).toBe(404);
    expect((await readFile(finance, s.assignmentId, id, "admin/service-assignments")).statusCode).toBe(403);
    expect((await uploadFile(s.artist, s.assignmentId, fileCommand(4))).statusCode).toBe(403);
  });
  it("preserves original submission/review file snapshots across corrected replacement results", async () => {
    const s = await working(); const original = (await uploadFile(s.partner, s.assignmentId, fileCommand(2))).json().file.id;
    await submitFiles(s.partner, s.assignmentId, 3, [original]); await review(s.staff, s.assignmentId, 4, "changes_requested"); await progress(s.partner, s.assignmentId, 5);
    const replacement = (await uploadFile(s.partner, s.assignmentId, fileCommand(6, "text", Buffer.from("اصلاح شده").toString("base64")))).json().file.id;
    expect((await readFile(s.artist, s.assignmentId, replacement, "artist/service-assignments")).statusCode).toBe(404);
    await submitFiles(s.partner, s.assignmentId, 7, [replacement]); const done = await review(s.staff, s.assignmentId, 8);
    expect(done.json().submittedFileIds).toEqual([replacement]); expect(done.json().history[4].fileIds).toEqual([original]); expect(done.json().history[5].fileIds).toEqual([original]); expect(done.json().history[9].fileIds).toEqual([replacement]);
    for (const id of [original, replacement]) expect((await readFile(s.artist, s.assignmentId, id, "artist/service-assignments")).statusCode).toBe(200);
    await expect(db.serviceDeliverableFile.updateMany({ where: { assignmentId: s.assignmentId }, data: { label: "changed" } })).rejects.toThrow();
    await expect(db.serviceDeliverableFile.deleteMany({ where: { assignmentId: s.assignmentId } })).rejects.toThrow();
  });
  it("fails storage safely without creating file metadata or history", async () => {
    const s = await working(); fileStorageFails = true;
    try { expect((await uploadFile(s.partner, s.assignmentId, fileCommand(2))).statusCode).toBe(503); } finally { fileStorageFails = false; }
    expect(await db.serviceDeliverableFile.count({ where: { assignmentId: s.assignmentId } })).toBe(0);
    expect((await get(s.partner, s.assignmentId)).json().execution.version).toBe(2);
  });
  it("rolls file metadata/version back and removes uncommitted objects when audit insertion fails", async () => {
    const s = await working(), name = "file_fail_" + randomUUID().replaceAll("-", ""), before = fileObjects.size;
    await db.$executeRawUnsafe('CREATE FUNCTION ' + name + '() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."assignmentId" = \'' + s.assignmentId + '\'::uuid THEN RAISE EXCEPTION \'history failure\'; END IF; RETURN NEW; END $$');
    await db.$executeRawUnsafe('CREATE TRIGGER ' + name + ' BEFORE INSERT ON "service_execution_events" FOR EACH ROW EXECUTE FUNCTION ' + name + '()');
    try { expect((await uploadFile(s.partner, s.assignmentId, fileCommand(2))).statusCode).toBe(500); } finally { await db.$executeRawUnsafe('DROP TRIGGER ' + name + ' ON "service_execution_events"'); await db.$executeRawUnsafe('DROP FUNCTION ' + name + '()'); }
    expect(fileObjects.size).toBe(before); expect(await db.serviceDeliverableFile.count({ where: { assignmentId: s.assignmentId } })).toBe(0);
    expect((await get(s.partner, s.assignmentId)).json().execution.version).toBe(2);
    expect((await uploadFile(s.partner, s.assignmentId, fileCommand(2))).statusCode).toBe(201);
  });
  it("runs schedule, text delivery, requested corrections and explicit staff completion independently of finance", async () => {
    const s = await accepted();
    expect((await get(s.partner, s.assignmentId)).json().execution).toMatchObject({ status: "accepted", version: 0 });
    expect((await schedule(s.partner, s.assignmentId, 0)).statusCode).toBe(201);
    expect((await progress(s.partner, s.assignmentId, 1)).statusCode).toBe(201);
    expect((await progress(s.partner, s.assignmentId, 2, "submit", "گزارش اولیه تحویل شد")).statusCode).toBe(201);
    expect((await review(s.staff, s.assignmentId, 3, "changes_requested", "گزارش را اصلاح کنید")).statusCode).toBe(201);
    expect((await progress(s.partner, s.assignmentId, 4)).statusCode).toBe(201);
    expect((await progress(s.partner, s.assignmentId, 5, "submit", "گزارش اصلاح شده تحویل شد")).statusCode).toBe(201);
    const done = await review(s.staff, s.assignmentId, 6); expect(done.statusCode).toBe(201);
    expect(done.json()).toMatchObject({ status: "completed", version: 7, submissionKind: "text_report", scheduleSource: "partner_proposal" });
    expect(done.json().history).toHaveLength(8); expect(done.json().history[3].summary).toBe("گزارش اولیه تحویل شد");
    expect((await db.serviceRequest.findUniqueOrThrow({ where: { id: s.id } }))).toMatchObject({ status: "accepted", version: 2 });
    expect((await db.serviceAssignment.findUniqueOrThrow({ where: { id: s.assignmentId } })).status).toBe("accepted");
    expect(await db.financialEvent.count({ where: { actorUserId: s.partner.userId } })).toBe(0);
  });
  it("serializes execution retries and rejects stale reschedules and changed actor commands", async () => {
    const s = await accepted(), dates = times();
    const rs = await Promise.all([schedule(s.partner, s.assignmentId, 0, dates), schedule(s.partner, s.assignmentId, 0, dates)]);
    expect(rs.map(r => r.statusCode)).toEqual([201, 201]); expect(rs[0]!.json()).toEqual(rs[1]!.json());
    const starts = await Promise.all([progress(s.partner, s.assignmentId, 1), progress(s.partner, s.assignmentId, 1)]);
    expect(starts.map(r => r.statusCode)).toEqual([201, 201]); expect(starts[0]!.json()).toEqual(starts[1]!.json());
    expect((await schedule(s.partner, s.assignmentId, 0, dates)).statusCode).toBe(409);
    expect((await progress(s.partner, s.assignmentId, 1, "start", "changed")).statusCode).toBe(409);
    expect((await progress(s.partner, s.assignmentId, 2, "submit", "نتیجه")).statusCode).toBe(201);
    const complete = await Promise.all([review(s.staff, s.assignmentId, 3), review(s.staff, s.assignmentId, 3)]);
    expect(complete.map(r => r.statusCode)).toEqual([201, 201]); expect(complete[0]!.json()).toEqual(complete[1]!.json());
    expect(await db.serviceExecutionEvent.count({ where: { assignmentId: s.assignmentId } })).toBe(5);
  });
  it("permits rescheduling before work starts and forbids skips, past schedules and terminal edits", async () => {
    const s = await accepted();
    expect((await progress(s.partner, s.assignmentId, 0)).statusCode).toBe(409);
    expect((await progress(s.partner, s.assignmentId, 0, "submit")).statusCode).toBe(409);
    expect((await review(s.staff, s.assignmentId, 0)).statusCode).toBe(409);
    expect((await schedule(s.partner, s.assignmentId, 0, { scheduledStart: "2020-01-01T00:00:00.000Z", scheduledEnd: "2020-01-01T01:00:00.000Z" })).statusCode).toBe(409);
    expect((await schedule(s.partner, s.assignmentId, 0)).statusCode).toBe(201);
    expect((await schedule(s.partner, s.assignmentId, 1)).statusCode).toBe(201);
    expect((await progress(s.partner, s.assignmentId, 2)).statusCode).toBe(201);
    expect((await schedule(s.partner, s.assignmentId, 3)).statusCode).toBe(409);
    expect((await progress(s.partner, s.assignmentId, 3, "submit")).statusCode).toBe(201);
    expect((await review(s.staff, s.assignmentId, 4)).statusCode).toBe(201);
    expect((await progress(s.partner, s.assignmentId, 5)).statusCode).toBe(409);
    expect((await review(s.staff, s.assignmentId, 5, "changes_requested")).statusCode).toBe(409);
  });
  it("records progress updates as versioned Partner reports without inventing percentage or completion", async () => {
    const s = await accepted();
    expect((await progress(s.partner, s.assignmentId, 0, "update")).statusCode).toBe(409);
    await schedule(s.partner, s.assignmentId, 0); await progress(s.partner, s.assignmentId, 1);
    const r = await progress(s.partner, s.assignmentId, 2, "update", "دو تصویر آماده شد");
    expect(r.statusCode).toBe(201); expect(r.json()).toMatchObject({ status: "in_progress", version: 3, progressSource: "partner_report", progressSummary: "دو تصویر آماده شد", completionSource: null });
    expect(r.json().history[3]).toMatchObject({ fromStatus: "in_progress", toStatus: "in_progress" });
    expect((await progress(s.partner, s.assignmentId, 2, "update", "دو تصویر آماده شد")).statusCode).toBe(201);
    expect((await progress(s.partner, s.assignmentId, 2, "update", "changed")).statusCode).toBe(409);
  });
  it("conceals execution from unassigned users and separates services staff from partners and finance staff", async () => {
    const s = await accepted(), colleague = await signIn("service_partner", undefined, s.org), other = await signIn("service_partner", undefined, randomUUID()), finance = await signIn("staff", "finance");
    for (const u of [colleague, other]) {
      expect((await schedule(u, s.assignmentId, 0)).statusCode).toBe(404);
      expect((await progress(u, s.assignmentId, 0)).statusCode).toBe(404);
    }
    for (const u of [s.artist, s.partner, finance]) expect((await review(u, s.assignmentId, 0)).statusCode).toBe(403);
    expect((await schedule(s.staff, s.assignmentId, 0)).statusCode).toBe(403);
    const raw = await setup(), id = (await assign(raw)).json().assignment.id;
    expect((await schedule(raw.partner, id, 0)).statusCode).toBe(409);
    expect((await response(raw.partner, id, 1, "declined")).statusCode).toBe(201);
    expect((await progress(raw.partner, id, 0)).statusCode).toBe(409);
  });
  it("shares public execution and correction history with the Artist without staff metadata", async () => {
    const s = await accepted(); await schedule(s.partner, s.assignmentId, 0); await progress(s.partner, s.assignmentId, 1); await progress(s.partner, s.assignmentId, 2, "submit", "متن نتیجه");
    await review(s.staff, s.assignmentId, 3, "changes_requested", "توضیح اصلاح");
    const p = (await get(s.partner, s.assignmentId)).json(); expect(p.execution.reviewSummary).toBe("توضیح اصلاح");
    for (const e of p.execution.history) for (const key of ["actorUserId", "requestTraceId", "command"]) expect(e).not.toHaveProperty(key);
    const a = (await app.inject({ method: "GET", url: `/api/v1/artist/service-requests/${s.id}`, headers: s.artist.headers })).json();
    expect(a.assignment.execution.status).toBe("changes_requested"); expect(a.assignment.execution.history[3].summary).toBe("متن نتیجه");
    expect(a).not.toHaveProperty("internalNote"); expect(a.assignment.execution.history[0]).not.toHaveProperty("actorUserId");
    const staff = (await app.inject({ method: "GET", url: `/api/v1/admin/service-requests/${s.id}`, headers: s.staff.headers })).json();
    expect(staff.assignment.execution.history[4].actorUserId).toBe(s.staff.userId);
  });
  it("rolls acceptance, execution and review back when execution history insertion fails", async () => {
    const s = await setup(), id = (await assign(s)).json().assignment.id as string, name = "execution_fail_" + randomUUID().replaceAll("-", "");
    await db.$executeRawUnsafe('CREATE FUNCTION ' + name + '() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."assignmentId" = \'' + id + '\'::uuid THEN RAISE EXCEPTION \'history failure\'; END IF; RETURN NEW; END $$');
    async function trigger() { await db.$executeRawUnsafe('CREATE TRIGGER ' + name + ' BEFORE INSERT ON "service_execution_events" FOR EACH ROW EXECUTE FUNCTION ' + name + '()'); }
    async function untrigger() { await db.$executeRawUnsafe('DROP TRIGGER ' + name + ' ON "service_execution_events"'); }
    try {
      await trigger(); try { expect((await response(s.partner, id, 1)).statusCode).toBe(500); } finally { await untrigger(); }
      expect((await get(s.partner, id)).json()).toMatchObject({ status: "assigned", execution: null });
      expect((await db.serviceRequest.findUniqueOrThrow({ where: { id: s.id } })).version).toBe(1);
      expect((await response(s.partner, id, 1)).statusCode).toBe(201);
      await trigger(); try { expect((await schedule(s.partner, id, 0)).statusCode).toBe(500); } finally { await untrigger(); }
      expect((await get(s.partner, id)).json().execution).toMatchObject({ status: "accepted", version: 0 });
      await schedule(s.partner, id, 0); await progress(s.partner, id, 1); await progress(s.partner, id, 2, "submit");
      await trigger(); try { expect((await review(s.staff, id, 3)).statusCode).toBe(500); } finally { await untrigger(); }
      expect((await get(s.partner, id)).json().execution).toMatchObject({ status: "submitted", version: 3, reviewSummary: null });
      expect((await review(s.staff, id, 3)).statusCode).toBe(201);
      await expect(db.serviceExecutionEvent.updateMany({ where: { assignmentId: id }, data: { summary: "changed" } })).rejects.toThrow();
      await expect(db.serviceExecutionEvent.deleteMany({ where: { assignmentId: id } })).rejects.toThrow();
    } finally { await db.$executeRawUnsafe('DROP FUNCTION ' + name + '()'); }
  });
  it("keeps the service catalog staff-controlled, explicitly available and free of invented commercial fields", async () => {
    const staff = await signIn("staff", "services"), artist = await signIn(), finance = await signIn("staff", "finance"), customer = await signIn("customer");
    const command = { idempotencyKey: randomUUID(), title: "بسته‌بندی", description: "آماده‌سازی بسته‌بندی هنرمند" };
    const created = await app.inject({ method: "POST", url: "/api/v1/admin/service-catalog", headers: staff.headers, payload: command });
    expect(created.statusCode).toBe(201); expect(created.json()).toMatchObject({ title: command.title, available: false, version: 0 });
    for (const key of ["priceToman", "currency", "serviceCredit", "growthLevel", "commissionPercent"]) expect(created.json()).not.toHaveProperty(key);
    expect((await app.inject({ method: "GET", url: "/api/v1/artist/service-catalog", headers: artist.headers })).json().items).toEqual([]);
    expect((await app.inject({ method: "GET", url: `/api/v1/artist/service-catalog/${created.json().id}`, headers: artist.headers })).statusCode).toBe(404);
    expect((await app.inject({ method: "GET", url: "/api/v1/admin/service-catalog", headers: finance.headers })).statusCode).toBe(403);
    expect((await app.inject({ method: "GET", url: "/api/v1/artist/service-catalog", headers: customer.headers })).statusCode).toBe(403);
    expect((await app.inject({ method: "POST", url: "/api/v1/admin/service-catalog", headers: staff.headers, payload: { ...command, idempotencyKey: randomUUID(), priceToman: "1000" } })).statusCode).toBe(400);
    const active = await app.inject({ method: "POST", url: `/api/v1/admin/service-catalog/${created.json().id}/availability`, headers: staff.headers, payload: { version: 0, available: true } });
    expect(active.statusCode).toBe(201); expect(active.json()).toMatchObject({ available: true, version: 1 });
    const visible = (await app.inject({ method: "GET", url: "/api/v1/artist/service-catalog", headers: artist.headers })).json().items[0];
    expect(visible).toEqual({ id: created.json().id, title: command.title, description: command.description });
    const inactive = await app.inject({ method: "POST", url: `/api/v1/admin/service-catalog/${created.json().id}/availability`, headers: staff.headers, payload: { version: 1, available: false } });
    expect(inactive.statusCode).toBe(201); expect((await app.inject({ method: "GET", url: `/api/v1/artist/service-catalog/${created.json().id}`, headers: artist.headers })).statusCode).toBe(404);
  });
  it("serializes catalog creation and availability audit with rollback and immutable history", async () => {
    const staff = await signIn("staff", "services"), command = { idempotencyKey: randomUUID(), title: "عکاسی", description: "خدمت عکاسی محصول" };
    const copies = await Promise.all([1, 2].map(() => app.inject({ method: "POST", url: "/api/v1/admin/service-catalog", headers: staff.headers, payload: command })));
    const id = copies[0]!.json().id as string;
    expect(copies.map(r => r.statusCode)).toEqual([201, 201]); expect(copies.map(r => r.json().id)).toEqual([id, id]);
    expect((await app.inject({ method: "POST", url: "/api/v1/admin/service-catalog", headers: staff.headers, payload: { ...command, title: "changed" } })).statusCode).toBe(409);
    expect(await db.serviceCatalogEvent.count({ where: { itemId: id } })).toBe(1);
    const name = "catalog_fail_" + randomUUID().replaceAll("-", "");
    await db.$executeRawUnsafe('CREATE FUNCTION ' + name + '() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."itemId" = \''
      + id + '\'::uuid THEN RAISE EXCEPTION \'catalog audit failure\'; END IF; RETURN NEW; END $$');
    await db.$executeRawUnsafe('CREATE TRIGGER ' + name + ' BEFORE INSERT ON "service_catalog_events" FOR EACH ROW EXECUTE FUNCTION ' + name + '()');
    try { expect((await app.inject({ method: "POST", url: `/api/v1/admin/service-catalog/${id}/availability`, headers: staff.headers, payload: { version: 0, available: true } })).statusCode).toBe(500); }
    finally { await db.$executeRawUnsafe('DROP TRIGGER ' + name + ' ON "service_catalog_events"'); await db.$executeRawUnsafe('DROP FUNCTION ' + name + '()'); }
    expect(await db.serviceCatalogItem.findUniqueOrThrow({ where: { id } })).toMatchObject({ isActive: false, version: 0 });
    expect((await app.inject({ method: "POST", url: `/api/v1/admin/service-catalog/${id}/availability`, headers: staff.headers, payload: { version: 0, available: true } })).statusCode).toBe(201);
    await expect(db.serviceCatalogEvent.updateMany({ where: { itemId: id }, data: { action: "created" } })).rejects.toThrow();
    await expect(db.serviceCatalogEvent.deleteMany({ where: { itemId: id } })).rejects.toThrow();
  });
  it("lets an Artist request only an active catalog service without private, commercial or identity overrides", async () => {
    const artist = await signIn(), other = await signIn(), customer = await signIn("customer"), staff = await signIn("staff", "services"), service = await catalog(staff);
    const payload = { idempotencyKey: randomUUID(), serviceId: service.id, description: "پنج تصویر محصول با زمینه سفید" };
    const created = await app.inject({ method: "POST", url: "/api/v1/artist/service-requests", headers: artist.headers, payload });
    expect(created.statusCode).toBe(201);
    expect(created.json()).toMatchObject({ serviceId: service.id, title: service.title, description: payload.description, status: "awaiting_assignment", version: 0, assignment: null });
    for (const key of ["artistUserId", "internalNote", "assignments", "priceToman", "serviceCredit"]) expect(created.json()).not.toHaveProperty(key);
    const raw = await db.serviceRequest.findUniqueOrThrow({ where: { id: created.json().id } });
    expect(raw).toMatchObject({ serviceCatalogItemId: service.id, artistUserId: artist.userId, createdByUserId: artist.userId, title: service.title, internalNote: null });
    expect(await db.financialEvent.count({ where: { actorUserId: artist.userId } })).toBe(0);
    expect((await app.inject({ method: "GET", url: `/api/v1/artist/service-requests/${created.json().id}`, headers: other.headers })).statusCode).toBe(404);
    const staffView = await app.inject({ method: "GET", url: `/api/v1/admin/service-requests/${created.json().id}`, headers: staff.headers });
    expect(staffView.statusCode).toBe(200); expect(staffView.json()).toMatchObject({ serviceId: service.id, artistUserId: artist.userId, internalNote: null });
    for (const extra of [{ title: "override" }, { artistUserId: other.userId }, { internalNote: "private" }, { priceToman: "1000" }, { serviceCredit: 1 }, { growthLevel: "سرو زرین" }, { partnerUserId: other.userId }]) {
      expect((await app.inject({ method: "POST", url: "/api/v1/artist/service-requests", headers: artist.headers, payload: { ...payload, idempotencyKey: randomUUID(), ...extra } })).statusCode).toBe(400);
    }
    const unavailable = await app.inject({ method: "POST", url: "/api/v1/admin/service-catalog", headers: staff.headers, payload: { idempotencyKey: randomUUID(), title: "غیرفعال", description: "هنوز قابل درخواست نیست" } });
    expect((await app.inject({ method: "POST", url: "/api/v1/artist/service-requests", headers: artist.headers, payload: { ...payload, idempotencyKey: randomUUID(), serviceId: unavailable.json().id } })).statusCode).toBe(404);
    expect((await app.inject({ method: "POST", url: "/api/v1/artist/service-requests", headers: customer.headers, payload: { ...payload, idempotencyKey: randomUUID() } })).statusCode).toBe(403);
    const org = randomUUID(), partner = await signIn("service_partner", undefined, org);
    const assigned = await app.inject({ method: "POST", url: `/api/v1/admin/service-requests/${created.json().id}/assignment`, headers: staff.headers, payload: { version: 0, partnerOrganizationId: org, partnerUserId: partner.userId } });
    expect(assigned.statusCode).toBe(201);
    const partnerView = await get(partner, assigned.json().assignment.id); expect(partnerView.statusCode).toBe(200); expect(partnerView.json().serviceId).toBe(service.id);
  });
  it("replays an existing Artist request after catalog deactivation but rejects changed reuse", async () => {
    const staff = await signIn("staff", "services"), artist = await signIn(), service = await catalog(staff, "بسته‌بندی");
    const payload = { idempotencyKey: randomUUID(), serviceId: service.id, description: "درخواست آماده‌سازی بسته‌بندی" };
    const results = await Promise.all([1, 2].map(() => app.inject({ method: "POST", url: "/api/v1/artist/service-requests", headers: artist.headers, payload })));
    const id = results[0]!.json().id;
    expect(results.map(r => r.statusCode)).toEqual([201, 201]); expect(results.map(r => r.json().id)).toEqual([id, id]);
    expect((await app.inject({ method: "POST", url: `/api/v1/admin/service-catalog/${service.id}/availability`, headers: staff.headers, payload: { version: 1, available: false } })).statusCode).toBe(201);
    expect((await app.inject({ method: "POST", url: "/api/v1/artist/service-requests", headers: artist.headers, payload })).json().id).toBe(id);
    expect((await app.inject({ method: "POST", url: "/api/v1/artist/service-requests", headers: artist.headers, payload: { ...payload, description: "changed" } })).statusCode).toBe(409);
    expect(await db.serviceRequestEvent.count({ where: { requestId: id } })).toBe(1);
  });
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
