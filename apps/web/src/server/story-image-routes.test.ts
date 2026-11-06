import {afterEach,describe,expect,it,vi} from "vitest";
import {NextRequest} from "next/server";
import {POST,DELETE} from "../app/api/artist/stories/[id]/image/route";
import {GET} from "../app/api/catalog/stories/[id]/images/[imageId]/route";
afterEach(()=>vi.unstubAllGlobals());
const id="00000000-0000-4000-8000-000000000001",imageId="00000000-0000-4000-8000-000000000002";
describe("story image BFF",()=>{
 it("rejects cross-origin upload and removal",async()=>{vi.stubGlobal("fetch",vi.fn());for(const handler of [POST,DELETE])expect((await handler(new NextRequest("https://web.example/api/artist/stories/"+id+"/image",{method:"POST",headers:{origin:"https://bad.example"},body:"{}"}),{params:Promise.resolve({id,imageId})})).status).toBe(403);expect(fetch).not.toHaveBeenCalled();});
 it("validates public resource identifiers before upstream",async()=>{vi.stubGlobal("fetch",vi.fn());expect((await GET(new NextRequest("https://web.example/api/catalog/stories/bad/images/"+imageId),{params:Promise.resolve({id:"bad",imageId})})).status).toBe(400);expect(fetch).not.toHaveBeenCalled();});
 it("forwards image bytes with session credentials and preserves conflicts",async()=>{const body={version:4,base64:"YWJj"},token="A".repeat(43);vi.stubGlobal("fetch",vi.fn(async(url:string,init:RequestInit)=>{expect(String(url)).toContain("/artist/stories/"+id+"/image");expect(new Headers(init.headers).get("authorization")).toBe("Bearer "+token);expect(JSON.parse(String(init.body))).toEqual(body);return new Response('{}',{status:409});}));expect((await POST(new NextRequest("https://web.example/api/artist/stories/"+id+"/image",{method:"POST",headers:{origin:"https://web.example",cookie:"negarin_session="+token},body:JSON.stringify(body)}),{params:Promise.resolve({id,imageId})})).status).toBe(409);});
});
