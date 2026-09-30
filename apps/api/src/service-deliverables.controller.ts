import { Body, Controller, Get, Header, Param, Post, Req, UseGuards } from "@nestjs/common";
import { parseArtistProductId } from "./artist-products.js";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseServiceDeliverableUploadRequest, ServiceDeliverablesService } from "./service-deliverables.js";

@Controller("service-partner/assignments/:assignmentId/deliverables")
@UseGuards(AuthorizationGuard)
export class ServiceDeliverablesController {
  constructor(private readonly deliverables: ServiceDeliverablesService) {}

  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() request: AuthorizedRequest, @Param("assignmentId") assignmentId: string) {
    return this.deliverables.list(request.authorizationContext!, parseArtistProductId(assignmentId));
  }

  @Post("upload-url")
  @Header("Cache-Control", "no-store")
  requestUpload(@Req() request: AuthorizedRequest, @Param("assignmentId") assignmentId: string, @Body() body: unknown) {
    return this.deliverables.requestUpload(
      request.authorizationContext!,
      parseArtistProductId(assignmentId),
      parseServiceDeliverableUploadRequest(body)
    );
  }

  @Post(":deliverableId/upload-url")
  @Header("Cache-Control", "no-store")
  refreshUploadUrl(
    @Req() request: AuthorizedRequest,
    @Param("assignmentId") assignmentId: string,
    @Param("deliverableId") deliverableId: string
  ) {
    return this.deliverables.refreshUploadUrl(
      request.authorizationContext!, parseArtistProductId(assignmentId), parseArtistProductId(deliverableId)
    );
  }

  @Post(":deliverableId/complete")
  @Header("Cache-Control", "no-store")
  completeUpload(
    @Req() request: AuthorizedRequest,
    @Param("assignmentId") assignmentId: string,
    @Param("deliverableId") deliverableId: string
  ) {
    return this.deliverables.completeUpload(
      request.authorizationContext!, parseArtistProductId(assignmentId), parseArtistProductId(deliverableId)
    );
  }

  @Post(":deliverableId/submit")
  @Header("Cache-Control", "no-store")
  submit(
    @Req() request: AuthorizedRequest,
    @Param("assignmentId") assignmentId: string,
    @Param("deliverableId") deliverableId: string
  ) {
    return this.deliverables.submit(
      request.authorizationContext!, parseArtistProductId(assignmentId), parseArtistProductId(deliverableId)
    );
  }
}
