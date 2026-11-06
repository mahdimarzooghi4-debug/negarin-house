import {describe,expect,it} from "vitest";
import {parsePublicArtist,parsePublicStory,parseStoryPage} from "./public-content-data";
const id="00000000-0000-4000-8000-000000000001",profile={artistId:id,displayName:"هنرمند",biography:"دربارهٔ هنر",craft:"سفال",city:"تهران"};
const story={id,title:"روایت",body:"متن\nروایت",publishedAt:"2026-11-05T10:00:00.000Z",profile};
describe("public content response models",()=>{
 it("accepts public text stories and rejects private identity fields",()=>{
  expect(parsePublicStory(story)?.profile.displayName).toBe("هنرمند");
  expect(parsePublicArtist({...profile,phone:"+989121234567"})).toBeNull();
  expect(parsePublicStory({...story,publishedAt:"yesterday"})).toBeNull();
 });
 it("checks requested page, full hasMore pages and duplicate story IDs",()=>{
  expect(parseStoryPage({page:1,pageSize:6,hasMore:false,items:[story]},1,6)?.items).toHaveLength(1);
  expect(parseStoryPage({page:2,pageSize:6,hasMore:false,items:[story]},1,6)).toBeNull();
  expect(parseStoryPage({page:1,pageSize:6,hasMore:true,items:[story]},1,6)).toBeNull();
  expect(parseStoryPage({page:1,pageSize:6,hasMore:false,items:[story,story]},1,6)).toBeNull();
 });
 it("accepts nullable product links while rejecting malformed product responses",()=>{
  const product={id,title:"محصول مرتبط",priceToman:"9007199254740993",availability:"out_of_stock"};
  expect(parsePublicStory({...story,product})?.product?.priceToman).toBe(product.priceToman);
  expect(parsePublicStory({...story,product:null})?.product).toBeNull();
  expect(parsePublicStory({...story,product:{...product,id:"bad"}})).toBeNull();
 });

 it("requires valid optional video IDs",()=>{expect(parsePublicStory({...story,videoId:id})?.videoId).toBe(id);expect(parsePublicStory({...story,videoId:null})?.videoId).toBeNull();expect(parsePublicStory({...story,videoId:"bad"})).toBeNull();});

});
