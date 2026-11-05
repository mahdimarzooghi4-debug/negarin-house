import {describe,expect,it} from "vitest";
import {parseCustomerOrder,parseCustomerOrderPage} from "./order-data";
const id="00000000-0000-4000-8000-000000000001";
const order={id,version:0,status:"reserved",paymentStatus:"unpaid",subtotalToman:"9007199254740993",reservedUntil:"2026-11-05T10:30:00.000Z",createdAt:"2026-11-05T10:00:00.000Z",shippingAddress:{recipientName:"گیرنده",recipientPhone:"+989121234567",province:"تهران",city:"تهران",postalCode:"1234567890",fullAddress:"نشانی آزمون"},items:[{productId:id,title:"اثر",quantity:1,unitPriceToman:"9007199254740993",lineSubtotalToman:"9007199254740993",imageIds:[]}]};
describe("customer order read models",()=>{
  it("keeps exact monetary snapshots for reserved and expired orders",()=>{
    expect(parseCustomerOrder(order)?.subtotalToman).toBe("9007199254740993");
    expect(parseCustomerOrder({...order,status:"expired"})?.status).toBe("expired");
  });
  it("rejects inconsistent totals, duplicate items and invalid shipping snapshots",()=>{
    expect(parseCustomerOrder({...order,subtotalToman:"1"})).toBeNull();
    expect(parseCustomerOrder({...order,items:[order.items[0],order.items[0]]})).toBeNull();
    expect(parseCustomerOrder({...order,shippingAddress:null})).toBeNull();
    expect(parseCustomerOrder({...order,createdAt:"yesterday"})).toBeNull();
  });
  it("validates pagination and duplicate order IDs",()=>{
    const page={page:1,pageSize:6,hasMore:false,items:[order]};
    expect(parseCustomerOrderPage(page,1,6)?.items).toHaveLength(1);
    expect(parseCustomerOrderPage(page,2,6)).toBeNull();
    expect(parseCustomerOrderPage({...page,hasMore:true},1,6)).toBeNull();
    expect(parseCustomerOrderPage({...page,items:[order,order]},1,6)).toBeNull();
  });
});
