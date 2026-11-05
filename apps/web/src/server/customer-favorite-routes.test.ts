import {afterEach,describe,expect,it,vi} from "vitest";
import {NextRequest} from "next/server";
import {PUT,DELETE} from "../app/api/customer/favorites/[productId]/route";
afterEach(()=>vi.unstubAllGlobals());
const id="00000000-0000-4000-8000-000000000001",params=Promise.resolve({productId:id});
describe("favorite mutation boundary",()=>{
 it("rejects cross-origin mutations before upstream access",async()=>{
  const upstream=vi.fn();vi.stubGlobal("fetch",upstream);
  for(const action of [PUT,DELETE])expect((await action(new NextRequest("https://web.example/api/customer/favorites/"+id,{method:action===PUT?"PUT":"DELETE",headers:{origin:"https://other.example"},body:'{"version":0}'}),{params})).status).toBe(403);
  expect(upstream).not.toHaveBeenCalled();
 });
 it("forwards exact versions and preserves conflicts using server credentials",async()=>{
  const token="A".repeat(43);
  vi.stubGlobal("fetch",vi.fn(async(url:string,init:RequestInit)=>{
   expect(String(url)).toContain("/customer/favorites/"+id);
   expect(JSON.parse(String(init.body))).toEqual({version:7});
   expect(new Headers(init.headers).get("authorization")).toBe("Bearer "+token);
   return new Response('{"error":"favorites-state-changed"}',{status:409});
  }));
  expect((await DELETE(new NextRequest("https://web.example/api/customer/favorites/"+id,{method:"DELETE",headers:{origin:"https://web.example",cookie:"negarin_session="+token,"content-type":"application/json"},body:'{"version":7}'}),{params})).status).toBe(409);
 });
});
