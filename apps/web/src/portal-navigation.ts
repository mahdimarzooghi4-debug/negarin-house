import type { PortalKey } from "./portal-registry";
import type { PartnerLocale } from "@negarin/i18n";
import { getPartnerMessages } from "./partner-localization";

export type PortalNavigationItem = { label: string; active?: boolean; href?: string };

const navigation: Partial<Record<PortalKey, PortalNavigationItem[]>> = {
  artist: [
    { label: "پیشخوان", active: true },
    { label: "فروشگاه من" },
    { label: "محصولات", href: "/artist/products" },
    { label: "سفارش‌ها" },
    { label: "رشد من" },
    { label: "خدمات" },
    { label: "فرصت‌ها" },
    { label: "مالی" },
    { label: "عضویت" },
    { label: "روایت‌ها" }
  ],
  admin: [
    { label: "داشبورد", active: true },
    { label: "هنرمندان" },
    { label: "بازار" },
    { label: "بازبینی محصولات", href: "/admin/publication-reviews" },
    { label: "سفارش و ارسال" },
    { label: "رشد و خدمات" },
    { label: "فرصت‌ها" },
    { label: "مالی و عضویت" },
    { label: "بین‌الملل" },
    { label: "گزارش‌ها" },
    { label: "تنظیمات" }
  ],
  "service-partner": [
    { label: "پیشخوان", active: true },
    { label: "درخواست‌های تخصیص‌یافته", href: "/service-partner/assignments" },
    { label: "برنامهٔ اجرا" },
    { label: "تحویل‌ها" },
    { label: "تاریخچه" },
    { label: "حساب کاربری" }
  ],
  "supporting-organization": [
    { label: "پیشخوان", active: true },
    { label: "برنامه‌های حمایتی" },
    { label: "ارجاع هنرمندان" },
    { label: "تعهدها و مصرف" },
    { label: "گزارش‌ها" },
    { label: "حساب و دسترسی‌ها" }
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
