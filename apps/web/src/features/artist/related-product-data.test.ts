import {describe,expect,it} from "vitest";
import {parseRelatedProduct,parseRelatedProductPage} from "./related-product-data";
const item={id:"00000000-0000-4000-8000-000000000001",title:"اثر هنرمند",priceToman:"9007199254740993",availability:"in_stock"};
describe("related product responses",()=>{
 it("retains exact Toman amounts and checks resource fields",()=>{expect(parseRelatedProduct(item)?.priceToman).toBe("9007199254740993");for(const value of [{...item,id:"bad"},{...item,priceToman:1000},{...item,priceToman:"01"},{...item,priceToman:"9223372036854775808"},{...item,availability:"unknown"}])expect(parseRelatedProduct(value)).toBeNull();});
 it("validates page identity, bounds, duplicate IDs and hasMore",()=>{expect(parseRelatedProductPage({items:[item],page:1,pageSize:20,hasMore:false},1,20)?.items).toHaveLength(1);for(const value of [{items:[item],page:2,pageSize:20,hasMore:false},{items:[item,item],page:1,pageSize:20,hasMore:false},{items:[item],page:1,pageSize:20,hasMore:true}])expect(parseRelatedProductPage(value,1,20)).toBeNull();});
});
