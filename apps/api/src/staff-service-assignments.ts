import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { canAccessStaffDomain, type AuthorizationContext } from "@negarin/authz";
import { Prisma } from "./generated/prisma/client.js";
import { enforceDecision } from "./authorization.guard.js";
import { PrismaService } from "./prisma.service.js";

export type ServiceAssignmentInput = {
  requestId: string;
  partnerOrganizationId: string;
  assignedPartnerUserId?: string;
};

@Injectable()
export class StaffServiceAssignmentsService {
  constructor(private readonly database: PrismaService) {}

  async options(context: AuthorizationContext) {
    enforceDecision(canAccessStaffDomain(context, "services"));
    const [requests, organizations] = await Promise.all([
      this.database.serviceRequest.findMany({
        orderBy: [{ createdAt: "desc" }, { id: "asc" }],
        select: { id: true, partnerTitle: true, partnerSummary: true, createdAt: true }
      }),
      this.database.organization.findMany({
        where: { kind: "service_partner" },
        orderBy: [{ displayName: "asc" }, { id: "asc" }],
        select: { id: true, displayName: true }
      })
    ]);
    return {
      requests: requests.map((request) => ({
        id: request.id,
        title: request.partnerTitle,
        summary: request.partnerSummary,
        createdAt: request.createdAt.toISOString()
      })),
      organizations
    };
  }

  async assign(context: AuthorizationContext, input: ServiceAssignmentInput) {
    enforceDecision(canAccessStaffDomain(context, "services"));

    return this.database.$transaction(async (transaction) => {
      const request = await transaction.serviceRequest.findUnique({
        where: { id: input.requestId },
        select: { id: true, partnerTitle: true, partnerSummary: true }
      });
      if (!request) throw new NotFoundException();

      const organization = await transaction.organization.findFirst({
        where: { id: input.partnerOrganizationId, kind: "service_partner" },
        select: { id: true }
      });
      if (!organization) throw new NotFoundException();

      if (input.assignedPartnerUserId) {
        const activeMembership = await transaction.roleGrant.findFirst({
          where: {
            userId: input.assignedPartnerUserId,
            organizationId: organization.id,
            role: "service_partner",
            revokedAt: null
          },
          select: { id: true }
        });
        if (!activeMembership) throw new BadRequestException("assigned-user-not-an-active-member");
      }

      const assignment = await transaction.serviceAssignment.create({
        data: {
          serviceRequestId: request.id,
          partnerOrganizationId: organization.id,
          assignedPartnerUserId: input.assignedPartnerUserId ?? null,
          assignedByUserId: context.userId
        },
        select: {
          id: true,
          serviceRequestId: true,
          partnerOrganizationId: true,
          assignedPartnerUserId: true,
          assignedByUserId: true,
          assignedAt: true
        }
      });

      return {
        assignmentId: assignment.id,
        requestId: assignment.serviceRequestId,
        title: request.partnerTitle,
        summary: request.partnerSummary,
        partnerOrganizationId: assignment.partnerOrganizationId,
        assignedPartnerUserId: assignment.assignedPartnerUserId,
        assignedByUserId: assignment.assignedByUserId,
        assignedAt: assignment.assignedAt.toISOString()
      };
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
  }
}

export function parseServiceAssignmentInput(body: unknown): ServiceAssignmentInput {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const value = body as Record<string, unknown>;
  if (Object.keys(value).some((key) => !["requestId", "partnerOrganizationId", "assignedPartnerUserId"].includes(key))) {
    throw new BadRequestException();
  }
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (typeof value.requestId !== "string" || !uuid.test(value.requestId) ||
      typeof value.partnerOrganizationId !== "string" || !uuid.test(value.partnerOrganizationId)) {
    throw new BadRequestException();
  }
  if (value.assignedPartnerUserId !== undefined &&
      (typeof value.assignedPartnerUserId !== "string" || !uuid.test(value.assignedPartnerUserId))) {
    throw new BadRequestException();
  }
  return {
    requestId: value.requestId,
    partnerOrganizationId: value.partnerOrganizationId,
    ...(value.assignedPartnerUserId === undefined ? {} : { assignedPartnerUserId: value.assignedPartnerUserId as string })
  };
}
