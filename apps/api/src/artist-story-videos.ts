import {randomUUID} from "node:crypto";
import {ConflictException,ForbiddenException,Injectable,NotFoundException,ServiceUnavailableException} from "@nestjs/common";
import type {AuthorizationContext} from "@negarin/authz";
import {PrismaService} from "./prisma.service.js";
import {ProductImageStorage} from "./product-images.js";
import {normalizeStoryVideo} from "./story-video-processing.js";
@Injectable()
export class ArtistStoryVideosService {
 constructor(private readonly db:PrismaService,private readonly storage:ProductImageStorage){}
 private async owned(context:AuthorizationContext,id:string){if(context.activeRole!=="artist")throw new ForbiddenException();const story=await this.db.artistStory.findFirst({where:{id,artistId:context.userId}});if(!story)throw new NotFoundException();return story;}
 async upload(context:AuthorizationContext,id:string,version:number,bytes:Buffer){
  const story=await this.owned(context,id);if(story.version!==version)throw new ConflictException("story-state-changed");
  if(await this.db.artistStoryVideo.count({where:{storyId:id}})>=20)throw new ConflictException("story-video-limit");
  const video=await normalizeStoryVideo(bytes),videoId=randomUUID(),objectKey=`story-videos/${id}/${videoId}.mp4`;
  try{await this.storage.store.putImmutableObject(objectKey,video.data,"video/mp4");}catch{throw new ServiceUnavailableException("video-storage-unavailable");}
  try{return await this.db.$transaction(async tx=>{
   // Serialize upload quotas and story changes on the same resource.
   await tx.$queryRaw`SELECT "id" FROM "artist_stories" WHERE "id" = ${id}::uuid FOR UPDATE`;
   if(await tx.artistStoryVideo.count({where:{storyId:id}})>=20)throw new ConflictException("story-video-limit");
   const updated=await tx.artistStory.updateMany({where:{id,artistId:context.userId,version},data:{videoId,published:false,publishedAt:null,version:{increment:1}}});
   if(!updated.count)throw new ConflictException("story-state-changed");
   await tx.artistStoryVideo.create({data:{id:videoId,storyId:id,objectKey,width:video.width,height:video.height,durationMs:video.durationMs,byteLength:video.data.length}});
   return tx.artistStory.findUniqueOrThrow({where:{id}});
  });}catch(error){
   // A commit can succeed even if the database reply is lost. Keep committed objects.
   try{if(!await this.db.artistStoryVideo.findUnique({where:{id:videoId}}))await this.storage.store.deleteObject(objectKey);}catch{/* Preserve object when commit status cannot be checked. */}
   throw error;
  }
 }
 async remove(context:AuthorizationContext,id:string,version:number){await this.owned(context,id);return this.db.$transaction(async tx=>{const result=await tx.artistStory.updateMany({where:{id,artistId:context.userId,version},data:{videoId:null,published:false,publishedAt:null,version:{increment:1}}});if(!result.count)throw new ConflictException("story-state-changed");return tx.artistStory.findUniqueOrThrow({where:{id}});});}
 async read(id:string,videoId:string,context?:AuthorizationContext){
  if(context)await this.owned(context,id);
  const story=await this.db.artistStory.findFirst({where:{id,videoId,...(context?{artistId:context.userId}:{published:true,profile:{published:true}})}});if(!story)throw new NotFoundException();
  const video=await this.db.artistStoryVideo.findFirst({where:{id:videoId,storyId:id}});if(!video)throw new NotFoundException();
  try{return {id:video.id,width:video.width,height:video.height,durationMs:video.durationMs,byteLength:video.byteLength,contentType:"video/mp4",url:await this.storage.store.createReadUrl(video.objectKey),expiresInSeconds:300};}catch{throw new ServiceUnavailableException("video-storage-unavailable");}
 }
}
