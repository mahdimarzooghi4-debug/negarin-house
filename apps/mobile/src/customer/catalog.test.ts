import { describe, expect, it } from "vitest";
import { catalogPath, parseProduct, parseProductPage, toman } from "./catalog";
const id = "11111111-1111-4111-8111-111111111111";
const product = { id, title: "بشقاب", description: null, category: "میناکاری", dimensions: null, materials: null, weight: null, color: null, technique: null, careInstructions: null, priceToman: "9223372036854775807", imageIds: [], coverImageId: null, availability: "in_stock", createdAt: "2026-11-07T00:00:00.000Z" };
describe("native public catalog contract", () => {
  it("keeps exact prices beyond Number precision and renders Persian digits", () => {
    expect(parseProduct(product).priceToman).toBe("9223372036854775807");
    expect(toman(product.priceToman)).toBe("۹٬۲۲۳٬۳۷۲٬۰۳۶٬۸۵۴٬۷۷۵٬۸۰۷ تومان");
  });
  it("rejects private product responses, unsafe values and inconsistent cover membership", () => {
    for (const bad of [{ artistUserId: id }, { priceToman: "9223372036854775808" }, { availability: "paid" }, { coverImageId: id }, { createdAt: "not-a-date" }]) expect(() => parseProduct({ ...product, ...bad })).toThrow();
  });
  it("rejects duplicate products, pagination mismatches and impossible hasMore envelopes", () => {
    const envelope = { page: 1, pageSize: 10, hasMore: false, items: [product] };
    expect(parseProductPage(envelope, 1).items).toHaveLength(1);
    expect(() => parseProductPage(envelope, 2)).toThrow();
    expect(() => parseProductPage({ ...envelope, items: [product, product] }, 1)).toThrow();
    expect(() => parseProductPage({ ...envelope, hasMore: true }, 1)).toThrow();
  });
  it("encodes catalog filters without inventing authentication or payment fields", () => {
    const path = catalogPath({ page: 2, q: "سفال & چوب", category: "سفال", inStock: true, sort: "price_asc" });
    const query = new URL(path, "https://example.test").searchParams;
    expect(query.get("q")).toBe("سفال & چوب");
    expect(query.get("page")).toBe("2");
    expect(query.get("inStock")).toBe("true");
    expect(() => catalogPath({ page: 1001, q: "", category: "", inStock: false, sort: "newest" })).toThrow();
  });
});
