import { Body, Controller, Get, Header, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { ShipmentIssueSupportService, parseSupportCommand, parseSupportPage } from "./shipment-issue-support.js";
@Controller("admin/shipment-issues")
@UseGuards(AuthorizationGuard)
export class ShipmentIssueSupportController {
  constructor(private readonly support: ShipmentIssueSupportService) {}
  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() req: AuthorizedRequest, @Query() query: Record<string, unknown>) {
    return this.support.list(req.authorizationContext!, parseSupportPage(query));
  }
  @Get(":shipmentId")
  @Header("Cache-Control", "no-store")
  get(@Req() req: AuthorizedRequest, @Param("shipmentId") shipmentId: string) {
    return this.support.get(req.authorizationContext!, parseArtistProductId(shipmentId));
  }
  @Post(":shipmentId/status")
  @Header("Cache-Control", "no-store")
  change(@Req() req: AuthorizedRequest & { id: string }, @Param("shipmentId") shipmentId: string, @Body() body: unknown) {
    return this.support.change(req.authorizationContext!, parseArtistProductId(shipmentId), parseSupportCommand(body), req.id);
  }
}
