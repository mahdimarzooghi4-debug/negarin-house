import { Controller, Get, Header, Query, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { FinancialEventsService, parseFinancialEventPage } from "./financial-events.js";
@Controller("artist/finance/events")
@UseGuards(AuthorizationGuard)
export class ArtistFinancialEventsController {
  constructor(private readonly events: FinancialEventsService) {}
  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() req: AuthorizedRequest, @Query() query: Record<string, unknown>) {
    return this.events.artist(req.authorizationContext!, parseFinancialEventPage(query));
  }
}
@Controller("admin/financial-events")
@UseGuards(AuthorizationGuard)
export class AdminFinancialEventsController {
  constructor(private readonly events: FinancialEventsService) {}
  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() req: AuthorizedRequest, @Query() query: Record<string, unknown>) {
    return this.events.staff(req.authorizationContext!, parseFinancialEventPage(query));
  }
}
