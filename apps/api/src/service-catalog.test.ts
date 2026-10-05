import { describe, expect, it } from "vitest";
import { parseServiceCatalogAvailability, parseServiceCatalogCreate, ServiceCatalogService } from "./service-catalog.js";
import type { PrismaService } from "./prisma.service.js";

const id = "00000000-0000-4000-8000-000000000001";

describe("Service catalog contracts", () => {
  it("accepts bounded descriptive catalog content without price, credit or growth fields", () => {
    expect(parseServiceCatalogCreate({ idempotencyKey: id, title: " عکاسی محصول ", description: " پنج تصویر " })).toEqual({
      idempotencyKey: id, title: "عکاسی محصول", description: "پنج تصویر"
    });
    for (const extra of [{ priceToman: "1000" }, { serviceCredit: 1 }, { growthLevel: "سرو زرین" }, { commissionPercent: 10 }]) {
      expect(() => parseServiceCatalogCreate({ idempotencyKey: id, title: "عکس", description: "محصول", ...extra })).toThrow();
    }
  });

  it("requires a strict versioned availability command", () => {
    expect(parseServiceCatalogAvailability({ version: 0, available: true })).toEqual({ version: 0, available: true });
    for (const body of [
      { version: "0", available: true }, { version: -1, available: true }, { version: 0, available: "true" },
      { version: 0, available: true, priceToman: "1000" }
    ]) expect(() => parseServiceCatalogAvailability(body)).toThrow();
  });

  it("denies non-services roles before storage access", async () => {
    const service = new ServiceCatalogService({} as PrismaService);
    await expect(service.create({ userId: id, activeRole: "artist" }, { idempotencyKey: id, title: "x", description: "y" }, "trace")).rejects.toThrow();
    await expect(service.list({ userId: id, activeRole: "customer" }, 1, 20)).rejects.toThrow();
    await expect(service.availability({ userId: id, activeRole: "staff", staffPermissionDomains: ["finance"] }, id, { version: 0, available: true }, "trace")).rejects.toThrow();
  });
});
