import {
  BadRequestException, Body, Controller, Get, Header, Param, Patch, Post, Query, Req, UseGuards
} from "@nestjs/common";
import { ArtistProductsService, parseArtistProductId, parseArtistProductWrite } from "./artist-products.js";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";

@Controller("artist/products")
@UseGuards(AuthorizationGuard)
export class ArtistProductsController {
  constructor(private readonly products: ArtistProductsService) {}

  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() request: AuthorizedRequest, @Query("includeArchived") includeArchived?: string) {
    if (includeArchived !== undefined && includeArchived !== "true" && includeArchived !== "false") {
      throw new BadRequestException();
    }
    return this.products.list(request.authorizationContext!, includeArchived === "true");
  }

  @Post()
  @Header("Cache-Control", "no-store")
  create(@Req() request: AuthorizedRequest, @Body() body: unknown) {
    return this.products.create(request.authorizationContext!, parseArtistProductWrite(body));
  }

  @Get(":id")
  @Header("Cache-Control", "no-store")
  get(@Req() request: AuthorizedRequest, @Param("id") id: string) {
    return this.products.get(request.authorizationContext!, parseArtistProductId(id));
  }

  @Patch(":id")
  @Header("Cache-Control", "no-store")
  update(@Req() request: AuthorizedRequest & { id: string }, @Param("id") id: string, @Body() body: unknown) {
    return this.products.update(
      request.authorizationContext!,
      parseArtistProductId(id),
      parseArtistProductWrite(body, true),
      request.id
    );
  }

  @Post(":id/archive")
  @Header("Cache-Control", "no-store")
  archive(@Req() request: AuthorizedRequest, @Param("id") id: string) {
    return this.products.setArchived(request.authorizationContext!, parseArtistProductId(id), true);
  }

  @Post(":id/restore")
  @Header("Cache-Control", "no-store")
  restore(@Req() request: AuthorizedRequest, @Param("id") id: string) {
    return this.products.setArchived(request.authorizationContext!, parseArtistProductId(id), false);
  }
}
