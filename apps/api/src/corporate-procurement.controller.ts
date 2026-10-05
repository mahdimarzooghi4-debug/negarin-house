import { Body, Controller, Get, Header, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import {
  CorporateProcurementService, parseCorporatePurchaseRequestCreate, parseCorporatePurchaseRequestSubmit, requireCorporateBuyer
} from "./corporate-procurement.js";
import { parseOrderPage } from "./customer-orders.js";
import { parseCatalogQuery, PublicProductCatalogService } from "./public-product-catalog.js";

type Request = AuthorizedRequest & { id: string };

@Controller("corporate")
@UseGuards(AuthorizationGuard)
export class CorporateBuyerController {
  constructor(
    private readonly procurement: CorporateProcurementService,
    private readonly catalog: PublicProductCatalogService
  ) {}

  @Get("products")
  @Header("Cache-Control", "no-store")
  products(@Req() r: Request, @Query() query: Record<string, unknown>) {
    requireCorporateBuyer(r.authorizationContext!);
    return this.catalog.list(parseCatalogQuery(query));
  }

  @Get("products/:id")
  @Header("Cache-Control", "no-store")
  product(@Req() r: Request, @Param("id") id: string) {
    requireCorporateBuyer(r.authorizationContext!);
    return this.catalog.get(parseArtistProductId(id));
  }

  @Get("products/:id/images/:imageId")
  @Header("Cache-Control", "no-store")
  productImage(@Req() r: Request, @Param("id") id: string, @Param("imageId") imageId: string) {
    requireCorporateBuyer(r.authorizationContext!);
    return this.catalog.image(parseArtistProductId(id), parseArtistProductId(imageId));
  }

  @Post("purchase-requests")
  @Header("Cache-Control", "no-store")
  create(@Req() r: Request, @Body() body: unknown) {
    return this.procurement.create(r.authorizationContext!, parseCorporatePurchaseRequestCreate(body), r.id);
  }

  @Get("purchase-requests")
  @Header("Cache-Control", "no-store")
  list(@Req() r: Request, @Query() query: Record<string, unknown>) {
    const p = parseOrderPage(query);
    return this.procurement.list(r.authorizationContext!, p.page, p.pageSize);
  }

  @Get("purchase-requests/:id")
  @Header("Cache-Control", "no-store")
  get(@Req() r: Request, @Param("id") id: string) {
    return this.procurement.get(r.authorizationContext!, parseArtistProductId(id));
  }

  @Post("purchase-requests/:id/submit")
  @Header("Cache-Control", "no-store")
  submit(@Req() r: Request, @Param("id") id: string, @Body() body: unknown) {
    return this.procurement.submit(r.authorizationContext!, parseArtistProductId(id), parseCorporatePurchaseRequestSubmit(body), r.id);
  }
}

@Controller("admin/corporate")
@UseGuards(AuthorizationGuard)
export class AdminCorporateProcurementController {
  constructor(private readonly procurement: CorporateProcurementService) {}

  @Get("purchase-requests")
  @Header("Cache-Control", "no-store")
  list(@Req() r: Request, @Query() query: Record<string, unknown>) {
    const p = parseOrderPage(query);
    return this.procurement.list(r.authorizationContext!, p.page, p.pageSize, true);
  }

  @Get("purchase-requests/:id")
  @Header("Cache-Control", "no-store")
  get(@Req() r: Request, @Param("id") id: string) {
    return this.procurement.get(r.authorizationContext!, parseArtistProductId(id), true);
  }
}
