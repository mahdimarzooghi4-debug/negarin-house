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

test("English and French partner portals share the same shell and navigation structure", async ({ page }) => {
  await page.goto("/partner/en");
  const englishNavigation = page.locator(".portal-nav-item");
  await expect(page.getByRole("heading", { name: "Export Partner" })).toBeVisible();
  await expect(page.locator(".portal-layout")).toHaveAttribute("dir", "ltr");
  await expect(page.locator(".portal-layout")).toHaveAttribute("lang", "en");
  await expect(englishNavigation).toHaveCount(7);

  await page.goto("/partner/fr");
  await expect(page.getByRole("heading", { name: "Partenaire export" })).toBeVisible();
  await expect(page.locator(".portal-layout")).toHaveAttribute("dir", "ltr");
  await expect(page.locator(".portal-layout")).toHaveAttribute("lang", "fr");
  await expect(page.locator(".portal-nav-item")).toHaveCount(7);
  await expect(page.getByText("Cet aperçu ne contient aucune donnée opérationnelle ou financière fictive.")).toBeVisible();
});

test("unconfigured sign-in and customer portals do not present a fake login or checkout", async ({ page }) => {
  await page.goto("/auth");
  await expect(page.getByRole("heading", { name: "احراز هویت" })).toBeVisible();
  await expect(page.getByText("ورود کاربران پس از اتصال سرویس پیامک و تکمیل تنظیمات امنیتی فعال می‌شود.")).toBeVisible();
  await expect(page.getByRole("textbox")).toHaveCount(0);

  await page.goto("/customer");
  await expect(page.getByRole("heading", { name: "مشتری" })).toBeVisible();
  await expect(page.getByText("فروشگاه مشتری پس از آماده‌شدن API و تجربهٔ خرید به این پوسته متصل می‌شود.")).toBeVisible();
  await expect(page.getByRole("button", { name: /سفارش|پرداخت/ })).toHaveCount(0);
});

test("artist product workspace requires a real session and does not invent products", async ({ page }) => {
  await page.goto("/artist/products");

  await expect(page.getByRole("heading", { name: "محصولات" })).toBeVisible();
  await expect(page.getByText("اتصال حساب هنرمند فعال نیست")).toBeVisible();
  await expect(page.getByText("در این صفحه محصول یا قیمت نمونه نمایش داده نمی‌شود.")).toBeVisible();
  await expect(page.getByRole("button", { name: "افزودن محصول" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /ارسال برای بررسی|بایگانی/ })).toHaveCount(0);
});
