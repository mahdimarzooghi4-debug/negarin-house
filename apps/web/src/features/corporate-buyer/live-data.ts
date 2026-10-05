export type CorporateProduct = {
  id: string;
  title: string;
  description: string;
  category: string;
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
  history: Array<{ version: number; action: "created" | "submitted"; createdAt: string }>;
};

export type Paged<T> = {
  page: number;
  pageSize: number;
  hasMore: boolean;
  items: T[];
};

export function isUuid(value: unknown): value is string {
  return typeof value==="string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

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
  if(!isUuid(v.id)||!text(v.title)||!text(v.description)||!text(v.category)||
     !nullableText(v.dimensions)||!nullableText(v.materials)||!nullableText(v.weight)||
     !nullableText(v.color)||!nullableText(v.technique)||!nullableText(v.careInstructions)||
     !text(v.priceToman)||!/^(0|[1-9]\d*)$/.test(v.priceToman)||!uuidArray(v.imageIds)||
     (v.availability!=="in_stock"&&v.availability!=="out_of_stock")||
     !(v.coverImageId===null||isUuid(v.coverImageId))||v.coverImageId!==(v.imageIds[0]??null)||
     !canonicalIsoTimestamp(v.createdAt)) return null;
  return v as CorporateProduct;
}

export function parseProductPage(value: unknown): Paged<CorporateProduct> | null {
  const v=record(value); if(!v||!positiveInteger(v.page)||!positiveInteger(v.pageSize)||typeof v.hasMore!=="boolean"||!Array.isArray(v.items)) return null;
  const items=v.items.map(parseCorporateProduct); if(items.some(item=>item===null)) return null;
  return {page:v.page,pageSize:v.pageSize,hasMore:v.hasMore,items:items as CorporateProduct[]};
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
    const event=record(raw); if(!event||!isPurchaseRequestVersion(event.version)||(event.action!=="created"&&event.action!=="submitted")||!canonicalIsoTimestamp(event.createdAt)) return null;
    history.push({version:event.version,action:event.action,createdAt:event.createdAt});
  }

  const draftState=v.status==="draft"&&v.version===0&&v.submittedAt===null&&
    history.length===1&&history[0]?.version===0&&history[0]?.action==="created";
  const submittedState=v.status==="submitted"&&v.version===1&&text(v.submittedAt)&&
    history.length===2&&history[0]?.version===0&&history[0]?.action==="created"&&
    history[1]?.version===1&&history[1]?.action==="submitted";
  if(!draftState&&!submittedState) return null;

  return {id:v.id,status:v.status,version:v.version,createdAt:v.createdAt,submittedAt:v.submittedAt,items,history};
}

export function parsePurchaseRequestPage(value: unknown): Paged<CorporatePurchaseRequest> | null {
  const v=record(value); if(!v||!positiveInteger(v.page)||!positiveInteger(v.pageSize)||typeof v.hasMore!=="boolean"||!Array.isArray(v.items)) return null;
  const items=v.items.map(parseCorporatePurchaseRequest); if(items.some(item=>item===null)) return null;
  return {page:v.page,pageSize:v.pageSize,hasMore:v.hasMore,items:items as CorporatePurchaseRequest[]};
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
