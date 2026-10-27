import { describe, expect, it } from "vitest";
import { parseServiceAssign, parseServiceCreate, parseServiceResponse, ServiceAssignmentsService } from "./service-assignments.js";
import type { PrismaService } from "./prisma.service.js";
const id = "00000000-0000-4000-8000-000000000001";
describe("Service assignment contracts", () => {
  it("normalizes work scope without accepting financial or growth commands", () => {
    expect(parseServiceCreate({ idempotencyKey: id, artistUserId: id, title: " عکس ", description: " محصول " }).title).toBe("عکس");
    for (const extra of [{ priceToman: "1000" }, { growthLevel: "سرو زرین" }, { artistPhone: "0912" }]) expect(() => parseServiceCreate({ idempotencyKey: id, artistUserId: id, title: "عکس", description: "محصول", ...extra })).toThrow();
  });
  it("rejects missing, oversized and control-character work scope", () => {
    for (const title of [null, "", "x".repeat(201), "x\n", "x\u202e"]) expect(() => parseServiceCreate({ idempotencyKey: id, artistUserId: id, title, description: "scope" })).toThrow();
    expect(() => parseServiceCreate({ idempotencyKey: [], artistUserId: id, title: "x", description: "y" })).toThrow();
  });
  it("requires explicit organization and user IDs with a strict version", () => {
    expect(parseServiceAssign({ version: 0, partnerOrganizationId: id, partnerUserId: id }).version).toBe(0);
    for (const version of [-1, "0", 1.5, 2147483647]) expect(() => parseServiceAssign({ version, partnerOrganizationId: id, partnerUserId: id })).toThrow();
    expect(() => parseServiceAssign({ version: 0, partnerOrganizationId: id })).toThrow();
  });
  it("accepts only an explicit accept/decline response with bounded public summary", () => {
    expect(parseServiceResponse({ version: 1, decision: "declined", summary: " وقت ندارم " }).summary).toBe("وقت ندارم");
    for (const body of [{ version: 1, decision: "completed", summary: "x" }, { version: 1, decision: "accepted" }, { version: 1, decision: "accepted", summary: "x", actorUserId: id }]) expect(() => parseServiceResponse(body)).toThrow();
  });
  it.each(["customer", "artist", "supporting-organization", "corporate-buyer", "export-partner"] as const)("denies %s before storage access", async activeRole => {
    const s = new ServiceAssignmentsService({} as PrismaService), c = { userId: id, activeRole };
    await expect(s.assignments(c, 1, 20)).rejects.toThrow();
    await expect(s.create(c, { idempotencyKey: id, artistUserId: id, title: "x", description: "y" }, "trace")).rejects.toThrow();
  });
  it("rejects a partner without an organization and staff without services permission", async () => {
    const s = new ServiceAssignmentsService({} as PrismaService);
    await expect(s.assignments({ userId: id, activeRole: "service-partner" }, 1, 20)).rejects.toThrow();
    await expect(s.requests({ userId: id, activeRole: "staff", staffPermissionDomains: ["finance"] }, 1, 20, true)).rejects.toThrow();
  });
});
