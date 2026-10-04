import { describe, expect, it } from "vitest";
import { artistSaleAmounts, FinancialEventsService, parseFinancialEventPage } from "./financial-events.js";
import type { PrismaService } from "./prisma.service.js";
describe("Financial journal contracts", () => {
  it("groups snapshotted merchandise exactly without allocating shipping", () => {
    expect(artistSaleAmounts([{ artistUserId: "b", unitPriceToman: 9007199254740993n, quantity: 2 }, { artistUserId: "a", unitPriceToman: 1n, quantity: 1 }, { artistUserId: "b", unitPriceToman: 7n, quantity: 1 }]))
      .toEqual([{ artistUserId: "a", amountToman: "1" }, { artistUserId: "b", amountToman: "18014398509481993" }]);
  });
  it("strictly bounds filters, forbidding repeated IDs and identity overrides", () => {
    expect(parseFinancialEventPage({})).toEqual({ page: 1, pageSize: 20 });
    for (const q of [{ orderId: ["00000000-0000-4000-8000-000000000000"] }, { orderId: "bad" }, { pageSize: "51" }, { actorUserId: "other" }]) expect(() => parseFinancialEventPage(q)).toThrow();
  });
  it.each(["customer", "service-partner", "supporting-organization", "corporate-buyer", "export-partner"] as const)("denies external role %s before querying", async activeRole => {
    const service = new FinancialEventsService({} as PrismaService), query = { page: 1, pageSize: 20 };
    await expect(service.artist({ userId: "external", activeRole }, query)).rejects.toThrow();
    await expect(service.staff({ userId: "external", activeRole }, query)).rejects.toThrow();
  });
});
