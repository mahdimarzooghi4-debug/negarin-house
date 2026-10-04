import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import type { AuthorizationContext } from "@negarin/authz";
import { canEditArtistProduct } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import { PrismaService } from "./prisma.service.js";

export type InventoryWrite = { stockQuantity: number; inventoryVersion: number; reason?: string };

export function parseInventoryWrite(body: unknown): InventoryWrite {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const value = body as Record<string, unknown>;
  if (Object.keys(value).some(key => !["stockQuantity", "inventoryVersion", "reason"].includes(key))) throw new BadRequestException();
  for (const key of ["stockQuantity", "inventoryVersion"]) {
    if (typeof value[key] !== "number" || !Number.isInteger(value[key]) || value[key] < 0 || value[key] > 2_147_483_647) {
      throw new BadRequestException();
    }
  }
  if (value.reason !== undefined && (typeof value.reason !== "string" || !value.reason.trim() || value.reason.length > 500)) {
    throw new BadRequestException();
  }
  return { stockQuantity: value.stockQuantity as number, inventoryVersion: value.inventoryVersion as number,
    ...(typeof value.reason === "string" ? { reason: value.reason.trim() } : {}) };
}

@Injectable()
export class ProductInventoryService {
  constructor(private readonly database: PrismaService) {}

  private async owned(context: AuthorizationContext, id: string) {
    if (context.activeRole !== "artist") throw new ForbiddenException();
    const product = await this.database.artistProduct.findUnique({ where: { id } });
    if (!product) throw new NotFoundException();
    enforceDecision(canEditArtistProduct(context, { artistUserId: product.artistUserId }));
    return product;
  }

  async set(context: AuthorizationContext, id: string, input: InventoryWrite, requestId: string) {
    const product = await this.owned(context, id);
    if (product.archivedAt) throw new ConflictException("product-archived");
    if (product.inventoryVersion !== input.inventoryVersion) throw new ConflictException("inventory-state-changed");
    if (product.stockQuantity === input.stockQuantity) return this.view(product);
    if (product.inventoryVersion === 2_147_483_647) throw new ConflictException("inventory-version-exhausted");
    return this.database.$transaction(async tx => {
      const updated = await tx.artistProduct.updateMany({
        where: { id, artistUserId: context.userId, archivedAt: null,
          version: product.version, inventoryVersion: input.inventoryVersion },
        data: { stockQuantity: input.stockQuantity, inventoryVersion: { increment: 1 } }
      });
      if (updated.count !== 1) throw new ConflictException("inventory-state-changed");
      await tx.productInventoryEvent.create({ data: {
        productId: id, actorUserId: context.userId, previousQuantity: product.stockQuantity,
        stockQuantity: input.stockQuantity, inventoryVersion: input.inventoryVersion + 1,
        reason: input.reason ?? null, requestId
      } });
      return this.view(await tx.artistProduct.findUniqueOrThrow({ where: { id } }));
    });
  }

  async history(context: AuthorizationContext, id: string) {
    await this.owned(context, id);
    return this.database.productInventoryEvent.findMany({
      where: { productId: id }, orderBy: { inventoryVersion: "desc" }, take: 100,
      select: { id: true, previousQuantity: true, stockQuantity: true, inventoryVersion: true, reason: true, createdAt: true }
    });
  }

  private view(product: { id: string; stockQuantity: number; inventoryVersion: number }) {
    return { productId: product.id, stockQuantity: product.stockQuantity, inventoryVersion: product.inventoryVersion,
      availability: product.stockQuantity > 0 ? "in_stock" : "out_of_stock" };
  }
}

