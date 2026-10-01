import { describe, expect, it } from "vitest";
import {
  fetchCustomerCatalog, formatToman, getCustomerApiBaseUrl, parseCustomerCatalog,
  searchCustomerCatalog, type CustomerCatalogItem, type FetchLike
} from "../src/customer-catalog";

const item: CustomerCatalogItem = {
  id: "product-1", title: "ظرف سفالی", description: "ساختهٔ دست هنرمند", priceToman: "1250000", availableQuantity: 6,
  updatedAt: "2026-09-30T10:00:00.000Z",
  media: [{ id: "media-1", contentType: "image/webp", readUrl: "https://cdn.example.test/art.webp" }]
};

describe("customer catalog", () => {
  it("uses the emulator default and normalizes configured API URLs", () => {
    expect(getCustomerApiBaseUrl(undefined)).toBe("http://10.0.2.2:4000");
    expect(getCustomerApiBaseUrl(" https://api.example.test/// ")).toBe("https://api.example.test");
  });

  it("rejects malformed records and unsafe media URLs", () => {
    expect(parseCustomerCatalog([item])).toEqual([item]);
    expect(parseCustomerCatalog([{ ...item, priceToman: "1e6" }])).toBeNull();
    expect(parseCustomerCatalog([{ ...item, media: [{ ...item.media[0], readUrl: "javascript:alert(1)" }] }])).toBeNull();
    expect(parseCustomerCatalog({ items: [item] })).toBeNull();
  });

  it("calls only the public catalog endpoint and validates the payload", async () => {
    let requested = "";
    const fetcher: FetchLike = async (url) => {
      requested = url;
      return new Response(JSON.stringify([item]), { status: 200, headers: { "Content-Type": "application/json" } });
    };
    await expect(fetchCustomerCatalog("https://api.example.test", fetcher)).resolves.toEqual([item]);
    expect(requested).toBe("https://api.example.test/api/v1/customer/catalog");
    const invalid: FetchLike = async () => new Response(JSON.stringify([{ ...item, id: 5 }]), { status: 200 });
    await expect(fetchCustomerCatalog("https://api.example.test", invalid)).rejects.toThrow("catalog-invalid-response");
  });

  it("normalizes Persian and Arabic letters for search", () => {
    expect(searchCustomerCatalog([item], "ظرف سفالي")).toEqual([item]);
    expect(searchCustomerCatalog([item], "   ")).toEqual([item]);
    expect(searchCustomerCatalog([item], "فرش")).toEqual([]);
  });

  it("formats prices as Toman", () => {
    expect(formatToman("1250000")).toBe("۱٬۲۵۰٬۰۰۰ تومان");
    expect(formatToman("invalid")).toBe("قیمت ناموجود");
  });
});
