import { Body, Controller, Get, Header, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parseOrderPage } from "./customer-orders.js";
import { parseArtistServiceCreate, parseServiceAssign, parseServiceCreate, parseServiceResponse, ServiceAssignmentsService } from "./service-assignments.js";
type Request = AuthorizedRequest & { id: string };
@Controller("admin/service-requests")
@UseGuards(AuthorizationGuard)
export class AdminServiceRequestsController {
  constructor(private readonly services: ServiceAssignmentsService) {}
  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() r: Request, @Query() query: Record<string, unknown>) {
    const p = parseOrderPage(query); return this.services.requests(r.authorizationContext!, p.page, p.pageSize, true);
  }
  @Get(":id")
  @Header("Cache-Control", "no-store")
  get(@Req() r: Request, @Param("id") id: string) { return this.services.request(r.authorizationContext!, parseArtistProductId(id), true); }
  @Post()
  @Header("Cache-Control", "no-store")
  create(@Req() r: Request, @Body() body: unknown) { return this.services.create(r.authorizationContext!, parseServiceCreate(body), r.id); }
  @Post(":id/assignment")
  @Header("Cache-Control", "no-store")
  assign(@Req() r: Request, @Param("id") id: string, @Body() body: unknown) { return this.services.assign(r.authorizationContext!, parseArtistProductId(id), parseServiceAssign(body), r.id); }
}
@Controller("artist/service-requests")
@UseGuards(AuthorizationGuard)
export class ArtistServiceRequestsController {
  constructor(private readonly services: ServiceAssignmentsService) {}
  @Post()
  @Header("Cache-Control", "no-store")
  create(@Req() r: Request, @Body() body: unknown) { return this.services.createArtist(r.authorizationContext!, parseArtistServiceCreate(body), r.id); }
  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() r: Request, @Query() query: Record<string, unknown>) {
    const p = parseOrderPage(query); return this.services.requests(r.authorizationContext!, p.page, p.pageSize);
  }
  @Get(":id")
  @Header("Cache-Control", "no-store")
  get(@Req() r: Request, @Param("id") id: string) { return this.services.request(r.authorizationContext!, parseArtistProductId(id)); }
}
@Controller("service-partner/assignments")
@UseGuards(AuthorizationGuard)
export class PartnerAssignmentsController {
  constructor(private readonly services: ServiceAssignmentsService) {}
  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() r: Request, @Query() query: Record<string, unknown>) {
    const p = parseOrderPage(query); return this.services.assignments(r.authorizationContext!, p.page, p.pageSize);
  }
  @Get(":id")
  @Header("Cache-Control", "no-store")
  get(@Req() r: Request, @Param("id") id: string) { return this.services.assignment(r.authorizationContext!, parseArtistProductId(id)); }
  @Post(":id/response")
  @Header("Cache-Control", "no-store")
  respond(@Req() r: Request, @Param("id") id: string, @Body() body: unknown) { return this.services.respond(r.authorizationContext!, parseArtistProductId(id), parseServiceResponse(body), r.id); }
}
