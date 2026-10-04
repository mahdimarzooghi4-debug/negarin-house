import { Body, Controller, Get, Header, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parseCartCommand } from "./customer-cart.js";
import { CustomerOrdersService, parseCheckout, parseOrderPage } from "./customer-orders.js";
@Controller("customer/orders")
@UseGuards(AuthorizationGuard)
export class CustomerOrdersController {
  constructor(private readonly orders: CustomerOrdersService) {}
  @Post()
  @Header("Cache-Control", "no-store")
  checkout(@Req() req: AuthorizedRequest & { id: string }, @Body() body: unknown) {
    return this.orders.checkout(req.authorizationContext!, parseCheckout(body), req.id);
  }
  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() req: AuthorizedRequest, @Query() query: Record<string, unknown>) {
    const { page, pageSize } = parseOrderPage(query);
    return this.orders.list(req.authorizationContext!, page, pageSize);
  }
  @Get(":id")
  @Header("Cache-Control", "no-store")
  get(@Req() req: AuthorizedRequest, @Param("id") id: string) {
    return this.orders.get(req.authorizationContext!, parseArtistProductId(id));
  }
  @Post(":id/cancel")
  @Header("Cache-Control", "no-store")
  cancel(@Req() req: AuthorizedRequest & { id: string }, @Param("id") id: string, @Body() body: unknown) {
    return this.orders.cancel(req.authorizationContext!, parseArtistProductId(id), parseCartCommand(body).version, req.id);
  }
}
