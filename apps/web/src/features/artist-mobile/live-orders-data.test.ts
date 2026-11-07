import {describe,expect,it} from "vitest";
import {parseArtistOrders} from "./live-orders-data";
const id="00000000-0000-4000-8000-000000000001";
const valid={page:1,pageSize:20,hasMore:false,items:[{orderId:id,status:"preparing",version:2,createdAt:"2026-11-06T10:00:00.000Z",updatedAt:"2026-11-06T11:00:00.000Z",shipment:null,merchandiseSubtotalToman:"2450000",items:[{productId:id,title:"ظرف سفالی",quantity:2,unitPriceToman:"1225000",imageIds:[]}]}]};
describe("artist order response contract",()=>{
 it("parses the authoritative artist-scoped page and exact Toman amount",()=>{expect(parseArtistOrders(valid).items[0]?.merchandiseSubtotalToman).toBe("2450000");});
 it("fails closed on unsupported state, malformed money and invalid identity",()=>{
  expect(()=>parseArtistOrders({...valid,items:[{...valid.items[0],status:"delivered"}]})).toThrow();
  expect(()=>parseArtistOrders({...valid,items:[{...valid.items[0],merchandiseSubtotalToman:"2,450,000"}]})).toThrow();
  expect(()=>parseArtistOrders({...valid,items:[{...valid.items[0],orderId:"not-a-uuid"}]})).toThrow();
  expect(()=>parseArtistOrders({...valid,page:1001})).toThrow();
  expect(()=>parseArtistOrders({...valid,pageSize:51})).toThrow();
 });
});