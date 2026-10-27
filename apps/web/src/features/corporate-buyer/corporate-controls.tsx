"use client";
import {useState,type ComponentProps,type HTMLAttributes} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@negarin/ui";
import {DesignAction,normalizeDigits} from "../artist/design-controls";
import {usePreview} from "../artist/preview-state";

export function CorporateSidebar({children,...props}:HTMLAttributes<HTMLElement>){return <aside {...props} aria-label="منوی خریدار سازمانی">{children}</aside>;}
export function CorporateAction(props:ComponentProps<typeof DesignAction>){
 const preview=usePreview();const router=useRouter();
 const submit=preview.screen==="new-purchase-request"&&props.label==="ثبت درخواست";
 const issue=preview.screen==="report-issue"&&props.label==="ارسال گزارش";
 if(!submit&&!issue)return <DesignAction {...props}/>;
 const {children,label,destination,...rest}=props;
 return <Button {...rest} variant="unstyled" aria-label={label} onClick={()=>{
  const value=(key:string)=>(preview.values[preview.screen+":"+key]||"").trim();
  if(submit&&(!value("عنوان درخواست")||!value("شرح نیاز")||!/^\d+$/.test(normalizeDigits(value("تعداد تقریبی")))||Number(normalizeDigits(value("تعداد تقریبی")))<1)){preview.notify("عنوان، شرح نیاز و تعداد تقریبی مثبت را وارد کنید.");return;}
  if(issue&&(!value("شرح مشکل")||!/^0\d{9,10}$/.test(normalizeDigits(value("شماره تماس جهت پیگیری")).replace(/[\s-]/g,"")))){preview.notify("شرح مشکل و شماره تماس معتبر را وارد کنید.");return;}
  if(destination)router.push(preview.basePath+"/"+destination);
 }}>{children}</Button>;
}

export function CorporateUpload({children,...props}:HTMLAttributes<HTMLDivElement>){
 const preview=usePreview();const [filename,setFilename]=useState("");
 return <div {...props} style={{...props.style,position:"relative"}}><div style={{display:"contents"}}>{children}</div><input className="design-file-input" type="file" accept="image/jpeg,image/png" aria-label="تصاویر مشکل" onChange={e=>{
  const file=e.target.files?.[0];if(!file)return;
  if(file.size>5*1024*1024||!["image/jpeg","image/png"].includes(file.type)){preview.notify("تصویر JPG یا PNG با حجم حداکثر ۵ مگابایت انتخاب کنید.");e.target.value="";return;}
  setFilename(file.name);preview.notify("تصویر «"+file.name+"» در پیش‌نمایش انتخاب شد؛ هنوز به سرور ارسال نشده است.");
 }}/>{filename&&<span className="design-upload-name">{filename}</span>}</div>;
}
