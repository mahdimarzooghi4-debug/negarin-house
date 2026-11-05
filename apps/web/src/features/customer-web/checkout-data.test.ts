import {describe,expect,it} from "vitest";
import {checkoutCommand,parseOrderReceipt} from "./checkout-data";
import type {CustomerCart} from "./cart-data";
const id="00000000-0000-4000-8000-000000000001";
const cart:CustomerCart={version:2,items:[],subtotalToman:"9007199254740993",canCheckout:true};
const book={version:4,addresses:[{id,isDefault:true,recipientName:"آزمون",recipientPhone:"+989121234567",province:"تهران",city:"تهران",postalCode:"1234567890",fullAddress:"نشانی آزمون"}]};
describe("customer checkout contracts",()=>{
  it("captures server versions, selected address and exact expected amount",()=>{
    expect(checkoutCommand(cart,book,id,id)).toEqual({cartVersion:2,addressBookVersion:4,addressId:id,idempotencyKey:id,expectedSubtotalToman:"9007199254740993"});
  });
  it("rejects unready carts and addresses outside the current book",()=>{
    expect(()=>checkoutCommand({...cart,canCheckout:false},book,id,id)).toThrow();
    expect(()=>checkoutCommand({...cart,subtotalToman:"0"},book,id,id)).toThrow();
    expect(()=>checkoutCommand(cart,{version:4,addresses:[]},id,id)).toThrow();
  });
  it("accepts canonical receipts and rejects changed totals or invalid status/time",()=>{
    const receipt={id,status:"reserved",paymentStatus:"unpaid",subtotalToman:cart.subtotalToman,reservedUntil:"2026-11-05T10:00:00.000Z"};
    expect(parseOrderReceipt(receipt,cart.subtotalToman!)).not.toBeNull();
    expect(parseOrderReceipt({...receipt,subtotalToman:"1"},cart.subtotalToman!)).toBeNull();
    expect(parseOrderReceipt({...receipt,status:"unknown"},cart.subtotalToman!)).toBeNull();
    expect(parseOrderReceipt({...receipt,reservedUntil:"invalid"},cart.subtotalToman!)).toBeNull();
  });
});
