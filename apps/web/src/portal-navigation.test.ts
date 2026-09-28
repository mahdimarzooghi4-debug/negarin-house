import { describe, expect, it } from "vitest";
import { getPortalNavigation } from "./portal-navigation";

describe("role portal navigation", () => {
  it("uses the shared shell pattern with role-specific menu labels", () => {
    expect(getPortalNavigation("artist").map(({ label }) => label)).toEqual([
      "پیشخوان", "فروشگاه من", "محصولات", "سفارش‌ها", "رشد من",
      "خدمات", "فرصت‌ها", "مالی", "عضویت", "روایت‌ها"
    ]);
    expect(getPortalNavigation("admin").map(({ label }) => label)).toContain("بین‌الملل");
    expect(getPortalNavigation("artist").some(({ label }) => label === "بین‌الملل")).toBe(false);
  });

  it("keeps authentication and customer routes outside staff sidebars", () => {
    expect(getPortalNavigation("auth")).toEqual([]);
    expect(getPortalNavigation("customer")).toEqual([]);
  });

  it("marks only the dashboard item active in each role shell", () => {
    for (const portal of ["artist", "admin", "service-partner", "supporting-organization", "corporate-buyer", "partner"] as const) {
      expect(getPortalNavigation(portal).filter(({ active }) => active)).toHaveLength(1);
    }
  });
});
