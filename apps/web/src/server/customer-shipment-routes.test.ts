import {afterEach,describe,expect,it,vi} from "vitest";
import {NextRequest} from "next/server";
import {POST as receipt} from "../app/api/customer/orders/[id]/shipments/[shipmentId]/receipt/route";
import {POST as issue} from "../app/api/customer/orders/[id]/shipments/[shipmentId]/issues/route";
afterEach(()=>vi.unstubAllGlobals());
const id="00000000-0000-4000-8000-000000000001";
const params=Promise.resolve({id,shipmentId:id});
describe("customer shipment mutation boundary",()=>{
  it("rejects cross-origin receipt and issue requests before upstream access",async()=>{
    const upstream=vi.fn();vi.stubGlobal("fetch",upstream);
    for(const action of [receipt,issue]){
      const response=await action(new NextRequest("https://web.example/api/customer/orders",{method:"POST",headers:{origin:"https://other.example"},body:'{"version":0}'}),{params});
      expect(response.status).toBe(403);
    }
    expect(upstream).not.toHaveBeenCalled();
  });
  it("forwards versioned commands with the server session and preserves conflicts",async()=>{
    const token="A".repeat(43);
    for(const [action,suffix,body] of [[receipt,"receipt",{version:3}],[issue,"issues",{version:4,kind:"damaged",description:"آسیب"}]] as const){
      vi.stubGlobal("fetch",vi.fn(async(url:string,init:RequestInit)=>{
        expect(String(url)).toContain(`/customer/orders/${id}/shipments/${id}/${suffix}`);
        expect(new Headers(init.headers).get("authorization")).toBe("Bearer "+token);
        expect(JSON.parse(String(init.body))).toEqual(body);
        return new Response('{"error":"shipment-state-changed"}',{status:409});
      }));
      const response=await action(new NextRequest("https://web.example/api/customer/orders",{method:"POST",headers:{origin:"https://web.example",cookie:"negarin_session="+token,"content-type":"application/json"},body:JSON.stringify(body)}),{params});
      expect(response.status).toBe(409);
      expect(response.headers.get("cache-control")).toBe("no-store");
    }
  });
});
