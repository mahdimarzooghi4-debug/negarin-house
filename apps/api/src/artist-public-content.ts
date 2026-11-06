import {BadRequestException,ConflictException,ForbiddenException,Injectable,NotFoundException} from "@nestjs/common";
import type {AuthorizationContext} from "@negarin/authz";
import {PrismaService} from "./prisma.service.js";
import {parseCartCommand} from "./customer-cart.js";
import {parseArtistProductId} from "./artist-products.js";
import type {Prisma} from "./generated/prisma/client.js";
function record(body:unknown){if(!body||typeof body!=="object"||Array.isArray(body))throw new BadRequestException();return body as Record<string,unknown>;}
export function parsePublicText(body:unknown,story=false){
 const raw=record(body),keys=story?["title","body"]:["displayName","biography","craft","city"];
 if(Object.keys(raw).some(k=>!["version",...keys].includes(k)))throw new BadRequestException();
 const fields:Record<string,string>={};
 for(const key of keys){
  const value=raw[key],max=key==="body"?10000:key==="biography"?2000:key==="title"?200:100;
  if(typeof value!=="string"||!value.trim()||value.trim().length>max||/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u.test(value))throw new BadRequestException();
  if(!["body","biography"].includes(key)&&/[\n\r\t]/.test(value))throw new BadRequestException();
  fields[key]=value.trim();
 }
 return {version:parseCartCommand({version:raw.version}).version,fields};
}
export function parsePublicSwitch(body:unknown){const raw=record(body);if(Object.keys(raw).some(k=>!["version","published"].includes(k))||typeof raw.published!=="boolean")throw new BadRequestException();return {...parseCartCommand({version:raw.version}),published:raw.published};}
export function parseContentPage(raw:Record<string,unknown>){
 if(Object.keys(raw).some(k=>!["page","pageSize"].includes(k)))throw new BadRequestException();
 const read=(key:string,fallback:number,max:number)=>{const value=raw[key];if(value===undefined)return fallback;if(typeof value!=="string"||!/^[1-9]\d{0,3}$/.test(value)||Number(value)>max)throw new BadRequestException();return Number(value);};
 return {page:read("page",1,1000),pageSize:read("pageSize",6,20)};
}
const publicProfile={artistId:true,displayName:true,biography:true,craft:true,city:true} as const;
const relatedProductSelect={id:true,title:true,priceToman:true,stockQuantity:true,publicationStatus:true,archivedAt:true,artistUserId:true} as const;
const publicStory={videoId:true,relatedProduct:{select:relatedProductSelect},imageId:true,id:true,title:true,body:true,publishedAt:true,profile:{select:publicProfile}} as const;
const publicProducts={id:true,title:true,description:true,category:true,dimensions:true,materials:true,weight:true,color:true,technique:true,careInstructions:true,priceToman:true,imageIds:true,stockQuantity:true,createdAt:true} as const;
export function parseStoryProduct(body:unknown){const raw=record(body);if(Object.keys(raw).some(key=>!["version","productId"].includes(key))||(raw.productId!==null&&typeof raw.productId!=="string"))throw new BadRequestException();return {version:parseCartCommand({version:raw.version}).version,productId:raw.productId===null?null:parseArtistProductId(raw.productId)};}
function productView(product:{id:string;title:string;priceToman:bigint;stockQuantity:number}){return {id:product.id,title:product.title,priceToman:product.priceToman.toString(),availability:product.stockQuantity>0?"in_stock":"out_of_stock"};}
function storyView(story:Prisma.ArtistStoryGetPayload<{select:typeof publicStory}>){const {relatedProduct,...rest}=story;return {...rest,publishedAt:story.publishedAt!.toISOString(),product:relatedProduct&&relatedProduct.artistUserId===story.profile.artistId&&relatedProduct.publicationStatus==="published"&&!relatedProduct.archivedAt?productView(relatedProduct):null};}
@Injectable()
export class ArtistPublicContentService {
 constructor(private readonly db:PrismaService){}
 private owner(context:AuthorizationContext){if(context.activeRole!=="artist")throw new ForbiddenException();}
 private async ensure(tx:Prisma.TransactionClient,artistId:string){await tx.artistPublicProfile.createMany({data:[{artistId}],skipDuplicates:true});}
 async ownProfile(context:AuthorizationContext){this.owner(context);await this.ensure(this.db,context.userId);return this.db.artistPublicProfile.findUniqueOrThrow({where:{artistId:context.userId}});}
 async saveProfile(context:AuthorizationContext,input:ReturnType<typeof parsePublicText>){
  this.owner(context);
  return this.db.$transaction(async tx=>{await this.ensure(tx,context.userId);
   const {displayName,biography,craft,city}=input.fields;
   const result=await tx.artistPublicProfile.updateMany({where:{artistId:context.userId,version:input.version},data:{displayName:displayName!,biography:biography!,craft:craft!,city:city!,published:false,version:{increment:1}}});
   if(!result.count)throw new ConflictException("public-profile-state-changed");
   return tx.artistPublicProfile.findUniqueOrThrow({where:{artistId:context.userId}});
  });
 }
 async switchProfile(context:AuthorizationContext,input:ReturnType<typeof parsePublicSwitch>){
  this.owner(context);
  const result=await this.db.artistPublicProfile.updateMany({where:{artistId:context.userId,version:input.version,...(input.published?{displayName:{not:""},biography:{not:""},craft:{not:""},city:{not:""}}:{})},data:{published:input.published,version:{increment:1}}});
  if(!result.count)throw new ConflictException("public-profile-state-changed");return this.ownProfile(context);
 }
 async saveStory(context:AuthorizationContext,id:string,input:ReturnType<typeof parsePublicText>){
  this.owner(context);
  return this.db.$transaction(async tx=>{
   await this.ensure(tx,context.userId);
   await tx.$queryRaw`SELECT "artistId" FROM "artist_public_profiles" WHERE "artistId" = ${context.userId}::uuid FOR UPDATE`;
   const existing=await tx.artistStory.findUnique({where:{id},select:{artistId:true}});
   if(existing&&existing.artistId!==context.userId)throw new NotFoundException();
   if(!existing){if(input.version!==0)throw new ConflictException("story-state-changed");if(await tx.artistStory.count({where:{artistId:context.userId}})>=100)throw new ConflictException("story-limit");
    await tx.artistStory.createMany({data:[{id,artistId:context.userId,title:input.fields.title!,body:input.fields.body!}],skipDuplicates:true});
   }
   const result=await tx.artistStory.updateMany({where:{id,artistId:context.userId,version:input.version},data:{title:input.fields.title!,body:input.fields.body!,published:false,publishedAt:null,version:{increment:1}}});
   if(!result.count)throw new ConflictException("story-state-changed");return tx.artistStory.findUniqueOrThrow({where:{id}});
  });
 }
 async eligibleProducts(context:AuthorizationContext,page:number,pageSize:number){this.owner(context);const items=await this.db.artistProduct.findMany({where:{artistUserId:context.userId,publicationStatus:"published",archivedAt:null},select:relatedProductSelect,orderBy:[{createdAt:"desc"},{id:"asc"}],skip:(page-1)*pageSize,take:pageSize+1});return {page,pageSize,hasMore:items.length>pageSize,items:items.slice(0,pageSize).map(productView)};}
 async linkProduct(context:AuthorizationContext,id:string,input:ReturnType<typeof parseStoryProduct>){this.owner(context);return this.db.$transaction(async tx=>{
  const story=await tx.artistStory.findFirst({where:{id,artistId:context.userId}});if(!story)throw new NotFoundException();
  if(input.productId!==null&&!await tx.artistProduct.findFirst({where:{id:input.productId,artistUserId:context.userId,publicationStatus:"published",archivedAt:null},select:{id:true}}))throw new NotFoundException();
  const result=await tx.artistStory.updateMany({where:{id,artistId:context.userId,version:input.version},data:{relatedProductId:input.productId,published:false,publishedAt:null,version:{increment:1}}});if(!result.count)throw new ConflictException("story-state-changed");return tx.artistStory.findUniqueOrThrow({where:{id}});
 });}
 async ownStories(context:AuthorizationContext){this.owner(context);return this.db.artistStory.findMany({where:{artistId:context.userId},orderBy:[{createdAt:"desc"},{id:"asc"}]});}
 async switchStory(context:AuthorizationContext,id:string,input:ReturnType<typeof parsePublicSwitch>){
  this.owner(context);
  return this.db.$transaction(async tx=>{
   const existing=await tx.artistStory.findFirst({where:{id,artistId:context.userId}});if(!existing)throw new NotFoundException();
   if(input.published&&existing.relatedProductId&&!await tx.artistProduct.findFirst({where:{id:existing.relatedProductId,artistUserId:context.userId,publicationStatus:"published",archivedAt:null},select:{id:true}}))throw new ConflictException("story-product-unavailable");
   const result=await tx.artistStory.updateMany({where:{id,artistId:context.userId,version:input.version},data:{published:input.published,publishedAt:input.published?new Date():null,version:{increment:1}}});
   if(!result.count)throw new ConflictException("story-state-changed");return tx.artistStory.findUniqueOrThrow({where:{id}});
  });
 }
 async artists(page:number,pageSize:number){
  const items=await this.db.artistPublicProfile.findMany({where:{published:true},select:publicProfile,orderBy:{artistId:"asc"},skip:(page-1)*pageSize,take:pageSize+1});return {page,pageSize,hasMore:items.length>pageSize,items:items.slice(0,pageSize)};
 }
 async artist(id:string){const p=await this.db.artistPublicProfile.findFirst({where:{artistId:id,published:true},select:publicProfile});if(!p)throw new NotFoundException();return p;}
 async products(id:string,page:number,pageSize:number){
  return this.db.$transaction(async tx=>{
   if(!await tx.artistPublicProfile.findFirst({where:{artistId:id,published:true},select:{artistId:true}}))throw new NotFoundException();
   const items=await tx.artistProduct.findMany({where:{artistUserId:id,publicationStatus:"published",archivedAt:null},select:publicProducts,orderBy:[{createdAt:"desc"},{id:"asc"}],skip:(page-1)*pageSize,take:pageSize+1});
   return {page,pageSize,hasMore:items.length>pageSize,items:items.slice(0,pageSize).map(({stockQuantity,priceToman,createdAt,...rest})=>({...rest,priceToman:priceToman.toString(),createdAt:createdAt.toISOString(),coverImageId:rest.imageIds[0]??null,availability:stockQuantity>0?"in_stock":"out_of_stock"}))};
  },{isolationLevel:"RepeatableRead"});
 }
 async stories(page:number,pageSize:number,artistId?:string){
  const items=await this.db.artistStory.findMany({where:{published:true,profile:{published:true},...(artistId?{artistId}:{})},select:publicStory,orderBy:[{publishedAt:"desc"},{id:"asc"}],skip:(page-1)*pageSize,take:pageSize+1});return {page,pageSize,hasMore:items.length>pageSize,items:items.slice(0,pageSize).map(storyView)};
 }
 async story(id:string){const s=await this.db.artistStory.findFirst({where:{id,published:true,profile:{published:true}},select:publicStory});if(!s)throw new NotFoundException();return storyView(s);}
}
