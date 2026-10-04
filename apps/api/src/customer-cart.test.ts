import { describe, expect, it } from "vitest";
import { BadRequestException } from "@nestjs/common";
import { cartView, parseCartCommand } from "./customer-cart.js";

describe("Customer cart contract", () => {
  it("accepts absolute quantities and explicit cart revisions", () => {
    expect(parseCartCommand({ version: 0, quantity: 100 }, true)).toEqual({ version: 0, quantity: 100 });
    expect(parseCartCommand({ version: 5 })).toEqual({ version: 5 });
  });
  it.each([0, -1, 101, 1.5, "1", null, undefined])("rejects invalid quantity %s", (quantity) => {
    expect(() => parseCartCommand({ version: 0, quantity }, true)).toThrow(BadRequestException);
  });
  it.each([{}, { version: "0" }, { version: -1 }, { version: 2147483647 }, { version: 0, userId: "other" }, { version: 0, priceToman: "1" }, { version: 0, quantity: 1 }])("rejects invalid removal/body %j", (body) => {
    expect(() => parseCartCommand(body)).toThrow(BadRequestException);
  });
  it("uses arbitrary-precision subtotals and suppresses hidden product content", () => {
    const product = { id: "p", title: "محصول", priceToman: 9223372036854775807n, imageIds: [], publicationStatus: "published" as const, archivedAt: null, stockQuantity: 100 };
    const cart = { version: 1, items: [{ productId: "p", quantity: 100, product }] };
    expect(cartView(cart)).toMatchObject({ subtotalToman: "922337203685477580700", canCheckout: true });
    expect(cartView({ ...cart, items: [{ ...cart.items[0]!, product: { ...product, publicationStatus: "draft" } }] }))
      .toMatchObject({ subtotalToman: null, canCheckout: false, items: [{ status: "unavailable", product: null, lineSubtotalToman: null }] });
    expect(cartView({ version: 0, items: [] })).toMatchObject({ subtotalToman: "0", canCheckout: false });
  });
});
