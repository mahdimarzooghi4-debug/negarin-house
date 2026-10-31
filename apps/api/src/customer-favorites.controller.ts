import { BadRequestException, Body, Controller, Delete, Get, Header, Param, Put, Query, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { CustomerFavoritesService, parseFavoriteBody, parseFavoritePage } from "./customer-favorites.js";

@Controller("customer/favorites")
@UseGuards(AuthorizationGuard)
export class CustomerFavoritesController {
  constructor(private readonly favorites: CustomerFavoritesService) {}
  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() req: AuthorizedRequest, @Query() query: Record<string, unknown>) {
    const { page, pageSize } = parseFavoritePage(query);
    return this.favorites.list(req.authorizationContext!, page, pageSize);
  }
  @Get(":productId")
  @Header("Cache-Control", "no-store")
  has(@Req() req: AuthorizedRequest, @Param("productId") productId: string, @Query() query: Record<string, unknown>) {
    if (Object.keys(query).length) throw new BadRequestException();
    return this.favorites.has(req.authorizationContext!, parseArtistProductId(productId));
  }
  @Put(":productId")
  @Header("Cache-Control", "no-store")
  add(@Req() req: AuthorizedRequest, @Param("productId") productId: string, @Body() body: unknown) {
    parseFavoriteBody(body);
    return this.favorites.add(req.authorizationContext!, parseArtistProductId(productId));
  }
  @Delete(":productId")
  @Header("Cache-Control", "no-store")
  remove(@Req() req: AuthorizedRequest, @Param("productId") productId: string, @Query() query: Record<string, unknown>) {
    if (Object.keys(query).length) throw new BadRequestException();
    return this.favorites.remove(req.authorizationContext!, parseArtistProductId(productId));
  }
}
