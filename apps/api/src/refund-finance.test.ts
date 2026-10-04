import { describe, expect, it } from "vitest";
import { parseRefundReview } from "./refund-finance.js";
const valid = { issueVersion: 2, decision: "approved", amountToman: "9007199254740993", reason: "تأیید" };
describe("Refund review contract", () => {
  it("retains exact Toman text and allows rejection without amount", () => {
    expect(parseRefundReview(valid)).toEqual(valid);
    expect(parseRefundReview({ issueVersion: 2, decision: "rejected", reason: " رد " })).toEqual({ issueVersion: 2, decision: "rejected", reason: "رد" });
  });
  it.each([null, [], {}, { ...valid, issueVersion: -1 }, { ...valid, issueVersion: "2" }, { ...valid, decision: "refunded" },
    { ...valid, amountToman: 123 }, { ...valid, amountToman: "0" }, { ...valid, amountToman: "01" }, { ...valid, amountToman: "1.5" },
    { ...valid, amountToman: "1".repeat(24) }, { ...valid, decision: "rejected" }, { ...valid, reason: "" }, { ...valid, reason: "x".repeat(2001) },
    { ...valid, reason: "bad\ntext" }, { ...valid, actorUserId: "other" }, { ...valid, receiptId: "fake" }
  ])("rejects malformed or privileged decisions %j", body => expect(() => parseRefundReview(body)).toThrow());
});
