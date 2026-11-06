import {Body,Controller,Delete,Get,Header,Param,Post,Req,UseGuards,BadRequestException} from "@nestjs/common";
import {AuthorizationGuard,type AuthorizedRequest} from "./authorization.guard.js";
import {parseArtistProductId} from "./artist-products.js";
import {parseCartCommand} from "./customer-cart.js";
import {parseImageCommand} from "./product-images.js";
import {ArtistStoryVideosService} from "./artist-story-videos.js";
@Controller("artist/stories") @UseGuards(AuthorizationGuard)
export class ArtistStoryVideosController {
 constructor(private readonly videos:ArtistStoryVideosService){}
 @Post(":id/video") @Header("Cache-Control","no-store")
 upload(@Req() req:AuthorizedRequest,@Param("id") id:string,@Body() body:unknown){const input=parseImageCommand(body,true);return this.videos.upload(req.authorizationContext!,parseArtistProductId(id),input.version,input.bytes);}
 @Delete(":id/video") @Header("Cache-Control","no-store")
 remove(@Req() req:AuthorizedRequest,@Param("id") id:string,@Body() body:unknown){if(!body||typeof body!=="object"||Array.isArray(body)||Object.keys(body).some(k=>k!=="version"))throw new BadRequestException();return this.videos.remove(req.authorizationContext!,parseArtistProductId(id),parseCartCommand(body).version);}
 @Get(":id/videos/:videoId") @Header("Cache-Control","no-store")
 read(@Req() req:AuthorizedRequest,@Param("id") id:string,@Param("videoId") videoId:string){return this.videos.read(parseArtistProductId(id),parseArtistProductId(videoId),req.authorizationContext!);}
}
@Controller("catalog/stories")
export class PublicStoryVideosController {
 constructor(private readonly videos:ArtistStoryVideosService){}
 @Get(":id/videos/:videoId") @Header("Cache-Control","no-store")
 read(@Param("id") id:string,@Param("videoId") videoId:string){return this.videos.read(parseArtistProductId(id),parseArtistProductId(videoId));}
}
