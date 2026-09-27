import { directionForLocale } from "@negarin/i18n";

export const portalKeys = [
  "auth",
  "customer",
  "artist",
  "admin",
  "service-partner",
  "supporting-organization",
  "corporate-buyer",
  "partner"
] as const;

export type PortalKey = (typeof portalKeys)[number];

const portals: Record<PortalKey, { title: string; description: string; direction: "rtl" | "ltr" }> = {
  auth: { title: "احراز هویت", description: "ورود و تشخیص context نقش", direction: "rtl" },
  customer: { title: "مشتری", description: "تجربه خرید مصرف‌کننده", direction: "rtl" },
  artist: { title: "هنرمند", description: "محصول، سفارش، رشد و مالی هنرمند", direction: "rtl" },
  admin: { title: "نگارین / ادمین", description: "عملیات داخلی با permission domain", direction: "rtl" },
  "service-partner": { title: "همکار خدمات", description: "اجرای درخواست‌های تخصیص‌یافته", direction: "rtl" },
  "supporting-organization": { title: "سازمان حامی", description: "ارجاع، حمایت و مصرف اعتبار", direction: "rtl" },
  "corporate-buyer": { title: "خریدار سازمانی", description: "خرید B2B و سفارش سازمانی", direction: "rtl" },
  partner: { title: "Export Partner", description: "Localized market operations", direction: directionForLocale("en") }
};

export function getPortalDefinition(key: PortalKey) {
  return portals[key];
}
