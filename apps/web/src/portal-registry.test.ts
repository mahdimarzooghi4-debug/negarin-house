import { describe, expect, it } from "vitest";
import { getPortalDefinition, portalKeys } from "./portal-registry";

describe("portal registry", () => {
  it("contains every current Phase 1 portal context", () => {
    expect(portalKeys).toEqual([
      "auth",
      "customer",
      "artist",
      "admin",
      "service-partner",
      "supporting-organization",
      "corporate-buyer",
      "partner"
    ]);
  });

  it("keeps domestic portals RTL", () => {
    for (const key of portalKeys.filter((key) => key !== "partner")) {
      expect(getPortalDefinition(key)?.direction).toBe("rtl");
    }
  });
});
