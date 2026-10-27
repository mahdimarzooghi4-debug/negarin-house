import { describe, expect, it } from "vitest";
import { parseShipment, shipmentView } from "./artist-shipment.js";
const valid = { version: 4, carrierName: "پست", trackingCode: "001234AB-5" };
describe("Artist shipment contracts", () => {
  it("normalizes Persian/Arabic digits while retaining leading zeroes", () => {
    expect(parseShipment({ ...valid, carrierName: " پست ", trackingCode: " ۰۰١٢٣٤AB-٥ " })).toEqual(valid);
  });
  it.each([null, [], {}, { ...valid, version: "4" }, { ...valid, version: -1 }, { ...valid, version: 0.5 },
    { ...valid, version: 2147483647 }, { ...valid, carrierName: "" }, { ...valid, carrierName: "x".repeat(101) },
    { ...valid, trackingCode: 123 }, { ...valid, trackingCode: "" }, { ...valid, trackingCode: "x".repeat(101) },
    { ...valid, trackingCode: "https://example.test" }, { ...valid, trackingCode: "ABC 123" },
    { ...valid, delivered: true }, { ...valid, reportedAt: "2000-01-01" }, { ...valid, artistUserId: "other" },
    { ...valid, carrierVerified: true }, { ...valid, carrierName: "bad\nname" }, { ...valid, trackingCode: "12\u202e34" }
  ])("rejects malformed or privileged shipment payload %j", body => expect(() => parseShipment(body)).toThrow());
  it("returns no tracking declaration before dispatch", () => expect(shipmentView(null)).toBeNull());
});
