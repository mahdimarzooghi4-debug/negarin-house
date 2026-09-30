import { BadRequestException, Injectable } from "@nestjs/common";
import { canAccessStaffDomain, type AuthorizationContext } from "@negarin/authz";
import { enforceDecision } from "./authorization.guard.js";
import { PrismaService } from "./prisma.service.js";

export type ServiceRequestInput = {
  title: string;
  summary: string | null;
};

@Injectable()
export class StaffServiceRequestsService {
  constructor(private readonly database: PrismaService) {}

  async create(context: AuthorizationContext, input: ServiceRequestInput) {
    enforceDecision(canAccessStaffDomain(context, "services"));
    const request = await this.database.serviceRequest.create({
      data: {
        partnerTitle: input.title,
        partnerSummary: input.summary,
        createdByUserId: context.userId
      },
      select: { id: true, partnerTitle: true, partnerSummary: true, createdAt: true }
    });

    return {
      requestId: request.id,
      title: request.partnerTitle,
      summary: request.partnerSummary,
      createdAt: request.createdAt.toISOString()
    };
  }
}

export function parseServiceRequestInput(body: unknown): ServiceRequestInput {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const value = body as Record<string, unknown>;
  if (Object.keys(value).some((key) => !["title", "summary"].includes(key))) throw new BadRequestException();
  if (typeof value.title !== "string" || !value.title.trim()) throw new BadRequestException();
  if (value.summary !== undefined && value.summary !== null && typeof value.summary !== "string") {
    throw new BadRequestException();
  }

  return {
    title: value.title.trim(),
    summary: typeof value.summary === "string" && value.summary.trim() ? value.summary.trim() : null
  };
}
