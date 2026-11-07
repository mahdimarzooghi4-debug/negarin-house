import { apiJson } from "../api/client";

export type Product = {
  id: string; title: string; description: string | null; category: string | null;
  dimensions: string | null; materials: string | null; weight: string | null;
  color: string | null; technique: string | null; careInstructions: string | null;
  priceToman: string; imageIds: string[]; coverImageId: string | null;
  availability: "in_stock" | "out_of_stock"; createdAt: string;
};
export type ProductPage = { page: number; pageSize: number; hasMore: boolean; items: Product[] };
export type Sort = "newest" | "price_asc" | "price_desc";
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const object = (v: unknown): Record<string, unknown> | null => v && typeof v === "object" && !Array.isArray(v) ? v as Record<string, unknown> : null;

export function parseProduct(value: unknown): Product {
  const v = object(value);
  if (!v || typeof v.id !== "string" || !uuid.test(v.id) || typeof v.title !== "string" || !v.title.trim() ||
    ["artistUserId", "publicationStatus", "inventoryVersion", "archivedAt"].some(key => key in v) ||
    ["description", "category", "dimensions", "materials", "weight", "color", "technique", "careInstructions"].some(key => v[key] !== null && typeof v[key] !== "string") ||
    typeof v.priceToman !== "string" || !/^(0|[1-9]\d{0,18})$/.test(v.priceToman) || BigInt(v.priceToman) > 9223372036854775807n ||
    !Array.isArray(v.imageIds) || !v.imageIds.every(id => typeof id === "string" && uuid.test(id)) ||
    new Set(v.imageIds.map(id => id.toLowerCase())).size !== v.imageIds.length ||
    v.coverImageId !== (v.imageIds[0] ?? null) || !["in_stock", "out_of_stock"].includes(String(v.availability)) ||
    typeof v.createdAt !== "string" || Number.isNaN(Date.parse(v.createdAt)) || new Date(v.createdAt).toISOString() !== v.createdAt) throw new Error("اطلاعات اثر معتبر نیست.");
  return v as Product;
}

export function parseProductPage(value: unknown, page: number): ProductPage {
  const v = object(value);
  if (!v || v.page !== page || v.pageSize !== 10 || typeof v.hasMore !== "boolean" || !Array.isArray(v.items) || v.items.length > 10 || (v.hasMore && v.items.length !== 10)) throw new Error("فهرست آثار معتبر نیست.");
  const items = v.items.map(parseProduct);
  if (new Set(items.map(item => item.id.toLowerCase())).size !== items.length) throw new Error("فهرست آثار تکراری است.");
  return { page, pageSize: 10, hasMore: v.hasMore, items };
}

export function catalogPath(input: { page: number; q: string; category: string; inStock: boolean; sort: Sort }): string {
  if (!Number.isInteger(input.page) || input.page < 1 || input.page > 1000 || input.q.length > 200 || input.category.length > 200 || !["newest", "price_asc", "price_desc"].includes(input.sort)) throw new Error("فیلتر آثار معتبر نیست.");
  const params = new URLSearchParams({ page: String(input.page), pageSize: "10", sort: input.sort });
  if (input.q.trim()) params.set("q", input.q.trim());
  if (input.category) params.set("category", input.category);
  if (input.inStock) params.set("inStock", "true");
  return "/api/v1/catalog/products?" + params.toString();
}

export async function readProduct(id: string, signal?: AbortSignal): Promise<Product> {
  if (!uuid.test(id)) throw new Error("شناسه اثر معتبر نیست.");
  const product = parseProduct(await apiJson("/api/v1/catalog/products/" + id, null, { signal }));
  if (product.id.toLowerCase() !== id.toLowerCase()) throw new Error("پاسخ اثر تطابق ندارد.");
  return product;
}

export function toman(value: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, "٬").replace(/\d/g, digit => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]!) + " تومان";
}
