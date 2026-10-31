export type CorporateProduct = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  preparationTime: string | null;
  dimensions: string | null;
  materials: string | null;
  weight: string | null;
  color: string | null;
  technique: string | null;
  careInstructions: string | null;
  priceToman: string;
  imageIds: string[];
  availability: "in_stock" | "out_of_stock";
  coverImageId: string | null;
  createdAt: string;
};

export type CorporatePurchaseRequestItem = {
  productId: string;
  title: string;
  quantity: number;
};

export type CorporatePurchaseRequest = {
  id: string;
  status: "draft" | "submitted";
  version: number;
  createdAt: string;
  submittedAt: string | null;
  items: CorporatePurchaseRequestItem[];
  history: Array<{ version: number; action: "created" | "submitted" | "staff_message" | "buyer_message"; createdAt: string; message?: string }>;
};

export type CorporateProposal = {
  id: string; requestId: string; status: "sent" | "accepted" | "rejected" | "revision_requested"; version: number; summary: string;
  productionStartsAt: string; productionCompletesAt: string; estimatedDeliveryAt: string; packagingDetails: string; customizationDetails: string; totalToman: string; createdAt: string;
  order: { id: string; status: string } | null;
  items: Array<{ productId: string; title: string; quantity: number; artistUserId: string | null; artistName: string; unitPriceToman: string; lineTotalToman: string; packagingDetails: string; customizationDetails: string }>;
  history: Array<{ version: number; action: string; createdAt: string; actorUserId: string | null; message: string | null }>;
};

export type CorporateShippingAddress = { recipientName: string; recipientPhone: string; province: string; city: string; postalCode: string; fullAddress: string };
export type CorporateOrder = { id: string; proposalId: string; status: "awaiting_payment_setup" | "awaiting_payment" | "payment_under_review" | "paid" | "fulfilling" | "completed" | "cancelled"; version: number; totalToman: string; createdAt: string; proposalSummary: string; estimatedDeliveryAt: string; shippingAddress?: CorporateShippingAddress | null; shipmentReports?: Array<{ carrierName: string; trackingCode: string; reportedAt: string; items: Array<{ title: string; quantity: number }> }>; paymentAmountToman: string | null; paymentDueAt: string | null; paymentInstructions: string | null; paymentReportedAmountToman: string | null; paymentReference: string | null; paymentReportedAt: string | null; items: Array<{ productId: string; artistUserId: string; title: string; quantity: number; unitPriceToman: string; lineTotalToman: string }>; history: Array<{ version: number; action: string; createdAt: string; message?: string }> };

export type Paged<T> = {
  page: number;
  pageSize: number;
  hasMore: boolean;
  items: T[];
};

export function isUuid(value: unknown): value is string {
  return typeof value==="string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export const MAX_CORPORATE_LIST_PAGE=1000;
export const MAX_CORPORATE_LIST_PAGE_SIZE=50;
export const CORPORATE_LIST_PAGE_SIZE=20;
export const MAX_PURCHASE_REQUEST_LINES=100;
export const MAX_PURCHASE_REQUEST_QUANTITY=2_147_483_647;
const MAX_PURCHASE_REQUEST_VERSION=2_147_483_647;
export type PurchaseRequestProductSelectionError="invalid"|"too_many";
export type PurchaseRequestProductSelection={ids:string[];error:PurchaseRequestProductSelectionError|null};

export function normalizePurchaseRequestProductIds(values:string[]): PurchaseRequestProductSelection {
  if(values.some(value=>value.length===0||!isUuid(value))) return {ids:[],error:"invalid"};
  const ids=[...new Set(values)];
  if(ids.length>MAX_PURCHASE_REQUEST_LINES) return {ids:[],error:"too_many"};
  return {ids,error:null};
}

export function parsePurchaseRequestProductQuery(value:string|string[]|undefined): PurchaseRequestProductSelection {
  if(value===undefined) return {ids:[],error:null};
  if(Array.isArray(value)) return {ids:[],error:"invalid"};
  return normalizePurchaseRequestProductIds(value.split(","));
}

export function parseRequiredUuidQuery(value:string|string[]|undefined): string | null {
  return typeof value==="string"&&isUuid(value) ? value : null;
}

function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}
function text(value: unknown): value is string { return typeof value === "string"; }
function nullableText(value: unknown): value is string | null { return value === null || text(value); }

