"use client";

import "@fontsource-variable/vazirmatn";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { parseAddressBook, type AddressBook, type ShippingAddress } from "../customer-checkout/data";
import styles from "./live.module.css";

type Fields = Omit<ShippingAddress, "id" | "isDefault">;
const empty: Fields = { recipientName: "", recipientPhone: "", province: "", city: "", postalCode: "", fullAddress: "" };
const labels: Array<[keyof Fields, string]> = [["recipientName", "نام گیرنده"], ["recipientPhone", "شماره همراه"], ["province", "استان"], ["city", "شهر"], ["postalCode", "کد پستی"], ["fullAddress", "نشانی کامل"]];

export function CustomerAddressesLive() {
  const [book, setBook] = useState<AddressBook | null>(null);
  const [draft, setDraft] = useState<Fields>(empty);
  const [editingId, setEditingId] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/customer/addresses", { cache: "no-store" });
      if (response.status === 401) throw new Error("برای مدیریت نشانی‌ها، ابتدا وارد حساب مشتری شوید.");
      if (!response.ok) throw new Error("دفتر نشانی دریافت نشد.");
      const result = parseAddressBook(await response.json());
      if (!result) throw new Error("پاسخ دفتر نشانی معتبر نیست.");
      setBook(result);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با دفتر نشانی برقرار نشد."); }
    finally { setLoading(false); }
  }

  useEffect(() => { void load(); }, []);

  function startEdit(address: ShippingAddress) {
    setEditingId(address.id);
    setDraft({ recipientName: address.recipientName, recipientPhone: address.recipientPhone, province: address.province, city: address.city, postalCode: address.postalCode, fullAddress: address.fullAddress });
    setFormOpen(true); setMessage("");
  }

  function closeForm() { setEditingId(""); setDraft(empty); setFormOpen(false); }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!book || busy) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const editing = Boolean(editingId);
      const response = await fetch(editing ? `/api/customer/addresses/${editingId}` : "/api/customer/addresses", {
        method: editing ? "PUT" : "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ version: book.version, ...draft, ...(editing ? {} : { makeDefault: book.addresses.length === 0 }) })
      });
      if (response.status === 409) throw new Error("دفتر نشانی هم‌زمان تغییر کرده است. تازه‌سازی کنید و دوباره تلاش کنید.");
      if (response.status === 400) throw new Error("اطلاعات نشانی معتبر نیست؛ شماره همراه و کد پستی را بررسی کنید.");
      if (!response.ok) throw new Error("ذخیرهٔ نشانی انجام نشد.");
      const next = parseAddressBook(await response.json());
      if (!next) throw new Error("پاسخ دفتر نشانی معتبر نیست.");
      setBook(next); closeForm(); setMessage(editing ? "نشانی ویرایش شد." : "نشانی اضافه شد.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با دفتر نشانی برقرار نشد."); }
    finally { setBusy(false); }
  }

  async function mutate(id: string, action: "default" | "delete") {
    if (!book || busy) return;
    const address = book.addresses.find(item => item.id === id);
    if (!address) return;
    if (action === "delete" && !window.confirm(`نشانی «${address.city}، ${address.fullAddress.slice(0, 50)}» حذف شود؟`)) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const response = await fetch(action === "default" ? `/api/customer/addresses/${id}/default` : `/api/customer/addresses/${id}`, {
        method: action === "default" ? "PUT" : "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ version: book.version })
      });
      if (response.status === 409) throw new Error("دفتر نشانی هم‌زمان تغییر کرده است. تازه‌سازی کنید و دوباره تلاش کنید.");
      if (!response.ok) throw new Error("تغییر نشانی انجام نشد.");
      const next = parseAddressBook(await response.json());
      if (!next) throw new Error("پاسخ دفتر نشانی معتبر نیست.");
      setBook(next); setMessage(action === "default" ? "نشانی پیش‌فرض تغییر کرد." : "نشانی حذف شد.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با دفتر نشانی برقرار نشد."); }
    finally { setBusy(false); }
  }

  return <main className={styles.page} dir="rtl" lang="fa-IR">
    <header className={styles.header}><Link href="/customer/products" className={styles.brand}><img src="/brand/negarin-logo.png" alt="" width="42" height="42" /><span><strong>خانه نگارین</strong><small>روایتگر هنر اصیل ایرانی</small></span></Link><nav aria-label="ناوبری فروشگاه"><Link href="/customer/products">کشف آثار</Link><Link href="/customer/cart">سبد خرید</Link><Link href="/customer/orders">سفارش‌ها</Link></nav></header>
    <section className={styles.heading}><p>حساب مشتری</p><h1>دفتر نشانی‌ها</h1><span>نشانی‌ها برای تحویل سفارش استفاده می‌شوند. هر سفارش، تصویر نشانی زمان ثبت را نگه می‌دارد.</span></section>
    <section className={styles.content} aria-busy={loading || busy}>
      <div className={styles.toolbar}><div><strong>{book ? `${new Intl.NumberFormat("fa-IR").format(book.addresses.length)} از ۲۰ نشانی` : "نشانی‌های ذخیره‌شده"}</strong><small>نشانی پیش‌فرض هنگام تسویه پیشنهاد می‌شود.</small></div><div><button type="button" className={styles.secondary} disabled={loading || busy} onClick={() => void load()}>تازه‌سازی</button><button type="button" className={styles.primary} disabled={loading || busy || (book?.addresses.length ?? 0) >= 20} onClick={() => { setEditingId(""); setDraft(empty); setFormOpen(value => !value); setError(""); }}>{formOpen && !editingId ? "بستن فرم" : "افزودن نشانی"}</button></div></div>
      {loading && <p className={styles.notice}>در حال دریافت نشانی‌ها…</p>}
      {error && <p className={styles.error} role="alert">{error}{error.includes("وارد حساب") && <span> ورود واقعی مشتری هنوز به این صفحه متصل نشده است.</span>}</p>}
      {message && <p className={styles.success} role="status">{message}</p>}
      {!loading && book?.addresses.length === 0 && <div className={styles.empty}><strong>هنوز نشانی‌ای ثبت نشده است.</strong><span>برای ثبت سفارش، نشانی تحویل اضافه کنید.</span></div>}
      {!!book?.addresses.length && <div className={styles.list}>{book.addresses.map(address => <article className={styles.card} key={address.id}>
        <div className={styles.cardHeading}><div><h2>{address.recipientName}</h2><span>{address.province}، {address.city}</span></div>{address.isDefault && <span className={styles.badge}>پیش‌فرض</span>}</div>
        <p>{address.fullAddress}</p><div className={styles.details}><span>همراه: <bdi dir="ltr">{address.recipientPhone}</bdi></span><span>کد پستی: <bdi dir="ltr">{address.postalCode}</bdi></span></div>
        <div className={styles.actions}><button type="button" className={styles.linkButton} disabled={busy} onClick={() => startEdit(address)}>ویرایش</button>{!address.isDefault && <button type="button" className={styles.linkButton} disabled={busy} onClick={() => void mutate(address.id, "default")}>تنظیم به‌عنوان پیش‌فرض</button>}<button type="button" className={styles.deleteButton} disabled={busy} onClick={() => void mutate(address.id, "delete")}>حذف</button></div>
      </article>)}</div>}
      {formOpen && <form className={styles.form} onSubmit={event => void save(event)}><div className={styles.formHeading}><h2>{editingId ? "ویرایش نشانی" : "نشانی جدید"}</h2><button type="button" className={styles.close} disabled={busy} onClick={closeForm}>بستن</button></div>
        {labels.map(([key, label]) => <label key={key} className={key === "fullAddress" ? styles.full : ""}>{label}{key === "fullAddress" ? <textarea required maxLength={2000} rows={3} value={draft[key]} onChange={event => setDraft({ ...draft, [key]: event.target.value })} /> : <input required maxLength={key === "recipientName" ? 200 : key === "province" || key === "city" ? 100 : 32} inputMode={key === "recipientPhone" ? "tel" : key === "postalCode" ? "numeric" : undefined} dir={key === "recipientPhone" || key === "postalCode" ? "ltr" : undefined} value={draft[key]} onChange={event => setDraft({ ...draft, [key]: key === "postalCode" ? event.target.value.replace(/[^0-9۰-۹٠-٩]/g, "") : event.target.value })} />}</label>)}
        {!editingId && <label className={styles.checkbox}><input type="checkbox" checked={book?.addresses.length === 0} disabled={book?.addresses.length === 0} readOnly /> این نشانی به‌عنوان پیش‌فرض ثبت می‌شود</label>}
        <button type="submit" className={styles.primary} disabled={busy}>{busy ? "در حال ذخیره…" : editingId ? "ذخیرهٔ تغییرات" : "ذخیرهٔ نشانی"}</button>
      </form>}
    </section>
    <footer className={styles.footer}><Link href="/customer/checkout">بازگشت به تسویه</Link><span>نگارین · بازار آثار هنرمندان</span></footer>
  </main>;
}
