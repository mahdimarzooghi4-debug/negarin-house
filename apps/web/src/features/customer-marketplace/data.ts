export type MarketplaceProduct = {
  id: string;
  storefrontId: string | null;
  title: string;
  description: string | null;
  category: string | null;
  preparationTime: string | null;
  dimensions: string | null;
  materials: string | null;
  weight: string | null;
  color: string | null;
  technique: string | null;
  careInstructions: string | null;
  priceToman: string;
  imageIds: string[];
  coverImageId: string | null;
  availability: "in_stock" | "out_of_stock";
  createdAt: string;
};
export type PublicArtistStorefront = { storeName: string; shortIntro: string; about: string; coverImageId: string | null; avatarImageId: string | null; items: MarketplaceProduct[]; page: number; pageSize: number; hasMore: boolean };
export type MarketplacePage = { items: MarketplaceProduct[]; page: number; pageSize: number; hasMore: boolean };
export type MarketplaceCategory = { name: string; productCount: number };
export type FavoriteProduct = { id: string; title: string; category: string | null; priceToman: string; coverImageId: string | null; availability: "in_stock" | "out_of_stock"; createdAt: string };
export type FavoritePage = { items: FavoriteProduct[]; page: number; pageSize: number; hasMore: boolean };
export type CustomerCart = {
  version: number;
  items: Array<{
    productId: string;
    quantity: number;
    status: "available" | "out_of_stock" | "insufficient_stock" | "unavailable";
    product: { id: string; title: string; priceToman: string; coverImageId: string | null } | null;
    lineSubtotalToman: string | null;
  }>;
  subtotalToman: string | null;
  canCheckout: boolean;
};

function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}
function isUuid(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}
export function parseMarketplaceCategories(value: unknown): MarketplaceCategory[] | null {
  const result = record(value);
  if (!result || !Array.isArray(result.items)) return null;
  const items = result.items.map(value => {
    const item = record(value);
    return item && typeof item.name === "string" && item.name.trim().length > 0 && Number.isSafeInteger(item.productCount) && (item.productCount as number) > 0
      ? { name: item.name, productCount: item.productCount as number } : null;
  });
  if (items.some(item => item === null)) return null;
  const categories = items as MarketplaceCategory[];
  return new Set(categories.map(item => item.name)).size === categories.length ? categories : null;
}
function nullableText(value: unknown): value is string | null { return value === null || typeof value === "string"; }
function iso(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) && date.toISOString() === value;
}

export function parseMarketplaceProduct(value: unknown): MarketplaceProduct | null {
  const item = record(value);
  if (!item || !isUuid(item.id) || !(item.storefrontId === null || isUuid(item.storefrontId)) || typeof item.title !== "string" || !nullableText(item.description) || !nullableText(item.category) ||
    !nullableText(item.preparationTime) || !nullableText(item.dimensions) || !nullableText(item.materials) || !nullableText(item.weight) ||
    !nullableText(item.color) || !nullableText(item.technique) || !nullableText(item.careInstructions) ||
    typeof item.priceToman !== "string" || !/^(0|[1-9]\d*)$/.test(item.priceToman) || !Array.isArray(item.imageIds) ||
    !item.imageIds.every(isUuid) || new Set(item.imageIds.map(id => id.toLowerCase())).size !== item.imageIds.length ||
    !(item.coverImageId === null || isUuid(item.coverImageId)) || item.coverImageId !== (item.imageIds[0] ?? null) ||
    (item.availability !== "in_stock" && item.availability !== "out_of_stock") || !iso(item.createdAt) ||
    ["artistUserId", "publicationStatus", "archivedAt", "stockQuantity", "inventoryVersion", "version", "requestId"].some(key => key in item)) return null;
  return item as MarketplaceProduct;
}

export function parsePublicArtistStorefront(value: unknown, expected: { page: number; pageSize: number }): PublicArtistStorefront | null {
  const item = record(value);
  if (!item || typeof item.storeName !== "string" || typeof item.shortIntro !== "string" || typeof item.about !== "string" ||
      !(item.coverImageId === null || isUuid(item.coverImageId)) || !(item.avatarImageId === null || isUuid(item.avatarImageId)) ||
      item.page !== expected.page || item.pageSize !== expected.pageSize || typeof item.hasMore !== "boolean" || !Array.isArray(item.items) ||
      item.items.length > expected.pageSize || (item.hasMore && item.items.length !== expected.pageSize)) return null;
  const products = item.items.map(parseMarketplaceProduct);
  if (products.some(product => product === null)) return null;
  const parsed = products as MarketplaceProduct[];
  if (parsed.some(product => product.storefrontId === null) || new Set(parsed.map(product => product.id.toLowerCase())).size !== parsed.length) return null;
  return { storeName: item.storeName, shortIntro: item.shortIntro, about: item.about, coverImageId: item.coverImageId, avatarImageId: item.avatarImageId,
    items: parsed, page: expected.page, pageSize: expected.pageSize, hasMore: item.hasMore };
}

