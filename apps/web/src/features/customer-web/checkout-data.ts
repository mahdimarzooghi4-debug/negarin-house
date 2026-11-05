import {isUuid} from "../corporate-buyer/live-data";
import type {CustomerCart} from "./cart-data";
import type {AddressBook} from "./address-data";

export type CheckoutCommand={cartVersion:number;addressBookVersion:number;addressId:string;idempotencyKey:string;expectedSubtotalToman:string};
export type OrderReceipt={id:string;status:"reserved"|"cancelled"|"expired"|"placed";paymentStatus:"unpaid"|"paid"|"reconciliation_required";subtotalToman:string;reservedUntil:string};

export function checkoutCommand(cart:CustomerCart,book:AddressBook,addressId:string,idempotencyKey:string):CheckoutCommand {
  if(!cart.canCheckout||!cart.subtotalToman||!/^[1-9]\d{0,22}$/.test(cart.subtotalToman))throw new Error("سبد خرید برای ثبت سفارش آماده نیست.");
  if(!isUuid(idempotencyKey)||!book.addresses.some(address=>address.id===addressId))throw new Error("آدرس تحویل را دوباره انتخاب کنید.");
  return {cartVersion:cart.version,addressBookVersion:book.version,addressId,idempotencyKey,expectedSubtotalToman:cart.subtotalToman};
}
export function parseOrderReceipt(value:unknown,expectedSubtotal:string):OrderReceipt|null {
  if(!value||typeof value!=="object"||Array.isArray(value))return null;
  const order=value as Record<string,unknown>;
  if(!isUuid(order.id)||!["reserved","cancelled","expired","placed"].includes(String(order.status))||!["unpaid","paid","reconciliation_required"].includes(String(order.paymentStatus))||order.subtotalToman!==expectedSubtotal||typeof order.reservedUntil!=="string")return null;
  const date=new Date(order.reservedUntil);
  if(!Number.isFinite(date.getTime())||date.toISOString()!==order.reservedUntil)return null;
  return {id:order.id,status:order.status as OrderReceipt["status"],paymentStatus:order.paymentStatus as OrderReceipt["paymentStatus"],subtotalToman:expectedSubtotal,reservedUntil:order.reservedUntil};
}
