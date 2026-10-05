import { describe, expect, it } from "vitest";
import type { PrismaService } from "./prisma.service.js";
import { SupportReportingService } from "./support-reporting.js";

const id = "00000000-0000-4000-8000-000000000001";

describe("Support reporting authorization", () => {
  it("requires exact audience roles and a reports-domain staff grant", async () => {
    const service = new SupportReportingService({} as PrismaService);
    await expect(service.summary({ userId: id, activeRole: "customer" }, "artist")).rejects.toThrow();
    await expect(service.summary({ userId: id, activeRole: "artist" }, "organization")).rejects.toThrow();
    await expect(service.summary({ userId: id, activeRole: "supporting-organization" }, "organization")).rejects.toThrow();
    await expect(service.summary({ userId: id, activeRole: "staff", staffPermissionDomains: ["artists"] }, "staff")).rejects.toThrow();
    await expect(service.activity({ userId: id, activeRole: "staff", staffPermissionDomains: ["finance"] }, "staff", 1, 20)).rejects.toThrow();
  });
});
