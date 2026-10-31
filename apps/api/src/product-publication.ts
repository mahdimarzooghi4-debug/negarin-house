import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { canAccessStaffDomain, canEditArtistProduct, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import { PrismaService } from "./prisma.service.js";
import { Prisma, type ProductPublicationStatus } from "./generated/prisma/client.js";

import { parseProductContent, productContentSnapshot } from "./product-specifications.js";

const reviewSelect = {
  id: true, title: true, description: true, publicationStatus: true,
  imageIds: true, category: true, preparationTime: true, dimensions: true, materials: true, weight: true, color: true,
  technique: true, careInstructions: true,
  version: true, updatedAt: true
} as const;
const publicationQueuePageSize = 30;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type PublicationQueueCursor = { updatedAt: Date; id: string };

export function parsePublicationQueueQuery(query: Record<string, unknown>): PublicationQueueCursor | null {
  if (Object.keys(query).some(key => key !== "cursor")) throw new BadRequestException("invalid-publication-queue-query");
  const raw = query.cursor;
  if (raw === undefined) return null;
  if (typeof raw !== "string" || raw.length > 256 || !/^[A-Za-z0-9_-]+$/.test(raw)) throw new BadRequestException("invalid-publication-queue-cursor");
  try {
    const decoded = Buffer.from(raw, "base64url").toString("utf8");
    if (Buffer.from(decoded, "utf8").toString("base64url") !== raw) throw new Error("noncanonical-cursor");
    const value: unknown = JSON.parse(decoded);
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("invalid-cursor");
    const fields = value as Record<string, unknown>;
    if (Object.keys(fields).length !== 2 || typeof fields.updatedAt !== "string" || typeof fields.id !== "string" || !uuidPattern.test(fields.id)) throw new Error("invalid-cursor");
    const updatedAt = new Date(fields.updatedAt);
    if (!Number.isFinite(updatedAt.getTime()) || updatedAt.toISOString() !== fields.updatedAt) throw new Error("invalid-cursor-date");
    return { updatedAt, id: fields.id.toLowerCase() };
  } catch {
    throw new BadRequestException("invalid-publication-queue-cursor");
  }
}

function publicationQueueCursor(updatedAt: Date, id: string) {
  return Buffer.from(JSON.stringify({ updatedAt: updatedAt.toISOString(), id })).toString("base64url");
}

export function parsePublicationCommand(body: unknown, needsReason = false): { version: number; reason?: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const input = body as Record<string, unknown>;
  const keys = needsReason ? ["version", "reason"] : ["version"];
  if (Object.keys(input).some((key) => !keys.includes(key)) ||
    !Number.isSafeInteger(input.version) || (input.version as number) < 0 || (input.version as number) >= 2_147_483_647) {
    throw new BadRequestException();
  }
  if (needsReason && (typeof input.reason !== "string" || !input.reason.trim() || input.reason.length > 2000)) {
    throw new BadRequestException();
  }
  return { version: input.version as number, ...(needsReason ? { reason: (input.reason as string).trim() } : {}) };
}

@Injectable()
export class ProductPublicationService {
  constructor(private readonly database: PrismaService) {}

  async queue(context: AuthorizationContext, cursor: PublicationQueueCursor | null = null) {
    enforceDecision(canAccessStaffDomain(context, "products"));
    const products = await this.database.artistProduct.findMany({
      where: {
        archivedAt: null,
        OR: [{ publicationStatus: "under_review" }, { publicationStatus: "published", changeStatus: "under_review" }],
        ...(cursor ? { AND: [{ OR: [
          { updatedAt: { gt: cursor.updatedAt } },
          { updatedAt: cursor.updatedAt, id: { gt: cursor.id } }
        ] }] } : {})
      },
      select: { ...reviewSelect, changeStatus: true, changeContent: true },
      orderBy: [{ updatedAt: "asc" }, { id: "asc" }],
      take: publicationQueuePageSize + 1
    });
    const hasMore = products.length > publicationQueuePageSize;
    const page = products.slice(0, publicationQueuePageSize).map(product => product.publicationStatus === "published"
      ? { id: product.id, ...parseProductContent(product.changeContent), publicationStatus: "under_review", version: product.version,
          updatedAt: product.updatedAt, reviewKind: "published-change" as const }
      : {
          id: product.id, title: product.title, description: product.description, publicationStatus: product.publicationStatus,
          imageIds: product.imageIds, category: product.category, preparationTime: product.preparationTime, dimensions: product.dimensions,
          materials: product.materials, weight: product.weight, color: product.color, technique: product.technique,
          careInstructions: product.careInstructions, version: product.version, updatedAt: product.updatedAt, reviewKind: "initial" as const
        });
    const last = page.at(-1);
    return { items: page, hasMore, nextCursor: hasMore && last ? publicationQueueCursor(last.updatedAt, last.id) : null };
  }

  async review(context: AuthorizationContext, id: string) {
    enforceDecision(canAccessStaffDomain(context, "products"));
    const product = await this.database.artistProduct.findUnique({ where: { id } });
    if (!product) throw new NotFoundException();
    if (product.publicationStatus === "published" && product.changeStatus === "under_review") {
      return { id: product.id, ...parseProductContent(product.changeContent), publicationStatus: "under_review", version: product.version,
        updatedAt: product.updatedAt, reviewKind: "published-change" as const };
    }
    const initial = await this.database.artistProduct.findUnique({ where: { id }, select: reviewSelect });
    return { ...initial!, reviewKind: "initial" as const };
  }

  async submitChangeProposal(context: AuthorizationContext, id: string, version: number, requestId: string) {
    const product = await this.database.artistProduct.findUnique({ where: { id } });
    if (!product) throw new NotFoundException();
    enforceDecision(canEditArtistProduct(context, product));
    if (product.archivedAt || product.publicationStatus !== "published" || product.version !== version ||
      !["draft", "changes_requested"].includes(product.changeStatus ?? "") || !product.changeContent) {
      throw new ConflictException("product-change-state-changed");
    }
    const content = parseProductContent(product.changeContent);
    const missingFields = productPublicationMissingFields({ ...product, ...content });
    if (missingFields.length) throw new ConflictException({ code: "product-publication-incomplete", missingFields });
    if (product.version >= 2_147_483_647) throw new ConflictException("product-version-exhausted");
    return this.database.$transaction(async tx => {
      const changed = await tx.artistProduct.updateMany({
        where: { id, version, publicationStatus: "published", archivedAt: null, changeStatus: product.changeStatus },
        data: { changeStatus: "under_review", changeReason: null, version: { increment: 1 } }
      });
      if (changed.count !== 1) throw new ConflictException("product-change-state-changed");
      await tx.productPublicationEvent.create({ data: {
        productId: id, actorUserId: context.userId, actorRole: "artist", action: "change-submit",
        fromStatus: "published", toStatus: "published", version: version + 1, content, requestId
      } });
      return tx.artistProduct.findUniqueOrThrow({ where: { id } });
    });
  }

  async history(context: AuthorizationContext, id: string, staff = false) {
    if (staff) enforceDecision(canAccessStaffDomain(context, "products"));
    const product = await this.database.artistProduct.findUnique({ where: { id } });
    if (!product) throw new NotFoundException();
    if (!staff) enforceDecision(canEditArtistProduct(context, product));
    const events = await this.database.productPublicationEvent.findMany({
      where: { productId: id }, orderBy: { version: "asc" },
      select: { id: true, actorUserId: true, actorRole: true, requestId: true, action: true, fromStatus: true, toStatus: true,
        version: true, reason: true, content: true, createdAt: true }
    });
    // Internal actor and request identifiers are available only to authorized product staff.
    if (staff) return events;
    return events.map(event => ({ action: event.action, fromStatus: event.fromStatus, toStatus: event.toStatus,
      version: event.version, reason: event.reason, content: event.content, createdAt: event.createdAt }));
  }

  async transition(
    context: AuthorizationContext, id: string,
    action: "submit" | "approve" | "request-changes" | "publish",
    input: { version: number; reason?: string }, requestId: string
  ) {
    const staff = action === "approve" || action === "request-changes";
    if (staff) enforceDecision(canAccessStaffDomain(context, "products"));
    const targets: Record<typeof action, ProductPublicationStatus> = {
      submit: "under_review", approve: "approved", "request-changes": "changes_requested", publish: "published"
    };
    return this.database.$transaction(async (tx) => {
      const product = await tx.artistProduct.findUnique({ where: { id } });
      if (!product) throw new NotFoundException();
      if (!staff) enforceDecision(canEditArtistProduct(context, product));
      if (staff && product.publicationStatus === "published" && product.changeStatus === "under_review") {
        if (product.archivedAt || product.version !== input.version || !product.changeContent) throw new ConflictException("product-state-changed");
        const content = parseProductContent(product.changeContent);
        const update = action === "approve" ? {
          ...content, changeStatus: null, changeContent: Prisma.DbNull, changeReason: null
        } : { changeStatus: "changes_requested" as const, changeReason: input.reason! };
        const changed = await tx.artistProduct.updateMany({ where: { id, version: input.version, publicationStatus: "published", changeStatus: "under_review", archivedAt: null },
          data: { ...update, version: { increment: 1 } } });
        if (changed.count !== 1) throw new ConflictException("product-state-changed");
        await tx.productPublicationEvent.create({ data: {
          productId: id, actorUserId: context.userId, actorRole: "staff", action: action === "approve" ? "change-approved" : "change-requested-changes",
          fromStatus: "published", toStatus: "published", version: input.version + 1,
          reason: input.reason ?? null, content, requestId
        } });
        return tx.artistProduct.findUniqueOrThrow({ where: { id }, select: reviewSelect });
      }
      if (action === "submit" || action === "publish") {
        const missingFields = productPublicationMissingFields(product);
        if (missingFields.length) throw new ConflictException({ code: "product-publication-incomplete", missingFields });
      }
      const validSource = action === "submit"
        ? ["draft", "changes_requested"].includes(product.publicationStatus)
        : action === "publish" ? product.publicationStatus === "approved" : product.publicationStatus === "under_review";
      if (product.archivedAt || product.version !== input.version || !validSource) {
        throw new ConflictException("product-state-changed");
      }
      const changed = await tx.artistProduct.updateMany({
        where: { id, version: input.version, publicationStatus: product.publicationStatus, archivedAt: null },
        data: { publicationStatus: targets[action], version: { increment: 1 } }
      });
      if (changed.count !== 1) throw new ConflictException("product-state-changed");
      await tx.productPublicationEvent.create({ data: {
        productId: id, actorUserId: context.userId, actorRole: staff ? "staff" : "artist",
        action, fromStatus: product.publicationStatus, toStatus: targets[action], version: input.version + 1,
        reason: input.reason ?? null, content: productContentSnapshot(product), requestId
      } });
      // The review surface deliberately has no price mutation or price approval field.
      return tx.artistProduct.findUniqueOrThrow({ where: { id }, select: reviewSelect });
    });
  }
}

export function productPublicationMissingFields(product: {
  title: string; category: string | null; imageIds: string[]; priceToman: bigint;
  inventoryConfigured: boolean; description: string | null; preparationTime: string | null;
}) {
  const missing: string[] = [];
  if (!product.title.trim() || !product.category?.trim()) missing.push("title-category");
  if (product.imageIds.length < 1) missing.push("image");
  if (product.priceToman <= 0n || !product.inventoryConfigured) missing.push("price-inventory");
  if (!product.description?.trim() || !product.preparationTime?.trim()) missing.push("description-preparation-time");
  return missing;
}
