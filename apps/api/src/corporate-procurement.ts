import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { canAccessStaffDomain, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parseAddressCommand } from "./customer-addresses.js";
import type { Prisma } from "./generated/prisma/client.js";
import { PrismaService } from "./prisma.service.js";

function object(body: unknown, keys: string[]) {
  if (!body || typeof body !== "object" || Array.isArray(body) || Object.keys(body).some(k => !keys.includes(k))) throw new BadRequestException();
  return body as Record<string, unknown>;
}
export function parseCorporatePurchaseRequestCreate(body: unknown) {
  const b = object(body, ["idempotencyKey", "items"]);
  const idempotencyKey = parseArtistProductId(b.idempotencyKey as string);
  if (!Array.isArray(b.items) || b.items.length < 1 || b.items.length > 100) throw new BadRequestException();
  const items = b.items.map(raw => {
    const item = object(raw, ["productId", "quantity"]);
    const productId = parseArtistProductId(item.productId as string);
    if (!Number.isInteger(item.quantity) || (item.quantity as number) < 1 || (item.quantity as number) > 2_147_483_647) throw new BadRequestException();
    return { productId, quantity: item.quantity as number };
  }).sort((a, b) => a.productId.localeCompare(b.productId));
  if (new Set(items.map(i => i.productId)).size !== items.length) throw new BadRequestException("duplicate-product");
  return { idempotencyKey, items };
}
export function parseCorporatePurchaseRequestSubmit(body: unknown) {
  const b = object(body, ["version"]);
  if (!Number.isInteger(b.version) || (b.version as number) < 0 || (b.version as number) >= 2_147_483_647) throw new BadRequestException();
  return { version: b.version as number };
}
export function parseCorporatePurchaseRequestMessage(body: unknown) {
  const b = object(body, ["version", "message"]);
  if (!Number.isInteger(b.version) || (b.version as number) < 0 || (b.version as number) >= 2_147_483_647 || typeof b.message !== "string" || !b.message.trim() || b.message.trim().length > 4000 || /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u.test(b.message)) throw new BadRequestException();
  return { version: b.version as number, message: b.message.trim() };
}
const MAX_PROPOSAL_TOMAN = 9_223_372_036_854_775_807n;
function proposalMoney(value: unknown) {
  if (typeof value !== "string" || !/^[1-9]\d{0,18}$/.test(value) || BigInt(value) > MAX_PROPOSAL_TOMAN) throw new BadRequestException();
  return value;
}
function proposalText(value: unknown, max: number) {
  if (typeof value !== "string" || !value.trim() || value.trim().length > max || /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u.test(value)) throw new BadRequestException();
  return value.trim();
}
function proposalDate(value: unknown) {
  if (typeof value !== "string") throw new BadRequestException();
  const date = new Date(value);
  if (!Number.isFinite(date.getTime()) || date.toISOString() !== value) throw new BadRequestException();
  return date;
}
export function parseCorporateProposalCreate(body: unknown) {
  const b = object(body, ["idempotencyKey", "summary", "productionStartsAt", "productionCompletesAt", "estimatedDeliveryAt", "packagingDetails", "customizationDetails", "items"]);
  if (!Array.isArray(b.items) || b.items.length < 1 || b.items.length > 100) throw new BadRequestException();
  const items = b.items.map(raw => {
    const item = object(raw, ["productId", "quantity", "unitPriceToman", "packagingDetails", "customizationDetails"]);
    if (!Number.isInteger(item.quantity) || (item.quantity as number) < 1 || (item.quantity as number) > 2_147_483_647) throw new BadRequestException();
    return { productId: parseArtistProductId(item.productId as string), quantity: item.quantity as number, unitPriceToman: proposalMoney(item.unitPriceToman), packagingDetails: proposalText(item.packagingDetails, 2000), customizationDetails: proposalText(item.customizationDetails, 2000) };
  }).sort((a, b) => a.productId.localeCompare(b.productId));
  if (new Set(items.map(item => item.productId)).size !== items.length) throw new BadRequestException("duplicate-product");
  const productionStartsAt = proposalDate(b.productionStartsAt), productionCompletesAt = proposalDate(b.productionCompletesAt), estimatedDeliveryAt = proposalDate(b.estimatedDeliveryAt);
  if (productionStartsAt > productionCompletesAt || productionCompletesAt > estimatedDeliveryAt) throw new BadRequestException();
  return { idempotencyKey: parseArtistProductId(b.idempotencyKey as string), summary: proposalText(b.summary, 1000), productionStartsAt: productionStartsAt.toISOString(), productionCompletesAt: productionCompletesAt.toISOString(), estimatedDeliveryAt: estimatedDeliveryAt.toISOString(), packagingDetails: proposalText(b.packagingDetails, 2000), customizationDetails: proposalText(b.customizationDetails, 2000), items };
}
export function parseCorporateProposalDecision(body: unknown) {
  const b = object(body, ["version", "decision", "message"]);
  if (!Number.isInteger(b.version) || (b.version as number) < 0 || (b.version as number) >= 2_147_483_647 || !["accepted", "rejected", "revision_requested"].includes(String(b.decision))) throw new BadRequestException();
  const decision = b.decision as "accepted" | "rejected" | "revision_requested";
  const message = decision === "accepted" && (b.message === undefined || b.message === "") ? "" : proposalText(b.message, 4000);
  if (decision === "revision_requested" && !message) throw new BadRequestException();
  return { version: b.version as number, decision, message };
}
export function parseCorporateOrderShippingAddress(body: unknown) {
  const allowed = ["version", "recipientName", "recipientPhone", "province", "city", "postalCode", "fullAddress"];
  if (!body || typeof body !== "object" || Array.isArray(body) || Object.keys(body).some(key => !allowed.includes(key))) throw new BadRequestException();
  const command = parseAddressCommand(body, true);
  if (!command.address) throw new BadRequestException();
  return { version: command.version, address: command.address };
}
export function parseCorporateOrderPaymentSetup(body: unknown) {
  const b = object(body, ["version", "paymentAmountToman", "paymentDueAt", "paymentInstructions"]);
  if (!Number.isInteger(b.version) || (b.version as number) < 0 || (b.version as number) >= 2_147_483_647) throw new BadRequestException();
  const paymentAmountToman = proposalMoney(b.paymentAmountToman);
  const paymentDueAt = proposalDate(b.paymentDueAt);
  const paymentInstructions = proposalText(b.paymentInstructions, 2000);
  return { version: b.version as number, paymentAmountToman, paymentDueAt: paymentDueAt.toISOString(), paymentInstructions };
}
export function parseCorporateOrderPaymentReport(body: unknown) {
  const b = object(body, ["version", "paymentReportedAmountToman", "paymentReference"]);
  if (!Number.isInteger(b.version) || (b.version as number) < 0 || (b.version as number) >= 2_147_483_647) throw new BadRequestException();
  const paymentReportedAmountToman = proposalMoney(b.paymentReportedAmountToman);
  const paymentReference = proposalText(b.paymentReference, 120);
  return { version: b.version as number, paymentReportedAmountToman, paymentReference };
}
export function parseCorporateOrderPaymentDecision(body: unknown) {
  const b = object(body, ["version", "decision", "message"]);
  if (!Number.isInteger(b.version) || (b.version as number) < 0 || (b.version as number) >= 2_147_483_647 || !["verified", "returned"].includes(String(b.decision))) throw new BadRequestException();
  const decision = b.decision as "verified" | "returned";
  const message = decision === "returned" ? proposalText(b.message, 1000) : (b.message === undefined || b.message === "" ? "" : proposalText(b.message, 1000));
  return { version: b.version as number, decision, message };
}
const include = {
  items: { orderBy: { productId: "asc" } },
  events: { orderBy: { version: "asc" } }
} satisfies Prisma.CorporatePurchaseRequestInclude;
type Request = Prisma.CorporatePurchaseRequestGetPayload<{ include: typeof include }>;
const proposalInclude = { items: { orderBy: { productId: "asc" }, include: { artist: { select: { storefront: { select: { storeName: true } } } } } }, events: { orderBy: { version: "asc" } }, order: { select: { id: true, status: true } } } satisfies Prisma.CorporateProposalInclude;
type Proposal = Prisma.CorporateProposalGetPayload<{ include: typeof proposalInclude }>;
const orderInclude = { items: { orderBy: { productId: "asc" } }, proposal: { select: { summary: true, estimatedDeliveryAt: true } }, events: { orderBy: { version: "asc" } }, fulfillments: { orderBy: { artistUserId: "asc" }, include: { shipment: true } } } satisfies Prisma.CorporateOrderInclude;
type Order = Prisma.CorporateOrderGetPayload<{ include: typeof orderInclude }>;

