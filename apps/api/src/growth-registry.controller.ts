import { Controller, Get, Header, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { assertArtistGrowthRead, assertStaffGrowthRead, growthRegistryView } from "./growth-registry.js";

@Controller("artist/growth")
@UseGuards(AuthorizationGuard)
export class ArtistGrowthRegistryController {
  @Get("levels")
  @Header("Cache-Control", "no-store")
  levels(@Req() request: AuthorizedRequest) {
    assertArtistGrowthRead(request.authorizationContext!);
    return growthRegistryView();
  }
}

@Controller("admin/growth")
@UseGuards(AuthorizationGuard)
export class AdminGrowthRegistryController {
  @Get("levels")
  @Header("Cache-Control", "no-store")
  levels(@Req() request: AuthorizedRequest) {
    assertStaffGrowthRead(request.authorizationContext!);
    return growthRegistryView();
  }
}
