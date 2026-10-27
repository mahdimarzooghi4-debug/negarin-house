import { Body, Controller, Get, Header, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parseCartCommand } from "./customer-cart.js";
import { CustomerShipmentsService, parseShipmentIssue } from "./customer-shipments.js";
@Controller("customer/orders/:orderId/shipments")
@UseGuards(AuthorizationGuard)
export class CustomerShipmentsController {
  constructor(private readonly shipments: CustomerShipmentsService) {}
  @Get(":shipmentId")
  @Header("Cache-Control", "no-store")
  get(@Req() req: AuthorizedRequest, @Param("orderId") orderId: string, @Param("shipmentId") shipmentId: string) {
    return this.shipments.get(req.authorizationContext!, parseArtistProductId(orderId), parseArtistProductId(shipmentId));
  }
  @Post(":shipmentId/receipt")
  @Header("Cache-Control", "no-store")
  confirm(@Req() req: AuthorizedRequest & { id: string }, @Param("orderId") orderId: string, @Param("shipmentId") shipmentId: string, @Body() body: unknown) {
    return this.shipments.confirm(req.authorizationContext!, parseArtistProductId(orderId), parseArtistProductId(shipmentId), parseCartCommand(body).version, req.id);
  }
  @Post(":shipmentId/issues")
  @Header("Cache-Control", "no-store")
  report(@Req() req: AuthorizedRequest & { id: string }, @Param("orderId") orderId: string, @Param("shipmentId") shipmentId: string, @Body() body: unknown) {
    return this.shipments.report(req.authorizationContext!, parseArtistProductId(orderId), parseArtistProductId(shipmentId), parseShipmentIssue(body), req.id);
  }
}
