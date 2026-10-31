import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import type { AuthorizationContext } from "@negarin/authz";
import { PrismaService } from "./prisma.service.js";

export function parseFavoriteBody(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body) || Object.keys(body).length) throw new BadRequestException();
}
export function parseFavoritePage(query: Record<string, unknown>) {
  if (Object.keys(query).some(key => !["page", "pageSize"].includes(key))) throw new BadRequestException();
  const parse = (value: unknown, fallback: number, max: number) => {
    if (value === undefined) return fallback;
    if (typeof value !== "string" || !/^[1-9][0-9]{0,3}$/.test(value) || Number(value) > max) throw new BadRequestException();
    return Number(value);
  };
  return { page: parse(query.page, 1, 1000), pageSize: parse(query.pageSize, 20, 50) };
}

@Injectable()
export class CustomerFavoritesService {
  constructor(private readonly db: PrismaService) {}
  private customer(context: AuthorizationContext) {
    if (context.activeRole !== "customer") throw new ForbiddenException();
  }

  async list(context: AuthorizationContext, page: number, pageSize: number) {
    this.customer(context);
    const rows = await this.db.customerFavorite.findMany({
      where: { userId: context.userId, product: { publicationStatus: "published", archivedAt: null } },
      orderBy: [{ createdAt: "desc" }, { productId: "asc" }],
      skip: (page - 1) * pageSize,
      take: pageSize + 1,
      select: { product: { select: { id: true, title: true, category: true, priceToman: true, imageIds: true, stockQuantity: true, createdAt: true } } }
    });
    return { page, pageSize, hasMore: rows.length > pageSize, items: rows.slice(0, pageSize).map(({ product }) => ({ id: product.id, title: product.title, category: product.category,
      priceToman: product.priceToman.toString(), coverImageId: product.imageIds[0] ?? null,
      availability: product.stockQuantity > 0 ? "in_stock" : "out_of_stock", createdAt: product.createdAt.toISOString() })) };
  }

  async add(context: AuthorizationContext, productId: string) {
    this.customer(context);
    await this.db.$transaction(async tx => {
      const rows = await tx.$queryRaw<Array<{ id: string }>>`SELECT "id" FROM "artist_products" WHERE "id" = ${productId}::uuid AND "publicationStatus" = 'published' AND "archivedAt" IS NULL FOR SHARE`;
      if (!rows.length) throw new NotFoundException();
      await tx.customerFavorite.createMany({ data: [{ userId: context.userId, productId }], skipDuplicates: true });
    });
    return { saved: true };
  }

  async has(context: AuthorizationContext, productId: string) {
    this.customer(context);
    const saved = await this.db.customerFavorite.findFirst({ where: { userId: context.userId, productId,
      product: { publicationStatus: "published", archivedAt: null } }, select: { productId: true } });
    return { saved: saved !== null };
  }

  async remove(context: AuthorizationContext, productId: string) {
    this.customer(context);
    await this.db.customerFavorite.deleteMany({ where: { userId: context.userId, productId } });
    return { saved: false };
  }
}
