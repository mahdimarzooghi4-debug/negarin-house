import {describe,expect,it} from "vitest";
import {parseFavorites} from "./favorite-data";
const id="00000000-0000-4000-8000-000000000001";
const item={productId:id,savedAt:"2026-11-05T10:00:00.000Z",product:{id,title:"اثر",category:null,priceToman:"9007199254740993",coverImageId:null,availability:"out_of_stock"}};
describe("favorite snapshots",()=>{
 it("retains exact money and allows unavailable saved items without private product data",()=>{
  expect(parseFavorites({version:3,items:[item]})?.items[0]?.product?.priceToman).toBe("9007199254740993");
  expect(parseFavorites({version:3,items:[{...item,product:null}]})?.items[0]?.product).toBeNull();
 });
 it("rejects duplicate IDs, mismatched resources, invalid versions, dates and prices",()=>{
  for(const value of [{version:-1,items:[]},{version:0,items:[item,item]},{version:0,items:[{...item,savedAt:"bad"}]},{version:0,items:[{...item,product:{...item.product,id:"other"}}]},{version:0,items:[{...item,product:{...item.product,priceToman:9007199254740993}}]}])expect(parseFavorites(value)).toBeNull();
 });
});
