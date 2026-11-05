import {BadRequestException,Body,Controller,Get,Header,Put,Query,Req,UseGuards} from "@nestjs/common";
import {AuthorizationGuard,type AuthorizedRequest} from "./authorization.guard.js";
import {CustomerProfileService,parseProfileCommand} from "./customer-profile.js";
@Controller("customer/profile")
@UseGuards(AuthorizationGuard)
export class CustomerProfileController {
 constructor(private readonly profile:CustomerProfileService){}
 @Get()
 @Header("Cache-Control","no-store")
 get(@Req() req:AuthorizedRequest,@Query() query:Record<string,unknown>){if(Object.keys(query).length)throw new BadRequestException();return this.profile.get(req.authorizationContext!);}
 @Put()
 @Header("Cache-Control","no-store")
 change(@Req() req:AuthorizedRequest,@Body() body:unknown){return this.profile.change(req.authorizationContext!,parseProfileCommand(body));}
}
