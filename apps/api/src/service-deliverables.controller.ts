import { Body, Controller, Get, Header, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { parseDeliverableUpload, ServiceDeliverablesService } from "./service-deliverables.js";
type Request = AuthorizedRequest & { id: string };
@Controller("service-partner/assignments")
@UseGuards(AuthorizationGuard)
export class PartnerDeliverablesController {
  constructor(private readonly files: ServiceDeliverablesService) {}
  @Post(":id/files")
  @Header("Cache-Control", "no-store")
  upload(@Req() r: Request, @Param("id") id: string, @Body() body: unknown) { return this.files.upload(r.authorizationContext!, parseArtistProductId(id), parseDeliverableUpload(body), r.id); }
  @Get(":id/files/:fileId")
  @Header("Cache-Control", "no-store")
  read(@Req() r: Request, @Param("id") id: string, @Param("fileId") fileId: string) { return this.files.read(r.authorizationContext!, parseArtistProductId(id), parseArtistProductId(fileId), "partner"); }
}
@Controller("artist/service-assignments")
@UseGuards(AuthorizationGuard)
export class ArtistDeliverablesController {
  constructor(private readonly files: ServiceDeliverablesService) {}
  @Get(":id/files/:fileId")
  @Header("Cache-Control", "no-store")
  read(@Req() r: Request, @Param("id") id: string, @Param("fileId") fileId: string) { return this.files.read(r.authorizationContext!, parseArtistProductId(id), parseArtistProductId(fileId), "artist"); }
}
@Controller("admin/service-assignments")
@UseGuards(AuthorizationGuard)
export class AdminDeliverablesController {
  constructor(private readonly files: ServiceDeliverablesService) {}
  @Get(":id/files/:fileId")
  @Header("Cache-Control", "no-store")
  read(@Req() r: Request, @Param("id") id: string, @Param("fileId") fileId: string) { return this.files.read(r.authorizationContext!, parseArtistProductId(id), parseArtistProductId(fileId), "staff"); }
}
