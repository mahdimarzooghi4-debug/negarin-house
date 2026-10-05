import {
  BadRequestException, Body, Controller, Get, Header, HttpCode, Post, Req,
  UnauthorizedException, UseGuards
} from "@nestjs/common";
import type { AuthorizationContext } from "@negarin/authz";
import { ActiveContextResolver } from "./active-context.js";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { hashSessionToken } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

function bearer(request: AuthorizedRequest): string {
  const header = request.headers.authorization;
  const match = typeof header === "string" ? /^Bearer ([^\s]+)$/.exec(header) : null;
  if (!match) throw new UnauthorizedException();
  return match[1]!;
}

@Controller("identity")
export class IdentityContextController {
  private readonly resolver: ActiveContextResolver;

  constructor(private readonly database: PrismaService) {
    this.resolver = new ActiveContextResolver(database);
  }

  /** Grant discovery requires a live session, including sessions without a selected grant. */
  @Get("grants")
  @Header("Cache-Control", "no-store")
  async grants(@Req() request: AuthorizedRequest) {
    const session = await this.database.authSession.findUnique({
      where: { tokenHash: hashSessionToken(bearer(request)) }
    });
    if (!session || session.revokedAt || session.expiresAt <= new Date()) throw new UnauthorizedException();
    const grants = await this.database.roleGrant.findMany({
      where: { userId: session.userId, revokedAt: null },
      select: { id: true, role: true, organizationId: true, exportPartnerId: true },
      orderBy: { createdAt: "asc" }
    });
    return { activeGrantId: session.activeGrantId, grants };
  }

  @Post("session/revoke")
  @HttpCode(204)
  @Header("Cache-Control", "no-store")
  async revoke(@Req() request: AuthorizedRequest): Promise<void> {
    const token = bearer(request);
    await this.database.authSession.updateMany({
      where: { tokenHash: hashSessionToken(token), revokedAt: null },
      data: { revokedAt: new Date() }
    });
  }

  @Get("context")
  @Header("Cache-Control", "no-store")
  @UseGuards(AuthorizationGuard)
  context(@Req() request: AuthorizedRequest): AuthorizationContext {
    return request.authorizationContext!;
  }

  @Post("context/select")
  @Header("Cache-Control", "no-store")
  async select(@Req() request: AuthorizedRequest, @Body() body: unknown): Promise<AuthorizationContext> {
    if (!body || typeof body !== "object" || Array.isArray(body) ||
      !("grantId" in body) || typeof body.grantId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(body.grantId)) {
      throw new BadRequestException();
    }
    const context = await this.resolver.select(bearer(request), body.grantId);
    if (!context) throw new UnauthorizedException();
    return context;
  }
}
