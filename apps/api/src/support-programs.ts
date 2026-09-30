import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import type { AuthorizationContext } from "@negarin/authz";
import { PrismaService } from "./prisma.service.js";

export type SupportProgramInput = { name: string; description: string | null };

@Injectable()
export class SupportProgramsService {
  constructor(private readonly database: PrismaService) {}

  async list(context: AuthorizationContext) {
    const organizationId = this.requireOrganization(context);
    const programs = await this.database.supportProgram.findMany({
      where: { organizationId },
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      select: { id: true, name: true, description: true, createdAt: true, updatedAt: true }
    });
    return programs.map((program) => ({
      id: program.id,
      name: program.name,
      description: program.description,
      createdAt: program.createdAt.toISOString(),
      updatedAt: program.updatedAt.toISOString()
    }));
  }

  async create(context: AuthorizationContext, input: SupportProgramInput) {
    const organizationId = this.requireOrganization(context);
    const program = await this.database.supportProgram.create({
      data: { organizationId, name: input.name, description: input.description },
      select: { id: true, name: true, description: true, createdAt: true, updatedAt: true }
    });
    return {
      id: program.id,
      name: program.name,
      description: program.description,
      createdAt: program.createdAt.toISOString(),
      updatedAt: program.updatedAt.toISOString()
    };
  }

  private requireOrganization(context: AuthorizationContext): string {
    if (context.activeRole !== "supporting-organization" || !context.organizationId) {
      throw new ForbiddenException();
    }
    return context.organizationId;
  }
}

export function parseSupportProgramInput(body: unknown): SupportProgramInput {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
  const value = body as Record<string, unknown>;
  if (Object.keys(value).some((key) => key !== "name" && key !== "description")) throw new BadRequestException();
  if (typeof value.name !== "string" || !value.name.trim() || value.name.trim().length > 200) throw new BadRequestException();
  if (value.description !== undefined && value.description !== null &&
      (typeof value.description !== "string" || value.description.length > 5000)) throw new BadRequestException();
  return {
    name: value.name.trim(),
    description: typeof value.description === "string" && value.description.trim() ? value.description.trim() : null
  };
}
