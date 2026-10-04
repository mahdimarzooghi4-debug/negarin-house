import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { parseCheckout, parseOrderPage } from "./customer-orders.js";
const body = { cartVersion: 1, addressBookVersion: 2, addressId: randomUUID(), idempotencyKey: randomUUID(), expectedSubtotalToman: "18014398509481986" };
describe("Checkout contracts", () => {
  it("preserves exact prices and canonicalizes UUIDs", () => {
    expect(parseCheckout({ ...body, addressId: body.addressId.toUpperCase() })).toEqual(body);
    expect(parseCheckout({ ...body, expectedSubtotalToman: "46116860184273879035000" }).expectedSubtotalToman).toBe("46116860184273879035000");
  });
  it.each([null, [], {}, { ...body, cartVersion: -1 }, { ...body, addressBookVersion: 0.5 }, { ...body, cartVersion: "1" },
    { ...body, cartVersion: 2147483647 }, { ...body, addressId: "invalid" }, { ...body, idempotencyKey: "key" },
    { ...body, expectedSubtotalToman: 123 }, { ...body, expectedSubtotalToman: "01" }, { ...body, expectedSubtotalToman: "0" },
    { ...body, expectedSubtotalToman: "1".repeat(24) }, { ...body, userId: randomUUID() }, { ...body, status: "paid" }, { ...body, shippingFeeToman: "0" }
  ])("rejects malformed or privileged checkout %j", v => { expect(() => parseCheckout(v)).toThrow(); });
  it("bounds paging with strict query fields", () => {
    expect(parseOrderPage({})).toEqual({ page: 1, pageSize: 20 });
    expect(parseOrderPage({ page: "1000", pageSize: "50" })).toEqual({ page: 1000, pageSize: 50 });
    for (const q of [{ page: "0" }, { page: "1001" }, { pageSize: "51" }, { page: ["1", "2"] }, { userId: "other" }]) expect(() => parseOrderPage(q)).toThrow();
  });
});
