import {
  BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException
} from "@nestjs/common";
import { canAccessStaffDomain, canEditArtistProduct, type AuthorizationContext } from "@negarin/authz";
import { PrismaService } from "./prisma.service.js";
import { enforceDecision } from "./authorization.guard.js";

const decisions = ["approved", "changes_requested"] as const;
export type PublicationReviewDecision = (typeof decisions)[number];

@Injectable()
export class PublicationReviewService {
  constructor(private readonly database: PrismaService) {}

  async submit(context: AuthorizationContext, productId: string) {
    this.requireArtist(context);
    return this.database.$transaction(async (transaction) => {
      const product = await transaction.artistProduct.findUnique({ where: { id: productId } });
      if (!product) throw new NotFoundException();
      enforceDecision(canEditArtistProduct(context, { artistUserId: product.artistUserId }));
      if (product.archivedAt) throw new ConflictException("product-archived");
      if (product.publicationStatus !== "draft" && product.publicationStatus !== "changes_requested") {
        throw new ConflictException("product-not-submittable");
      }

      const updated = await transaction.artistProduct.updateMany({
        where: { id: productId, archivedAt: null, publicationStatus: product.publicationStatus },
        data: { publicationStatus: "under_review" }
      });
      if (updated.count !== 1) throw new ConflictException("product-state-changed");
      await transaction.productPublicationEvent.create({
        data: { productId, actorUserId: context.userId, status: "under_review" }
      });
      return { id: productId, publicationStatus: "under_review" as const };
    });
  }

  async history(context: AuthorizationContext, productId: string) {
    this.requireArtist(context);
    const product = await this.database.artistProduct.findUnique({
      where: { id: productId },
      select: { id: true, artistUserId: true }
    });
    if (!product) throw new NotFoundException();
    enforceDecision(canEditArtistProduct(context, { artistUserId: product.artistUserId }));
    const events = await this.database.productPublicationEvent.findMany({
      where: { productId },
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      select: { id: true, status: true, feedback: true, createdAt: true }
    });
    return events.map((event) => ({ ...event, createdAt: event.createdAt.toISOString() }));
  }

  async queue(context: AuthorizationContext) {
    this.requireStaff(context);
    const products = await this.database.artistProduct.findMany({
      where: { publicationStatus: "under_review", archivedAt: null },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      select: { id: true, title: true, description: true, publicationStatus: true, createdAt: true }
    });
    return products.map((product) => ({ ...product, createdAt: product.createdAt.toISOString() }));
  }

  async decide(context: AuthorizationContext, productId: string, decision: PublicationReviewDecision, feedback?: string) {
    this.requireStaff(context);
    if (decision === "changes_requested" && !feedback?.trim()) throw new BadRequestException();

    return this.database.$transaction(async (transaction) => {
      const product = await transaction.artistProduct.findUnique({
        where: { id: productId },
        select: { id: true, publicationStatus: true, archivedAt: true }
      });
      if (!product) throw new NotFoundException();
      if (product.archivedAt || product.publicationStatus !== "under_review") {
        throw new ConflictException("product-not-under-review");
      }
      const updated = await transaction.artistProduct.updateMany({
        where: { id: productId, publicationStatus: "under_review", archivedAt: null },
        data: { publicationStatus: decision }
      });
      if (updated.count !== 1) throw new ConflictException("product-state-changed");
      const event = await transaction.productPublicationEvent.create({
        data: {
          productId,
          actorUserId: context.userId,
          status: decision,
          feedback: feedback?.trim() || null
        },
        select: { id: true, status: true, feedback: true, createdAt: true }
      });
      return { productId, ...event, createdAt: event.createdAt.toISOString() };
    });
  }

  private requireArtist(context: AuthorizationContext) {
    if (context.activeRole !== "artist") throw new ForbiddenException();
  }

  private requireStaff(context: AuthorizationContext) {
    enforceDecision(canAccessStaffDomain(context, "products"));
  }
}

export function parsePublicationReviewDecision(body: unknown): {
  decision: PublicationReviewDecision;
  feedback?: string;
} {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const value = body as Record<string, unknown>;
  if (Object.keys(value).some((key) => key !== "decision" && key !== "feedback")) {
    throw new BadRequestException();
  }
  if (typeof value.decision !== "string" || !decisions.includes(value.decision as PublicationReviewDecision)) {
    throw new BadRequestException();
  }
  if (value.feedback !== undefined && (typeof value.feedback !== "string" || value.feedback.length > 5000)) {
    throw new BadRequestException();
  }
  if (value.decision === "changes_requested" && typeof value.feedback === "string" && !value.feedback.trim()) {
    throw new BadRequestException();
  }
  return { decision: value.decision as PublicationReviewDecision, ...(value.feedback === undefined ? {} : { feedback: value.feedback as string }) };
}
