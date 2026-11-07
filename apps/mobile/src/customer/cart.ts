import {isUuid} from "./commerce-types";
import {apiJson} from "../api/client";

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


export async function readCart(token: string, signal?: AbortSignal): Promise<CustomerCart> {
  const cart = parseCustomerCart(await apiJson("/api/v1/customer/cart", token, { signal }));
  if (!cart) throw new Error("اطلاعات سبد خرید معتبر نیست.");
  return cart;
}
export async function changeCart(token: string, cart: CustomerCart, productId: string, quantity?: number): Promise<CustomerCart> {
  if (!isUuid(productId) || (quantity !== undefined && (!Number.isInteger(quantity) || quantity < 1 || quantity > 100))) throw new Error("تعداد اثر معتبر نیست.");
  const previous = cart.items.find(item => item.productId === productId);
  const changed = quantity === undefined ? !!previous : previous?.quantity !== quantity;
  const response = parseCustomerCart(await apiJson("/api/v1/customer/cart/items/" + productId, token, {
    method: quantity === undefined ? "DELETE" : "PUT",
    body: JSON.stringify({ version: cart.version, ...(quantity === undefined ? {} : { quantity }) })
  }));
  if (!response || response.version !== cart.version + (changed ? 1 : 0)) throw new Error("نتیجه تغییر سبد نیاز به تازه‌سازی دارد.");
  const fresh = await readCart(token);
  const item = fresh.items.find(item => item.productId === productId);
  if (fresh.version !== response.version || (quantity === undefined ? !!item : item?.quantity !== quantity)) throw new Error("سبد تغییر کرده است؛ تازه‌سازی کنید.");
  return fresh;
}
