import { describe, expect, it, vi } from "vitest";
import type { AuthorizationContext } from "@negarin/authz";
import { ServicePartnerAssignmentsService } from "./service-partner-assignments.js";

describe("Service Partner assigned request read model", () => {
  it("queries only organization-wide or user-specific assignments and returns partner fields only", async () => {
    const assignedAt = new Date("2026-09-29T12:00:00.000Z");
    const createdAt = new Date("2026-09-28T12:00:00.000Z");
    const findMany = vi.fn().mockResolvedValue([{
      id: "assignment-id",
      partnerOrganizationId: "partner-org-id",
      assignedPartnerUserId: "partner-user-id",
      assignedAt,
      serviceRequest: {
        id: "service-request-id",
        partnerTitle: "Product photography",
        partnerSummary: "Photograph the assigned product set.",
        createdAt
      }
    }]);
    const service = new ServicePartnerAssignmentsService({
      serviceAssignment: { findMany }
    } as never);
    const context: AuthorizationContext = {
      userId: "partner-user-id",
      activeRole: "service-partner",
      organizationId: "partner-org-id"
    };

    await expect(service.list(context)).resolves.toEqual([{
      assignmentId: "assignment-id",
      requestId: "service-request-id",
      title: "Product photography",
      summary: "Photograph the assigned product set.",
      assignedAt: assignedAt.toISOString(),
      requestedAt: createdAt.toISOString()
    }]);
    expect(findMany).toHaveBeenCalledWith({
      where: {
        partnerOrganizationId: "partner-org-id",
        OR: [
          { assignedPartnerUserId: null },
          { assignedPartnerUserId: "partner-user-id" }
        ]
      },
      orderBy: [{ assignedAt: "desc" }, { id: "asc" }],
      select: {
        id: true,
        partnerOrganizationId: true,
        assignedPartnerUserId: true,
        assignedAt: true,
        serviceRequest: {
          select: { id: true, partnerTitle: true, partnerSummary: true, createdAt: true }
        }
      }
    });
  });

  it("denies a non-Service-Partner before querying assignment data", async () => {
    const findMany = vi.fn();
    const service = new ServicePartnerAssignmentsService({
      serviceAssignment: { findMany }
    } as never);
    await expect(service.list({
      userId: "staff-user",
      activeRole: "staff",
      staffPermissionDomains: ["services"]
    })).rejects.toMatchObject({ status: 403 });
    expect(findMany).not.toHaveBeenCalled();
  });
});
