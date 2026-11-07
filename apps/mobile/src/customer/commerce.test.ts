import { beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("../api/client", () => ({ apiJson: vi.fn() }));
import { apiJson } from "../api/client";
import { changeCart, parseCustomerCart } from "./cart";
import { parseCustomerOrder, readOrder, readOrders } from "./orders";
const id = "00000000-0000-4000-8000-000000000001";
const other = "00000000-0000-4000-8000-000000000002";
const line = { productId: id, quantity: 1, status: "available", product: { id, title: "اثر", priceToman: "9007199254740993", coverImageId: null }, lineSubtotalToman: "9007199254740993" };
const cart = { version: 0, items: [line], subtotalToman: "9007199254740993", canCheckout: true };
const order = { preparation: [], id, version: 0, status: "reserved", paymentStatus: "unpaid", subtotalToman: "9007199254740993", reservedUntil: "2026-11-07T10:30:00.000Z", createdAt: "2026-11-07T10:00:00.000Z", shippingAddress: { recipientName: "گیرنده", recipientPhone: "+989121234567", province: "تهران", city: "تهران", postalCode: "1234567890", fullAddress: "نشانی آزمون" }, items: [{ productId: id, title: "اثر", quantity: 1, unitPriceToman: "9007199254740993", lineSubtotalToman: "9007199254740993", imageIds: [] }] };
beforeEach(() => vi.mocked(apiJson).mockReset());
describe("native customer commerce", () => {
  it("rejects inconsistent totals, invented checkout eligibility and duplicate lines", () => {
    expect(parseCustomerCart(cart)?.subtotalToman).toBe("9007199254740993");
    for (const bad of [{ subtotalToman: "1" }, { canCheckout: false }, { items: [line, line] }]) expect(parseCustomerCart({ ...cart, ...bad })).toBeNull();
  });
  it("pins removal to the cart revision and requires fresh readback", async () => {
    const fresh = { version: 1, items: [], subtotalToman: "0", canCheckout: false };
    vi.mocked(apiJson).mockResolvedValueOnce(fresh).mockResolvedValueOnce(fresh);
    expect(await changeCart("token", parseCustomerCart(cart)!, id)).toEqual(fresh);
    expect(apiJson).toHaveBeenNthCalledWith(1, "/api/v1/customer/cart/items/" + id, "token", { method: "DELETE", body: '{"version":0}' });
    expect(apiJson).toHaveBeenCalledTimes(2);
  });
  it("does not replay uncertain commands or accept a misleading acknowledgement", async () => {
    vi.mocked(apiJson).mockRejectedValueOnce(new Error("network lost"));
    await expect(changeCart("token", parseCustomerCart(cart)!, id)).rejects.toThrow();
    expect(apiJson).toHaveBeenCalledTimes(1);
    vi.mocked(apiJson).mockReset().mockResolvedValueOnce({ ...cart, version: 1 });
    await expect(changeCart("token", parseCustomerCart(cart)!, id, 2)).rejects.toThrow();
  });
  it("preserves order money snapshots and rejects substituted order IDs", async () => {
    expect(parseCustomerOrder(order)?.subtotalToman).toBe("9007199254740993");
    vi.mocked(apiJson).mockResolvedValueOnce({ ...order, id: other });
    await expect(readOrder("token", id)).rejects.toThrow();
    await expect(readOrders("token", 1001)).rejects.toThrow();
  });
  it("keeps artist dispatch separate from customer receipt and carrier verification", () => {
    const shipment = { id: other, status: "reported_dispatched", source: "artist_report", carrierVerified: false, customerVersion: 0, issue: null, carrierName: "پست", trackingCode: "00123AB", reportedAt: order.createdAt, receipt: null };
    const placed = { ...order, status: "placed", paymentStatus: "paid", preparation: [{ items: [id], status: "ready_for_dispatch", version: 5, shipment }] };
    expect(parseCustomerOrder(placed)?.preparation[0]?.shipment?.receivedAt).toBeNull();
    expect(parseCustomerOrder(placed)?.preparation[0]?.shipment?.trackingCode).toBe("00123AB");
    expect(parseCustomerOrder({ ...placed, preparation: [{ ...placed.preparation[0], shipment: { ...shipment, carrierVerified: true } }] })).toBeNull();
    expect(parseCustomerOrder({ ...placed, preparation: [] })).toBeNull();
  });
});
