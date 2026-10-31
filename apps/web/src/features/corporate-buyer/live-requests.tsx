"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect,useRef,useState} from "react";
import {CorporateLiveShell} from "./live-shell";
import {CorporateSessionGate} from "./live-session";
import {
  CORPORATE_LIST_PAGE_SIZE,MAX_CORPORATE_LIST_PAGE,MAX_PURCHASE_REQUEST_QUANTITY,formatPersianDate,isPurchaseRequestQuantity,isUuid,parseCorporateOrder,parseCorporateOrderPage,parseCorporateProduct,parseCorporateProposalList,parseCorporatePurchaseRequest,parsePurchaseRequestPage,
  requestTotalQuantity,shortId,type CorporateOrder,type CorporateProduct,type CorporateProposal,type CorporatePurchaseRequest,type PurchaseRequestProductSelection
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
    void fetch(`/api/corporate/purchase-requests?page=${page}&pageSize=${CORPORATE_LIST_PAGE_SIZE}`,{cache:"no-store",signal:controller.signal})
      .then(async response=>{
        if(!response.ok)throw new Error(messageForStatus(response.status,"درخواست‌های خرید دریافت نشد."));
        const parsed=parsePurchaseRequestPage(await response.json(),{page,pageSize:CORPORATE_LIST_PAGE_SIZE});if(!parsed)throw new Error("پاسخ درخواست‌های خرید معتبر نیست.");setData(parsed);
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
    {data&&<div className={styles.pagination}><button className={styles.secondary} type="button" disabled={page<=1} onClick={()=>setPage(value=>Math.max(1,value-1))}>قبلی</button><span>صفحه {new Intl.NumberFormat("fa-IR").format(page)}</span><button className={styles.secondary} type="button" disabled={!data.hasMore||page>=MAX_CORPORATE_LIST_PAGE} onClick={()=>setPage(value=>Math.min(MAX_CORPORATE_LIST_PAGE,value+1))}>بعدی</button></div>}
  </section></CorporateLiveShell></CorporateSessionGate>;
}

export function CorporateNewPurchaseRequestLive({selection}:{selection:PurchaseRequestProductSelection}){
  const router=useRouter(),idempotencyKey=useRef<string|null>(null);
  const unique=selection.ids;
  const selectionError=selection.error==="invalid"
    ?"شناسه یکی از محصولات انتخاب‌شده معتبر نیست. هیچ قلمی از ورودی حذف نشد."
    :selection.error==="too_many"
      ?"تعداد محصولات انتخاب‌شده از سقف ۱۰۰ قلم PurchaseRequest بیشتر است. هیچ قلمی از ورودی حذف نشد."
      :"";
  const [products,setProducts]=useState<CorporateProduct[]>([]),[quantities,setQuantities]=useState<Record<string,number>>({});
  const [loading,setLoading]=useState(true),[working,setWorking]=useState(false),[error,setError]=useState(""),[draftId,setDraftId]=useState<string|null>(null);

  useEffect(()=>{
    setProducts([]);setQuantities({});
    if(selectionError){setError(selectionError);setLoading(false);return;}
    setError("");
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
  },[selectionError,unique.join(",")]);

  async function create(mode:"draft"|"submit"){
    if(!products.length||working)return;
    const items=products.map(product=>({productId:product.id,quantity:quantities[product.id]??0}));
    if(items.some(item=>!isPurchaseRequestQuantity(item.quantity))){
      setError(`تعداد هر محصول باید عدد صحیح بین ۱ و ${new Intl.NumberFormat("fa-IR").format(MAX_PURCHASE_REQUEST_QUANTITY)} باشد.`);
      return;
    }
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
      <div><strong>{product.title}</strong><small> · {product.category??"—"}</small></div>
      <label>تعداد <input aria-label={"تعداد "+product.title} type="number" min={1} max={MAX_PURCHASE_REQUEST_QUANTITY} step={1} value={quantities[product.id]??1} onChange={event=>setQuantities(previous=>({...previous,[product.id]:Number(event.target.value)}))}/></label>
      <button className={styles.danger} type="button" disabled={working} onClick={()=>setProducts(items=>items.filter(item=>item.id!==product.id))}>حذف</button>
    </div>)}
      <div className={styles.cardActions}><button className={styles.secondary} type="button" disabled={working||!products.length} onClick={()=>void create("draft")}>ذخیره پیش‌نویس</button><button className={styles.button} type="button" disabled={working||!products.length} onClick={()=>void create("submit")}>{working?"در حال ثبت…":"ثبت و ارسال درخواست"}</button></div>
    </div>}
  </section></CorporateLiveShell></CorporateSessionGate>;
}

