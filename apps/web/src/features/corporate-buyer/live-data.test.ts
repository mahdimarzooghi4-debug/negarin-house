import {describe,expect,it} from "vitest";
import {MAX_PURCHASE_REQUEST_LINES,MAX_PURCHASE_REQUEST_QUANTITY,formatToman,isPurchaseRequestQuantity,normalizePurchaseRequestProductIds,parseCorporateProduct,parseCorporatePurchaseRequest,parseProductPage,parsePurchaseRequestProductQuery,requestTotalQuantity} from "./live-data";

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
    expect(parseCorporateProduct({...product,artistUserId:"private"})).toBeNull();
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
    expect(isPurchaseRequestQuantity(MAX_PURCHASE_REQUEST_QUANTITY)).toBe(true);
    expect(isPurchaseRequestQuantity(MAX_PURCHASE_REQUEST_QUANTITY+1)).toBe(false);
    expect(parseCorporatePurchaseRequest({...request,version:MAX_PURCHASE_REQUEST_QUANTITY})).toBeNull();
    expect(parseCorporatePurchaseRequest({...request,items:[{...request!.items[0],quantity:MAX_PURCHASE_REQUEST_QUANTITY+1}]})).toBeNull();
    expect(parseCorporatePurchaseRequest({...request,id:"not-a-uuid"})).toBeNull();
    expect(parseCorporatePurchaseRequest({...request,items:[]})).toBeNull();
    expect(parseCorporatePurchaseRequest({...request,items:[request!.items[0],request!.items[0]]})).toBeNull();
    expect(parseCorporatePurchaseRequest({...request,submittedAt:"2026-10-05T01:00:00.000Z"})).toBeNull();
    expect(parseCorporatePurchaseRequest({...request,history:[]})).toBeNull();

    const submitted=parseCorporatePurchaseRequest({
      ...request,status:"submitted",version:1,submittedAt:"2026-10-05T01:00:00.000Z",
      history:[
        {version:0,action:"created",createdAt:"2026-10-05T00:00:00.000Z"},
        {version:1,action:"submitted",createdAt:"2026-10-05T01:00:00.000Z"}
      ]
    });
    expect(submitted?.status).toBe("submitted");
    expect(parseCorporatePurchaseRequest({...submitted,history:[submitted!.history[1],submitted!.history[0]]})).toBeNull();
    expect(parseCorporatePurchaseRequest({...submitted,version:0})).toBeNull();
    expect(parseCorporatePurchaseRequest({...submitted,submittedAt:null})).toBeNull();
  });

  it("fails closed instead of silently dropping invalid or over-limit product selections",()=>{
    const id=(value:number)=>`00000000-0000-4000-8000-${String(value).padStart(12,"0")}`;
    expect(normalizePurchaseRequestProductIds([id(1),id(1),id(2)])).toEqual({ids:[id(1),id(2)],error:null});
    expect(normalizePurchaseRequestProductIds([id(1),"not-a-product-id"])).toEqual({ids:[],error:"invalid"});
    expect(normalizePurchaseRequestProductIds([id(1),""])).toEqual({ids:[],error:"invalid"});
    expect(normalizePurchaseRequestProductIds(
      Array.from({length:MAX_PURCHASE_REQUEST_LINES+1},(_,index)=>id(index+1))
    )).toEqual({ids:[],error:"too_many"});
    expect(parsePurchaseRequestProductQuery(undefined)).toEqual({ids:[],error:null});
    expect(parsePurchaseRequestProductQuery(`${id(1)},${id(2)}`)).toEqual({ids:[id(1),id(2)],error:null});
    expect(parsePurchaseRequestProductQuery(`${id(1)},,${id(2)}`)).toEqual({ids:[],error:"invalid"});
    expect(parsePurchaseRequestProductQuery([id(1),id(2)])).toEqual({ids:[],error:"invalid"});
  });
});
