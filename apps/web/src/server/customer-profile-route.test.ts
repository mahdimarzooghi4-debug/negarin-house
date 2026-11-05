import {afterEach,describe,expect,it,vi} from "vitest";
import {NextRequest} from "next/server";
import {PUT} from "../app/api/customer/profile/route";
afterEach(()=>vi.unstubAllGlobals());
describe("customer profile boundary",()=>{
 it("rejects cross-origin edits before accessing upstream",async()=>{
  const upstream=vi.fn();vi.stubGlobal("fetch",upstream);
  expect((await PUT(new NextRequest("https://web.example/api/customer/profile",{method:"PUT",headers:{origin:"https://other.example"},body:'{"version":0,"displayName":"name"}'}))).status).toBe(403);
  expect(upstream).not.toHaveBeenCalled();
 });
 it("keeps session credentials server-side and preserves stale edit conflicts",async()=>{
  const token="A".repeat(43),body={version:3,displayName:"مریم احمدی"};
  vi.stubGlobal("fetch",vi.fn(async(url:string,init:RequestInit)=>{
   expect(String(url)).toContain("/customer/profile");
   expect(JSON.parse(String(init.body))).toEqual(body);
   expect(new Headers(init.headers).get("authorization")).toBe("Bearer "+token);
   return new Response('{"error":"profile-state-changed"}',{status:409});
  }));
  expect((await PUT(new NextRequest("https://web.example/api/customer/profile",{method:"PUT",headers:{origin:"https://web.example",cookie:"negarin_session="+token,"content-type":"application/json"},body:JSON.stringify(body)}))).status).toBe(409);
 });
});