export function CorporatePurchaseRequestDetailLive({id}:{id:string}){
  const [request,setRequest]=useState<CorporatePurchaseRequest|null>(null),[loading,setLoading]=useState(true),[working,setWorking]=useState(false),[error,setError]=useState("");
  const [message,setMessage]=useState(""),[proposals,setProposals]=useState<CorporateProposal[]>([]),[decisionMessage,setDecisionMessage]=useState("");
  async function load(signal?:AbortSignal){
    if(!isUuid(id)){setError("شناسه درخواست معتبر نیست.");setLoading(false);return;}
    try{
      const [response,proposalResponse]=await Promise.all([fetch("/api/corporate/purchase-requests/"+id,{cache:"no-store",signal}),fetch(`/api/corporate/purchase-requests/${id}/proposals`,{cache:"no-store",signal})]);
      if(!response.ok||!proposalResponse.ok)throw new Error(messageForStatus(response.status,"جزئیات درخواست دریافت نشد."));
      const parsed=parseCorporatePurchaseRequest(await response.json()),parsedProposals=parseCorporateProposalList(await proposalResponse.json());if(!parsed||!parsedProposals)throw new Error("پاسخ درخواست معتبر نیست.");setRequest(parsed);setProposals(parsedProposals);
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
  async function sendMessage(){
    if(!request||request.status!=="submitted"||!message.trim()||working)return;setWorking(true);setError("");
    try{const response=await fetch(`/api/corporate/purchase-requests/${request.id}/messages`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({version:request.version,message:message.trim()})});if(response.status===409)throw new Error("درخواست هم‌زمان تغییر کرده؛ صفحه را تازه کنید.");if(!response.ok)throw new Error("پیام برای نگارین ارسال نشد.");const parsed=parseCorporatePurchaseRequest(await response.json());if(!parsed)throw new Error("پاسخ پیام معتبر نیست.");setRequest(parsed);setMessage("");}
    catch(error){setError(error instanceof Error?error.message:"ارسال پیام انجام نشد.");}finally{setWorking(false);}
  }
  async function decideProposal(proposal:CorporateProposal,decision:"accepted"|"rejected"|"revision_requested"){
    if(working)return;if(decision==="revision_requested"&&!decisionMessage.trim()){setError("برای درخواست اصلاح، توضیحات را بنویسید.");return;}setWorking(true);setError("");
    try{const response=await fetch(`/api/corporate/proposals/${proposal.id}/decision`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({version:proposal.version,decision,message:decisionMessage.trim()})});if(response.status===409)throw new Error("پیشنهاد هم‌زمان تغییر کرده؛ صفحه را تازه کنید.");if(!response.ok)throw new Error("ثبت تصمیم دربارهٔ پیشنهاد انجام نشد.");const updated=await response.json();const parsed=parseCorporateProposalList({items:[updated]})?.[0];if(!parsed)throw new Error("پاسخ تصمیم معتبر نیست.");setProposals(current=>current.map(item=>item.id===parsed.id?parsed:item));setDecisionMessage("");}
    catch(error){setError(error instanceof Error?error.message:"ثبت تصمیم انجام نشد.");}finally{setWorking(false);}
  }

  return <CorporateSessionGate><CorporateLiveShell title="جزئیات درخواست خرید"><section className={styles.panel}>
    {loading&&<div className={styles.empty}>در حال دریافت درخواست…</div>}{error&&<div className={styles.error}>{error}</div>}
    {request&&<><div className={styles.toolbar}><Link className={styles.secondary} href="/corporate-buyer/purchase-requests">بازگشت</Link>{request.status==="draft"&&<button className={styles.button} type="button" disabled={working} onClick={()=>void submit()}>{working?"در حال ارسال…":"ارسال برای بررسی نگارین"}</button>}</div>
      <div className={styles.detailGrid}><div><div className={styles.kv}><small>شناسه</small><span dir="ltr">{request.id}</span></div><div className={styles.kv}><small>وضعیت</small>{request.status==="draft"?"پیش‌نویس":"ارسال‌شده"}</div><div className={styles.kv}><small>ایجاد</small>{formatPersianDate(request.createdAt)}</div><div className={styles.kv}><small>ارسال</small>{formatPersianDate(request.submittedAt)}</div></div>
      <div><h2>اقلام درخواست</h2>{request.items.map(item=><div className={styles.kv} key={item.productId}><strong>{item.title}</strong><small>تعداد: {new Intl.NumberFormat("fa-IR").format(item.quantity)}</small></div>)}</div></div>
      <h2>پیشنهادهای تجاری</h2>{proposals.length?proposals.map(proposal=><article className={styles.proposalCard} key={proposal.id}><header><div><strong>{proposal.summary}</strong><small>{proposal.status==="sent"?"آماده بررسی":proposal.status==="accepted"?"پذیرفته‌شده":proposal.status==="rejected"?"ردشده":"درخواست اصلاح ارسال شد"}</small></div><b>{new Intl.NumberFormat("fa-IR").format(BigInt(proposal.totalToman))} تومان</b></header><div className={styles.proposalLines}>{proposal.items.map(item=><div key={item.productId}><strong>{item.title}</strong><span>{item.artistName} · {item.quantity.toLocaleString("fa-IR")} عدد</span><small>واحد {new Intl.NumberFormat("fa-IR").format(BigInt(item.unitPriceToman))} · جمع {new Intl.NumberFormat("fa-IR").format(BigInt(item.lineTotalToman))} تومان</small></div>)}</div><dl className={styles.proposalMeta}><div><dt>شروع تولید</dt><dd>{formatPersianDate(proposal.productionStartsAt)}</dd></div><div><dt>اتمام تولید</dt><dd>{formatPersianDate(proposal.productionCompletesAt)}</dd></div><div><dt>تحویل تقریبی</dt><dd>{formatPersianDate(proposal.estimatedDeliveryAt)}</dd></div><div><dt>بسته‌بندی</dt><dd>{proposal.packagingDetails}</dd></div><div><dt>شخصی‌سازی</dt><dd>{proposal.customizationDetails}</dd></div></dl>{proposal.history.filter(event=>event.message).map(event=><p className={styles.proposalMessage} key={event.version}>{event.action==="accepted"?"پاسخ سازمان":"یادداشت تصمیم"}: {event.message}</p>)}{proposal.status==="sent"&&<div className={styles.proposalDecision}><label>توضیح برای درخواست اصلاح یا رد<textarea maxLength={4000} rows={3} value={decisionMessage} onChange={event=>setDecisionMessage(event.target.value)} /></label><div><button type="button" disabled={working} onClick={()=>void decideProposal(proposal,"accepted")}>پذیرش پیشنهاد</button><button type="button" disabled={working||!decisionMessage.trim()} onClick={()=>void decideProposal(proposal,"revision_requested")}>درخواست اصلاح</button><button type="button" disabled={working||!decisionMessage.trim()} onClick={()=>void decideProposal(proposal,"rejected")}>رد پیشنهاد</button></div></div>}{proposal.order&&<Link className={styles.button} href={`/corporate-buyer/order-detail?id=${proposal.order.id}`}>مشاهدهٔ سفارش ثبت‌شده</Link>}</article>):<p className={styles.notice}>هنوز پیشنهادی برای این درخواست ثبت نشده است.</p>}
      <h2>گفت‌وگو با نگارین</h2><div className={styles.history}>{request.history.map(event=><div className={styles.historyItem} key={event.version}><strong>{event.action==="created"?"ایجاد پیش‌نویس":event.action==="submitted"?"ارسال درخواست":event.action==="staff_message"?"پاسخ نگارین":"پیام سازمان"}</strong><div>{formatPersianDate(event.createdAt)} · نسخه {new Intl.NumberFormat("fa-IR").format(event.version)}</div>{event.message&&<p>{event.message}</p>}</div>)}</div>
      {request.status==="submitted"&&<div className={styles.form}><label>پیام برای کارشناس نگارین<textarea maxLength={4000} rows={4} value={message} onChange={event=>setMessage(event.target.value)} placeholder="پاسخ به پرسش یا توضیحات تکمیلی را بنویسید."/></label><button className={styles.button} type="button" disabled={working||!message.trim()} onClick={()=>void sendMessage()}>{working?"در حال ارسال…":"ارسال پیام"}</button></div>}
      <p className={styles.notice}>با پذیرش پیشنهاد سفارش سازمانی ساخته می‌شود؛ تا ثبت نشانی تحویل و تعیین شرایط پرداخت، موجودی رزرو یا پرداختی ثبت نمی‌شود.</p>
    </>}
  </section></CorporateLiveShell></CorporateSessionGate>;
}

