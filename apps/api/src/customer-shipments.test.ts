import { describe, expect, it } from "vitest";
import { issueKinds, parseShipmentIssue } from "./customer-shipments.js";
const valid = { version: 0, kind: "damaged", description: "بسته آسیب دیده" };
describe("Customer shipment issue contract", () => {
  it("accepts each supported issue and trims the description", () => {
    for (const kind of issueKinds) expect(parseShipmentIssue({ ...valid, kind, description: " بسته آسیب دیده " })).toEqual({ ...valid, kind });
  });
  it.each([null, [], {}, { ...valid, version: -1 }, { ...valid, version: "0" }, { ...valid, version: 2147483647 },
    { ...valid, kind: "refund" }, { ...valid, description: "" }, { ...valid, description: " ".repeat(3) },
    { ...valid, description: "x".repeat(2001) }, { ...valid, description: "bad\ntext" }, { ...valid, description: "bad\u202etext" },
    { ...valid, customerUserId: "other" }, { ...valid, reportedAt: "2000-01-01" }, { ...valid, status: "resolved" }
  ])("rejects malformed and privileged issue data %j", body => expect(() => parseShipmentIssue(body)).toThrow());
});
