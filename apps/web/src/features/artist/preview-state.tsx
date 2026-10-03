"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

export const PreviewContext = createContext({
  screen: "", notify: (_message: string) => {},
  values: {} as Record<string,string>, setValue: (_key: string, _value: string) => {}
});
export function PreviewState({children}:{children:ReactNode}) {
  const router=useRouter();
  const screen=usePathname().split("/").pop()||"";
  const [message,setMessage]=useState("");
  const [values,setValues]=useState<Record<string,string>>({});
  const [ready,setReady]=useState(false);
  useEffect(()=>{setReady(true);setMessage("");},[screen]);
  useEffect(()=>{if(screen!=="verification-success"||new URLSearchParams(window.location.search).get("canvas")==="1")return;const timer=window.setTimeout(()=>router.push("/preview/artist/dashboard"),2500);return ()=>window.clearTimeout(timer);},[screen,router]);
  return <PreviewContext.Provider value={{screen,notify:setMessage,values,setValue:(key,value)=>setValues(previous=>({...previous,[key]:value}))}}>
    <span hidden data-preview-ready={ready} data-preview-screen={screen}/>
    {children}
    {message && <div className="preview-toast" role="status">{message}<button type="button" aria-label="بستن پیام" onClick={()=>setMessage("")} style={{marginRight:16,color:"white",background:"transparent",border:0,cursor:"pointer"}}>×</button></div>}
  </PreviewContext.Provider>;
}
export const usePreview = () => useContext(PreviewContext);
