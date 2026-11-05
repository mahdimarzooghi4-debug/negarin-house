import {isUuid} from "../corporate-buyer/live-data";
export type AddressFields={recipientName:string;recipientPhone:string;province:string;city:string;postalCode:string;fullAddress:string};
export type CustomerAddress=AddressFields&{id:string;isDefault:boolean};
export type AddressBook={version:number;addresses:CustomerAddress[]};
export const emptyAddress:AddressFields={recipientName:"",recipientPhone:"",province:"",city:"",postalCode:"",fullAddress:""};
export function parseAddressBook(value:unknown):AddressBook|null{
  if(!value||typeof value!=="object"||Array.isArray(value))return null;
  const book=value as Record<string,unknown>;
  if(typeof book.version!=="number"||!Number.isInteger(book.version)||book.version<0||book.version>=2147483647||!Array.isArray(book.addresses)||book.addresses.length>20)return null;
  const addresses:CustomerAddress[]=[];
  for(const raw of book.addresses){
    if(!raw||typeof raw!=="object"||Array.isArray(raw))return null;
    const address=raw as Record<string,unknown>;
    if(!isUuid(address.id)||typeof address.isDefault!=="boolean"||Object.keys(emptyAddress).some(key=>typeof address[key]!=="string"||!String(address[key]).trim())||!/^\+989\d{9}$/.test(String(address.recipientPhone))||!/^\d{10}$/.test(String(address.postalCode)))return null;
    if(addresses.some(existing=>existing.id.toLowerCase()===String(address.id).toLowerCase()))return null;
    addresses.push({id:address.id,isDefault:address.isDefault,recipientName:address.recipientName as string,recipientPhone:address.recipientPhone as string,province:address.province as string,city:address.city as string,postalCode:address.postalCode as string,fullAddress:address.fullAddress as string});
  }
  if(addresses.filter(address=>address.isDefault).length!==(addresses.length?1:0))return null;
  return {version:book.version,addresses};
}
export async function requestAddressBook(path="/api/customer/addresses",init:RequestInit={}):Promise<AddressBook>{
  const response=await fetch(path,{...init,cache:"no-store"});
  if(!response.ok){
    const messages:Record<number,string>={400:"نام، نشانی، شماره همراه و کدپستی را بررسی کنید.",401:"برای مدیریت آدرس‌ها وارد حساب شوید.",403:"نقش مشتری را در حساب خود انتخاب کنید.",404:"این آدرس دیگر در دسترس نیست.",409:"فهرست آدرس‌ها تغییر کرده یا ظرفیت آن تکمیل است. اطلاعات را تازه کنید."};
    throw new Error(messages[response.status]??"دریافت یا ذخیرهٔ آدرس انجام نشد.");
  }
  const result=parseAddressBook(await response.json());
  if(!result)throw new Error("اطلاعات آدرس‌ها قابل نمایش نیست.");
  return result;
}
