import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import type { AuthorizationContext } from "@negarin/authz";
import { PrismaService } from "./prisma.service.js";

export type ArtistServiceRequestInput = { title: string; description: string | null };

@Injectable()
export class ArtistServiceRequestsService {
  constructor(private readonly database: PrismaService) {}

  async list(context: AuthorizationContext) {
    this.requireArtist(context);
    const requests = await this.database.serviceRequest.findMany({
      where: { requestedByArtistUserId: context.userId },
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      select: {
        id: true,
        partnerTitle: true,
        partnerSummary: true,
        createdAt: true,
        assignments: { orderBy: [{ assignedAt: "asc" }, { id: "asc" }], select: { assignedAt: true, completedAt: true } }
      }
    });
    return requests.map((request) => ({
      requestId: request.id,
      title: request.partnerTitle,
      description: request.partnerSummary,
      requestedAt: request.createdAt.toISOString(),
      assignedAt: request.assignments[0]?.assignedAt.toISOString() ?? null,
      completedAt: request.assignments.find((assignment) => assignment.completedAt)?.completedAt?.toISOString() ?? null
    }));
  }

  async create(context: AuthorizationContext, input: ArtistServiceRequestInput) {
    this.requireArtist(context);
    const request = await this.database.serviceRequest.create({
      data: {
        partnerTitle: input.title,
        partnerSummary: input.description,
        createdByUserId: context.userId,
        requestedByArtistUserId: context.userId
      },
      select: { id: true, partnerTitle: true, partnerSummary: true, createdAt: true }
    });
    return {
      requestId: request.id,
      title: request.partnerTitle,
      description: request.partnerSummary,
      requestedAt: request.createdAt.toISOString(),
      assignedAt: null,
      completedAt: null
    };
  }

  private requireArtist(context: AuthorizationContext) {
    if (context.activeRole !== "artist") throw new ForbiddenException();
  }
}

export function parseArtistServiceRequestInput(body: unknown): ArtistServiceRequestInput {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const value = body as Record<string, unknown>;
  if (Object.keys(value).some((key) => key !== "title" && key !== "description")) throw new BadRequestException();
  if (typeof value.title !== "string" || !value.title.trim() || value.title.trim().length > 200) throw new BadRequestException();
  if (value.description !== undefined && value.description !== null &&
      (typeof value.description !== "string" || value.description.length > 5000)) throw new BadRequestException();
  return {
    title: value.title.trim(),
    description: typeof value.description === "string" && value.description.trim() ? value.description.trim() : null
  };
}
