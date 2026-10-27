import { describe, expect, it } from "vitest";
import { parseServiceExecutionReview, parseServiceProgress, parseServiceSchedule, ServiceExecutionService } from "./service-execution.js";
import type { PrismaService } from "./prisma.service.js";
const time = { version: 0, scheduledStart: "2030-01-01T08:00:00Z", scheduledEnd: "2030-01-01T09:00:00Z", summary: " هماهنگی " };
describe("Service execution contracts", () => {
  it("normalizes UTC timestamps and a bounded summary", () => {
    expect(parseServiceSchedule(time)).toMatchObject({ scheduledStart: "2030-01-01T08:00:00.000Z", summary: "هماهنگی" });
  });
  it.each(["2030-02-30T08:00:00Z", "2030-01-01T25:00:00Z", "2030-01-01", "2030-01-01T08:00:00+03:30", "bad"])("rejects invalid or ambiguous schedule %s", scheduledStart => {
    expect(() => parseServiceSchedule({ ...time, scheduledStart })).toThrow();
  });
  it("rejects reversed ranges, version coercion, private and financial overrides", () => {
    for (const change of [{ scheduledEnd: time.scheduledStart }, { version: "0" }, { artistUserId: "x" }, { status: "completed" }, { settled: true }, { summary: "x\u202e" }]) expect(() => parseServiceSchedule({ ...time, ...change })).toThrow();
  });
  it("separates Partner progress and staff review contracts", () => {
    expect(parseServiceProgress({ version: 1, action: "submit", summary: "نتیجه" }).action).toBe("submit");
    expect(parseServiceExecutionReview({ version: 1, decision: "changes_requested", summary: "اصلاح" }).decision).toBe("changes_requested");
    expect(() => parseServiceProgress({ version: 1, action: "completed", summary: "x" })).toThrow();
    expect(() => parseServiceExecutionReview({ version: 1, decision: "accepted", summary: "x" })).toThrow();
    expect(() => parseServiceProgress({ version: 1, action: "submit", summary: "x", fileUrl: "https://example.test" })).toThrow();
    expect(() => parseServiceProgress({ version: 1, action: "submit", summary: "x".repeat(4001) })).toThrow();
  });
  it.each(["customer", "artist", "supporting-organization", "corporate-buyer", "export-partner"] as const)("denies %s before accessing storage", async activeRole => {
    const service = new ServiceExecutionService({} as PrismaService), context = { userId: "external", activeRole };
    await expect(service.schedule(context, "id", parseServiceSchedule(time), "trace")).rejects.toThrow();
    await expect(service.review(context, "id", { version: 1, decision: "completed", summary: "x" }, "trace")).rejects.toThrow();
  });
  it("requires organization context and staff services permission", async () => {
    const service = new ServiceExecutionService({} as PrismaService);
    await expect(service.schedule({ userId: "p", activeRole: "service-partner" }, "id", parseServiceSchedule(time), "trace")).rejects.toThrow();
    await expect(service.review({ userId: "s", activeRole: "staff", staffPermissionDomains: ["finance"] }, "id", { version: 0, decision: "completed", summary: "x" }, "trace")).rejects.toThrow();
  });
});
