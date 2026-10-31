"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./live-orders.module.css";

type Step = "awaiting_acceptance" | "accepted" | "preparing" | "packaging" | "ready_for_dispatch";
type Line = { productId: string; title: string; quantity: number; unitPriceToman: string; imageIds: string[] };
type Shipment = { status: "reported_dispatched"; carrierName: string; trackingCode: string; reportedAt: string; carrierVerified: false };
type ArtistOrder = { orderId: string; status: Step; version: number; createdAt: string; updatedAt: string; merchandiseSubtotalToman: string; items: Line[]; shipment: Shipment | null; shippingAddress?: Record<string, string>; history?: Array<{ version: number; fromStatus: Step; toStatus: Step; createdAt: string }> };
type Grant = { id: string };
type Session = "loading" | "ready" | "choose" | "signed-out" | "forbidden" | "error";
type Page = { page: number; pageSize: number; hasMore: boolean; items: ArtistOrder[] };
const steps: Step[] = ["awaiting_acceptance", "accepted", "preparing", "packaging", "ready_for_dispatch"];
const titles: Record<Step, string> = { awaiting_acceptance: "در انتظار پذیرش", accepted: "پذیرفته‌شده", preparing: "در حال آماده‌سازی", packaging: "در حال بسته‌بندی", ready_for_dispatch: "آمادهٔ ارسال" };
const nextLabel: Record<Step, string> = { awaiting_acceptance: "پذیرش سفارش", accepted: "شروع آماده‌سازی", preparing: "انتقال به بسته‌بندی", packaging: "آماده برای ارسال", ready_for_dispatch: "" };
const uuid = (v: unknown): v is string => typeof v === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
function record(v: unknown): v is Record<string, unknown> { return !!v && typeof v === "object" && !Array.isArray(v); }
function isLine(v: unknown): v is Line { return record(v) && uuid(v.productId) && typeof v.title === "string" && Number.isSafeInteger(v.quantity) && (v.quantity as number) > 0 && typeof v.unitPriceToman === "string" && /^(0|[1-9]\d*)$/.test(v.unitPriceToman) && Array.isArray(v.imageIds) && v.imageIds.every(uuid); }
function parseOrder(v: unknown, detail = false): ArtistOrder | null {
  if (!record(v) || !uuid(v.orderId) || !steps.includes(v.status as Step) || !Number.isSafeInteger(v.version) || typeof v.createdAt !== "string" || typeof v.updatedAt !== "string" || typeof v.merchandiseSubtotalToman !== "string" || !/^(0|[1-9]\d*)$/.test(v.merchandiseSubtotalToman) || !Array.isArray(v.items) || !v.items.length || !v.items.every(isLine)) return null;
  let shipment: Shipment | null = null;
  if (v.shipment !== null) {
    if (!record(v.shipment) || v.shipment.status !== "reported_dispatched" || v.shipment.source !== "artist_report" || v.shipment.carrierVerified !== false || typeof v.shipment.carrierName !== "string" || typeof v.shipment.trackingCode !== "string" || typeof v.shipment.reportedAt !== "string") return null;
    shipment = { status: "reported_dispatched", carrierName: v.shipment.carrierName, trackingCode: v.shipment.trackingCode, reportedAt: v.shipment.reportedAt, carrierVerified: false };
  }
  let shippingAddress: Record<string, string> | undefined;
  let history: ArtistOrder["history"];
  if (detail) {
    const rawAddress = v.shippingAddress;
    if (!record(rawAddress) || ["recipientName", "recipientPhone", "province", "city", "postalCode", "fullAddress"].some(key => typeof rawAddress[key] !== "string") || !Array.isArray(v.history)) return null;
    shippingAddress = Object.fromEntries(["recipientName", "recipientPhone", "province", "city", "postalCode", "fullAddress"].map(key => [key, rawAddress[key] as string]));
    const events = v.history.map(event => record(event) && Number.isSafeInteger(event.version) && steps.includes(event.fromStatus as Step) && steps.includes(event.toStatus as Step) && typeof event.createdAt === "string" ? { version: event.version as number, fromStatus: event.fromStatus as Step, toStatus: event.toStatus as Step, createdAt: event.createdAt } : null);
    if (events.some(event => event === null)) return null;
    history = events as NonNullable<ArtistOrder["history"]>;
  }
  return { orderId: v.orderId, status: v.status as Step, version: v.version as number, createdAt: v.createdAt, updatedAt: v.updatedAt, merchandiseSubtotalToman: v.merchandiseSubtotalToman, items: v.items, shipment, ...(shippingAddress ? { shippingAddress } : {}), ...(history ? { history } : {}) };
}
function toman(value: string) { return `${new Intl.NumberFormat("fa-IR").format(BigInt(value))} تومان`; }
function date(value: string) { const parsed = new Date(value); return Number.isFinite(parsed.getTime()) ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(parsed) : "—"; }

