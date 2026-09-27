export const domesticLocale = "fa-IR" as const;

export const partnerLocales = [
  "tr-TR",
  "ar",
  "ru",
  "en",
  "zh-CN",
  "fr",
  "es"
] as const;

export type PartnerLocale = (typeof partnerLocales)[number];
export type SupportedLocale = typeof domesticLocale | PartnerLocale;

export function directionForLocale(locale: SupportedLocale): "rtl" | "ltr" {
  return locale === "fa-IR" || locale === "ar" ? "rtl" : "ltr";
}

export function isolateBusinessId(value: string): string {
  return "\u2066" + value + "\u2069";
}

export function formatMoney(
  amount: number,
  currency: string,
  locale: SupportedLocale,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...options
  }).format(amount);
}
