import { Inject, Injectable } from "@nestjs/common";
import { canAccessStaffDomain, type AuthorizationContext } from "@negarin/authz";
import type { ObjectStorage } from "@negarin/storage";
import { PrismaService } from "./prisma.service.js";
import { enforceDecision } from "./authorization.guard.js";
import { OBJECT_STORAGE } from "./artist-product-media.js";

@Injectable()
export class StaffServiceDeliverablesService {
  constructor(
    private readonly database: PrismaService,
    @Inject(OBJECT_STORAGE) private readonly storage: ObjectStorage
  ) {}

  async list(context: AuthorizationContext) {
    enforceDecision(canAccessStaffDomain(context, "services"));
    const deliverables = await this.database.serviceDeliverable.findMany({
      where: { status: "ready", submission: { isNot: null } },
      orderBy: { submission: { createdAt: "asc" } },
      select: {
        id: true,
        fileName: true,
        contentType: true,
        contentLength: true,
        objectKey: true,
        createdAt: true,
        submission: { select: { createdAt: true } },
        assignment: {
          select: {
            id: true,
            serviceRequest: { select: { partnerTitle: true, partnerSummary: true } },
            partnerOrganization: { select: { displayName: true } }
          }
        }
      }
    });

    const result = await Promise.all(deliverables.map(async (deliverable) => {
      const submission = deliverable.submission;
      if (!submission) return null;
      return {
        deliverableId: deliverable.id,
        assignmentId: deliverable.assignment.id,
        title: deliverable.assignment.serviceRequest.partnerTitle,
        summary: deliverable.assignment.serviceRequest.partnerSummary,
        partnerOrganizationName: deliverable.assignment.partnerOrganization.displayName,
        fileName: deliverable.fileName,
        contentType: deliverable.contentType,
        contentLength: deliverable.contentLength,
        uploadedAt: deliverable.createdAt.toISOString(),
        submittedAt: submission.createdAt.toISOString(),
        readUrl: await this.storage.createReadUrl(deliverable.objectKey)
      };
    }));
    return result.filter((item): item is NonNullable<typeof item> => item !== null);
  }
}
