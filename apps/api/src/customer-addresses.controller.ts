import { BadRequestException, Body, Controller, Delete, Get, Header, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseArtistProductId } from "./artist-products.js";
import { CustomerAddressesService, parseAddressCommand } from "./customer-addresses.js";

@Controller("customer/addresses")
@UseGuards(AuthorizationGuard)
export class CustomerAddressesController {
  constructor(private readonly addresses: CustomerAddressesService) {}
  @Get()
  @Header("Cache-Control", "no-store")
  get(@Req() req: AuthorizedRequest, @Query() query: Record<string, unknown>) {
    if (Object.keys(query).length) throw new BadRequestException();
    return this.addresses.get(req.authorizationContext!);
  }
  @Post()
  @Header("Cache-Control", "no-store")
  create(@Req() req: AuthorizedRequest, @Body() body: unknown) {
    return this.addresses.change(req.authorizationContext!, parseAddressCommand(body, true), "create");
  }
  @Put(":id")
  @Header("Cache-Control", "no-store")
  replace(@Req() req: AuthorizedRequest, @Param("id") id: string, @Body() body: unknown) {
    return this.addresses.change(req.authorizationContext!, parseAddressCommand(body, true), "replace", parseArtistProductId(id));
  }
  @Put(":id/default")
  @Header("Cache-Control", "no-store")
  setDefault(@Req() req: AuthorizedRequest, @Param("id") id: string, @Body() body: unknown) {
    return this.addresses.change(req.authorizationContext!, parseAddressCommand(body), "default", parseArtistProductId(id));
  }
  @Delete(":id")
  @Header("Cache-Control", "no-store")
  remove(@Req() req: AuthorizedRequest, @Param("id") id: string, @Body() body: unknown) {
    return this.addresses.change(req.authorizationContext!, parseAddressCommand(body), "delete", parseArtistProductId(id));
  }
}
