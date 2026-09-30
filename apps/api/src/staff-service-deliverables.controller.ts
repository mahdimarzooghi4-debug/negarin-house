import { Body, Controller, Get, Header, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseServiceDeliverableId, parseServiceDeliverableReview, StaffServiceDeliverablesService } from "./staff-service-deliverables.js";

@Controller("admin/service-deliverables")
@UseGuards(AuthorizationGuard)
export class StaffServiceDeliverablesController {
  constructor(private readonly deliverables: StaffServiceDeliverablesService) {}

  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() request: AuthorizedRequest) {
    return this.deliverables.list(request.authorizationContext!);
  }

  @Post(":deliverableId/review")
  @Header("Cache-Control", "no-store")
  review(@Req() request: AuthorizedRequest, @Param("deliverableId") deliverableId: string, @Body() body: unknown) {
    const { decision, feedback } = parseServiceDeliverableReview(body);
    return this.deliverables.review(request.authorizationContext!, parseServiceDeliverableId(deliverableId), decision, feedback);
  }
}
