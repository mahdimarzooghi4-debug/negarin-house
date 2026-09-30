import { describe, expect, it, vi } from "vitest";
import { ForbiddenException } from "@nestjs/common";
import type { ObjectStorage } from "@negarin/storage";
import type { AuthorizationContext } from "@negarin/authz";
import { StaffServiceDeliverablesService } from "./staff-service-deliverables.js";
import type { PrismaService } from "./prisma.service.js";

const row = {
  id: "deliverable-1",
  fileName: "packing-list.pdf",
  contentType: "application/pdf",
  contentLength: 1200,
  objectKey: "private/service/deliverable-1",
  createdAt: new Date("2026-09-30T08:00:00.000Z"),
  submission: { createdAt: new Date("2026-09-30T09:00:00.000Z") },
  assignment: {
    id: "assignment-1",
    assignedAt: new Date("2026-09-30T07:00:00.000Z"),
    responseEvents: [{ type: "accepted", createdAt: new Date("2026-09-30T07:30:00.000Z") }],
    serviceRequest: { partnerTitle: "آماده‌سازی سفارش", partnerSummary: "بسته‌بندی آثار." },
    partnerOrganization: { displayName: "بسته‌بندی نوین" }
  }
};

function fixture() {
  const database = { serviceDeliverable: { findMany: vi.fn().mockResolvedValue([row]) } };
  const storage = { createReadUrl: vi.fn().mockResolvedValue("https://storage.invalid/read") };
  return {
    database,
    storage,
    service: new StaffServiceDeliverablesService(database as unknown as PrismaService, storage as unknown as ObjectStorage)
  };
}

const servicesStaff: AuthorizationContext = {
  userId: "staff-user",
  activeRole: "staff",
  staffPermissionDomains: ["services"]
};

describe("Staff service deliverable submissions", () => {
  it("returns submitted ready files with scoped request data and signed reads", async () => {
    const { service, database, storage } = fixture();
    const result = await service.list(servicesStaff);
    expect(database.serviceDeliverable.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { status: "ready", submission: { isNot: null } },
      orderBy: { submission: { createdAt: "asc" } }
    }));
    expect(result).toEqual([{
      deliverableId: "deliverable-1",
      assignmentId: "assignment-1",
      title: "آماده‌سازی سفارش",
      summary: "بسته‌بندی آثار.",
      partnerOrganizationName: "بسته‌بندی نوین",
      fileName: "packing-list.pdf",
      contentType: "application/pdf",
      contentLength: 1200,
      uploadedAt: "2026-09-30T08:00:00.000Z",
      submittedAt: "2026-09-30T09:00:00.000Z",
      history: [
        { type: "assigned", createdAt: "2026-09-30T07:00:00.000Z" },
        { type: "accepted", createdAt: "2026-09-30T07:30:00.000Z" },
        { type: "deliverable_added", createdAt: "2026-09-30T08:00:00.000Z", fileName: "packing-list.pdf", uploadStatus: "ready" },
        { type: "deliverable_submitted", createdAt: "2026-09-30T09:00:00.000Z", fileName: "packing-list.pdf" }
      ],
      readUrl: "https://storage.invalid/read"
    }]);
    expect(storage.createReadUrl).toHaveBeenCalledWith(row.objectKey);
    expect(result[0]).not.toHaveProperty("objectKey");
    expect(result[0]).not.toHaveProperty("actorUserId");
    expect(result[0]?.history.every((event) => !("actorUserId" in event))).toBe(true);
  });

  it.each<AuthorizationContext>([
    { userId: "artist", activeRole: "artist" },
    { userId: "staff-user", activeRole: "staff", staffPermissionDomains: ["products"] }
  ])("denies roles without the live services permission", async (context) => {
    const { service, database, storage } = fixture();
    await expect(service.list(context)).rejects.toThrow(ForbiddenException);
    expect(database.serviceDeliverable.findMany).not.toHaveBeenCalled();
    expect(storage.createReadUrl).not.toHaveBeenCalled();
  });
});
