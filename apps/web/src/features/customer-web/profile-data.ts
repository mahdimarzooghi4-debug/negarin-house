export type CustomerProfile={version:number;displayName:string;phone:string};
export function parseCustomerProfile(value:unknown):CustomerProfile|null{
 if(!value||typeof value!=="object"||Array.isArray(value))return null;
 const p=value as Record<string,unknown>;
 if(!Number.isInteger(p.version)||(p.version as number)<0||(p.version as number)>2147483647||typeof p.displayName!=="string"||p.displayName.length>100||p.displayName!==p.displayName.trim()||/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u.test(p.displayName)||typeof p.phone!=="string"||!/^\+[1-9]\d{7,14}$/.test(p.phone))return null;
 return {version:p.version as number,displayName:p.displayName,phone:p.phone};
}
export async function requestProfile(init:RequestInit={}):Promise<CustomerProfile>{
 const response=await fetch("/api/customer/profile",{...init,cache:"no-store"});
 if(!response.ok){
  const messages:Record<number,string>={400:"نام را با حداکثر ۱۰۰ نویسه وارد کنید.",401:"برای مشاهدهٔ مشخصات وارد شوید.",403:"نقش مشتری را انتخاب کنید.",409:"اطلاعات حساب تغییر کرده است. تازه‌سازی کنید."};
  throw new Error(messages[response.status]??"دریافت یا ذخیرهٔ مشخصات انجام نشد.");
 }
 const profile=parseCustomerProfile(await response.json());if(!profile)throw new Error("اطلاعات حساب قابل نمایش نیست.");return profile;
}
