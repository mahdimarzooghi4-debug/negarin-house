import { BadRequestException } from "@nestjs/common";
import { describe, expect, it } from "vitest";
import { parseCorporateBuyingInput } from "./corporate-buying.js";

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
