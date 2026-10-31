import { BadRequestException, Body, Controller, Get, Header, Param, Post, Query, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parseOrderPage } from "./customer-orders.js";
import {
  parseSupportAllocationCreate, parseSupportProgramCreate, parseSupportRelationshipApproval, parseSupportRelationshipCreate,
  parseOrganizationInvitationCreate, parseSupportReserve, parseSupportTransition, SupportCreditsService
} from "./support-credits.js";
import { hashSessionToken } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

type Request = AuthorizedRequest & { id: string };

@Controller("supporting-organization")
@UseGuards(AuthorizationGuard)
export class SupportingOrganizationSupportController {
  constructor(private readonly support: SupportCreditsService) {}

  @Get("support-programs")
  @Header("Cache-Control", "no-store")
  programs(@Req() r: Request, @Query() q: Record<string, unknown>) {
    const p = parseOrderPage(q); return this.support.programs(r.authorizationContext!, p.page, p.pageSize);
  }
  @Get("members")
  @Header("Cache-Control", "no-store")
  members(@Req() r: Request, @Query() q: Record<string, unknown>) {
    const allowed = ["page", "pageSize"];
    if (Object.keys(q).some(key => !allowed.includes(key)) || Object.values(q).some(value => typeof value !== "string")) throw new BadRequestException();
    const p = parseOrderPage(q);
    return this.support.organizationMembers(r.authorizationContext!, p.page, p.pageSize);
  }
  @Get("invitations")
  @Header("Cache-Control", "no-store")
  invitations(@Req() r: Request, @Query() q: Record<string, unknown>) {
    const allowed = ["page", "pageSize"];
    if (Object.keys(q).some(key => !allowed.includes(key)) || Object.values(q).some(value => typeof value !== "string")) throw new BadRequestException();
    const p = parseOrderPage(q);
    return this.support.organizationInvitations(r.authorizationContext!, p.page, p.pageSize);
  }
  @Post("invitations")
  @Header("Cache-Control", "no-store")
  createInvitation(@Req() r: Request, @Body() body: unknown) {
    return this.support.createOrganizationInvitation(r.authorizationContext!, parseOrganizationInvitationCreate(body));
  }
  @Post("invitations/:id/revoke")
  @Header("Cache-Control", "no-store")
  revokeInvitation(@Req() r: Request, @Param("id") id: string) {
    return this.support.revokeOrganizationInvitation(r.authorizationContext!, parseArtistProductId(id));
  }
  @Get("support-programs/:id")
  @Header("Cache-Control", "no-store")
  program(@Req() r: Request, @Param("id") id: string) {
    return this.support.program(r.authorizationContext!, parseArtistProductId(id));
  }
  @Get("artists")
  @Header("Cache-Control", "no-store")
  artists(@Req() r: Request, @Query() q: Record<string, unknown>) {
    const allowed = ["q", "page", "pageSize"];
    if (Object.keys(q).some(key => !allowed.includes(key)) || Object.values(q).some(value => typeof value !== "string")) throw new BadRequestException();
    const p = parseOrderPage({ page: q.page, pageSize: q.pageSize });
    const search = typeof q.q === "string" ? q.q.trim() : undefined;
    if (search !== undefined && (search.length < 2 || search.length > 120)) throw new BadRequestException();
    return this.support.artistDirectory(r.authorizationContext!, search, p.page, p.pageSize);
  }
  @Post("support-programs")
  @Header("Cache-Control", "no-store")
  createProgram(@Req() r: Request, @Body() body: unknown) {
    return this.support.createOrganizationProgram(r.authorizationContext!, parseSupportProgramCreate(body), r.id);
  }
  @Post("support-programs/:id/relationships")
  @Header("Cache-Control", "no-store")
  createRelationship(@Req() r: Request, @Param("id") id: string, @Body() body: unknown) {
    return this.support.createOrganizationRelationship(r.authorizationContext!, parseArtistProductId(id), parseSupportRelationshipCreate(body), r.id);
  }
  @Get("support-relationships")
  @Header("Cache-Control", "no-store")
  relationships(@Req() r: Request, @Query() q: Record<string, unknown>) {
    const p = parseOrderPage(q); return this.support.relationships(r.authorizationContext!, p.page, p.pageSize, "organization");
  }
  @Get("support-relationships/:id")
  @Header("Cache-Control", "no-store")
  relationship(@Req() r: Request, @Param("id") id: string) {
    return this.support.relationship(r.authorizationContext!, parseArtistProductId(id), "organization");
  }
  @Post("support-relationships/:id/allocations")
  @Header("Cache-Control", "no-store")
  createAllocation(@Req() r: Request, @Param("id") id: string, @Body() body: unknown) {
    return this.support.createOrganizationAllocation(r.authorizationContext!, parseArtistProductId(id), parseSupportAllocationCreate(body), r.id);
  }
  @Get("support-allocations")
  @Header("Cache-Control", "no-store")
  allocations(@Req() r: Request, @Query() q: Record<string, unknown>) {
    const p = parseOrderPage(q); return this.support.allocations(r.authorizationContext!, p.page, p.pageSize, "organization");
  }
  @Get("support-allocations/:id")
  @Header("Cache-Control", "no-store")
  allocation(@Req() r: Request, @Param("id") id: string) {
    return this.support.allocation(r.authorizationContext!, parseArtistProductId(id), "organization");
  }
}

