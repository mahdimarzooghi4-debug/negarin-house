import { describe, expect, it } from "vitest";
import { parseArtistOrders, parseArtistProduct, parseArtistProducts } from "./artist-data";

const id = "00000000-0000-4000-8000-000000000001";
const product = {
  id, title: "ظرف سفالی", description: null, category: "سفال", priceToman: "2450000",
  publicationStatus: "published", version: 2, inventoryVersion: 3, stockQuantity: 4,
  availability: "in_stock", archivedAt: null, updatedAt: "2026-11-06T10:00:00.000Z", imageIds: []
};
const orders = {
  page: 1, pageSize: 20, hasMore: false,
  items: [{
    orderId: id, status: "preparing", version: 2,
    createdAt: "2026-11-06T10:00:00.000Z", updatedAt: "2026-11-06T11:00:00.000Z",
    shipment: null, merchandiseSubtotalToman: "2450000",
    items: [{ productId: id, title: "ظرف سفالی", quantity: 1, unitPriceToman: "2450000", imageIds: [] }]
  }]
};

describe("artist API read contracts", () => {
  it("accepts the authoritative product shape and rejects malformed money or inventory state", () => {
    expect(parseArtistProduct(product)?.priceToman).toBe("2450000");
    expect(parseArtistProduct({ ...product, priceToman: "2,450,000" })).toBeNull();
    expect(parseArtistProduct({ ...product, availability: "out_of_stock" })).toBeNull();
  });

  it("rejects a mixed or duplicated product response instead of showing partial data", () => {
    expect(parseArtistProducts([product])?.length).toBe(1);
    expect(parseArtistProducts([product, { ...product, title: "کپی" }])).toBeNull();
    expect(parseArtistProducts([product, null])).toBeNull();
  });

  it("accepts exact order totals and known preparation states", () => {
    expect(parseArtistOrders(orders)?.items[0]?.merchandiseSubtotalToman).toBe("2450000");
  });

  it("fails closed on unsupported states, malformed totals, and out-of-contract pagination", () => {
    expect(parseArtistOrders({ ...orders, items: [{ ...orders.items[0], status: "delivered" }] })).toBeNull();
    expect(parseArtistOrders({ ...orders, items: [{ ...orders.items[0], merchandiseSubtotalToman: "2,450,000" }] })).toBeNull();
    expect(parseArtistOrders({ ...orders, page: 1001 })).toBeNull();
    expect(parseArtistOrders({ ...orders, pageSize: 51 })).toBeNull();
  });
});