function corporate(context: AuthorizationContext) {
  if (context.activeRole !== "corporate-buyer" || !context.organizationId) throw new ForbiddenException();
}
export function requireCorporateBuyer(context: AuthorizationContext) { corporate(context); }

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return "[" + value.map(stableJson).join(",") + "]";
  if (value && typeof value === "object") {
    const object = value as Record<string, unknown>;
    return "{" + Object.keys(object).sort().map(key => JSON.stringify(key) + ":" + stableJson(object[key])).join(",") + "}";
  }
  return JSON.stringify(value) ?? "undefined";
}
function sameCommand(a: unknown, b: unknown) {
  return stableJson(a) === stableJson(b);
}
function view(request: Request, staff = false) {
  return {
    id: request.id,
    status: request.status,
    version: request.version,
    createdAt: request.createdAt.toISOString(),
    submittedAt: request.submittedAt?.toISOString() ?? null,
    items: request.items.map(item => ({
      productId: item.productId,
      title: item.title,
      quantity: item.quantity,
      ...(staff ? { artistUserId: item.artistUserId } : {})
    })),
    history: request.events.map(event => ({
      version: event.version,
      action: event.action,
      createdAt: event.createdAt.toISOString(),
      ...(event.action === "staff_message" || event.action === "buyer_message" ? { message: typeof event.command === "object" && event.command !== null && "message" in event.command ? String(event.command.message) : "" } : {}),
      ...(staff ? { actorUserId: event.actorUserId } : {})
    })),
    ...(staff ? { buyerOrganizationId: request.buyerOrganizationId, createdByUserId: request.createdByUserId } : {})
  };
}
function proposalView(proposal: Proposal, staff = false) {
  return { id: proposal.id, requestId: proposal.requestId, status: proposal.status, version: proposal.version, summary: proposal.summary,
    productionStartsAt: proposal.productionStartsAt.toISOString(), productionCompletesAt: proposal.productionCompletesAt.toISOString(), estimatedDeliveryAt: proposal.estimatedDeliveryAt.toISOString(),
    packagingDetails: proposal.packagingDetails, customizationDetails: proposal.customizationDetails, totalToman: proposal.totalToman.toString(), createdAt: proposal.createdAt.toISOString(),
    items: proposal.items.map(item => ({ productId: item.productId, title: item.title, quantity: item.quantity, ...(staff ? { artistUserId: item.artistUserId } : {}),
      artistName: item.artist.storefront?.storeName ?? "کارگاه هنرمند", unitPriceToman: item.unitPriceToman.toString(), lineTotalToman: (item.unitPriceToman * BigInt(item.quantity)).toString(),
      packagingDetails: item.packagingDetails, customizationDetails: item.customizationDetails })),
    order: proposal.order ? { id: proposal.order.id, status: proposal.order.status } : null,
    history: proposal.events.map(event => ({ version: event.version, action: event.action, createdAt: event.createdAt.toISOString(), ...(staff ? { actorUserId: event.actorUserId } : {}),
      message: typeof event.command === "object" && event.command !== null && "message" in event.command ? String(event.command.message) : null })) };
}
function corporateOrderView(order: Order, includeAddress = false) {
  return { id: order.id, proposalId: order.proposalId, status: order.status, version: order.version, totalToman: order.totalToman.toString(), createdAt: order.createdAt.toISOString(),
    proposalSummary: order.proposal.summary, estimatedDeliveryAt: order.proposal.estimatedDeliveryAt.toISOString(),
    ...(includeAddress ? { shippingAddress: order.shippingAddress } : {}),
    ...(includeAddress ? { shipmentReports: order.fulfillments.flatMap(fulfillment => fulfillment.shipment ? [{ carrierName: fulfillment.shipment.carrierName,
      trackingCode: fulfillment.shipment.trackingCode, reportedAt: fulfillment.shipment.reportedAt.toISOString(),
      items: order.items.filter(item => item.artistUserId === fulfillment.artistUserId).map(item => ({ title: item.title, quantity: item.quantity })) }] : []) } : {}),
    paymentAmountToman: order.paymentAmountToman?.toString() ?? null, paymentDueAt: order.paymentDueAt?.toISOString() ?? null, paymentInstructions: order.paymentInstructions,
    paymentReportedAmountToman: order.paymentReportedAmountToman?.toString() ?? null, paymentReference: order.paymentReference, paymentReportedAt: order.paymentReportedAt?.toISOString() ?? null,
    items: order.items.map(item => ({ productId: item.productId, artistUserId: item.artistUserId, title: item.title, quantity: item.quantity, unitPriceToman: item.unitPriceToman.toString(), lineTotalToman: (item.unitPriceToman * BigInt(item.quantity)).toString() })),
    history: order.events.map(event => ({ version: event.version, action: event.action, createdAt: event.createdAt.toISOString(),
      ...(event.action === "payment_review_returned" && typeof event.command === "object" && event.command !== null && "message" in event.command ? { message: String(event.command.message) } : {}) })) };
}

