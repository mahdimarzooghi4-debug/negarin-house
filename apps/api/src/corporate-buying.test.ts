import { BadRequestException } from "@nestjs/common";
import { describe, expect, it } from "vitest";
import { parseCorporateBuyingInput, parseCorporateProposalInput } from "./corporate-buying.js";

describe("Corporate Buyer buying input contract", () => {
  it("accepts a bounded quantity and trims the optional note", () => {
    expect(parseCorporateBuyingInput({
      productId: "00000000-0000-4000-8000-000000000001", quantity: 4, note: "  برای شعبهٔ مرکزی  "
    })).toEqual({ productId: "00000000-0000-4000-8000-000000000001", quantity: 4, note: "برای شعبهٔ مرکزی" });
  });

  it.each([
    { productId: "bad", quantity: 1 },
    { productId: "00000000-0000-4000-8000-000000000001", quantity: 0 },
    { productId: "00000000-0000-4000-8000-000000000001", quantity: 1.5 },
    { productId: "00000000-0000-4000-8000-000000000001", quantity: 1_000_001 },
    { productId: "00000000-0000-4000-8000-000000000001", quantity: 1, extra: true }
  ])("rejects malformed or unbounded input", (input) => {
    expect(() => parseCorporateBuyingInput(input)).toThrow(BadRequestException);
  });
});

describe("Artist Corporate Buyer proposal input contract", () => {
  it("accepts a positive Toman quote and trims the optional buyer note", () => {
    expect(parseCorporateProposalInput({ unitPriceToman: "125000", note: "  آماده‌سازی تا یک هفته  " }))
      .toEqual({ unitPriceToman: 125_000n, note: "آماده‌سازی تا یک هفته" });
  });

  it.each([
    null,
    { unitPriceToman: "0" },
    { unitPriceToman: "-1" },
    { unitPriceToman: "9223372036854775808" },
    { unitPriceToman: "1000", extra: true },
    { unitPriceToman: "1000", note: "x".repeat(2001) }
  ])("rejects malformed or unbounded proposals", (input) => {
    expect(() => parseCorporateProposalInput(input)).toThrow(BadRequestException);
  });
});
