import type { PortalKey } from "./portal-registry";

export type PortalNavigationItem = { label: string; active?: boolean };

const navigation: Partial<Record<PortalKey, PortalNavigationItem[]>> = {
  artist: [
    { label: "پیشخوان", active: true },
    { label: "فروشگاه من" },
    { label: "محصولات" },
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
    { label: "درخواست‌های تخصیص‌یافته" },
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
  ],
  partner: [
    { label: "Dashboard", active: true },
    { label: "Artist network" },
    { label: "Export products" },
    { label: "Orders" },
    { label: "Delivery" },
    { label: "Reports" },
    { label: "Account" }
  ]
};

export function getPortalNavigation(portal: PortalKey): readonly PortalNavigationItem[] {
  return navigation[portal] ?? [];
}
