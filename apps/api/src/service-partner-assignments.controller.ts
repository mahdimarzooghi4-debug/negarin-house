import { Body, Controller, Get, Header, NotFoundException, Param, Post, Req, UseGuards } from "@nestjs/common";
import { parseArtistProductId } from "./artist-products.js";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { ServicePartnerAssignmentsService } from "./service-partner-assignments.js";
import { parseServiceAssignmentResponse } from "./service-partner-assignments.js";

@Controller("service-partner/assignments")
@UseGuards(AuthorizationGuard)
export class ServicePartnerAssignmentsController {
  constructor(private readonly assignments: ServicePartnerAssignmentsService) {}

  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() request: AuthorizedRequest) {
    return this.assignments.list(request.authorizationContext!);
  }

  @Get(":assignmentId")
  @Header("Cache-Control", "no-store")
  async get(@Req() request: AuthorizedRequest, @Param("assignmentId") assignmentId: string) {
    const assignment = await this.assignments.get(
      request.authorizationContext!,
      parseArtistProductId(assignmentId)
    );
    if (!assignment) throw new NotFoundException();
    return assignment;
  }

  @Post(":assignmentId/response")
  @Header("Cache-Control", "no-store")
  respond(@Req() request: AuthorizedRequest, @Param("assignmentId") assignmentId: string, @Body() body: unknown) {
    return this.assignments.respond(
      request.authorizationContext!,
      parseArtistProductId(assignmentId),
      parseServiceAssignmentResponse(body)
    );
  }
}
