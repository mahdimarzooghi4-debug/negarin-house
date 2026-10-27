"use client";
import { useRouter } from "next/navigation";
import { type HTMLAttributes, type ReactNode } from "react";
import { Button } from "@negarin/ui";
import { DesignAction, normalizeDigits } from "../artist/design-controls";
import { usePreview } from "../artist/preview-state";

export const organizationConsent="با ارسال اطلاعات، تأیید می‌کنم که مجوز ارائه اطلاعات تماس هنرمند به نگارین را دارم.";
export function OrganizationSidebar({children,...props}:HTMLAttributes<HTMLElement>){return <aside {...props} aria-label="منوی سازمان حامی">{children}</aside>;}
export function OrganizationAction({label,destination,mode,children,...props}:HTMLAttributes<HTMLElement>&{label:string;destination?:string;mode?:"referral"|"invite";children:ReactNode}){
 const preview=usePreview();const router=useRouter();
 if(!mode)return <DesignAction {...props} label={label} destination={destination}>{children}</DesignAction>;
 return <Button {...props} variant="unstyled" aria-label={label} onClick={()=>{
  if(mode==="referral"){
   const name=preview.values["new-artist-referral:نام و نام خانوادگی هنرمند"]?.trim();const phone=normalizeDigits(preview.values["new-artist-referral:شماره تماس"]||"").replace(/[\s()-]/g,"");
   if(!name||! /^(?:09\d{9}|\+?989\d{9})$/.test(phone)){preview.notify("نام هنرمند و شماره تماس معتبر را وارد کنید؛ شماره نمونه: ۰۹۱۲۳۴۵۶۷۸۹.");return;}
   if(preview.values["new-artist-referral:choice:"+organizationConsent]==="false"){preview.notify("مجوز ارائه اطلاعات تماس هنرمند را تأیید کنید.");return;}
   router.push(preview.basePath+"/referral-submitted");return;
  }
  const name=preview.values["invite-user:نام و نام خانوادگی همکار"]?.trim();const email=preview.values["invite-user:آدرس ایمیل کاری"]?.trim();
  if(!name||!email||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){preview.notify("نام همکار و آدرس ایمیل معتبر را وارد کنید.");return;}
  preview.notify("دعوت‌نامه در این پیش‌نمایش بررسی شد؛ ایمیلی ارسال نشده و دسترسی کاربری ایجاد نشده است.");
 }}>{children}</Button>;
}
