"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@negarin/ui";
import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode, type ChangeEvent } from "react";
import { usePreview } from "./preview-state";

export function normalizeDigits(value:string){return value.replace(/[۰-۹]/g,d=>String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[٠-٩]/g,d=>String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));}

type ActionProps=HTMLAttributes<HTMLElement>&{label:string;destination?:string;back?:boolean;children:ReactNode};
export function DesignAction({label,destination,back,children,...props}:ActionProps){
 const router=useRouter();const preview=usePreview();
 const disabled=String((props as Record<string,unknown>)["data-name"]||"").includes("Disabled");
 const phoneSubmit=preview.screen==="login-and-register"&&destination==="otp-verification";
 const customer=preview.basePath==="/preview/customer-mobile";
 const otpSubmit=preview.screen.startsWith("otp-")&&(destination==="verification-success"||(customer&&destination==="checkout-shipping-info"));
 const needsValidation=phoneSubmit||otpSubmit;
 function run(){
  if(back){router.push(preview.basePath);return;}
  if(/ذخیره/.test(label))preview.notify("تغییرات در همین پیش‌نمایش نگه داشته شد؛ داده‌ای به سرور ارسال نشده است.");
  else preview.notify("این کنترل در پیش‌نمایش رابط کاربری است؛ عملیات واقعی پس از اتصال بک‌اند فعال می‌شود.");
 }
 if(preview.screen==="multiple-roles"&&destination==="dashboard"){return <Button {...props} variant="unstyled" aria-label={label} onClick={()=>{const role=preview.values["multiple-roles:choice:roles-list"];if(role&&!role.includes("هنرمند")){preview.notify("پیش‌نمایش این بخش فعلاً برای نقش هنرمند آماده شده است.");return;}router.push(preview.basePath+"/dashboard");}}>{children}</Button>;}
 if(destination&&!needsValidation&&!disabled)return <Link {...props} href={preview.basePath+"/"+destination} aria-label={label}>{children}</Link>;
 return <Button {...props} variant="unstyled" disabled={disabled} aria-disabled={disabled||undefined} aria-label={label} onClick={()=>{
  if(phoneSubmit){const phone=Object.values(preview.values).find(v=>/^09\d{9}$/.test(normalizeDigits(v)));if(!phone){preview.notify("شماره همراه معتبر با ۱۱ رقم و شروع ۰۹ وارد کنید.");return;}router.push(preview.basePath+"/"+destination);return;}
  if(otpSubmit){const code=Array.from({length:6},(_,i)=>preview.values[preview.screen+":رقم "+(i+1)+" کد تأیید"]||"").join("");if(!/^\d{6}$/.test(normalizeDigits(code))){preview.notify("کد تأیید شش‌رقمی را کامل وارد کنید. کد نمونه برای پیش‌نمایش: ۱۲۳۴۵۶");return;}if(customer&&normalizeDigits(code)!=="123456"){preview.notify("کد نمونه نادرست است. برای پیش‌نمایش ۱۲۳۴۵۶ را وارد کنید.");return;}router.push(preview.basePath+"/"+(normalizeDigits(code)==="123456"?destination:"otp-invalid"));return;}
  run();
 }}>{children}</Button>;
}

type FieldProps=HTMLAttributes<HTMLDivElement>&{label:string;placeholder:string;otp?:boolean;children:ReactNode};
export function DesignField({label,placeholder,otp,children,...props}:FieldProps){
 const preview=usePreview();const [focused,setFocused]=useState(false);
 const key=preview.screen+":"+label;const value=preview.values[key]||"";
 const multi=/توضیحات|شرح|داستان|پیام|یادداشت/.test(label);const phone=/شماره تلفن|شماره موبایل|موبایل گیرنده/.test(label);
 const shared={className:"design-field-input",'aria-label':label,placeholder:focused&&!otp?placeholder:"",value,dir:"auto" as const,onFocus:()=>setFocused(true),onBlur:()=>setFocused(false),onChange:(e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
  const next=otp?normalizeDigits(e.target.value).replace(/\D/g,"").slice(-1):e.target.value;preview.setValue(key,next);
  if(otp&&next){const container=e.target.closest('[data-name="otp-boxes"],[data-name="Input / Mobile"]');const fields=container?.querySelectorAll<HTMLInputElement>('input');if(fields){const index=Array.from(fields).indexOf(e.target as HTMLInputElement);fields[index+1]?.focus();}}
 }};
 return <div {...props} className={props.className+" design-field"} data-editing={focused||!!value} data-otp={otp||undefined} data-phone={phone||undefined}>
  <div className="design-field-artwork">{children}</div>
  {multi?<textarea {...shared}/>:<input {...shared} inputMode={phone?"tel":otp||/قیمت|موجودی|وزن|تعداد/.test(label)?"numeric":"text"} maxLength={otp?1:undefined} autoComplete={phone?"tel":otp?"one-time-code":"off"} />}
 </div>;
}

