import { Body, Controller, Get, Header, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parseOrderPage } from "./customer-orders.js";
import { RefundFinanceService, parseRefundReview } from "./refund-finance.js";
@Controller("admin/refund-reviews")
@UseGuards(AuthorizationGuard)
export class RefundFinanceController {
  constructor(private readonly finance: RefundFinanceService) {}
  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() req: AuthorizedRequest, @Query() query: Record<string, unknown>) {
    const { page, pageSize } = parseOrderPage(query);
    return this.finance.list(req.authorizationContext!, page, pageSize);
  }
  @Get(":shipmentId")
  @Header("Cache-Control", "no-store")
  get(@Req() req: AuthorizedRequest, @Param("shipmentId") shipmentId: string) {
    return this.finance.get(req.authorizationContext!, parseArtistProductId(shipmentId));
  }
  @Post(":shipmentId")
  @Header("Cache-Control", "no-store")
  review(@Req() req: AuthorizedRequest & { id: string }, @Param("shipmentId") shipmentId: string, @Body() body: unknown) {
    return this.finance.review(req.authorizationContext!, parseArtistProductId(shipmentId), parseRefundReview(body), req.id);
  }
}
