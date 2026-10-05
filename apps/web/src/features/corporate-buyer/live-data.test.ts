import {describe,expect,it} from "vitest";
import {formatToman,parseCorporateProduct,parseCorporatePurchaseRequest,parseProductPage,requestTotalQuantity} from "./live-data";

describe("Corporate live data contracts",()=>{
  it("parses only the public Corporate product response",()=>{
    const product=parseCorporateProduct({
      id:"00000000-0000-4000-8000-000000000001",title:"اثر",description:"شرح",category:"مینا",
      dimensions:null,materials:"مس",weight:null,color:null,technique:null,careInstructions:null,
      priceToman:"9007199254740993",imageIds:[],availability:"in_stock",coverImageId:null,
      createdAt:"2026-10-05T00:00:00.000Z"
    });
    expect(product?.priceToman).toBe("9007199254740993");
    expect(formatToman(product!.priceToman)).toContain("۹");
    expect(parseCorporateProduct({...product,artistUserId:"private"})).not.toBeNull();
    expect(parseCorporateProduct({...product,priceToman:9007199254740993})).toBeNull();
  });

  it("rejects malformed catalog pages",()=>{
    expect(parseProductPage({page:1,pageSize:20,hasMore:false,items:[]})).toEqual({page:1,pageSize:20,hasMore:false,items:[]});
    expect(parseProductPage({page:0,pageSize:20,hasMore:false,items:[]})).toBeNull();
  });

  it("parses PurchaseRequest without inventing commercial fields",()=>{
    const request=parseCorporatePurchaseRequest({
      id:"00000000-0000-4000-8000-000000000002",status:"draft",version:0,createdAt:"2026-10-05T00:00:00.000Z",submittedAt:null,
      items:[{productId:"00000000-0000-4000-8000-000000000001",title:"اثر",quantity:3}],
      history:[{version:0,action:"created",createdAt:"2026-10-05T00:00:00.000Z"}]
    });
    expect(requestTotalQuantity(request!)).toBe(3);
    expect(request).not.toHaveProperty("priceToman");
  });
});
