import { Controller, Get, Header, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { ServicePartnerAssignmentsService } from "./service-partner-assignments.js";

@Controller("service-partner/assignments")
@UseGuards(AuthorizationGuard)
export class ServicePartnerAssignmentsController {
  constructor(private readonly assignments: ServicePartnerAssignmentsService) {}

  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() request: AuthorizedRequest) {
    return this.assignments.list(request.authorizationContext!);
  }
}
