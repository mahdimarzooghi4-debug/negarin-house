import { Body, Controller, Get, Header, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseSupportProgramId, parseSupportProgramInput, SupportProgramsService } from "./support-programs.js";

@Controller("supporting-organization/programs")
@UseGuards(AuthorizationGuard)
export class SupportProgramsController {
  constructor(private readonly programs: SupportProgramsService) {}

  @Get()
  @Header("Cache-Control", "no-store")
  list(@Req() request: AuthorizedRequest) {
    return this.programs.list(request.authorizationContext!);
  }

  @Post()
  @Header("Cache-Control", "no-store")
  create(@Req() request: AuthorizedRequest, @Body() body: unknown) {
    return this.programs.create(request.authorizationContext!, parseSupportProgramInput(body));
  }

  @Patch(":programId")
  @Header("Cache-Control", "no-store")
  update(@Req() request: AuthorizedRequest, @Param("programId") programId: string, @Body() body: unknown) {
    return this.programs.update(request.authorizationContext!, parseSupportProgramId(programId), parseSupportProgramInput(body));
  }
}
