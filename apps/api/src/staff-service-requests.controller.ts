import { Body, Controller, Header, Post, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseServiceRequestInput, StaffServiceRequestsService } from "./staff-service-requests.js";

@Controller("admin/service-requests")
@UseGuards(AuthorizationGuard)
export class StaffServiceRequestsController {
  constructor(private readonly requests: StaffServiceRequestsService) {}

  @Post()
  @Header("Cache-Control", "no-store")
  create(@Req() request: AuthorizedRequest, @Body() body: unknown) {
    return this.requests.create(request.authorizationContext!, parseServiceRequestInput(body));
  }
}
