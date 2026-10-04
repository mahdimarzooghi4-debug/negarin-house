import { BadRequestException, Body, Controller, Delete, Get, Header, Param, Put, Query, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { CustomerCartService, parseCartCommand } from "./customer-cart.js";

@Controller("customer/cart")
@UseGuards(AuthorizationGuard)
export class CustomerCartController {
  constructor(private readonly cart: CustomerCartService) {}
  @Get()
  @Header("Cache-Control", "no-store")
  get(@Req() req: AuthorizedRequest, @Query() query: Record<string, unknown>) {
    if (Object.keys(query).length) throw new BadRequestException();
    return this.cart.get(req.authorizationContext!);
  }
  @Put("items/:productId")
  @Header("Cache-Control", "no-store")
  set(@Req() req: AuthorizedRequest, @Param("productId") productId: string, @Body() body: unknown) {
    const input = parseCartCommand(body, true);
    return this.cart.change(req.authorizationContext!, input.version, parseArtistProductId(productId), input.quantity);
  }
  @Delete("items/:productId")
  @Header("Cache-Control", "no-store")
  remove(@Req() req: AuthorizedRequest, @Param("productId") productId: string, @Body() body: unknown) {
    const input = parseCartCommand(body);
    return this.cart.change(req.authorizationContext!, input.version, parseArtistProductId(productId));
  }
  @Delete()
  @Header("Cache-Control", "no-store")
  clear(@Req() req: AuthorizedRequest, @Body() body: unknown) {
    return this.cart.change(req.authorizationContext!, parseCartCommand(body).version);
  }
}
