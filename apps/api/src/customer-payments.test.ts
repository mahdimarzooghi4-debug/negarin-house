import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { gatewayCall, PaymentGateway, parseEmptyPaymentBody, parsePaymentStart } from "./customer-payments.js";
const body = { version: 1, idempotencyKey: randomUUID(), expectedPayableToman: "18014398509481986" };
describe("Payment contracts and disabled gateway", () => {
  it("keeps money exact and canonicalizes retry keys", () => {
    expect(parsePaymentStart({ ...body, idempotencyKey: body.idempotencyKey.toUpperCase() })).toEqual(body);
  });
  it.each([null, [], {}, { ...body, version: -1 }, { ...body, version: "1" }, { ...body, version: 2147483647 },
    { ...body, expectedPayableToman: 123 }, { ...body, expectedPayableToman: "0" }, { ...body, expectedPayableToman: "01" },
    { ...body, expectedPayableToman: "1".repeat(25) }, { ...body, idempotencyKey: "key" }, { ...body, status: "paid" }, { ...body, shippingFeeToman: "0" }
  ])("rejects malformed or forged payment start %j", input => { expect(() => parsePaymentStart(input)).toThrow(); });
  it("accepts no browser proof, amount or receipt in verification", () => {
    parseEmptyPaymentBody({});
    for (const v of [undefined, null, [], { status: "paid" }, { amount: "1" }, { receipt: "paid" }]) expect(() => parseEmptyPaymentBody(v)).toThrow();
  });
  it("has no enabled or fake production gateway", async () => {
    const g = new PaymentGateway(); expect(g.enabled).toBe(false); expect(g.acceptsRedirect(new URL("https://example.com"))).toBe(false);
    await expect(g.start({ attemptId: randomUUID(), orderId: randomUUID(), amountToman: "1" })).rejects.toThrow();
    await expect(g.verify({ reference: "r", amountToman: "1" })).rejects.toThrow();
  });
  it("bounds hung calls and sends cancellation without inventing a payment result", async () => {
    let signal!: AbortSignal;
    await expect(gatewayCall(s => { signal = s; return new Promise(() => {}); }, 5)).rejects.toThrow("gateway-timeout");
    expect(signal.aborted).toBe(true);
    expect(await gatewayCall(async () => "real-result", 50)).toBe("real-result");
  });
});
