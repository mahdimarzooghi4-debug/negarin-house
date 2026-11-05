import {describe,expect,it} from "vitest";
import {canConfirmShipment,parseCustomerOrder,parseCustomerOrderPage} from "./order-data";
const id="00000000-0000-4000-8000-000000000001";
const order={preparation:[],id,version:0,status:"reserved",paymentStatus:"unpaid",subtotalToman:"9007199254740993",reservedUntil:"2026-11-05T10:30:00.000Z",createdAt:"2026-11-05T10:00:00.000Z",shippingAddress:{recipientName:"گیرنده",recipientPhone:"+989121234567",province:"تهران",city:"تهران",postalCode:"1234567890",fullAddress:"نشانی آزمون"},items:[{productId:id,title:"اثر",quantity:1,unitPriceToman:"9007199254740993",lineSubtotalToman:"9007199254740993",imageIds:[]}]};
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
  it("maps independent artist preparation and preserves tracking leading zeroes",()=>{
    const other="00000000-0000-4000-8000-000000000002";
    const shipment={id:other,status:"reported_dispatched",source:"artist_report",carrierVerified:false,customerVersion:0,issue:null,carrierName:"پست",trackingCode:"00123AB",reportedAt:order.createdAt,receipt:null};
    const placed={...order,status:"placed",paymentStatus:"paid",subtotalToman:"18014398509481986",items:[order.items[0],{...order.items[0],productId:other}],preparation:[{items:[id],status:"preparing",version:2,shipment:null},{items:[other],status:"ready_for_dispatch",version:5,shipment}]};
    expect(parseCustomerOrder(placed)?.preparation[1]?.shipment?.trackingCode).toBe("00123AB");
    expect(parseCustomerOrder({...placed,preparation:[placed.preparation[0]]})).toBeNull();
    expect(parseCustomerOrder({...placed,preparation:[placed.preparation[0],{...placed.preparation[1],items:[id]}]})).toBeNull();
    expect(parseCustomerOrder({...placed,preparation:[placed.preparation[0],{...placed.preparation[1],shipment:{...shipment,carrierVerified:true}}]})).toBeNull();
    const received={...shipment,receipt:{source:"customer_confirmation",receivedAt:order.createdAt}};
    expect(parseCustomerOrder({...placed,preparation:[placed.preparation[0],{...placed.preparation[1],shipment:received}]})?.preparation[1]?.shipment?.receivedAt).toBe(order.createdAt);
    expect(parseCustomerOrder({...placed,preparation:[placed.preparation[0],{...placed.preparation[1],shipment:{...received,receipt:{...received.receipt,receivedAt:"bad"}}}]})).toBeNull();
  });

  it("allows confirmation only before receipt and after completed issue follow-up",()=>{
    const shipment={id,carrierName:"پست",trackingCode:"001",reportedAt:order.createdAt,receivedAt:null,customerVersion:0,issue:null};
    const issue={kind:"damaged" as const,description:"آسیب",status:"open" as const,resolution:null,resolutionSummary:null};
    expect(canConfirmShipment(shipment)).toBe(true);
    expect(canConfirmShipment({...shipment,receivedAt:order.createdAt})).toBe(false);
    expect(canConfirmShipment({...shipment,issue})).toBe(false);
    expect(canConfirmShipment({...shipment,issue:{...issue,status:"closed",resolution:"referred_for_refund_review"}})).toBe(false);
    expect(canConfirmShipment({...shipment,issue:{...issue,status:"closed",resolution:"customer_follow_up_complete"}})).toBe(true);
    expect(canConfirmShipment({...shipment,customerVersion:2147483647})).toBe(false);
  });

});
