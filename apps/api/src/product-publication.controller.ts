import { BadRequestException, Body, Controller, Get, Header, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { ArtistProductsService, parseArtistProductId } from "./artist-products.js";
import { parsePublicationCommand, parsePublicationQueueQuery, ProductPublicationService } from "./product-publication.js";
import { parseProductContent } from "./product-specifications.js";

type Request = AuthorizedRequest & { id: string };

@Controller("artist/products")
@UseGuards(AuthorizationGuard)
export class ArtistPublicationController {
  constructor(private readonly publication: ProductPublicationService, private readonly products: ArtistProductsService) {}

  @Get(":id/change-proposal")
  @Header("Cache-Control", "no-store")
  async changeProposal(@Req() req: Request, @Param("id") id: string) {
    const product = await this.products.get(req.authorizationContext!, parseArtistProductId(id));
    return product.pendingChange;
  }

  @Put(":id/change-proposal")
  @Header("Cache-Control", "no-store")
  saveChangeProposal(@Req() req: Request, @Param("id") id: string, @Body() body: unknown) {
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
    const input = body as Record<string, unknown>;
    if (Object.keys(input).some(key => !["version", "content"].includes(key)) || !Number.isSafeInteger(input.version) ||
      (input.version as number) < 0 || (input.version as number) >= 2_147_483_647) throw new BadRequestException();
    return this.products.saveChangeProposal(req.authorizationContext!, parseArtistProductId(id),
      { version: input.version as number, content: parseProductContent(input.content) }, req.id);
  }

  @Post(":id/change-proposal/submit")
  @Header("Cache-Control", "no-store")
  submitChangeProposal(@Req() req: Request, @Param("id") id: string, @Body() body: unknown) {
    const input = parsePublicationCommand(body);
    return this.publication.submitChangeProposal(req.authorizationContext!, parseArtistProductId(id), input.version, req.id);
  }

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
  queue(@Req() req: Request, @Query() query: Record<string, unknown>) {
    return this.publication.queue(req.authorizationContext!, parsePublicationQueueQuery(query));
  }

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
