"use client";
import { Button } from "@negarin/ui";
import type { HTMLAttributes, ReactNode } from "react";
import { normalizeDigits } from "../artist/design-controls";
import { usePreview } from "../artist/preview-state";

export function MobileCounterStep({step,children,...props}:HTMLAttributes<HTMLButtonElement>&{step:number;children:ReactNode}){
  const preview=usePreview();const key=preview.screen+":counter";
  return <Button {...props} variant="unstyled" aria-label={step>0?"افزایش تعداد":"کاهش تعداد"} onClick={()=>{
    const sibling=document.querySelector<HTMLElement>('[data-counter-initial]');
    const initial=Number(normalizeDigits(sibling?.dataset.counterInitial||"0"));
    const value=Number(preview.values[key]??initial);
    preview.setValue(key,String(Math.max(0,Math.min(24,value+step))));
  }}>{children}</Button>;
}
export function MobileCounterValue({initial,...props}:HTMLAttributes<HTMLParagraphElement>&{initial:string}){
  const preview=usePreview();const value=preview.values[preview.screen+":counter"];
  return <p {...props} data-counter-initial={initial}>{value===undefined?initial:Number(value).toLocaleString("fa-IR")}</p>;
}
