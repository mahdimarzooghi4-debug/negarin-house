import "dotenv/config";
import "reflect-metadata";
import {randomUUID} from "node:crypto";
import {afterAll,beforeAll,describe,expect,it} from "vitest";
import type {NestFastifyApplication} from "@nestjs/platform-fastify";
import {createApplication} from "./app.js";
import {hashSessionToken} from "./identity-core.js";
import {PrismaService} from "./prisma.service.js";
describe("customer favorites persistence and isolation",()=>{
  const db=new PrismaService();let app:NestFastifyApplication;
  beforeAll(async()=>{app=await createApplication();await app.init();await app.getHttpAdapter().getInstance().ready();await db.$connect();});
  afterAll(async()=>{await app?.close();await db.$disconnect();});
  async function user(role:"customer"|"artist"="customer"){
    const u=await db.identityUser.create({data:{phone:"+1"+BigInt("0x"+randomUUID().replaceAll("-","").slice(0,12)).toString()}});
    const grant=await db.roleGrant.create({data:{userId:u.id,role}});
    const token=randomUUID()+randomUUID();
    await db.authSession.create({data:{userId:u.id,tokenHash:hashSessionToken(token),activeGrantId:grant.id,expiresAt:new Date(Date.now()+3600000)}});
    return {id:u.id,headers:{authorization:"Bearer "+token}};
  }
  type User=Awaited<ReturnType<typeof user>>;
  function get(u:User){return app.inject({method:"GET",url:"/api/v1/customer/favorites",headers:u.headers});}
  function change(u:User,id:string,version:number,method:"PUT"|"DELETE"="PUT"){return app.inject({method,url:"/api/v1/customer/favorites/"+id,headers:u.headers,payload:{version}});}
  it("isolates lists, rejects stale writes and conceals withdrawn content while permitting removal",async()=>{
    const a=await user(),b=await user(),artist=await user("artist");
    const product=await db.artistProduct.create({data:{artistUserId:artist.id,title:"اثر ذخیره‌شده",priceToman:9007199254740993n,stockQuantity:0,publicationStatus:"published"}});
    expect((await get(a)).json()).toEqual({version:0,items:[]});
    expect((await change(a,product.id,0)).json()).toMatchObject({version:1,items:[{productId:product.id,product:{priceToman:"9007199254740993",availability:"out_of_stock"}}]});
    expect((await get(b)).json().items).toEqual([]);
    expect((await get(artist)).statusCode).toBe(403);
    expect((await change(a,product.id,0,"DELETE")).statusCode).toBe(409);
    expect((await change(a,product.id,1)).json().version).toBe(1);
    await db.artistProduct.update({where:{id:product.id},data:{publicationStatus:"draft"}});
    expect((await get(a)).json().items[0].product).toBeNull();
    expect((await change(b,product.id,0)).statusCode).toBe(404);
    expect((await change(a,product.id,1,"DELETE")).json()).toEqual({version:2,items:[]});
  });
  it("serializes simultaneous commands and rolls back rejected capacity writes",async()=>{
    const a=await user(),artist=await user("artist");
    const products=await db.artistProduct.createManyAndReturn({data:Array.from({length:101},(_,i)=>({artistUserId:artist.id,title:"اثر "+i,priceToman:1000n,publicationStatus:"published" as const}))});
    await get(a);
    const results=await Promise.all(products.slice(0,2).map(p=>change(a,p.id,0)));
    expect(results.map(r=>r.statusCode).sort()).toEqual([200,409]);
    const current=(await get(a)).json();expect(current.version).toBe(1);expect(current.items).toHaveLength(1);
    const used=current.items[0].productId;
    await db.customerFavorite.createMany({data:products.filter(p=>p.id!==used).slice(0,99).map(p=>({userId:a.id,productId:p.id}))});
    const saved=await db.customerFavorite.findMany({where:{userId:a.id},select:{productId:true}});
    const extra=products.find(p=>!saved.some(s=>s.productId===p.id))!;
    expect((await change(a,extra.id,1)).statusCode).toBe(409);
    expect((await get(a)).json()).toMatchObject({version:1});
    expect(await db.customerFavorite.count({where:{userId:a.id}})).toBe(100);
  });
});
