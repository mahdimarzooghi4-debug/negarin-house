import { BadRequestException, Body, Controller, Get, Header, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { CustomerPaymentsService, parseEmptyPaymentBody, parsePaymentStart } from "./customer-payments.js";
@Controller("customer/orders/:orderId/payment")
@UseGuards(AuthorizationGuard)
export class CustomerPaymentsController {
  constructor(private readonly payments: CustomerPaymentsService) {}
  @Get()
  @Header("Cache-Control", "no-store")
  get(@Req() req: AuthorizedRequest, @Param("orderId") orderId: string, @Query() query: Record<string, unknown>) {
    if (Object.keys(query).length) throw new BadRequestException();
    return this.payments.get(req.authorizationContext!, parseArtistProductId(orderId));
  }
  @Post()
  @Header("Cache-Control", "no-store")
  start(@Req() req: AuthorizedRequest & { id: string }, @Param("orderId") orderId: string, @Body() body: unknown) {
    return this.payments.start(req.authorizationContext!, parseArtistProductId(orderId), parsePaymentStart(body), req.id);
  }
  @Post(":attemptId/verify")
  @Header("Cache-Control", "no-store")
  verify(@Req() req: AuthorizedRequest & { id: string }, @Param("orderId") orderId: string, @Param("attemptId") attemptId: string, @Body() body: unknown) {
    parseEmptyPaymentBody(body);
    return this.payments.verify(req.authorizationContext!, parseArtistProductId(orderId), parseArtistProductId(attemptId), req.id);
  }
}