function canonicalIsoTimestamp(value: unknown): value is string {
  if(typeof value!=="string") return false;
  const date=new Date(value);
  return !Number.isNaN(date.getTime())&&date.toISOString()===value;
}

function uuidArray(value: unknown): value is string[] {
  return Array.isArray(value)&&value.every(isUuid)&&new Set(value.map(item=>item.toLowerCase())).size===value.length;
}
function positiveInteger(value: unknown): value is number { return Number.isInteger(value) && (value as number) > 0; }
function nonNegativeInteger(value: unknown): value is number { return Number.isInteger(value) && (value as number) >= 0; }

export function isPurchaseRequestQuantity(value: unknown): value is number {
  return positiveInteger(value) && value <= MAX_PURCHASE_REQUEST_QUANTITY;
}

function isPurchaseRequestVersion(value: unknown): value is number {
  return nonNegativeInteger(value) && value < MAX_PURCHASE_REQUEST_VERSION;
}

export function parseCorporateProduct(value: unknown): CorporateProduct | null {
  const v=record(value); if(!v) return null;
  if("artistUserId" in v||"publicationStatus" in v||"inventoryVersion" in v||"archivedAt" in v) return null;
  if(!isUuid(v.id)||!text(v.title)||!nullableText(v.description)||!nullableText(v.category)||
     (v.preparationTime!==undefined&&!nullableText(v.preparationTime))||
     !nullableText(v.dimensions)||!nullableText(v.materials)||!nullableText(v.weight)||
     !nullableText(v.color)||!nullableText(v.technique)||!nullableText(v.careInstructions)||
     !text(v.priceToman)||!/^(0|[1-9]\d*)$/.test(v.priceToman)||!uuidArray(v.imageIds)||
     (v.availability!=="in_stock"&&v.availability!=="out_of_stock")||
     !(v.coverImageId===null||isUuid(v.coverImageId))||v.coverImageId!==(v.imageIds[0]??null)||
     !canonicalIsoTimestamp(v.createdAt)) return null;
  return {...v,preparationTime:v.preparationTime??null} as CorporateProduct;
}

type PageExpectation={page:number;pageSize:number};

function validPageEnvelope(v:Record<string,unknown>,expected?:PageExpectation): v is Record<string,unknown>&{page:number;pageSize:number;hasMore:boolean;items:unknown[]} {
  if(!positiveInteger(v.page)||v.page>MAX_CORPORATE_LIST_PAGE||
     !positiveInteger(v.pageSize)||v.pageSize>MAX_CORPORATE_LIST_PAGE_SIZE||
     typeof v.hasMore!=="boolean"||!Array.isArray(v.items)||v.items.length>v.pageSize) return false;
  if(v.hasMore&&v.items.length!==v.pageSize) return false;
  if(expected&&(v.page!==expected.page||v.pageSize!==expected.pageSize)) return false;
  return true;
}

export function parseProductPage(value: unknown, expected?:PageExpectation): Paged<CorporateProduct> | null {
  const v=record(value); if(!v||!validPageEnvelope(v,expected)) return null;
  const items=v.items.map(parseCorporateProduct); if(items.some(item=>item===null)) return null;
  const parsed=items as CorporateProduct[];
  if(new Set(parsed.map(item=>item.id.toLowerCase())).size!==parsed.length) return null;
  return {page:v.page,pageSize:v.pageSize,hasMore:v.hasMore,items:parsed};
}

