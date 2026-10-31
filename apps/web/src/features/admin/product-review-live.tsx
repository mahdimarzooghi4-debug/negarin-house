"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./product-review-live.module.css";

type Review = {
  id: string; title: string; description: string | null; publicationStatus: string; imageIds: string[];
  category: string | null; preparationTime: string | null; dimensions: string | null; materials: string | null; weight: string | null;
  color: string | null; technique: string | null; careInstructions: string | null; version: number; updatedAt: string;
  reviewKind: "initial" | "published-change";
};
type ReviewPage = { items: Review[]; hasMore: boolean; nextCursor: string | null };
type Grant = { id: string; role: string };
type SessionState = "loading" | "ready" | "choose" | "signed-out" | "forbidden" | "error";
type HistoryEvent = {
  id?: string; actorUserId?: string; actorRole?: string; requestId?: string;
  action: string; fromStatus: string; toStatus: string; version: number; reason: string | null; createdAt: string;
};

function isRecord(value: unknown): value is Record<string, unknown> { return !!value && typeof value === "object" && !Array.isArray(value); }
function isReview(value: unknown): value is Review {
  if (!isRecord(value)) return false;
  return typeof value.id === "string" && typeof value.title === "string" && (typeof value.description === "string" || value.description === null) &&
    typeof value.publicationStatus === "string" && Array.isArray(value.imageIds) && value.imageIds.every(id => typeof id === "string") &&
    ["category", "preparationTime", "dimensions", "materials", "weight", "color", "technique", "careInstructions"].every(key => typeof value[key] === "string" || value[key] === null) &&
    Number.isSafeInteger(value.version) && typeof value.updatedAt === "string" && ["initial", "published-change"].includes(value.reviewKind as string);
}
function isReviewPage(value: unknown): value is ReviewPage {
  return isRecord(value) && Array.isArray(value.items) && value.items.every(isReview) && typeof value.hasMore === "boolean" &&
    (typeof value.nextCursor === "string" || value.nextCursor === null) && value.hasMore === (value.nextCursor !== null);
}
function statusLabel(status: string) { return status === "under_review" ? "در انتظار بررسی" : status; }
function actorLabel(role: string) { return role === "staff" ? "کارشناس" : role === "artist" ? "هنرمند" : "کاربر"; }
function actionLabel(action: string) {
  return ({
    submit: "ارسال برای بررسی", approve: "تأیید محتوا", "request-changes": "درخواست اصلاح",
    publish: "انتشار عمومی", "change-submit": "ارسال تغییرات برای بررسی", "change-approved": "اعمال تغییرات تأییدشده",
    "change-requested-changes": "درخواست اصلاح تغییرات", "content-updated": "ویرایش محتوا",
    "change-content-updated": "ویرایش نسخهٔ پیشنهادی", "images-updated": "به‌روزرسانی تصاویر",
    "change-images-updated": "به‌روزرسانی تصاویر پیشنهادی"
  } as Record<string, string>)[action] ?? action;
}

