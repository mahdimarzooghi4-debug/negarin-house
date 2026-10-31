import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import type { AuthorizationContext } from "@negarin/authz";
import type { Prisma } from "./generated/prisma/client.js";
import { parseShipment, shipmentView, type ShipmentCommand } from "./artist-shipment.js";
import { PrismaService } from "./prisma.service.js";

export const preparationSteps = ["awaiting_acceptance", "accepted", "preparing", "packaging", "ready_for_dispatch"] as const;
export type PreparationCommand = { version: number; status: typeof preparationSteps[number] };
export function parsePreparation(body: unknown): PreparationCommand {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const v = body as Record<string, unknown>;
  if (Object.keys(v).some(k => !["version", "status"].includes(k)) ||
    !Number.isInteger(v.version) || (v.version as number) < 0 || (v.version as number) >= 2147483647 ||
    !preparationSteps.slice(1).includes(v.status as typeof preparationSteps[number])) throw new BadRequestException();
  return v as PreparationCommand;
}
export function nextPreparation(current: PreparationCommand["status"], target: PreparationCommand["status"]) {
  if (preparationSteps.indexOf(target) !== preparationSteps.indexOf(current) + 1) throw new ConflictException("preparation-transition-invalid");
}
const include = { shipment: { include: { receipt: true, issue: { include: { refundReviews: true } } } }, order: true, items: { orderBy: { productId: "asc" } }, events: { orderBy: { version: "asc" } } } satisfies Prisma.ArtistOrderPreparationInclude;
type Preparation = Prisma.ArtistOrderPreparationGetPayload<{ include: typeof include }>;
const corporateInclude = { corporateOrder: { include: { proposal: { select: { summary: true, estimatedDeliveryAt: true } }, items: { orderBy: { productId: "asc" } } } }, shipment: true, events: { orderBy: { version: "asc" } } } satisfies Prisma.CorporateOrderPreparationInclude;
type CorporatePreparation = Prisma.CorporateOrderPreparationGetPayload<{ include: typeof corporateInclude }>;
function view(p: Preparation, detail = false) {
  return { orderId: p.orderId, status: p.status, version: p.version, createdAt: p.order.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(), shipment: shipmentView(p.shipment), merchandiseSubtotalToman: p.items.reduce((s, i) => s + i.unitPriceToman * BigInt(i.quantity), 0n).toString(),
    items: p.items.map(i => ({ productId: i.productId, title: i.title, quantity: i.quantity, unitPriceToman: i.unitPriceToman.toString(), imageIds: i.imageIds })),
    ...(detail ? { shippingAddress: p.order.shippingAddress, history: p.events.map(e => ({ version: e.version, fromStatus: e.fromStatus, toStatus: e.toStatus, createdAt: e.createdAt.toISOString() })) } : {}) };
}
function corporateView(p: CorporatePreparation, detail = false) {
  const items = p.corporateOrder.items.filter(item => item.artistUserId === p.artistUserId);
  return { orderId: p.corporateOrderId, source: "corporate", status: p.status, version: p.version, createdAt: p.corporateOrder.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(), proposalSummary: p.corporateOrder.proposal.summary, estimatedDeliveryAt: p.corporateOrder.proposal.estimatedDeliveryAt.toISOString(),
    merchandiseSubtotalToman: items.reduce((sum, item) => sum + item.unitPriceToman * BigInt(item.quantity), 0n).toString(),
    items: items.map(item => ({ productId: item.productId, title: item.title, quantity: item.quantity, unitPriceToman: item.unitPriceToman.toString(), imageIds: [] as string[] })),
    shipment: p.shipment ? { status: "reported_dispatched", source: "artist_report", carrierVerified: false, carrierName: p.shipment.carrierName, trackingCode: p.shipment.trackingCode, reportedAt: p.shipment.reportedAt.toISOString() } : null,
    ...(detail ? { shippingAddress: p.corporateOrder.shippingAddress, history: p.events.map(event => ({ version: event.version, action: event.action, status: event.status, createdAt: event.createdAt.toISOString() })) } : {}) };
}
@Injectable()
export class ArtistOrdersService {
  constructor(private readonly db: PrismaService) {}
  private artist(context: AuthorizationContext) { if (context.activeRole !== "artist") throw new ForbiddenException(); }
  async list(context: AuthorizationContext, page: number, pageSize: number) {
    this.artist(context);
    const rows = await this.db.artistOrderPreparation.findMany({ where: { artistUserId: context.userId, order: { status: "placed", paymentStatus: "paid" } },
      include, orderBy: [{ order: { createdAt: "desc" } }, { orderId: "asc" }], skip: (page - 1) * pageSize, take: pageSize + 1 });
    return { page, pageSize, hasMore: rows.length > pageSize, items: rows.slice(0, pageSize).map(p => view(p)) };
  }
  async get(context: AuthorizationContext, orderId: string) {
    this.artist(context);
    const p = await this.db.artistOrderPreparation.findFirst({ where: { orderId, artistUserId: context.userId, order: { status: "placed", paymentStatus: "paid" } }, include });
    if (!p) throw new NotFoundException();
    return view(p, true);
  }
  async dispatch(context: AuthorizationContext, orderId: string, command: ShipmentCommand, requestId: string) {
    this.artist(context);
    // Also validate service entry points: no caller can supply timestamps or verification flags.
    const input = parseShipment(command);
    return this.db.$transaction(async tx => {
      const rows = await tx.$queryRaw<Array<{ id: string }>>`SELECT o."id" FROM "customer_orders" o JOIN "artist_order_preparations" p ON p."orderId" = o."id" WHERE o."id" = ${orderId}::uuid AND p."artistUserId" = ${context.userId}::uuid FOR UPDATE OF o`;
      if (!rows.length) throw new NotFoundException();
      const where = { orderId_artistUserId: { orderId, artistUserId: context.userId } };
      const p = await tx.artistOrderPreparation.findUniqueOrThrow({ where, include });
      if (p.order.status !== "placed" || p.order.paymentStatus !== "paid") throw new NotFoundException();
      if (p.shipment) {
        if (p.shipment.preparationVersion === input.version + 1 && p.shipment.carrierName === input.carrierName && p.shipment.trackingCode === input.trackingCode) return view(p, true);
        throw new ConflictException("shipment-already-reported");
      }
      if (p.version !== input.version) throw new ConflictException("preparation-state-changed");
      if (p.status !== "ready_for_dispatch") throw new ConflictException("order-not-ready-for-dispatch");
      if (p.version === 2147483647) throw new ConflictException("preparation-version-exhausted");
      await tx.artistOrderPreparation.update({ where, data: { version: { increment: 1 } } });
      // Report is the immutable audit record; failure rolls back the revision in the same transaction.
      await tx.artistShipmentReport.create({ data: { orderId, artistUserId: context.userId, preparationVersion: p.version + 1,
        carrierName: input.carrierName, trackingCode: input.trackingCode, reportedByUserId: context.userId, requestId } });
      return view(await tx.artistOrderPreparation.findUniqueOrThrow({ where, include }), true);
    });
  }
  async advance(context: AuthorizationContext, orderId: string, command: PreparationCommand, requestId: string) {
    this.artist(context);
    return this.db.$transaction(async tx => {
      // Same order lock as payment/cancellation; unpaid reservations never enter fulfillment.
      const rows = await tx.$queryRaw<Array<{ id: string }>>`SELECT o."id" FROM "customer_orders" o JOIN "artist_order_preparations" p ON p."orderId" = o."id" WHERE o."id" = ${orderId}::uuid AND p."artistUserId" = ${context.userId}::uuid FOR UPDATE OF o`;
      if (!rows.length) throw new NotFoundException();
      const where = { orderId_artistUserId: { orderId, artistUserId: context.userId } };
      const p = await tx.artistOrderPreparation.findUniqueOrThrow({ where, include });
      if (p.order.status !== "placed" || p.order.paymentStatus !== "paid") throw new NotFoundException();
      // Only the immediately previous command is recoverable; older revisions remain conflicts.
      if (p.status === command.status && p.version === command.version + 1) return view(p, true);
      if (p.version !== command.version) throw new ConflictException("preparation-state-changed");
      nextPreparation(p.status, command.status);
      if (p.version === 2147483647) throw new ConflictException("preparation-version-exhausted");
      await tx.artistOrderPreparation.update({ where, data: { status: command.status, version: { increment: 1 } } });
      await tx.orderPreparationEvent.create({ data: { orderId, artistUserId: context.userId, actorUserId: context.userId, version: p.version + 1,
        fromStatus: p.status, toStatus: command.status, requestId } });
      return view(await tx.artistOrderPreparation.findUniqueOrThrow({ where, include }), true);
    });
  }

