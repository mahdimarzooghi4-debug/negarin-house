import { describe, expect, it } from "vitest";
import { BadRequestException } from "@nestjs/common";
import { parseArtistProductId, parseArtistProductWrite } from "./artist-products.js";

describe("Artist product request contract", () => {
  it("parses Toman amounts as exact integers and trims the product title", () => {
    expect(parseArtistProductWrite({
      title: "  بشقاب میناکاری  ",
      description: null,
      priceToman: "9223372036854775807"
    })).toEqual({
      title: "بشقاب میناکاری",
      description: null,
      priceToman: 9_223_372_036_854_775_807n
    });
  });

  it.each(["0", "-1", "1.5", "01", "9223372036854775808"])("rejects invalid Toman value %s", (priceToman) => {
    expect(() => parseArtistProductWrite({ title: "محصول", priceToman })).toThrow(BadRequestException);
  });

  it("rejects client-supplied ownership, price numbers, and malformed IDs", () => {
    expect(() => parseArtistProductWrite({ title: "محصول", priceToman: 1200 })).toThrow(BadRequestException);
    expect(() => parseArtistProductWrite({ title: "محصول", priceToman: "1200", artistUserId: "someone-else" }))
      .toThrow(BadRequestException);
    expect(() => parseArtistProductId("not-a-uuid")).toThrow(BadRequestException);
  });
});
