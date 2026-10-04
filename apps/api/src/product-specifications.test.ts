import { describe, expect, it } from "vitest";
import { BadRequestException } from "@nestjs/common";
import { parseArtistProductWrite } from "./artist-products.js";
import { specificationLimits } from "./product-specifications.js";

describe("Product specification contract", () => {
  it("trims multilingual text and permits explicit clearing", () => {
    expect(parseArtistProductWrite({ dimensions: "  ارتفاع ۲۵ سانتی‌متر  ", materials: null, version: 3 }, true))
      .toEqual({ dimensions: "ارتفاع ۲۵ سانتی‌متر", materials: null, version: 3 });
    expect(parseArtistProductWrite({ title: "محصول", priceToman: "1200", technique: "Handmade" }))
      .toMatchObject({ technique: "Handmade" });
  });
  it.each(Object.entries(specificationLimits))("bounds and validates %s", (field, limit) => {
    for (const value of [" ", "x".repeat(limit + 1), 123, [], {}]) {
      expect(() => parseArtistProductWrite({ [field]: value, version: 0 }, true)).toThrow(BadRequestException);
    }
    expect(parseArtistProductWrite({ [field]: "x".repeat(limit), version: 0 }, true)).toHaveProperty(field);
  });
  it.each([undefined, null, "0", -1, 0.5, 2147483647])("requires a valid revision for specification edits: %s", (version) => {
    expect(() => parseArtistProductWrite({ materials: "مس", version }, true)).toThrow(BadRequestException);
  });
  it("rejects revision-only patches, revision on creation and unknown fields", () => {
    expect(() => parseArtistProductWrite({ version: 0 }, true)).toThrow(BadRequestException);
    expect(() => parseArtistProductWrite({ title: "محصول", priceToman: "1", version: 0 })).toThrow(BadRequestException);
    expect(() => parseArtistProductWrite({ materialz: "مس", version: 0 }, true)).toThrow(BadRequestException);
  });
});