@Controller("artist")
@UseGuards(AuthorizationGuard)
export class ArtistSupportController {
  constructor(private readonly support: SupportCreditsService) {}

  @Get("support-relationships")
  @Header("Cache-Control", "no-store")
  relationships(@Req() r: Request, @Query() q: Record<string, unknown>) {
    const p = parseOrderPage(q); return this.support.relationships(r.authorizationContext!, p.page, p.pageSize, "artist");
  }
  @Get("support-relationships/:id")
  @Header("Cache-Control", "no-store")
  relationship(@Req() r: Request, @Param("id") id: string) {
    return this.support.relationship(r.authorizationContext!, parseArtistProductId(id), "artist");
  }
  @Get("support-allocations")
  @Header("Cache-Control", "no-store")
  allocations(@Req() r: Request, @Query() q: Record<string, unknown>) {
    const p = parseOrderPage(q); return this.support.allocations(r.authorizationContext!, p.page, p.pageSize, "artist");
  }
  @Get("support-allocations/:id")
  @Header("Cache-Control", "no-store")
  allocation(@Req() r: Request, @Param("id") id: string) {
    return this.support.allocation(r.authorizationContext!, parseArtistProductId(id), "artist");
  }
}

@Controller("admin")
@UseGuards(AuthorizationGuard)
export class AdminSupportController {
  constructor(private readonly support: SupportCreditsService) {}

