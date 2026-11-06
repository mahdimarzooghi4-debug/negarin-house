import {afterEach,describe,expect,it,vi} from "vitest";
import {NextRequest} from "next/server";
import {PUT} from "../app/api/artist/stories/[id]/product/route";
import {GET} from "../app/api/artist/stories/eligible-products/route";
afterEach(()=>vi.unstubAllGlobals());
const id="00000000-0000-4000-8000-000000000001";
describe("story product BFF",()=>{
 it("rejects cross-origin links before upstream",async()=>{vi.stubGlobal("fetch",vi.fn());expect((await PUT(new NextRequest("https://web.example/api/artist/stories/"+id+"/product",{method:"PUT",headers:{origin:"https://bad.example"},body:"{}"}),{params:Promise.resolve({id})})).status).toBe(403);expect(fetch).not.toHaveBeenCalled();});
 it("validates story UUID and body before upstream",async()=>{vi.stubGlobal("fetch",vi.fn());for(const [target,body] of [["bad","{}"],[id,"not-json"]] as const)expect((await PUT(new NextRequest("https://web.example/api/artist/stories/"+target+"/product",{method:"PUT",headers:{origin:"https://web.example"},body}),{params:Promise.resolve({id:target})})).status).toBe(400);expect(fetch).not.toHaveBeenCalled();});
 it("preserves versions, null selection, conflicts and server credentials",async()=>{const token="A".repeat(43),body={version:2,productId:null};vi.stubGlobal("fetch",vi.fn(async(url:string,init:RequestInit)=>{expect(String(url)).toContain("/artist/stories/"+id+"/product");expect(JSON.parse(String(init.body))).toEqual(body);expect(new Headers(init.headers).get("authorization")).toBe("Bearer "+token);return new Response('{}',{status:409});}));expect((await PUT(new NextRequest("https://web.example/api/artist/stories/"+id+"/product",{method:"PUT",headers:{origin:"https://web.example",cookie:"negarin_session="+token},body:JSON.stringify(body)}),{params:Promise.resolve({id})})).status).toBe(409);});
 it("requires a session for the owner product list",async()=>{vi.stubGlobal("fetch",vi.fn());expect((await GET(new NextRequest("https://web.example/api/artist/stories/eligible-products?page=1&pageSize=20"))).status).toBe(401);expect(fetch).not.toHaveBeenCalled();});
});