const corporateOrderStatus: Record<CorporateOrder["status"],string>={awaiting_payment_setup:"در انتظار تکمیل پرداخت و تحویل",awaiting_payment:"در انتظار پرداخت",payment_under_review:"در انتظار تأیید پرداخت",paid:"پرداخت‌شده",fulfilling:"در حال اجرا",completed:"تکمیل‌شده",cancelled:"لغوشده"};
export function CorporateOrdersLive(){
  const [page,setPage]=useState(1),[data,setData]=useState<ReturnType<typeof parseCorporateOrderPage>>(null),[loading,setLoading]=useState(true),[error,setError]=useState("");
  useEffect(()=>{const controller=new AbortController();setLoading(true);setError("");void fetch(`/api/corporate/orders?page=${page}&pageSize=${CORPORATE_LIST_PAGE_SIZE}`,{cache:"no-store",signal:controller.signal}).then(async response=>{if(!response.ok)throw new Error(messageForStatus(response.status,"سفارش‌های سازمانی دریافت نشدند."));const parsed=parseCorporateOrderPage(await response.json(),{page,pageSize:CORPORATE_LIST_PAGE_SIZE});if(!parsed)throw new Error("پاسخ سفارش‌ها معتبر نیست.");setData(parsed);}).catch(cause=>{if(!controller.signal.aborted)setError(cause instanceof Error?cause.message:"خطا");}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});return()=>controller.abort();},[page]);
  return <CorporateSessionGate><CorporateLiveShell title="سفارش‌های سازمانی"><section className={styles.panel}><div className={styles.toolbar}><Link className={styles.button} href="/corporate-buyer/purchase-requests">درخواست‌های خرید</Link></div>{loading&&<div className={styles.empty}>در حال دریافت سفارش‌ها…</div>}{error&&<div className={styles.error}>{error}</div>}{!loading&&!error&&data?.items.length===0&&<div className={styles.empty}>هنوز سفارشی از پیشنهاد پذیرفته‌شده ساخته نشده است.</div>}{data?.items.map(order=><Link className={styles.orderCard} href={`/corporate-buyer/order-detail?id=${order.id}`} key={order.id}><span><strong>{order.proposalSummary}</strong><small>{order.items.length} قلم · تحویل تقریبی {formatPersianDate(order.estimatedDeliveryAt)}</small></span><b>{corporateOrderStatus[order.status]}</b><strong>{new Intl.NumberFormat("fa-IR").format(BigInt(order.totalToman))} تومان</strong><small>{formatPersianDate(order.createdAt)}</small></Link>)}{data&&(page>1||data.hasMore)&&<div className={styles.paging}><button type="button" disabled={loading||page<=1} onClick={()=>setPage(value=>Math.max(1,value-1))}>صفحهٔ قبل</button><span>{new Intl.NumberFormat("fa-IR").format(page)}</span><button type="button" disabled={loading||!data.hasMore} onClick={()=>setPage(value=>value+1)}>صفحهٔ بعد</button></div>}</section></CorporateLiveShell></CorporateSessionGate>;
}