  async corporateList(context: AuthorizationContext, page: number, pageSize: number) {
    this.artist(context);
    const rows = await this.db.corporateOrderPreparation.findMany({ where: { artistUserId: context.userId, corporateOrder: { status: { in: ["paid", "fulfilling"] } } }, include: corporateInclude,
      orderBy: [{ corporateOrder: { createdAt: "desc" } }, { corporateOrderId: "asc" }], skip: (page - 1) * pageSize, take: pageSize + 1 });
    return { page, pageSize, hasMore: rows.length > pageSize, items: rows.slice(0, pageSize).map(row => corporateView(row)) };
  }

  async corporateGet(context: AuthorizationContext, orderId: string) {
    this.artist(context);
    const row = await this.db.corporateOrderPreparation.findFirst({ where: { corporateOrderId: orderId, artistUserId: context.userId, corporateOrder: { status: { in: ["paid", "fulfilling"] } } }, include: corporateInclude });
    if (!row) throw new NotFoundException();
    return corporateView(row, true);
  }

  async advanceCorporate(context: AuthorizationContext, orderId: string, command: PreparationCommand, requestId: string) {
    this.artist(context);
    return this.db.$transaction(async tx => {
      const rows = await tx.$queryRaw<Array<{ id: string }>>`SELECT o."id" FROM "corporate_orders" o JOIN "corporate_order_preparations" p ON p."corporateOrderId" = o."id" WHERE o."id" = ${orderId}::uuid AND p."artistUserId" = ${context.userId}::uuid FOR UPDATE OF o`;
      if (!rows.length) throw new NotFoundException();
      const key = { corporateOrderId_artistUserId: { corporateOrderId: orderId, artistUserId: context.userId } };
      const p = await tx.corporateOrderPreparation.findUniqueOrThrow({ where: key, include: corporateInclude });
      if (!["paid", "fulfilling"].includes(p.corporateOrder.status)) throw new NotFoundException();
      if (p.status === command.status && p.version === command.version + 1) return corporateView(p, true);
      if (p.version !== command.version) throw new ConflictException("preparation-state-changed");
      nextPreparation(p.status as typeof preparationSteps[number], command.status);
      if (p.version === 2_147_483_647) throw new ConflictException("preparation-version-exhausted");
      const updated = await tx.corporateOrderPreparation.update({ where: key, data: { status: command.status, version: { increment: 1 } } });
      await tx.corporateOrderPreparationEvent.create({ data: { corporateOrderId: orderId, artistUserId: context.userId, version: updated.version, action: "status_changed", status: command.status, actorUserId: context.userId, requestTraceId: requestId } });
      if (p.status === "awaiting_acceptance" && command.status === "accepted" && p.corporateOrder.status === "paid") {
        const changed = await tx.corporateOrder.updateMany({ where: { id: orderId, status: "paid", version: { lt: 2_147_483_647 } }, data: { status: "fulfilling", version: { increment: 1 } } });
        if (changed.count !== 1) throw new ConflictException("corporate-order-state-changed");
        const nextVersion = p.corporateOrder.version + 1;
        await tx.corporateOrderEvent.create({ data: { orderId, version: nextVersion, action: "fulfillment_started", actorUserId: context.userId, command: { artistUserId: context.userId }, requestTraceId: requestId } });
      }
      return corporateView(await tx.corporateOrderPreparation.findUniqueOrThrow({ where: key, include: corporateInclude }), true);
    });
  }

