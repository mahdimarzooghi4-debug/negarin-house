import { Injectable } from "@nestjs/common";
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
        requestedAt: assignment.serviceRequest.createdAt.toISOString()
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
    return {
      assignmentId: assignment.id,
      requestId: assignment.serviceRequest.id,
      title: assignment.serviceRequest.partnerTitle,
      summary: assignment.serviceRequest.partnerSummary,
      assignedAt: assignment.assignedAt.toISOString(),
      requestedAt: assignment.serviceRequest.createdAt.toISOString()
    };
  }
}
