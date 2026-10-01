import {
  BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException
} from "@nestjs/common";
import type { AuthorizationContext } from "@negarin/authz";
import { canEditArtistProduct } from "@negarin/authz";
import { PrismaService } from "./prisma.service.js";
import { enforceDecision } from "./authorization.guard.js";

export type ArtistProductWrite = {
  title?: string;
  description?: string | null;
  priceToman?: bigint;
  availableQuantity?: number;
};

@Injectable()
export class ArtistProductsService {
  constructor(private readonly database: PrismaService) {}

  async list(context: AuthorizationContext, includeArchived = false) {
    this.requireArtist(context);
    const products = await this.database.artistProduct.findMany({
      where: { artistUserId: context.userId, ...(includeArchived ? {} : { archivedAt: null }) },
      orderBy: [{ updatedAt: "desc" }, { id: "asc" }]
    });
    return products.map((product) => this.view(product));
  }

  async get(context: AuthorizationContext, id: string) {
    return this.view(await this.ownedProduct(context, id));
  }

  async create(context: AuthorizationContext, input: ArtistProductWrite) {
    this.requireArtist(context);
    const product = await this.database.artistProduct.create({
      data: {
        artistUserId: context.userId,
        title: input.title!,
        description: input.description ?? null,
        priceToman: input.priceToman!,
        availableQuantity: input.availableQuantity!
      }
    });
    return this.view(product);
  }

  async update(context: AuthorizationContext, id: string, input: ArtistProductWrite) {
    const contentChanged = Object.hasOwn(input, "title") || Object.hasOwn(input, "description");
    await this.database.$transaction(async (transaction) => {
      const product = await transaction.artistProduct.findUnique({ where: { id } });
      if (!product) throw new NotFoundException();
      enforceDecision(canEditArtistProduct(context, { artistUserId: product.artistUserId }));
      if (product.archivedAt) throw new ConflictException("product-archived");
      if (product.publicationStatus === "under_review") throw new ConflictException("product-under-review");

      const publicationStatus = contentChanged &&
        (product.publicationStatus === "approved" || product.publicationStatus === "published")
        ? "draft"
        : product.publicationStatus;
      const updated = await transaction.artistProduct.updateMany({
        where: { id, artistUserId: context.userId, archivedAt: null, publicationStatus: product.publicationStatus },
        data: { ...input, publicationStatus }
      });
      if (updated.count !== 1) throw new ConflictException("product-state-changed");
      if (publicationStatus === "draft" && product.publicationStatus !== "draft") {
        await transaction.productPublicationEvent.create({
          data: { productId: id, actorUserId: context.userId, status: "draft" }
        });
      }
    });
    return this.get(context, id);
  }

  async setArchived(context: AuthorizationContext, id: string, archived: boolean) {
    const product = await this.ownedProduct(context, id);
    if (Boolean(product.archivedAt) === archived) return this.view(product);

    const updated = await this.database.artistProduct.updateMany({
      where: { id, artistUserId: context.userId, archivedAt: product.archivedAt },
      data: { archivedAt: archived ? new Date() : null }
    });
    if (updated.count !== 1) {
      const current = await this.ownedProduct(context, id);
      if (Boolean(current.archivedAt) === archived) return this.view(current);
      throw new ConflictException("product-state-changed");
    }
    return this.get(context, id);
  }

  private requireArtist(context: AuthorizationContext): void {
    if (context.activeRole !== "artist") throw new ForbiddenException();
  }

  private async ownedProduct(context: AuthorizationContext, id: string) {
    const product = await this.database.artistProduct.findUnique({ where: { id } });
    if (!product) throw new NotFoundException();
    enforceDecision(canEditArtistProduct(context, { artistUserId: product.artistUserId }));
    return product;
  }

  private view(product: {
    id: string;
    title: string;
    description: string | null;
    priceToman: bigint;
    availableQuantity: number;
    publicationStatus: string;
    archivedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      priceToman: product.priceToman.toString(),
      availableQuantity: product.availableQuantity,
      publicationStatus: product.publicationStatus,
      archivedAt: product.archivedAt?.toISOString() ?? null,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString()
    };
  }
}

const maxPostgresBigInt = 9_223_372_036_854_775_807n;

export function parseArtistProductWrite(body: unknown, partial = false): ArtistProductWrite {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const value = body as Record<string, unknown>;
  const allowed = new Set(["title", "description", "priceToman", "availableQuantity"]);
  if (Object.keys(value).some((key) => !allowed.has(key))) throw new BadRequestException();

  const result: ArtistProductWrite = {};
  if (!partial || Object.hasOwn(value, "title")) {
    if (typeof value.title !== "string" || value.title.trim().length === 0 || value.title.length > 200) {
      throw new BadRequestException();
    }
    result.title = value.title.trim();
  }
  if (Object.hasOwn(value, "description")) {
    if (value.description !== null && typeof value.description !== "string") throw new BadRequestException();
    if (typeof value.description === "string" && value.description.length > 20_000) throw new BadRequestException();
    result.description = value.description as string | null;
  }
  if (!partial || Object.hasOwn(value, "priceToman")) {
    if (typeof value.priceToman !== "string" || value.priceToman.length > 19 || !/^[1-9]\d*$/.test(value.priceToman)) {
      throw new BadRequestException();
    }
    const amount = BigInt(value.priceToman);
    if (amount > maxPostgresBigInt) throw new BadRequestException();
    result.priceToman = amount;
  }
  if (Object.hasOwn(value, "availableQuantity")) {
    if (!Number.isSafeInteger(value.availableQuantity) || (value.availableQuantity as number) < 0 || (value.availableQuantity as number) > 1_000_000) {
      throw new BadRequestException();
    }
    result.availableQuantity = value.availableQuantity as number;
  } else if (!partial) result.availableQuantity = 1;
  if (partial && Object.keys(result).length === 0) throw new BadRequestException();
  return result;
}

export function parseArtistProductId(id: string): string {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    throw new BadRequestException();
  }
  return id;
}
