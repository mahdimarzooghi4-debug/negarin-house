import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { canReadServiceRequest, type AuthorizationContext } from "@negarin/authz";
import { PrismaService } from "./prisma.service.js";
import { enforceDecision } from "./authorization.guard.js";

@Injectable()
export class ServicePartnerAssignmentsService {
  constructor(private readonly database: PrismaService) {}

  async list(context: AuthorizationContext) {
    // Reject invalid role/context before issuing a tenant query.
    enforceDecision(canReadServiceRequest(context, {
      assignedPartnerOrganizationId: context.organizationId ?? null
    }));

    const assignments = await this.database.serviceAssignment.findMany({
      where: {
        partnerOrganizationId: context.organizationId!,
        OR: [
          { assignedPartnerUserId: null },
          { assignedPartnerUserId: context.userId }
        ]
      },
      orderBy: [{ assignedAt: "desc" }, { id: "asc" }],
      select: {
        id: true,
        partnerOrganizationId: true,
        assignedPartnerUserId: true,
        assignedAt: true,
        responseStatus: true,
        serviceRequest: {
          select: {
            id: true,
            partnerTitle: true,
            partnerSummary: true,
            createdAt: true
          }
        }
      }
    });

    return assignments.map((assignment) => {
      enforceDecision(canReadServiceRequest(context, {
        assignedPartnerOrganizationId: assignment.partnerOrganizationId,
        assignedPartnerUserId: assignment.assignedPartnerUserId
      }));
      return {
        assignmentId: assignment.id,
        requestId: assignment.serviceRequest.id,
        title: assignment.serviceRequest.partnerTitle,
        summary: assignment.serviceRequest.partnerSummary,
        assignedAt: assignment.assignedAt.toISOString(),
        requestedAt: assignment.serviceRequest.createdAt.toISOString(),
        responseStatus: assignment.responseStatus
      };
    });
  }

  async get(context: AuthorizationContext, assignmentId: string) {
    // Reject invalid role/context before issuing a tenant query.
    enforceDecision(canReadServiceRequest(context, {
      assignedPartnerOrganizationId: context.organizationId ?? null
    }));

    const assignment = await this.database.serviceAssignment.findFirst({
      where: {
        id: assignmentId,
        partnerOrganizationId: context.organizationId!,
        OR: [
          { assignedPartnerUserId: null },
          { assignedPartnerUserId: context.userId }
        ]
      },
      select: {
        id: true,
        partnerOrganizationId: true,
        assignedPartnerUserId: true,
        assignedAt: true,
        responseStatus: true,
        responseEvents: { select: { type: true, createdAt: true } },
        deliverables: {
          orderBy: [{ createdAt: "asc" }, { id: "asc" }],
          select: {
            fileName: true,
            status: true,
            createdAt: true,
            submission: { select: { createdAt: true } }
          }
        },
        serviceRequest: {
          select: {
            id: true,
            partnerTitle: true,
            partnerSummary: true,
            createdAt: true
          }
        }
      }
    });

    if (!assignment) return null;
    enforceDecision(canReadServiceRequest(context, {
      assignedPartnerOrganizationId: assignment.partnerOrganizationId,
      assignedPartnerUserId: assignment.assignedPartnerUserId
    }));
    const history: ServicePartnerAssignmentHistoryEvent[] = [
      { type: "assigned", createdAt: assignment.assignedAt.toISOString() }
    ];
    for (const event of assignment.responseEvents) {
      history.push({
        type: event.type as "accepted" | "declined",
        createdAt: event.createdAt.toISOString()
      });
    }
    for (const deliverable of assignment.deliverables) {
      history.push({
        type: "deliverable_added",
        createdAt: deliverable.createdAt.toISOString(),
        fileName: deliverable.fileName,
        uploadStatus: deliverable.status
      });
      if (deliverable.submission) {
        history.push({
          type: "deliverable_submitted",
          createdAt: deliverable.submission.createdAt.toISOString(),
          fileName: deliverable.fileName
        });
      }
    }
    history.sort((left, right) => left.createdAt.localeCompare(right.createdAt));

    return {
      assignmentId: assignment.id,
      requestId: assignment.serviceRequest.id,
      title: assignment.serviceRequest.partnerTitle,
      summary: assignment.serviceRequest.partnerSummary,
      assignedAt: assignment.assignedAt.toISOString(),
      requestedAt: assignment.serviceRequest.createdAt.toISOString(),
      responseStatus: assignment.responseStatus,
      history
    };
  }

  async respond(context: AuthorizationContext, assignmentId: string, response: ServiceAssignmentResponse) {
    enforceDecision(canReadServiceRequest(context, {
      assignedPartnerOrganizationId: context.organizationId ?? null
    }));

    const assignment = await this.database.serviceAssignment.findFirst({
      where: {
        id: assignmentId,
        partnerOrganizationId: context.organizationId!,
        OR: [{ assignedPartnerUserId: null }, { assignedPartnerUserId: context.userId }]
      },
      select: { id: true, partnerOrganizationId: true, assignedPartnerUserId: true, responseStatus: true }
    });
    if (!assignment) throw new NotFoundException();
    enforceDecision(canReadServiceRequest(context, {
      assignedPartnerOrganizationId: assignment.partnerOrganizationId,
      assignedPartnerUserId: assignment.assignedPartnerUserId
    }));
    if (assignment.responseStatus !== "awaiting_response") {
      throw new ConflictException("service-assignment-already-answered");
    }

    return this.database.$transaction(async (transaction) => {
      const updated = await transaction.serviceAssignment.updateMany({
        where: {
          id: assignment.id,
          partnerOrganizationId: context.organizationId!,
          OR: [{ assignedPartnerUserId: null }, { assignedPartnerUserId: context.userId }],
          responseStatus: "awaiting_response"
        },
        data: { responseStatus: response, respondedAt: new Date() }
      });
      if (updated.count !== 1) throw new ConflictException("service-assignment-already-answered");
      await transaction.serviceAssignmentEvent.create({
        data: {
          id: randomUUID(),
          assignmentId: assignment.id,
          actorUserId: context.userId,
          type: response
        }
      });
      return { assignmentId: assignment.id, responseStatus: response };
    });
  }
}

export type ServiceAssignmentResponse = "accepted" | "declined";

export type ServicePartnerAssignmentHistoryEvent = {
  type: "assigned" | "accepted" | "declined" | "deliverable_added" | "deliverable_submitted";
  createdAt: string;
  fileName?: string;
  uploadStatus?: "pending" | "ready";
};

export function parseServiceAssignmentResponse(body: unknown): ServiceAssignmentResponse {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const value = body as Record<string, unknown>;
  if (Object.keys(value).length !== 1 || Object.keys(value)[0] !== "response" ||
    (value.response !== "accepted" && value.response !== "declined")) throw new BadRequestException();
  return value.response;
}
