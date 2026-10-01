import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import type { AuthorizationContext } from "@negarin/authz";
import { PrismaService } from "./prisma.service.js";

export type CorporateBuyingInput = { productId: string; quantity: number; note: string | null };
export type CorporateProposalInput = { unitPriceToman: bigint; note: string | null };

const maxPostgresBigInt = 9_223_372_036_854_775_807n;

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
      proposedUnitPriceToman: request.proposedUnitPriceToman?.toString() ?? null,
      proposalTotalToman: request.proposedUnitPriceToman === null ? null : (request.proposedUnitPriceToman * BigInt(request.quantity)).toString(),
      proposalNote: request.proposalNote, proposedAt: request.proposedAt?.toISOString() ?? null,
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
    if (product.priceToman * BigInt(input.quantity) > maxPostgresBigInt) throw new BadRequestException();
    const request = await this.database.corporatePurchaseRequest.create({
      data: {
        buyerOrganizationId: organizationId, requestedByUserId: context.userId,
        productId: product.id, productTitleSnapshot: product.title,
        unitPriceTomanSnapshot: product.priceToman, quantity: input.quantity, note: input.note,
        events: { create: { actorUserId: context.userId, status: "submitted" } }
      }
    });
    return {
      id: request.id, productId: request.productId, productTitle: request.productTitleSnapshot,
      unitPriceToman: request.unitPriceTomanSnapshot.toString(), quantity: request.quantity,
      proposedUnitPriceToman: request.proposedUnitPriceToman?.toString() ?? null,
      proposalTotalToman: request.proposedUnitPriceToman === null ? null : (request.proposedUnitPriceToman * BigInt(request.quantity)).toString(),
      proposalNote: request.proposalNote, proposedAt: request.proposedAt?.toISOString() ?? null,
      totalToman: (request.unitPriceTomanSnapshot * BigInt(request.quantity)).toString(),
      note: request.note, status: request.status, createdAt: request.createdAt.toISOString()
    };
  }

  async listArtistRequests(context: AuthorizationContext) {
    this.requireArtist(context);
    const requests = await this.database.corporatePurchaseRequest.findMany({
      where: { product: { artistUserId: context.userId } },
      include: { buyerOrganization: { select: { displayName: true } }, events: { orderBy: { createdAt: "asc" } } },
      orderBy: [{ createdAt: "desc" }, { id: "asc" }]
    });
    return requests.map((request) => ({
      id: request.id, productId: request.productId, productTitle: request.productTitleSnapshot,
      buyerOrganizationName: request.buyerOrganization.displayName ?? "خریدار سازمانی",
      unitPriceToman: request.unitPriceTomanSnapshot.toString(), quantity: request.quantity,
      proposedUnitPriceToman: request.proposedUnitPriceToman?.toString() ?? null,
      proposalTotalToman: request.proposedUnitPriceToman === null ? null : (request.proposedUnitPriceToman * BigInt(request.quantity)).toString(),
      proposalNote: request.proposalNote, proposedAt: request.proposedAt?.toISOString() ?? null,
      totalToman: (request.unitPriceTomanSnapshot * BigInt(request.quantity)).toString(),
      note: request.note, status: request.status, createdAt: request.createdAt.toISOString(),
      history: request.events.map((event) => ({
        status: event.status, createdAt: event.createdAt.toISOString(),
        proposedUnitPriceToman: event.proposalUnitPriceToman?.toString() ?? null,
        proposalNote: event.proposalNote
      }))
    }));
  }

  async reviewArtistRequest(context: AuthorizationContext, requestId: string, status: "in_review" | "declined") {
    this.requireArtist(context);
    return this.database.$transaction(async (transaction) => {
      const request = await transaction.corporatePurchaseRequest.findFirst({
        where: { id: requestId, product: { artistUserId: context.userId } },
        select: { id: true, status: true }
      });
      if (!request) throw new NotFoundException();
      const allowed = status === "in_review" ? ["submitted"] : ["submitted", "in_review"];
      if (!allowed.includes(request.status)) {
        if (request.status === status) return { id: request.id, status: request.status };
        throw new ConflictException("purchase-request-state-changed");
      }
      const updated = await transaction.corporatePurchaseRequest.updateMany({
        where: { id: request.id, status: request.status, product: { artistUserId: context.userId } },
        data: { status }
      });
      if (updated.count !== 1) throw new ConflictException("purchase-request-state-changed");
      await transaction.corporatePurchaseRequestEvent.create({
        data: { requestId: request.id, actorUserId: context.userId, status }
      });
      return { id: request.id, status };
    });
  }

  async proposeArtistRequest(context: AuthorizationContext, requestId: string, input: CorporateProposalInput) {
    this.requireArtist(context);
    return this.database.$transaction(async (transaction) => {
      const request = await transaction.corporatePurchaseRequest.findFirst({
        where: { id: requestId, product: { artistUserId: context.userId } },
        select: { id: true, status: true, productId: true, quantity: true }
      });
      if (!request) throw new NotFoundException();
      if (request.status !== "submitted" && request.status !== "in_review") {
        throw new ConflictException("purchase-request-state-changed");
      }
      if (input.unitPriceToman * BigInt(request.quantity) > maxPostgresBigInt) {
        throw new BadRequestException();
      }
      const product = await transaction.artistProduct.findFirst({
        where: { id: request.productId, artistUserId: context.userId, publicationStatus: "published", archivedAt: null },
        select: { id: true }
      });
      if (!product) throw new ConflictException("product-not-purchasable");
      const quoted = await transaction.corporatePurchaseRequest.updateMany({
        where: { id: request.id, status: request.status, product: { artistUserId: context.userId } },
        data: {
          status: "quoted", proposedUnitPriceToman: input.unitPriceToman,
          proposalNote: input.note, proposedAt: new Date()
        }
      });
      if (quoted.count !== 1) throw new ConflictException("purchase-request-state-changed");
      await transaction.corporatePurchaseRequestEvent.create({
        data: {
          requestId: request.id, actorUserId: context.userId, status: "quoted",
          proposalUnitPriceToman: input.unitPriceToman, proposalNote: input.note
        }
      });
      return { id: request.id, status: "quoted" as const };
    });
  }

  async answerArtistProposal(context: AuthorizationContext, requestId: string, accepted: boolean) {
    const organizationId = this.requireBuyer(context);
    return this.database.$transaction(async (transaction) => {
      const request = await transaction.corporatePurchaseRequest.findFirst({
        where: { id: requestId, buyerOrganizationId: organizationId, status: "quoted" }
      });
      if (!request || request.proposedUnitPriceToman === null) throw new NotFoundException();
      if (!accepted) {
        const declined = await transaction.corporatePurchaseRequest.updateMany({
          where: { id: request.id, buyerOrganizationId: organizationId, status: "quoted" },
          data: { status: "declined" }
        });
        if (declined.count !== 1) throw new ConflictException("purchase-request-state-changed");
        await transaction.corporatePurchaseRequestEvent.create({
          data: { requestId: request.id, actorUserId: context.userId, status: "declined" }
        });
        return { id: request.id, status: "declined" as const, order: null };
      }
      const totalToman = request.proposedUnitPriceToman * BigInt(request.quantity);
      if (totalToman > maxPostgresBigInt) throw new BadRequestException();
      const reserved = await transaction.artistProduct.updateMany({
        where: {
          id: request.productId, publicationStatus: "published", archivedAt: null,
          availableQuantity: { gte: request.quantity }
        },
        data: { availableQuantity: { decrement: request.quantity } }
      });
      if (reserved.count !== 1) throw new ConflictException("insufficient-stock");
      const order = await transaction.corporateOrder.create({
        data: {
          buyerOrganizationId: organizationId, createdByUserId: context.userId,
          productId: request.productId, purchaseRequestId: request.id,
          productTitleSnapshot: request.productTitleSnapshot,
          unitPriceTomanSnapshot: request.proposedUnitPriceToman,
          quantity: request.quantity, totalToman, status: "awaiting_payment"
        }
      });
      const converted = await transaction.corporatePurchaseRequest.updateMany({
        where: { id: request.id, buyerOrganizationId: organizationId, status: "quoted" },
        data: { status: "converted" }
      });
      if (converted.count !== 1) throw new ConflictException("purchase-request-state-changed");
      await transaction.corporatePurchaseRequestEvent.create({
        data: { requestId: request.id, actorUserId: context.userId, status: "converted" }
      });
      return { id: request.id, status: "converted" as const, order: this.orderView(order) };
    });
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
      if (totalToman > maxPostgresBigInt) throw new BadRequestException();
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
      if (order.purchaseRequestId) {
        const request = await transaction.corporatePurchaseRequest.findFirst({
          where: { id: order.purchaseRequestId, status: "converted" }
        });
        if (request) {
          await transaction.corporatePurchaseRequest.update({ where: { id: request.id }, data: { status: "quoted" } });
          await transaction.corporatePurchaseRequestEvent.create({
            data: {
              requestId: request.id, actorUserId: context.userId, status: "quoted",
              proposalUnitPriceToman: request.proposedUnitPriceToman, proposalNote: request.proposalNote
            }
          });
        }
      }
      return { ...order, status: "cancelled", updatedAt: new Date() };
    });
    return this.orderView(result);
  }

  private requireBuyer(context: AuthorizationContext): string {
    if (context.activeRole !== "corporate-buyer" || !context.organizationId) throw new ForbiddenException();
    return context.organizationId;
  }

  private requireArtist(context: AuthorizationContext): void {
    if (context.activeRole !== "artist") throw new ForbiddenException();
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

export function parseCorporateProposalInput(body: unknown): CorporateProposalInput {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const value = body as Record<string, unknown>;
  if (Object.keys(value).some((key) => !["unitPriceToman", "note"].includes(key))) throw new BadRequestException();
  if (typeof value.unitPriceToman !== "string" || value.unitPriceToman.length > 19 || !/^[1-9]\d*$/.test(value.unitPriceToman)) {
    throw new BadRequestException();
  }
  const unitPriceToman = BigInt(value.unitPriceToman);
  if (unitPriceToman > maxPostgresBigInt) throw new BadRequestException();
  if (value.note !== undefined && value.note !== null && (typeof value.note !== "string" || value.note.length > 2000)) {
    throw new BadRequestException();
  }
  return { unitPriceToman, note: typeof value.note === "string" && value.note.trim() ? value.note.trim() : null };
}