@Injectable()
export class CorporateProcurementService {
  constructor(private readonly db: PrismaService) {}

  async create(context: AuthorizationContext, input: ReturnType<typeof parseCorporatePurchaseRequestCreate>, trace: string) {
    corporate(context);
    const command = parseCorporatePurchaseRequestCreate(input);
    return this.db.$transaction(async tx => {
      await tx.$queryRawUnsafe(
        'SELECT 1 AS locked FROM pg_advisory_xact_lock(hashtextextended($1, 0))',
        "corporate-purchase-request:" + context.organizationId + ":" + context.userId + ":" + command.idempotencyKey
      );
      const prior = await tx.corporatePurchaseRequest.findUnique({
        where: { buyerOrganizationId_createdByUserId_idempotencyKey: { buyerOrganizationId: context.organizationId!, createdByUserId: context.userId, idempotencyKey: command.idempotencyKey } }, include
      });
      if (prior) {
        if (!sameCommand(prior.events[0]?.command, command)) throw new ConflictException("idempotency-key-reused");
        return view(prior);
      }

      const snapshots: Array<{ productId: string; artistUserId: string; title: string; quantity: number }> = [];
      for (const item of command.items) {
        const rows = await tx.$queryRawUnsafe<Array<{ id: string }>>(
          'SELECT "id" FROM "artist_products" WHERE "id" = $1::uuid FOR SHARE', item.productId
        );
        if (!rows.length) throw new NotFoundException();
        const product = await tx.artistProduct.findFirst({
          where: { id: item.productId, publicationStatus: "published", archivedAt: null },
          select: { id: true, artistUserId: true, title: true }
        });
        if (!product) throw new NotFoundException();
        snapshots.push({ productId: product.id, artistUserId: product.artistUserId, title: product.title, quantity: item.quantity });
      }

      const request = await tx.corporatePurchaseRequest.create({ data: {
        buyerOrganizationId: context.organizationId!, createdByUserId: context.userId, idempotencyKey: command.idempotencyKey,
        items: { create: snapshots }
      } });
      await tx.corporatePurchaseRequestEvent.create({ data: {
        requestId: request.id, version: 0, action: "created", actorUserId: context.userId, command, requestTraceId: trace
      } });
      return view(await tx.corporatePurchaseRequest.findUniqueOrThrow({ where: { id: request.id }, include }));
    });
  }

