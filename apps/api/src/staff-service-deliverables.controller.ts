import { Controller, Get, Header, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { StaffServiceDeliverablesService } from "./staff-service-deliverables.js";

@Controller("admin/service-deliverables")
@UseGuards(AuthorizationGuard)
export class StaffServiceDeliverablesController {
  constructor(private readonly deliverables: StaffServiceDeliverablesService) {}

  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() request: AuthorizedRequest) {
    return this.deliverables.list(request.authorizationContext!);
  }
}
