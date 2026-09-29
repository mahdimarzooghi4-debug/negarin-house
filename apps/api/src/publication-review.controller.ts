import {
  Body, Controller, Get, Header, Param, Post, Req, UseGuards
} from "@nestjs/common";
import { parseArtistProductId } from "./artist-products.js";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parsePublicationReviewDecision, PublicationReviewService } from "./publication-review.js";

@Controller()
@UseGuards(AuthorizationGuard)
export class PublicationReviewController {
  constructor(private readonly reviews: PublicationReviewService) {}

  @Post("artist/products/:id/submit-review")
  @Header("Cache-Control", "no-store")
  submit(@Req() request: AuthorizedRequest, @Param("id") id: string) {
    return this.reviews.submit(request.authorizationContext!, parseArtistProductId(id));
  }

  @Get("artist/products/:id/review-history")
  @Header("Cache-Control", "no-store")
  history(@Req() request: AuthorizedRequest, @Param("id") id: string) {
    return this.reviews.history(request.authorizationContext!, parseArtistProductId(id));
  }

  @Get("staff/publication-reviews")
  @Header("Cache-Control", "no-store")
  queue(@Req() request: AuthorizedRequest) {
    return this.reviews.queue(request.authorizationContext!);
  }

  @Post("staff/publication-reviews/:id/decision")
  @Header("Cache-Control", "no-store")
  decide(@Req() request: AuthorizedRequest, @Param("id") id: string, @Body() body: unknown) {
    const input = parsePublicationReviewDecision(body);
    return this.reviews.decide(
      request.authorizationContext!,
      parseArtistProductId(id),
      input.decision,
      input.feedback
    );
  }
}
