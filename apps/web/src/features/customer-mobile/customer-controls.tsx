"use client";
import { useRouter } from "next/navigation";
import { type HTMLAttributes, type ReactNode } from "react";
import { usePreview } from "../artist/preview-state";
import { Button } from "@negarin/ui";
import { DesignField } from "../artist/design-controls";

// Native linked story/product cards also contain independent save/like controls.
export function CustomerCardLink({destination,label,children,...props}:HTMLAttributes<HTMLDivElement>&{destination?:string;label:string;children:ReactNode}){
 const router=useRouter();const preview=usePreview();
 const navigate=()=>{if(destination)router.push(preview.basePath+"/"+destination);};
 return <div {...props} role="link" tabIndex={0} aria-label={label} onClick={event=>{
  if((event.target as HTMLElement).closest('button,a,input,textarea'))return;
  navigate();
 }} onKeyDown={event=>{if(event.target===event.currentTarget&&event.key==="Enter"){event.preventDefault();navigate();}}}>{children}</div>;
}

export function CustomerSearchField(props:React.ComponentProps<typeof DesignField>){
 const router=useRouter();const preview=usePreview();
 return <DesignField {...props} onKeyDown={event=>{if(event.key==="Enter"){event.preventDefault();router.push(preview.basePath+"/search-results");}}}/>;
}

export function CustomerQuantityStep({step,children,...props}:HTMLAttributes<HTMLElement>&{step:number;children:ReactNode}){
 const preview=usePreview();const quantity=Number(preview.values["customer:quantity"]||"1");
 return <Button {...props} variant="unstyled" aria-label={step>0?"افزایش تعداد":"کاهش تعداد"} disabled={step<0&&quantity===1} onClick={()=>preview.setValue("customer:quantity",String(Math.max(1,Math.min(99,quantity+step))))}>{children}</Button>;
}
export function CustomerQuantityValue({children,...props}:HTMLAttributes<HTMLDivElement>&{children:ReactNode}){
 const preview=usePreview();const value=preview.values["customer:quantity"];
 return <div {...props} aria-live="polite">{value?<p style={{fontFamily:'"Vazirmatn Variable"',lineHeight:"normal"}}>{Number(value).toLocaleString("fa-IR")}</p>:children}</div>;
}
export function CustomerClearFilters({children,...props}:HTMLAttributes<HTMLElement>&{children:ReactNode}){
 const preview=usePreview();
 return <Button {...props} variant="unstyled" aria-label="پاک کردن فیلترها" onClick={()=>{for(const key of Object.keys(preview.values)){if(key.startsWith("filters-and-sort:"))preview.setValue(key,"");}preview.notify("فیلترهای نمونه پاک شدند.");}}>{children}</Button>;
}
