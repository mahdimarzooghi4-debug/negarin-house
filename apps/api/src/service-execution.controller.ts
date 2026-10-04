import { Body, Controller, Header, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parseServiceExecutionReview, parseServiceProgress, parseServiceSchedule, ServiceExecutionService } from "./service-execution.js";
type Request = AuthorizedRequest & { id: string };
@Controller("service-partner/assignments")
@UseGuards(AuthorizationGuard)
export class PartnerServiceExecutionController {
  constructor(private readonly execution: ServiceExecutionService) {}
  @Post(":id/schedule")
  @Header("Cache-Control", "no-store")
  schedule(@Req() r: Request, @Param("id") id: string, @Body() body: unknown) { return this.execution.schedule(r.authorizationContext!, parseArtistProductId(id), parseServiceSchedule(body), r.id); }
  @Post(":id/execution")
  @Header("Cache-Control", "no-store")
  progress(@Req() r: Request, @Param("id") id: string, @Body() body: unknown) { return this.execution.progress(r.authorizationContext!, parseArtistProductId(id), parseServiceProgress(body), r.id); }
}
@Controller("admin/service-assignments")
@UseGuards(AuthorizationGuard)
export class AdminServiceExecutionController {
  constructor(private readonly execution: ServiceExecutionService) {}
  @Post(":id/execution-review")
  @Header("Cache-Control", "no-store")
  review(@Req() r: Request, @Param("id") id: string, @Body() body: unknown) { return this.execution.review(r.authorizationContext!, parseArtistProductId(id), parseServiceExecutionReview(body), r.id); }
}
