import { describe, expect, it } from "vitest";
import { createProductCommand, inventoryCommand, normalizeDigits, parseStockInput, parseTomanInput, patchProductCommand, publicationCommand, type ProductForm } from "./product-commands";
import type { ArtistProduct } from "./artist-data";

const product: ArtistProduct = {
  id: "00000000-0000-4000-8000-000000000001", title: "ظرف سفالی",
  description: "دست‌ساز", category: "سفال", priceToman: "2450000",
  publicationStatus: "draft", version: 3, inventoryVersion: 2,
  stockQuantity: 4, availability: "in_stock", archivedAt: null,
  updatedAt: "2026-11-06T10:00:00.000Z",
  imageIds: ["00000000-0000-4000-8000-000000000002"]
};
const form: ProductForm = { title: " ظرف سفالی ", description: "دست‌ساز", category: "سفال", priceToman: "۲٬۴۵۰٬۰۰۰" };

describe("native Artist product command contracts", () => {
  it("normalizes localized numerals without floating-point money", () => {
    expect(normalizeDigits("۱٢۳")).toBe("123");
    expect(parseTomanInput("۲٬۴۵۰٬۰۰۰")).toBe("2450000");
    expect(parseTomanInput("9,223,372,036,854,775,807")).toBe("9223372036854775807");
    for (const input of ["۰", "-5", "1.5", "۱,۰۰", "01", "9223372036854775808"]) {
      expect(parseTomanInput(input)).toBeNull();
    }
  });

  it("validates the exact backend product write contract", () => {
    expect(createProductCommand(form)).toEqual({
      title: "ظرف سفالی", description: "دست‌ساز", category: "سفال", priceToman: "2450000"
    });
    expect(createProductCommand({ ...form, title: " " })).toBeNull();
    expect(createProductCommand({ ...form, category: "x".repeat(201) })).toBeNull();
  });

  it("avoids fake mutations for identical fields and keeps price-only edits independent", () => {
    expect(patchProductCommand(product, form)).toBeNull();
    expect(patchProductCommand(product, { ...form, priceToman: "۳٬۵۰۰٬۰۰۰" })).toEqual({
      version: 3, priceToman: "3500000"
    });
    expect(patchProductCommand({ ...product, publicationStatus: "approved" }, { ...form, title: "اثر جدید" })).toEqual({
      version: 3, title: "اثر جدید"
    });
  });

  it("does not alter locked content while price remains Artist-controlled", () => {
    const published = { ...product, publicationStatus: "published" as const };
    expect(patchProductCommand(published, { ...form, title: "تغییر ممنوع", priceToman: "۳٬۰۰۰٬۰۰۰" }))
      .toEqual({ version: 3, priceToman: "3000000" });
    expect(patchProductCommand(published, { ...form, title: "تغییر ممنوع" })).toBeNull();
  });

  it("uses independent inventory revision and rejects malformed or stale quantities", () => {
    expect(parseStockInput("۰")).toBe(0);
    expect(parseStockInput("۱۲")).toBe(12);
    expect(parseStockInput("۲۱۴۷۴۸۳۶۴۸")).toBeNull();
    expect(parseStockInput("1.2")).toBeNull();
    expect(inventoryCommand(product, "۷")).toEqual({ inventoryVersion: 2, stockQuantity: 7 });
    expect(inventoryCommand(product, "۴")).toBeNull();
    expect(inventoryCommand({ ...product, archivedAt: "2026-11-06T10:00:00.000Z" }, "۷")).toBeNull();
  });

  it("separates submission from human approval and explicit publication", () => {
    expect(publicationCommand(product, "submit")).toEqual({ version: 3 });
    expect(publicationCommand({ ...product, imageIds: [] }, "submit")).toBeNull();
    expect(publicationCommand({ ...product, publicationStatus: "under_review" }, "publish")).toBeNull();
    expect(publicationCommand({ ...product, publicationStatus: "approved" }, "publish")).toEqual({ version: 3 });
    expect(publicationCommand({ ...product, publicationStatus: "published" }, "publish")).toBeNull();
  });
});