  async submit(context: AuthorizationContext, id: string, input: ReturnType<typeof parseCorporatePurchaseRequestSubmit>, trace: string) {
    corporate(context);
    const command = parseCorporatePurchaseRequestSubmit(input);
    return this.db.$transaction(async tx => {
      const locked = await tx.$queryRawUnsafe<Array<{ id: string }>>(
        'SELECT "id" FROM "corporate_purchase_requests" WHERE "id" = $1::uuid AND "buyerOrganizationId" = $2::uuid FOR UPDATE',
        id, context.organizationId
      );
      if (!locked.length) throw new NotFoundException();
      const request = await tx.corporatePurchaseRequest.findUniqueOrThrow({ where: { id }, include });
      const last = request.events.at(-1);
      if (request.status === "submitted" && request.version === command.version + 1 &&
          last?.action === "submitted" && last.actorUserId === context.userId && sameCommand(last.command, command)) {
        return view(request);
      }
      if (request.status !== "draft" || request.version !== command.version) throw new ConflictException("purchase-request-changed");

      for (const item of request.items) {
        const rows = await tx.$queryRawUnsafe<Array<{ id: string }>>(
          'SELECT "id" FROM "artist_products" WHERE "id" = $1::uuid FOR SHARE', item.productId
        );
        if (!rows.length) throw new ConflictException("corporate-product-unavailable");
        const product = await tx.artistProduct.findFirst({
          where: { id: item.productId, publicationStatus: "published", archivedAt: null }, select: { id: true }
        });
        if (!product) throw new ConflictException("corporate-product-unavailable");
      }

      const submittedAt = new Date();
      await tx.corporatePurchaseRequest.update({ where: { id }, data: {
        status: "submitted", submittedAt, version: { increment: 1 }
      } });
      await tx.corporatePurchaseRequestEvent.create({ data: {
        requestId: id, version: request.version + 1, action: "submitted", actorUserId: context.userId, command, requestTraceId: trace
      } });
      return view(await tx.corporatePurchaseRequest.findUniqueOrThrow({ where: { id }, include }));
    });
  }

  async list(context: AuthorizationContext, page: number, pageSize: number, staff = false) {
    let where: Prisma.CorporatePurchaseRequestWhereInput;
    if (staff) {
      enforceDecision(canAccessStaffDomain(context, "orders"));
      where = {};
    } else {
      corporate(context);
      where = { buyerOrganizationId: context.organizationId };
    }
    const rows = await this.db.corporatePurchaseRequest.findMany({
      where, include, orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      skip: (page - 1) * pageSize, take: pageSize + 1
    });
    return { page, pageSize, hasMore: rows.length > pageSize, items: rows.slice(0, pageSize).map(r => view(r, staff)) };
  }

