import {afterEach,describe,expect,it,vi} from "vitest";
import {NextRequest} from "next/server";
import {PUT as profile} from "../app/api/artist/public-profile/route";
import {POST as publication} from "../app/api/artist/public-profile/publication/route";
import {PUT as story} from "../app/api/artist/stories/[id]/route";
import {POST as storyPublication} from "../app/api/artist/stories/[id]/publication/route";
afterEach(()=>vi.unstubAllGlobals());
const id="00000000-0000-4000-8000-000000000001";
describe("artist authoring boundary",()=>{
 it("rejects cross-origin writes before upstream",async()=>{const upstream=vi.fn();vi.stubGlobal("fetch",upstream);for(const handler of [profile,publication,story,storyPublication]){const response=await handler(new NextRequest("https://web.example/api/artist/stories/"+id,{method:"POST",headers:{origin:"https://other.example"},body:"{}"}),{params:Promise.resolve({id})});expect(response.status).toBe(403);}expect(upstream).not.toHaveBeenCalled();});
 it("rejects malformed identifiers",async()=>{vi.stubGlobal("fetch",vi.fn());expect((await story(new NextRequest("https://web.example/api/artist/stories/bad",{method:"PUT",headers:{origin:"https://web.example"},body:"{}"}),{params:Promise.resolve({id:"bad"})})).status).toBe(400);expect(fetch).not.toHaveBeenCalled();});
 it("forwards version and preserves conflicts with server-held credentials",async()=>{const token="A".repeat(43),body={version:3,published:true};vi.stubGlobal("fetch",vi.fn(async(url:string,init:RequestInit)=>{expect(String(url)).toContain("/artist/stories/"+id+"/publication");expect(JSON.parse(String(init.body))).toEqual(body);expect(new Headers(init.headers).get("authorization")).toBe("Bearer "+token);return new Response('{"error":"conflict"}',{status:409});}));expect((await storyPublication(new NextRequest("https://web.example/api/artist/stories/"+id+"/publication",{method:"POST",headers:{origin:"https://web.example",cookie:"negarin_session="+token},body:JSON.stringify(body)}),{params:Promise.resolve({id})})).status).toBe(409);});
});
