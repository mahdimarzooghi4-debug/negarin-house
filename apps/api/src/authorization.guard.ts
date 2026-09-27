import {
  CanActivate, ExecutionContext, ForbiddenException, Injectable,
  NotFoundException, UnauthorizedException
} from "@nestjs/common";
import type { AuthorizationContext, AuthorizationDecision } from "@negarin/authz";
import { ActiveContextResolver } from "./active-context.js";
import { PrismaService } from "./prisma.service.js";

export type AuthorizedRequest = {
  headers: { authorization?: string };
  authorizationContext?: AuthorizationContext;
};

/** A bearer credential is accepted only after the current session and grant are checked in PostgreSQL. */
@Injectable()
export class AuthorizationGuard implements CanActivate {
  private readonly resolver: ActiveContextResolver;

  constructor(database: PrismaService) {
    this.resolver = new ActiveContextResolver(database);
  }

  async canActivate(execution: ExecutionContext): Promise<boolean> {
    const request = execution.switchToHttp().getRequest<AuthorizedRequest>();
    const header = request.headers.authorization;
    const match = typeof header === "string" ? /^Bearer ([^\s]+)$/.exec(header) : null;
    if (!match) throw new UnauthorizedException();

    const context = await this.resolver.resolve(match[1]!);
    if (!context) throw new UnauthorizedException();
    request.authorizationContext = context;
    return true;
  }
}

/** Call after loading a resource from a trusted server query. Conceal cross-tenant resources. */
export function enforceDecision(decision: AuthorizationDecision): void {
  if (decision.allowed) return;
  if (decision.reason === "not-found") throw new NotFoundException();
  throw new ForbiddenException();
}
