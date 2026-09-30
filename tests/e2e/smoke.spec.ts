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

test("all seven Export Partner locales use the same shell with the approved text direction", async ({ page }) => {
  const localeDirections = [
    ["tr-TR", "ltr"],
    ["ar", "rtl"],
    ["ru", "ltr"],
    ["en", "ltr"],
    ["zh-CN", "ltr"],
    ["fr", "ltr"],
    ["es", "ltr"]
  ] as const;

  for (const [locale, direction] of localeDirections) {
    await page.goto(`/partner/${locale}`);
    const shell = page.locator(".portal-layout");
    await expect(shell).toHaveAttribute("dir", direction);
    await expect(shell).toHaveAttribute("lang", locale);
    await expect(page.locator(".portal-sidebar")).toBeVisible();
    await expect(page.locator(".portal-nav-item")).toHaveCount(7);
    await expect(page.locator(".portal-brand img")).toHaveCount(1);
    await expect(page.locator(".connection-badge")).toBeVisible();
  }
});

test("Portuguese is outside the supported Export Partner routes", async ({ page }) => {
  await page.goto("/partner/pt-BR");
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
});

test("unconfigured sign-in and customer catalog do not present a fake login or checkout", async ({ page }) => {
  await page.goto("/auth");
  await expect(page.getByRole("heading", { name: "احراز هویت" })).toBeVisible();
  await expect(page.getByText("ورود کاربران پس از اتصال سرویس پیامک و تکمیل تنظیمات امنیتی فعال می‌شود.")).toBeVisible();
  await expect(page.getByRole("textbox")).toHaveCount(0);

  await page.goto("/customer");
  await expect(page.getByRole("heading", { name: "کاتالوگ نگارین" })).toBeVisible();
  await expect(page.getByText("کاتالوگ در حال حاضر در دسترس نیست. کمی بعد دوباره تلاش کنید.")).toBeVisible();
  await expect(page.getByRole("button", { name: /سفارش|پرداخت/ })).toHaveCount(0);
});

test("Supporting Organization programs require a real organization session; Corporate Buyer shell stays truthful", async ({ page }) => {
  const emptyState = "در این پیش‌نمایش، اطلاعات عملیاتی یا مالی نمونه نمایش داده نمی‌شود.";

  await page.goto("/supporting-organization");
  await expect(page.getByRole("heading", { name: "سازمان حامی" })).toBeVisible();
  await expect(page.locator(".portal-layout")).toHaveAttribute("dir", "rtl");
  await expect(page.locator(".portal-nav-item")).toHaveCount(6);
  await expect(page.locator(".portal-navigation a")).toHaveCount(1);
  await expect(page.locator(".portal-navigation a")).toHaveAttribute("href", "/supporting-organization/programs");
  await page.goto("/supporting-organization/programs");
  await expect(page.getByRole("heading", { name: "برنامه‌های حمایتی" }).first()).toBeVisible();
  await expect(page.getByText("اتصال حساب سازمان حامی فعال نیست")).toBeVisible();
  await expect(page.getByRole("button", { name: "ثبت برنامه" })).toHaveCount(0);
  await expect(page.getByText("در این صفحه دادهٔ نمونه نمایش داده نمی‌شود.")).toBeVisible();

  await page.goto("/corporate-buyer");
  await expect(page.getByRole("heading", { name: "خریدار سازمانی" })).toBeVisible();
  await expect(page.locator(".portal-layout")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("region", { name: "پوستهٔ پنل آماده است" })).toBeVisible();
  await expect(page.getByText(emptyState)).toBeVisible();
  await expect(page.locator(".portal-nav-item")).toHaveCount(8);
  await expect(page.getByRole("button")).toHaveCount(0);
  await expect(page.locator(".portal-navigation a")).toHaveCount(0);
});

test("artist product workspace requires a real session and does not invent products", async ({ page }) => {
  await page.goto("/artist/products");

  await expect(page.getByRole("heading", { name: "محصولات" })).toBeVisible();
  await expect(page.getByText("اتصال حساب هنرمند فعال نیست")).toBeVisible();
  await expect(page.getByText("در این صفحه محصول یا قیمت نمونه نمایش داده نمی‌شود.")).toBeVisible();
  await expect(page.getByRole("button", { name: "افزودن محصول" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /ارسال برای بررسی|بایگانی/ })).toHaveCount(0);
});

test("Artist services intake requires an Artist session and shows no sample requests", async ({ page }) => {
  await page.goto("/artist/services");

  await expect(page.getByRole("heading", { name: "خدمات هنرمند" })).toBeVisible();
  await expect(page.getByText("اتصال حساب هنرمند فعال نیست")).toBeVisible();
  await expect(page.getByRole("button", { name: "ثبت درخواست برای ادمین" })).toHaveCount(0);
  await expect(page.locator(".portal-nav-item").filter({ hasText: "خدمات" })).toHaveAttribute("href", "/artist/services");
});

