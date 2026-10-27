import { createHash, randomUUID } from "node:crypto";
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import type { AuthorizationContext } from "@negarin/authz";
import type { Prisma } from "./generated/prisma/client.js";
import { parseArtistProductId } from "./artist-products.js";
import { PrismaService } from "./prisma.service.js";

export const reservationMilliseconds = 30 * 60 * 1000;
export type CheckoutCommand = { cartVersion: number; addressBookVersion: number; addressId: string; idempotencyKey: string; expectedSubtotalToman: string };
export function parseCheckout(body: unknown): CheckoutCommand {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const v = body as Record<string, unknown>;
  if (Object.keys(v).some((k) => !["cartVersion", "addressBookVersion", "addressId", "idempotencyKey", "expectedSubtotalToman"].includes(k))) throw new BadRequestException();
  for (const key of ["cartVersion", "addressBookVersion"]) if (!Number.isInteger(v[key]) || (v[key] as number) < 0 || (v[key] as number) >= 2147483647) throw new BadRequestException();
  if (typeof v.addressId !== "string" || typeof v.idempotencyKey !== "string" || typeof v.expectedSubtotalToman !== "string" || !/^[1-9][0-9]{0,22}$/.test(v.expectedSubtotalToman)) throw new BadRequestException();
  return { cartVersion: v.cartVersion as number, addressBookVersion: v.addressBookVersion as number,
    addressId: parseArtistProductId(v.addressId).toLowerCase(), idempotencyKey: parseArtistProductId(v.idempotencyKey).toLowerCase(), expectedSubtotalToman: v.expectedSubtotalToman };
}
export function parseOrderPage(query: Record<string, unknown>) {
  if (Object.keys(query).some(k => !["page", "pageSize"].includes(k))) throw new BadRequestException();
  const number = (v: unknown, fallback: number, max: number) => {
    if (v === undefined) return fallback;
    if (typeof v !== "string" || !/^[1-9][0-9]{0,3}$/.test(v) || Number(v) > max) throw new BadRequestException();
    return Number(v);
  };
  return { page: number(query.page, 1, 1000), pageSize: number(query.pageSize, 20, 50) };
}
const orderInclude = { preparations: { orderBy: { artistUserId: "asc" } }, items: { orderBy: { productId: "asc" } } } satisfies Prisma.CustomerOrderInclude;
type Order = Prisma.CustomerOrderGetPayload<{ include: typeof orderInclude }>;
export function orderView(order: Order) {
  return { id: order.id, version: order.version, status: order.status, paymentStatus: order.paymentStatus, paidAt: order.paidAt?.toISOString() ?? null, shippingAddress: order.shippingAddress,
    subtotalToman: order.subtotalToman, reservedUntil: order.reservedUntil.toISOString(), releasedAt: order.releasedAt?.toISOString() ?? null,
    createdAt: order.createdAt.toISOString(), preparation: order.status === "placed" ? order.preparations.map(p => ({ items: order.items.filter(i => i.artistUserId === p.artistUserId).map(i => i.productId), status: p.status, version: p.version })) : [], items: order.items.map(i => ({ productId: i.productId, title: i.title,
      quantity: i.quantity, unitPriceToman: i.unitPriceToman.toString(), lineSubtotalToman: (i.unitPriceToman * BigInt(i.quantity)).toString(), imageIds: i.imageIds })) };
}

