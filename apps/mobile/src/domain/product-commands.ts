import type { ArtistProduct } from "./artist-data";

export type ProductForm = {
  title: string;
  description: string;
  category: string;
  priceToman: string;
};
export type ProductCreate = {
  title: string;
  description: string | null;
  category: string | null;
  priceToman: string;
};
export type ProductPatch = Partial<ProductCreate> & { version: number };

const maxAmount = 9_223_372_036_854_775_807n;
const maxVersion = 2_147_483_647;
const persian = "۰۱۲۳۴۵۶۷۸۹";
const arabic = "٠١٢٣٤٥٦٧٨٩";

export function normalizeDigits(value: string): string {
  return value.replace(/[۰-۹٠-٩]/g, (digit) => {
    const index = persian.indexOf(digit);
    return String(index < 0 ? arabic.indexOf(digit) : index);
  });
}

export function parseTomanInput(value: string): string | null {
  const normalized = normalizeDigits(value.trim());
  const ungrouped = /^[1-9][0-9]*$/.test(normalized)
    ? normalized
    : /^[1-9][0-9]{0,2}([,٬][0-9]{3})+$/.test(normalized)
      ? normalized.replace(/[,٬]/g, "")
      : null;
  if (!ungrouped || ungrouped.length > 19 || BigInt(ungrouped) > maxAmount) return null;
  return ungrouped;
}

export function parseStockInput(value: string): number | null {
  const normalized = normalizeDigits(value.trim());
  if (!/^(0|[1-9][0-9]*)$/.test(normalized)) return null;
  const quantity = Number(normalized);
  return Number.isSafeInteger(quantity) && quantity <= maxVersion ? quantity : null;
}

export function createProductCommand(form: ProductForm): ProductCreate | null {
  const title = form.title.trim();
  const category = form.category.trim();
  const priceToman = parseTomanInput(form.priceToman);
  if (!title || title.length > 200 || form.description.length > 20_000 ||
    category.length > 200 || !priceToman) return null;
  return {
    title,
    description: form.description.trim() || null,
    category: category || null,
    priceToman
  };
}

export function patchProductCommand(product: ArtistProduct, form: ProductForm): ProductPatch | null {
  const valid = createProductCommand(form);
  if (!valid || product.archivedAt || product.version >= maxVersion) return null;
  const locked = product.publicationStatus === "published" || product.publicationStatus === "under_review";
  const changed: ProductPatch = { version: product.version };
  if (valid.priceToman !== product.priceToman) changed.priceToman = valid.priceToman;
  if (!locked) {
    if (valid.title !== product.title) changed.title = valid.title;
    if (valid.description !== product.description) changed.description = valid.description;
    if (valid.category !== product.category) changed.category = valid.category;
  }
  return Object.keys(changed).length === 1 ? null : changed;
}

export function inventoryCommand(product: ArtistProduct, quantity: string) {
  const stockQuantity = parseStockInput(quantity);
  if (stockQuantity === null || product.archivedAt ||
    product.inventoryVersion >= maxVersion || stockQuantity === product.stockQuantity) return null;
  return { inventoryVersion: product.inventoryVersion, stockQuantity };
}

export function publicationCommand(product: ArtistProduct, action: "submit" | "publish") {
  if (product.archivedAt || product.version >= maxVersion) return null;
  if (action === "submit" &&
    !["draft", "changes_requested"].includes(product.publicationStatus)) return null;
  if (action === "publish" && product.publicationStatus !== "approved") return null;
  // An image is an authoritative publication prerequisite; never pretend it was uploaded.
  if (action === "submit" && product.imageIds.length === 0) return null;
  return { version: product.version };
}
