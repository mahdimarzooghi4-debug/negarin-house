import {Controller,Get,Header,Param,Post,Put,Body,Query,Req,UseGuards} from "@nestjs/common";
import {AuthorizationGuard,type AuthorizedRequest} from "./authorization.guard.js";
import {parseArtistProductId} from "./artist-products.js";
import {ArtistPublicContentService,parsePublicText,parsePublicSwitch,parseContentPage,parseStoryProduct} from "./artist-public-content.js";
@Controller("artist")
@UseGuards(AuthorizationGuard)
export class ArtistPublicContentController {
 constructor(private readonly content:ArtistPublicContentService){}
 @Get("public-profile") @Header("Cache-Control","no-store")
 profile(@Req() req:AuthorizedRequest){return this.content.ownProfile(req.authorizationContext!);}
 @Put("public-profile") @Header("Cache-Control","no-store")
 saveProfile(@Req() req:AuthorizedRequest,@Body() body:unknown){return this.content.saveProfile(req.authorizationContext!,parsePublicText(body));}
 @Post("public-profile/publication") @Header("Cache-Control","no-store")
 publishProfile(@Req() req:AuthorizedRequest,@Body() body:unknown){return this.content.switchProfile(req.authorizationContext!,parsePublicSwitch(body));}
 @Get("stories") @Header("Cache-Control","no-store")
 stories(@Req() req:AuthorizedRequest){return this.content.ownStories(req.authorizationContext!);}
 @Get("stories/eligible-products") @Header("Cache-Control","no-store")
 eligibleProducts(@Req() req:AuthorizedRequest,@Query() query:Record<string,unknown>){const {page,pageSize}=parseContentPage(query);return this.content.eligibleProducts(req.authorizationContext!,page,pageSize);}
 @Put("stories/:id/product") @Header("Cache-Control","no-store")
 linkProduct(@Req() req:AuthorizedRequest,@Param("id") id:string,@Body() body:unknown){return this.content.linkProduct(req.authorizationContext!,parseArtistProductId(id),parseStoryProduct(body));}
 @Put("stories/:id") @Header("Cache-Control","no-store")
 saveStory(@Req() req:AuthorizedRequest,@Param("id") id:string,@Body() body:unknown){return this.content.saveStory(req.authorizationContext!,parseArtistProductId(id),parsePublicText(body,true));}
 @Post("stories/:id/publication") @Header("Cache-Control","no-store")
 publishStory(@Req() req:AuthorizedRequest,@Param("id") id:string,@Body() body:unknown){return this.content.switchStory(req.authorizationContext!,parseArtistProductId(id),parsePublicSwitch(body));}
}
@Controller("catalog")
export class PublicArtistContentController {
 constructor(private readonly content:ArtistPublicContentService){}
 @Get("artists") @Header("Cache-Control","no-store")
 artists(@Query() query:Record<string,unknown>){const {page,pageSize}=parseContentPage(query);return this.content.artists(page,pageSize);}
 @Get("artists/:id") @Header("Cache-Control","no-store")
 artist(@Param("id") id:string){return this.content.artist(parseArtistProductId(id));}
 @Get("artists/:id/products") @Header("Cache-Control","no-store")
 products(@Param("id") id:string,@Query() query:Record<string,unknown>){const {page,pageSize}=parseContentPage(query);return this.content.products(parseArtistProductId(id),page,pageSize);}
 @Get("artists/:id/stories") @Header("Cache-Control","no-store")
 artistStories(@Param("id") id:string,@Query() query:Record<string,unknown>){const {page,pageSize}=parseContentPage(query);return this.content.stories(page,pageSize,parseArtistProductId(id));}
 @Get("stories") @Header("Cache-Control","no-store")
 stories(@Query() query:Record<string,unknown>){const {page,pageSize}=parseContentPage(query);return this.content.stories(page,pageSize);}
 @Get("stories/:id") @Header("Cache-Control","no-store")
 story(@Param("id") id:string){return this.content.story(parseArtistProductId(id));}
}