export function AdminProductReviewLive() {
  const [session, setSession] = useState<SessionState>("loading");
  const [grants, setGrants] = useState<Grant[]>([]);
  const [items, setItems] = useState<Review[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selected, setSelected] = useState<Review | null>(null);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<HistoryEvent[]>([]);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadQueue = useCallback(async () => {
    setLoading(true); setError(""); setNextCursor(null);
    try {
      const response = await fetch("/api/admin/product-reviews", { cache: "no-store" });
      if (!response.ok) throw new Error(response.status === 401 ? "نشست معتبر نیست یا پایان یافته است." : response.status === 403 ? "دسترسی دامنهٔ محصولات برای این حساب صادر نشده است." : "صف بررسی محصولات دریافت نشد.");
      const data: unknown = await response.json();
      if (!isReviewPage(data)) throw new Error("ساختار صف بررسی محصولات معتبر نیست.");
      setItems(data.items);
      setNextCursor(data.nextCursor);
      setSelected(previous => previous ? data.items.find(item => item.id === previous.id) ?? null : null);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "خطای نامشخص"); }
    finally { setLoading(false); }
  }, []);

  async function loadNextQueuePage() {
    if (!nextCursor || loadingMore || loading) return;
    setLoadingMore(true); setError("");
    try {
      const response = await fetch(`/api/admin/product-reviews?cursor=${encodeURIComponent(nextCursor)}`, { cache: "no-store" });
      if (!response.ok) throw new Error(response.status === 401 ? "نشست معتبر نیست یا پایان یافته است." : response.status === 403 ? "دسترسی دامنهٔ محصولات برای این حساب صادر نشده است." : "صف بعدی بررسی محصولات دریافت نشد.");
      const data: unknown = await response.json();
      if (!isReviewPage(data)) throw new Error("ساختار صفحهٔ بعدی صف بررسی معتبر نیست.");
      setItems(previous => {
        const known = new Set(previous.map(item => item.id));
        return [...previous, ...data.items.filter(item => !known.has(item.id))];
      });
      setNextCursor(data.nextCursor);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "خطای نامشخص"); }
    finally { setLoadingMore(false); }
  }

  const loadSession = useCallback(async () => {
    setSession("loading"); setError("");
    try {
      const response = await fetch("/api/auth/context", { cache: "no-store" });
      if (response.ok) {
        const context: unknown = await response.json();
        if (!isRecord(context) || typeof context.activeRole !== "string") { setSession("error"); return; }
        if (context.activeRole === "staff") { setSession("ready"); return; }
      } else if (response.status !== 401) { setSession("error"); return; }
      const grantResponse = await fetch("/api/auth/grants", { cache: "no-store" });
      if (grantResponse.status === 401) { setSession("signed-out"); return; }
      if (!grantResponse.ok) { setSession("error"); return; }
      const body: unknown = await grantResponse.json();
      if (!isRecord(body) || !Array.isArray(body.grants)) { setSession("error"); return; }
      const staff = body.grants.filter((grant): grant is Grant => isRecord(grant) && typeof grant.id === "string" && grant.role === "staff");
      setGrants(staff); setSession(staff.length ? "choose" : "forbidden");
    } catch { setSession("error"); }
  }, []);

  useEffect(() => { void loadSession(); }, [loadSession]);
  useEffect(() => { if (session === "ready") void loadQueue(); }, [session, loadQueue]);

  useEffect(() => {
    let cancelled = false;
    async function loadImages() {
      setImageUrls({});
      if (!selected) { setHistory([]); return; }
      const historyPromise = fetch(`/api/admin/product-reviews/${selected.id}/history`, { cache: "no-store" })
        .then(async response => response.ok ? await response.json() as unknown : [])
        .catch(() => []);
      const imagePromises = selected.imageIds.map(async id => {
        const response = await fetch(`/api/admin/product-reviews/${selected.id}/images/${id}`, { cache: "no-store" });
        if (!response.ok) return [id, ""] as const;
        const result: unknown = await response.json();
        return [id, isRecord(result) && typeof result.url === "string" ? result.url : ""] as const;
      });
      const [events, images] = await Promise.all([historyPromise, Promise.all(imagePromises)]);
      if (cancelled) return;
      setImageUrls(Object.fromEntries(images.filter(([, url]) => !!url)));
      setHistory(Array.isArray(events) ? events.filter((event): event is HistoryEvent => isRecord(event) && typeof event.action === "string" && typeof event.fromStatus === "string" && typeof event.toStatus === "string" && Number.isSafeInteger(event.version) && (typeof event.reason === "string" || event.reason === null) && typeof event.createdAt === "string" &&
        (event.id === undefined || typeof event.id === "string") && (event.actorUserId === undefined || typeof event.actorUserId === "string") &&
        (event.actorRole === undefined || typeof event.actorRole === "string") && (event.requestId === undefined || typeof event.requestId === "string")) : []);
    }
    void loadImages();
    return () => { cancelled = true; };
  }, [selected]);

  async function chooseGrant(id: string) {
    setSession("loading");
    try { const response = await fetch("/api/auth/context", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ grantId: id }) }); if (!response.ok) throw new Error(); setSession("ready"); }
    catch { setError("فعال‌سازی دسترسی کارشناسی انجام نشد."); setSession("error"); }
  }

  async function decide(action: "approve" | "request-changes") {
    if (!selected || busy) return;
    if (action === "request-changes" && !reason.trim()) { setError("برای درخواست اصلاح، دلیل را وارد کنید."); return; }
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch(`/api/admin/product-reviews/${selected.id}/${action}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ version: selected.version, ...(action === "request-changes" ? { reason: reason.trim() } : {}) }) });
      if (!response.ok) throw new Error(response.status === 401 ? "نشست معتبر نیست یا پایان یافته است." : response.status === 403 ? "مجوز بررسی محصولات فعال نیست." : response.status === 409 ? "نسخه یا وضعیت محصول عوض شده است؛ صف را تازه کنید." : "ثبت نتیجهٔ بازبینی انجام نشد.");
      setNotice(action === "approve"
        ? selected.reviewKind === "published-change" ? "تغییرات تأیید و روی نسخهٔ منتشرشده اعمال شد." : "محتوا تأیید شد؛ انتشار عمومی همچنان باید جداگانه توسط هنرمند انجام شود."
        : selected.reviewKind === "published-change" ? "درخواست اصلاح ثبت شد؛ نسخهٔ عمومی فعلی بدون تغییر می‌ماند." : "درخواست اصلاح با دلیل ثبت شد.");
      setReason(""); setSelected(null); await loadQueue();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "خطای نامشخص"); }
    finally { setBusy(false); }
  }

  async function logout() { await fetch("/api/auth/session", { method: "DELETE" }); location.assign("/"); }

  return <main className={styles.page} dir="rtl" lang="fa-IR">
    <aside className={styles.sidebar}>
      <a className={styles.brand} href="/"><span className={styles.brandMark}>ن</span><strong>نگارین<small>مدیریت محتوا و بازار</small></strong></a>
      <nav aria-label="منوی مدیریت"><a className={styles.active} href="/admin/product-reviews">بررسی محصولات</a><a href="/admin/shipment-issues">رسیدگی به مشکلات سفارش</a><a href="/admin/refund-reviews">بررسی مالی بازپرداخت</a><a href="/admin/domestic-finance">صورت‌وضعیت سفارش‌ها</a><a href="/admin/service-reviews">بازبینی تحویل خدمات</a><a href="/admin/support-reviews">بازبینی ارجاع حمایتی</a><a href="/admin/support-reports">گزارش حمایت‌ها</a><a href="/admin/support-programs">مدیریت برنامه‌های حمایتی</a><a href="/admin/support-allocations">تخصیص اعتبار حمایتی</a><a href="/admin/corporate-purchase-requests">درخواست‌های خرید سازمانی</a><a href="/preview/admin">سایر بخش‌های پنل</a></nav>
      <button className={styles.logout} type="button" onClick={() => void logout()}>خروج امن</button>
    </aside>
    <section className={styles.main}>
      <header className={styles.header}><div><p>خانه نگارین / بازار</p><h1>بازبینی محتوای محصول</h1><span>قیمت هنرمند در این فرایند نمایش داده یا بررسی نمی‌شود.</span></div><span className={styles.badge}>اتصال زنده به API</span></header>
      {session === "loading" && <section className={styles.panel}>در حال بررسی نشست امن…</section>}
      {session === "signed-out" && <section className={styles.panel}><h2>ورود لازم است</h2><p>برای مشاهدهٔ صف بررسی محصولات، نشست معتبر پنل را فعال کنید.</p></section>}
      {session === "forbidden" && <section className={styles.panel}><h2>دسترسی کارشناسی موجود نیست</h2><p>این صفحه به نقش کارشناس و مجوز دامنهٔ محصولات نیاز دارد.</p></section>}
      {session === "choose" && <section className={styles.panel}><h2>انتخاب دسترسی کارشناسی</h2><p>برای ادامه یک دسترسی کارکنان را انتخاب کنید؛ مجوز محصولات در سرور بررسی می‌شود.</p><div className={styles.grants}>{grants.map(grant => <button key={grant.id} type="button" onClick={() => void chooseGrant(grant.id)}>فعال‌سازی دسترسی کارشناسی</button>)}</div></section>}
      {session === "error" && <section className={styles.panel}><p className={styles.error} role="alert">{error || "نشست کاربری قابل بررسی نیست."}</p><button type="button" onClick={() => void loadSession()}>تلاش دوباره</button></section>}
      {session === "ready" && <div className={styles.columns}>
        <section className={styles.panel}>
          <div className={styles.toolbar}><div><h2>صف بررسی</h2><p>موارد در انتظار تصمیم، به‌ترتیب زمان ورود به صف</p></div><button type="button" disabled={loading || loadingMore} onClick={() => void loadQueue()}>تازه‌سازی</button></div>
          {error && <p className={styles.error} role="alert">{error}</p>}{notice && <p className={styles.notice} role="status">{notice}</p>}{loading && <p className={styles.muted}>در حال دریافت صف…</p>}
          {!loading && items.length === 0 && <p className={styles.muted}>محصولی در انتظار بررسی نیست.</p>}
          <div className={styles.queue}>{items.map(item => <button key={item.id} type="button" className={styles.queueItem} onClick={() => { setSelected(item); setReason(""); setError(""); }} aria-current={selected?.id === item.id ? "true" : undefined}><strong>{item.title}</strong><span>{item.reviewKind === "published-change" ? "تغییر محصول منتشرشده · " : ""}{item.category || "بدون دسته‌بندی"} · {item.imageIds.length} تصویر</span><small>{statusLabel(item.publicationStatus)} · نسخهٔ {item.version}</small></button>)}</div>
          {nextCursor && <button type="button" disabled={loading || loadingMore} onClick={() => void loadNextQueuePage()}>{loadingMore ? "در حال دریافت…" : "نمایش موارد بعدی"}</button>}
        </section>
        <section className={styles.panel}>
          {!selected && <p className={styles.muted}>یک محصول را برای مشاهدهٔ محتوا، تصاویر و سابقه انتخاب کنید.</p>}
          {selected && <>
            <div className={styles.toolbar}><div><h2>{selected.title}</h2><p>نسخهٔ {selected.version} · آخرین تغییر {new Date(selected.updatedAt).toLocaleString("fa-IR")}</p></div><span className={styles.status}>{statusLabel(selected.publicationStatus)}</span></div>
            {selected.reviewKind === "published-change" && <p className={styles.notice}>این تغییر روی محصول منتشرشده بررسی می‌شود؛ نسخهٔ فعلی تا زمان تصمیم‌گیری برای مشتریان فعال می‌ماند.</p>}
            <section className={styles.content}><h3>{selected.reviewKind === "published-change" ? "شرح نسخهٔ پیشنهادی" : "شرح محصول"}</h3><p>{selected.description || "توضیحی ثبت نشده است."}</p></section>
            <section className={styles.content}><h3>تصاویر ({selected.imageIds.length})</h3>{selected.imageIds.length ? <div className={styles.gallery}>{selected.imageIds.map((id, index) => <figure key={id}>{imageUrls[id] ? <img src={imageUrls[id]} alt={`${selected.title} - تصویر ${index + 1}`} /> : <div className={styles.imagePending}>در حال دریافت تصویر…</div>}<figcaption>{index === 0 ? "تصویر اصلی" : `تصویر ${index + 1}`}</figcaption></figure>)}</div> : <p className={styles.muted}>تصویری ثبت نشده است.</p>}</section>
            <section className={styles.specs}><h3>مشخصات ثبت‌شده</h3><dl>{[["دسته‌بندی", selected.category], ["زمان آماده‌سازی", selected.preparationTime], ["ابعاد", selected.dimensions], ["مواد اولیه", selected.materials], ["وزن", selected.weight], ["رنگ", selected.color], ["تکنیک ساخت", selected.technique], ["روش نگهداری", selected.careInstructions]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value || "ثبت نشده"}</dd></div>)}</dl></section>
            <section className={styles.content}><h3>تاریخچهٔ بازبینی</h3>{history.length ? <ol className={styles.history}>{history.map(event => <li key={event.id ?? `${event.version}-${event.action}`}><strong>{actionLabel(event.action)}: {statusLabel(event.fromStatus)} ← {statusLabel(event.toStatus)}</strong><span>نسخهٔ {event.version} · {new Date(event.createdAt).toLocaleString("fa-IR")}</span>{event.actorUserId && <span>{actorLabel(event.actorRole ?? "")}: {event.actorUserId}{event.requestId ? ` · شناسهٔ پیگیری: ${event.requestId}` : ""}</span>}{event.reason && <p>{event.reason}</p>}</li>)}</ol> : <p className={styles.muted}>سابقه‌ای ثبت نشده است.</p>}</section>
            <section className={styles.decision}><label htmlFor="review-reason">دلیل درخواست اصلاح</label><textarea id="review-reason" maxLength={2000} value={reason} onChange={event => setReason(event.target.value)} placeholder="در صورت نیاز به اصلاح، موارد لازم را روشن بنویسید."/><div className={styles.actions}><button type="button" className={styles.approve} disabled={busy} onClick={() => void decide("approve")}>{busy ? "در حال ثبت…" : selected.reviewKind === "published-change" ? "تأیید و اعمال تغییرات" : "تأیید محتوا"}</button><button type="button" className={styles.requestChanges} disabled={busy || !reason.trim()} onClick={() => void decide("request-changes")}>درخواست اصلاح</button></div><p>{selected.reviewKind === "published-change" ? "با تأیید، نسخهٔ پیشنهادی روی محصول منتشرشده جایگزین می‌شود؛ در صورت اصلاح، نسخهٔ عمومی فعلی حفظ می‌شود." : "تأیید محتوا انتشار عمومی را انجام نمی‌دهد و قیمت محصول در اختیار هنرمند می‌ماند."}</p></section>
          </>}
        </section>
      </div>}
    </section>
  </main>;
}
