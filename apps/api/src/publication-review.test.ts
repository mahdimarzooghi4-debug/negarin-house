import { describe, expect, it } from "vitest";
import { BadRequestException } from "@nestjs/common";
import { parsePublicationReviewDecision } from "./publication-review.js";

describe("Publication review request contract", () => {
  it("accepts approval without feedback and requires feedback for requested changes", () => {
    expect(parsePublicationReviewDecision({ decision: "approved" })).toEqual({ decision: "approved" });
    expect(parsePublicationReviewDecision({ decision: "changes_requested", feedback: "تصویر واضح نیست" }))
      .toEqual({ decision: "changes_requested", feedback: "تصویر واضح نیست" });
    expect(() => parsePublicationReviewDecision({ decision: "changes_requested", feedback: "   " }))
      .toThrow(BadRequestException);
  });

  it("rejects unsupported decisions and any attempt to send product pricing", () => {
    expect(() => parsePublicationReviewDecision({ decision: "published" })).toThrow(BadRequestException);
    expect(() => parsePublicationReviewDecision({ decision: "approved", priceToman: "1" }))
      .toThrow(BadRequestException);
  });
});