export function CorporateOrderDetailLive({id}:{id:string}){
  const [order,setOrder]=useState<CorporateOrder|null>(null),[loading,setLoading]=useState(true),[error,setError]=useState("");
  useEffect(()=>{const controller=new AbortController();if(!isUuid(id)){setError("شناسه سفارش معتبر نیست.");setLoading(false);return()=>controller.abort();}void fetch(`/api/corporate/orders/${id}`,{cache:"no-store",signal:controller.signal}).then(async response=>{if(!response.ok)throw new Error(messageForStatus(response.status,"جزئیات سفارش دریافت نشد."));const parsed=parseCorporateOrder(await response.json());if(!parsed)throw new Error("پاسخ جزئیات سفارش معتبر نیست.");setOrder(parsed);}).catch(cause=>{if(!controller.signal.aborted)setError(cause instanceof Error?cause.message:"خطا");}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});return()=>controller.abort();},[id]);
  return <CorporateSessionGate><CorporateLiveShell title="جزئیات سفارش"><section className={styles.panel}><div className={styles.toolbar}><Link className={styles.secondary} href="/corporate-buyer/orders">بازگشت به سفارش‌ها</Link>{order&&<span className={styles.status}>{corporateOrderStatus[order.status]}</span>}</div>{loading&&<div className={styles.empty}>در حال دریافت جزئیات سفارش…</div>}{error&&<div className={styles.error}>{error}</div>}{order&&<><h2>{order.proposalSummary}</h2><p>شناسه <bdi dir="ltr">{order.id}</bdi> · ثبت {formatPersianDate(order.createdAt)}</p><div className={styles.proposalLines}>{order.items.map(item=><div key={item.productId}><strong>{item.title}</strong><span>{item.quantity.toLocaleString("fa-IR")} عدد</span><small>واحد {new Intl.NumberFormat("fa-IR").format(BigInt(item.unitPriceToman))} · جمع {new Intl.NumberFormat("fa-IR").format(BigInt(item.lineTotalToman))} تومان</small></div>)}</div><div className={styles.orderTotal}><strong>جمع کل پیشنهاد</strong><b>{new Intl.NumberFormat("fa-IR").format(BigInt(order.totalToman))} تومان</b></div>{order.paymentAmountToman&&order.paymentDueAt&&order.paymentInstructions?<section className={styles.historyItem}><h3>اطلاعات پرداخت</h3><p>مبلغ نهایی: <strong>{new Intl.NumberFormat("fa-IR").format(BigInt(order.paymentAmountToman))} تومان</strong></p><p>مهلت پرداخت: {formatPersianDate(order.paymentDueAt)}</p><p>{order.paymentInstructions}</p><p className={styles.notice}>پرداخت از درگاه در سامانه هنوز فعال نشده است؛ این اطلاعات برای هماهنگی پرداخت ثبت شده‌اند.</p></section>:<p className={styles.notice}>برای تکمیل سفارش، نشانی تحویل و شرایط پرداخت باید ثبت شود. تا آن زمان موجودی رزرو نشده و پرداختی دریافت نشده است.</p>}<CorporateShippingAddressForm order={order} onUpdated={setOrder}/>{order.shipmentReports&&order.shipmentReports.length>0&&<section className={styles.historyItem}><h3>گزارش‌های ارسال</h3>{order.shipmentReports.map((report,index)=><article key={`${report.trackingCode}-${index}`}><strong>{report.carrierName} · کد رهگیری <bdi dir="ltr">{report.trackingCode}</bdi></strong><p>{report.items.map(item=>`${item.title} × ${item.quantity.toLocaleString("fa-IR")}`).join("، ")}</p><small>{formatPersianDate(report.reportedAt)} · گزارش هنرمند؛ تأیید شرکت حمل‌ونقل نیست</small></article>)}</section>}<CorporatePaymentReportForm order={order} onUpdated={setOrder}/><h3>تاریخچه سفارش</h3><div className={styles.history}>{order.history.map(event=><div className={styles.historyItem} key={event.version}><strong>{event.action==="created_from_accepted_proposal"?"ساخت از پیشنهاد پذیرفته‌شده":event.action==="shipping_address_set"?"ثبت نشانی تحویل":event.action==="payment_setup_completed"?"تعیين مبلغ و شرایط پرداخت":event.action}</strong><div>{formatPersianDate(event.createdAt)}</div>{event.message&&<small>{event.message}</small>}</div>)}</div></>}</section></CorporateLiveShell></CorporateSessionGate>;
}