  async get(context: AuthorizationContext, id: string, staff = false) {
    let where: Prisma.CorporatePurchaseRequestWhereInput;
    if (staff) {
      enforceDecision(canAccessStaffDomain(context, "orders"));
      where = { id };
    } else {
      corporate(context);
      where = { id, buyerOrganizationId: context.organizationId };
    }
    const request = await this.db.corporatePurchaseRequest.findFirst({ where, include });
    if (!request) throw new NotFoundException();
    return view(request, staff);
  }

  async addMessage(context: AuthorizationContext, id: string, input: ReturnType<typeof parseCorporatePurchaseRequestMessage>, trace: string, staff = false) {
    if (staff) enforceDecision(canAccessStaffDomain(context, "orders"));
    else corporate(context);
    const command = parseCorporatePurchaseRequestMessage(input);
    return this.db.$transaction(async tx => {
      const locked = await tx.$queryRawUnsafe<Array<{ id: string }>>(
        staff
          ? 'SELECT "id" FROM "corporate_purchase_requests" WHERE "id" = $1::uuid FOR UPDATE'
          : 'SELECT "id" FROM "corporate_purchase_requests" WHERE "id" = $1::uuid AND "buyerOrganizationId" = $2::uuid FOR UPDATE',
        ...(staff ? [id] : [id, context.organizationId])
      );
      if (!locked.length) throw new NotFoundException();
      const request = await tx.corporatePurchaseRequest.findUniqueOrThrow({ where: { id }, include });
      const action = staff ? "staff_message" : "buyer_message";
      const last = request.events.at(-1);
      if (request.version === command.version + 1 && last?.version === request.version && last.action === action && last.actorUserId === context.userId && sameCommand(last.command, command)) return view(request, staff);
      if (request.status !== "submitted" || request.version !== command.version) throw new ConflictException("purchase-request-changed");
      await tx.corporatePurchaseRequest.update({ where: { id }, data: { version: { increment: 1 } } });
      await tx.corporatePurchaseRequestEvent.create({ data: { requestId: id, version: request.version + 1, action, actorUserId: context.userId, command, requestTraceId: trace } });
      return view(await tx.corporatePurchaseRequest.findUniqueOrThrow({ where: { id }, include }), staff);
    });
  }

  async createProposal(context: AuthorizationContext, requestId: string, input: ReturnType<typeof parseCorporateProposalCreate>, trace: string) {
    enforceDecision(canAccessStaffDomain(context, "orders"));
    const command = parseCorporateProposalCreate(input);
    return this.db.$transaction(async tx => {
      const locked = await tx.$queryRawUnsafe<Array<{ id: string }>>('SELECT "id" FROM "corporate_purchase_requests" WHERE "id" = $1::uuid FOR UPDATE', requestId);
      if (!locked.length) throw new NotFoundException();
      const request = await tx.corporatePurchaseRequest.findUniqueOrThrow({ where: { id: requestId }, include });
      const prior = await tx.corporateProposal.findUnique({ where: { requestId_createdByUserId_idempotencyKey: { requestId, createdByUserId: context.userId, idempotencyKey: command.idempotencyKey } }, include: proposalInclude });
      if (prior) {
        if (!sameCommand(prior.events[0]?.command, command)) throw new ConflictException("idempotency-key-reused");
        return proposalView(prior, true);
      }
      if (request.status !== "submitted") throw new ConflictException("purchase-request-not-submitted");
      if (await tx.corporateProposal.findFirst({ where: { requestId, status: { in: ["sent", "accepted"] } }, select: { id: true } })) throw new ConflictException("proposal-already-open-or-accepted");
      if (command.items.length !== request.items.length || command.items.some((item, index) => item.productId !== request.items[index]?.productId || item.quantity !== request.items[index]?.quantity)) throw new BadRequestException("proposal-items-must-match-request");
      let totalToman = 0n;
      for (const item of command.items) {
        const line = BigInt(item.unitPriceToman) * BigInt(item.quantity);
        totalToman += line;
        if (line > MAX_PROPOSAL_TOMAN || totalToman > MAX_PROPOSAL_TOMAN) throw new BadRequestException("proposal-total-too-large");
      }
      const proposal = await tx.corporateProposal.create({ data: {
        requestId, buyerOrganizationId: request.buyerOrganizationId, createdByUserId: context.userId, idempotencyKey: command.idempotencyKey,
        summary: command.summary, productionStartsAt: new Date(command.productionStartsAt), productionCompletesAt: new Date(command.productionCompletesAt),
        estimatedDeliveryAt: new Date(command.estimatedDeliveryAt), packagingDetails: command.packagingDetails, customizationDetails: command.customizationDetails, totalToman,
        items: { create: command.items.map(item => { const source = request.items.find(row => row.productId === item.productId)!; return { productId: source.productId, artistUserId: source.artistUserId, title: source.title, quantity: source.quantity, unitPriceToman: BigInt(item.unitPriceToman), packagingDetails: item.packagingDetails, customizationDetails: item.customizationDetails }; }) }
      } });
      await tx.corporateProposalEvent.create({ data: { proposalId: proposal.id, version: 0, action: "sent", actorUserId: context.userId, command, requestTraceId: trace } });
      return proposalView(await tx.corporateProposal.findUniqueOrThrow({ where: { id: proposal.id }, include: proposalInclude }), true);
    });
  }

