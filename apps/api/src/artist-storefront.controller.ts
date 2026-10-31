import { Body, Controller, Get, Header, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { ArtistStorefrontService, parseArtistStorefrontCommand, parseArtistStorefrontImageCommand } from "./artist-storefront.js";
import { parseArtistProductId } from "./artist-products.js";

@Controller("artist/storefront")
@UseGuards(AuthorizationGuard)
export class ArtistStorefrontController {
  constructor(private readonly storefront: ArtistStorefrontService) {}

  @Get()
  @Header("Cache-Control", "no-store")
  get(@Req() req: AuthorizedRequest) {
    return this.storefront.get(req.authorizationContext!);
  }

  @Patch()
  @Header("Cache-Control", "no-store")
  update(@Req() req: AuthorizedRequest & { id: string }, @Body() body: unknown) {
    return this.storefront.update(req.authorizationContext!, parseArtistStorefrontCommand(body), req.id);
  }

  @Post("images")
  @Header("Cache-Control", "no-store")
  upload(@Req() req: AuthorizedRequest & { id: string }, @Body() body: unknown) {
    return this.storefront.uploadImage(req.authorizationContext!, parseArtistStorefrontImageCommand(body), req.id);
  }

  @Get(":id/images/:imageId")
  @Header("Cache-Control", "no-store")
  read(@Req() req: AuthorizedRequest, @Param("id") id: string, @Param("imageId") imageId: string) {
    return this.storefront.read(req.authorizationContext!, parseArtistProductId(id), parseArtistProductId(imageId));
  }
}
