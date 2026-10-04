import { describe, expect, it } from "vitest";
import { parseSupportCommand, parseSupportPage } from "./shipment-issue-support.js";
const review = { version: 0, status: "in_review", summary: "پیگیری" };
describe("Shipment support contracts", () => {
  it("accepts review/reopening and requires a bounded public closure summary and outcome", () => {
    expect(parseSupportCommand({ ...review, summary: " پیگیری " })).toEqual(review);
    for (const resolution of ["customer_follow_up_complete", "referred_for_refund_review"]) expect(parseSupportCommand({ ...review, status: "closed", resolution }).resolution).toBe(resolution);
  });
  it.each([null, [], {}, { ...review, version: -1 }, { ...review, version: "0" }, { ...review, version: 2147483647 },
    { ...review, status: "open" }, { ...review, status: "closed" }, { ...review, resolution: "customer_follow_up_complete" },
    { ...review, status: "closed", resolution: "refunded" }, { ...review, summary: "" }, { ...review, summary: "x".repeat(2001) },
    { ...review, summary: "bad\ntext" }, { ...review, actorUserId: "other" }, { ...review, receivedAt: "2000-01-01" }
  ])("rejects invalid support commands %j", body => expect(() => parseSupportCommand(body)).toThrow());
  it("bounds and strictly filters support pages", () => {
    expect(parseSupportPage({ status: "open", pageSize: "50" })).toEqual({ status: "open", page: 1, pageSize: 50 });
    for (const q of [{ status: ["open"] }, { status: "refunded" }, { pageSize: "51" }, { customerUserId: "other" }]) expect(() => parseSupportPage(q)).toThrow();
  });
});