export function parseCorporatePurchaseRequest(value: unknown): CorporatePurchaseRequest | null {
  const v=record(value); if(!v||"buyerOrganizationId" in v||"createdByUserId" in v||!isUuid(v.id)||(v.status!=="draft"&&v.status!=="submitted")||
    !isPurchaseRequestVersion(v.version)||!canonicalIsoTimestamp(v.createdAt)||
    !(v.submittedAt===null||canonicalIsoTimestamp(v.submittedAt))||
    !Array.isArray(v.items)||v.items.length<1||v.items.length>MAX_PURCHASE_REQUEST_LINES||!Array.isArray(v.history)) return null;
  const items: CorporatePurchaseRequestItem[]=[];
  for(const raw of v.items){
    const item=record(raw); if(!item||"artistUserId" in item||!isUuid(item.productId)||!text(item.title)||!isPurchaseRequestQuantity(item.quantity)) return null;
    items.push({productId:item.productId,title:item.title,quantity:item.quantity});
  }
  if(new Set(items.map(item=>item.productId)).size!==items.length) return null;

  const history: CorporatePurchaseRequest["history"]=[];
  for(const raw of v.history){
    const event=record(raw); if(!event||!isPurchaseRequestVersion(event.version)||!(["created","submitted","staff_message","buyer_message"] as unknown[]).includes(event.action)||!canonicalIsoTimestamp(event.createdAt)) return null;
    if((event.action==="staff_message"||event.action==="buyer_message")&&(!text(event.message)||!event.message.trim()||event.message.length>4000)) return null;
    if(event.action!=="staff_message"&&event.action!=="buyer_message"&&"message" in event) return null;
    history.push({version:event.version,action:event.action as CorporatePurchaseRequest["history"][number]["action"],createdAt:event.createdAt,...(event.action==="staff_message"||event.action==="buyer_message"?{message:event.message as string}:{})});
  }

  const draftState=v.status==="draft"&&v.version===0&&v.submittedAt===null&&
    history.length===1&&history[0]?.version===0&&history[0]?.action==="created";
  const submittedState=v.status==="submitted"&&v.version>=1&&text(v.submittedAt)&&
    history.length===2&&history[0]?.version===0&&history[0]?.action==="created"&&
    history[1]?.version===1&&history[1]?.action==="submitted";
  const submittedWithMessages=v.status==="submitted"&&v.version>=1&&text(v.submittedAt)&&history.length===v.version+1&&history[0]?.version===0&&history[0]?.action==="created"&&history[1]?.version===1&&history[1]?.action==="submitted"&&history.slice(2).every((event,index)=>event.version===index+2&&(event.action==="staff_message"||event.action==="buyer_message"));
  if(!draftState&&!submittedState&&!submittedWithMessages) return null;

  return {id:v.id,status:v.status,version:v.version,createdAt:v.createdAt,submittedAt:v.submittedAt,items,history};
}

