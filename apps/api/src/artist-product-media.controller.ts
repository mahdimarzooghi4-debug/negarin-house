import {
  Body, Controller, Get, Header, Param, Post, Req, UseGuards
} from "@nestjs/common";
import { parseArtistProductId } from "./artist-products.js";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { ArtistProductMediaService, parseProductMediaUploadRequest } from "./artist-product-media.js";

@Controller("artist/products/:productId/media")
@UseGuards(AuthorizationGuard)
export class ArtistProductMediaController {
  constructor(private readonly media: ArtistProductMediaService) {}

  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() request: AuthorizedRequest, @Param("productId") productId: string) {
    return this.media.list(request.authorizationContext!, parseArtistProductId(productId));
  }

  @Post("upload-url")
  @Header("Cache-Control", "no-store")
  requestUpload(@Req() request: AuthorizedRequest, @Param("productId") productId: string, @Body() body: unknown) {
    return this.media.requestUpload(
      request.authorizationContext!,
      parseArtistProductId(productId),
      parseProductMediaUploadRequest(body)
    );
  }

  @Post(":mediaId/complete")
  @Header("Cache-Control", "no-store")
  complete(@Req() request: AuthorizedRequest, @Param("productId") productId: string, @Param("mediaId") mediaId: string) {
    return this.media.completeUpload(
      request.authorizationContext!,
      parseArtistProductId(productId),
      parseArtistProductId(mediaId)
    );
  }
}
