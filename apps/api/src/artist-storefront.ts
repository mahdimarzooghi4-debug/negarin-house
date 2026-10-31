import { randomUUID } from "node:crypto";
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import type { AuthorizationContext } from "@negarin/authz";
import { PrismaService } from "./prisma.service.js";
import { maxImageBytes, normalizeProductImage, ProductImageStorage } from "./product-images.js";

export type ArtistStorefrontCommand = {
  version: number;
  storeName: string;
  shortIntro: string;
  about: string;
};

const limits = { storeName: 80, shortIntro: 180, about: 3000 } as const;
const maxStorefrontImages = 100;

export function parseArtistStorefrontImageCommand(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const value = body as Record<string, unknown>;
  if (Object.keys(value).some(key => !["version", "kind", "base64"].includes(key)) || !Number.isInteger(value.version) ||
      (value.version as number) < 0 || (value.version as number) >= 2_147_483_647 ||
      (value.kind !== "cover" && value.kind !== "avatar") || typeof value.base64 !== "string" ||
      value.base64.length > Math.ceil(maxImageBytes / 3) * 4 || !/^[A-Za-z0-9+/]*={0,2}$/.test(value.base64)) throw new BadRequestException();
  const bytes = Buffer.from(value.base64, "base64");
  if (!bytes.length || bytes.length > maxImageBytes || bytes.toString("base64") !== value.base64) throw new BadRequestException("invalid-image-size");
  return { version: value.version as number, kind: value.kind, bytes };
}

export function parseArtistStorefrontCommand(body: unknown): ArtistStorefrontCommand {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const value = body as Record<string, unknown>;
  if (Object.keys(value).some(key => !["version", ...Object.keys(limits)].includes(key)) ||
      !Number.isInteger(value.version) || (value.version as number) < 0 || (value.version as number) >= 2_147_483_647) {
    throw new BadRequestException();
  }
  const result = {} as Pick<ArtistStorefrontCommand, keyof typeof limits>;
  for (const [key, max] of Object.entries(limits) as Array<[keyof typeof limits, number]>) {
    const input = value[key];
    if (typeof input !== "string" || input.trim().length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(input)) {
      throw new BadRequestException(`invalid-${key}`);
    }
    const normalized = input.trim();
    if (key === "storeName" && normalized.length < 2) throw new BadRequestException("invalid-storeName");
    result[key] = normalized;
  }
  return { version: value.version as number, ...result };
}

@Injectable()
export class ArtistStorefrontService {
  constructor(private readonly db: PrismaService, private readonly storage: ProductImageStorage) {}

  private requireArtist(context: AuthorizationContext) {
    if (context.activeRole !== "artist") throw new ForbiddenException();
  }

  async get(context: AuthorizationContext) {
    this.requireArtist(context);
    await this.db.artistStorefront.createMany({ data: [{ artistUserId: context.userId }], skipDuplicates: true });
    return this.db.artistStorefront.findUniqueOrThrow({ where: { artistUserId: context.userId }, select: {
      id: true, storeName: true, shortIntro: true, about: true, coverImageId: true, avatarImageId: true, version: true, updatedAt: true
    } }).then(row => ({ ...row, updatedAt: row.updatedAt.toISOString() }));
  }

  async update(context: AuthorizationContext, command: ArtistStorefrontCommand, requestId: string) {
    this.requireArtist(context);
    return this.db.$transaction(async tx => {
      await tx.artistStorefront.createMany({ data: [{ artistUserId: context.userId }], skipDuplicates: true });
      const current = await tx.artistStorefront.findUniqueOrThrow({ where: { artistUserId: context.userId } });
      if (current.version !== command.version) throw new ConflictException("storefront-state-changed");
      const changed = current.storeName !== command.storeName || current.shortIntro !== command.shortIntro || current.about !== command.about;
      if (changed) {
        const result = await tx.artistStorefront.updateMany({ where: { id: current.id, version: command.version }, data: {
          storeName: command.storeName, shortIntro: command.shortIntro, about: command.about, version: { increment: 1 }
        } });
        if (result.count !== 1) throw new ConflictException("storefront-state-changed");
        await tx.artistStorefrontEvent.create({ data: {
          storefrontId: current.id, actorUserId: context.userId, version: command.version + 1, requestId,
          snapshot: { storeName: command.storeName, shortIntro: command.shortIntro, about: command.about,
            coverImageId: current.coverImageId, avatarImageId: current.avatarImageId }
        } });
      }
      const row = await tx.artistStorefront.findUniqueOrThrow({ where: { id: current.id }, select: {
        id: true, storeName: true, shortIntro: true, about: true, coverImageId: true, avatarImageId: true, version: true, updatedAt: true
      } });
      return { ...row, updatedAt: row.updatedAt.toISOString() };
    });
  }

