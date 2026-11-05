import {isUuid} from "../corporate-buyer/live-data";
import {parseOrderReceipt,type OrderReceipt} from "./checkout-data";
import type {AddressFields} from "./address-data";

export type OrderItem={productId:string;title:string;quantity:number;unitPriceToman:string;lineSubtotalToman:string;imageIds:string[]};
export type CustomerOrder=OrderReceipt&{version:number;createdAt:string;shippingAddress:AddressFields;items:OrderItem[]};
export type OrderPage={page:number;pageSize:number;hasMore:boolean;items:CustomerOrder[]};
export const orderStatusLabels={reserved:"رزروشده",placed:"ثبت نهایی",cancelled:"لغوشده",expired:"رزرو منقضی‌شده"};
export const paymentStatusLabels={unpaid:"پرداخت‌نشده",paid:"پرداخت‌شده",reconciliation_required:"در حال بررسی"};

function record(value:unknown):Record<string,unknown>|null{
  return value!==null&&typeof value==="object"&&!Array.isArray(value)?value as Record<string,unknown>:null;
}
export function parseCustomerOrder(value:unknown):CustomerOrder|null{
  const raw=record(value);
  if(!raw||typeof raw.subtotalToman!=="string"||!/^(0|[1-9]\d{0,24})$/.test(raw.subtotalToman))return null;
  const receipt=parseOrderReceipt(raw,raw.subtotalToman);
  if(!receipt||typeof raw.version!=="number"||!Number.isInteger(raw.version)||raw.version<0||raw.version>=2147483647||typeof raw.createdAt!=="string")return null;
  const created=new Date(raw.createdAt);
  if(!Number.isFinite(created.getTime())||created.toISOString()!==raw.createdAt)return null;
  const address=record(raw.shippingAddress);
  const addressKeys=["recipientName","recipientPhone","province","city","postalCode","fullAddress"] as const;
  if(!address||addressKeys.some(key=>typeof address[key]!=="string"||!String(address[key]).trim()))return null;
  const shippingAddress=Object.fromEntries(addressKeys.map(key=>[key,address[key]])) as AddressFields;
  if(!Array.isArray(raw.items)||raw.items.length===0||raw.items.length>50)return null;
  const items:OrderItem[]=[];
  let subtotal=0n;
  for(const value of raw.items){
    const item=record(value);
    if(!item||!isUuid(item.productId)||typeof item.title!=="string"||!item.title.trim()||typeof item.quantity!=="number"||!Number.isInteger(item.quantity)||item.quantity<1||item.quantity>100||typeof item.unitPriceToman!=="string"||!/^(0|[1-9]\d{0,18})$/.test(item.unitPriceToman)||BigInt(item.unitPriceToman)>9223372036854775807n||!Array.isArray(item.imageIds)||!item.imageIds.every(isUuid))return null;
    if(items.some(existing=>existing.productId.toLowerCase()===String(item.productId).toLowerCase())||new Set(item.imageIds.map(id=>id.toLowerCase())).size!==item.imageIds.length)return null;
    const total=BigInt(item.unitPriceToman)*BigInt(item.quantity);
    if(item.lineSubtotalToman!==total.toString())return null;
    subtotal+=total;
    items.push({productId:item.productId,title:item.title,quantity:item.quantity,unitPriceToman:item.unitPriceToman,lineSubtotalToman:total.toString(),imageIds:item.imageIds});
  }
  if(subtotal.toString()!==raw.subtotalToman)return null;
  return {...receipt,version:raw.version,createdAt:raw.createdAt,shippingAddress,items};
}
export function parseCustomerOrderPage(value:unknown,page:number,pageSize:number):OrderPage|null{
  const raw=record(value);
  if(!raw||raw.page!==page||raw.pageSize!==pageSize||typeof raw.hasMore!=="boolean"||!Array.isArray(raw.items)||raw.items.length>pageSize||(raw.hasMore&&raw.items.length!==pageSize))return null;
  const items=raw.items.map(parseCustomerOrder);
  if(items.some(item=>item===null))return null;
  const parsed=items as CustomerOrder[];
  if(new Set(parsed.map(item=>item.id.toLowerCase())).size!==parsed.length)return null;
  return {page,pageSize,hasMore:raw.hasMore,items:parsed};
}
export async function readCustomerOrders(path:string,signal:AbortSignal):Promise<unknown>{
  const response=await fetch(path,{signal,cache:"no-store"});
  if(!response.ok){
    const messages:Record<number,string>={401:"برای مشاهدهٔ سفارش‌ها وارد حساب شوید.",403:"نقش مشتری را در حساب خود انتخاب کنید.",404:"این سفارش در حساب شما پیدا نشد."};
    throw new Error(messages[response.status]??"دریافت اطلاعات سفارش انجام نشد.");
  }
  return response.json();
}
