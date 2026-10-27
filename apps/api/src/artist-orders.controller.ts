import { Body, Controller, Get, Header, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parseOrderPage } from "./customer-orders.js";
import { ArtistOrdersService, parsePreparation } from "./artist-orders.js";
@Controller("artist/orders")
@UseGuards(AuthorizationGuard)
export class ArtistOrdersController {
  constructor(private readonly orders: ArtistOrdersService) {}
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
  @Post(":id/preparation")
  @Header("Cache-Control", "no-store")
  advance(@Req() req: AuthorizedRequest & { id: string }, @Param("id") id: string, @Body() body: unknown) {
    return this.orders.advance(req.authorizationContext!, parseArtistProductId(id), parsePreparation(body), req.id);
  }
}
