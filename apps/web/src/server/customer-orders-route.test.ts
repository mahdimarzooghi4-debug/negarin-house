import {afterEach,describe,expect,it,vi} from "vitest";
import {NextRequest} from "next/server";
import {POST} from "../app/api/customer/orders/route";
afterEach(()=>vi.unstubAllGlobals());
const id="00000000-0000-4000-8000-000000000001";
const command={cartVersion:3,addressBookVersion:7,addressId:id,idempotencyKey:id,expectedSubtotalToman:"1000"};
describe("customer order creation boundary",()=>{
  it("rejects cross-origin reservations before calling the API",async()=>{
    const upstream=vi.fn();vi.stubGlobal("fetch",upstream);
    const response=await POST(new NextRequest("https://web.example/api/customer/orders",{method:"POST",headers:{origin:"https://other.example","content-type":"application/json"},body:JSON.stringify(command)}));
    expect(response.status).toBe(403);expect(upstream).not.toHaveBeenCalled();
  });
  it("forwards the original idempotent command using the server-held session",async()=>{
    const token="A".repeat(43);
    vi.stubGlobal("fetch",vi.fn(async (_url:string,init:RequestInit)=>{
      expect(init.method).toBe("POST");
      expect(JSON.parse(String(init.body))).toEqual(command);
      expect(new Headers(init.headers).get("authorization")).toBe("Bearer "+token);
      return new Response('{"error":"checkout-price-changed"}',{status:409});
    }));
    const response=await POST(new NextRequest("https://web.example/api/customer/orders",{method:"POST",headers:{origin:"https://web.example",cookie:"negarin_session="+token,"content-type":"application/json"},body:JSON.stringify(command)}));
    expect(response.status).toBe(409);
  });
});