export function parseCorporateProposal(value: unknown): CorporateProposal | null {
  const v=record(value); if(!v||!isUuid(v.id)||!isUuid(v.requestId)||!(["sent","accepted","rejected","revision_requested"] as unknown[]).includes(v.status)||!isPurchaseRequestVersion(v.version)||!text(v.summary)||!canonicalIsoTimestamp(v.productionStartsAt)||!canonicalIsoTimestamp(v.productionCompletesAt)||!canonicalIsoTimestamp(v.estimatedDeliveryAt)||!text(v.packagingDetails)||!text(v.customizationDetails)||!text(v.totalToman)||!/^([1-9]\d*)$/.test(v.totalToman)||!canonicalIsoTimestamp(v.createdAt)||!Array.isArray(v.items)||v.items.length<1||!Array.isArray(v.history))return null;
  const items=v.items.map(raw=>{const item=record(raw);if(!item||!isUuid(item.productId)||!text(item.title)||!isPurchaseRequestQuantity(item.quantity)||!(item.artistUserId===undefined||isUuid(item.artistUserId))||!text(item.artistName)||!text(item.unitPriceToman)||!/^([1-9]\d*)$/.test(item.unitPriceToman)||!text(item.lineTotalToman)||!/^([1-9]\d*)$/.test(item.lineTotalToman)||!text(item.packagingDetails)||!text(item.customizationDetails))return null;const expected=BigInt(item.unitPriceToman)*BigInt(item.quantity);if(expected.toString()!==item.lineTotalToman)return null;return {productId:item.productId,title:item.title,quantity:item.quantity,artistUserId:isUuid(item.artistUserId)?item.artistUserId:null,artistName:item.artistName,unitPriceToman:item.unitPriceToman,lineTotalToman:item.lineTotalToman,packagingDetails:item.packagingDetails,customizationDetails:item.customizationDetails};});
  if(items.some(item=>item===null)||new Set(items.map(item=>item?.productId.toLowerCase())).size!==items.length)return null;
  if((items as NonNullable<typeof items[number]>[]).reduce((sum,item)=>sum+BigInt(item.lineTotalToman),0n).toString()!==v.totalToman)return null;
  const history=v.history.map(raw=>{const event=record(raw);return event&&isPurchaseRequestVersion(event.version)&&text(event.action)&&canonicalIsoTimestamp(event.createdAt)&&(event.actorUserId===undefined||isUuid(event.actorUserId))&&(event.message===null||text(event.message))?{version:event.version,action:event.action,createdAt:event.createdAt,actorUserId:isUuid(event.actorUserId)?event.actorUserId:null,message:event.message as string|null}:null;});
  if(history.some(event=>event===null)||history.length!==v.version+1||history.some((event,index)=>event?.version!==index))return null;
  const rawOrder=v.order;let order:CorporateProposal["order"]=null;if(rawOrder!==null){const parsedOrder=record(rawOrder);if(!parsedOrder||!isUuid(parsedOrder.id)||!text(parsedOrder.status))return null;order={id:parsedOrder.id,status:parsedOrder.status};}
  if((v.status==="accepted")!==!!order)return null;
  return {id:v.id,requestId:v.requestId,status:v.status as CorporateProposal["status"],version:v.version,summary:v.summary,productionStartsAt:v.productionStartsAt,productionCompletesAt:v.productionCompletesAt,estimatedDeliveryAt:v.estimatedDeliveryAt,packagingDetails:v.packagingDetails,customizationDetails:v.customizationDetails,totalToman:v.totalToman,createdAt:v.createdAt,order,items:items as CorporateProposal["items"],history:history as CorporateProposal["history"]};
}
export function parseCorporateProposalList(value: unknown): CorporateProposal[] | null {
  const v=record(value);if(!v||!Array.isArray(v.items))return null;const items=v.items.map(parseCorporateProposal);return items.some(item=>item===null)?null:items as CorporateProposal[];
}
export function parseCorporateOrder(value: unknown): CorporateOrder | null {
  const v=record(value);if(!v||!isUuid(v.id)||!isUuid(v.proposalId)||!(["awaiting_payment_setup","awaiting_payment","payment_under_review","paid","fulfilling","completed","cancelled"] as unknown[]).includes(v.status)||!isPurchaseRequestVersion(v.version)||!text(v.totalToman)||!/^([1-9]\d*)$/.test(v.totalToman)||!canonicalIsoTimestamp(v.createdAt)||!text(v.proposalSummary)||!canonicalIsoTimestamp(v.estimatedDeliveryAt)||!Array.isArray(v.items)||!Array.isArray(v.history))return null;
  const items=v.items.map(raw=>{const item=record(raw);if(!item||!isUuid(item.productId)||!isUuid(item.artistUserId)||!text(item.title)||!isPurchaseRequestQuantity(item.quantity)||!text(item.unitPriceToman)||!/^([1-9]\d*)$/.test(item.unitPriceToman)||!text(item.lineTotalToman)||BigInt(item.unitPriceToman)*BigInt(item.quantity)!==BigInt(item.lineTotalToman))return null;return {productId:item.productId,artistUserId:item.artistUserId,title:item.title,quantity:item.quantity,unitPriceToman:item.unitPriceToman,lineTotalToman:item.lineTotalToman};});
  if(items.some(item=>item===null)||new Set(items.map(item=>item?.productId.toLowerCase())).size!==items.length||(items as NonNullable<typeof items[number]>[]).reduce((sum,item)=>sum+BigInt(item.lineTotalToman),0n).toString()!==v.totalToman)return null;
  const history=v.history.map(raw=>{const event=record(raw);return event&&isPurchaseRequestVersion(event.version)&&text(event.action)&&canonicalIsoTimestamp(event.createdAt)&&(!(event.action==="payment_review_returned")||text(event.message))?{version:event.version,action:event.action,createdAt:event.createdAt,...(event.action==="payment_review_returned"?{message:event.message as string}:{})}:null;});if(history.some(event=>event===null)||history.length!==v.version+1||history.some((event,index)=>event?.version!==index))return null;
  let shippingAddress:CorporateShippingAddress|null|undefined;
  if("shippingAddress" in v){if(v.shippingAddress===null)shippingAddress=null;else{const address=record(v.shippingAddress);if(!address||!["recipientName","recipientPhone","province","city","postalCode","fullAddress"].every(key=>text(address[key])))return null;shippingAddress={recipientName:address.recipientName as string,recipientPhone:address.recipientPhone as string,province:address.province as string,city:address.city as string,postalCode:address.postalCode as string,fullAddress:address.fullAddress as string};}}
  let shipmentReports:CorporateOrder["shipmentReports"];
  if("shipmentReports" in v){if(!Array.isArray(v.shipmentReports))return null;const reports=v.shipmentReports.map(raw=>{const report=record(raw);if(!report||!text(report.carrierName)||!text(report.trackingCode)||!canonicalIsoTimestamp(report.reportedAt)||!Array.isArray(report.items))return null;const reportItems=report.items.map(row=>record(row)&&text(row.title)&&isPurchaseRequestQuantity(row.quantity)?{title:row.title,quantity:row.quantity}:null);return reportItems.some(row=>row===null)?null:{carrierName:report.carrierName,trackingCode:report.trackingCode,reportedAt:report.reportedAt,items:reportItems as Array<{title:string;quantity:number}>};});if(reports.some(report=>report===null))return null;shipmentReports=reports as NonNullable<CorporateOrder["shipmentReports"]>;}
  if(!("paymentAmountToman" in v)||!(v.paymentAmountToman===null||(text(v.paymentAmountToman)&&/^([1-9]\d*)$/.test(v.paymentAmountToman)))||!(v.paymentDueAt===null||canonicalIsoTimestamp(v.paymentDueAt))||!(v.paymentInstructions===null||text(v.paymentInstructions))||!(v.paymentReportedAmountToman===null||(text(v.paymentReportedAmountToman)&&/^([1-9]\d*)$/.test(v.paymentReportedAmountToman)))||!(v.paymentReference===null||text(v.paymentReference))||!(v.paymentReportedAt===null||canonicalIsoTimestamp(v.paymentReportedAt)))return null;
  return {id:v.id,proposalId:v.proposalId,status:v.status as CorporateOrder["status"],version:v.version,totalToman:v.totalToman,createdAt:v.createdAt,proposalSummary:v.proposalSummary,estimatedDeliveryAt:v.estimatedDeliveryAt,...("shippingAddress" in v?{shippingAddress}:{}),...(shipmentReports?{shipmentReports}:{}),paymentAmountToman:v.paymentAmountToman as string|null,paymentDueAt:v.paymentDueAt as string|null,paymentInstructions:v.paymentInstructions as string|null,paymentReportedAmountToman:v.paymentReportedAmountToman as string|null,paymentReference:v.paymentReference as string|null,paymentReportedAt:v.paymentReportedAt as string|null,items:items as CorporateOrder["items"],history:history as CorporateOrder["history"]};
}
export function parseCorporateOrderPage(value: unknown,expected?:PageExpectation):Paged<CorporateOrder>|null {
  const v=record(value);if(!v||!validPageEnvelope(v,expected))return null;const items=v.items.map(parseCorporateOrder);if(items.some(item=>item===null))return null;return {page:v.page,pageSize:v.pageSize,hasMore:v.hasMore,items:items as CorporateOrder[]};
}