export function ArtistOrdersLive() {
  const [session, setSession] = useState<Session>("loading");
  const [grants, setGrants] = useState<Grant[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState<Page | null>(null);
  const [selected, setSelected] = useState<ArtistOrder | null>(null);
  const [carrierName, setCarrierName] = useState("");
  const [trackingCode, setTrackingCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadSession = useCallback(async () => {
    setSession("loading");
    try {
      const active = await fetch("/api/auth/context", { cache: "no-store" });
      if (active.ok) {
        const context: unknown = await active.json();
        if (record(context) && context.activeRole === "artist") { setSession("ready"); return; }
      } else if (active.status !== 401) { setSession("error"); return; }
      const response = await fetch("/api/auth/grants", { cache: "no-store" });
      if (response.status === 401) { setSession("signed-out"); return; }
      if (!response.ok) { setSession("error"); return; }
      const body: unknown = await response.json();
      if (!record(body) || !Array.isArray(body.grants)) { setSession("error"); return; }
      const available = body.grants.filter((g): g is Grant => record(g) && typeof g.id === "string" && g.role === "artist");
      setGrants(available); setSession(available.length ? "choose" : "forbidden");
    } catch { setSession("error"); }
  }, []);
  useEffect(() => { void loadSession(); }, [loadSession]);

  const loadPage = useCallback(async () => {
    if (session !== "ready") return;
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/artist/orders?page=${pageNumber}&pageSize=10`, { cache: "no-store" });
      if (response.status === 401) throw new Error("نشست هنرمند معتبر نیست یا پایان یافته است.");
      if (response.status === 403) throw new Error("دسترسی هنرمند فعال نیست.");
      if (!response.ok) throw new Error("فهرست سفارش‌ها دریافت نشد.");
      const raw: unknown = await response.json();
      if (!record(raw) || raw.page !== pageNumber || raw.pageSize !== 10 || typeof raw.hasMore !== "boolean" || !Array.isArray(raw.items)) throw new Error("ساختار فهرست سفارش‌ها معتبر نیست.");
      const items = raw.items.map(value => parseOrder(value));
      if (items.some(item => !item)) throw new Error("اطلاعات سفارش دریافتی معتبر نیست.");
      setPage({ page: pageNumber, pageSize: 10, hasMore: raw.hasMore, items: items as ArtistOrder[] });
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با سرویس سفارش برقرار نشد."); }
    finally { setLoading(false); }
  }, [pageNumber, session]);
  useEffect(() => { void loadPage(); }, [loadPage]);

  async function openOrder(id: string) {
    setLoading(true); setSelected(null); setError(""); setNotice("");
    try {
      const response = await fetch(`/api/artist/orders/${id}`, { cache: "no-store" });
      if (response.status === 404) throw new Error("این سفارش برای حساب هنرمند شما در دسترس نیست.");
      if (!response.ok) throw new Error("جزئیات سفارش دریافت نشد.");
      const order = parseOrder(await response.json(), true);
      if (!order) throw new Error("پاسخ جزئیات سفارش معتبر نیست.");
      setSelected(order); setCarrierName(""); setTrackingCode("");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "خطای دریافت سفارش."); }
    finally { setLoading(false); }
  }

  async function command(action: "preparation" | "shipment") {
    if (!selected || busy) return;
    const next = steps[steps.indexOf(selected.status) + 1];
    if (action === "preparation" && !next) return;
    if (action === "shipment" && (!carrierName.trim() || !trackingCode.trim())) { setError("نام حمل‌کننده و کد رهگیری را کامل کنید."); return; }
    setBusy(true); setError(""); setNotice("");
    try {
      const body = action === "preparation" ? { version: selected.version, status: next } : { version: selected.version, carrierName: carrierName.trim(), trackingCode: trackingCode.trim() };
      const response = await fetch(`/api/artist/orders/${selected.orderId}/${action}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      if (response.status === 409) { await openOrder(selected.orderId); setNotice("وضعیت سفارش تغییر کرده است؛ آخرین وضعیت بارگیری شد."); return; }
      if (response.status === 401) throw new Error("نشست هنرمند معتبر نیست؛ دوباره وارد شوید.");
      if (!response.ok) throw new Error(action === "preparation" ? "تغییر مرحلهٔ آماده‌سازی انجام نشد." : "گزارش ارسال ثبت نشد.");
      const order = parseOrder(await response.json(), true);
      if (!order) throw new Error("عملیات انجام شد اما پاسخ سرور معتبر نیست؛ سفارش را دوباره باز کنید.");
      setSelected(order); setPage(current => current ? { ...current, items: current.items.map(item => item.orderId === order.orderId ? order : item) } : current);
      if (action === "shipment") { setCarrierName(""); setTrackingCode(""); }
      setNotice(action === "preparation" ? "مرحلهٔ آماده‌سازی ثبت شد." : "گزارش ارسال هنرمند ثبت شد.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با سرویس سفارش برقرار نشد."); }
    finally { setBusy(false); }
  }

  async function chooseGrant(id: string) {
    setSession("loading"); setError("");
    try {
      const response = await fetch("/api/auth/context", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ grantId: id }) });
      if (!response.ok) throw new Error();
      setSession("ready");
    } catch { setError("فعال‌سازی دسترسی هنرمند انجام نشد."); setSession("error"); }
  }
  async function logout() { await fetch("/api/auth/session", { method: "DELETE" }); location.assign("/"); }

  return <main className={styles.page} dir="rtl" lang="fa-IR">
    <aside className={styles.sidebar}><a className={styles.brand} href="/artist/storefront"><span>ن</span><strong>نگارین<small>پنل هنرمند</small></strong></a><nav aria-label="منوی هنرمند"><a href="/artist/storefront">فروشگاه من</a><a href="/artist/products">محصولات</a><a className={styles.active} href="/artist/orders" aria-current="page">سفارش‌ها</a><a href="/artist/corporate-orders">سفارش‌های سازمانی</a><a href="/artist/growth">رشد من</a><a href="/artist/services">خدمات</a><a href="/artist/finance">مالی</a><a href="/preview/artist">پیش‌نمایش سایر بخش‌ها</a></nav><button type="button" className={styles.logout} onClick={() => void logout()}>خروج امن</button></aside>
    <section className={styles.main}><header className={styles.header}><div><p>خانه نگارین / فروشگاه من</p><h1>سفارش‌های هنرمند</h1><span>فقط سفارش‌های پرداخت‌شده و متعلق به حساب فعال نمایش داده می‌شوند.</span></div><span className={styles.badge}>اتصال زنده به API</span></header>
      {session === "loading" && <section className={styles.panel}>در حال بررسی نشست امن…</section>}
      {session === "signed-out" && <section className={styles.panel}><h2>ورود لازم است</h2><p>برای دیدن سفارش‌ها، نشست معتبر هنرمند لازم است.</p></section>}
      {session === "forbidden" && <section className={styles.panel}><h2>دسترسی هنرمند موجود نیست</h2><p>در نشست فعال حساب هنرمند در دسترس نیست.</p></section>}
      {session === "choose" && <section className={styles.panel}><h2>انتخاب حساب هنرمند</h2><p>برای دیدن سفارش‌ها، دسترسی هنرمند را انتخاب کنید.</p><div className={styles.grants}>{grants.map(grant => <button key={grant.id} type="button" onClick={() => void chooseGrant(grant.id)}>فعال‌سازی حساب هنرمند</button>)}</div></section>}
      {session === "error" && <section className={styles.panel}><p className={styles.error} role="alert">{error || "نشست کاربری قابل بررسی نیست."}</p><button type="button" onClick={() => void loadSession()}>تلاش دوباره</button></section>}
      {session === "ready" && <div className={styles.layout}>
        <section className={styles.panel}><div className={styles.toolbar}><div><h2>سفارش‌های پرداخت‌شده</h2><p>{page ? `${page.items.length} سفارش در این صفحه` : "فهرست حساب شما"}</p></div><button type="button" disabled={loading} onClick={() => void loadPage()}>تازه‌سازی</button></div>{error && <p className={styles.error} role="alert">{error}</p>}{notice && <p className={styles.notice} role="status">{notice}</p>}{loading && <p className={styles.muted}>در حال دریافت سفارش‌ها…</p>}{!loading && !error && page?.items.length === 0 && <p className={styles.muted}>سفارش پرداخت‌شده‌ای برای نمایش وجود ندارد.</p>}
          <div className={styles.orderList}>{page?.items.map(order => <button type="button" key={order.orderId} className={styles.orderCard} aria-current={selected?.orderId === order.orderId ? "true" : undefined} onClick={() => void openOrder(order.orderId)}><strong>{order.items.map(item => item.title).join("، ")}</strong><span>{titles[order.status]} · {order.items.reduce((sum, item) => sum + item.quantity, 0)} کالا</span><small>{date(order.createdAt)} · {toman(order.merchandiseSubtotalToman)}</small></button>)}</div>
          {page && (pageNumber > 1 || page.hasMore) && <div className={styles.pagination}><button type="button" disabled={loading || pageNumber <= 1} onClick={() => setPageNumber(n => Math.max(1, n - 1))}>صفحهٔ قبل</button><span>{new Intl.NumberFormat("fa-IR").format(pageNumber)}</span><button type="button" disabled={loading || !page.hasMore || pageNumber >= 1000} onClick={() => setPageNumber(n => n + 1)}>صفحهٔ بعد</button></div>}
        </section>
        <section className={styles.panel}>{!selected && <p className={styles.muted}>برای مشاهدهٔ جزئیات و به‌روزرسانی آماده‌سازی، یک سفارش را انتخاب کنید.</p>}{selected && <>
          <div className={styles.toolbar}><div><h2>جزئیات سفارش</h2><p><bdi dir="ltr">{selected.orderId}</bdi></p></div><span className={styles.status}>{titles[selected.status]}</span></div>
          <div className={styles.orderInfo}><span>ثبت سفارش: {date(selected.createdAt)}</span><strong>{toman(selected.merchandiseSubtotalToman)}</strong></div>
          <section className={styles.section}><h3>اقلام متعلق به شما</h3><div className={styles.lines}>{selected.items.map(item => <div key={item.productId}><span>{item.title} × {new Intl.NumberFormat("fa-IR").format(item.quantity)}</span><strong>{toman((BigInt(item.unitPriceToman) * BigInt(item.quantity)).toString())}</strong></div>)}</div></section>
          {selected.shippingAddress && <section className={styles.section}><h3>نشانی تحویل</h3><p>{selected.shippingAddress.recipientName} · <bdi dir="ltr">{selected.shippingAddress.recipientPhone}</bdi></p><p>{selected.shippingAddress.province}، {selected.shippingAddress.city}، {selected.shippingAddress.fullAddress}</p><p>کد پستی: <bdi dir="ltr">{selected.shippingAddress.postalCode}</bdi></p></section>}
          {selected.history && <section className={styles.section}><h3>تاریخچهٔ آماده‌سازی</h3>{selected.history.length ? <ol className={styles.history}>{selected.history.map(event => <li key={event.version}><strong>{titles[event.toStatus]}</strong><span>نسخهٔ {event.version} · {date(event.createdAt)}</span></li>)}</ol> : <p className={styles.muted}>تغییری ثبت نشده است.</p>}</section>}
          {selected.shipment ? <section className={styles.shipment}><h3>گزارش ارسال ثبت شده</h3><p>حمل‌کننده: {selected.shipment.carrierName}</p><p>کد رهگیری: <bdi dir="ltr">{selected.shipment.trackingCode}</bdi></p><small>گزارش در {date(selected.shipment.reportedAt)} ثبت شده و از حمل‌کننده تأیید نشده است.</small></section> : <>
            {selected.status !== "ready_for_dispatch" && <div className={styles.actions}><button type="button" className={styles.primary} disabled={busy} onClick={() => void command("preparation")}>{busy ? "در حال ثبت…" : nextLabel[selected.status]}</button><small>هر سفارش فقط به مرحلهٔ بعدی منتقل می‌شود.</small></div>}
            {selected.status === "ready_for_dispatch" && <form className={styles.dispatchForm} onSubmit={event => { event.preventDefault(); void command("shipment"); }}><h3>ثبت گزارش ارسال</h3><label>نام حمل‌کننده<input required maxLength={100} value={carrierName} onChange={event => setCarrierName(event.target.value)} placeholder="مثلاً پست" /></label><label>کد رهگیری<input required maxLength={100} dir="ltr" value={trackingCode} onChange={event => setTrackingCode(event.target.value)} placeholder="کد رهگیری" /></label><small>این گزارش اعلام هنرمند است و دریافت شرکت حمل‌ونقل را تأیید نمی‌کند.</small><button type="submit" className={styles.primary} disabled={busy}>{busy ? "در حال ثبت…" : "ثبت ارسال"}</button></form>}
          </>}
        </>}</section>
      </div>}
    </section>
  </main>;
}
