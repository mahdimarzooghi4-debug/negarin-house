export type ArtistOrderStatus="awaiting_acceptance"|"accepted"|"preparing"|"packaging"|"ready_for_dispatch";
export type ArtistOrder={orderId:string;status:ArtistOrderStatus;version:number;createdAt:string;updatedAt:string;shipment:unknown;merchandiseSubtotalToman:string;items:Array<{productId:string;title:string;quantity:number;unitPriceToman:string;imageIds:string[]}>};
export type ArtistOrdersPage={page:number;pageSize:number;hasMore:boolean;items:ArtistOrder[]};
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const statuses:ArtistOrderStatus[]=["awaiting_acceptance","accepted","preparing","packaging","ready_for_dispatch"];
function record(value:unknown):Record<string,unknown>{if(!value||typeof value!=="object"||Array.isArray(value))throw Error("پاسخ سفارش‌ها معتبر نیست.");return value as Record<string,unknown>;}
function text(value:unknown):string{if(typeof value!=="string")throw Error("اطلاعات سفارش ناقص است.");return value;}
function integer(value:unknown):number{if(!Number.isSafeInteger(value)||Number(value)<0)throw Error("نسخه سفارش معتبر نیست.");return Number(value);}
export function parseArtistOrders(value:unknown):ArtistOrdersPage{
 const root=record(value);if(!Array.isArray(root.items)||typeof root.hasMore!=="boolean")throw Error("فهرست سفارش‌ها معتبر نیست.");
 const page=integer(root.page),pageSize=integer(root.pageSize);if(page<1||page>1000||pageSize<1||pageSize>50)throw Error("صفحه‌بندی سفارش‌ها معتبر نیست.");
 const items=root.items.map(raw=>{const o=record(raw);
  if(!uuid.test(text(o.orderId))||!statuses.includes(o.status as ArtistOrderStatus)||!Array.isArray(o.items))throw Error("شناسه یا وضعیت سفارش معتبر نیست.");
  const lines=o.items.map(rawLine=>{const line=record(rawLine);
   if(!uuid.test(text(line.productId))||!Array.isArray(line.imageIds)||!line.imageIds.every(x=>typeof x==="string")||!Number.isSafeInteger(line.quantity)||Number(line.quantity)<1||!/^[0-9]+$/.test(text(line.unitPriceToman)))throw Error("قلم سفارش معتبر نیست.");
   return {productId:text(line.productId),title:text(line.title),quantity:Number(line.quantity),unitPriceToman:text(line.unitPriceToman),imageIds:line.imageIds as string[]};
  });
  if(!/^[0-9]+$/.test(text(o.merchandiseSubtotalToman)))throw Error("مبلغ سفارش معتبر نیست.");
  const createdAt=text(o.createdAt),updatedAt=text(o.updatedAt);if(!Number.isFinite(Date.parse(createdAt))||!Number.isFinite(Date.parse(updatedAt)))throw Error("تاریخ سفارش معتبر نیست.");
  return {orderId:text(o.orderId),status:o.status as ArtistOrderStatus,version:integer(o.version),createdAt,updatedAt,shipment:o.shipment,merchandiseSubtotalToman:text(o.merchandiseSubtotalToman),items:lines};
 });
 return {page,pageSize,hasMore:root.hasMore,items};
}
export async function requestArtistOrders(page:number,signal?:AbortSignal):Promise<ArtistOrdersPage>{
 const response=await fetch("/api/artist/orders?page="+page+"&pageSize=20",{cache:"no-store",signal});
 if(!response.ok)throw Error(response.status===401?"برای مشاهده سفارش‌ها وارد حساب هنرمند شوید.":"دریافت سفارش‌ها انجام نشد. دوباره تلاش کنید.");
 return parseArtistOrders(await response.json());
}