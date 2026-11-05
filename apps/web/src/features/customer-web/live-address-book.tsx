"use client";
import Link from "next/link";
import {useCallback,useEffect,useRef,useState} from "react";
import "@fontsource-variable/vazirmatn";
import "@fontsource/material-icons-round";
import "./customer-web.css";
import CustomerAddressBookWeb from "./screens/address-book";
import {CustomerLiveNavigation} from "./customer-controls";
import {emptyAddress,requestAddressBook,type AddressBook,type AddressFields,type CustomerAddress} from "./address-data";
import styles from "./live-catalog.module.css";

const fields:[keyof AddressFields,string,number][]=[["recipientName","نام گیرنده",200],["recipientPhone","شماره همراه گیرنده",32],["province","استان",100],["city","شهر",100],["postalCode","کدپستی",32],["fullAddress","نشانی کامل",2000]];
export default function CustomerAddressBookLive(){
  const [book,setBook]=useState<AddressBook|null>(null);
  const [form,setForm]=useState<AddressFields>({...emptyAddress});
  const [editing,setEditing]=useState<string|null>(null);
  const [makeDefault,setMakeDefault]=useState(false);
  const [loading,setLoading]=useState(true);
  const [working,setWorking]=useState(false);
  const [error,setError]=useState("");
  const busy=useRef(false);
  const load=useCallback(async(signal?:AbortSignal)=>{
    setLoading(true);setError("");
    try{const result=await requestAddressBook(undefined,{signal});if(!signal?.aborted)setBook(result);}
    catch(error){if(!signal?.aborted)setError(error instanceof Error?error.message:"اتصال برقرار نشد.");}
    finally{if(!signal?.aborted)setLoading(false);}
  },[]);
  useEffect(()=>{const controller=new AbortController();void load(controller.signal);return()=>controller.abort();},[load]);
  function reset(){setForm({...emptyAddress});setEditing(null);setMakeDefault(false);}
  function edit(address:CustomerAddress){setEditing(address.id);setForm({recipientName:address.recipientName,recipientPhone:address.recipientPhone,province:address.province,city:address.city,postalCode:address.postalCode,fullAddress:address.fullAddress});setMakeDefault(address.isDefault);}
  async function mutate(action:"save"|"delete"|"default",id?:string){
    if(!book||busy.current)return;
    busy.current=true;setWorking(true);setError("");
    const path="/api/customer/addresses"+(id?"/"+id:"")+(action==="default"?"/default":"");
    const payload=action==="save"?{version:book.version,...form,makeDefault}:{version:book.version};
    try{
      const result=await requestAddressBook(path,{method:action==="delete"?"DELETE":action==="save"&&!id?"POST":"PUT",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});
      setBook(result);
      if(action==="save"||id===editing)reset();
    }catch(error){setError(error instanceof Error?error.message:"نتیجهٔ ذخیره مشخص نیست. فهرست آدرس‌ها را تازه کنید.");setBook(null);}
    finally{busy.current=false;setWorking(false);}
  }
  const content=<>
    <div className="fg-641e585cf3" dir="rtl"><h1>آدرس‌های من</h1><Link href="/customer/cart">بازگشت به سبد خرید</Link></div>
    {loading&&<p role="status" className={styles.empty}>در حال دریافت آدرس‌ها…</p>}
    {error&&<div role="alert" className={styles.empty}><p>{error}</p><button disabled={working} onClick={()=>void load()}>تازه‌سازی آدرس‌ها</button></div>}
    {!loading&&book&&<section className="fg-bc05a3ea97">
      <div className="fg-1746f0535d" dir="rtl"><h2>آدرس‌های ذخیره‌شده</h2>
        {book.addresses.length===0&&<p>هنوز آدرسی ثبت نکرده‌اید.</p>}
        {book.addresses.map(address=><article className="fg-2372b0288f" key={address.id}><Link href={"/customer/checkout-review?addressId="+address.id}>بررسی سفارش با این آدرس</Link><h3>{address.recipientName}{address.isDefault&&" · پیش‌فرض"}</h3><p>{address.province}، {address.city}، {address.fullAddress}</p><p><bdi>{address.recipientPhone}</bdi> · <bdi>{address.postalCode}</bdi></p><div className={styles.cartControls}><button disabled={working} onClick={()=>edit(address)}>ویرایش</button><button disabled={working} onClick={()=>void mutate("delete",address.id)}>حذف</button><button disabled={working||address.isDefault} onClick={()=>void mutate("default",address.id)}>پیش‌فرض</button></div></article>)}
      </div>
      <form className={styles.addressForm} dir="rtl" onSubmit={event=>{event.preventDefault();void mutate("save",editing??undefined);}}>
        <h2>{editing?"ویرایش آدرس":"ثبت آدرس جدید"}</h2>
        <fieldset disabled={working||(!editing&&book.addresses.length>=20)}>
          {fields.map(([name,label,maxLength])=><label key={name} className={name==="fullAddress"||name==="postalCode"?styles.fullField:undefined}>{label}{name==="fullAddress"?<textarea required maxLength={maxLength} value={form[name]} onChange={event=>setForm(previous=>({...previous,[name]:event.target.value}))}/>:<input required maxLength={maxLength} inputMode={name==="postalCode"||name==="recipientPhone"?"tel":"text"} value={form[name]} onChange={event=>setForm(previous=>({...previous,[name]:event.target.value}))}/>}</label>)}
          <label className={styles.fullField}><input type="checkbox" disabled={editing!==null&&book.addresses.some(address=>address.id===editing&&address.isDefault)} checked={makeDefault} onChange={event=>setMakeDefault(event.target.checked)}/> آدرس پیش‌فرض</label>
          <button className={`fg-321947be2e ${styles.productLink}`} type="submit">{working?"در حال ذخیره…":"ذخیره آدرس"}</button>
        </fieldset>
        {editing&&<button disabled={working} type="button" onClick={reset}>لغو ویرایش</button>}
        {book.addresses.length>=20&&!editing&&<p>ظرفیت ۲۰ آدرس تکمیل شده است.</p>}
      </form>
    </section>}
  </>;
  return <CustomerLiveNavigation.Provider value={true}><main className={`customer-web-design ${styles.page}`} lang="fa" dir="ltr"><CustomerAddressBookWeb content={content}/></main></CustomerLiveNavigation.Provider>;
}
