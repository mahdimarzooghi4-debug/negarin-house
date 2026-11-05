import {afterEach,describe,expect,it,vi} from "vitest";
import {NextRequest} from "next/server";
import {POST} from "../app/api/customer/orders/[id]/cancel/route";
afterEach(()=>vi.unstubAllGlobals());
const id="00000000-0000-4000-8000-000000000001";
const params=Promise.resolve({id});
describe("customer cancellation boundary",()=>{
  it("rejects cross-origin and invalid identifiers before upstream",async()=>{
    const upstream=vi.fn();vi.stubGlobal("fetch",upstream);
    const request=(origin:string)=>new NextRequest("https://web.example/api/customer/orders",{method:"POST",headers:{origin,"content-type":"application/json"},body:'{"version":3}'});
    expect((await POST(request("https://other.example"),{params})).status).toBe(403);
    expect((await POST(request("https://web.example"),{params:Promise.resolve({id:"invalid"})})).status).toBe(400);
    expect(upstream).not.toHaveBeenCalled();
  });
  it("preserves version and conflict responses using the server session",async()=>{
    const token="A".repeat(43);
    vi.stubGlobal("fetch",vi.fn(async(url:string,init:RequestInit)=>{
      expect(String(url)).toContain(`/customer/orders/${id}/cancel`);
      expect(new Headers(init.headers).get("authorization")).toBe("Bearer "+token);
      expect(JSON.parse(String(init.body))).toEqual({version:3});
      return new Response('{"error":"order-state-changed"}',{status:409});
    }));
    const response=await POST(new NextRequest("https://web.example/api/customer/orders",{method:"POST",headers:{origin:"https://web.example",cookie:"negarin_session="+token,"content-type":"application/json"},body:'{"version":3}'}),{params});
    expect(response.status).toBe(409);
    expect(response.headers.get("cache-control")).toBe("no-store");
  });
});
