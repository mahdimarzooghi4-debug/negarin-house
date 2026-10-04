import { describe, expect, it } from "vitest";
import { parseAddressCommand } from "./customer-addresses.js";
const fields = { version: 0, recipientName: " نگار ", recipientPhone: "۰۹۱۲۳۴۵۶۷۸۹", province: "تهران", city: "تهران", postalCode: "۱۹۶۷۶۵۴۳۲۱", fullAddress: "خیابان نگار، پلاک ۲" };
describe("Customer address validation", () => {
  it("normalizes domestic phone, both digit scripts and whitespace", () => {
    expect(parseAddressCommand(fields, true)).toMatchObject({ version: 0, makeDefault: false, address: { recipientName: "نگار", recipientPhone: "+989123456789", postalCode: "1967654321" } });
    expect(parseAddressCommand({ ...fields, recipientPhone: "+٩٨٩١٢٣٤٥٦٧٨٩", postalCode: "١٩٦٧٦٥٤٣٢١" }, true).address?.recipientPhone).toBe("+989123456789");
  });
  it("accepts explicit promotion and version-only mutations", () => {
    expect(parseAddressCommand({ ...fields, makeDefault: true }, true).makeDefault).toBe(true);
    expect(parseAddressCommand({ version: 8 })).toEqual({ version: 8 });
  });
  it.each([null, [], "body", {}, { version: -1 }, { version: 0.1 }, { version: "0" }, { version: 2147483647 }, { version: 0, userId: "other" }])("rejects malformed command %j", (body) => {
    expect(() => parseAddressCommand(body)).toThrow();
  });
  it.each([
    { recipientName: " " }, { recipientName: "x".repeat(201) }, { recipientName: "x\u0000" },
    { province: "x".repeat(101) }, { city: null }, { fullAddress: "x".repeat(2001) },
    { postalCode: 1967654321 }, { postalCode: "123456789" }, { postalCode: "12345-67890" },
    { recipientPhone: "+15551234567" }, { recipientPhone: "0912 3456789" }, { makeDefault: "true" },
    { id: "owned" }, { isDefault: true }, { fullAddress: undefined }
  ])("rejects invalid or privileged fields %j", (patch) => {
    expect(() => parseAddressCommand({ ...fields, ...patch }, true)).toThrow();
  });
});
