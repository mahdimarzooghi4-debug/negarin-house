"use client";
import {useEffect,useId,useRef,useState,type FormEvent} from "react";
import {requestProfile,type CustomerProfile} from "./profile-data";
import styles from "./live-catalog.module.css";
export function CustomerProfileEditor({onName}:{onName:(name:string)=>void}){
 const fieldId=useId();
 const [data,setData]=useState<CustomerProfile|null>(null);
 const [displayName,setDisplayName]=useState("");
 const [editing,setEditing]=useState(false);
 const [error,setError]=useState("");
 const [message,setMessage]=useState("");
 const [busy,setBusy]=useState(false);
 const [retry,setRetry]=useState(0);
 const lock=useRef(false);
 useEffect(()=>{
  const controller=new AbortController();setData(null);setError("");setMessage("");onName("");
  void requestProfile({signal:controller.signal}).then(profile=>{if(!controller.signal.aborted){setData(profile);setDisplayName(profile.displayName);onName(profile.displayName);}}).catch(error=>{if(!controller.signal.aborted)setError(error instanceof Error?error.message:"ارتباط برقرار نشد.");});
  return()=>controller.abort();
 },[retry,onName]);
 async function save(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(!data||lock.current)return;
  lock.current=true;setBusy(true);setError("");setMessage("");
  try{
   const profile=await requestProfile({method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({version:data.version,displayName:displayName.trim()})});
   setData(profile);setDisplayName(profile.displayName);onName(profile.displayName);setEditing(false);setMessage("مشخصات ذخیره شد.");
  }catch(error){setData(null);onName("");setError((error instanceof Error?error.message:"نتیجهٔ ذخیره مشخص نیست.")+" پیش از تلاش دوباره اطلاعات را تازه کنید.");}
  finally{lock.current=false;setBusy(false);}
 }
 return <article className="fg-b909c45a8e" dir="rtl"><h3>اطلاعات حساب</h3>
  {!data&&!error&&<p role="status">در حال دریافت مشخصات…</p>}
  {error&&<div role="alert"><p>{error}</p><button onClick={()=>{setEditing(false);setRetry(value=>value+1);}}>تازه‌سازی مشخصات</button></div>}
  {data&&<><p>{data.displayName||"نام ثبت نشده است."}</p><p>شمارهٔ همراه: <bdi dir="ltr">{data.phone}</bdi></p>
   {!editing?<button className={styles.accountLink} disabled={data.version>=2147483647} onClick={()=>{setEditing(true);setMessage("");}}>ویرایش اطلاعات</button>:<form className={styles.profileForm} onSubmit={save}><fieldset disabled={busy}>
    <label htmlFor={fieldId}>نام و نام خانوادگی</label><input id={fieldId} required maxLength={100} value={displayName} onChange={event=>setDisplayName(event.target.value)} autoComplete="name"/>
    <button type="submit">{busy?"در حال ذخیره…":"ذخیره مشخصات"}</button><button type="button" onClick={()=>{setEditing(false);setDisplayName(data.displayName);}}>انصراف</button>
   </fieldset></form>}
  </>}
  {message&&<p role="status">{message}</p>}
 </article>;
}
