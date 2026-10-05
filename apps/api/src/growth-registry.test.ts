import { describe, expect, it } from "vitest";
import { assertArtistGrowthRead, assertStaffGrowthRead, growthRegistryView } from "./growth-registry.js";

const id = "00000000-0000-4000-8000-000000000001";

describe("Growth registry", () => {
  it("returns only the locked ordered taxonomy and the non-purchasable invariant", () => {
    expect(growthRegistryView()).toEqual({
      purchasable: false,
      levels: [
        { order: 1, name: "جوانه" },
        { order: 2, name: "شکوفه" },
        { order: 3, name: "سرو زرین" },
        { order: 4, name: "سفیر جهانی" }
      ]
    });
  });

  it("authorizes Artist self-surface and growth-domain Staff only", () => {
    expect(() => assertArtistGrowthRead({ userId: id, activeRole: "artist" })).not.toThrow();
    expect(() => assertArtistGrowthRead({ userId: id, activeRole: "customer" })).toThrow();

    expect(() => assertStaffGrowthRead({ userId: id, activeRole: "staff", staffPermissionDomains: ["growth"] })).not.toThrow();
    expect(() => assertStaffGrowthRead({ userId: id, activeRole: "staff", staffPermissionDomains: ["finance"] })).toThrow();
    expect(() => assertStaffGrowthRead({ userId: id, activeRole: "artist" })).toThrow();
  });
});
