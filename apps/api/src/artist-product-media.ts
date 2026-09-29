import { randomUUID } from "node:crypto";
import {
  BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, NotFoundException
} from "@nestjs/common";
import type { AuthorizationContext } from "@negarin/authz";
import { canEditArtistProduct } from "@negarin/authz";
import type { ObjectStorage } from "@negarin/storage";
import { PrismaService } from "./prisma.service.js";
import { enforceDecision } from "./authorization.guard.js";

export const OBJECT_STORAGE = Symbol("OBJECT_STORAGE");

const acceptedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxImageBytes = 10 * 1024 * 1024;

export type ProductMediaUploadRequest = Readonly<{ contentType: string; contentLength: number }>;

@Injectable()
export class ArtistProductMediaService {
  constructor(
    private readonly database: PrismaService,
    @Inject(OBJECT_STORAGE) private readonly storage: ObjectStorage
  ) {}

  async requestUpload(context: AuthorizationContext, productId: string, input: ProductMediaUploadRequest) {
    const product = await this.ownedWritableProduct(context, productId);
    const objectKey = `artists/${context.userId}/products/${product.id}/${randomUUID()}`;
    const media = await this.database.artistProductMedia.create({
      data: { productId, objectKey, contentType: input.contentType, contentLength: input.contentLength },
      select: { id: true }
    });
    try {
      const upload = await this.storage.createUploadUrl({ objectKey, ...input });
      return { id: media.id, uploadUrl: upload.url, expiresAt: upload.expiresAt };
    } catch (error) {
      await this.database.artistProductMedia.delete({ where: { id: media.id } });
      throw error;
    }
  }

  async refreshUploadUrl(context: AuthorizationContext, productId: string, mediaId: string) {
    await this.ownedWritableProduct(context, productId);
    const media = await this.database.artistProductMedia.findFirst({ where: { id: mediaId, productId } });
    if (!media) throw new NotFoundException();
    if (media.status !== "pending") throw new ConflictException("media-upload-not-pending");

    const upload = await this.storage.createUploadUrl({
      objectKey: media.objectKey,
      contentType: media.contentType,
      contentLength: media.contentLength
    });
    return { id: media.id, uploadUrl: upload.url, expiresAt: upload.expiresAt };
  }

  async completeUpload(context: AuthorizationContext, productId: string, mediaId: string) {
    await this.ownedWritableProduct(context, productId);
    const media = await this.database.artistProductMedia.findFirst({ where: { id: mediaId, productId } });
    if (!media) throw new NotFoundException();
    if (media.status === "ready") return { id: media.id, status: media.status };

    const stored = await this.storage.getObjectMetadata(media.objectKey);
    if (!stored) throw new ConflictException("upload-not-found");
    if (stored.contentLength !== media.contentLength || stored.contentType !== media.contentType) {
      throw new BadRequestException("upload-metadata-mismatch");
    }
    const objectKey = `artists/${context.userId}/products/${productId}/${randomUUID()}`;
    await this.storage.copyObject(media.objectKey, objectKey);
    let result: { id: string; status: "ready"; objectKey: string };
    try {
      result = await this.database.$transaction(async (transaction) => {
        const product = await transaction.artistProduct.findUnique({
          where: { id: productId },
          select: { artistUserId: true, archivedAt: true, publicationStatus: true }
        });
        if (!product) throw new NotFoundException();
        enforceDecision(canEditArtistProduct(context, { artistUserId: product.artistUserId }));
        if (product.archivedAt) throw new ConflictException("product-archived");
        if (product.publicationStatus === "under_review") throw new ConflictException("product-under-review");

        const current = await transaction.artistProductMedia.findFirst({ where: { id: media.id, productId } });
        if (!current) throw new NotFoundException();
        if (current.status === "ready") return { id: current.id, status: current.status, objectKey: current.objectKey };
        const updated = await transaction.artistProductMedia.updateMany({
          where: { id: media.id, productId, objectKey: media.objectKey, status: "pending" },
          data: { objectKey, status: "ready" }
        });
        if (updated.count !== 1) {
          const latest = await transaction.artistProductMedia.findUnique({ where: { id: media.id } });
          if (latest?.status === "ready") return { id: latest.id, status: latest.status, objectKey: latest.objectKey };
          throw new ConflictException("media-state-changed");
        }

        if (product.publicationStatus === "approved" || product.publicationStatus === "published") {
          const reset = await transaction.artistProduct.updateMany({
            where: { id: productId, archivedAt: null, publicationStatus: product.publicationStatus },
            data: { publicationStatus: "draft" }
          });
          if (reset.count !== 1) throw new ConflictException("product-state-changed");
        }
        return { id: media.id, status: "ready" as const, objectKey };
      });
    } catch (error) {
      await this.storage.deleteObject(objectKey);
      throw error;
    }
    if (result.objectKey !== objectKey) await this.storage.deleteObject(objectKey);
    else await this.storage.deleteObject(media.objectKey);
    return { id: result.id, status: result.status };
  }

  async list(context: AuthorizationContext, productId: string) {
    await this.ownedProduct(context, productId);
    const media = await this.database.artistProductMedia.findMany({
      where: { productId },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      select: { id: true, contentType: true, contentLength: true, status: true, objectKey: true, createdAt: true }
    });
    return Promise.all(media.map(async (item) => ({
      id: item.id,
      contentType: item.contentType,
      contentLength: item.contentLength,
      status: item.status,
      readUrl: item.status === "ready" ? await this.storage.createReadUrl(item.objectKey) : null,
      createdAt: item.createdAt.toISOString()
    })));
  }

  private async ownedProduct(context: AuthorizationContext, productId: string) {
    this.requireArtist(context);
    const product = await this.database.artistProduct.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException();
    enforceDecision(canEditArtistProduct(context, { artistUserId: product.artistUserId }));
    return product;
  }

  private async ownedWritableProduct(context: AuthorizationContext, productId: string) {
    const product = await this.ownedProduct(context, productId);
    if (product.archivedAt) throw new ConflictException("product-archived");
    if (product.publicationStatus === "under_review") throw new ConflictException("product-under-review");
    return product;
  }

  private requireArtist(context: AuthorizationContext) {
    if (context.activeRole !== "artist") throw new ForbiddenException();
  }
}

export function parseProductMediaUploadRequest(body: unknown): ProductMediaUploadRequest {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const value = body as Record<string, unknown>;
  if (Object.keys(value).some((key) => key !== "contentType" && key !== "contentLength")) {
    throw new BadRequestException();
  }
  if (typeof value.contentType !== "string" || !acceptedImageTypes.has(value.contentType)) {
    throw new BadRequestException();
  }
  if (typeof value.contentLength !== "number" || !Number.isSafeInteger(value.contentLength) ||
    value.contentLength < 1 || value.contentLength > maxImageBytes) {
    throw new BadRequestException();
  }
  return { contentType: value.contentType, contentLength: value.contentLength };
}
