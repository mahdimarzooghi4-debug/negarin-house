import { BadRequestException, Body, Controller, Get, Header, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { CorporateBuyingService, parseCorporateBuyingInput } from "./corporate-buying.js";
import { parseArtistProductId } from "./artist-products.js";

@Controller("corporate-buyer")
@UseGuards(AuthorizationGuard)
export class CorporateBuyingController {
  constructor(private readonly buying: CorporateBuyingService) {}

  @Get("purchase-requests")
  @Header("Cache-Control", "no-store")
  listRequests(@Req() request: AuthorizedRequest) {
    return this.buying.listRequests(request.authorizationContext!);
  }

  @Post("purchase-requests")
  @Header("Cache-Control", "no-store")
  createRequest(@Req() request: AuthorizedRequest, @Body() body: unknown) {
    return this.buying.createRequest(request.authorizationContext!, parseCorporateBuyingInput(body));
  }

  @Get("orders")
  @Header("Cache-Control", "no-store")
  listOrders(@Req() request: AuthorizedRequest) {
    return this.buying.listOrders(request.authorizationContext!);
  }

  @Post("orders")
  @Header("Cache-Control", "no-store")
  createOrder(@Req() request: AuthorizedRequest, @Body() body: unknown) {
    return this.buying.createOrder(request.authorizationContext!, parseCorporateBuyingInput(body));
  }

  @Post("orders/:orderId/cancel")
  @Header("Cache-Control", "no-store")
  cancelOrder(@Req() request: AuthorizedRequest, @Param("orderId") orderId: string) {
    return this.buying.cancelOrder(request.authorizationContext!, parseArtistProductId(orderId));
  }
}

@Controller("artist/corporate-purchase-requests")
@UseGuards(AuthorizationGuard)
export class ArtistCorporatePurchaseRequestsController {
  constructor(private readonly buying: CorporateBuyingService) {}

  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() request: AuthorizedRequest) {
    return this.buying.listArtistRequests(request.authorizationContext!);
  }

  @Patch(":requestId/review")
  @Header("Cache-Control", "no-store")
  review(@Req() request: AuthorizedRequest, @Param("requestId") requestId: string, @Body() body: unknown) {
    const id = parseArtistProductId(requestId);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new BadRequestException();
    const value = body as Record<string, unknown>;
    if (Object.keys(value).length !== 1 || (value.status !== "in_review" && value.status !== "declined")) {
      throw new BadRequestException();
    }
    return this.buying.reviewArtistRequest(request.authorizationContext!, id, value.status);
  }
}
