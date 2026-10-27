import { Injectable, NotFoundException } from "@nestjs/common";
import { canAccessStaffDomain, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import { PrismaService } from "./prisma.service.js";

@Injectable()
export class AdminServiceTraceService {
  constructor(private readonly db: PrismaService) {}

  async get(context: AuthorizationContext, requestId: string) {
    enforceDecision(canAccessStaffDomain(context, "services"));

    return this.db.$transaction(async tx => {
      const request = await tx.serviceRequest.findUnique({
        where: { id: requestId },
        select: {
          id: true, serviceCatalogItemId: true, artistUserId: true, createdByUserId: true,
          title: true, description: true, internalNote: true, status: true, version: true, createdAt: true
        }
      });
      if (!request) throw new NotFoundException();

      const [requestEvents, assignments, supportAllocations] = await Promise.all([
        tx.serviceRequestEvent.findMany({
          where: { requestId },
          orderBy: { version: "asc" },
          select: {
            id: true, version: true, action: true, assignmentId: true,
            actorUserId: true, requestTraceId: true, createdAt: true
          }
        }),
        tx.serviceAssignment.findMany({
          where: { requestId },
          orderBy: { assignedVersion: "asc" },
          select: {
            id: true, assignedVersion: true, partnerOrganizationId: true, partnerUserId: true,
            status: true, responseSummary: true, assignedAt: true, respondedAt: true,
            execution: {
              select: {
                status: true, version: true, scheduledStart: true, scheduledEnd: true,
                scheduleSummary: true, progressSummary: true, submissionSummary: true, reviewSummary: true,
                submittedFileIds: true, updatedAt: true,
                events: {
                  orderBy: { version: "asc" },
                  select: {
                    id: true, version: true, fromStatus: true, toStatus: true, summary: true,
                    actorUserId: true, requestTraceId: true, fileIds: true, createdAt: true
                  }
                },
                files: {
                  orderBy: { uploadedExecutionVersion: "asc" },
                  select: {
                    id: true, uploadedByUserId: true, uploadedExecutionVersion: true, label: true,
                    contentType: true, byteLength: true, sha256: true, createdAt: true
                  }
                }
              }
            }
          }
        }),
        tx.supportAllocation.findMany({
          where: { events: { some: { serviceRequestId: requestId } } },
          orderBy: [{ createdAt: "asc" }, { id: "asc" }],
          select: {
            id: true, amountToman: true, status: true, version: true, currentServiceRequestId: true, createdAt: true,
            program: { select: { id: true, title: true, source: true, organizationId: true } },
            relationship: { select: { id: true, artistUserId: true } },
            events: {
              where: { serviceRequestId: requestId },
              orderBy: { version: "asc" },
              select: { version: true, action: true, amountToman: true, actorUserId: true, createdAt: true }
            }
          }
        })
      ]);

      return {
        request: {
          id: request.id, serviceId: request.serviceCatalogItemId, artistUserId: request.artistUserId,
          createdByUserId: request.createdByUserId, title: request.title, description: request.description,
          internalNote: request.internalNote, status: request.status, version: request.version,
          createdAt: request.createdAt.toISOString(),
          history: requestEvents.map(event => ({
            id: event.id, version: event.version, action: event.action, assignmentId: event.assignmentId,
            actorUserId: event.actorUserId, requestTraceId: event.requestTraceId, createdAt: event.createdAt.toISOString()
          }))
        },
        assignments: assignments.map(assignment => ({
          id: assignment.id, assignedVersion: assignment.assignedVersion,
          partnerOrganizationId: assignment.partnerOrganizationId, partnerUserId: assignment.partnerUserId,
          status: assignment.status, responseSummary: assignment.responseSummary,
          assignedAt: assignment.assignedAt.toISOString(), respondedAt: assignment.respondedAt?.toISOString() ?? null,
          execution: assignment.execution ? {
            status: assignment.execution.status, version: assignment.execution.version,
            scheduledStart: assignment.execution.scheduledStart?.toISOString() ?? null,
            scheduledEnd: assignment.execution.scheduledEnd?.toISOString() ?? null,
            scheduleSummary: assignment.execution.scheduleSummary, progressSummary: assignment.execution.progressSummary,
            submissionSummary: assignment.execution.submissionSummary, reviewSummary: assignment.execution.reviewSummary,
            submittedFileIds: assignment.execution.submittedFileIds,
            updatedAt: assignment.execution.updatedAt.toISOString(),
            history: assignment.execution.events.map(event => ({
              id: event.id, version: event.version, fromStatus: event.fromStatus, toStatus: event.toStatus,
              summary: event.summary, actorUserId: event.actorUserId, requestTraceId: event.requestTraceId,
              fileIds: event.fileIds, createdAt: event.createdAt.toISOString()
            })),
            files: assignment.execution.files.map(file => ({
              id: file.id, uploadedByUserId: file.uploadedByUserId,
              uploadedExecutionVersion: file.uploadedExecutionVersion, label: file.label,
              contentType: file.contentType, byteLength: file.byteLength, sha256: file.sha256,
              createdAt: file.createdAt.toISOString()
            }))
          } : null
        })),
        support: supportAllocations.map(allocation => ({
          id: allocation.id, amountToman: allocation.amountToman.toString(), status: allocation.status,
          version: allocation.version, currentServiceRequestId: allocation.currentServiceRequestId,
          createdAt: allocation.createdAt.toISOString(),
          program: allocation.program,
          relationship: allocation.relationship,
          history: allocation.events.map(event => ({
            version: event.version, action: event.action, amountToman: event.amountToman.toString(),
            actorUserId: event.actorUserId, createdAt: event.createdAt.toISOString()
          }))
        }))
      };
    }, { isolationLevel: "RepeatableRead" });
  }
}
