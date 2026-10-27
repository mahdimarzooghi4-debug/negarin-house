"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type HTMLAttributes, type ReactNode } from "react";
import { PreviewContext, usePreview } from "../artist/preview-state";

import { exportLanguages } from "./languages";
function localeFor(screen:string){return exportLanguages.find(l=>screen.startsWith(l.code.toLowerCase()+"-"))||exportLanguages[0];}
export function ExportPreviewState({children}:{children:ReactNode}){
 const screen=usePathname().split("/").pop()||"";
 const locale=localeFor(screen);const [values,setValues]=useState<Record<string,string>>({});const [message,setMessage]=useState("");const [ready,setReady]=useState(false);
 useEffect(()=>{setReady(true);setMessage("");},[screen]);
 return <PreviewContext.Provider value={{basePath:"/preview/export-partner",screen,notify:setMessage,values,setValue:(key,value)=>setValues(previous=>({...previous,[key]:value}))}}>
  <span hidden data-preview-ready={ready} data-preview-screen={screen}/>{children}
  {message&&<div className="preview-toast export-toast" role="status" lang={locale.code} dir={locale.code==="ar"?"rtl":"ltr"}>{message}<button type="button" aria-label={locale.close} onClick={()=>setMessage("")}>×</button></div>}
 </PreviewContext.Provider>;
}
export function ExportSidebar({children,...props}:HTMLAttributes<HTMLElement>){
 const locale=localeFor(usePreview().screen);return <aside {...props} aria-label={locale.menu}>{children}</aside>;
}
export function ExportAction({label,destination,children,...props}:HTMLAttributes<HTMLElement>&{label:string;destination?:string;children:ReactNode}){
 const preview=usePreview();const locale=localeFor(preview.screen);
 if(destination)return <Link {...props} href={preview.basePath+"/"+locale.code.toLowerCase()+"-"+destination} aria-label={label}>{children}</Link>;
 return <button {...props} type="button" aria-label={label} onClick={()=>preview.notify(/save|guardar|sauvegarder|enregistrer|حفظ|kaydet|сохран|保存/i.test(label+" "+String((props as Record<string,unknown>)["data-name"]||""))?locale.saved:locale.sample)}>{children}</button>;
}
export function ExportField({label,placeholder,multi=false,numeric=false,search=false,children,...props}:HTMLAttributes<HTMLDivElement>&{label:string;placeholder:string;multi?:boolean;numeric?:boolean;search?:boolean;children:ReactNode}){
 const preview=usePreview();const router=useRouter();const locale=localeFor(preview.screen);const [focused,setFocused]=useState(false);
 const key=preview.screen+":"+String((props as Record<string,unknown>)["data-node-id"]||label);const value=preview.values[key]||"";
 const shared={className:"design-field-input",'aria-label':search?locale.search:label,value,placeholder:focused?placeholder:"",dir:"auto" as const,onFocus:()=>setFocused(true),onBlur:()=>setFocused(false),onChange:(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>preview.setValue(key,numeric?e.target.value.replace(/[^0-9.]/g,""):e.target.value),onKeyDown:(e:React.KeyboardEvent)=>{if(search&&e.key==="Enter"){e.preventDefault();router.push(preview.basePath+"/"+locale.code.toLowerCase()+"-export-products");}}};
 return <div {...props} className={props.className+" design-field"} data-editing={focused||!!value}><div className="design-field-artwork">{children}</div>{multi?<textarea {...shared}/>:<input {...shared} inputMode={numeric?"decimal":"text"} autoComplete="off"/>}</div>;
}
export function ExportChoice({label,group,initial=false,multiple=false,children,...props}:HTMLAttributes<HTMLElement>&{label:string;group:string;initial?:boolean;multiple?:boolean;children:ReactNode}){
 const preview=usePreview();const key=preview.screen+":choice:"+(multiple?group+":"+label:group);const stored=preview.values[key];const selected=stored===undefined?initial:multiple?stored==="true":stored===label;
 return <button {...props} type="button" className={props.className+" design-choice"} aria-label={label} aria-pressed={selected} data-selected={selected} data-changed={stored!==undefined} onClick={()=>preview.setValue(key,multiple?String(!selected):label)}>{children}</button>;
}
export function ExportLanguagePicker({children,...props}:HTMLAttributes<HTMLDivElement>){
 const preview=usePreview();const router=useRouter();const locale=localeFor(preview.screen);const kind=preview.screen.slice(locale.code.length+1);
 return <div {...props} className={props.className+" export-language-picker"}>{children}<select aria-label={locale.language} value={locale.code} onChange={e=>router.push(preview.basePath+"/"+e.target.value.toLowerCase()+"-"+kind)}>{exportLanguages.map(l=><option key={l.code} value={l.code}>{l.label}</option>)}</select></div>;
}
