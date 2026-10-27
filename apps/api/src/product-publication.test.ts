import { describe, expect, it } from "vitest";
import { parsePublicationCommand } from "./product-publication.js";

describe("Publication command boundary", () => {
  it.each([null, [], {}, { version: "1" }, { version: -1 }, { version: 1.5 }, { version: 2147483647 }, { version: 1, priceToman: "1" }])("rejects invalid commands %#", (input) => {
    expect(() => parsePublicationCommand(input)).toThrow();
  });
  it("requires and trims content feedback without accepting unknown fields", () => {
    expect(parsePublicationCommand({ version: 0, reason: " اصلاح شرح " }, true)).toEqual({ version: 0, reason: "اصلاح شرح" });
    expect(() => parsePublicationCommand({ version: 0 }, true)).toThrow();
    expect(() => parsePublicationCommand({ version: 0, reason: " " }, true)).toThrow();
    expect(() => parsePublicationCommand({ version: 0, reason: "x".repeat(2001) }, true)).toThrow();
  });
});
