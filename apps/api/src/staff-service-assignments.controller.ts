import { Body, Controller, Get, Header, Post, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseServiceAssignmentInput, StaffServiceAssignmentsService } from "./staff-service-assignments.js";

@Controller("admin/service-assignments")
@UseGuards(AuthorizationGuard)
export class StaffServiceAssignmentsController {
  constructor(private readonly assignments: StaffServiceAssignmentsService) {}

  @Get("options")
  @Header("Cache-Control", "no-store")
  options(@Req() request: AuthorizedRequest) {
    return this.assignments.options(request.authorizationContext!);
  }

  @Post()
  @Header("Cache-Control", "no-store")
  assign(@Req() request: AuthorizedRequest, @Body() body: unknown) {
    return this.assignments.assign(request.authorizationContext!, parseServiceAssignmentInput(body));
  }
}
