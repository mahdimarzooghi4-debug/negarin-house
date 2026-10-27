import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import type { AuthorizationContext } from "@negarin/authz";
import { PrismaService } from "./prisma.service.js";
import type { Prisma } from "./generated/prisma/client.js";

export const maxCartLines = 50;
export const maxCartQuantity = 100;
export function parseCartCommand(body: unknown, quantity = false): { version: number; quantity?: number } {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const value = body as Record<string, unknown>;
  if (Object.keys(value).some((key) => !["version", ...(quantity ? ["quantity"] : [])].includes(key)) ||
    !Number.isInteger(value.version) || (value.version as number) < 0 || (value.version as number) >= 2147483647) throw new BadRequestException();
  if (quantity && (!Number.isInteger(value.quantity) || (value.quantity as number) < 1 || (value.quantity as number) > maxCartQuantity)) {
    throw new BadRequestException("invalid-cart-quantity");
  }
  return { version: value.version as number, ...(quantity ? { quantity: value.quantity as number } : {}) };
}
const cartSelect = {
  version: true,
  items: { orderBy: { productId: "asc" }, select: {
    productId: true, quantity: true,
    product: { select: { id: true, title: true, priceToman: true, imageIds: true,
      publicationStatus: true, archivedAt: true, stockQuantity: true } }
  } }
} satisfies Prisma.CustomerCartSelect;
type CartSnapshot = Prisma.CustomerCartGetPayload<{ select: typeof cartSelect }>;
export function cartView(cart: CartSnapshot) {
  let subtotal = 0n;
  let missingPrice = false;
  const items = cart.items.map((item) => {
    const p = item.product;
    if (p.publicationStatus !== "published" || p.archivedAt !== null) {
      missingPrice = true;
      return { productId: item.productId, quantity: item.quantity, status: "unavailable", product: null, lineSubtotalToman: null };
    }
    const amount = p.priceToman * BigInt(item.quantity);
    subtotal += amount;
    const status = p.stockQuantity === 0 ? "out_of_stock" : p.stockQuantity < item.quantity ? "insufficient_stock" : "available";
    return { productId: item.productId, quantity: item.quantity, status,
      product: { id: p.id, title: p.title, priceToman: p.priceToman.toString(), coverImageId: p.imageIds[0] ?? null },
      lineSubtotalToman: amount.toString() };
  });
  return { version: cart.version, items, subtotalToman: missingPrice ? null : subtotal.toString(),
    canCheckout: items.length > 0 && items.every((item) => item.status === "available") };
}

@Injectable()
export class CustomerCartService {
  constructor(private readonly db: PrismaService) {}
  private customer(context: AuthorizationContext) {
    if (context.activeRole !== "customer") throw new ForbiddenException();
  }
  private async ensure(tx: Prisma.TransactionClient, userId: string) {
    // Concurrent first visits share a cart through the unique user constraint.
    await tx.customerCart.createMany({ data: [{ userId }], skipDuplicates: true });
    return tx.customerCart.findUniqueOrThrow({ where: { userId }, select: { id: true, version: true } });
  }
  private async snapshot(tx: Prisma.TransactionClient, userId: string) {
    return cartView(await tx.customerCart.findUniqueOrThrow({ where: { userId }, select: cartSelect }));
  }
  async get(context: AuthorizationContext) {
    this.customer(context);
    // Initialization is separate from the read snapshot to avoid concurrent create serialization failures.
    await this.db.customerCart.createMany({ data: [{ userId: context.userId }], skipDuplicates: true });
    return this.db.$transaction((tx) => this.snapshot(tx, context.userId), { isolationLevel: "RepeatableRead" });
  }
  async change(context: AuthorizationContext, version: number, productId?: string, quantity?: number) {
    this.customer(context);
    return this.db.$transaction(async (tx) => {
      const cart = await this.ensure(tx, context.userId);
      if (cart.version !== version) throw new ConflictException("cart-state-changed");
      // Serialize all mutations for this cart, including its line-limit check.
      const locked = await tx.customerCart.updateMany({ where: { id: cart.id, version }, data: { version: { increment: 1 } } });
      if (locked.count !== 1) throw new ConflictException("cart-state-changed");
      let changed = false;
      if (!productId) {
        changed = (await tx.cartItem.deleteMany({ where: { cartId: cart.id } })).count > 0;
      } else if (quantity === undefined) {
        changed = (await tx.cartItem.deleteMany({ where: { cartId: cart.id, productId } })).count > 0;
      } else {
        const product = await tx.artistProduct.findFirst({ where: { id: productId, publicationStatus: "published", archivedAt: null }, select: { stockQuantity: true } });
        if (!product) throw new NotFoundException();
        if (product.stockQuantity < quantity) throw new ConflictException("cart-insufficient-stock");
        const existing = await tx.cartItem.findUnique({ where: { cartId_productId: { cartId: cart.id, productId } } });
        if (!existing && await tx.cartItem.count({ where: { cartId: cart.id } }) >= maxCartLines) throw new ConflictException("cart-line-limit");
        if (existing?.quantity !== quantity) {
          await tx.cartItem.upsert({ where: { cartId_productId: { cartId: cart.id, productId } },
            create: { cartId: cart.id, productId, quantity }, update: { quantity } });
          changed = true;
        }
      }
      // A validated no-op leaves the revision unchanged while preserving the row lock.
      if (!changed) await tx.customerCart.update({ where: { id: cart.id }, data: { version } });
      return this.snapshot(tx, context.userId);
    });
  }
}