export function DesignUpload({label,media=false,preserveLayout=false,children,...props}:HTMLAttributes<HTMLDivElement>&{label:string;media?:boolean;preserveLayout?:boolean;children:ReactNode}){
 const preview=usePreview();const [filename,setFilename]=useState("");const imagesOnly=label.startsWith("Image");const types=media?["image/jpeg","image/png","image/webp","video/mp4","video/webm"]:imagesOnly?["image/jpeg","image/png","image/webp"]:["image/jpeg","image/png","image/webp","application/pdf"];
 return <div {...props}><div style={preserveLayout?{display:"contents"}:undefined}>{children}</div><input className="design-file-input" type="file" accept={types.join(",")} aria-label={label} onChange={e=>{
  const file=e.target.files?.[0];if(!file)return;
  if(file.size>20*1024*1024||!types.includes(file.type)){preview.notify((media?"عکس یا ویدیو MP4/WebM":imagesOnly?"عکس JPG، PNG یا WebP":"عکس یا فایل PDF")+" با حجم حداکثر ۲۰ مگابایت انتخاب کنید.");e.target.value="";return;}
  setFilename(file.name);preview.notify("فایل «"+file.name+"» برای پیش‌نمایش انتخاب شد؛ هنوز بارگذاری سرور انجام نشده است.");
 }}/>{filename&&<span className="design-upload-name">{filename}</span>}</div>;
}
export function DesignChoice({label,group,initial=false,multiple=false,children,...props}:HTMLAttributes<HTMLElement>&{label:string;group:string;initial?:boolean;multiple?:boolean;children:ReactNode}){
 const preview=usePreview();const key=preview.screen+":choice:"+(multiple?label:group);const stored=preview.values[key];const selected=stored===undefined?initial:multiple?stored==="true":stored===label;
 return <Button {...props} variant="unstyled" className={props.className+" design-choice"} aria-label={label} aria-pressed={selected} data-changed={stored!==undefined} data-selected={selected} onClick={()=>preview.setValue(key,multiple?(selected?"false":"true"):label)}>{children}</Button>;
}

export function DesignDialog({label,closeDestination,children,...props}:HTMLAttributes<HTMLDivElement>&{label:string;closeDestination?:string;children:ReactNode}){
 const ref=useRef<HTMLDivElement>(null);const router=useRouter();const preview=usePreview();
 useEffect(()=>{if(new URLSearchParams(window.location.search).get('canvas')!=="1")ref.current?.querySelector<HTMLElement>('a,button,input,textarea')?.focus();},[]);
 function close(){const link=ref.current?.querySelector<HTMLAnchorElement>('a[data-name*="Close"],a[data-name*="Cancel"]');router.push(closeDestination?preview.basePath+"/"+closeDestination:link?.getAttribute('href')||preview.basePath);}
 return <div {...props} ref={ref} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} onKeyDown={e=>{
  if(e.key==="Escape"){e.preventDefault();close();}
  if(e.key==="Tab"){const nodes=Array.from(ref.current?.querySelectorAll<HTMLElement>('a,button:not(:disabled),input,textarea,[tabindex="0"]')||[]);const first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}
 }}>{children}<span hidden>{preview.screen}</span></div>;
}
