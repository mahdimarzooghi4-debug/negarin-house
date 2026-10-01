import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import type { AuthorizationContext } from "@negarin/authz";
import { PrismaService } from "./prisma.service.js";

export type CorporateBuyingInput = { productId: string; quantity: number; note: string | null };

@Injectable()
export class CorporateBuyingService {
  constructor(private readonly database: PrismaService) {}

  async listRequests(context: AuthorizationContext) {
    const organizationId = this.requireBuyer(context);
    const requests = await this.database.corporatePurchaseRequest.findMany({
      where: { buyerOrganizationId: organizationId }, orderBy: [{ createdAt: "desc" }, { id: "asc" }]
    });
    return requests.map((request) => ({
      id: request.id, productId: request.productId, productTitle: request.productTitleSnapshot,
      unitPriceToman: request.unitPriceTomanSnapshot.toString(), quantity: request.quantity,
      totalToman: (request.unitPriceTomanSnapshot * BigInt(request.quantity)).toString(),
      note: request.note, status: request.status, createdAt: request.createdAt.toISOString()
    }));
  }

  async createRequest(context: AuthorizationContext, input: CorporateBuyingInput) {
    const organizationId = this.requireBuyer(context);
    const product = await this.database.artistProduct.findFirst({
      where: { id: input.productId, publicationStatus: "published", archivedAt: null },
      select: { id: true, title: true, priceToman: true }
    });
    if (!product) throw new NotFoundException();
    if (product.priceToman * BigInt(input.quantity) > 9_223_372_036_854_775_807n) throw new BadRequestException();
    const request = await this.database.corporatePurchaseRequest.create({
      data: {
        buyerOrganizationId: organizationId, requestedByUserId: context.userId,
        productId: product.id, productTitleSnapshot: product.title,
        unitPriceTomanSnapshot: product.priceToman, quantity: input.quantity, note: input.note
      }
    });
    return {
      id: request.id, productId: request.productId, productTitle: request.productTitleSnapshot,
      unitPriceToman: request.unitPriceTomanSnapshot.toString(), quantity: request.quantity,
      totalToman: (request.unitPriceTomanSnapshot * BigInt(request.quantity)).toString(),
      note: request.note, status: request.status, createdAt: request.createdAt.toISOString()
    };
  }

  async listOrders(context: AuthorizationContext) {
    const organizationId = this.requireBuyer(context);
    const orders = await this.database.corporateOrder.findMany({
      where: { buyerOrganizationId: organizationId }, orderBy: [{ createdAt: "desc" }, { id: "asc" }]
    });
    return orders.map((order) => this.orderView(order));
  }

  async createOrder(context: AuthorizationContext, input: CorporateBuyingInput) {
    const organizationId = this.requireBuyer(context);
    const result = await this.database.$transaction(async (transaction) => {
      const product = await transaction.artistProduct.findFirst({
        where: { id: input.productId, publicationStatus: "published", archivedAt: null },
        select: { id: true, title: true, priceToman: true, availableQuantity: true }
      });
      if (!product) throw new NotFoundException();
      if (product.availableQuantity < input.quantity) throw new ConflictException("insufficient-stock");
      const reserved = await transaction.artistProduct.updateMany({
        where: {
          id: product.id, publicationStatus: "published", archivedAt: null,
          availableQuantity: { gte: input.quantity }
        },
        data: { availableQuantity: { decrement: input.quantity } }
      });
      if (reserved.count !== 1) throw new ConflictException("insufficient-stock");
      const totalToman = product.priceToman * BigInt(input.quantity);
      if (totalToman > 9_223_372_036_854_775_807n) throw new BadRequestException();
      const order = await transaction.corporateOrder.create({
        data: {
          buyerOrganizationId: organizationId, createdByUserId: context.userId,
          productId: product.id, productTitleSnapshot: product.title,
          unitPriceTomanSnapshot: product.priceToman, quantity: input.quantity,
          totalToman, status: "awaiting_payment"
        }
      });
      return order;
    });
    return this.orderView(result);
  }

  async cancelOrder(context: AuthorizationContext, orderId: string) {
    const organizationId = this.requireBuyer(context);
    const result = await this.database.$transaction(async (transaction) => {
      const order = await transaction.corporateOrder.findFirst({
        where: { id: orderId, buyerOrganizationId: organizationId, status: "awaiting_payment" }
      });
      if (!order) throw new NotFoundException();
      const cancelled = await transaction.corporateOrder.updateMany({
        where: { id: order.id, buyerOrganizationId: organizationId, status: "awaiting_payment" },
        data: { status: "cancelled" }
      });
      if (cancelled.count !== 1) throw new ConflictException("order-state-changed");
      await transaction.artistProduct.update({
        where: { id: order.productId }, data: { availableQuantity: { increment: order.quantity } }
      });
      return { ...order, status: "cancelled", updatedAt: new Date() };
    });
    return this.orderView(result);
  }

  private requireBuyer(context: AuthorizationContext): string {
    if (context.activeRole !== "corporate-buyer" || !context.organizationId) throw new ForbiddenException();
    return context.organizationId;
  }

  private orderView(order: {
    id: string; productId: string; productTitleSnapshot: string; unitPriceTomanSnapshot: bigint;
    quantity: number; totalToman: bigint; status: string; createdAt: Date;
  }) {
    return {
      id: order.id, productId: order.productId, productTitle: order.productTitleSnapshot,
      unitPriceToman: order.unitPriceTomanSnapshot.toString(), quantity: order.quantity,
      totalToman: order.totalToman.toString(), status: order.status, createdAt: order.createdAt.toISOString()
    };
  }
}

export function parseCorporateBuyingInput(body: unknown): CorporateBuyingInput {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const value = body as Record<string, unknown>;
  if (Object.keys(value).some((key) => !["productId", "quantity", "note"].includes(key))) throw new BadRequestException();
  if (typeof value.productId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value.productId)) {
    throw new BadRequestException();
  }
  if (!Number.isSafeInteger(value.quantity) || (value.quantity as number) < 1 || (value.quantity as number) > 1_000_000) {
    throw new BadRequestException();
  }
  if (value.note !== undefined && value.note !== null && (typeof value.note !== "string" || value.note.length > 5000)) {
    throw new BadRequestException();
  }
  return { productId: value.productId, quantity: value.quantity as number, note: typeof value.note === "string" && value.note.trim() ? value.note.trim() : null };
}
