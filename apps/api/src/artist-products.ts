import {
  BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException
} from "@nestjs/common";
import type { AuthorizationContext } from "@negarin/authz";
import { canEditArtistProduct } from "@negarin/authz";
import { PrismaService } from "./prisma.service.js";
import { enforceDecision } from "./authorization.guard.js";

import { parseProductSpecifications, productContentSnapshot, specificationFields, type ProductSpecifications } from "./product-specifications.js";

export type ArtistProductWrite = Partial<ProductSpecifications> & {
  version?: number;
  title?: string;
  description?: string | null;
  priceToman?: bigint;
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
        ...input,
        artistUserId: context.userId,
        title: input.title!,
        description: input.description ?? null,
        priceToman: input.priceToman!
      }
    });
    return this.view(product);
  }

  async update(context: AuthorizationContext, id: string, input: ArtistProductWrite, requestId: string) {
    const product = await this.ownedProduct(context, id);
    if (product.archivedAt) throw new ConflictException("product-archived");
    const { version: expectedVersion, ...changes } = input;
    if (expectedVersion !== undefined && expectedVersion !== product.version) throw new ConflictException("product-state-changed");
    const changesContent = input.title !== undefined || input.description !== undefined ||
      specificationFields.some((key) => Object.hasOwn(input, key));
    if (changesContent && product.version >= 2_147_483_647) throw new ConflictException("product-version-exhausted");
    if (changesContent && !["draft", "changes_requested", "approved"].includes(product.publicationStatus)) {
      throw new ConflictException("product-content-locked");
    }
    await this.database.$transaction(async (tx) => {
      const updated = await tx.artistProduct.updateMany({
        where: { id, artistUserId: context.userId, archivedAt: null, version: product.version },
        data: {
          ...changes,
          ...(changesContent ? {
            version: { increment: 1 },
            ...(product.publicationStatus === "approved" ? { publicationStatus: "draft" as const } : {})
          } : {})
        }
      });
      if (updated.count !== 1) throw new ConflictException("product-state-changed");
      if (changesContent) {
        await tx.productPublicationEvent.create({ data: {
          productId: id, actorUserId: context.userId, actorRole: "artist", action: "content-updated",
          fromStatus: product.publicationStatus,
          toStatus: product.publicationStatus === "approved" ? "draft" : product.publicationStatus,
          version: product.version + 1,
          content: productContentSnapshot({ ...product, ...changes }),
          requestId
        } });
      }
    });
    return this.get(context, id);
  }

  async setArchived(context: AuthorizationContext, id: string, archived: boolean) {
    const product = await this.ownedProduct(context, id);
    if (Boolean(product.archivedAt) === archived) return this.view(product);

    const updated = await this.database.artistProduct.updateMany({
      where: { id, artistUserId: context.userId, archivedAt: product.archivedAt, version: product.version },
      data: { archivedAt: archived ? new Date() : null, version: { increment: 1 } }
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

  private view(product: ProductSpecifications & {
    id: string;
    title: string;
    description: string | null;
    priceToman: bigint;
    publicationStatus: string;
    version: number;
    stockQuantity: number;
    inventoryVersion: number;
    archivedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: product.id,
      ...productContentSnapshot(product),
      priceToman: product.priceToman.toString(),
      publicationStatus: product.publicationStatus,
      version: product.version,
      stockQuantity: product.stockQuantity,
      inventoryVersion: product.inventoryVersion,
      availability: product.stockQuantity > 0 ? "in_stock" : "out_of_stock",
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
  const allowed = new Set(["title", "description", "priceToman", ...specificationFields, ...(partial ? ["version"] : [])]);
  if (Object.keys(value).some((key) => !allowed.has(key))) throw new BadRequestException();

  const result: ArtistProductWrite = parseProductSpecifications(value);
  if (partial && (Object.hasOwn(value, "version") || specificationFields.some((key) => Object.hasOwn(value, key)))) {
    if (!Number.isInteger(value.version) || (value.version as number) < 0 || (value.version as number) >= 2_147_483_647) {
      throw new BadRequestException("invalid-product-version");
    }
    result.version = value.version as number;
  }
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
  if (partial && Object.keys(result).filter((key) => key !== "version").length === 0) throw new BadRequestException();
  return result;
}

export function parseArtistProductId(id: string): string {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    throw new BadRequestException();
  }
  return id;
}
