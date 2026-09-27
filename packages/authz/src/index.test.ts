import { describe, expect, it } from "vitest";
import { denyByDefault, roles } from "./index.js";

describe("authorization foundation", () => {
  it("contains exactly the current canonical roles", () => {
    expect(roles).toEqual([
      "customer",
      "artist",
      "staff",
      "service-partner",
      "supporting-organization",
      "corporate-buyer",
      "export-partner"
    ]);
  });

  it("denies by default", () => {
    expect(denyByDefault()).toEqual({ allowed: false, reason: "forbidden" });
  });
});
