import {describe,expect,it} from "vitest";
import {parsePublicText,parsePublicSwitch,parseContentPage,parseStoryProduct} from "./artist-public-content.js";
describe("public artist content commands",()=>{
 it("accepts bounded text and explicit publication switches",()=>{
  expect(parsePublicText({version:0,title:" نام روایت ",body:"پاراگراف اول\nپاراگراف دوم"},true).fields.title).toBe("نام روایت");
  expect(parsePublicSwitch({version:3,published:false})).toEqual({version:3,published:false});
  expect(parseContentPage({page:"2",pageSize:"6"})).toEqual({page:2,pageSize:6});
 });
 it("rejects privileged fields, invalid text and unbounded discovery queries",()=>{
  for(const v of [{version:0,title:"نام",body:"متن",published:true},{version:0,title:"",body:"متن"},{version:0,title:"نام",body:"x".repeat(10001)},{version:0,title:"نام\nدیگر",body:"متن"}])expect(()=>parsePublicText(v,true)).toThrow();
  expect(()=>parsePublicSwitch({version:0,published:"true"})).toThrow();
  for(const q of [{page:"0"},{pageSize:"21"},{artistId:"other"},{page:["1","2"]}])expect(()=>parseContentPage(q)).toThrow();
 });
 it("requires an explicit nullable product ID, valid UUID and version without privileged fields",()=>{
  const id="00000000-0000-4000-8000-000000000001";
  expect(parseStoryProduct({version:2,productId:id})).toEqual({version:2,productId:id});
  expect(parseStoryProduct({version:2,productId:null})).toEqual({version:2,productId:null});
  for(const input of [{version:0},{version:0,productId:42},{version:0,productId:"bad"},{version:-1,productId:null},{version:0,productId:id,published:true}])expect(()=>parseStoryProduct(input)).toThrow();
 });

});
