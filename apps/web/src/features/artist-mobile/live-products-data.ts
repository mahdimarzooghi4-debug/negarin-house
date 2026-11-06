import {isUuid} from "../corporate-buyer/live-data";

export type ArtistProduct={
  id:string;title:string;description:string|null;category:string|null;priceToman:string;
  publicationStatus:"draft"|"under_review"|"changes_requested"|"approved"|"published";
  version:number;inventoryVersion:number;stockQuantity:number;availability:"in_stock"|"out_of_stock";
  archivedAt:string|null;updatedAt:string;
};
function record(value:unknown):Record<string,unknown>|null{
  return value!==null&&typeof value==="object"&&!Array.isArray(value)?value as Record<string,unknown>:null;
}
const states=new Set(["draft","under_review","changes_requested","approved","published"]);
function version(value:unknown){return Number.isInteger(value)&&Number(value)>=0&&Number(value)<=2147483647;}
function canonicalDate(value:unknown){return typeof value==="string"&&!Number.isNaN(Date.parse(value))&&new Date(value).toISOString()===value;}
export function parseArtistProduct(value:unknown):ArtistProduct|null{
  const p=record(value);
  if(!p||!isUuid(p.id)||typeof p.title!=="string"||!p.title.trim()||
     !(p.description===null||typeof p.description==="string")||
     !(p.category===null||typeof p.category==="string")||
     typeof p.priceToman!=="string"||!/^[1-9]\d{0,18}$/.test(p.priceToman)||
     BigInt(p.priceToman)>9223372036854775807n||
     !states.has(String(p.publicationStatus))||!version(p.version)||!version(p.inventoryVersion)||
     !version(p.stockQuantity)||!(p.availability==="in_stock"||p.availability==="out_of_stock")||
     (p.stockQuantity===0)!==(p.availability==="out_of_stock")||
     !(p.archivedAt===null||canonicalDate(p.archivedAt))||!canonicalDate(p.updatedAt))return null;
  return {
    id:p.id,title:p.title,description:p.description as string|null,category:p.category as string|null,
    priceToman:p.priceToman,publicationStatus:p.publicationStatus as ArtistProduct["publicationStatus"],
    version:p.version as number,inventoryVersion:p.inventoryVersion as number,
    stockQuantity:p.stockQuantity as number,availability:p.availability as ArtistProduct["availability"],
    archivedAt:p.archivedAt as string|null,updatedAt:p.updatedAt as string
  };
}
export function parseArtistProducts(value:unknown):ArtistProduct[]|null {
  if(!Array.isArray(value))return null;
  const items=value.map(parseArtistProduct);
  if(items.some(item=>item===null))return null;
  const result=items as ArtistProduct[];
  return new Set(result.map(item=>item.id.toLowerCase())).size===result.length?result:null;
}
export async function requestArtistProduct<T>(path:string,parse:(input:unknown)=>T|null,init:RequestInit={}):Promise<T>{
  const response=await fetch(path,{...init,cache:"no-store",redirect:"manual"});
  if(!response.ok){
    const message:Record<number,string>={401:"ابتدا با حساب هنرمند وارد شوید.",403:"نقش فعال اجازه دسترسی به محصولات هنرمند را ندارد.",404:"این محصول در حساب شما یافت نشد.",409:"اطلاعات محصول تغییر کرده است؛ دوباره از سرور دریافت کنید."};
    throw new Error(message[response.status]??"عملیات در سرور تأیید نشد؛ پیش از تکرار، اطلاعات را دوباره دریافت کنید.");
  }
  const parsed=parse(await response.json());
  if(parsed===null)throw new Error("پاسخ سرور معتبر نیست؛ اطلاعات نمونه جایگزین نمی‌شود.");
  return parsed;
}
