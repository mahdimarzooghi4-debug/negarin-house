import { describe, expect, it, vi } from "vitest";
import { BadRequestException } from "@nestjs/common";
import type { ObjectStorage } from "@negarin/storage";
import type { AuthorizationContext } from "@negarin/authz";
import { parsePublicationReviewDecision, PublicationReviewService } from "./publication-review.js";
import type { PrismaService } from "./prisma.service.js";

describe("Publication review request contract", () => {
  it("accepts approval without feedback and requires feedback for requested changes", () => {
    expect(parsePublicationReviewDecision({ decision: "approved" })).toEqual({ decision: "approved" });
    expect(parsePublicationReviewDecision({ decision: "changes_requested", feedback: "تصویر واضح نیست" }))
      .toEqual({ decision: "changes_requested", feedback: "تصویر واضح نیست" });
    expect(() => parsePublicationReviewDecision({ decision: "changes_requested", feedback: "   " }))
      .toThrow(BadRequestException);
  });

  it("rejects unsupported decisions and any attempt to send product pricing", () => {
    expect(() => parsePublicationReviewDecision({ decision: "published" })).toThrow(BadRequestException);
    expect(() => parsePublicationReviewDecision({ decision: "approved", priceToman: "1" }))
      .toThrow(BadRequestException);
  });

  it("shows ready product images to permitted reviewers without exposing Artist price or storage keys", async () => {
    const database = {
      artistProduct: {
        findMany: vi.fn().mockResolvedValue([{
          id: "product-id",
          title: "گلدان",
          description: "توضیح",
          priceToman: 800000n,
          publicationStatus: "under_review",
          createdAt: new Date("2026-09-29T10:00:00.000Z"),
          media: [{ id: "media-id", objectKey: "private/object-key", contentType: "image/jpeg" }]
        }])
      }
    };
    const storage = { createReadUrl: vi.fn().mockResolvedValue("https://storage/read?signature=private") };
    const service = new PublicationReviewService(
      database as unknown as PrismaService,
      storage as unknown as ObjectStorage
    );
    const context: AuthorizationContext = {
      userId: "reviewer-id", activeRole: "staff", staffPermissionDomains: ["products"]
    };

    await expect(service.queue(context)).resolves.toEqual([{
      id: "product-id",
      title: "گلدان",
      description: "توضیح",
      publicationStatus: "under_review",
      createdAt: "2026-09-29T10:00:00.000Z",
      media: [{ id: "media-id", contentType: "image/jpeg", readUrl: "https://storage/read?signature=private" }]
    }]);
    expect(storage.createReadUrl).toHaveBeenCalledWith("private/object-key");
  });
});