  async uploadImage(context: AuthorizationContext, command: ReturnType<typeof parseArtistStorefrontImageCommand>, requestId: string) {
    this.requireArtist(context);
    await this.db.artistStorefront.createMany({ data: [{ artistUserId: context.userId }], skipDuplicates: true });
    const storefront = await this.db.artistStorefront.findUniqueOrThrow({ where: { artistUserId: context.userId } });
    if (storefront.version !== command.version) throw new ConflictException("storefront-state-changed");
    if (await this.db.artistStorefrontImage.count({ where: { storefrontId: storefront.id } }) >= maxStorefrontImages) throw new ConflictException("storefront-media-limit");
    const normalized = await normalizeProductImage(command.bytes);
    const imageId = randomUUID();
    const objectKey = `artist-storefront-images/${storefront.id}/${imageId}.webp`;
    try { await this.storage.store.putImmutableObject(objectKey, normalized.data, "image/webp"); }
    catch { throw new ServiceUnavailableException("image-storage-unavailable"); }
    try {
      await this.db.$transaction(async tx => {
        const data = command.kind === "cover"
          ? { coverImageId: imageId, version: { increment: 1 } }
          : { avatarImageId: imageId, version: { increment: 1 } };
        const changed = await tx.artistStorefront.updateMany({ where: { id: storefront.id, artistUserId: context.userId, version: command.version }, data });
        if (changed.count !== 1) throw new ConflictException("storefront-state-changed");
        await tx.artistStorefrontImage.create({ data: { id: imageId, storefrontId: storefront.id, objectKey,
          width: normalized.width, height: normalized.height, byteLength: normalized.data.length } });
        await tx.artistStorefrontEvent.create({ data: { storefrontId: storefront.id, actorUserId: context.userId,
          version: command.version + 1, requestId, snapshot: { storeName: storefront.storeName, shortIntro: storefront.shortIntro,
            about: storefront.about, coverImageId: command.kind === "cover" ? imageId : storefront.coverImageId,
            avatarImageId: command.kind === "avatar" ? imageId : storefront.avatarImageId } } });
      });
    } catch (error) {
      try {
        const committed = await this.db.artistStorefrontImage.findUnique({ where: { id: imageId } });
        if (!committed) await this.storage.store.deleteObject(objectKey);
      } catch { /* Preserve keys when transaction outcome is uncertain. */ }
      throw error;
    }
    return { ...(await this.read(context, storefront.id, imageId)), kind: command.kind, version: command.version + 1 };
  }

  async read(context: AuthorizationContext | null, storefrontId: string, imageId: string, isPublic = false) {
    let storefront;
    if (isPublic) {
      storefront = await this.db.artistStorefront.findFirst({ where: { id: storefrontId, artist: { artistProducts: { some: { publicationStatus: "published", archivedAt: null } } } } });
    } else {
      if (!context || context.activeRole !== "artist") throw new ForbiddenException();
      storefront = await this.db.artistStorefront.findFirst({ where: { id: storefrontId, artistUserId: context.userId } });
    }
    if (!storefront || (storefront.coverImageId !== imageId && storefront.avatarImageId !== imageId)) throw new NotFoundException();
    const image = await this.db.artistStorefrontImage.findFirst({ where: { id: imageId, storefrontId } });
    if (!image) throw new NotFoundException();
    try { return { id: image.id, width: image.width, height: image.height, byteLength: image.byteLength,
      contentType: "image/webp", url: await this.storage.store.createReadUrl(image.objectKey), expiresInSeconds: 300 }; }
    catch { throw new ServiceUnavailableException("image-storage-unavailable"); }
  }
}