  async proposals(context: AuthorizationContext, requestId: string, staff = false) {
    if (staff) enforceDecision(canAccessStaffDomain(context, "orders"));
    else corporate(context);
    const request = await this.db.corporatePurchaseRequest.findFirst({ where: { id: requestId, ...(staff ? {} : { buyerOrganizationId: context.organizationId }) }, select: { id: true, buyerOrganizationId: true } });
    if (!request) throw new NotFoundException();
    const rows = await this.db.corporateProposal.findMany({ where: { requestId, buyerOrganizationId: request.buyerOrganizationId }, include: proposalInclude, orderBy: [{ createdAt: "desc" }, { id: "asc" }] });
    return { items: rows.map(row => proposalView(row, staff)) };
  }

  async decideProposal(context: AuthorizationContext, proposalId: string, input: ReturnType<typeof parseCorporateProposalDecision>, trace: string) {
    corporate(context);
    const command = parseCorporateProposalDecision(input);
    return this.db.$transaction(async tx => {
      const locked = await tx.$queryRawUnsafe<Array<{ id: string }>>('SELECT "id" FROM "corporate_proposals" WHERE "id" = $1::uuid AND "buyerOrganizationId" = $2::uuid FOR UPDATE', proposalId, context.organizationId);
      if (!locked.length) throw new NotFoundException();
      const proposal = await tx.corporateProposal.findUniqueOrThrow({ where: { id: proposalId }, include: proposalInclude });
      const last = proposal.events.at(-1);
      if (proposal.version === command.version + 1 && last?.action === command.decision && last.actorUserId === context.userId && sameCommand(last.command, command)) return proposalView(proposal);
      if (proposal.status !== "sent" || proposal.version !== command.version) throw new ConflictException("proposal-state-changed");
      await tx.corporateProposal.update({ where: { id: proposalId }, data: { status: command.decision, version: { increment: 1 } } });
      await tx.corporateProposalEvent.create({ data: { proposalId, version: proposal.version + 1, action: command.decision, actorUserId: context.userId, command, requestTraceId: trace } });
      if (command.decision === "accepted") {
        const order = await tx.corporateOrder.create({ data: { proposalId, buyerOrganizationId: proposal.buyerOrganizationId, createdByUserId: context.userId, totalToman: proposal.totalToman,
          items: { create: proposal.items.map(item => ({ productId: item.productId, artistUserId: item.artistUserId, title: item.title, quantity: item.quantity, unitPriceToman: item.unitPriceToman })) } } });
        await tx.corporateOrderEvent.create({ data: { orderId: order.id, version: 0, action: "created_from_accepted_proposal", actorUserId: context.userId, command: { proposalId, decisionVersion: proposal.version + 1 }, requestTraceId: trace } });
      }
      return proposalView(await tx.corporateProposal.findUniqueOrThrow({ where: { id: proposalId }, include: proposalInclude }));
    });
  }

  async orders(context: AuthorizationContext, page: number, pageSize: number) {
    corporate(context);
    const rows = await this.db.corporateOrder.findMany({ where: { buyerOrganizationId: context.organizationId }, include: orderInclude,
      orderBy: [{ createdAt: "desc" }, { id: "asc" }], skip: (page - 1) * pageSize, take: pageSize + 1 });
    return { page, pageSize, hasMore: rows.length > pageSize, items: rows.slice(0, pageSize).map(row => corporateOrderView(row)) };
  }

  async order(context: AuthorizationContext, id: string) {
    corporate(context);
    const row = await this.db.corporateOrder.findFirst({ where: { id, buyerOrganizationId: context.organizationId }, include: orderInclude });
    if (!row) throw new NotFoundException();
    return corporateOrderView(row, true);
  }

