import type { PortalKey } from "./portal-registry";
import type { PartnerLocale } from "@negarin/i18n";
import { getPartnerMessages } from "./partner-localization";

export type PortalNavigationItem = { label: string; active?: boolean; href?: string };

const navigation: Partial<Record<PortalKey, PortalNavigationItem[]>> = {
  artist: [
    { label: "پیشخوان", active: true },
    { label: "فروشگاه من", href: "/artist/storefront" },
    { label: "محصولات", href: "/artist/products" },
    { label: "سفارش‌ها", href: "/artist/orders" },
    { label: "رشد من", href: "/artist/growth" },
    { label: "خدمات", href: "/artist/services" },
    { label: "فرصت‌ها" },
    { label: "مالی", href: "/artist/finance" },
    { label: "عضویت" },
    { label: "روایت‌ها" }
  ],
  admin: [
    { label: "داشبورد", active: true },
    { label: "هنرمندان" },
    { label: "بازار", href: "/admin/product-reviews" },
    { label: "سفارش و ارسال", href: "/admin/shipment-issues" },
    { label: "رشد و خدمات", href: "/admin/service-reviews" },
    { label: "بازبینی ارجاع حمایتی", href: "/admin/support-reviews" },
    { label: "مدیریت برنامه‌های حمایتی", href: "/admin/support-programs" },
    { label: "تخصیص اعتبار حمایتی", href: "/admin/support-allocations" },
    { label: "فرصت‌ها" },
    { label: "مالی و عضویت", href: "/admin/domestic-finance" },
    { label: "بین‌الملل" },
    { label: "گزارش‌ها", href: "/admin/support-reports" },
    { label: "بازپرداخت‌ها", href: "/admin/refund-reviews" },
    { label: "درخواست‌های خرید سازمانی", href: "/admin/corporate-purchase-requests" },
    { label: "تنظیمات" }
  ],
  "service-partner": [
    { label: "پیشخوان", active: true, href: "/service-partner/assignments" },
    { label: "درخواست‌های تخصیص‌یافته", href: "/service-partner/assignments" },
    { label: "برنامهٔ اجرا", href: "/service-partner/schedule" },
    { label: "تحویل‌ها", href: "/service-partner/deliveries" },
    { label: "تاریخچه", href: "/service-partner/history" },
    { label: "حساب کاربری" }
  ],
  "supporting-organization": [
    { label: "برنامه‌های حمایتی", href: "/supporting-organization/support-programs" },
    { label: "ارجاع هنرمندان", href: "/supporting-organization/referrals" },
    { label: "تعهدها و مصرف", href: "/supporting-organization/allocations" },
    { label: "گزارش‌ها", href: "/supporting-organization/reports" },
    { label: "حساب و دسترسی‌ها", href: "/supporting-organization/members" }
  ],
  "corporate-buyer": [
    { label: "پیشخوان", active: true },
    { label: "محصولات سازمانی" },
    { label: "درخواست‌های خرید" },
    { label: "پیشنهادها" },
    { label: "سفارش‌ها" },
    { label: "ارسال و تحویل" },
    { label: "گزارش‌ها" },
    { label: "حساب و دسترسی‌ها" }
  ]
};

export function getPortalNavigation(portal: PortalKey, locale: PartnerLocale = "en"): readonly PortalNavigationItem[] {
  if (portal === "partner") {
    return getPartnerMessages(locale).navigation.map((label, index) => ({ label, active: index === 0 }));
  }
  return navigation[portal] ?? [];
}
