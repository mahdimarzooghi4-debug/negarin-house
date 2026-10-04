import { BadRequestException, Controller, Get, Header, Param, Query, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parseOrderPage } from "./customer-orders.js";
import { ArtistFinanceService } from "./artist-finance.js";
@Controller("artist/finance/orders")
@UseGuards(AuthorizationGuard)
export class ArtistFinanceController {
  constructor(private readonly finance: ArtistFinanceService) {}
  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() req: AuthorizedRequest, @Query() query: Record<string, unknown>) {
    const { page, pageSize } = parseOrderPage(query);
    return this.finance.listArtist(req.authorizationContext!, page, pageSize);
  }
  @Get(":orderId")
  @Header("Cache-Control", "no-store")
  get(@Req() req: AuthorizedRequest, @Param("orderId") orderId: string) {
    return this.finance.getArtist(req.authorizationContext!, parseArtistProductId(orderId));
  }
}
@Controller("admin/domestic-finance/orders")
@UseGuards(AuthorizationGuard)
export class AdminDomesticFinanceController {
  constructor(private readonly finance: ArtistFinanceService) {}
  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() req: AuthorizedRequest, @Query() query: Record<string, unknown>) {
    const { artistUserId, ...paging } = query;
    if (artistUserId !== undefined && typeof artistUserId !== "string") throw new BadRequestException();
    const { page, pageSize } = parseOrderPage(paging);
    return this.finance.listStaff(req.authorizationContext!, page, pageSize, artistUserId === undefined ? undefined : parseArtistProductId(artistUserId as string));
  }
  @Get(":orderId/artists/:artistUserId")
  @Header("Cache-Control", "no-store")
  get(@Req() req: AuthorizedRequest, @Param("orderId") orderId: string, @Param("artistUserId") artistUserId: string) {
    return this.finance.getStaff(req.authorizationContext!, parseArtistProductId(artistUserId), parseArtistProductId(orderId));
  }
}
