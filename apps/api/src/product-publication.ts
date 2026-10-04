import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { canAccessStaffDomain, canEditArtistProduct, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import { PrismaService } from "./prisma.service.js";
import type { ProductPublicationStatus } from "./generated/prisma/client.js";

import { productContentSnapshot } from "./product-specifications.js";

const reviewSelect = {
  id: true, title: true, description: true, publicationStatus: true,
  category: true, dimensions: true, materials: true, weight: true, color: true,
  technique: true, careInstructions: true,
  version: true, updatedAt: true
} as const;

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

  async queue(context: AuthorizationContext) {
    enforceDecision(canAccessStaffDomain(context, "products"));
    // A bounded first page; callers refresh after each decision. Pagination is a later slice.
    return this.database.artistProduct.findMany({
      where: { publicationStatus: "under_review", archivedAt: null },
      select: reviewSelect, orderBy: [{ updatedAt: "asc" }, { id: "asc" }], take: 100
    });
  }

  async review(context: AuthorizationContext, id: string) {
    enforceDecision(canAccessStaffDomain(context, "products"));
    const product = await this.database.artistProduct.findUnique({ where: { id }, select: reviewSelect });
    if (!product) throw new NotFoundException();
    return product;
  }

  async history(context: AuthorizationContext, id: string, staff = false) {
    if (staff) enforceDecision(canAccessStaffDomain(context, "products"));
    const product = await this.database.artistProduct.findUnique({ where: { id } });
    if (!product) throw new NotFoundException();
    if (!staff) enforceDecision(canEditArtistProduct(context, product));
    return this.database.productPublicationEvent.findMany({
      where: { productId: id }, orderBy: { version: "asc" },
      // Staff identity/request identifiers are not exposed to Artists.
      select: { action: true, fromStatus: true, toStatus: true, version: true, reason: true, content: true, createdAt: true }
    });
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
