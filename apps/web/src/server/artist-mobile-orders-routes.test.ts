import {afterEach,describe,expect,it,vi} from "vitest";
import {NextRequest} from "next/server";
import {GET} from "../app/api/artist/orders/route";
afterEach(()=>vi.unstubAllGlobals());const token="A".repeat(43);
function req(url:string){return new NextRequest("https://web.example"+url,{headers:{cookie:"negarin_session="+token}});}
describe("artist mobile orders API boundary",()=>{
 it("forwards bounded pagination with the server-held artist session",async()=>{
  const upstream=vi.fn(async(url:string,init:RequestInit)=>{expect(String(url)).toContain("/api/v1/artist/orders?page=2&pageSize=25");expect(new Headers(init.headers).get("authorization")).toBe("Bearer "+token);return new Response('{"page":2,"pageSize":25,"hasMore":false,"items":[]}',{status:200,headers:{"content-type":"application/json"}});});
  vi.stubGlobal("fetch",upstream);expect((await GET(req("/api/artist/orders?page=2&pageSize=25"))).status).toBe(200);expect(upstream).toHaveBeenCalledTimes(1);
 });
 it("rejects unknown, duplicate, malformed and oversized query values before upstream",async()=>{
  const upstream=vi.fn();vi.stubGlobal("fetch",upstream);
  for(const url of ["/api/artist/orders?limit=100","/api/artist/orders?page=0","/api/artist/orders?page=1&page=2","/api/artist/orders?pageSize=101","/api/artist/orders?page=1.5"])expect((await GET(req(url))).status).toBe(400);
  expect(upstream).not.toHaveBeenCalled();
 });
});