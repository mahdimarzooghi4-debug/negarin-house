import { describe, expect, it, vi } from "vitest";
import { BadRequestException, ConflictException, NotFoundException } from "@nestjs/common";
import type { ObjectStorage } from "@negarin/storage";
import type { AuthorizationContext } from "@negarin/authz";
import { ArtistProductMediaService, parseProductMediaUploadRequest } from "./artist-product-media.js";
import type { PrismaService } from "./prisma.service.js";

const productId = "e93cae00-ec35-4a37-901f-a262274af101";
const mediaId = "b562f3d4-3bd7-4ace-9d5d-772f42fe9859";
const context: AuthorizationContext = { userId: "2f22090e-cc00-4eaa-ae16-7cfac80d082b", activeRole: "artist" };

function fixture(stored = { contentType: "image/jpeg", contentLength: 1024 }, publicationStatus = "draft") {
  const database = {
    artistProduct: {
      findUnique: vi.fn().mockResolvedValue({
        id: productId,
        artistUserId: context.userId,
        archivedAt: null,
        publicationStatus
      }),
      updateMany: vi.fn().mockResolvedValue({ count: 1 })
    },
    artistProductMedia: {
      create: vi.fn().mockResolvedValue({ id: mediaId }),
      findFirst: vi.fn().mockResolvedValue({
        id: mediaId, productId, objectKey: `artists/${context.userId}/products/${productId}/key`,
        contentType: "image/jpeg", contentLength: 1024, status: "pending"
      }),
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      delete: vi.fn()
    }
  };
  Object.assign(database, {
    $transaction: vi.fn(async (callback: (transaction: typeof database) => Promise<unknown>) => callback(database))
  });
  const storage = {
    createUploadUrl: vi.fn().mockResolvedValue({ objectKey: "ignored", url: "https://storage/upload", expiresAt: "2026-09-29T14:00:00.000Z" }),
    getObjectMetadata: vi.fn().mockResolvedValue(stored),
    copyObject: vi.fn().mockResolvedValue(undefined),
    createReadUrl: vi.fn(),
    deleteObject: vi.fn()
  };
  return {
    database,
    storage,
    service: new ArtistProductMediaService(database as unknown as PrismaService, storage as unknown as ObjectStorage)
  };
}

describe("Artist product media upload contract", () => {
  it.each(["image/jpeg", "image/png", "image/webp"])("accepts %s with a bounded integer size", (contentType) => {
    expect(parseProductMediaUploadRequest({ contentType, contentLength: 1024 }))
      .toEqual({ contentType, contentLength: 1024 });
  });

  it.each([
    { contentType: "image/svg+xml", contentLength: 10 },
    { contentType: "image/png", contentLength: 0 },
    { contentType: "image/png", contentLength: 10.5 },
    { contentType: "image/png", contentLength: 10 * 1024 * 1024 + 1 },
    { contentType: "image/png", contentLength: 10, objectKey: "artist/other-product" }
  ])("rejects invalid or client-controlled upload metadata", (input) => {
    expect(() => parseProductMediaUploadRequest(input)).toThrow(BadRequestException);
  });

  it("issues a signed URL with a server-generated key scoped to the owning Artist and product", async () => {
    const { service, storage, database } = fixture();
    const result = await service.requestUpload(context, productId, { contentType: "image/jpeg", contentLength: 1024 });

    expect(result.uploadUrl).toBe("https://storage/upload");
    expect(storage.createUploadUrl).toHaveBeenCalledWith(expect.objectContaining({
      objectKey: expect.stringMatching(new RegExp(`^artists/${context.userId}/products/${productId}/`)),
      contentType: "image/jpeg",
      contentLength: 1024
    }));
    expect(database.artistProductMedia.create).toHaveBeenCalledOnce();
  });

  it("refreshes an upload URL for the same pending object and exact signed metadata", async () => {
    const { service, storage } = fixture();
    const result = await service.refreshUploadUrl(context, productId, mediaId);

    expect(result).toEqual({ id: mediaId, uploadUrl: "https://storage/upload", expiresAt: "2026-09-29T14:00:00.000Z" });
    expect(storage.createUploadUrl).toHaveBeenCalledWith({
      objectKey: `artists/${context.userId}/products/${productId}/key`,
      contentType: "image/jpeg",
      contentLength: 1024
    });
  });

  it("does not refresh a completed media upload", async () => {
    const { service, storage, database } = fixture();
    database.artistProductMedia.findFirst.mockResolvedValue({
      id: mediaId, productId, objectKey: "ready-key", contentType: "image/jpeg", contentLength: 1024, status: "ready"
    });

    await expect(service.refreshUploadUrl(context, productId, mediaId)).rejects.toThrow(ConflictException);
    expect(storage.createUploadUrl).not.toHaveBeenCalled();
  });

  it("does not reveal media belonging to another product", async () => {
    const { service, storage, database } = fixture();
    database.artistProductMedia.findFirst.mockResolvedValue(null);

    await expect(service.refreshUploadUrl(context, productId, mediaId)).rejects.toThrow(NotFoundException);
    expect(storage.createUploadUrl).not.toHaveBeenCalled();
  });

  it("marks media ready only after stored length and content type match the upload contract", async () => {
    const { service, storage, database } = fixture();
    await expect(service.completeUpload(context, productId, mediaId)).resolves.toEqual({ id: mediaId, status: "ready" });
    expect(storage.getObjectMetadata).toHaveBeenCalledOnce();
    expect(storage.copyObject).toHaveBeenCalledWith(
      `artists/${context.userId}/products/${productId}/key`,
      expect.stringMatching(new RegExp(`^artists/${context.userId}/products/${productId}/`))
    );
    expect(storage.deleteObject).toHaveBeenCalledWith(`artists/${context.userId}/products/${productId}/key`);
    expect(database.artistProductMedia.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ id: mediaId, productId, status: "pending" }),
      data: expect.objectContaining({
        status: "ready",
        objectKey: expect.stringMatching(new RegExp(`^artists/${context.userId}/products/${productId}/`))
      })
    }));
  });

  it("returns an approved product to draft when a new image is attached", async () => {
    const { service, database } = fixture({ contentType: "image/jpeg", contentLength: 1024 }, "approved");
    await expect(service.completeUpload(context, productId, mediaId)).resolves.toEqual({ id: mediaId, status: "ready" });
    expect(database.artistProduct.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: productId, archivedAt: null, publicationStatus: "approved" },
      data: { publicationStatus: "draft" }
    }));
  });

  it("does not accept a stored object whose metadata differs from the signed upload", async () => {
    const { service, database } = fixture({ contentType: "image/png", contentLength: 2048 });
    await expect(service.completeUpload(context, productId, mediaId)).rejects.toThrow(BadRequestException);
    expect(database.artistProductMedia.updateMany).not.toHaveBeenCalled();
  });
});
