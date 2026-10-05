import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { canAccessStaffDomain, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
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
const include = {
  items: { orderBy: { productId: "asc" } },
  events: { orderBy: { version: "asc" } }
} satisfies Prisma.CorporatePurchaseRequestInclude;
type Request = Prisma.CorporatePurchaseRequestGetPayload<{ include: typeof include }>;

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
  return JSON.stringify(value);
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
      ...(staff ? { actorUserId: event.actorUserId } : {})
    })),
    ...(staff ? { buyerOrganizationId: request.buyerOrganizationId, createdByUserId: request.createdByUserId } : {})
  };
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
        "corporate-purchase-request:" + context.userId + ":" + command.idempotencyKey
      );
      const prior = await tx.corporatePurchaseRequest.findUnique({
        where: { createdByUserId_idempotencyKey: { createdByUserId: context.userId, idempotencyKey: command.idempotencyKey } }, include
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
}
