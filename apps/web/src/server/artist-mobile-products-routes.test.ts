import {afterEach,describe,expect,it,vi} from "vitest";
import {NextRequest} from "next/server";
import {GET as list,POST as create} from "../app/api/artist/products/route";
import {GET as detail,PATCH as edit} from "../app/api/artist/products/[id]/route";
import {PATCH as stock} from "../app/api/artist/products/[id]/inventory/route";
import {POST as submit} from "../app/api/artist/products/[id]/submit/route";
afterEach(()=>vi.unstubAllGlobals());
const id="00000000-0000-4000-8000-000000000001";
const context={params:Promise.resolve({id})},token="A".repeat(43);
function req(path:string,method="GET",body?:unknown,origin="https://web.example"){
  return new NextRequest("https://web.example"+path,{
    method,headers:{origin,cookie:"negarin_session="+token,"content-type":"application/json"},
    ...(body===undefined?{}:{body:JSON.stringify(body)})
  });
}
describe("artist mobile product API boundaries",()=>{
  it("uses the server-held artist session for owned-product reads",async()=>{
    const upstream=vi.fn(async (url:string,init:RequestInit)=>{
      expect(new Headers(init.headers).get("authorization")).toBe("Bearer "+token);
      expect(String(url)).toContain("/api/v1/artist/products");
      return new Response("[]",{status:200,headers:{"content-type":"application/json"}});
    });vi.stubGlobal("fetch",upstream);
    expect((await list(req("/api/artist/products"))).status).toBe(200);
    expect((await detail(req("/api/artist/products/"+id),context)).status).toBe(200);
    expect(upstream).toHaveBeenCalledTimes(2);
  });
  it("rejects cross-origin writes without contacting the backend",async()=>{
    const upstream=vi.fn();vi.stubGlobal("fetch",upstream);
    const handlers=[
      ()=>create(req("/api/artist/products","POST",{title:"a"},"https://evil.example")),
      ()=>edit(req("/api/artist/products/"+id,"PATCH",{version:2},"https://evil.example"),context),
      ()=>stock(req("/api/artist/products/"+id+"/inventory","PATCH",{inventoryVersion:3},"https://evil.example"),context),
      ()=>submit(req("/api/artist/products/"+id+"/submit","POST",{version:2},"https://evil.example"),context)
    ];
    for(const handler of handlers)expect((await handler()).status).toBe(403);
    expect(upstream).not.toHaveBeenCalled();
  });
  it("forwards exact versions, without silently converting inventory or publication state",async()=>{
    const cases=[
      {path:"/api/artist/products/"+id,method:"PATCH",body:{version:2,priceToman:"2450000"},handler:edit},
      {path:"/api/artist/products/"+id+"/inventory",method:"PATCH",body:{inventoryVersion:3,stockQuantity:7},handler:stock},
      {path:"/api/artist/products/"+id+"/submit",method:"POST",body:{version:2},handler:submit}
    ];
    const upstream=vi.fn(async (url:string,init:RequestInit)=>{
      expect(JSON.parse(String(init.body))).toEqual(cases.find(c=>String(url).endsWith(c.path.replace("/api/artist/","/api/v1/artist/")))?.body);
      expect(new Headers(init.headers).get("authorization")).toBe("Bearer "+token);
      return new Response('{"error":"product-state-changed"}',{status:409});
    });vi.stubGlobal("fetch",upstream);
    for(const c of cases)expect((await c.handler(req(c.path,c.method,c.body),context)).status).toBe(409);
    expect(upstream).toHaveBeenCalledTimes(3);
  });
  it("rejects unknown ids and queries before upstream",async()=>{
    const upstream=vi.fn();vi.stubGlobal("fetch",upstream);
    expect((await list(req("/api/artist/products?includeArchived=maybe"))).status).toBe(400);
    expect((await detail(req("/api/artist/products/not-an-id"),{params:Promise.resolve({id:"not-an-id"})})).status).toBe(400);
    expect(upstream).not.toHaveBeenCalled();
  });
});
