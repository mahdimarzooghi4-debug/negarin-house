import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { canAccessStaffDomain, type AuthorizationContext } from "@negarin/authz";
import type { ObjectStorage } from "@negarin/storage";
import { Prisma } from "./generated/prisma/client.js";
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
        submission: { select: { id: true, createdAt: true, review: { select: { decision: true, feedback: true, createdAt: true } } } },
        assignment: {
          select: {
            id: true,
            assignedAt: true,
            completedAt: true,
            responseEvents: { select: { type: true, createdAt: true } },
            serviceRequest: { select: { partnerTitle: true, partnerSummary: true } },
            partnerOrganization: { select: { displayName: true } }
          }
        }
      }
    });

    const result = await Promise.all(deliverables.map(async (deliverable) => {
      const submission = deliverable.submission;
      if (!submission) return null;
      const history: StaffServiceDeliverableHistoryEvent[] = [
        { type: "assigned", createdAt: deliverable.assignment.assignedAt.toISOString() }
      ];
      for (const event of deliverable.assignment.responseEvents) {
        history.push({
          type: event.type as "accepted" | "declined",
          createdAt: event.createdAt.toISOString()
        });
      }
      history.push({
        type: "deliverable_added",
        createdAt: deliverable.createdAt.toISOString(),
        fileName: deliverable.fileName,
        uploadStatus: "ready"
      });
      history.push({
        type: "deliverable_submitted",
        createdAt: submission.createdAt.toISOString(),
        fileName: deliverable.fileName
      });
      if (submission.review) {
        history.push({
          type: submission.review.decision === "approved" ? "deliverable_approved" : "deliverable_changes_requested",
          createdAt: submission.review.createdAt.toISOString(),
          fileName: deliverable.fileName
        });
      }
      if (deliverable.assignment.completedAt) {
        history.push({ type: "service_completed", createdAt: deliverable.assignment.completedAt.toISOString() });
      }
      history.sort((left, right) => left.createdAt.localeCompare(right.createdAt));
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
        review: submission.review ? {
          decision: submission.review.decision,
          feedback: submission.review.feedback,
          reviewedAt: submission.review.createdAt.toISOString()
        } : null,
        assignmentCompletedAt: deliverable.assignment.completedAt?.toISOString() ?? null,
        history,
        readUrl: await this.storage.createReadUrl(deliverable.objectKey)
      };
    }));
    return result.filter((item): item is NonNullable<typeof item> => item !== null);
  }

  async review(context: AuthorizationContext, deliverableId: string, decision: ServiceDeliverableReviewDecision, feedback?: string) {
    enforceDecision(canAccessStaffDomain(context, "services"));
    if (decision === "changes_requested" && !feedback?.trim()) throw new BadRequestException();

    return this.database.$transaction(async (transaction) => {
      const submission = await transaction.serviceDeliverableSubmission.findFirst({
        where: { deliverableId },
        select: {
          id: true,
          review: { select: { id: true } },
          deliverable: { select: { id: true, status: true, assignmentId: true, assignment: { select: { completedAt: true } } } }
        }
      });
      if (!submission) throw new NotFoundException();
      if (submission.deliverable.status !== "ready") throw new ConflictException("deliverable-not-ready");
      if (submission.review) throw new ConflictException("deliverable-already-reviewed");
      if (submission.deliverable.assignment.completedAt) throw new ConflictException("service-assignment-completed");

      const created = await transaction.serviceDeliverableReviewEvent.createMany({
        data: [{
          id: randomUUID(),
          submissionId: submission.id,
          actorUserId: context.userId,
          decision,
          feedback: feedback?.trim() || null
        }],
        skipDuplicates: true
      });
      if (created.count !== 1) throw new ConflictException("deliverable-already-reviewed");
      const review = await transaction.serviceDeliverableReviewEvent.findUnique({ where: { submissionId: submission.id } });
      if (!review) throw new ConflictException("deliverable-review-not-recorded");
      let completedAt: Date | null = null;
      if (decision === "approved") {
        completedAt = new Date();
        const completion = await transaction.serviceAssignment.updateMany({
          where: { id: submission.deliverable.assignmentId, completedAt: null },
          data: { completedAt, completedByUserId: context.userId }
        });
        if (completion.count !== 1) throw new ConflictException("service-assignment-completion-changed");
      }
      return {
        deliverableId: submission.deliverable.id,
        decision: review.decision,
        feedback: review.feedback,
        reviewedAt: review.createdAt.toISOString(),
        completedAt: completedAt?.toISOString() ?? null
      };
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
  }
}

const reviewDecisions = ["approved", "changes_requested"] as const;
export type ServiceDeliverableReviewDecision = (typeof reviewDecisions)[number];

export function parseServiceDeliverableReview(body: unknown): { decision: ServiceDeliverableReviewDecision; feedback?: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const value = body as Record<string, unknown>;
  if (Object.keys(value).some((key) => key !== "decision" && key !== "feedback")) throw new BadRequestException();
  if (typeof value.decision !== "string" || !reviewDecisions.includes(value.decision as ServiceDeliverableReviewDecision)) {
    throw new BadRequestException();
  }
  if (value.feedback !== undefined && (typeof value.feedback !== "string" || value.feedback.length > 5000)) throw new BadRequestException();
  if (value.decision === "changes_requested" && (typeof value.feedback !== "string" || !value.feedback.trim())) throw new BadRequestException();
  return { decision: value.decision as ServiceDeliverableReviewDecision, ...(typeof value.feedback === "string" ? { feedback: value.feedback } : {}) };
}

export function parseServiceDeliverableId(value: string): string {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) {
    throw new BadRequestException();
  }
  return value;
}

export type StaffServiceDeliverableHistoryEvent = {
  type: "assigned" | "accepted" | "declined" | "deliverable_added" | "deliverable_submitted" | "deliverable_approved" | "deliverable_changes_requested" | "service_completed";
  createdAt: string;
  fileName?: string;
  uploadStatus?: "pending" | "ready";
};