  async setShippingAddress(context: AuthorizationContext, id: string, input: ReturnType<typeof parseCorporateOrderShippingAddress>, trace: string) {
    corporate(context);
    const command = parseCorporateOrderShippingAddress(input);
    return this.db.$transaction(async tx => {
      const locked = await tx.$queryRawUnsafe<Array<{ id: string }>>('SELECT "id" FROM "corporate_orders" WHERE "id" = $1::uuid AND "buyerOrganizationId" = $2::uuid FOR UPDATE', id, context.organizationId);
      if (!locked.length) throw new NotFoundException();
      const order = await tx.corporateOrder.findUniqueOrThrow({ where: { id }, include: orderInclude });
      const last = order.events.at(-1);
      const eventCommand = { version: command.version, address: command.address };
      if (order.version === command.version + 1 && last?.action === "shipping_address_set" && last.actorUserId === context.userId && sameCommand(last.command, eventCommand)) return corporateOrderView(order, true);
      if (order.status !== "awaiting_payment_setup" || order.version !== command.version) throw new ConflictException("corporate-order-state-changed");
      const updated = await tx.corporateOrder.update({ where: { id }, data: { version: { increment: 1 }, shippingAddress: command.address as Prisma.InputJsonValue } });
      await tx.corporateOrderEvent.create({ data: { orderId: id, version: updated.version, action: "shipping_address_set", actorUserId: context.userId, command: eventCommand, requestTraceId: trace } });
      return corporateOrderView(await tx.corporateOrder.findUniqueOrThrow({ where: { id }, include: orderInclude }), true);
    });
  }

  async adminOrders(context: AuthorizationContext, page: number, pageSize: number) {
    enforceDecision(canAccessStaffDomain(context, "orders"));
    const rows = await this.db.corporateOrder.findMany({ include: orderInclude, orderBy: [{ createdAt: "desc" }, { id: "asc" }], skip: (page - 1) * pageSize, take: pageSize + 1 });
    return { page, pageSize, hasMore: rows.length > pageSize, items: rows.slice(0, pageSize).map(row => corporateOrderView(row)) };
  }

  async adminOrder(context: AuthorizationContext, id: string) {
    enforceDecision(canAccessStaffDomain(context, "orders"));
    const order = await this.db.corporateOrder.findUnique({ where: { id }, include: orderInclude });
    if (!order) throw new NotFoundException();
    return { ...corporateOrderView(order, true), buyerOrganizationId: order.buyerOrganizationId, createdByUserId: order.createdByUserId };
  }

  async setupPayment(context: AuthorizationContext, id: string, input: ReturnType<typeof parseCorporateOrderPaymentSetup>, trace: string) {
    enforceDecision(canAccessStaffDomain(context, "orders"));
    const command = parseCorporateOrderPaymentSetup(input);
    return this.db.$transaction(async tx => {
      const locked = await tx.$queryRawUnsafe<Array<{ id: string }>>('SELECT "id" FROM "corporate_orders" WHERE "id" = $1::uuid FOR UPDATE', id);
      if (!locked.length) throw new NotFoundException();
      const order = await tx.corporateOrder.findUniqueOrThrow({ where: { id }, include: orderInclude });
      const last = order.events.at(-1);
      if (order.version === command.version + 1 && last?.action === "payment_setup_completed" && last.actorUserId === context.userId && sameCommand(last.command, command)) return corporateOrderView(order, true);
      if (order.status !== "awaiting_payment_setup" || order.version !== command.version) throw new ConflictException("corporate-order-state-changed");
      if (!order.shippingAddress) throw new ConflictException("shipping-address-required");
      const updated = await tx.corporateOrder.update({ where: { id }, data: { status: "awaiting_payment", version: { increment: 1 }, paymentAmountToman: BigInt(command.paymentAmountToman), paymentDueAt: new Date(command.paymentDueAt), paymentInstructions: command.paymentInstructions } });
      await tx.corporateOrderEvent.create({ data: { orderId: id, version: updated.version, action: "payment_setup_completed", actorUserId: context.userId, command, requestTraceId: trace } });
      return corporateOrderView(await tx.corporateOrder.findUniqueOrThrow({ where: { id }, include: orderInclude }), true);
    });
  }

