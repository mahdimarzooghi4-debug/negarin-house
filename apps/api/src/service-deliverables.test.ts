import { describe, expect, it } from "vitest";
import { normalizeDeliverable, parseDeliverableUpload, ServiceDeliverablesService } from "./service-deliverables.js";
import { parseServiceProgress } from "./service-execution.js";
import type { PrismaService } from "./prisma.service.js";
import type { ServiceDeliverableStorage } from "./service-deliverables.js";
const id = "00000000-0000-4000-8000-000000000001";
const command = { version: 2, idempotencyKey: id, kind: "text", label: " گزارش ", base64: Buffer.from("گزارش").toString("base64") };
describe("Service deliverable contracts", () => {
  it("requires strict canonical bytes, label and idempotency without URLs or storage keys", () => {
    expect(parseDeliverableUpload(command).label).toBe("گزارش");
    for (const change of [{ kind: "pdf" }, { base64: "" }, { base64: "YWJj=" }, { label: "x\u202e" }, { version: "2" }, { objectKey: "external" }, { url: "https://example.test" }]) expect(() => parseDeliverableUpload({ ...command, ...change })).toThrow();
    expect(() => parseDeliverableUpload({ ...command, base64: Buffer.alloc(1024 * 1024 + 1).toString("base64") })).toThrow();
  });
  it("decodes UTF8 strictly and canonicalizes line endings as plain text", async () => {
    const n = await normalizeDeliverable("text", Buffer.from("گزارش\r\nخط دوم"));
    expect(n.contentType).toBe("text/plain; charset=utf-8"); expect(n.bytes.toString()).toBe("گزارش\nخط دوم");
  });
  it.each([Buffer.from([0xff]), Buffer.from("\u0000bad"), Buffer.from("\u001b[31m"), Buffer.from("x\u202e"), Buffer.from("  ")])("rejects malformed or unsafe text bytes", async bytes => {
    await expect(normalizeDeliverable("text", bytes)).rejects.toThrow();
  });
  it("rejects fake image containers rather than accepting declared kinds", async () => {
    for (const bytes of [Buffer.from("%PDF-1.7"), Buffer.from("<svg xmlns='http://www.w3.org/2000/svg'></svg>"), Buffer.from("<html>payload</html>")]) await expect(normalizeDeliverable("image", bytes)).rejects.toThrow();
  });
  it("accepts only unique same-shape submission file IDs and forbids them on progress", () => {
    expect(parseServiceProgress({ version: 3, action: "submit", summary: "x", fileIds: [id] }).fileIds).toEqual([id]);
    for (const fileIds of [[id, id.toUpperCase()], Array(9).fill(id), ["bad"], id]) expect(() => parseServiceProgress({ version: 3, action: "submit", summary: "x", fileIds })).toThrow();
    expect(() => parseServiceProgress({ version: 3, action: "update", summary: "x", fileIds: [] })).toThrow();
  });
  it.each(["artist", "customer", "supporting-organization", "corporate-buyer", "export-partner"] as const)("denies %s upload before accessing storage", async activeRole => {
    const s = new ServiceDeliverablesService({} as PrismaService, {} as ServiceDeliverableStorage);
    await expect(s.upload({ userId: id, activeRole }, id, parseDeliverableUpload(command), "trace")).rejects.toThrow();
    await expect(s.read({ userId: id, activeRole }, id, id, "staff")).rejects.toThrow();
  });
});
