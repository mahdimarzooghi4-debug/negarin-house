import { randomUUID } from "node:crypto";
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { canAccessStaffDomain, canEditArtistProduct, type AuthorizationContext } from "@negarin/authz";
import { loadConfig } from "@negarin/config";
import { S3ObjectStorage, type ObjectStorage } from "@negarin/storage";
import sharp from "sharp";
import { PrismaService } from "./prisma.service.js";
import { enforceDecision } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { productContentSnapshot } from "./product-specifications.js";

export const maxImageBytes = 5 * 1024 * 1024;
export const maxGalleryImages = 8;
export function parseImageCommand(body: unknown, upload: boolean) {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const input = body as Record<string, unknown>;
  const fields = upload ? ["version", "base64"] : ["version", "imageIds"];
  if (Object.keys(input).some((key) => !fields.includes(key)) || !Number.isInteger(input.version) ||
    (input.version as number) < 0 || (input.version as number) >= 2147483647) throw new BadRequestException();
  if (upload) {
    if (typeof input.base64 !== "string" || input.base64.length > Math.ceil(maxImageBytes / 3) * 4 ||
      !/^[A-Za-z0-9+/]*={0,2}$/.test(input.base64)) throw new BadRequestException("invalid-image-base64");
    const bytes = Buffer.from(input.base64, "base64");
    if (!bytes.length || bytes.length > maxImageBytes || bytes.toString("base64") !== input.base64) throw new BadRequestException("invalid-image-size");
    return { version: input.version as number, bytes, imageIds: [] as string[] };
  }
  if (!Array.isArray(input.imageIds) || input.imageIds.length > maxGalleryImages ||
    input.imageIds.some((id) => typeof id !== "string")) throw new BadRequestException();
  const imageIds = (input.imageIds as string[]).map(parseArtistProductId);
  if (new Set(imageIds.map((id) => id.toLowerCase())).size !== imageIds.length) throw new BadRequestException();
  return { version: input.version as number, bytes: Buffer.alloc(0), imageIds: imageIds.map((id) => id.toLowerCase()) };
}

export async function normalizeProductImage(bytes: Buffer) {
  try {
    const pipeline = sharp(bytes, { limitInputPixels: 16_000_000, failOn: "warning" });
    const metadata = await pipeline.metadata();
    if (!["jpeg", "png", "webp"].includes(metadata.format ?? "") || (metadata.pages ?? 1) > 1) throw new Error("unsupported-image");
    if (metadata.format === "png") {
      for (let offset = 8; offset + 12 <= bytes.length;) {
        const length = bytes.readUInt32BE(offset);
        if (bytes.toString("ascii", offset + 4, offset + 8) === "acTL") throw new Error("animated-png");
        offset += 12 + length;
      }
    }
    // Fully decode pixels and strip metadata before committing a private, immutable WebP.
    const { data, info } = await pipeline.timeout({ seconds: 10 }).rotate().webp({ quality: 85 }).toBuffer({ resolveWithObject: true });
    if (data.length > maxImageBytes) throw new Error("image-too-large");
    return { data, width: info.width, height: info.height };
  } catch { throw new BadRequestException("invalid-product-image"); }
}

@Injectable()
export class ProductImageStorage {
  readonly store: ObjectStorage;
  constructor() {
    const config = loadConfig();
    this.store = new S3ObjectStorage({ endpoint: config.S3_ENDPOINT, region: config.S3_REGION,
      bucket: config.S3_BUCKET, accessKeyId: config.S3_ACCESS_KEY_ID, secretAccessKey: config.S3_SECRET_ACCESS_KEY,
      signedUrlExpiresSeconds: 300 });
  }
}

@Injectable()
export class ProductImagesService {
  constructor(private readonly db: PrismaService, private readonly storage: ProductImageStorage) {}

  private async owned(context: AuthorizationContext, id: string) {
    if (context.activeRole !== "artist") throw new ForbiddenException();
    const product = await this.db.artistProduct.findUnique({ where: { id } });
    if (!product) throw new NotFoundException();
    enforceDecision(canEditArtistProduct(context, product));
    return product;
  }

  private editable(product: { archivedAt: Date | null; publicationStatus: string; version: number }, version: number) {
    if (product.archivedAt || product.version !== version || !["draft", "changes_requested", "approved"].includes(product.publicationStatus)) {
      throw new ConflictException("product-state-changed");
    }
  }

