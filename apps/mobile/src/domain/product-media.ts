import type { ArtistProduct } from "./artist-data";

export const maxProductImageBytes = 5 * 1024 * 1024;
export const maxProductGalleryImages = 8;
const maxVersion = 2_147_483_647;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const editableStates = new Set(["draft", "changes_requested", "approved"]);

export type ProductImageUploadAsset = {
  type?: string | null;
  base64?: string | null;
};

export function productImageUploadCommand(product: ArtistProduct, asset: ProductImageUploadAsset) {
  const base64 = asset.base64;
  if (product.archivedAt || !editableStates.has(product.publicationStatus) ||
    product.version >= maxVersion || product.imageIds.length >= maxProductGalleryImages ||
    asset.type !== "image" || typeof base64 !== "string" ||
    base64.length === 0 || base64.length % 4 !== 0 ||
    base64.length > Math.ceil(maxProductImageBytes / 3) * 4 ||
    !/^[A-Za-z0-9+/]+={0,2}$/.test(base64)) return null;
  const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
  const decodedLength = base64.length / 4 * 3 - padding;
  if (decodedLength < 1 || decodedLength > maxProductImageBytes) return null;
  return { version: product.version, base64 };
}

export function productImageGalleryCommand(product: ArtistProduct, imageIds: string[]) {
  if (product.archivedAt || !editableStates.has(product.publicationStatus) ||
    product.version >= maxVersion || imageIds.length > maxProductGalleryImages ||
    imageIds.some(id => !uuid.test(id)) ||
    new Set(imageIds.map(id => id.toLowerCase())).size !== imageIds.length ||
    imageIds.some(id => !product.imageIds.some(existing => existing.toLowerCase() === id.toLowerCase())) ||
    (imageIds.length === product.imageIds.length &&
      imageIds.every((id, index) => id.toLowerCase() === product.imageIds[index]!.toLowerCase()))) return null;
  return { version: product.version, imageIds: [...imageIds] };
}

export type ProductImageRead = {
  id: string;
  width: number;
  height: number;
  byteLength: number;
  contentType: "image/webp";
  url: string;
  expiresInSeconds: 300;
};

function object(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown> : null;
}

export function parseProductImageRead(value: unknown, expectedId: string, allowInsecureHttp = false): ProductImageRead | null {
  const item = object(value);
  if (!item || item.id !== expectedId || !uuid.test(expectedId) ||
    !Number.isSafeInteger(item.width) || Number(item.width) < 1 ||
    !Number.isSafeInteger(item.height) || Number(item.height) < 1 ||
    Number(item.width) * Number(item.height) > 16_000_000 ||
    !Number.isSafeInteger(item.byteLength) || Number(item.byteLength) < 1 ||
    Number(item.byteLength) > maxProductImageBytes || item.contentType !== "image/webp" ||
    item.expiresInSeconds !== 300 || typeof item.url !== "string") return null;
  try {
    const url = new URL(item.url);
    if (!url.hostname || url.username || url.password ||
      (url.protocol !== "https:" && !(allowInsecureHttp && url.protocol === "http:"))) return null;
    return {
      id: expectedId, width: Number(item.width), height: Number(item.height),
      byteLength: Number(item.byteLength), contentType: "image/webp",
      url: url.toString(), expiresInSeconds: 300
    };
  } catch {
    return null;
  }
}

export type ProductImageUploadResult = {
  id: string;
  width: number;
  height: number;
  byteLength: number;
  imageIds: string[];
  version: number;
};

export function parseProductImageUploadResult(value: unknown, product: ArtistProduct): ProductImageUploadResult | null {
  const item = object(value);
  const imageIds = item && Array.isArray(item.imageIds) ? item.imageIds as unknown[] : null;
  if (!item || !imageIds || typeof item.id !== "string" || !uuid.test(item.id) ||
    !Number.isSafeInteger(item.width) || Number(item.width) < 1 ||
    !Number.isSafeInteger(item.height) || Number(item.height) < 1 ||
    Number(item.width) * Number(item.height) > 16_000_000 ||
    !Number.isSafeInteger(item.byteLength) || Number(item.byteLength) < 1 ||
    Number(item.byteLength) > maxProductImageBytes ||
    !Number.isSafeInteger(item.version) || item.version !== product.version + 1 ||
    imageIds.length !== product.imageIds.length + 1 ||
    !imageIds.every(id => typeof id === "string" && uuid.test(id)) ||
    new Set(imageIds.map(id => String(id).toLowerCase())).size !== imageIds.length ||
    !product.imageIds.every((id, index) => String(imageIds[index]).toLowerCase() === id.toLowerCase()) ||
    String(imageIds[imageIds.length - 1]).toLowerCase() !== item.id.toLowerCase()) return null;
  return {
    id: item.id, width: Number(item.width), height: Number(item.height),
    byteLength: Number(item.byteLength), imageIds: imageIds as string[],
    version: Number(item.version)
  };
}
