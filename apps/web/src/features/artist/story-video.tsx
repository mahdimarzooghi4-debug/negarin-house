"use client";
import {useEffect,useState} from "react";
export function StoryVideo({id,videoId,own=false}:{id:string;videoId:string;own?:boolean}){
 const [url,setUrl]=useState<string|null>(null),[failed,setFailed]=useState(false),[retry,setRetry]=useState(0);
 useEffect(()=>{const controller=new AbortController();setUrl(null);setFailed(false);void fetch(`/api/${own?"artist":"catalog"}/stories/${id}/videos/${videoId}`,{signal:controller.signal,cache:"no-store"}).then(async response=>{if(!response.ok)throw Error();const data=await response.json();const parsed=new URL(data.url);if(!["http:","https:"].includes(parsed.protocol)||data.id!==videoId||data.contentType!=="video/mp4")throw Error();if(!controller.signal.aborted)setUrl(parsed.href);}).catch(()=>{if(!controller.signal.aborted)setFailed(true);});return()=>controller.abort();},[id,videoId,own,retry]);
 return failed?<div><p>ویدئو روایت دریافت نشد.</p><button onClick={()=>setRetry(n=>n+1)}>دریافت دوباره ویدئو</button></div>:url?<video src={url} aria-label="ویدئوی روایت" controls playsInline preload="metadata" style={{maxWidth:"100%",maxHeight:480,objectFit:"contain"}} onError={()=>setFailed(true)}/>:<p role="status">در حال دریافت ویدئو…</p>;
}
