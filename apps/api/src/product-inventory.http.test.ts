import "dotenv/config";
import "reflect-metadata";
import { randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";
import { ActiveContextResolver } from "./active-context.js";
import { IdentityCore } from "./identity-core.js";
import { PrismaService } from "./prisma.service.js";

describe("Product inventory persistence and access", () => {
  let app: NestFastifyApplication;
  const db = new PrismaService();
  const codes = new Map<string,string>();
  const identity = new IdentityCore(db, { async send(phone,code) { codes.set(phone,code); } },
    "test-secret-with-at-least-thirty-two-characters");
  const contexts = new ActiveContextResolver(db);
  async function signIn(role: "artist" | "staff" | "customer" = "artist") {
    const phone = `+1555${randomInt(1_000_000,9_999_999)}`;
    await identity.requestCode(phone);
    const user = await identity.verifyCode(phone,codes.get(phone) ?? "");
    const grant = await db.roleGrant.create({data:{userId:user.userId,role}});
    await contexts.select(user.sessionToken,grant.id);
    return {authorization:`Bearer ${user.sessionToken}`};
  }
  const create = async (headers: {authorization:string}) => {
    const response = await app.inject({method:"POST",url:"/api/v1/artist/products",headers,
      payload:{title:"اثر هنرمند",priceToman:"2450000"}});
    expect(response.statusCode).toBe(201);
    return response.json<{id:string;stockQuantity:number;inventoryVersion:number;availability:string}>();
  };
  const set = (id:string,headers: {authorization:string},stockQuantity:number,inventoryVersion:number) =>
    app.inject({method:"PATCH",url:`/api/v1/artist/products/${id}/inventory`,headers,
      payload:{stockQuantity,inventoryVersion,reason:"شمارش موجودی"}});
  beforeAll(async()=>{ app=await createApplication();await app.init();await app.getHttpAdapter().getInstance().ready();await db.$connect(); });
  afterAll(async()=>{await app?.close();await db.$disconnect();});

  it("persists zero/default stock, transitions availability and does not duplicate no-op history",async()=>{
    const owner=await signIn();const p=await create(owner);
    expect(p.stockQuantity).toBe(0);expect(p.inventoryVersion).toBe(0);expect(p.availability).toBe("out_of_stock");
    const response=await set(p.id,owner,3,0);
    expect(response.statusCode).toBe(200);expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.json()).toMatchObject({stockQuantity:3,inventoryVersion:1,availability:"in_stock"});
    expect((await set(p.id,owner,3,1)).statusCode).toBe(200);
    expect((await set(p.id,owner,0,1)).json()).toMatchObject({stockQuantity:0,inventoryVersion:2,availability:"out_of_stock"});
    const result=await app.inject({method:"GET",url:`/api/v1/artist/products/${p.id}/inventory-history`,headers:owner});
    expect(result.statusCode).toBe(200);
    expect(result.json().map((e:{inventoryVersion:number})=>e.inventoryVersion)).toEqual([2,1]);
    expect(result.json()[1]).toMatchObject({previousQuantity:0,stockQuantity:3,reason:"شمارش موجودی"});
    expect(result.json()[0]).not.toHaveProperty("actorUserId");
    expect((await db.productInventoryEvent.findMany({where:{productId:p.id}})).every(e=>e.actorUserId&&e.requestId)).toBe(true);
  });

  it("conceals foreign stock/history and denies unrelated roles and unsigned requests",async()=>{
    const owner=await signIn();const p=await create(owner);const other=await signIn();
    expect((await set(p.id,other,4,0)).statusCode).toBe(404);
    expect((await app.inject({method:"GET",url:`/api/v1/artist/products/${p.id}/inventory-history`,headers:other})).statusCode).toBe(404);
    for(const role of ["staff","customer"] as const) expect((await set(p.id,await signIn(role),4,0)).statusCode).toBe(403);
    expect((await app.inject({method:"PATCH",url:`/api/v1/artist/products/${p.id}/inventory`,payload:{stockQuantity:4,inventoryVersion:0}})).statusCode).toBe(401);
    expect(await db.productInventoryEvent.count({where:{productId:p.id}})).toBe(0);
  });

  it("rejects stale and archived changes, and allows replenishment after restore",async()=>{
    const owner=await signIn();const p=await create(owner);
    await set(p.id,owner,5,0);
    expect((await set(p.id,owner,5,0)).statusCode).toBe(409);
    await app.inject({method:"POST",url:`/api/v1/artist/products/${p.id}/archive`,headers:owner});
    expect((await set(p.id,owner,6,1)).statusCode).toBe(409);
    await app.inject({method:"POST",url:`/api/v1/artist/products/${p.id}/restore`,headers:owner});
    expect((await set(p.id,owner,6,1)).statusCode).toBe(200);
    expect(await db.productInventoryEvent.count({where:{productId:p.id}})).toBe(2);
  });

  it("allows only one writer for the same inventory version",async()=>{
    const owner=await signIn();const p=await create(owner);
    const results=await Promise.all([set(p.id,owner,10,0),set(p.id,owner,20,0)]);
    expect(results.map(r=>r.statusCode).sort()).toEqual([200,409]);
    const current=await db.artistProduct.findUniqueOrThrow({where:{id:p.id}});
    const events=await db.productInventoryEvent.findMany({where:{productId:p.id}});
    expect(events).toHaveLength(1);expect(current.inventoryVersion).toBe(1);
    expect(current.stockQuantity).toBe(events[0]!.stockQuantity);
  });

  it("keeps published content, its version and price independent of stock",async()=>{
    const owner=await signIn();const p=await create(owner);
    await db.artistProduct.update({where:{id:p.id},data:{publicationStatus:"published",version:7}});
    expect((await set(p.id,owner,2,0)).statusCode).toBe(200);
    const current=await db.artistProduct.findUniqueOrThrow({where:{id:p.id}});
    expect(current).toMatchObject({publicationStatus:"published",version:7,title:"اثر هنرمند",priceToman:2450000n});
    expect(await db.productPublicationEvent.count({where:{productId:p.id}})).toBe(0);
  });

  it("rolls the stock write back when durable history fails",async()=>{
    const owner=await signIn();const p=await create(owner);
    const name="inventory_test_"+randomUUID().replaceAll("-","");
    await db.$executeRawUnsafe(`CREATE FUNCTION "${name}"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."productId" = '${p.id}'::uuid THEN RAISE EXCEPTION 'inventory audit test failure'; END IF; RETURN NEW; END $$`);
    try {
      await db.$executeRawUnsafe(`CREATE TRIGGER "${name}" BEFORE INSERT ON "product_inventory_events" FOR EACH ROW EXECUTE FUNCTION "${name}"()`);
      try {
        expect((await set(p.id,owner,10,0)).statusCode).toBe(500);
        expect(await db.artistProduct.findUniqueOrThrow({where:{id:p.id}})).toMatchObject({stockQuantity:0,inventoryVersion:0});
        expect(await db.productInventoryEvent.count({where:{productId:p.id}})).toBe(0);
      } finally {await db.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "${name}" ON "product_inventory_events"`);}
    } finally {await db.$executeRawUnsafe(`DROP FUNCTION IF EXISTS "${name}"()`);}
  });
});

