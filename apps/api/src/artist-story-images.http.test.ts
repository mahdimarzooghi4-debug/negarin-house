import "dotenv/config";
import "reflect-metadata";
import {randomUUID,randomBytes} from "node:crypto";
import sharp from "sharp";
import {afterAll,beforeAll,describe,expect,it} from "vitest";
import type {NestFastifyApplication} from "@nestjs/platform-fastify";
import {createApplication} from "./app.js";
import {hashSessionToken} from "./identity-core.js";
import {PrismaService} from "./prisma.service.js";
import {ProductImageStorage} from "./product-images.js";
import type {ObjectStorage} from "@negarin/storage";
describe("story images ownership, publication and versioning",()=>{
 const db=new PrismaService();let app:NestFastifyApplication;let base64:string;const objects=new Map<string,Uint8Array>();let storageFails=false;
 const store:ObjectStorage={async putImmutableObject(key,bytes){if(storageFails)throw Error();objects.set(key,bytes);},async createReadUrl(key){if(!objects.has(key))throw Error();return "https://storage.test/"+key;},async deleteObject(key){objects.delete(key);},async createUploadUrl(){throw Error();}};
 beforeAll(async()=>{app=await createApplication();Object.defineProperty(app.get(ProductImageStorage),"store",{value:store});await app.init();await app.getHttpAdapter().getInstance().ready();await db.$connect();base64=(await sharp({create:{width:8,height:8,channels:3,background:"red"}}).png().toBuffer()).toString("base64");});
 afterAll(async()=>{await app?.close();await db.$disconnect();});
 async function user(role:"artist"|"customer"="artist"){const u=await db.identityUser.create({data:{phone:"+1"+randomBytes(5).readUIntBE(0,5)}}),grant=await db.roleGrant.create({data:{userId:u.id,role}}),token=randomBytes(32).toString("base64url");await db.authSession.create({data:{userId:u.id,tokenHash:hashSessionToken(token),activeGrantId:grant.id,expiresAt:new Date(Date.now()+3600000)}});return {id:u.id,headers:{authorization:"Bearer "+token}};}
 it("keeps draft images private, hides replaced images, enforces owner and stale versions",async()=>{
  const owner=await user(),other=await user(),customer=await user("customer"),id=randomUUID();await db.artistPublicProfile.create({data:{artistId:owner.id,published:true,displayName:"هنرمند",biography:"کارگاه",craft:"سفال",city:"تهران"}});await db.artistStory.create({data:{id,artistId:owner.id,title:"روایت",body:"متن",published:true,publishedAt:new Date()}});
  const upload=(version:number,headers=owner.headers)=>app.inject({method:"POST",url:`/api/v1/artist/stories/${id}/image`,headers,payload:{version,base64}});
  expect((await upload(0,other.headers)).statusCode).toBe(404);expect((await upload(0,customer.headers)).statusCode).toBe(403);
  const saved=await upload(0);expect(saved.statusCode).toBe(201);expect(saved.json()).toMatchObject({version:1,published:false,publishedAt:null});const imageId=saved.json().imageId;
  const read=(own=false,which=imageId)=>app.inject({method:"GET",url:`/api/v1/${own?"artist":"catalog"}/stories/${id}/images/${which}`,...(own?{headers:owner.headers}:{})});
  expect((await read()).statusCode).toBe(404);expect((await read(true)).json()).toMatchObject({id:imageId,contentType:"image/webp"});
  expect((await upload(0)).statusCode).toBe(409);
  await app.inject({method:"POST",url:`/api/v1/artist/stories/${id}/publication`,headers:owner.headers,payload:{version:1,published:true}});expect((await read()).statusCode).toBe(200);
  const replacements=await Promise.all([upload(2),upload(2)]);expect(replacements.map(r=>r.statusCode).sort()).toEqual([201,409]);expect((await read()).statusCode).toBe(404);expect((await read(true)).statusCode).toBe(404);
  const current=await db.artistStory.findUniqueOrThrow({where:{id}});expect(current.version).toBe(3);
  const removed=await app.inject({method:"DELETE",url:`/api/v1/artist/stories/${id}/image`,headers:owner.headers,payload:{version:3}});expect(removed.json()).toMatchObject({imageId:null,version:4,published:false});
  expect((await read(true,current.imageId!)).statusCode).toBe(404);
  storageFails=true;expect((await upload(4)).statusCode).toBe(503);storageFails=false;expect((await db.artistStory.findUniqueOrThrow({where:{id}})).version).toBe(4);
  expect((await app.inject({method:"POST",url:`/api/v1/artist/stories/${id}/image`,headers:owner.headers,payload:{version:4,base64:Buffer.from('<svg/>').toString('base64')}})).statusCode).toBe(400);
 });
});
