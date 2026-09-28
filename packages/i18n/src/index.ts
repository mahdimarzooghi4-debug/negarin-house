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

export type MoneyFormatOptions = Omit<Intl.NumberFormatOptions, "style" | "currency">;
export type MoneyAmount = number | bigint;

function assertFiniteMoneyAmount(amount: MoneyAmount): void {
  if (typeof amount === "number" && !Number.isFinite(amount)) {
    throw new RangeError("Money amount must be finite");
  }
}

/** Formats Artist domestic amounts explicitly as Toman; this does not infer currency from locale. */
export function formatArtistDomesticToman(amount: MoneyAmount): string {
  assertFiniteMoneyAmount(amount);
  return `${new Intl.NumberFormat(domesticLocale).format(amount)} تومان`;
}

export function formatMoney(
  amount: MoneyAmount,
  currency: string,
  locale: SupportedLocale,
  options?: MoneyFormatOptions
): string {
  assertFiniteMoneyAmount(amount);
  return new Intl.NumberFormat(locale, {
    ...options,
    style: "currency",
    currency
  }).format(amount);
}
