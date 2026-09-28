import { expect, test } from "@playwright/test";

test("Phase 1 web shell boots", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "خانه نگارین" })).toBeVisible();
  await expect(page.getByText("اسکلت فنی Phase 1 — Sprint 0")).toBeVisible();
});

test("shared empty state is used in domestic and Arabic partner portals", async ({ page }) => {
  await page.goto("/artist");
  await expect(page.getByRole("region", { name: "پوستهٔ پنل آماده است" })).toBeVisible();
  await expect(page.locator(".portal-layout")).toHaveAttribute("dir", "rtl");

  await page.goto("/partner/ar");
  await expect(page.getByRole("region", { name: "واجهة البوابة جاهزة" })).toBeVisible();
  await expect(page.locator(".portal-layout")).toHaveAttribute("dir", "rtl");
  await expect(page.getByText("لا يعرض هذا المعاين بيانات تشغيلية أو مالية تجريبية.")).toBeVisible();
});