  async upload(context: AuthorizationContext, id: string, version: number, bytes: Buffer, requestId: string) {
    const product = await this.owned(context, id);
    this.editable(product, version);
    if (product.imageIds.length >= maxGalleryImages) throw new ConflictException("product-gallery-full");
    // Retained history consumes storage; an explicit per-product lifetime cap bounds this slice.
    if (await this.db.productImage.count({ where: { productId: id } }) >= 100) throw new ConflictException("product-media-limit");
    const image = await normalizeProductImage(bytes);
    const imageId = randomUUID(), objectKey = `product-images/${id}/${imageId}.webp`;
    try { await this.storage.store.putImmutableObject(objectKey, image.data, "image/webp"); }
    catch { throw new ServiceUnavailableException("image-storage-unavailable"); }
    try {
      return await this.db.$transaction(async (tx) => {
        const imageIds = [...product.imageIds, imageId];
        const changed = await tx.artistProduct.updateMany({ where: { id, version, archivedAt: null, publicationStatus: product.publicationStatus },
          data: { imageIds, version: { increment: 1 }, publicationStatus: product.publicationStatus === "approved" ? "draft" : product.publicationStatus } });
        if (changed.count !== 1) throw new ConflictException("product-state-changed");
        await tx.productImage.create({ data: { id: imageId, productId: id, objectKey, width: image.width, height: image.height, byteLength: image.data.length } });
        await tx.productPublicationEvent.create({ data: {
          productId: id, actorUserId: context.userId, actorRole: "artist", action: "images-updated",
          fromStatus: product.publicationStatus, toStatus: product.publicationStatus === "approved" ? "draft" : product.publicationStatus,
          version: version + 1, content: productContentSnapshot({ ...product, imageIds }), requestId
        } });
        return { id: imageId, width: image.width, height: image.height, byteLength: image.data.length, imageIds, version: version + 1 };
      });
    } catch (error) {
      // Only uncommitted keys are deleted. Committed/history media is never overwritten or deleted.
      try {
        // A connection loss can make commit outcome uncertain: retain any committed key.
        const committed = await this.db.productImage.findUnique({ where: { id: imageId } });
        if (!committed) await this.storage.store.deleteObject(objectKey);
      } catch { /* Uncertain/private orphans require a later reconciliation task. */ }
      throw error;
    }
  }

  async gallery(context: AuthorizationContext, id: string, version: number, imageIds: string[], requestId: string) {
    const product = await this.owned(context, id);
    this.editable(product, version);
    const count = await this.db.productImage.count({ where: { productId: id, id: { in: imageIds } } });
    if (count !== imageIds.length) throw new NotFoundException();
    if (JSON.stringify(product.imageIds) === JSON.stringify(imageIds)) return { imageIds, version };
    return this.db.$transaction(async (tx) => {
      const changed = await tx.artistProduct.updateMany({ where: { id, version, archivedAt: null, publicationStatus: product.publicationStatus },
        data: { imageIds, version: { increment: 1 }, publicationStatus: product.publicationStatus === "approved" ? "draft" : product.publicationStatus } });
      if (changed.count !== 1) throw new ConflictException("product-state-changed");
      await tx.productPublicationEvent.create({ data: {
        productId: id, actorUserId: context.userId, actorRole: "artist", action: "images-updated",
        fromStatus: product.publicationStatus, toStatus: product.publicationStatus === "approved" ? "draft" : product.publicationStatus,
        version: version + 1, content: productContentSnapshot({ ...product, imageIds }), requestId
      } });
      return { imageIds, version: version + 1 };
    });
  }

  async read(context: AuthorizationContext, id: string, imageId: string, staff = false) {
    if (staff) enforceDecision(canAccessStaffDomain(context, "products"));
    else await this.owned(context, id);
    const image = await this.db.productImage.findFirst({ where: { id: imageId, productId: id } });
    if (!image) throw new NotFoundException();
    try {
      return { id: image.id, width: image.width, height: image.height, byteLength: image.byteLength,
        contentType: "image/webp", url: await this.storage.store.createReadUrl(image.objectKey), expiresInSeconds: 300 };
    } catch { throw new ServiceUnavailableException("image-storage-unavailable"); }
  }
}
