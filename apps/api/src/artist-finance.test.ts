import { describe, expect, it } from "vitest";
import type { AuthorizationContext } from "@negarin/authz";
import { ArtistFinanceService, financeAmounts, type FinanceFacts } from "./artist-finance.js";
import type { PrismaService } from "./prisma.service.js";
const clear: FinanceFacts = { merchandise: 9007199254740993n, approvedRefund: 0n, paid: true, verifiedPayment: true, receiptConfirmed: true, issueOpen: false, refundReviewPending: false };
describe("Domestic finance positions", () => {
  it("preserves exact amounts with zero commission and no assumed shipping or settled cash", () => {
    expect(financeAmounts(clear)).toMatchObject({ merchandiseSubtotalToman: "9007199254740993", reviewableForSettlementToman: "9007199254740993", commissionToman: "0", recordedSettledToman: "0", shippingAllocationToman: null, settlementStatus: "awaiting_finance_review" });
  });
  it.each([{ paid: false }, { verifiedPayment: false }, { receiptConfirmed: false }, { issueOpen: true }, { refundReviewPending: true }, { approvedRefund: 1n }])
    ("holds settlement for missing evidence or unresolved execution case %#", flags => {
      const result = financeAmounts({ ...clear, ...flags });
      expect(result.reviewableForSettlementToman).toBe("0"); expect(result.settlementStatus).toBe("blocked"); expect(result.holds).not.toHaveLength(0);
    });
  it("separates approved from executed refund with exact subtraction", () => {
    expect(financeAmounts({ ...clear, approvedRefund: 1n })).toMatchObject({ remainingMerchandiseToman: "9007199254740992", approvedRefundToman: "1", recordedRefundExecutedToman: "0" });
  });
  it.each([{ merchandise: -1n }, { approvedRefund: -1n }, { approvedRefund: 9007199254740994n }])("conceals an invalid net amount case %#", flags => {
    const p = financeAmounts({ ...clear, ...flags });
    expect(p.remainingMerchandiseToman).toBeNull(); expect(p.holds).toContain("financial_records_inconsistent");
  });
  it.each(["customer", "service-partner", "supporting-organization", "corporate-buyer", "export-partner"] as const)("denies external role %s before database access", async activeRole => {
    const service = new ArtistFinanceService({} as PrismaService);
    const context: AuthorizationContext = { userId: "external", activeRole };
    await expect(service.listArtist(context, 1, 20)).rejects.toThrow();
    await expect(service.listStaff(context, 1, 20)).rejects.toThrow();
  });
});
