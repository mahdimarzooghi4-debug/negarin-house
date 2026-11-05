import "dotenv/config";
import "reflect-metadata";
import {randomUUID,randomBytes} from "node:crypto";
import {afterAll,beforeAll,describe,expect,it} from "vitest";
import type {NestFastifyApplication} from "@nestjs/platform-fastify";
import {createApplication} from "./app.js";
import {hashSessionToken} from "./identity-core.js";
import {PrismaService} from "./prisma.service.js";
describe("public artist content isolation and publication",()=>{
 const db=new PrismaService();let app:NestFastifyApplication;
 beforeAll(async()=>{app=await createApplication();await app.init();await app.getHttpAdapter().getInstance().ready();await db.$connect();});
 afterAll(async()=>{await app?.close();await db.$disconnect();});
 async function user(role:"artist"|"customer"="artist"){
  const u=await db.identityUser.create({data:{phone:"+1"+randomBytes(5).readUIntBE(0,5)}}),grant=await db.roleGrant.create({data:{userId:u.id,role}}),token=randomBytes(32).toString("base64url");
  await db.authSession.create({data:{userId:u.id,tokenHash:hashSessionToken(token),activeGrantId:grant.id,expiresAt:new Date(Date.now()+3600000)}});
  return {id:u.id,headers:{authorization:"Bearer "+token}};
 }
 type User=Awaited<ReturnType<typeof user>>;
 const profile={displayName:"هنرمند عمومی",biography:"دربارهٔ کارگاه",craft:"سفال",city:"تهران"};
 function command(u:User,path:string,body:object,method:"PUT"|"POST"="PUT"){return app.inject({method,url:"/api/v1/artist/"+path,headers:u.headers,payload:body});}
 function get(path:string){return app.inject({method:"GET",url:"/api/v1/catalog/"+path});}
 it("conceals drafts, publishes only explicit public data and hides edited content",async()=>{
  const artist=await user(),other=await user(),customer=await user("customer"),storyId=randomUUID();
  expect((await command(customer,"public-profile",{version:0,...profile})).statusCode).toBe(403);
  expect((await command(artist,"public-profile",{version:0,...profile})).json()).toMatchObject({version:1,published:false});
  expect((await get("artists/"+artist.id)).statusCode).toBe(404);
  expect((await command(artist,"stories/"+storyId,{version:0,title:"نام روایت",body:"متن روایت"})).json()).toMatchObject({version:1,published:false});
  expect((await command(other,"stories/"+storyId,{version:1,title:"تغییر دیگر",body:"غیرمجاز"})).statusCode).toBe(404);
  expect((await command(artist,"stories/"+storyId+"/publication",{version:1,published:true},"POST")).json()).toMatchObject({version:2,published:true});
  expect((await get("stories/"+storyId)).statusCode).toBe(404);
  expect((await command(artist,"public-profile/publication",{version:1,published:true},"POST")).statusCode).toBe(201);
  const publicStory=await get("stories/"+storyId);expect(publicStory.statusCode).toBe(200);expect(publicStory.json()).toMatchObject({title:"نام روایت",profile:{displayName:profile.displayName,artistId:artist.id}});
  for(const privateKey of ["phone","userId","version","published","tokenHash"])expect(JSON.stringify(publicStory.json())).not.toContain('"'+privateKey+'"');
  await command(artist,"stories/"+storyId,{version:2,title:"روایت ویرایش‌شده",body:"متن جدید"});
  expect((await get("stories/"+storyId)).statusCode).toBe(404);
  expect((await get(`artists/${artist.id}/stories?page=1&pageSize=6`)).json().items).toEqual([]);
 });
 it("scopes store products, preserves exact amounts and serializes competing profile edits",async()=>{
  const artist=await user(),other=await user();
  const results=await Promise.all(["نام اول","نام دوم"].map(displayName=>command(artist,"public-profile",{version:0,...profile,displayName})));
  expect(results.map(r=>r.statusCode).sort()).toEqual([200,409]);
  await command(artist,"public-profile/publication",{version:1,published:true},"POST");
  const product=await db.artistProduct.create({data:{artistUserId:artist.id,title:"اثر عمومی",priceToman:9007199254740993n,publicationStatus:"published"}});
  await db.artistProduct.create({data:{artistUserId:other.id,title:"اثر دیگری",priceToman:1n,publicationStatus:"published"}});
  await db.artistProduct.create({data:{artistUserId:artist.id,title:"پیش‌نویس",priceToman:1n}});
  const page=(await get(`artists/${artist.id}/products?page=1&pageSize=6`)).json();expect(page.items).toHaveLength(1);expect(page.items[0]).toMatchObject({id:product.id,priceToman:"9007199254740993"});expect(page.items[0]).not.toHaveProperty("artistUserId");
  await command(artist,"public-profile",{version:2,...profile});
  expect((await get("artists/"+artist.id)).statusCode).toBe(404);
  expect((await get(`artists/${artist.id}/products`)).statusCode).toBe(404);
 });
});