function CorporateShippingAddressForm({order,onUpdated}:{order:CorporateOrder;onUpdated:(order:CorporateOrder)=>void}){
  const [values,setValues]=useState({recipientName:order.shippingAddress?.recipientName??"",recipientPhone:order.shippingAddress?.recipientPhone??"",province:order.shippingAddress?.province??"",city:order.shippingAddress?.city??"",postalCode:order.shippingAddress?.postalCode??"",fullAddress:order.shippingAddress?.fullAddress??""});
  const [saving,setSaving]=useState(false),[error,setError]=useState(""),[saved,setSaved]=useState(!!order.shippingAddress);
  async function submit(event:React.FormEvent<HTMLFormElement>){event.preventDefault();setSaving(true);setError("");setSaved(false);try{const response=await fetch(`/api/corporate/orders/${order.id}/shipping-address`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({version:order.version,...values})});if(!response.ok)throw new Error(messageForStatus(response.status,"ثبت نشانی انجام نشد."));const parsed=parseCorporateOrder(await response.json());if(!parsed)throw new Error("پاسخ ثبت نشانی معتبر نیست.");onUpdated(parsed);setSaved(true);}catch(cause){setError(cause instanceof Error?cause.message:"خطا");}finally{setSaving(false);}}
  return <section><h3>نشانی تحویل</h3>{order.status==="awaiting_payment_setup"?<form className={styles.form} onSubmit={submit}><label>نام گیرنده<input required maxLength={200} value={values.recipientName} onChange={event=>setValues({...values,recipientName:event.target.value})}/></label><label>شمارهٔ همراه<input required dir="ltr" inputMode="tel" maxLength={32} value={values.recipientPhone} onChange={event=>setValues({...values,recipientPhone:event.target.value})}/></label><label>استان<input required maxLength={100} value={values.province} onChange={event=>setValues({...values,province:event.target.value})}/></label><label>شهر<input required maxLength={100} value={values.city} onChange={event=>setValues({...values,city:event.target.value})}/></label><label>کد پستی<input required dir="ltr" inputMode="numeric" maxLength={32} value={values.postalCode} onChange={event=>setValues({...values,postalCode:event.target.value})}/></label><label>نشانی کامل<textarea required maxLength={2000} rows={3} value={values.fullAddress} onChange={event=>setValues({...values,fullAddress:event.target.value})}/></label>{error&&<div className={styles.error}>{error}</div>}{saved&&<p className={styles.notice}>نشانی تحویل ثبت شد. سفارش تا تعیین مبلغ و شرایط پرداخت در انتظار تکمیل می‌ماند.</p>}<button className={styles.button} type="submit" disabled={saving}>{saving?"در حال ثبت…":order.shippingAddress?"به‌روزرسانی نشانی":"ثبت نشانی تحویل"}</button></form>:order.shippingAddress?<div className={styles.historyItem}><strong>{order.shippingAddress.recipientName} · {order.shippingAddress.recipientPhone}</strong><div>{order.shippingAddress.province}، {order.shippingAddress.city} · کد پستی <bdi dir="ltr">{order.shippingAddress.postalCode}</bdi></div><div>{order.shippingAddress.fullAddress}</div></div>:<p className={styles.notice}>نشانی تحویل ثبت نشده است.</p>}</section>;
}

