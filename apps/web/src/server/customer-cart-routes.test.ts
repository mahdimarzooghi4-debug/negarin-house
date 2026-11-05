import {afterEach,describe,expect,it,vi} from "vitest";
import {NextRequest} from "next/server";
import {PUT,DELETE} from "../app/api/customer/cart/items/[productId]/route";
const id="00000000-0000-4000-8000-000000000001";
const context={params:Promise.resolve({productId:id})};
afterEach(()=>vi.unstubAllGlobals());
describe("customer cart mutation boundary",()=>{
  it("rejects cross-origin changes and unauthenticated requests before contacting the API",async()=>{
    const upstream=vi.fn();vi.stubGlobal("fetch",upstream);
    const request=(origin:string)=>new NextRequest("https://web.example/api/customer/cart/items/"+id,{method:"PUT",headers:{origin,"content-type":"application/json"},body:JSON.stringify({version:0,quantity:1})});
    expect((await PUT(request("https://other.example"),context)).status).toBe(403);
    expect((await PUT(request("https://web.example"),context)).status).toBe(401);
    expect(upstream).not.toHaveBeenCalled();
  });
  it("forwards versioned deletion with server-held bearer credentials and preserves conflict responses",async()=>{
    const token="A".repeat(43);
    const upstream=vi.fn(async (_url:string,init:RequestInit)=>{
      expect(new Headers(init.headers).get("authorization")).toBe("Bearer "+token);
      expect(init.method).toBe("DELETE");
      expect(JSON.parse(String(init.body))).toEqual({version:4});
      return new Response('{"error":"cart-state-changed"}',{status:409});
    });vi.stubGlobal("fetch",upstream);
    const request=new NextRequest("https://web.example/api/customer/cart/items/"+id,{method:"DELETE",headers:{origin:"https://web.example",cookie:"negarin_session="+token,"content-type":"application/json"},body:'{"version":4}'});
    expect((await DELETE(request,context)).status).toBe(409);
    expect(upstream).toHaveBeenCalledOnce();
  });
});
