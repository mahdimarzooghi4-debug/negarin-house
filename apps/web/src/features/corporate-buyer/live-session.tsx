"use client";
import {useCallback,useEffect,useState,type ReactNode} from "react";
import {isCorporateContext,parseCorporateGrantOptions,parseIdentityContext,type IdentityContext,type IdentityGrant} from "./live-session-model";
import styles from "./live.module.css";

export function CorporateSessionGate({children}:{children:ReactNode}){
  const [context,setContext]=useState<IdentityContext|null>(null);
  const [grants,setGrants]=useState<IdentityGrant[]|null>(null);
  const [state,setState]=useState<"loading"|"ready"|"select"|"unauthenticated"|"forbidden"|"error">("loading");

  const load=useCallback(async()=>{
    setState("loading");
    try{
      const current=await fetch("/api/auth/context",{cache:"no-store"});
      if(current.ok){
        const body=parseIdentityContext(await current.json());
        if(!body){setState("error");return;}
        if(isCorporateContext(body)){setContext(body);setState("ready");return;}
      }else if(current.status!==401){
        setState("error");return;
      }

      const available=await fetch("/api/auth/grants",{cache:"no-store"});
      if(available.status===401){setState("unauthenticated");return;}
      if(!available.ok){setState("error");return;}
      const corporate=parseCorporateGrantOptions(await available.json());
      if(!corporate){setState("error");return;}
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
      const body=parseIdentityContext(await response.json());
      if(!body){setState("error");return;}
      if(!isCorporateContext(body)){setState("forbidden");return;}
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
      {state==="select"&&<><h1>سازمان را انتخاب کنید</h1><p>برای ورود به فضای Corporate Buyer انتخاب context صریح الزامی است؛ context فعال دیگر به‌صورت خودکار جایگزین نمی‌شود.</p><div className={styles.grants}>{grants?.map(grant=><button key={grant.id} onClick={()=>void select(grant.id)}>سازمان {grant.organizationId?.slice(0,8)}…</button>)}</div></>}
    </section>
  </main>;
}