  async reportPayment(context: AuthorizationContext, id: string, input: ReturnType<typeof parseCorporateOrderPaymentReport>, trace: string) {
    corporate(context);
    const command = parseCorporateOrderPaymentReport(input);
    return this.db.$transaction(async tx => {
      const locked = await tx.$queryRawUnsafe<Array<{ id: string }>>('SELECT "id" FROM "corporate_orders" WHERE "id" = $1::uuid AND "buyerOrganizationId" = $2::uuid FOR UPDATE', id, context.organizationId);
      if (!locked.length) throw new NotFoundException();
      const order = await tx.corporateOrder.findUniqueOrThrow({ where: { id }, include: orderInclude });
      const last = order.events.at(-1), eventCommand = { ...command, action: "payment_reported" };
      if (order.version === command.version + 1 && last?.action === "payment_reported" && last.actorUserId === context.userId && sameCommand(last.command, eventCommand)) return corporateOrderView(order, true);
      if (order.status !== "awaiting_payment" || order.version !== command.version) throw new ConflictException("corporate-order-state-changed");
      const updated = await tx.corporateOrder.update({ where: { id }, data: { status: "payment_under_review", version: { increment: 1 }, paymentReportedAmountToman: BigInt(command.paymentReportedAmountToman), paymentReference: command.paymentReference, paymentReportedAt: new Date() } });
      await tx.corporateOrderEvent.create({ data: { orderId: id, version: updated.version, action: "payment_reported", actorUserId: context.userId, command: eventCommand, requestTraceId: trace } });
      return corporateOrderView(await tx.corporateOrder.findUniqueOrThrow({ where: { id }, include: orderInclude }), true);
    });
  }

  async reviewPayment(context: AuthorizationContext, id: string, input: ReturnType<typeof parseCorporateOrderPaymentDecision>, trace: string) {
    enforceDecision(canAccessStaffDomain(context, "orders"));
    const command = parseCorporateOrderPaymentDecision(input);
    return this.db.$transaction(async tx => {
      const locked = await tx.$queryRawUnsafe<Array<{ id: string }>>('SELECT "id" FROM "corporate_orders" WHERE "id" = $1::uuid FOR UPDATE', id);
      if (!locked.length) throw new NotFoundException();
      const order = await tx.corporateOrder.findUniqueOrThrow({ where: { id }, include: orderInclude });
      const action = command.decision === "verified" ? "payment_verified" : "payment_review_returned";
      const last = order.events.at(-1), eventCommand = { version: command.version, decision: command.decision, message: command.message };
      if (order.version === command.version + 1 && last?.action === action && last.actorUserId === context.userId && sameCommand(last.command, eventCommand)) return corporateOrderView(order, true);
      if (order.status !== "payment_under_review" || order.version !== command.version) throw new ConflictException("corporate-order-state-changed");
      if (command.decision === "verified" && order.paymentReportedAmountToman !== order.paymentAmountToman) throw new ConflictException("reported-amount-does-not-match-invoice");
      if (command.decision === "verified") {
        for (const item of order.items) {
          await tx.$queryRawUnsafe('SELECT "id" FROM "artist_products" WHERE "id" = $1::uuid FOR UPDATE', item.productId);
          const product = await tx.artistProduct.findUniqueOrThrow({ where: { id: item.productId }, select: { id: true, stockQuantity: true, inventoryVersion: true } });
          if (product.stockQuantity < item.quantity) throw new ConflictException("corporate-order-insufficient-stock");
          if (product.inventoryVersion === 2_147_483_647) throw new ConflictException("inventory-version-exhausted");
          await tx.artistProduct.update({ where: { id: product.id }, data: { stockQuantity: { decrement: item.quantity }, inventoryVersion: { increment: 1 } } });
          await tx.productInventoryEvent.create({ data: { productId: product.id, corporateOrderId: order.id, actorUserId: context.userId,
            previousQuantity: product.stockQuantity, stockQuantity: product.stockQuantity - item.quantity, inventoryVersion: product.inventoryVersion + 1,
            reason: "corporate-order-reserved", requestId: trace } });
        }
        const artistIds = [...new Set(order.items.map(item => item.artistUserId))].sort();
        for (const artistUserId of artistIds) {
          await tx.corporateOrderPreparation.create({ data: { corporateOrderId: order.id, artistUserId,
            events: { create: { version: 0, action: "assigned", status: "awaiting_acceptance", actorUserId: context.userId, requestTraceId: trace } } } });
        }
      }
      const updated = await tx.corporateOrder.update({ where: { id }, data: { status: command.decision === "verified" ? "paid" : "awaiting_payment", version: { increment: 1 }, paymentVerifiedAt: command.decision === "verified" ? new Date() : null,
        ...(command.decision === "returned" ? { paymentReportedAmountToman: null, paymentReference: null, paymentReportedAt: null } : {}) } });
      await tx.corporateOrderEvent.create({ data: { orderId: id, version: updated.version, action, actorUserId: context.userId, command: eventCommand, requestTraceId: trace } });
      return corporateOrderView(await tx.corporateOrder.findUniqueOrThrow({ where: { id }, include: orderInclude }), true);
    });
  }
}
