"use client";
import {useEffect,useState} from "react";
export function StoryImage({id,imageId,own=false}:{id:string;imageId:string;own?:boolean}){
 const [url,setUrl]=useState<string|null>(null),[failed,setFailed]=useState(false),[retry,setRetry]=useState(0);
 useEffect(()=>{const controller=new AbortController();setUrl(null);setFailed(false);void fetch(`/api/${own?"artist":"catalog"}/stories/${id}/images/${imageId}`,{signal:controller.signal,cache:"no-store"}).then(async response=>{if(!response.ok)throw Error();const data=await response.json();const parsed=new URL(data.url);if(!["http:","https:"].includes(parsed.protocol)||data.id!==imageId||data.contentType!=="image/webp")throw Error();if(!controller.signal.aborted)setUrl(parsed.href);}).catch(()=>{if(!controller.signal.aborted)setFailed(true);});return()=>controller.abort();},[id,imageId,own,retry]);
 return failed?<div><p>عکس روایت دریافت نشد.</p><button onClick={()=>setRetry(n=>n+1)}>دریافت دوباره عکس</button></div>:url?<img src={url} alt="عکس روایت" referrerPolicy="no-referrer" style={{maxWidth:"100%",maxHeight:480,objectFit:"contain"}} onError={()=>setFailed(true)}/>:<p role="status">در حال دریافت عکس…</p>;
}
