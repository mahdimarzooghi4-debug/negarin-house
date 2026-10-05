"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect,useRef,useState} from "react";
import {CorporateLiveShell} from "./live-shell";
import {CorporateSessionGate} from "./live-session";
import {
  formatPersianDate,isUuid,parseCorporateProduct,parseCorporatePurchaseRequest,parsePurchaseRequestPage,
  requestTotalQuantity,shortId,type CorporateProduct,type CorporatePurchaseRequest
} from "./live-data";
import styles from "./live.module.css";

function messageForStatus(status:number, fallback:string){
  if(status===401)return "نشست شما منقضی شده است.";
  if(status===404)return "منبع موردنظر در سازمان فعال پیدا نشد.";
  if(status===409)return "داده از زمان نمایش تغییر کرده است؛ صفحه را تازه کنید.";
  return fallback;
}

export function CorporatePurchaseRequestsLive(){
  const [page,setPage]=useState(1),[data,setData]=useState<ReturnType<typeof parsePurchaseRequestPage>>(null);
  const [loading,setLoading]=useState(true),[error,setError]=useState("");
  useEffect(()=>{
    const controller=new AbortController();setLoading(true);setError("");
    void fetch(`/api/corporate/purchase-requests?page=${page}&pageSize=20`,{cache:"no-store",signal:controller.signal})
      .then(async response=>{
        if(!response.ok)throw new Error(messageForStatus(response.status,"درخواست‌های خرید دریافت نشد."));
        const parsed=parsePurchaseRequestPage(await response.json());if(!parsed)throw new Error("پاسخ درخواست‌های خرید معتبر نیست.");setData(parsed);
      }).catch(error=>{if(!controller.signal.aborted)setError(error instanceof Error?error.message:"خطا");})
      .finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return ()=>controller.abort();
  },[page]);
  return <CorporateSessionGate><CorporateLiveShell title="درخواست‌های خرید"><section className={styles.panel}>
    <div className={styles.toolbar}><Link className={styles.button} href="/corporate-buyer/corporate-products">انتخاب محصول و ثبت درخواست</Link></div>
    {loading&&<div className={styles.empty}>در حال دریافت درخواست‌های واقعی…</div>}
    {error&&<div className={styles.error}>{error}</div>}
    {!loading&&!error&&data&&data.items.length===0&&<div className={styles.empty}>هنوز PurchaseRequest واقعی برای این سازمان ثبت نشده است.</div>}
    {!loading&&!error&&data&&data.items.length>0&&<table className={styles.table}><thead><tr><th>شناسه</th><th>وضعیت</th><th>اقلام</th><th>تعداد کل</th><th>ایجاد</th><th>عملیات</th></tr></thead><tbody>
      {data.items.map(request=><tr key={request.id}><td dir="ltr">{shortId(request.id)}</td><td><span className={styles.status}>{request.status==="draft"?"پیش‌نویس":"ارسال‌شده"}</span></td><td>{request.items.map(item=>item.title).join("، ")}</td><td>{new Intl.NumberFormat("fa-IR").format(requestTotalQuantity(request))}</td><td>{formatPersianDate(request.createdAt)}</td><td><Link className={styles.secondary} href={"/corporate-buyer/purchase-request-detail?id="+request.id}>مشاهده</Link></td></tr>)}
    </tbody></table>}
    {data&&<div className={styles.pagination}><button className={styles.secondary} type="button" disabled={page<=1} onClick={()=>setPage(value=>Math.max(1,value-1))}>قبلی</button><span>صفحه {new Intl.NumberFormat("fa-IR").format(page)}</span><button className={styles.secondary} type="button" disabled={!data.hasMore} onClick={()=>setPage(value=>value+1)}>بعدی</button></div>}
  </section></CorporateLiveShell></CorporateSessionGate>;
}

