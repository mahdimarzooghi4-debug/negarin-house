"use client";
import {useCallback,useEffect,useState,type ReactNode} from "react";
import styles from "./live.module.css";

type Context={userId:string;activeRole:string;organizationId?:string};
type Grant={id:string;role:string;organizationId:string|null;exportPartnerId:string|null};

export function CorporateSessionGate({children}:{children:ReactNode}){
  const [context,setContext]=useState<Context|null>(null);
  const [grants,setGrants]=useState<Grant[]|null>(null);
  const [state,setState]=useState<"loading"|"ready"|"select"|"unauthenticated"|"forbidden"|"error">("loading");

  const load=useCallback(async()=>{
    setState("loading");
    try{
      const current=await fetch("/api/auth/context",{cache:"no-store"});
      if(current.ok){
        const body=await current.json() as Context;
        if(body.activeRole==="corporate-buyer"&&body.organizationId){setContext(body);setState("ready");return;}
        setState("forbidden");return;
      }
      const available=await fetch("/api/auth/grants",{cache:"no-store"});
      if(available.status===401){setState("unauthenticated");return;}
      if(!available.ok){setState("error");return;}
      const payload=await available.json() as {grants?:Grant[]};
      const corporate=(payload.grants??[]).filter(grant=>grant.role==="corporate_buyer"&&grant.organizationId);
      setGrants(corporate);
      setState(corporate.length?"select":"forbidden");
    }catch{setState("error");}
  },[]);

  useEffect(()=>{void load();},[load]);

  async function select(grantId:string){
    setState("loading");
    try{
      const response=await fetch("/api/auth/context",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({grantId})});
      if(!response.ok){setState(response.status===401?"unauthenticated":"error");return;}
      const body=await response.json() as Context;
      if(body.activeRole!=="corporate-buyer"||!body.organizationId){setState("forbidden");return;}
      setContext(body);setState("ready");
    }catch{setState("error");}
  }

  if(state==="ready"&&context)return <>{children}</>;
  return <main className={styles.gate} dir="rtl">
    <section className={styles.gateCard}>
      <img src="/corporate-buyer-assets/530a0f8f.png" alt="" />
      {state==="loading"&&<><h1>در حال بررسی نشست امن…</h1><p>دسترسی سازمانی از سرور بررسی می‌شود.</p></>}
      {state==="unauthenticated"&&<><h1>ورود لازم است</h1><p>برای دادهٔ واقعی باید نشست معتبر نگارین داشته باشید. ورود OTP عمومی تا اتصال سرویس پیامک production فعال نشده است.</p></>}
      {state==="forbidden"&&<><h1>دسترسی سازمانی ندارید</h1><p>در نشست فعلی Corporate Buyer grant مجاز وجود ندارد.</p></>}
      {state==="error"&&<><h1>اتصال برقرار نشد</h1><p>وضعیت نشست از سرور دریافت نشد.</p><button onClick={()=>void load()}>تلاش دوباره</button></>}
      {state==="select"&&<><h1>سازمان را انتخاب کنید</h1><p>این هویت در چند context قابل استفاده است. انتخاب context صریح الزامی است.</p><div className={styles.grants}>{grants?.map(grant=><button key={grant.id} onClick={()=>void select(grant.id)}>سازمان {grant.organizationId?.slice(0,8)}…</button>)}</div></>}
    </section>
  </main>;
}
