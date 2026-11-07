import {describe,it,expect} from "vitest";
import {parseArtistProduct,parseArtistProducts} from "./live-products-data";
const id="00000000-0000-4000-8000-000000000001";
const product={id,title:"اثر هنری",description:null,category:null,priceToman:"2450000",
  publicationStatus:"draft",version:2,inventoryVersion:0,stockQuantity:0,
  availability:"out_of_stock",archivedAt:null,updatedAt:"2026-11-06T12:00:00.000Z",imageIds:[]};
describe("artist mobile owned-product contract",()=>{
  it("accepts a backend-owned product and list",()=>{
    expect(parseArtistProduct(product)?.priceToman).toBe("2450000");
    expect(parseArtistProducts([product])).toHaveLength(1);
  });
  it("rejects fabricated, stale, inconsistent or duplicate data",()=>{
    expect(parseArtistProduct({...product,priceToman:"0"})).toBeNull();
    expect(parseArtistProduct({...product,stockQuantity:4})).toBeNull();
    expect(parseArtistProduct({...product,publicationStatus:"approved_by_ai"})).toBeNull();
    expect(parseArtistProduct({...product,inventoryVersion:-1})).toBeNull();
    expect(parseArtistProduct({...product,archivedAt:"yesterday"})).toBeNull();
    expect(parseArtistProduct({...product,imageIds:["bad"]})).toBeNull();
    expect(parseArtistProducts([product,{...product,title:"different"}])).toBeNull();
    expect(parseArtistProducts([{...product,id:"not-a-uuid"}])).toBeNull();
  });
});