export function parseMarketplacePage(value: unknown, expected: { page: number; pageSize: number }): MarketplacePage | null {
  const page = record(value);
  if (!page || page.page !== expected.page || page.pageSize !== expected.pageSize || typeof page.hasMore !== "boolean" ||
    !Array.isArray(page.items) || page.items.length > expected.pageSize || (page.hasMore && page.items.length !== expected.pageSize)) return null;
  const items = page.items.map(parseMarketplaceProduct);
  if (items.some(item => item === null)) return null;
  const products = items as MarketplaceProduct[];
  if (new Set(products.map(item => item.id.toLowerCase())).size !== products.length) return null;
  return { items: products, page: expected.page, pageSize: expected.pageSize, hasMore: page.hasMore };
}

export function parseCustomerCart(value: unknown): CustomerCart | null {
  const cart = record(value);
  if (!cart || !Number.isInteger(cart.version) || (cart.version as number) < 0 || typeof cart.canCheckout !== "boolean" ||
    !(cart.subtotalToman === null || (typeof cart.subtotalToman === "string" && /^(0|[1-9]\d*)$/.test(cart.subtotalToman))) ||
    !Array.isArray(cart.items) || cart.items.length > 50) return null;
  const items = cart.items.map((value) => {
    const item = record(value);
    if (!item || !isUuid(item.productId) || !Number.isInteger(item.quantity) || (item.quantity as number) < 1 || (item.quantity as number) > 100 ||
      !["available", "out_of_stock", "insufficient_stock", "unavailable"].includes(String(item.status)) ||
      !(item.lineSubtotalToman === null || (typeof item.lineSubtotalToman === "string" && /^(0|[1-9]\d*)$/.test(item.lineSubtotalToman)))) return null;
    let product: CustomerCart["items"][number]["product"] = null;
    if (item.product !== null) {
      const parsed = record(item.product);
      if (!parsed || parsed.id !== item.productId || typeof parsed.title !== "string" ||
        typeof parsed.priceToman !== "string" || !/^(0|[1-9]\d*)$/.test(parsed.priceToman) ||
        !(parsed.coverImageId === null || isUuid(parsed.coverImageId)) ||
        ["artistUserId", "publicationStatus", "archivedAt", "stockQuantity", "inventoryVersion", "version", "requestId"].some(key => key in parsed)) return null;
      product = { id: parsed.id, title: parsed.title, priceToman: parsed.priceToman, coverImageId: parsed.coverImageId };
    }
    if (item.status === "unavailable" ? item.product !== null || item.lineSubtotalToman !== null : item.product === null) return null;
    return { productId: item.productId, quantity: item.quantity as number, status: item.status as CustomerCart["items"][number]["status"], product, lineSubtotalToman: item.lineSubtotalToman as string | null };
  });
  if (items.some(item => item === null)) return null;
  const parsedItems = items as CustomerCart["items"];
  if (new Set(parsedItems.map(item => item.productId.toLowerCase())).size !== parsedItems.length ||
    cart.canCheckout !== (parsedItems.length > 0 && parsedItems.every(item => item.status === "available"))) return null;
  return { version: cart.version as number, items: parsedItems, subtotalToman: cart.subtotalToman as string | null, canCheckout: cart.canCheckout };
}

export function parseFavoriteProduct(value: unknown): FavoriteProduct | null {
  const product = record(value);
  if (!product || !isUuid(product.id) || typeof product.title !== "string" || !nullableText(product.category) ||
    typeof product.priceToman !== "string" || !/^(0|[1-9]\d*)$/.test(product.priceToman) ||
    !(product.coverImageId === null || isUuid(product.coverImageId)) ||
    (product.availability !== "in_stock" && product.availability !== "out_of_stock") || !iso(product.createdAt) ||
    ["artistUserId", "publicationStatus", "archivedAt", "stockQuantity", "inventoryVersion", "version", "requestId"].some(key => key in product)) return null;
  return product as FavoriteProduct;
}

export function parseFavoritePage(value: unknown, expected: { page: number; pageSize: number }): FavoritePage | null {
  const page = record(value);
  if (!page || page.page !== expected.page || page.pageSize !== expected.pageSize || typeof page.hasMore !== "boolean" ||
    !Array.isArray(page.items) || page.items.length > expected.pageSize || (page.hasMore && page.items.length !== expected.pageSize)) return null;
  const items = page.items.map(parseFavoriteProduct);
  if (items.some(item => item === null)) return null;
  const products = items as FavoriteProduct[];
  if (new Set(products.map(item => item.id.toLowerCase())).size !== products.length) return null;
  return { items: products, page: expected.page, pageSize: expected.pageSize, hasMore: page.hasMore };
}

export function formatMarketplaceToman(value: string): string {
  if (!/^(0|[1-9]\d*)$/.test(value)) return "—";
  return `${new Intl.NumberFormat("fa-IR").format(BigInt(value))} تومان`;
}
