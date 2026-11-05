import {isUuid} from "../corporate-buyer/live-data";
import {parseOrderReceipt,type OrderReceipt} from "./checkout-data";
import type {AddressFields} from "./address-data";

export type OrderItem={productId:string;title:string;quantity:number;unitPriceToman:string;lineSubtotalToman:string;imageIds:string[]};
export type CustomerOrder=OrderReceipt&{version:number;createdAt:string;shippingAddress:AddressFields;items:OrderItem[];preparation:OrderPreparation[]};
export const preparationStatusLabels={awaiting_acceptance:"در انتظار پذیرش هنرمند",accepted:"پذیرفته‌شده",preparing:"در حال آماده‌سازی",packaging:"در حال بسته‌بندی",ready_for_dispatch:"آمادهٔ ارسال"};
export const shipmentIssueLabels={not_received:"مرسوله نرسیده است",damaged:"آسیب‌دیدگی",wrong_items:"اقلام اشتباه",missing_items:"کسری اقلام"};
export type ShipmentIssue={kind:keyof typeof shipmentIssueLabels;description:string;status:"open"|"in_review"|"closed";resolution:"customer_follow_up_complete"|"referred_for_refund_review"|null;resolutionSummary:string|null};
export type OrderPreparation={items:string[];status:keyof typeof preparationStatusLabels;version:number;shipment:{id:string;carrierName:string;trackingCode:string;reportedAt:string;receivedAt:string|null;customerVersion:number;issue:ShipmentIssue|null}|null};
function isoDate(value:unknown):value is string {
  if(typeof value!=="string")return false;
  const date=new Date(value);
  return Number.isFinite(date.getTime())&&date.toISOString()===value;
}
function parsePreparation(value:unknown,items:OrderItem[],status:OrderReceipt["status"]):OrderPreparation[]|null {
  if(!Array.isArray(value)||value.length>items.length)return null;
  if(status!=="placed")return value.length===0?[]:null;
  const result:OrderPreparation[]=[];
  const assigned=new Set<string>();
  const shipments=new Set<string>();
  for(const entry of value){
    const group=record(entry);
    if(!group||typeof group.status!=="string"||!Object.hasOwn(preparationStatusLabels,group.status)||!Number.isInteger(group.version)||(group.version as number)<0||!Array.isArray(group.items)||!group.items.length)return null;
    for(const id of group.items){
      if(!isUuid(id)||!items.some(item=>item.productId.toLowerCase()===id.toLowerCase())||assigned.has(id.toLowerCase()))return null;
      assigned.add(id.toLowerCase());
    }
    let shipment:OrderPreparation["shipment"]=null;
    if(group.shipment!==null){
      const raw=record(group.shipment);
      if(!raw||group.status!=="ready_for_dispatch"||!isUuid(raw.id)||shipments.has(raw.id.toLowerCase())||raw.status!=="reported_dispatched"||raw.source!=="artist_report"||raw.carrierVerified!==false||typeof raw.carrierName!=="string"||!raw.carrierName.trim()||typeof raw.trackingCode!=="string"||!/^[A-Za-z0-9-]{1,100}$/.test(raw.trackingCode)||!isoDate(raw.reportedAt))return null;
      let receivedAt:string|null=null;
      if(raw.receipt!==null){
        const receipt=record(raw.receipt);
        if(!receipt||receipt.source!=="customer_confirmation"||!isoDate(receipt.receivedAt))return null;
        receivedAt=receipt.receivedAt;
      }
      if(!Number.isInteger(raw.customerVersion)||(raw.customerVersion as number)<0||(raw.customerVersion as number)>2147483647)return null;
      let issue:ShipmentIssue|null=null;
      if(raw.issue!==null){
        const detail=record(raw.issue);
        if(!detail||typeof detail.kind!=="string"||!Object.hasOwn(shipmentIssueLabels,detail.kind)||typeof detail.description!=="string"||!detail.description.trim()||!["open","in_review","closed"].includes(String(detail.status))||![null,"customer_follow_up_complete","referred_for_refund_review"].includes(detail.resolution as string|null)||(detail.resolutionSummary!==null&&typeof detail.resolutionSummary!=="string"))return null;
        if((detail.status==="closed")!==(detail.resolution!==null))return null;
        issue={kind:detail.kind as ShipmentIssue["kind"],description:detail.description,status:detail.status as ShipmentIssue["status"],resolution:detail.resolution as ShipmentIssue["resolution"],resolutionSummary:detail.resolutionSummary as string|null};
      }
      shipments.add(raw.id.toLowerCase());
      shipment={id:raw.id,carrierName:raw.carrierName,trackingCode:raw.trackingCode,reportedAt:raw.reportedAt,receivedAt,customerVersion:raw.customerVersion as number,issue};
    }
    result.push({items:group.items as string[],status:group.status as OrderPreparation["status"],version:group.version as number,shipment});
  }
  return assigned.size===items.length?result:null;
}
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
  const preparation=parsePreparation(raw.preparation,items,receipt.status);
  if(!preparation)return null;
  return {...receipt,version:raw.version,createdAt:raw.createdAt,shippingAddress,items,preparation};
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

export function canConfirmShipment(shipment:NonNullable<OrderPreparation["shipment"]>):boolean {
  return !shipment.receivedAt&&shipment.customerVersion<2147483647&&(!shipment.issue||(shipment.issue.status==="closed"&&shipment.issue.resolution==="customer_follow_up_complete"));
}
