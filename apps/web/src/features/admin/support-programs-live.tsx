"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./product-review-live.module.css";

type Program = { id: string; source: "negarin_csr" | "supporting_organization"; organizationId: string | null; title: string; description: string; rules: string; createdAt: string };
type Page = { page: number; pageSize: number; hasMore: boolean; items: Program[] };
type Candidate = { artistUserId: string; storeName: string; shortIntro: string };
type Grant = { id: string };
type Session = "loading" | "ready" | "choose" | "signed-out" | "forbidden" | "error";
const isRecord = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);
const isUuid = (value: unknown): value is string => typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
function parsePage(value: unknown, page: number): Page | null {
  if (!isRecord(value) || value.page !== page || value.pageSize !== 20 || typeof value.hasMore !== "boolean" || !Array.isArray(value.items)) return null;
  const items = value.items.map(row => {
    if (!isRecord(row) || !isUuid(row.id) || !["negarin_csr", "supporting_organization"].includes(String(row.source)) || !(isUuid(row.organizationId) || row.organizationId === null) || typeof row.title !== "string" || typeof row.description !== "string" || typeof row.rules !== "string" || typeof row.createdAt !== "string") return null;
    return row as unknown as Program;
  });
  return items.some(row => row === null) ? null : { page, pageSize: 20, hasMore: value.hasMore, items: items as Program[] };
}
const date = (value: string) => { const parsed = new Date(value); return Number.isFinite(parsed.getTime()) ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" }).format(parsed) : "—"; };

export function AdminSupportProgramsLive() {
  const [session, setSession] = useState<Session>("loading"); const [grants, setGrants] = useState<Grant[]>([]); const [data, setData] = useState<Page | null>(null); const [pageNumber, setPageNumber] = useState(1);
  const [title, setTitle] = useState(""); const [description, setDescription] = useState(""); const [rules, setRules] = useState(""); const [saving, setSaving] = useState(false); const [loading, setLoading] = useState(false); const [error, setError] = useState(""); const [notice, setNotice] = useState("");
  const [assigningProgramId, setAssigningProgramId] = useState(""); const [artistQuery, setArtistQuery] = useState(""); const [candidates, setCandidates] = useState<Candidate[]>([]); const [searchingArtists, setSearchingArtists] = useState(false); const [assigningArtistId, setAssigningArtistId] = useState("");
  const loadSession = useCallback(async () => {
    setSession("loading");
    try {
      const current = await fetch("/api/auth/context", { cache: "no-store" });
      if (current.ok) { const context: unknown = await current.json(); if (!isRecord(context) || typeof context.activeRole !== "string") { setSession("error"); return; } if (context.activeRole === "staff") { setSession("ready"); return; } }
      else if (current.status !== 401) { setSession("error"); return; }
      const response = await fetch("/api/auth/grants", { cache: "no-store" }); if (response.status === 401) { setSession("signed-out"); return; } if (!response.ok) { setSession("error"); return; }
      const body: unknown = await response.json(); if (!isRecord(body) || !Array.isArray(body.grants)) { setSession("error"); return; }
      const staff = body.grants.filter((grant): grant is Grant => isRecord(grant) && typeof grant.id === "string" && grant.role === "staff"); setGrants(staff); setSession(staff.length ? "choose" : "forbidden");
    } catch { setSession("error"); }
  }, []);
  useEffect(() => { void loadSession(); }, [loadSession]);
  const loadData = useCallback(async () => {
    if (session !== "ready") return;
    setLoading(true); setError("");
    try { const response = await fetch(`/api/admin/support-programs?page=${pageNumber}&pageSize=20`, { cache: "no-store" }); if (response.status === 401) throw new Error("نشست کارشناسی معتبر نیست یا پایان یافته است."); if (response.status === 403) throw new Error("برای مدیریت برنامه‌ها مجوز دامنهٔ هنرمندان لازم است."); if (!response.ok) throw new Error("فهرست برنامه‌ها دریافت نشد."); const parsed = parsePage(await response.json(), pageNumber); if (!parsed) throw new Error("ساختار فهرست برنامه‌ها معتبر نیست."); setData(parsed); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با سرویس برقرار نشد."); }
    finally { setLoading(false); }
  }, [pageNumber, session]);
  useEffect(() => { void loadData(); }, [loadData]);
  async function chooseGrant(id: string) { setSession("loading"); setError(""); try { const response = await fetch("/api/auth/context", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ grantId: id }) }); if (!response.ok) throw new Error(); setSession("ready"); } catch { setError("فعال‌سازی دسترسی کارشناسی انجام نشد."); setSession("error"); } }
  async function createProgram(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setError(""); setNotice("");
    try { const response = await fetch("/api/admin/support-programs", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ idempotencyKey: globalThis.crypto.randomUUID(), title, description, rules }) }); if (response.status === 403) throw new Error("مجوز ساخت برنامهٔ حمایتی ندارید."); if (!response.ok) throw new Error("ثبت برنامه انجام نشد؛ اطلاعات را بررسی و دوباره تلاش کنید."); setTitle(""); setDescription(""); setRules(""); setPageNumber(1); setNotice("برنامهٔ حمایتی نگارین ثبت شد."); if (pageNumber === 1) await loadData(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با سرویس برقرار نشد."); }
    finally { setSaving(false); }
  }
  async function searchArtists(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (artistQuery.trim().length < 2) return; setSearchingArtists(true); setError("");
    try { const response = await fetch(`/api/admin/support-artists?q=${encodeURIComponent(artistQuery.trim())}&page=1&pageSize=10`, { cache: "no-store" }); if (!response.ok) throw new Error("جست‌وجوی هنرمندان انجام نشد."); const result: unknown = await response.json(); if (!isRecord(result) || !Array.isArray(result.items)) throw new Error("ساختار فهرست هنرمندان معتبر نیست."); const parsed = result.items.filter((row): row is Candidate => isRecord(row) && isUuid(row.artistUserId) && typeof row.storeName === "string" && typeof row.shortIntro === "string"); setCandidates(parsed); if (!parsed.length) setNotice("هنرمندی با این عبارت پیدا نشد."); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با سرویس هنرمندان برقرار نشد."); }
    finally { setSearchingArtists(false); }
  }
  async function assignArtist(programId: string, artistUserId: string) {
    setAssigningArtistId(artistUserId); setError(""); setNotice("");
    try { const response = await fetch(`/api/admin/support-programs/${programId}/relationships`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ artistUserId }) }); if (response.status === 404) throw new Error("برنامه یا هنرمند در دسترس نیست."); if (!response.ok) throw new Error("اتصال هنرمند به برنامه انجام نشد."); setNotice("هنرمند به برنامه متصل شد و برای تأیید نهایی به صف بازبینی ارجاع شد."); setCandidates([]); setArtistQuery(""); setAssigningProgramId(""); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "اتصال هنرمند انجام نشد."); }
    finally { setAssigningArtistId(""); }
  }
  async function logout() { await fetch("/api/auth/session", { method: "DELETE" }); location.assign("/"); }
  return <main className={styles.page} dir="rtl" lang="fa-IR"><aside className={styles.sidebar}><a className={styles.brand} href="/"><span className={styles.brandMark}>ن</span><strong>نگارین<small>مدیریت محتوا و بازار</small></strong></a><nav aria-label="منوی مدیریت"><a href="/admin/product-reviews">بررسی محصولات</a><a href="/admin/shipment-issues">رسیدگی به مشکلات سفارش</a><a href="/admin/refund-reviews">بررسی مالی بازپرداخت</a><a href="/admin/domestic-finance">صورت‌وضعیت سفارش‌ها</a><a href="/admin/service-reviews">بازبینی تحویل خدمات</a><a href="/admin/support-reviews">بازبینی ارجاع حمایتی</a><a href="/admin/support-reports">گزارش حمایت‌ها</a><a className={styles.active} href="/admin/support-programs" aria-current="page">مدیریت برنامه‌های حمایتی</a><a href="/admin/corporate-purchase-requests">درخواست‌های خرید سازمانی</a><a href="/preview/admin">سایر بخش‌های پنل</a></nav><button className={styles.logout} type="button" onClick={() => void logout()}>خروج امن</button></aside>
    <section className={styles.main}><header className={styles.header}><div><p>خانه نگارین / حمایت‌ها</p><h1>مدیریت برنامه‌های حمایتی</h1><span>ساخت و مشاهدهٔ برنامه‌های حمایتی نگارین</span></div><span className={styles.badge}>اتصال زنده به API</span></header>
      {session === "loading" && <section className={styles.panel}>در حال بررسی نشست امن…</section>}{session === "signed-out" && <section className={styles.panel}><h2>ورود لازم است</h2><p>برای مدیریت برنامه‌ها، نشست کارشناسی لازم است.</p></section>}{session === "forbidden" && <section className={styles.panel}><h2>دسترسی کارشناسی موجود نیست</h2><p>این صفحه به نقش کارشناس و مجوز دامنهٔ هنرمندان نیاز دارد.</p></section>}{session === "choose" && <section className={styles.panel}><h2>انتخاب دسترسی کارشناسی</h2><p>مجوز دسترسی در سرور بررسی می‌شود.</p><div className={styles.grants}>{grants.map(grant => <button key={grant.id} type="button" onClick={() => void chooseGrant(grant.id)}>فعال‌سازی دسترسی</button>)}</div></section>}{session === "error" && <section className={styles.panel}><p className={styles.error} role="alert">{error || "نشست کاربری قابل بررسی نیست."}</p><button type="button" onClick={() => void loadSession()}>تلاش دوباره</button></section>}
      {session === "ready" && <>{error && <p className={styles.error} role="alert">{error}</p>}{notice && <p role="status">{notice}</p>}<section className={styles.panel}><h2>ساخت برنامهٔ نگارین</h2><p>برنامه برای هنرمندان سراسر نگارین تعریف می‌شود؛ تخصیص اعتبار در مرحلهٔ جداگانه انجام می‌شود.</p><form onSubmit={event => void createProgram(event)} className={styles.reviewForm}><label>عنوان برنامه<input required maxLength={120} value={title} onChange={event => setTitle(event.target.value)} /></label><label>توضیحات<textarea required maxLength={2000} rows={3} value={description} onChange={event => setDescription(event.target.value)} /></label><label>قواعد استفاده<textarea required maxLength={2000} rows={3} value={rules} onChange={event => setRules(event.target.value)} /></label><button type="submit" disabled={saving || !title.trim() || !description.trim() || !rules.trim()}>{saving ? "در حال ثبت…" : "ثبت برنامه"}</button></form></section>
        <section className={styles.panel}><div className={styles.toolbar}><div><h2>فهرست برنامه‌ها</h2><p>برنامه‌های سازمان‌ها فقط برای مشاهده در این فهرست نمایش داده می‌شوند.</p></div><button type="button" disabled={loading} onClick={() => void loadData()}>تازه‌سازی</button></div>{loading && !data && <p>در حال دریافت…</p>}{data?.items.length ? <div className={styles.programList}>{data.items.map(program => <article key={program.id}><header><strong>{program.title}</strong><span>{program.source === "negarin_csr" ? "برنامهٔ نگارین" : "برنامهٔ سازمان همکار"}</span></header><p>{program.description}</p><p><b>قواعد:</b> {program.rules}</p><small>ثبت‌شده در {date(program.createdAt)}</small>{program.source === "negarin_csr" && <div className={styles.assignBox}><button type="button" onClick={() => { setAssigningProgramId(assigningProgramId === program.id ? "" : program.id); setCandidates([]); setArtistQuery(""); }}>اتصال هنرمند</button>{assigningProgramId === program.id && <><form className={styles.searchArtists} onSubmit={event => void searchArtists(event)}><input aria-label="جست‌وجوی هنرمند" minLength={2} maxLength={120} placeholder="نام فروشگاه یا معرفی هنرمند" value={artistQuery} onChange={event => setArtistQuery(event.target.value)} /><button type="submit" disabled={searchingArtists || artistQuery.trim().length < 2}>{searchingArtists ? "در حال جست‌وجو…" : "جست‌وجو"}</button></form>{candidates.map(candidate => <div className={styles.artistCandidate} key={candidate.artistUserId}><span><b>{candidate.storeName}</b><small>{candidate.shortIntro || "معرفی ثبت نشده"}</small></span><button type="button" disabled={!!assigningArtistId} onClick={() => void assignArtist(program.id, candidate.artistUserId)}>{assigningArtistId === candidate.artistUserId ? "در حال اتصال…" : "اتصال"}</button></div>)}<small>بعد از اتصال، رابطه برای تأیید نهایی در «بازبینی ارجاع حمایتی» قرار می‌گیرد.</small></>}</div>}</article>)}</div> : data && <p>برنامه‌ای برای نمایش وجود ندارد.</p>}{data && (pageNumber > 1 || data.hasMore) && <div className={styles.paging}><button type="button" disabled={loading || pageNumber <= 1} onClick={() => setPageNumber(value => Math.max(1, value - 1))}>صفحهٔ قبل</button><span>{pageNumber.toLocaleString("fa-IR")}</span><button type="button" disabled={loading || !data.hasMore || pageNumber >= 1000} onClick={() => setPageNumber(value => value + 1)}>صفحهٔ بعد</button></div>}</section></>}
    </section></main>;
}
