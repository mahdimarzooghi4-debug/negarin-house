import { Body, Controller, Get, Header, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parseOrderPage } from "./customer-orders.js";
import {
  parseSupportAllocationCreate, parseSupportProgramCreate, parseSupportRelationshipApproval, parseSupportRelationshipCreate,
  parseSupportReserve, parseSupportTransition, SupportCreditsService
} from "./support-credits.js";

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
  @Get("support-programs/:id")
  @Header("Cache-Control", "no-store")
  program(@Req() r: Request, @Param("id") id: string) {
    return this.support.program(r.authorizationContext!, parseArtistProductId(id));
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
    const p = parseOrderPage(q); return this.support.relationships(r.authorizationContext!, p.page, p.pageSize, "staff");
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
