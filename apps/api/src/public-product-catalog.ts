import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { PrismaService } from "./prisma.service.js";
import { ProductImageStorage } from "./product-images.js";
import type { Prisma } from "./generated/prisma/client.js";

export type CatalogQuery = {
  q?: string; category?: string; minPriceToman?: bigint; maxPriceToman?: bigint;
  inStock?: boolean; page: number; pageSize: number; sort: "newest" | "price_asc" | "price_desc";
};
const maxToman = 9_223_372_036_854_775_807n;
export function parseCatalogQuery(raw: Record<string, unknown>): CatalogQuery {
  const allowed = ["q", "category", "minPriceToman", "maxPriceToman", "inStock", "page", "pageSize", "sort"];
  if (Object.keys(raw).some((key) => !allowed.includes(key)) || Object.values(raw).some((value) => typeof value !== "string")) {
    throw new BadRequestException("invalid-catalog-query");
  }
  const result: CatalogQuery = { page: 1, pageSize: 20, sort: "newest" };
  for (const key of ["q", "category"] as const) {
    const text = raw[key];
    if (text !== undefined) {
      if (typeof text !== "string" || !text.trim() || text.length > 200) throw new BadRequestException();
      result[key] = text.trim();
    }
  }
  for (const key of ["minPriceToman", "maxPriceToman"] as const) {
    const value = raw[key];
    if (value !== undefined) {
      if (typeof value !== "string" || !/^(0|[1-9]\d{0,18})$/.test(value) || BigInt(value) > maxToman) throw new BadRequestException();
      result[key] = BigInt(value);
    }
  }
  if (result.minPriceToman !== undefined && result.maxPriceToman !== undefined && result.minPriceToman > result.maxPriceToman) {
    throw new BadRequestException("invalid-price-range");
  }
  for (const [key, maximum] of [["page", 1000], ["pageSize", 50]] as const) {
    if (raw[key] !== undefined) {
      const value = raw[key];
      if (typeof value !== "string" || !/^[1-9]\d{0,3}$/.test(value) || Number(value) > maximum) throw new BadRequestException();
      result[key] = Number(value);
    }
  }
  if (raw.inStock !== undefined) {
    if (raw.inStock !== "true" && raw.inStock !== "false") throw new BadRequestException();
    result.inStock = raw.inStock === "true";
  }
  if (raw.sort !== undefined) {
    if (!["newest", "price_asc", "price_desc"].includes(raw.sort as string)) throw new BadRequestException();
    result.sort = raw.sort as CatalogQuery["sort"];
  }
  return result;
}

const visible = { publicationStatus: "published", archivedAt: null } as const;
const publicSelect = {
  id: true, title: true, description: true, category: true, dimensions: true, materials: true,
  weight: true, color: true, technique: true, careInstructions: true, priceToman: true,
  imageIds: true, stockQuantity: true, createdAt: true
} as const;
type PublicProduct = Prisma.ArtistProductGetPayload<{ select: typeof publicSelect }>;
function view(product: PublicProduct) {
  const { stockQuantity, priceToman, createdAt, ...content } = product;
  return { ...content, priceToman: priceToman.toString(), availability: stockQuantity > 0 ? "in_stock" : "out_of_stock",
    coverImageId: product.imageIds[0] ?? null, createdAt: createdAt.toISOString() };
}
// Prisma contains uses LIKE. Treat user percent/underscore/backslash as literal characters.
function literalSearch(value: string) { return value.replace(/[\\%_]/g, (character) => `\\${character}`); }

@Injectable()
export class PublicProductCatalogService {
  constructor(private readonly db: PrismaService, private readonly storage: ProductImageStorage) {}
  async list(input: CatalogQuery) {
    const search = input.q === undefined ? undefined : literalSearch(input.q);
    const where: Prisma.ArtistProductWhereInput = {
      ...visible,
      ...(input.category === undefined ? {} : { category: input.category }),
      ...(search === undefined ? {} : { OR: [
        { title: { contains: search, mode: "insensitive" } }, { description: { contains: search, mode: "insensitive" } }
      ] }),
      ...(input.minPriceToman === undefined && input.maxPriceToman === undefined ? {} : { priceToman: {
        ...(input.minPriceToman === undefined ? {} : { gte: input.minPriceToman }),
        ...(input.maxPriceToman === undefined ? {} : { lte: input.maxPriceToman })
      } }),
      ...(input.inStock === undefined ? {} : { stockQuantity: input.inStock ? { gt: 0 } : 0 })
    };
    const orderBy: Prisma.ArtistProductOrderByWithRelationInput[] = input.sort === "newest"
      ? [{ createdAt: "desc" }, { id: "asc" }]
      : [{ priceToman: input.sort === "price_asc" ? "asc" : "desc" }, { id: "asc" }];
    const products = await this.db.artistProduct.findMany({ where, select: publicSelect, orderBy,
      skip: (input.page - 1) * input.pageSize, take: input.pageSize + 1 });
    return { items: products.slice(0, input.pageSize).map(view), page: input.page, pageSize: input.pageSize,
      hasMore: products.length > input.pageSize };
  }
  async get(id: string) {
    const product = await this.db.artistProduct.findFirst({ where: { id, ...visible }, select: publicSelect });
    if (!product) throw new NotFoundException();
    return view(product);
  }
  async image(id: string, imageId: string) {
    // Visibility, membership and asset ownership are checked together in one database read.
    const image = await this.db.productImage.findFirst({ where: {
      id: imageId, productId: id, product: { ...visible, imageIds: { has: imageId } }
    }, select: { id: true, objectKey: true, width: true, height: true, byteLength: true } });
    if (!image) throw new NotFoundException();
    try {
      return { id: image.id, width: image.width, height: image.height, byteLength: image.byteLength,
        contentType: "image/webp", url: await this.storage.store.createReadUrl(image.objectKey), expiresInSeconds: 300 };
    } catch { throw new ServiceUnavailableException("image-storage-unavailable"); }
  }
}
