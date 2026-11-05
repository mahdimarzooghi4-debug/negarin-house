import {describe,expect,it} from "vitest";
import {parseCustomerCart} from "./cart-data";
const id="00000000-0000-4000-8000-000000000001";
const item={productId:id,quantity:2,status:"available",product:{id,title:"اثر",priceToman:"9007199254740993",coverImageId:null},lineSubtotalToman:"18014398509481986"};
const cart={version:3,items:[item],subtotalToman:item.lineSubtotalToman,canCheckout:true};
describe("customer cart response",()=>{
  it("preserves exact monetary values and accepts an empty cart",()=>{
    expect(parseCustomerCart(cart)?.subtotalToman).toBe("18014398509481986");
    expect(parseCustomerCart({version:0,items:[],subtotalToman:"0",canCheckout:false})).not.toBeNull();
  });
  it("rejects incorrect totals, duplicate lines and impossible checkout flags",()=>{
    expect(parseCustomerCart({...cart,subtotalToman:"1"})).toBeNull();
    expect(parseCustomerCart({...cart,items:[item,item]})).toBeNull();
    expect(parseCustomerCart({...cart,canCheckout:false})).toBeNull();
    expect(parseCustomerCart({...cart,items:[{...item,quantity:0}]})).toBeNull();
  });
  it("accepts unavailable items only without a product or price and prevents checkout",()=>{
    const unavailable={version:4,items:[{productId:id,quantity:1,status:"unavailable",product:null,lineSubtotalToman:null}],subtotalToman:null,canCheckout:false};
    expect(parseCustomerCart(unavailable)).not.toBeNull();
    expect(parseCustomerCart({...unavailable,canCheckout:true})).toBeNull();
    expect(parseCustomerCart({...unavailable,subtotalToman:"0"})).toBeNull();
  });
});
