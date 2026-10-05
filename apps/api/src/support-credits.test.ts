import { describe, expect, it } from "vitest";
import type { PrismaService } from "./prisma.service.js";
import {
  parseSupportAllocationCreate, parseSupportProgramCreate, parseSupportRelationshipApproval, parseSupportRelationshipCreate,
  parseSupportReserve, parseSupportTransition, SupportCreditsService
} from "./support-credits.js";

const id = "00000000-0000-4000-8000-000000000001";

describe("Support credit contracts", () => {
  it("accepts descriptive program rules without cash, transfer, expiry or service-price controls", () => {
    expect(parseSupportProgramCreate({ idempotencyKey: id, title: " حمایت عکاسی ", description: " برنامه ", rules: "هر تخصیص کامل استفاده می‌شود" }))
      .toEqual({ idempotencyKey: id, title: "حمایت عکاسی", description: "برنامه", rules: "هر تخصیص کامل استفاده می‌شود" });
    for (const extra of [{ wallet: true }, { expiresAt: "2027-01-01" }, { transferAllowed: true }, { servicePriceToman: "1" }, { payout: true }]) {
      expect(() => parseSupportProgramCreate({ idempotencyKey: id, title: "x", description: "y", rules: "z", ...extra })).toThrow();
    }
  });

  it("requires exact positive Toman strings and never accepts an amount on lifecycle transitions", () => {
    expect(parseSupportAllocationCreate({ idempotencyKey: id, amountToman: "500000" })).toEqual({ idempotencyKey: id, amountToman: "500000" });
    for (const amountToman of [0, "0", "-1", "1.5", "01", 500000]) expect(() => parseSupportAllocationCreate({ idempotencyKey: id, amountToman })).toThrow();
    expect(parseSupportReserve({ version: 0, serviceRequestId: id, reason: "رزرو طبق قواعد برنامه" })).toEqual({ version: 0, serviceRequestId: id, reason: "رزرو طبق قواعد برنامه" });
    expect(parseSupportTransition({ version: 1, reason: "مصرف کامل" })).toEqual({ version: 1, reason: "مصرف کامل" });
    expect(() => parseSupportReserve({ version: 0, serviceRequestId: id, reason: "x", amountToman: "1" })).toThrow();
    expect(() => parseSupportTransition({ version: 1, reason: "x", amountToman: "1" })).toThrow();
  });

  it("requires server-owned Artist and strict versions", () => {
    expect(parseSupportRelationshipCreate({ artistUserId: id })).toEqual({ artistUserId: id });
    expect(parseSupportRelationshipApproval({ version: 0 })).toEqual({ version: 0 });
    expect(() => parseSupportRelationshipCreate({ artistUserId: id, approved: true })).toThrow();
    expect(() => parseSupportRelationshipApproval({ version: "0" })).toThrow();
  });

  it("enforces role boundaries before storage access", async () => {
    const service = new SupportCreditsService({} as PrismaService);
    const program = { idempotencyKey: id, title: "x", description: "y", rules: "z" };
    await expect(service.createOrganizationProgram({ userId: id, activeRole: "artist" }, program, "trace")).rejects.toThrow();
    await expect(service.createNegarinProgram({ userId: id, activeRole: "staff", staffPermissionDomains: ["finance"] }, program, "trace")).rejects.toThrow();
    await expect(service.reserve({ userId: id, activeRole: "staff", staffPermissionDomains: ["artists"] }, id, { version: 0, serviceRequestId: id, reason: "x" }, "trace")).rejects.toThrow();
    await expect(service.reverse({ userId: id, activeRole: "staff", staffPermissionDomains: ["services"] }, id, { version: 0, reason: "x" }, "trace")).rejects.toThrow();
  });
});
