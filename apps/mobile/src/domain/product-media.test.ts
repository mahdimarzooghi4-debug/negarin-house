import { describe, expect, it } from "vitest";
import type { ArtistProduct } from "./artist-data";
import {
  maxProductImageBytes, parseProductImageRead, parseProductImageUploadResult,
  productImageGalleryCommand, productImageUploadCommand
} from "./product-media";

const product: ArtistProduct = {
  id: "00000000-0000-4000-8000-000000000001",
  title: "اثر هنری", description: null, category: "سفال", priceToman: "1000",
  publicationStatus: "draft", version: 7, inventoryVersion: 2, stockQuantity: 1,
  availability: "in_stock", archivedAt: null, updatedAt: "2026-11-06T10:00:00.000Z",
  imageIds: ["00000000-0000-4000-8000-000000000002"]
};
const newId = "00000000-0000-4000-8000-000000000003";

describe("native Artist product media contracts", () => {
  it("creates a bounded exact-version image upload command only for image assets", () => {
    expect(productImageUploadCommand(product, { type: "image", base64: "AQ==" }))
      .toEqual({ version: 7, base64: "AQ==" });
    expect(productImageUploadCommand(product, { type: "video", base64: "AQ==" })).toBeNull();
    expect(productImageUploadCommand(product, { type: "image", base64: null })).toBeNull();
    expect(productImageUploadCommand(product, { type: "image", base64: "A" })).toBeNull();
    expect(productImageUploadCommand(product, { type: "image", base64: "data:image/jpeg;base64,AQ==" })).toBeNull();
    const oversized = "A".repeat(Math.ceil(maxProductImageBytes / 3) * 4 + 4);
    expect(productImageUploadCommand(product, { type: "image", base64: oversized })).toBeNull();
    expect(productImageUploadCommand({ ...product, imageIds: Array.from({ length: 8 }, (_, i) =>
      `00000000-0000-4000-8000-${String(i + 10).padStart(12, "0")}`) },
      { type: "image", base64: "AQ==" })).toBeNull();
    expect(productImageUploadCommand({ ...product, publicationStatus: "published" }, { type: "image", base64: "AQ==" })).toBeNull();
  });

  it("removes only an existing image from the active gallery without deleting history", () => {
    expect(productImageGalleryCommand(product, [])).toEqual({ version: 7, imageIds: [] });
    expect(productImageGalleryCommand(product, [product.imageIds[0]!])).toBeNull();
    expect(productImageGalleryCommand(product, [newId])).toBeNull();
    expect(productImageGalleryCommand(product, [product.imageIds[0]!, product.imageIds[0]!])).toBeNull();
    expect(productImageGalleryCommand({ ...product, publicationStatus: "under_review" }, [])).toBeNull();
  });

  it("parses only an owned signed WebP read response with the short expiry", () => {
    const response = {
      id: product.imageIds[0], width: 1200, height: 900, byteLength: 42000,
      contentType: "image/webp", url: "https://private.example/signed.webp?signature=abc",
      expiresInSeconds: 300
    };
    expect(parseProductImageRead(response, product.imageIds[0]!)).toMatchObject({ id: product.imageIds[0], width: 1200 });
    expect(parseProductImageRead({ ...response, url: "http://private.example/a.webp" }, product.imageIds[0]!)).toBeNull();
    expect(parseProductImageRead({ ...response, url: "http://localhost:9000/a.webp" }, product.imageIds[0]!, true)).not.toBeNull();
    expect(parseProductImageRead({ ...response, expiresInSeconds: 3600 }, product.imageIds[0]!)).toBeNull();
    expect(parseProductImageRead({ ...response, id: newId }, product.imageIds[0]!)).toBeNull();
    expect(parseProductImageRead({ ...response, contentType: "image/svg+xml" }, product.imageIds[0]!)).toBeNull();
    expect(parseProductImageRead({ ...response, width: 4001, height: 4000 }, product.imageIds[0]!)).toBeNull();
  });

  it("validates image upload acknowledgement against exact appended gallery and revision", () => {
    const result = {
      id: newId, width: 1200, height: 900, byteLength: 42000,
      imageIds: [...product.imageIds, newId], version: 8
    };
    expect(parseProductImageUploadResult(result, product)).toMatchObject({ id: newId, version: 8 });
    expect(parseProductImageUploadResult({ ...result, version: 7 }, product)).toBeNull();
    expect(parseProductImageUploadResult({ ...result, imageIds: [newId, ...product.imageIds] }, product)).toBeNull();
    expect(parseProductImageUploadResult({ ...result, imageIds: [...product.imageIds, product.imageIds[0]] }, product)).toBeNull();
  });
});
