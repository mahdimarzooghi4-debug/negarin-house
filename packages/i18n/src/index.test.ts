import { describe, expect, it } from "vitest";
import {
  directionForLocale,
  formatArtistDomesticToman,
  formatMoney,
  isolateBusinessId,
  partnerLocales
} from "./index.js";

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

describe("context-aware money and bidirectional identifiers", () => {
  it("formats domestic Artist amounts as Toman with Persian digits", () => {
    const amount = 1_234_567;
    expect(formatArtistDomesticToman(amount)).toBe(
      `${new Intl.NumberFormat("fa-IR").format(amount)} تومان`
    );
  });

  it("uses the supplied currency for every locale instead of deriving it from language", () => {
    const persianUsd = formatMoney(1234, "USD", "fa-IR");
    const frenchUsd = formatMoney(1234, "USD", "fr");
    const persianEur = formatMoney(1234, "EUR", "fa-IR");

    expect(persianUsd).toBe(new Intl.NumberFormat("fa-IR", { style: "currency", currency: "USD" }).format(1234));
    expect(frenchUsd).toBe(new Intl.NumberFormat("fr", { style: "currency", currency: "USD" }).format(1234));
    expect(persianEur).toBe(new Intl.NumberFormat("fa-IR", { style: "currency", currency: "EUR" }).format(1234));
    expect(persianUsd).not.toBe(persianEur);
  });

  it("keeps the explicit currency even when presentation options are supplied", () => {
    expect(formatMoney(1234, "USD", "en", { currencyDisplay: "code" })).toBe(
      new Intl.NumberFormat("en", { style: "currency", currency: "USD", currencyDisplay: "code" }).format(1234)
    );
  });

  it("isolates business IDs from surrounding RTL text without altering the ID", () => {
    const id = "XORD-2026/0042";
    expect(isolateBusinessId(id)).toBe(`\u2066${id}\u2069`);
    expect(isolateBusinessId(id).slice(1, -1)).toBe(id);
  });

  it("rejects non-finite numeric amounts", () => {
    expect(() => formatMoney(Number.NaN, "USD", "en")).toThrow(RangeError);
    expect(() => formatArtistDomesticToman(Number.POSITIVE_INFINITY)).toThrow(RangeError);
  });
});
