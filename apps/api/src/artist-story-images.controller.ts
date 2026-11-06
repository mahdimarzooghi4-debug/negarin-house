import {Body,Controller,Delete,Get,Header,Param,Post,Req,UseGuards,BadRequestException} from "@nestjs/common";
import {AuthorizationGuard,type AuthorizedRequest} from "./authorization.guard.js";
import {parseArtistProductId} from "./artist-products.js";
import {parseCartCommand} from "./customer-cart.js";
import {parseImageCommand} from "./product-images.js";
import {ArtistStoryImagesService} from "./artist-story-images.js";
@Controller("artist/stories") @UseGuards(AuthorizationGuard)
export class ArtistStoryImagesController {
 constructor(private readonly images:ArtistStoryImagesService){}
 @Post(":id/image") @Header("Cache-Control","no-store")
 upload(@Req() req:AuthorizedRequest,@Param("id") id:string,@Body() body:unknown){const input=parseImageCommand(body,true);return this.images.upload(req.authorizationContext!,parseArtistProductId(id),input.version,input.bytes);}
 @Delete(":id/image") @Header("Cache-Control","no-store")
 remove(@Req() req:AuthorizedRequest,@Param("id") id:string,@Body() body:unknown){if(!body||typeof body!=="object"||Array.isArray(body)||Object.keys(body).some(k=>k!=="version"))throw new BadRequestException();return this.images.remove(req.authorizationContext!,parseArtistProductId(id),parseCartCommand(body).version);}
 @Get(":id/images/:imageId") @Header("Cache-Control","no-store")
 read(@Req() req:AuthorizedRequest,@Param("id") id:string,@Param("imageId") imageId:string){return this.images.read(parseArtistProductId(id),parseArtistProductId(imageId),req.authorizationContext!);}
}
@Controller("catalog/stories")
export class PublicStoryImagesController {
 constructor(private readonly images:ArtistStoryImagesService){}
 @Get(":id/images/:imageId") @Header("Cache-Control","no-store")
 read(@Param("id") id:string,@Param("imageId") imageId:string){return this.images.read(parseArtistProductId(id),parseArtistProductId(imageId));}
}
