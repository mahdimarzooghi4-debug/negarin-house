import {randomUUID} from "node:crypto";
import {ConflictException,ForbiddenException,Injectable,NotFoundException,ServiceUnavailableException} from "@nestjs/common";
import type {AuthorizationContext} from "@negarin/authz";
import {PrismaService} from "./prisma.service.js";
import {ProductImageStorage,normalizeProductImage} from "./product-images.js";
@Injectable()
export class ArtistStoryImagesService {
 constructor(private readonly db:PrismaService,private readonly storage:ProductImageStorage){}
 private async owned(context:AuthorizationContext,id:string){if(context.activeRole!=="artist")throw new ForbiddenException();const story=await this.db.artistStory.findFirst({where:{id,artistId:context.userId}});if(!story)throw new NotFoundException();return story;}
 async upload(context:AuthorizationContext,id:string,version:number,bytes:Buffer){
  const story=await this.owned(context,id);if(story.version!==version)throw new ConflictException("story-state-changed");
  if(await this.db.artistStoryImage.count({where:{storyId:id}})>=100)throw new ConflictException("story-image-limit");
  const image=await normalizeProductImage(bytes),imageId=randomUUID(),objectKey=`story-images/${id}/${imageId}.webp`;
  try{await this.storage.store.putImmutableObject(objectKey,image.data,"image/webp");}catch{throw new ServiceUnavailableException("image-storage-unavailable");}
  try{return await this.db.$transaction(async tx=>{
   // Serialize upload quotas and story changes on the same resource.
   await tx.$queryRaw`SELECT "id" FROM "artist_stories" WHERE "id" = ${id}::uuid FOR UPDATE`;
   if(await tx.artistStoryImage.count({where:{storyId:id}})>=100)throw new ConflictException("story-image-limit");
   const updated=await tx.artistStory.updateMany({where:{id,artistId:context.userId,version},data:{imageId,published:false,publishedAt:null,version:{increment:1}}});
   if(!updated.count)throw new ConflictException("story-state-changed");
   await tx.artistStoryImage.create({data:{id:imageId,storyId:id,objectKey,width:image.width,height:image.height,byteLength:image.data.length}});
   return tx.artistStory.findUniqueOrThrow({where:{id}});
  });}catch(error){
   // A commit can succeed even if the database reply is lost. Keep committed objects.
   try{if(!await this.db.artistStoryImage.findUnique({where:{id:imageId}}))await this.storage.store.deleteObject(objectKey);}catch{/* Preserve object when commit status cannot be checked. */}
   throw error;
  }
 }
 async remove(context:AuthorizationContext,id:string,version:number){await this.owned(context,id);return this.db.$transaction(async tx=>{const result=await tx.artistStory.updateMany({where:{id,artistId:context.userId,version},data:{imageId:null,published:false,publishedAt:null,version:{increment:1}}});if(!result.count)throw new ConflictException("story-state-changed");return tx.artistStory.findUniqueOrThrow({where:{id}});});}
 async read(id:string,imageId:string,context?:AuthorizationContext){
  if(context)await this.owned(context,id);
  const story=await this.db.artistStory.findFirst({where:{id,imageId,...(context?{artistId:context.userId}:{published:true,profile:{published:true}})}});if(!story)throw new NotFoundException();
  const image=await this.db.artistStoryImage.findFirst({where:{id:imageId,storyId:id}});if(!image)throw new NotFoundException();
  try{return {id:image.id,width:image.width,height:image.height,byteLength:image.byteLength,contentType:"image/webp",url:await this.storage.store.createReadUrl(image.objectKey),expiresInSeconds:300};}catch{throw new ServiceUnavailableException("image-storage-unavailable");}
 }
}
