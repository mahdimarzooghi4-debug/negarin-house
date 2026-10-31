"use client";

import "@fontsource-variable/vazirmatn";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { parseCustomerCart, type CustomerCart, formatMarketplaceToman } from "../customer-marketplace/data";
import { parseAddressBook, parseCustomerOrder, formatToman, type AddressBook, type CustomerOrder } from "./data";
import styles from "./live.module.css";

type AddressDraft = Omit<ShippingAddressFields, never>;
type ShippingAddressFields = { recipientName: string; recipientPhone: string; province: string; city: string; postalCode: string; fullAddress: string };
const emptyDraft: AddressDraft = { recipientName: "", recipientPhone: "", province: "", city: "", postalCode: "", fullAddress: "" };

export function CustomerCheckoutLive() {
  const [cart, setCart] = useState<CustomerCart | null>(null);
  const [book, setBook] = useState<AddressBook | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [draft, setDraft] = useState<AddressDraft>(emptyDraft);
  const [showForm, setShowForm] = useState(false);
  const [order, setOrder] = useState<CustomerOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingAddress, setSavingAddress] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const pendingCommand = useRef<Record<string, unknown> | null>(null);

  async function load(signal?: AbortSignal) {
    setLoading(true); setError("");
    try {
      const [cartResponse, addressResponse] = await Promise.all([
        fetch("/api/customer/cart", { cache: "no-store", signal }),
        fetch("/api/customer/addresses", { cache: "no-store", signal })
      ]);
      if (cartResponse.status === 401 || addressResponse.status === 401) throw new Error("برای ثبت سفارش، ابتدا وارد حساب مشتری شوید.");
      if (!cartResponse.ok || !addressResponse.ok) throw new Error("اطلاعات خرید و نشانی دریافت نشد.");
      const nextCart = parseCustomerCart(await cartResponse.json());
      const nextBook = parseAddressBook(await addressResponse.json());
      if (!nextCart || !nextBook) throw new Error("پاسخ اطلاعات خرید معتبر نیست.");
      setCart(nextCart); setBook(nextBook);
      setSelectedId(current => nextBook.addresses.some(address => address.id === current) ? current : (nextBook.addresses.find(address => address.isDefault) ?? nextBook.addresses[0])?.id ?? "");
    } catch (cause) {
      if (!signal?.aborted) setError(cause instanceof Error ? cause.message : "ارتباط با سرویس خرید برقرار نشد.");
    } finally { if (!signal?.aborted) setLoading(false); }
  }

  useEffect(() => { const controller = new AbortController(); void load(controller.signal); return () => controller.abort(); }, []);

  async function addAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!book || savingAddress || pendingCommand.current) return;
    setSavingAddress(true); setError("");
    try {
      const response = await fetch("/api/customer/addresses", { method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ version: book.version, ...draft, makeDefault: book.addresses.length === 0 }) });
      if (response.status === 409) throw new Error("دفتر نشانی تغییر کرده است؛ اطلاعات را تازه‌سازی و دوباره ثبت کنید.");
      if (!response.ok) throw new Error(response.status === 400 ? "اطلاعات نشانی کامل یا معتبر نیست." : "ثبت نشانی انجام نشد.");
      const next = parseAddressBook(await response.json());
      if (!next) throw new Error("پاسخ دفتر نشانی معتبر نیست.");
      const priorIds = new Set(book.addresses.map(address => address.id));
      const created = next.addresses.find(address => !priorIds.has(address.id));
      setBook(next); setSelectedId(created?.id ?? (next.addresses.find(address => address.isDefault) ?? next.addresses[0])?.id ?? "");
      setDraft(emptyDraft); setShowForm(false);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با دفتر نشانی برقرار نشد."); }
    finally { setSavingAddress(false); }
  }

  async function placeOrder() {
    if (!cart || !book || !selectedId || !cart.canCheckout || submitting) return;
    if (!pendingCommand.current) pendingCommand.current = {
      cartVersion: cart.version, addressBookVersion: book.version, addressId: selectedId,
      idempotencyKey: crypto.randomUUID(), expectedSubtotalToman: cart.subtotalToman
    };
    setSubmitting(true); setError("");
    let refreshAfterFailure = false;
    try {
      const response = await fetch("/api/customer/orders", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(pendingCommand.current) });
      if (response.status === 409) {
        pendingCommand.current = null;
        refreshAfterFailure = true;
        throw new Error("قیمت، موجودی یا سبد تغییر کرده است. اطلاعات تازه شد؛ مبلغ و نشانی را دوباره بررسی و ثبت کنید.");
      }
      if (response.status === 401) { pendingCommand.current = null; throw new Error("نشست مشتری معتبر نیست؛ دوباره وارد شوید."); }
      if (!response.ok) { pendingCommand.current = null; throw new Error("ثبت سفارش انجام نشد؛ اطلاعات را بررسی و دوباره تلاش کنید."); }
      const saved = parseCustomerOrder(await response.json());
      if (!saved) throw new Error("سفارش ثبت شد، اما پاسخ برای نمایش معتبر نیست. برای بازیابی نتیجه همین صفحه را تازه‌سازی کنید.");
      setOrder(saved); pendingCommand.current = null;
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "ارتباط قطع شد؛ برای بازیابی نتیجه سفارش دوباره تلاش کنید.";
      if (refreshAfterFailure) await load();
      setError(message);
    } finally { setSubmitting(false); }
  }

  const currentAddress = book?.addresses.find(address => address.id === selectedId);
  return <main className={styles.page} dir="rtl" lang="fa-IR">
    <header className={styles.header}><Link href="/customer/products" className={styles.brand}><img src="/brand/negarin-logo.png" alt="" width="42" height="42" /><span><strong>خانه نگارین</strong><small>روایتگر هنر اصیل ایرانی</small></span></Link><nav><Link href="/customer/products">کشف آثار</Link><Link href="/customer/cart">سبد خرید</Link><Link href="/customer/orders">سفارش‌ها</Link></nav></header>
    <section className={styles.heading}><p>بازار نگارین</p><h1>{order ? "سفارش ثبت شد" : "نشانی و ثبت سفارش"}</h1><span>مبلغ این مرحله فقط جمع کالاهاست؛ پرداخت و هزینهٔ ارسال در این مرحله انجام نمی‌شود.</span></section>
    {loading && <p className={styles.notice}>در حال دریافت سبد و نشانی‌ها…</p>}
    {error && <p className={styles.error} role="alert">{error}{error.includes("وارد حساب") && <span> ورود واقعی مشتری هنوز به این صفحه متصل نشده است.</span>}</p>}
    {!loading && !order && cart && book && <>
      {!cart.items.length && <p className={styles.error}>سبد خرید خالی است. <Link href="/customer/products">بازگشت به کشف آثار</Link></p>}
      {!!cart.items.length && <div className={styles.layout}>
        <section className={styles.addressSection}>
          <div className={styles.sectionHeading}><div><small>مرحلهٔ ۱</small><h2>نشانی تحویل</h2></div><button type="button" className={styles.secondary} disabled={!!pendingCommand.current || book.addresses.length >= 20} onClick={() => setShowForm(value => !value)}>{showForm ? "بستن فرم" : "افزودن نشانی"}</button></div>
          {book.addresses.length > 0 ? <div className={styles.addressList}>{book.addresses.map(address => <label className={styles.addressCard} data-selected={selectedId === address.id} key={address.id}>
            <input type="radio" name="shipping-address" value={address.id} checked={selectedId === address.id} disabled={!!pendingCommand.current} onChange={() => setSelectedId(address.id)} />
            <span><strong>{address.recipientName}</strong>{address.isDefault && <em>نشانی پیش‌فرض</em>}<small>{address.province}، {address.city} · {address.recipientPhone}</small><small>{address.fullAddress}</small><small>کد پستی: {address.postalCode}</small></span>
          </label>)}</div> : <p className={styles.notice}>برای ادامه، یک نشانی تحویل اضافه کنید.</p>}
          {showForm && <form className={styles.addressForm} onSubmit={event => void addAddress(event)}>
            <label>نام گیرنده<input required maxLength={200} value={draft.recipientName} onChange={event => setDraft({ ...draft, recipientName: event.target.value })} /></label>
            <label>شماره همراه<input required inputMode="tel" dir="ltr" maxLength={32} placeholder="۰۹۱۲۳۴۵۶۷۸۹" value={draft.recipientPhone} onChange={event => setDraft({ ...draft, recipientPhone: event.target.value })} /></label>
            <label>استان<input required maxLength={100} value={draft.province} onChange={event => setDraft({ ...draft, province: event.target.value })} /></label>
            <label>شهر<input required maxLength={100} value={draft.city} onChange={event => setDraft({ ...draft, city: event.target.value })} /></label>
            <label>کد پستی<input required inputMode="numeric" dir="ltr" maxLength={10} value={draft.postalCode} onChange={event => setDraft({ ...draft, postalCode: event.target.value.replace(/[^0-9۰-۹٠-٩]/g, "") })} /></label>
            <label className={styles.full}>نشانی کامل<textarea required maxLength={2000} rows={3} value={draft.fullAddress} onChange={event => setDraft({ ...draft, fullAddress: event.target.value })} /></label>
            <button type="submit" className={styles.primary} disabled={savingAddress || !!pendingCommand.current}>{savingAddress ? "در حال ثبت…" : "ذخیرهٔ نشانی"}</button>
          </form>}
          {currentAddress && <p className={styles.snapshotNote}>همین نشانی پس از ثبت، به‌صورت snapshot سفارش ذخیره می‌شود.</p>}
        </section>
        <aside className={styles.summary}><div className={styles.sectionHeading}><div><small>مرحلهٔ ۲</small><h2>مرور سفارش</h2></div></div>
          <ul>{cart.items.map(item => <li key={item.productId}><span>{item.product?.title ?? "اثر"} × {new Intl.NumberFormat("fa-IR").format(item.quantity)}</span><strong>{item.lineSubtotalToman ? formatMarketplaceToman(item.lineSubtotalToman) : "—"}</strong></li>)}</ul>
          <div className={styles.total}><span>جمع کالاها</span><strong>{cart.subtotalToman ? formatMarketplaceToman(cart.subtotalToman) : "—"}</strong></div>
          <p>با ثبت سفارش، موجودی کالاها برای ۳۰ دقیقه رزرو می‌شود. این کار پرداخت را انجام نمی‌دهد.</p>
          <button type="button" className={styles.primary} disabled={!cart.canCheckout || !currentAddress || submitting || !cart.subtotalToman} onClick={() => void placeOrder()}>{submitting ? "در حال ثبت سفارش…" : pendingCommand.current ? "تلاش دوباره برای بازیابی نتیجه" : "ثبت سفارش و رزرو کالاها"}</button>
          {!cart.canCheckout && <small className={styles.hint}>برای ثبت، همهٔ کالاها باید موجود باشند.</small>}
          {!book.addresses.length && <small className={styles.hint}>ابتدا نشانی تحویل را اضافه کنید.</small>}
        </aside>
      </div>}
    </>}
    {!loading && order && <section className={styles.confirmation}><div className={styles.confirmIcon}>✓</div><h2>سفارش شما برای ۳۰ دقیقه رزرو شد.</h2><p>شناسهٔ سفارش: <bdi dir="ltr">{order.id}</bdi></p><p>وضعیت پرداخت: پرداخت‌نشده</p><div className={styles.total}><span>جمع کالاها</span><strong>{formatToman(order.subtotalToman)}</strong></div><p>مهلت رزرو: {new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(order.reservedUntil))}</p><div className={styles.orderItems}>{order.items.map(item => <div key={item.productId}><span>{item.title} × {new Intl.NumberFormat("fa-IR").format(item.quantity)}</span><strong>{formatToman(item.lineSubtotalToman)}</strong></div>)}</div><Link href="/customer/products" className={styles.primary}>بازگشت به فروشگاه</Link></section>}
    <footer className={styles.footer}><Link href="/customer/cart">بازگشت به سبد</Link><span>نگارین · بازار آثار هنرمندان</span></footer>
  </main>;
}
