import { Body, Controller, Get, Header, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parseImageCommand, ProductImagesService } from "./product-images.js";

@Controller("artist/products")
@UseGuards(AuthorizationGuard)
export class ArtistProductImagesController {
  constructor(private readonly images: ProductImagesService) {}
  @Post(":id/images")
  @Header("Cache-Control", "no-store")
  upload(@Req() request: AuthorizedRequest & { id: string }, @Param("id") id: string, @Body() body: unknown) {
    const input = parseImageCommand(body, true);
    return this.images.upload(request.authorizationContext!, parseArtistProductId(id), input.version, input.bytes, request.id);
  }
  @Patch(":id/images")
  @Header("Cache-Control", "no-store")
  gallery(@Req() request: AuthorizedRequest & { id: string }, @Param("id") id: string, @Body() body: unknown) {
    const input = parseImageCommand(body, false);
    return this.images.gallery(request.authorizationContext!, parseArtistProductId(id), input.version, input.imageIds, request.id);
  }
  @Get(":id/images/:imageId")
  @Header("Cache-Control", "no-store")
  read(@Req() request: AuthorizedRequest, @Param("id") id: string, @Param("imageId") imageId: string) {
    return this.images.read(request.authorizationContext!, parseArtistProductId(id), parseArtistProductId(imageId));
  }
}

@Controller("admin/product-reviews")
@UseGuards(AuthorizationGuard)
export class AdminProductImagesController {
  constructor(private readonly images: ProductImagesService) {}
  @Get(":id/images/:imageId")
  @Header("Cache-Control", "no-store")
  read(@Req() request: AuthorizedRequest, @Param("id") id: string, @Param("imageId") imageId: string) {
    return this.images.read(request.authorizationContext!, parseArtistProductId(id), parseArtistProductId(imageId), true);
  }
}
