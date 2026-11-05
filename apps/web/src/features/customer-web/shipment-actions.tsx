"use client";
import {useRef,useState,type FormEvent} from "react";
import {canConfirmShipment,shipmentIssueLabels,type OrderPreparation,type ShipmentIssue} from "./order-data";
import {formatToman} from "../corporate-buyer/live-data";
import {formatReservationExpiry} from "./checkout-data";
import styles from "./live-catalog.module.css";

type Shipment=NonNullable<OrderPreparation["shipment"]>;
const issueStatusLabels={open:"ثبت‌شده",in_review:"در حال بررسی",closed:"بسته‌شده"};
export function ShipmentActions({orderId,shipment,onRefresh}:{orderId:string;shipment:Shipment;onRefresh:()=>void}){
  const [mode,setMode]=useState<"receipt"|"issues"|null>(null);
  const [kind,setKind]=useState<ShipmentIssue["kind"]>(shipment.receivedAt?"damaged":"not_received");
  const [description,setDescription]=useState("");
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const locked=useRef(false);
  const issue=shipment.issue;
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(locked.current||!mode)return;
    const normalized=description.replace(/\r?\n/g," ").trim();
    if(mode==="issues"&&(!normalized||normalized.length>2000||/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u.test(normalized))){
      setError("شرح مشکل باید بین ۱ تا ۲۰۰۰ نویسه و بدون نویسهٔ کنترلی باشد.");return;
    }
    locked.current=true;setBusy(true);setError("");
    try{
      const body=mode==="receipt"?{version:shipment.customerVersion}:{version:shipment.customerVersion,kind,description:normalized};
      const response=await fetch(`/api/customer/orders/${orderId}/shipments/${shipment.id}/${mode}`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)});
      if(!response.ok){
        const messages:Record<number,string>={401:"ابتدا وارد حساب شوید.",403:"دسترسی به این عملیات مجاز نیست.",404:"مرسوله در حساب شما پیدا نشد.",409:"وضعیت مرسوله تغییر کرده است."};
        throw new Error(messages[response.status]??"نتیجهٔ ثبت مشخص نشد.");
      }
      onRefresh();
    }catch(error){
      setError((error instanceof Error?error.message:"ارتباط برقرار نشد.")+" برای بررسی نتیجه، اطلاعات سفارش را تازه کنید.");
      setBusy(false);
      // Keep mutations locked until a fresh server snapshot is loaded, including ambiguous failures.
    }
  }
  return <div className={styles.shipmentActions}>
    {issue&&<div><h4>مشکل مرسوله: {shipmentIssueLabels[issue.kind]}</h4><p>{issue.description}</p><p>وضعیت رسیدگی: {issueStatusLabels[issue.status]}</p>{issue.resolutionSummary&&<p>{issue.resolutionSummary}</p>}{issue.resolution==="referred_for_refund_review"&&<p>پرونده برای بررسی بازپرداخت ارجاع شده است.</p>}</div>}
    {issue?.refundReview&&<section aria-label="نتیجهٔ بررسی بازپرداخت">
      <h4>نتیجهٔ بررسی بازپرداخت</h4>
      <p>{issue.refundReview.decision==="approved"?"بازپرداخت تأیید شده است.":"درخواست بازپرداخت رد شده است."}</p>
      {issue.refundReview.amountToman&&<p>مبلغ تأییدشده: {formatToman(issue.refundReview.amountToman)}</p>}
      <p>تاریخ بررسی: {formatReservationExpiry(issue.refundReview.reviewedAt)}</p>
      {issue.refundReview.decision==="approved"&&<p>بازپرداخت هنوز اجرا نشده است؛ وجهی واریز نشده است.</p>}
    </section>}
    {error&&<p role="alert">{error}</p>}
    {!mode&&<div>
      {canConfirmShipment(shipment)&&<button type="button" onClick={()=>setMode("receipt")}>تأیید دریافت مرسوله</button>}
      {!issue&&shipment.customerVersion<2147483647&&<button type="button" onClick={()=>setMode("issues")}>گزارش مشکل مرسوله</button>}
    </div>}
    {mode&&<form onSubmit={submit}>
      <fieldset disabled={busy||locked.current}>
        <legend>{mode==="receipt"?"تأیید دریافت":"گزارش مشکل"}</legend>
        {mode==="receipt"?<label><input type="checkbox" required/>این مرسوله را دریافت کرده‌ام.</label>:<>
          <label>نوع مشکل<select value={kind} onChange={event=>setKind(event.target.value as ShipmentIssue["kind"])}>{Object.entries(shipmentIssueLabels).filter(([value])=>!shipment.receivedAt||value!=="not_received").map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>
          <label>شرح مشکل<textarea required maxLength={2000} value={description} onChange={event=>setDescription(event.target.value)}/></label>
        </>}
        <button type="submit">{busy?"در حال ثبت…":mode==="receipt"?"ثبت تأیید دریافت":"ثبت گزارش مشکل"}</button>
        <button type="button" onClick={()=>{setMode(null);setError("");}}>انصراف</button>
      </fieldset>
    </form>}
    <button type="button" disabled={busy} onClick={onRefresh}>تازه‌سازی وضعیت سفارش</button>
  </div>;
}
