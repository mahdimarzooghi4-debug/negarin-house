import { describe, expect, it } from "vitest";
import { BadRequestException } from "@nestjs/common";
import { parseCatalogQuery } from "./public-product-catalog.js";

describe("Public catalog query", () => {
  it("defaults to a bounded newest page", () => {
    expect(parseCatalogQuery({})).toEqual({ page: 1, pageSize: 20, sort: "newest" });
  });
  it("preserves exact Toman boundaries and trims text", () => {
    expect(parseCatalogQuery({ q: "  مینا  ", category: "  سفال  ", minPriceToman: "0", maxPriceToman: "9223372036854775807",
      inStock: "false", page: "1000", pageSize: "50", sort: "price_desc" })).toMatchObject({
        q: "مینا", category: "سفال", minPriceToman: 0n, maxPriceToman: 9223372036854775807n, inStock: false, page: 1000, pageSize: 50
      });
  });
  it.each([
    { minPriceToman: "01" }, { maxPriceToman: "9223372036854775808" }, { minPriceToman: "-1" }, { minPriceToman: "1.5" },
    { minPriceToman: "2", maxPriceToman: "1" }, { page: "0" }, { page: "1001" }, { pageSize: "51" }, { pageSize: "1.5" },
    { inStock: "1" }, { sort: "random" }, { q: " " }, { category: "x".repeat(201) }, { page: ["1", "2"] },
    { q: { contains: "secret" } }, { publicationStatus: "draft" }, { artistUserId: "foreign" }
  ])("rejects malformed/unbounded query %j", (query) => {
    expect(() => parseCatalogQuery(query)).toThrow(BadRequestException);
  });
});
