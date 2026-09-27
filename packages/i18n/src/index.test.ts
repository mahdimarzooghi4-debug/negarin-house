import { describe, expect, it } from "vitest";
import { directionForLocale, partnerLocales } from "./index.js";

describe("partner localization foundation", () => {
  it("contains exactly seven Partner locales", () => {
    expect(partnerLocales).toEqual(["tr-TR", "ar", "ru", "en", "zh-CN", "fr", "es"]);
  });

  it("uses RTL only for Arabic among Partner locales", () => {
    expect(directionForLocale("ar")).toBe("rtl");
    for (const locale of partnerLocales.filter((locale) => locale !== "ar")) {
      expect(directionForLocale(locale)).toBe("ltr");
    }
  });
});
