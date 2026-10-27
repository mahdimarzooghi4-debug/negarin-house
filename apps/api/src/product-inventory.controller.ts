import { Body, Controller, Get, Header, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { ProductInventoryService, parseInventoryWrite } from "./product-inventory.js";

@Controller("artist/products")
@UseGuards(AuthorizationGuard)
export class ProductInventoryController {
  constructor(private readonly inventory: ProductInventoryService) {}

  @Patch(":id/inventory")
  @Header("Cache-Control", "no-store")
  set(@Req() request: AuthorizedRequest & { id: string }, @Param("id") id: string, @Body() body: unknown) {
    return this.inventory.set(request.authorizationContext!, parseArtistProductId(id), parseInventoryWrite(body), request.id);
  }

  @Get(":id/inventory-history")
  @Header("Cache-Control", "no-store")
  history(@Req() request: AuthorizedRequest, @Param("id") id: string) {
    return this.inventory.history(request.authorizationContext!, parseArtistProductId(id));
  }
}

