import {isUuid} from "../corporate-buyer/live-data";
export type FavoriteProduct={id:string;title:string;category:string|null;priceToman:string;coverImageId:string|null;availability:"in_stock"|"out_of_stock"};
export type Favorites={version:number;items:{productId:string;savedAt:string;product:FavoriteProduct|null}[]};
export function parseFavorites(value:unknown):Favorites|null{
  if(!value||typeof value!=="object"||Array.isArray(value))return null;
  const raw=value as Record<string,unknown>;
  if(!Number.isInteger(raw.version)||(raw.version as number)<0||(raw.version as number)>2147483647||!Array.isArray(raw.items)||raw.items.length>100)return null;
  const items:Favorites["items"]=[];
  for(const entry of raw.items){
    if(!entry||typeof entry!=="object"||Array.isArray(entry))return null;
    const item=entry as Record<string,unknown>;
    if(!isUuid(item.productId)||typeof item.savedAt!=="string"||!Number.isFinite(Date.parse(item.savedAt))||new Date(item.savedAt).toISOString()!==item.savedAt||items.some(i=>i.productId.toLowerCase()===String(item.productId).toLowerCase()))return null;
    let product:FavoriteProduct|null=null;
    if(item.product!==null){
      if(!item.product||typeof item.product!=="object"||Array.isArray(item.product))return null;
      const p=item.product as Record<string,unknown>;
      if(p.id!==item.productId||typeof p.title!=="string"||!p.title.trim()||(p.category!==null&&typeof p.category!=="string")||typeof p.priceToman!=="string"||!/^(0|[1-9]\d{0,18})$/.test(p.priceToman)||BigInt(p.priceToman)>9223372036854775807n||(p.coverImageId!==null&&!isUuid(p.coverImageId))||!["in_stock","out_of_stock"].includes(String(p.availability)))return null;
      product={id:item.productId,title:p.title,category:p.category as string|null,priceToman:p.priceToman,coverImageId:p.coverImageId as string|null,availability:p.availability as FavoriteProduct["availability"]};
    }
    items.push({productId:item.productId,savedAt:item.savedAt,product});
  }
  return {version:raw.version as number,items};
}
export async function requestFavorites(path="/api/customer/favorites",init:RequestInit={}):Promise<Favorites>{
  const response=await fetch(path,{...init,cache:"no-store"});
  if(!response.ok){
    const messages:Record<number,string>={401:"برای مدیریت علاقه‌مندی‌ها وارد شوید.",403:"نقش مشتری را انتخاب کنید.",404:"این اثر در دسترس نیست.",409:"فهرست تغییر کرده یا ظرفیت ذخیره‌ها تکمیل شده است. اطلاعات را تازه کنید."};
    throw new Error(messages[response.status]??"دریافت یا ذخیرهٔ علاقه‌مندی‌ها انجام نشد.");
  }
  const parsed=parseFavorites(await response.json());
  if(!parsed)throw new Error("اطلاعات علاقه‌مندی‌ها قابل نمایش نیست.");
  return parsed;
}