@Injectable()
export class CustomerOrdersService {
  constructor(private readonly db: PrismaService) {}
  private customer(context: AuthorizationContext) {
    if (context.activeRole !== "customer") throw new ForbiddenException();
  }
  async checkout(context: AuthorizationContext, command: CheckoutCommand, requestId: string) {
    this.customer(context);
    const hash = createHash("sha256").update(JSON.stringify(command)).digest("hex");
    const result = await this.db.$transaction(async tx => {
      // A stable account cart lock makes same-key retries observe the committed order before revision validation.
      await tx.$queryRaw`SELECT "id" FROM "customer_carts" WHERE "userId" = ${context.userId}::uuid FOR UPDATE`;
      const replay = await tx.customerOrder.findUnique({ where: { userId_idempotencyKey: { userId: context.userId, idempotencyKey: command.idempotencyKey } }, include: orderInclude });
      if (replay) {
        if (replay.requestHash !== hash) throw new ConflictException("checkout-key-reused");
        return orderView(replay);
      }
      const cart = await tx.customerCart.findUnique({ where: { userId: context.userId }, include: { items: { orderBy: { productId: "asc" } } } });
      if (!cart || !cart.items.length) throw new ConflictException("checkout-empty-cart");
      if (cart.version !== command.cartVersion) throw new ConflictException("cart-state-changed");
      if (cart.items.length > 50) throw new ConflictException("cart-line-limit");
      const book = await tx.customerAddressBook.updateMany({ where: { userId: context.userId, version: command.addressBookVersion }, data: { version: { increment: 0 } } });
      if (book.count !== 1) throw new ConflictException("address-book-state-changed");
      const address = await tx.customerAddress.findFirst({ where: { id: command.addressId, book: { userId: context.userId } } });
      if (!address) throw new NotFoundException();
      // Every checkout/release locks products in UUID order to avoid cross-cart lock cycles.
      const products = [];
      let subtotal = 0n;
      for (const item of cart.items) {
        await tx.$queryRaw`SELECT "id" FROM "artist_products" WHERE "id" = ${item.productId}::uuid FOR UPDATE`;
        const product = await tx.artistProduct.findUniqueOrThrow({ where: { id: item.productId } });
        if (product.archivedAt || product.publicationStatus !== "published") throw new ConflictException("checkout-product-unavailable");
        if (product.stockQuantity < item.quantity) throw new ConflictException("checkout-insufficient-stock");
        if (product.inventoryVersion === 2147483647) throw new ConflictException("inventory-version-exhausted");
        subtotal += product.priceToman * BigInt(item.quantity);
        products.push({ product, quantity: item.quantity });
      }
      if (subtotal.toString() !== command.expectedSubtotalToman) throw new ConflictException("checkout-price-changed");
      const id = randomUUID();
      const shippingAddress = { recipientName: address.recipientName, recipientPhone: address.recipientPhone,
        province: address.province, city: address.city, postalCode: address.postalCode, fullAddress: address.fullAddress };
      await tx.customerOrder.create({ data: { id, userId: context.userId, idempotencyKey: command.idempotencyKey, requestHash: hash,
        shippingAddress, subtotalToman: subtotal.toString(), reservedUntil: new Date(Date.now() + reservationMilliseconds),
        preparations: { create: [...new Set(products.map(({ product }) => product.artistUserId))].map(artistUserId => ({ artistUserId })) },
        items: { create: products.map(({ product: p, quantity }) => ({ artistUserId: p.artistUserId, productId: p.id, title: p.title, unitPriceToman: p.priceToman, quantity, imageIds: p.imageIds })) } } });
      for (const { product: p, quantity } of products) {
        await tx.artistProduct.update({ where: { id: p.id }, data: { stockQuantity: { decrement: quantity }, inventoryVersion: { increment: 1 } } });
        await tx.productInventoryEvent.create({ data: { productId: p.id, orderId: id, actorUserId: context.userId,
          previousQuantity: p.stockQuantity, stockQuantity: p.stockQuantity - quantity, inventoryVersion: p.inventoryVersion + 1, reason: "order-reserved", requestId } });
      }
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      await tx.customerCart.update({ where: { id: cart.id }, data: { version: { increment: 1 } } });
      return orderView(await tx.customerOrder.findUniqueOrThrow({ where: { id }, include: orderInclude }));
    }, { timeout: 15000 });
    return this.get(context, result.id);
  }
  private async release(id: string, userId: string | undefined, version: number | undefined, requestId: string, now: Date, automatic = false) {
    return this.db.$transaction(async tx => {
      const rows = userId
        ? await tx.$queryRaw<Array<{ id: string }>>`SELECT "id" FROM "customer_orders" WHERE "id" = ${id}::uuid AND "userId" = ${userId}::uuid FOR UPDATE`
        : await tx.$queryRaw<Array<{ id: string }>>`SELECT "id" FROM "customer_orders" WHERE "id" = ${id}::uuid FOR UPDATE`;
      if (!rows.length) { if (automatic) return null; throw new NotFoundException(); }
      const order = await tx.customerOrder.findUniqueOrThrow({ where: { id }, include: orderInclude });
      if (order.status === "placed") {
        if (!automatic) throw new ConflictException("paid-order-requires-refund-workflow");
        return null;
      }
      if (order.status !== "reserved") return orderView(order);
      const expired = order.reservedUntil <= now;
      if (automatic && !expired) return null;
      if (!expired && version !== order.version) throw new ConflictException("order-state-changed");
      for (const item of order.items) {
        await tx.$queryRaw`SELECT "id" FROM "artist_products" WHERE "id" = ${item.productId}::uuid FOR UPDATE`;
        const p = await tx.artistProduct.findUniqueOrThrow({ where: { id: item.productId } });
        if (p.inventoryVersion === 2147483647 || p.stockQuantity > 2147483647 - item.quantity) throw new ConflictException("inventory-capacity-exhausted");
        await tx.artistProduct.update({ where: { id: p.id }, data: { stockQuantity: { increment: item.quantity }, inventoryVersion: { increment: 1 } } });
        await tx.productInventoryEvent.create({ data: { productId: p.id, orderId: id, actorUserId: expired ? null : userId,
          previousQuantity: p.stockQuantity, stockQuantity: p.stockQuantity + item.quantity, inventoryVersion: p.inventoryVersion + 1,
          reason: expired ? "order-expired" : "order-cancelled", requestId } });
      }
      return orderView(await tx.customerOrder.update({ where: { id }, data: { status: expired ? "expired" : "cancelled", version: { increment: 1 }, releasedAt: now }, include: orderInclude }));
    }, { timeout: 15000 });
  }
  async cancel(context: AuthorizationContext, id: string, version: number, requestId: string) {
    this.customer(context);
    return this.release(id, context.userId, version, requestId, new Date());
  }
  async get(context: AuthorizationContext, id: string) {
    this.customer(context);
    // Opportunistic expiry uses server time and an explicitly system-attributed audit event.
    await this.release(id, context.userId, undefined, "order-read-expiry", new Date(), true);
    const order = await this.db.customerOrder.findFirst({ where: { id, userId: context.userId }, include: orderInclude });
    if (!order) throw new NotFoundException();
    return orderView(order);
  }
  async list(context: AuthorizationContext, page: number, pageSize: number) {
    this.customer(context);
    const orders = await this.db.customerOrder.findMany({ where: { userId: context.userId }, orderBy: [{ createdAt: "desc" }, { id: "asc" }], skip: (page - 1) * pageSize, take: pageSize + 1, select: { id: true } });
    const items = [];
    for (const order of orders.slice(0, pageSize)) items.push(await this.get(context, order.id));
    return { page, pageSize, hasMore: orders.length > pageSize, items };
  }
  // Internal worker entry point only; no public expiry endpoint or client-supplied clock.
  async expirePending(limit = 100, now = new Date()) {
    if (!Number.isInteger(limit) || limit < 1 || limit > 100 || !Number.isFinite(now.getTime())) throw new BadRequestException();
    const orders = await this.db.customerOrder.findMany({ where: { status: "reserved", reservedUntil: { lte: now } }, orderBy: [{ reservedUntil: "asc" }, { id: "asc" }], take: limit, select: { id: true } });
    let failed = 0;
    for (const order of orders) {
      try { await this.release(order.id, undefined, undefined, "order-worker-expiry", now, true); }
      catch { failed++; } // One problematic reservation must not block the rest of the batch.
    }
    return { scanned: orders.length, failed };
  }
}
