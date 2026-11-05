import {BadRequestException,Body,Controller,Delete,Get,Header,Param,Put,Query,Req,UseGuards} from "@nestjs/common";
import {AuthorizationGuard,type AuthorizedRequest} from "./authorization.guard.js";
import {parseArtistProductId} from "./artist-products.js";
import {parseCartCommand} from "./customer-cart.js";
import {CustomerFavoritesService} from "./customer-favorites.js";
@Controller("customer/favorites")
@UseGuards(AuthorizationGuard)
export class CustomerFavoritesController {
  constructor(private readonly favorites:CustomerFavoritesService){}
  @Get()
  @Header("Cache-Control","no-store")
  get(@Req() req:AuthorizedRequest,@Query() query:Record<string,unknown>){
    if(Object.keys(query).length)throw new BadRequestException();
    return this.favorites.get(req.authorizationContext!);
  }
  @Put(":productId")
  @Header("Cache-Control","no-store")
  save(@Req() req:AuthorizedRequest,@Param("productId") productId:string,@Body() body:unknown){return this.favorites.change(req.authorizationContext!,parseCartCommand(body).version,parseArtistProductId(productId),true);}
  @Delete(":productId")
  @Header("Cache-Control","no-store")
  remove(@Req() req:AuthorizedRequest,@Param("productId") productId:string,@Body() body:unknown){return this.favorites.change(req.authorizationContext!,parseCartCommand(body).version,parseArtistProductId(productId),false);}
}
