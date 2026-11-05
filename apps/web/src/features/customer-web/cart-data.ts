import {isUuid} from "../corporate-buyer/live-data";

export type CartItem={productId:string;quantity:number;status:"available"|"out_of_stock"|"insufficient_stock"|"unavailable";product:{id:string;title:string;priceToman:string;coverImageId:string|null}|null;lineSubtotalToman:string|null};
export type CustomerCart={version:number;items:CartItem[];subtotalToman:string|null;canCheckout:boolean};
const record=(value:unknown):Record<string,unknown>|null=>value!==null&&typeof value==="object"&&!Array.isArray(value)?value as Record<string,unknown>:null;
const amount=(value:unknown):value is string=>typeof value==="string"&&/^(0|[1-9]\d{0,24})$/.test(value);

export function parseCustomerCart(value:unknown):CustomerCart|null {
  const cart=record(value);
  if(!cart||typeof cart.version!=="number"||!Number.isInteger(cart.version)||cart.version<0||cart.version>=2147483647||!Array.isArray(cart.items)||cart.items.length>50||typeof cart.canCheckout!=="boolean")return null;
  const items:CartItem[]=[];
  let total=0n;
  let missing=false;
  for(const raw of cart.items){
    const item=record(raw);
    if(!item||!isUuid(item.productId)||typeof item.quantity!=="number"||!Number.isInteger(item.quantity)||item.quantity<1||item.quantity>100)return null;
    if(items.some(existing=>existing.productId.toLowerCase()===String(item.productId).toLowerCase()))return null;
    if(item.status==="unavailable"){
      if(item.product!==null||item.lineSubtotalToman!==null)return null;
      missing=true;
      items.push({productId:item.productId,quantity:item.quantity,status:"unavailable",product:null,lineSubtotalToman:null});
      continue;
    }
    const product=record(item.product);
    if(!["available","out_of_stock","insufficient_stock"].includes(String(item.status))||!product||product.id!==item.productId||typeof product.title!=="string"||!amount(product.priceToman)||BigInt(product.priceToman)>9223372036854775807n||(product.coverImageId!==null&&!isUuid(product.coverImageId))||!amount(item.lineSubtotalToman))return null;
    const subtotal=BigInt(product.priceToman)*BigInt(item.quantity);
    if(subtotal.toString()!==item.lineSubtotalToman)return null;
    total+=subtotal;
    items.push({productId:item.productId,quantity:item.quantity,status:item.status as CartItem["status"],product:{id:item.productId,title:product.title,priceToman:product.priceToman,coverImageId:product.coverImageId as string|null},lineSubtotalToman:item.lineSubtotalToman});
  }
  if(cart.subtotalToman!==(missing?null:total.toString())||cart.canCheckout!==(items.length>0&&items.every(item=>item.status==="available")))return null;
  return {version:cart.version,items,subtotalToman:cart.subtotalToman as string|null,canCheckout:cart.canCheckout};
}

export class CartRequestError extends Error {
  constructor(public readonly status:number,message:string){super(message);}
}
export async function requestCart(path="/api/customer/cart",init:RequestInit={}):Promise<CustomerCart>{
  const response=await fetch(path,{...init,cache:"no-store"});
  if(!response.ok){
    const messages:Record<number,string>={401:"برای استفاده از سبد خرید وارد حساب شوید.",403:"نقش مشتری را در حساب خود انتخاب کنید.",404:"این اثر دیگر در دسترس نیست.",409:"سبد یا موجودی اثر تغییر کرده است. اطلاعات را تازه کنید و دوباره اقدام کنید."};
    throw new CartRequestError(response.status,messages[response.status]??"دریافت یا تغییر سبد خرید انجام نشد.");
  }
  const cart=parseCustomerCart(await response.json());
  if(!cart)throw new Error("اطلاعات سبد خرید قابل نمایش نیست.");
  return cart;
}