function CorporatePaymentReportForm({order,onUpdated}:{order:CorporateOrder;onUpdated:(order:CorporateOrder)=>void}){
  const [amount,setAmount]=useState(order.paymentReportedAmountToman??order.paymentAmountToman??""),[reference,setReference]=useState(order.paymentReference??""),[saving,setSaving]=useState(false),[error,setError]=useState(""),[sent,setSent]=useState(false);
  async function submit(event:React.FormEvent<HTMLFormElement>){event.preventDefault();if(saving)return;const normalized=amount.replace(/[۰-۹]/g,d=>String(d.charCodeAt(0)-1776)).replace(/[٠-٩]/g,d=>String(d.charCodeAt(0)-1632));if(!/^[1-9]\d{0,18}$/.test(normalized)){setError("مبلغ پرداخت‌شده معتبر نیست.");return;}setSaving(true);setError("");setSent(false);try{const response=await fetch(`/api/corporate/orders/${order.id}/payment-report`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({version:order.version,paymentReportedAmountToman:normalized,paymentReference:reference.trim()})});if(response.status===409)throw new Error("وضعیت سفارش تغییر کرده است؛ صفحه را تازه کنید.");if(!response.ok)throw new Error("گزارش پرداخت ثبت نشد.");const parsed=parseCorporateOrder(await response.json());if(!parsed)throw new Error("پاسخ گزارش پرداخت معتبر نیست.");onUpdated(parsed);setSent(true);}catch(cause){setError(cause instanceof Error?cause.message:"خطا در ثبت پرداخت.");}finally{setSaving(false);}}
  if(order.status==="payment_under_review")return <section><h3>گزارش پرداخت</h3><div className={styles.notice}>گزارش شما در {formatPersianDate(order.paymentReportedAt)} ثبت شده و در انتظار بررسی کارشناس است.</div><p>مبلغ اعلام‌شده: {order.paymentReportedAmountToman?new Intl.NumberFormat("fa-IR").format(BigInt(order.paymentReportedAmountToman)):"—"} تومان · شناسه پیگیری: <bdi dir="ltr">{order.paymentReference}</bdi></p></section>;
  if(order.status!=="awaiting_payment")return null;
  return <section><h3>ثبت پرداخت انجام‌شده</h3><p className={styles.notice}>پس از انتقال وجه طبق دستور پرداخت، مبلغ و شناسهٔ پیگیری را وارد کنید. سفارش پس از بررسی کارشناس پرداخت‌شده می‌شود.</p><form className={styles.form} onSubmit={submit}><label>مبلغ پرداخت‌شده (تومان)<input required inputMode="numeric" dir="ltr" maxLength={19} value={amount} onChange={e=>setAmount(e.target.value)}/></label><label>شناسهٔ پیگیری بانکی<input required maxLength={120} value={reference} onChange={e=>setReference(e.target.value)}/></label>{error&&<div className={styles.error}>{error}</div>}{sent&&<p className={styles.notice}>گزارش ثبت شد و برای تأیید به کارشناس ارسال شد.</p>}<button className={styles.button} disabled={saving}>{saving?"در حال ثبت…":"ارسال گزارش برای بررسی"}</button></form></section>;
}