export function CorporateNewPurchaseRequestLive({productIds}:{productIds:string[]}){
  const router=useRouter(),idempotencyKey=useRef<string|null>(null);
  const unique=[...new Set(productIds.filter(isUuid))].slice(0,100);
  const [products,setProducts]=useState<CorporateProduct[]>([]),[quantities,setQuantities]=useState<Record<string,number>>({});
  const [loading,setLoading]=useState(true),[working,setWorking]=useState(false),[error,setError]=useState(""),[draftId,setDraftId]=useState<string|null>(null);

  useEffect(()=>{
    if(!unique.length){setLoading(false);return;}
    const controller=new AbortController();setLoading(true);
    void Promise.all(unique.map(async id=>{
      const response=await fetch("/api/corporate/products/"+id,{cache:"no-store",signal:controller.signal});
      if(!response.ok)throw new Error(messageForStatus(response.status,"یکی از محصولات دیگر منتشرشده نیست."));
      const product=parseCorporateProduct(await response.json());if(!product)throw new Error("پاسخ محصول معتبر نیست.");return product;
    })).then(items=>{setProducts(items);setQuantities(Object.fromEntries(items.map(item=>[item.id,1])));})
      .catch(error=>{if(!controller.signal.aborted)setError(error instanceof Error?error.message:"خطا");})
      .finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return ()=>controller.abort();
  // productIds are canonicalized by the server page before reaching this component.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[unique.join(",")]);

  async function create(mode:"draft"|"submit"){
    if(!products.length||working)return;
    const items=products.map(product=>({productId:product.id,quantity:quantities[product.id]??0}));
    if(items.some(item=>!Number.isInteger(item.quantity)||item.quantity<1)){setError("تعداد هر محصول باید عدد صحیح مثبت باشد.");return;}
    setWorking(true);setError("");
    if(!idempotencyKey.current)idempotencyKey.current=globalThis.crypto.randomUUID();
    try{
      const response=await fetch("/api/corporate/purchase-requests",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({idempotencyKey:idempotencyKey.current,items})});
      if(!response.ok)throw new Error(messageForStatus(response.status,"پیش‌نویس ایجاد نشد."));
      const draft=parseCorporatePurchaseRequest(await response.json());if(!draft)throw new Error("پاسخ پیش‌نویس معتبر نیست.");
      setDraftId(draft.id);
      if(mode==="draft"){router.push("/corporate-buyer/purchase-request-detail?id="+draft.id);return;}
      const submit=await fetch(`/api/corporate/purchase-requests/${draft.id}/submit`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({version:draft.version})});
      if(!submit.ok)throw new Error(messageForStatus(submit.status,"پیش‌نویس ذخیره شد اما ارسال آن انجام نشد."));
      const submitted=parseCorporatePurchaseRequest(await submit.json());if(!submitted)throw new Error("پاسخ ارسال معتبر نیست.");
      router.push("/corporate-buyer/purchase-request-detail?id="+submitted.id);
    }catch(error){setError(error instanceof Error?error.message:"خطا");}finally{setWorking(false);}
  }

  return <CorporateSessionGate><CorporateLiveShell title="ثبت درخواست خرید"><section className={styles.panel}>
    <p className={styles.notice}>قرارداد فعلی PurchaseRequest فقط محصول و تعداد را ذخیره می‌کند. بودجه، شهر، مناسبت، تخفیف و قیمت تجاری تا زمان تعریف CorporateProposal در این فرم عملیاتی وجود ندارند.</p>
    {loading&&<div className={styles.empty}>در حال اعتبارسنجی محصولات انتخاب‌شده…</div>}
    {error&&<div className={styles.error}>{error}{draftId&&<> <Link href={"/corporate-buyer/purchase-request-detail?id="+draftId}>مشاهده پیش‌نویس ذخیره‌شده</Link></>}</div>}
    {!loading&&!products.length&&!error&&<div className={styles.empty}>محصولی انتخاب نشده است. <Link href="/corporate-buyer/corporate-products">انتخاب از محصولات سازمانی</Link></div>}
    {!!products.length&&<div className={styles.form}>{products.map(product=><div className={styles.requestItem} key={product.id}>
      <div><strong>{product.title}</strong><small> · {product.category}</small></div>
      <label>تعداد <input aria-label={"تعداد "+product.title} type="number" min={1} step={1} value={quantities[product.id]??1} onChange={event=>setQuantities(previous=>({...previous,[product.id]:Number(event.target.value)}))}/></label>
      <button className={styles.danger} type="button" disabled={working} onClick={()=>setProducts(items=>items.filter(item=>item.id!==product.id))}>حذف</button>
    </div>)}
      <div className={styles.cardActions}><button className={styles.secondary} type="button" disabled={working||!products.length} onClick={()=>void create("draft")}>ذخیره پیش‌نویس</button><button className={styles.button} type="button" disabled={working||!products.length} onClick={()=>void create("submit")}>{working?"در حال ثبت…":"ثبت و ارسال درخواست"}</button></div>
    </div>}
  </section></CorporateLiveShell></CorporateSessionGate>;
}