test("staff publication review queue requires staff permission and never shows product prices", async ({ page }) => {
  await page.goto("/admin/publication-reviews");

  await expect(page.getByRole("heading", { name: "بازبینی محصولات" })).toBeVisible();
  await expect(page.getByText("دسترسی بررسی فعال نیست")).toBeVisible();
  await expect(page.getByText("قیمت هنرمند در صف بازبینی نمایش داده نمی‌شود.")).toBeVisible();
  await expect(page.getByRole("button", { name: /تأیید محتوا|درخواست اصلاح/ })).toHaveCount(0);
  await expect(page.getByText("دسترسی انتشار فعال نیست")).toBeVisible();
  await expect(page.getByRole("button", { name: /انتشار در کاتالوگ|پنهان‌کردن از کاتالوگ/ })).toHaveCount(0);
});

test("staff service assignment page uses the nine Admin groups and requires real authorization", async ({ page }) => {
  await page.goto("/admin/service-assignments");

  await expect(page.getByRole("heading", { name: "تخصیص خدمات" })).toBeVisible();
  await expect(page.getByText("ورود کارکنان فعال نیست")).toBeVisible();
  await expect(page.getByText("در این صفحه دادهٔ نمونه نمایش داده نمی‌شود.")).toBeVisible();
  await expect(page.getByRole("button", { name: "ثبت تخصیص" })).toHaveCount(0);
  await expect(page.locator(".portal-nav-item")).toHaveCount(10);
  await expect(page.locator(".portal-nav-item").filter({ hasText: "بازار" }))
    .toHaveAttribute("href", "/admin/publication-reviews");
  await expect(page.locator(".portal-nav-item").filter({ hasText: "رشد و خدمات" }))
    .toHaveAttribute("href", "/admin/service-assignments");
});

test("staff service submissions remain behind real services permission", async ({ page }) => {
  await page.goto("/admin/service-deliverables");

  await expect(page.getByRole("heading", { name: "فایل‌های ارسالی خدمات" })).toBeVisible();
  await expect(page.getByText("ورود کارکنان فعال نیست")).toBeVisible();
  await expect(page.getByRole("link", { name: "فایل‌های ارسال‌شده" })).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("link", { name: "تخصیص درخواست" })).toHaveAttribute("href", "/admin/service-assignments");
  await expect(page.getByRole("link", { name: "بازکردن فایل" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /تأیید تحویل|درخواست اصلاح/ })).toHaveCount(0);
});

test("staff service request authoring requires a real services session", async ({ page }) => {
  await page.goto("/admin/service-requests");

  await expect(page.getByRole("heading", { name: "ثبت درخواست خدمت" }).first()).toBeVisible();
  await expect(page.getByText("ورود کارکنان فعال نیست")).toBeVisible();
  await expect(page.getByRole("button", { name: "ثبت درخواست" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "ثبت درخواست" })).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("link", { name: "تخصیص درخواست" })).toHaveAttribute("href", "/admin/service-assignments");
});

test("service partner assignment inbox requires a real session and does not invent requests", async ({ page }) => {
  await page.goto("/service-partner/assignments");

  await expect(page.getByRole("heading", { name: "درخواست‌های تخصیص‌یافته" }).first()).toBeVisible();
  await expect(page.getByText("اتصال حساب همکار خدمات فعال نیست")).toBeVisible();
  await expect(page.getByText("در این صفحه درخواست یا اطلاعات هنرمند نمونه نمایش داده نمی‌شود.")).toBeVisible();
  await expect(page.getByRole("button")).toHaveCount(0);
  await expect(page.locator(".portal-nav-item").filter({ hasText: "درخواست‌های تخصیص‌یافته" }))
    .toHaveAttribute("href", "/service-partner/assignments");
});

test("service partner request details stay behind assignment authorization", async ({ page }) => {
  await page.goto("/service-partner/assignments/00000000-0000-4000-8000-000000000001");

  await expect(page.getByRole("heading", { name: "جزئیات درخواست" })).toBeVisible();
  await expect(page.getByText("اتصال حساب همکار خدمات فعال نیست")).toBeVisible();
  await expect(page.getByRole("link", { name: "بازگشت به درخواست‌های تخصیص‌یافته" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "پاسخ به تخصیص" })).toHaveCount(0);
  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  await expect(page.getByRole("button", { name: "ارسال برای بررسی نگارین" })).toHaveCount(0);
});
