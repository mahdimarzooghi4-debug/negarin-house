"use client";
import {useRef,useState,type FormEvent} from "react";
import {canCancelOrder,type CustomerOrder} from "./order-data";
import styles from "./live-catalog.module.css";
export function OrderCancel({order,onRefresh}:{order:CustomerOrder;onRefresh:()=>void}){
  const [confirm,setConfirm]=useState(false);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const locked=useRef(false);
  if(!canCancelOrder(order))return null;
  async function cancel(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(locked.current)return;
    locked.current=true;setBusy(true);setError("");
    try{
      const response=await fetch(`/api/customer/orders/${order.id}/cancel`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({version:order.version})});
      if(!response.ok){
        const messages:Record<number,string>={401:"ابتدا وارد حساب شوید.",403:"دسترسی مجاز نیست.",404:"سفارش پیدا نشد.",409:"وضعیت سفارش تغییر کرده است."};
        throw new Error(messages[response.status]??"نتیجهٔ لغو مشخص نشد.");
      }
      onRefresh();
    }catch(error){
      setError((error instanceof Error?error.message:"ارتباط برقرار نشد.")+" برای بررسی نتیجه، وضعیت سفارش را تازه کنید.");setBusy(false);
    }
  }
  return <section className={styles.shipmentActions} aria-label="لغو سفارش">
    {!confirm?<button type="button" onClick={()=>setConfirm(true)}>لغو سفارش</button>:<form onSubmit={cancel}><fieldset disabled={busy||locked.current}>
      <legend>لغو سفارش رزروشده</legend>
      <p>با لغو سفارش، رزرو اقلام آزاد می‌شود.</p>
      <label><input type="checkbox" required/>لغو این سفارش را تأیید می‌کنم.</label>
      <button type="submit">{busy?"در حال ثبت…":"ثبت لغو سفارش"}</button>
      <button type="button" onClick={()=>setConfirm(false)}>انصراف</button>
    </fieldset></form>}
    {error&&<p role="alert">{error}</p>}
    <button type="button" disabled={busy} onClick={onRefresh}>تازه‌سازی سفارش</button>
  </section>;
}
