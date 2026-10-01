import { Body, Controller, Get, Header, Post, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { ArtistServiceRequestsService, parseArtistServiceRequestInput } from "./artist-service-requests.js";

@Controller("artist/service-requests")
@UseGuards(AuthorizationGuard)
export class ArtistServiceRequestsController {
  constructor(private readonly requests: ArtistServiceRequestsService) {}

  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() request: AuthorizedRequest) {
    return this.requests.list(request.authorizationContext!);
  }

  @Post()
  @Header("Cache-Control", "no-store")
  create(@Req() request: AuthorizedRequest, @Body() body: unknown) {
    return this.requests.create(request.authorizationContext!, parseArtistServiceRequestInput(body));
  }
}
