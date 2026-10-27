import { Body, Controller, Get, Header, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parseOrderPage } from "./customer-orders.js";
import { parseServiceCatalogAvailability, parseServiceCatalogCreate, ServiceCatalogService } from "./service-catalog.js";

type Request = AuthorizedRequest & { id: string };

@Controller("admin/service-catalog")
@UseGuards(AuthorizationGuard)
export class AdminServiceCatalogController {
  constructor(private readonly catalog: ServiceCatalogService) {}

  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() r: Request, @Query() query: Record<string, unknown>) {
    const p = parseOrderPage(query); return this.catalog.list(r.authorizationContext!, p.page, p.pageSize, true);
  }

  @Get(":id")
  @Header("Cache-Control", "no-store")
  get(@Req() r: Request, @Param("id") id: string) {
    return this.catalog.get(r.authorizationContext!, parseArtistProductId(id), true);
  }

  @Post()
  @Header("Cache-Control", "no-store")
  create(@Req() r: Request, @Body() body: unknown) {
    return this.catalog.create(r.authorizationContext!, parseServiceCatalogCreate(body), r.id);
  }

  @Post(":id/availability")
  @Header("Cache-Control", "no-store")
  availability(@Req() r: Request, @Param("id") id: string, @Body() body: unknown) {
    return this.catalog.availability(r.authorizationContext!, parseArtistProductId(id), parseServiceCatalogAvailability(body), r.id);
  }
}

@Controller("artist/service-catalog")
@UseGuards(AuthorizationGuard)
export class ArtistServiceCatalogController {
  constructor(private readonly catalog: ServiceCatalogService) {}

  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() r: Request, @Query() query: Record<string, unknown>) {
    const p = parseOrderPage(query); return this.catalog.list(r.authorizationContext!, p.page, p.pageSize);
  }

  @Get(":id")
  @Header("Cache-Control", "no-store")
  get(@Req() r: Request, @Param("id") id: string) {
    return this.catalog.get(r.authorizationContext!, parseArtistProductId(id));
  }
}
