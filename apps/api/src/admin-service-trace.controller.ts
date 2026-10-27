import { Controller, Get, Header, Param, Req, UseGuards } from "@nestjs/common";
import { AdminServiceTraceService } from "./admin-service-trace.js";
import { parseArtistProductId } from "./artist-products.js";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";

@Controller("admin/service-requests")
@UseGuards(AuthorizationGuard)
export class AdminServiceTraceController {
  constructor(private readonly trace: AdminServiceTraceService) {}

  @Get(":id/trace")
  @Header("Cache-Control", "no-store")
  get(@Req() request: AuthorizedRequest, @Param("id") id: string) {
    return this.trace.get(request.authorizationContext!, parseArtistProductId(id));
  }
}