export function CorporatePurchaseRequestDetailLive({id}:{id:string}){
  const [request,setRequest]=useState<CorporatePurchaseRequest|null>(null),[loading,setLoading]=useState(true),[working,setWorking]=useState(false),[error,setError]=useState("");
  async function load(signal?:AbortSignal){
    if(!isUuid(id)){setError("شناسه درخواست معتبر نیست.");setLoading(false);return;}
    try{
      const response=await fetch("/api/corporate/purchase-requests/"+id,{cache:"no-store",signal});
      if(!response.ok)throw new Error(messageForStatus(response.status,"جزئیات درخواست دریافت نشد."));
      const parsed=parseCorporatePurchaseRequest(await response.json());if(!parsed)throw new Error("پاسخ درخواست معتبر نیست.");setRequest(parsed);
    }catch(error){if(!signal?.aborted)setError(error instanceof Error?error.message:"خطا");}
    finally{if(!signal?.aborted)setLoading(false);}
  }
  useEffect(()=>{const controller=new AbortController();void load(controller.signal);return()=>controller.abort();},[id]);

  async function submit(){
    if(!request||request.status!=="draft"||working)return;setWorking(true);setError("");
    try{
      const response=await fetch(`/api/corporate/purchase-requests/${request.id}/submit`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({version:request.version})});
      if(!response.ok)throw new Error(messageForStatus(response.status,"ارسال درخواست انجام نشد."));
      const parsed=parseCorporatePurchaseRequest(await response.json());if(!parsed)throw new Error("پاسخ ارسال معتبر نیست.");setRequest(parsed);
    }catch(error){setError(error instanceof Error?error.message:"خطا");}finally{setWorking(false);}
  }

  return <CorporateSessionGate><CorporateLiveShell title="جزئیات درخواست خرید"><section className={styles.panel}>
    {loading&&<div className={styles.empty}>در حال دریافت درخواست…</div>}{error&&<div className={styles.error}>{error}</div>}
    {request&&<><div className={styles.toolbar}><Link className={styles.secondary} href="/corporate-buyer/purchase-requests">بازگشت</Link>{request.status==="draft"&&<button className={styles.button} type="button" disabled={working} onClick={()=>void submit()}>{working?"در حال ارسال…":"ارسال برای بررسی نگارین"}</button>}</div>
      <div className={styles.detailGrid}><div><div className={styles.kv}><small>شناسه</small><span dir="ltr">{request.id}</span></div><div className={styles.kv}><small>وضعیت</small>{request.status==="draft"?"پیش‌نویس":"ارسال‌شده"}</div><div className={styles.kv}><small>ایجاد</small>{formatPersianDate(request.createdAt)}</div><div className={styles.kv}><small>ارسال</small>{formatPersianDate(request.submittedAt)}</div></div>
      <div><h2>اقلام درخواست</h2>{request.items.map(item=><div className={styles.kv} key={item.productId}><strong>{item.title}</strong><small>تعداد: {new Intl.NumberFormat("fa-IR").format(item.quantity)}</small></div>)}</div></div>
      <h2>تاریخچه</h2><div className={styles.history}>{request.history.map(event=><div className={styles.historyItem} key={event.version}><strong>{event.action==="created"?"ایجاد پیش‌نویس":"ارسال درخواست"}</strong><div>{formatPersianDate(event.createdAt)} · نسخه {new Intl.NumberFormat("fa-IR").format(event.version)}</div></div>)}</div>
      <p className={styles.notice}>این درخواست هیچ قیمت تجاری یا رزرو موجودی ایجاد نمی‌کند. مرحلهٔ Proposal/CorporateOrder هنوز فعال نشده است.</p>
    </>}
  </section></CorporateLiveShell></CorporateSessionGate>;
}