  @Get("support-programs")
  @Header("Cache-Control", "no-store")
  programs(@Req() r: Request, @Query() q: Record<string, unknown>) {
    const p = parseOrderPage(q); return this.support.programs(r.authorizationContext!, p.page, p.pageSize, true);
  }
  @Get("support-programs/:id")
  @Header("Cache-Control", "no-store")
  program(@Req() r: Request, @Param("id") id: string) {
    return this.support.program(r.authorizationContext!, parseArtistProductId(id), true);
  }
  @Get("support-artists")
  @Header("Cache-Control", "no-store")
  artists(@Req() r: Request, @Query() q: Record<string, unknown>) {
    const allowed = ["q", "page", "pageSize"];
    if (Object.keys(q).some(key => !allowed.includes(key)) || Object.values(q).some(value => typeof value !== "string")) throw new BadRequestException();
    const p = parseOrderPage({ page: q.page, pageSize: q.pageSize });
    const search = typeof q.q === "string" ? q.q.trim() : undefined;
    if (search !== undefined && (search.length < 2 || search.length > 120)) throw new BadRequestException();
    return this.support.artistDirectory(r.authorizationContext!, search, p.page, p.pageSize, "staff");
  }
  @Post("support-programs")
  @Header("Cache-Control", "no-store")
  createProgram(@Req() r: Request, @Body() body: unknown) {
    return this.support.createNegarinProgram(r.authorizationContext!, parseSupportProgramCreate(body), r.id);
  }
  @Post("support-programs/:id/relationships")
  @Header("Cache-Control", "no-store")
  createRelationship(@Req() r: Request, @Param("id") id: string, @Body() body: unknown) {
    return this.support.createNegarinRelationship(r.authorizationContext!, parseArtistProductId(id), parseSupportRelationshipCreate(body), r.id);
  }
  @Get("support-relationships")
  @Header("Cache-Control", "no-store")
  relationships(@Req() r: Request, @Query() q: Record<string, unknown>) {
    const allowed = ["page", "pageSize", "status"];
    if (Object.keys(q).some(key => !allowed.includes(key)) || Object.values(q).some(value => typeof value !== "string") || (q.status !== undefined && q.status !== "pending" && q.status !== "all")) throw new BadRequestException();
    const p = parseOrderPage({ page: q.page, pageSize: q.pageSize });
    return this.support.relationships(r.authorizationContext!, p.page, p.pageSize, "staff", q.status !== "all");
  }
  @Get("support-relationships/:id")
  @Header("Cache-Control", "no-store")
  relationship(@Req() r: Request, @Param("id") id: string) {
    return this.support.relationship(r.authorizationContext!, parseArtistProductId(id), "staff");
  }
  @Post("support-relationships/:id/approve")
  @Header("Cache-Control", "no-store")
  approve(@Req() r: Request, @Param("id") id: string, @Body() body: unknown) {
    return this.support.approveRelationship(r.authorizationContext!, parseArtistProductId(id), parseSupportRelationshipApproval(body), r.id);
  }
  @Post("support-relationships/:id/allocations")
  @Header("Cache-Control", "no-store")
  createAllocation(@Req() r: Request, @Param("id") id: string, @Body() body: unknown) {
    return this.support.createNegarinAllocation(r.authorizationContext!, parseArtistProductId(id), parseSupportAllocationCreate(body), r.id);
  }
  @Get("support-allocations")
  @Header("Cache-Control", "no-store")
  allocations(@Req() r: Request, @Query() q: Record<string, unknown>) {
    const p = parseOrderPage(q); return this.support.allocations(r.authorizationContext!, p.page, p.pageSize, "staff");
  }
  @Get("support-allocations/:id")
  @Header("Cache-Control", "no-store")
  allocation(@Req() r: Request, @Param("id") id: string) {
    return this.support.allocation(r.authorizationContext!, parseArtistProductId(id), "staff");
  }
  @Post("support-allocations/:id/reserve")
  @Header("Cache-Control", "no-store")
  reserve(@Req() r: Request, @Param("id") id: string, @Body() body: unknown) {
    return this.support.reserve(r.authorizationContext!, parseArtistProductId(id), parseSupportReserve(body), r.id);
  }
  @Post("support-allocations/:id/consume")
  @Header("Cache-Control", "no-store")
  consume(@Req() r: Request, @Param("id") id: string, @Body() body: unknown) {
    return this.support.consume(r.authorizationContext!, parseArtistProductId(id), parseSupportTransition(body), r.id);
  }
  @Post("support-allocations/:id/release")
  @Header("Cache-Control", "no-store")
  release(@Req() r: Request, @Param("id") id: string, @Body() body: unknown) {
    return this.support.release(r.authorizationContext!, parseArtistProductId(id), parseSupportTransition(body), r.id);
  }
  @Post("support-allocations/:id/reverse")
  @Header("Cache-Control", "no-store")
  reverse(@Req() r: Request, @Param("id") id: string, @Body() body: unknown) {
    return this.support.reverse(r.authorizationContext!, parseArtistProductId(id), parseSupportTransition(body), r.id);
  }
}

@Controller("identity/organization-invitations")
export class OrganizationInvitationAcceptController {
  constructor(private readonly database: PrismaService, private readonly support: SupportCreditsService) {}

  @Post("accept")
  @Header("Cache-Control", "no-store")
  async accept(@Req() request: AuthorizedRequest, @Body() body: unknown) {
    const match = typeof request.headers.authorization === "string" ? /^Bearer ([^\s]+)$/.exec(request.headers.authorization) : null;
    if (!match) throw new UnauthorizedException();
    if (!body || typeof body !== "object" || Array.isArray(body) || Object.keys(body).some(key => key !== "token") || typeof (body as Record<string, unknown>).token !== "string") throw new BadRequestException();
    const session = await this.database.authSession.findUnique({ where: { tokenHash: hashSessionToken(match[1]!) } });
    if (!session || session.revokedAt || session.expiresAt <= new Date()) throw new UnauthorizedException();
    return this.support.acceptOrganizationInvitation(session.userId, (body as { token: string }).token);
  }
}
