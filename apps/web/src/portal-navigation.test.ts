import { describe, expect, it } from "vitest";
import { getPortalNavigation } from "./portal-navigation";

describe("role portal navigation", () => {
  it("uses the shared shell pattern with role-specific menu labels", () => {
    expect(getPortalNavigation("artist").map(({ label }) => label)).toEqual([
      "پیشخوان", "فروشگاه من", "محصولات", "سفارش‌ها", "رشد من",
      "خدمات", "فرصت‌ها", "مالی", "عضویت", "روایت‌ها"
    ]);
    expect(getPortalNavigation("admin").map(({ label }) => label)).toEqual([
      "داشبورد", "هنرمندان", "بازار", "سفارش و ارسال", "رشد و خدمات",
      "فرصت‌ها", "مالی و عضویت", "بین‌الملل", "گزارش‌ها", "تنظیمات"
    ]);
    expect(getPortalNavigation("artist").some(({ label }) => label === "بین‌الملل")).toBe(false);
    expect(getPortalNavigation("artist").find(({ label }) => label === "محصولات")?.href).toBe("/artist/products");
    expect(getPortalNavigation("admin").find(({ label }) => label === "بازار")?.href)
      .toBe("/admin/publication-reviews");
    expect(getPortalNavigation("admin").find(({ label }) => label === "رشد و خدمات")?.href)
      .toBe("/admin/service-assignments");
    expect(getPortalNavigation("service-partner").find(({ label }) => label === "درخواست‌های تخصیص‌یافته")?.href)
      .toBe("/service-partner/assignments");
    expect(getPortalNavigation("supporting-organization").find(({ label }) => label === "برنامه‌های حمایتی")?.href)
      .toBe("/supporting-organization/programs");
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
