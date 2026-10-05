import { Controller, Get, Header, Param, Req, UseGuards } from "@nestjs/common";
import { AdminOrderTraceService } from "./admin-order-trace.js";
import { parseArtistProductId } from "./artist-products.js";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";

@Controller("admin/orders")
@UseGuards(AuthorizationGuard)
export class AdminOrderTraceController {
  constructor(private readonly trace: AdminOrderTraceService) {}

  @Get(":id/trace")
  @Header("Cache-Control", "no-store")
  get(@Req() request: AuthorizedRequest, @Param("id") id: string) {
    return this.trace.get(request.authorizationContext!, parseArtistProductId(id));
  }
}
