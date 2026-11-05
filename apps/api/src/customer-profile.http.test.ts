import "dotenv/config";
import "reflect-metadata";
import {randomUUID,randomBytes} from "node:crypto";
import {afterAll,beforeAll,describe,expect,it} from "vitest";
import type {NestFastifyApplication} from "@nestjs/platform-fastify";
import {createApplication} from "./app.js";
import {hashSessionToken} from "./identity-core.js";
import {PrismaService} from "./prisma.service.js";
describe("customer profile persistence and isolation",()=>{
 const db=new PrismaService();let app:NestFastifyApplication;
 beforeAll(async()=>{app=await createApplication();await app.init();await app.getHttpAdapter().getInstance().ready();await db.$connect();});
 afterAll(async()=>{await app?.close();await db.$disconnect();});
 async function user(role:"customer"|"artist"="customer"){
  const phone="+1"+BigInt("0x"+randomUUID().replaceAll("-","").slice(0,12)).toString();
  const u=await db.identityUser.create({data:{phone}}),grant=await db.roleGrant.create({data:{userId:u.id,role}}),token=randomBytes(32).toString("base64url");
  await db.authSession.create({data:{userId:u.id,tokenHash:hashSessionToken(token),activeGrantId:grant.id,expiresAt:new Date(Date.now()+3600000)}});
  return {id:u.id,phone,headers:{authorization:"Bearer "+token}};
 }
 type User=Awaited<ReturnType<typeof user>>;
 function get(u:User){return app.inject({method:"GET",url:"/api/v1/customer/profile",headers:u.headers});}
 function put(u:User,body:unknown){return app.inject({method:"PUT",url:"/api/v1/customer/profile",headers:u.headers,payload:body as object});}
 it("scopes reads and writes to the current customer and prevents identity changes",async()=>{
  const a=await user(),b=await user(),artist=await user("artist");
  expect((await get(a)).json()).toEqual({version:0,displayName:"",phone:a.phone});
  expect((await put(a,{version:0,displayName:"  مریم احمدی  "})).json()).toEqual({version:1,displayName:"مریم احمدی",phone:a.phone});
  expect((await get(b)).json().displayName).toBe("");
  expect((await get(artist)).statusCode).toBe(403);
  expect((await put(a,{version:1,displayName:"دیگر",phone:b.phone})).statusCode).toBe(400);
  expect((await db.identityUser.findUniqueOrThrow({where:{id:a.id}})).phone).toBe(a.phone);
 });
 it("rejects stale and simultaneous edits without overwriting the winner",async()=>{
  const a=await user();await get(a);
  const results=await Promise.all(["نام اول","نام دوم"].map(displayName=>put(a,{version:0,displayName})));
  expect(results.map(r=>r.statusCode).sort()).toEqual([200,409]);
  const winner=results.find(r=>r.statusCode===200)!.json();
  expect((await get(a)).json()).toEqual(winner);
  expect((await put(a,{version:0,displayName:"نام سوم"})).statusCode).toBe(409);
 });
});