  async dispatchCorporate(context: AuthorizationContext, orderId: string, command: ShipmentCommand, requestId: string) {
    this.artist(context);
    const input = parseShipment(command);
    return this.db.$transaction(async tx => {
      const rows = await tx.$queryRaw<Array<{ id: string }>>`SELECT o."id" FROM "corporate_orders" o JOIN "corporate_order_preparations" p ON p."corporateOrderId" = o."id" WHERE o."id" = ${orderId}::uuid AND p."artistUserId" = ${context.userId}::uuid FOR UPDATE OF o`;
      if (!rows.length) throw new NotFoundException();
      const key = { corporateOrderId_artistUserId: { corporateOrderId: orderId, artistUserId: context.userId } };
      const p = await tx.corporateOrderPreparation.findUniqueOrThrow({ where: key, include: corporateInclude });
      if (!["paid", "fulfilling"].includes(p.corporateOrder.status)) throw new NotFoundException();
      if (p.shipment) {
        if (p.shipment.preparationVersion === input.version + 1 && p.shipment.carrierName === input.carrierName && p.shipment.trackingCode === input.trackingCode) return corporateView(p, true);
        throw new ConflictException("shipment-already-reported");
      }
      if (p.version !== input.version) throw new ConflictException("preparation-state-changed");
      if (p.status !== "ready_for_dispatch") throw new ConflictException("order-not-ready-for-dispatch");
      if (p.version === 2_147_483_647) throw new ConflictException("preparation-version-exhausted");
      const updated = await tx.corporateOrderPreparation.update({ where: key, data: { version: { increment: 1 } } });
      await tx.corporateOrderShipmentReport.create({ data: { corporateOrderId: orderId, artistUserId: context.userId, preparationVersion: updated.version,
        carrierName: input.carrierName, trackingCode: input.trackingCode, reportedByUserId: context.userId, requestTraceId: requestId } });
      await tx.corporateOrderPreparationEvent.create({ data: { corporateOrderId: orderId, artistUserId: context.userId, version: updated.version, action: "shipment_reported", status: p.status, actorUserId: context.userId, requestTraceId: requestId } });
      return corporateView(await tx.corporateOrderPreparation.findUniqueOrThrow({ where: key, include: corporateInclude }), true);
    });
  }
}
