import { Body, Controller, Get, Header, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parsePublicationCommand, ProductPublicationService } from "./product-publication.js";

type Request = AuthorizedRequest & { id: string };

@Controller("artist/products")
@UseGuards(AuthorizationGuard)
export class ArtistPublicationController {
  constructor(private readonly publication: ProductPublicationService) {}

  @Post(":id/submit")
  @Header("Cache-Control", "no-store")
  submit(@Req() req: Request, @Param("id") id: string, @Body() body: unknown) {
    return this.publication.transition(req.authorizationContext!, parseArtistProductId(id), "submit", parsePublicationCommand(body), req.id);
  }

  @Post(":id/publish")
  @Header("Cache-Control", "no-store")
  publish(@Req() req: Request, @Param("id") id: string, @Body() body: unknown) {
    return this.publication.transition(req.authorizationContext!, parseArtistProductId(id), "publish", parsePublicationCommand(body), req.id);
  }

  @Get(":id/publication-history")
  @Header("Cache-Control", "no-store")
  history(@Req() req: Request, @Param("id") id: string) {
    return this.publication.history(req.authorizationContext!, parseArtistProductId(id));
  }
}

@Controller("admin/product-reviews")
@UseGuards(AuthorizationGuard)
export class AdminProductReviewsController {
  constructor(private readonly publication: ProductPublicationService) {}

  @Get()
  @Header("Cache-Control", "no-store")
  queue(@Req() req: Request) { return this.publication.queue(req.authorizationContext!); }

  @Get(":id")
  @Header("Cache-Control", "no-store")
  review(@Req() req: Request, @Param("id") id: string) {
    return this.publication.review(req.authorizationContext!, parseArtistProductId(id));
  }

  @Get(":id/history")
  @Header("Cache-Control", "no-store")
  history(@Req() req: Request, @Param("id") id: string) {
    return this.publication.history(req.authorizationContext!, parseArtistProductId(id), true);
  }

  @Post(":id/approve")
  @Header("Cache-Control", "no-store")
  approve(@Req() req: Request, @Param("id") id: string, @Body() body: unknown) {
    return this.publication.transition(req.authorizationContext!, parseArtistProductId(id), "approve", parsePublicationCommand(body), req.id);
  }

  @Post(":id/request-changes")
  @Header("Cache-Control", "no-store")
  requestChanges(@Req() req: Request, @Param("id") id: string, @Body() body: unknown) {
    return this.publication.transition(req.authorizationContext!, parseArtistProductId(id), "request-changes", parsePublicationCommand(body, true), req.id);
  }
}