export function parsePurchaseRequestPage(value: unknown, expected?:PageExpectation): Paged<CorporatePurchaseRequest> | null {
  const v=record(value); if(!v||!validPageEnvelope(v,expected)) return null;
  const items=v.items.map(parseCorporatePurchaseRequest); if(items.some(item=>item===null)) return null;
  const parsed=items as CorporatePurchaseRequest[];
  if(new Set(parsed.map(item=>item.id.toLowerCase())).size!==parsed.length) return null;
  return {page:v.page,pageSize:v.pageSize,hasMore:v.hasMore,items:parsed};
}

export function formatToman(value: string): string {
  if(!/^(0|[1-9]\d*)$/.test(value)) return "—";
  return new Intl.NumberFormat("fa-IR").format(BigInt(value))+" تومان";
}

export function formatPersianDate(value: string | null): string {
  if(!value) return "—";
  const date=new Date(value); if(Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("fa-IR",{dateStyle:"medium",timeZone:"Asia/Tehran"}).format(date);
}

export function requestTotalQuantity(request: CorporatePurchaseRequest): number {
  return request.items.reduce((sum,item)=>sum+item.quantity,0);
}

export function shortId(value: string): string {
  return value.length>12 ? value.slice(0,8)+"…"+value.slice(-4) : value;
}
