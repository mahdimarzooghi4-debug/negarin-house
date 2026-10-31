"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./live-services.module.css";

type CatalogItem = { id: string; title: string; description: string };
type CatalogPage = { page: number; pageSize: number; hasMore: boolean; items: CatalogItem[] };
type FileItem = { id: string; label: string; contentType: string; byteLength: number; sha256: string; createdAt: string };
type ExecutionEvent = { version: number; fromStatus: string | null; toStatus: string; summary: string; createdAt: string; fileIds: string[] };
type Execution = { status: string; version: number; scheduledStart: string | null; scheduledEnd: string | null; scheduleSummary: string | null; progressSummary: string | null; submissionSummary: string | null; reviewSummary: string | null; submittedFileIds: string[]; files: FileItem[]; history: ExecutionEvent[] };
type Assignment = { id: string; status: string; responseSummary: string | null; execution: Execution | null };
type ServiceRequest = { id: string; serviceId: string | null; title: string; description: string; status: string; version: number; createdAt: string; assignment: Assignment | null; history: Array<{ version: number; action: string; createdAt: string }> };
type RequestPage = { page: number; pageSize: number; hasMore: boolean; items: ServiceRequest[] };
type Session = "loading" | "ready" | "choose" | "signed-out" | "forbidden" | "error";
type CreateCommand = { idempotencyKey: string; serviceId: string; description: string };
const uuid = (value: unknown): value is string => typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
function record(value: unknown): value is Record<string, unknown> { return !!value && typeof value === "object" && !Array.isArray(value); }
function parseExecution(value: unknown): Execution | null {
  if (value === null) return null;
  if (!record(value) || typeof value.status !== "string" || !Number.isSafeInteger(value.version) || !(typeof value.scheduledStart === "string" || value.scheduledStart === null) || !(typeof value.scheduledEnd === "string" || value.scheduledEnd === null) || !(typeof value.scheduleSummary === "string" || value.scheduleSummary === null) || !(typeof value.progressSummary === "string" || value.progressSummary === null) || !(typeof value.submissionSummary === "string" || value.submissionSummary === null) || !(typeof value.reviewSummary === "string" || value.reviewSummary === null) || !Array.isArray(value.submittedFileIds) || !value.submittedFileIds.every(uuid) || !Array.isArray(value.files) || !Array.isArray(value.history)) return null;
  const files = value.files.map(file => record(file) && uuid(file.id) && typeof file.label === "string" && typeof file.contentType === "string" && Number.isSafeInteger(file.byteLength) && typeof file.sha256 === "string" && typeof file.createdAt === "string" ? { id: file.id, label: file.label, contentType: file.contentType, byteLength: file.byteLength as number, sha256: file.sha256, createdAt: file.createdAt } : null);
  const history = value.history.map(event => record(event) && Number.isSafeInteger(event.version) && (typeof event.fromStatus === "string" || event.fromStatus === null) && typeof event.toStatus === "string" && typeof event.summary === "string" && typeof event.createdAt === "string" && Array.isArray(event.fileIds) && event.fileIds.every(uuid) ? { version: event.version as number, fromStatus: event.fromStatus as string | null, toStatus: event.toStatus, summary: event.summary, createdAt: event.createdAt, fileIds: event.fileIds as string[] } : null);
  if (files.some(file => file === null) || history.some(event => event === null)) return null;
  return { status: value.status, version: value.version as number, scheduledStart: value.scheduledStart as string | null, scheduledEnd: value.scheduledEnd as string | null, scheduleSummary: value.scheduleSummary as string | null, progressSummary: value.progressSummary as string | null, submissionSummary: value.submissionSummary as string | null, reviewSummary: value.reviewSummary as string | null, submittedFileIds: value.submittedFileIds as string[], files: files as FileItem[], history: history as ExecutionEvent[] };
}
function parseRequest(value: unknown): ServiceRequest | null {
  if (!record(value) || !uuid(value.id) || !(uuid(value.serviceId) || value.serviceId === null) || typeof value.title !== "string" || typeof value.description !== "string" || typeof value.status !== "string" || !Number.isSafeInteger(value.version) || typeof value.createdAt !== "string" || !(value.assignment === null || record(value.assignment)) || !Array.isArray(value.history)) return null;
  let assignment: Assignment | null = null;
  if (value.assignment !== null) {
    const row = value.assignment as Record<string, unknown>; if (!uuid(row.id) || typeof row.status !== "string" || !(typeof row.responseSummary === "string" || row.responseSummary === null)) return null;
    const execution = parseExecution(row.execution); if (row.execution !== null && !execution) return null;
    assignment = { id: row.id, status: row.status, responseSummary: row.responseSummary as string | null, execution };
  }
  const history = value.history.map(event => record(event) && Number.isSafeInteger(event.version) && typeof event.action === "string" && typeof event.createdAt === "string" ? { version: event.version as number, action: event.action, createdAt: event.createdAt } : null);
  if (history.some(event => event === null)) return null;
  return { id: value.id, serviceId: value.serviceId, title: value.title, description: value.description, status: value.status, version: value.version as number, createdAt: value.createdAt, assignment, history: history as ServiceRequest["history"] };
}
function parseCatalogPage(value: unknown, page: number, pageSize: number): CatalogPage | null {
  if (!record(value) || value.page !== page || value.pageSize !== pageSize || typeof value.hasMore !== "boolean" || !Array.isArray(value.items)) return null;
  const items = value.items.map(item => record(item) && uuid(item.id) && typeof item.title === "string" && typeof item.description === "string" ? { id: item.id, title: item.title, description: item.description } : null);
  if (items.some(item => item === null)) return null;
  return { page, pageSize, hasMore: value.hasMore, items: items as CatalogItem[] };
}
function parseRequestPage(value: unknown, page: number, pageSize: number): RequestPage | null {
  if (!record(value) || value.page !== page || value.pageSize !== pageSize || typeof value.hasMore !== "boolean" || !Array.isArray(value.items)) return null;
  const items = value.items.map(parseRequest); if (items.some(item => !item)) return null;
  return { page, pageSize, hasMore: value.hasMore, items: items as ServiceRequest[] };
}
const date = (value: string) => { const d = new Date(value); return Number.isFinite(d.getTime()) ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(d) : "—"; };
const requestStatuses: Record<string, string> = { awaiting_assignment: "در انتظار تخصیص", assigned: "تخصیص‌یافته · در انتظار پاسخ", accepted: "پذیرفته‌شده" };
const executionStatuses: Record<string, string> = { accepted: "پذیرفته‌شده", scheduled: "زمان‌بندی پیشنهادی ثبت شد", in_progress: "در حال اجرا", submitted: "تحویل‌شده · در انتظار بررسی نگارین", changes_requested: "نیازمند اصلاح", completed: "تکمیل‌شده با تأیید نگارین" };
const actionLabels: Record<string, string> = { created: "ثبت درخواست", assigned: "تخصیص به همکار", accepted: "پذیرش همکار", declined: "رد تخصیص", scheduled: "ثبت زمان پیشنهادی", in_progress: "به‌روزرسانی اجرا", submitted: "ارسال تحویل", changes_requested: "درخواست اصلاح نگارین", completed: "تأیید تکمیل نگارین" };

export function ArtistServicesLive() {
  const [session, setSession] = useState<Session>("loading"); const [grants, setGrants] = useState<Array<{ id: string }>>([]);
  const [catalogPageNumber, setCatalogPageNumber] = useState(1); const [catalogPage, setCatalogPage] = useState<CatalogPage | null>(null);
  const [requestPageNumber, setRequestPageNumber] = useState(1); const [requestPage, setRequestPage] = useState<RequestPage | null>(null);
  const [selected, setSelected] = useState<ServiceRequest | null>(null); const [selectedCatalog, setSelectedCatalog] = useState<CatalogItem | null>(null); const [description, setDescription] = useState("");
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({}); const [loading, setLoading] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [notice, setNotice] = useState("");
  const pendingCreate = useRef<CreateCommand | null>(null);
  const loadSession = useCallback(async () => {
    setSession("loading"); setError("");
    try { const active = await fetch("/api/auth/context", { cache: "no-store" }); if (active.ok) { const context: unknown = await active.json(); if (!record(context) || typeof context.activeRole !== "string") { setSession("error"); return; } if (context.activeRole === "artist") { setSession("ready"); return; } } else if (active.status !== 401) { setSession("error"); return; }
      const response = await fetch("/api/auth/grants", { cache: "no-store" }); if (response.status === 401) { setSession("signed-out"); return; } if (!response.ok) { setSession("error"); return; } const body: unknown = await response.json(); if (!record(body) || !Array.isArray(body.grants)) { setSession("error"); return; }
      const artists = body.grants.filter((grant): grant is { id: string } => record(grant) && typeof grant.id === "string" && grant.role === "artist"); setGrants(artists); setSession(artists.length ? "choose" : "forbidden");
    } catch { setSession("error"); }
  }, []);
  useEffect(() => { void loadSession(); }, [loadSession]);
  const loadCatalog = useCallback(async () => {
    if (session !== "ready") return;
    setLoading(true); setError("");
    try { const response = await fetch(`/api/artist/service-catalog?page=${catalogPageNumber}&pageSize=12`, { cache: "no-store" }); if (response.status === 401) throw new Error("نشست هنرمند معتبر نیست یا پایان یافته است."); if (!response.ok) throw new Error("فهرست خدمات قابل‌درخواست دریافت نشد."); const parsed = parseCatalogPage(await response.json(), catalogPageNumber, 12); if (!parsed) throw new Error("ساختار فهرست خدمات معتبر نیست."); setCatalogPage(parsed); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با فهرست خدمات برقرار نشد."); }
    finally { setLoading(false); }
  }, [catalogPageNumber, session]);
  const loadRequests = useCallback(async () => {
    if (session !== "ready") return;
    setLoading(true); setError("");
    try { const response = await fetch(`/api/artist/service-requests?page=${requestPageNumber}&pageSize=10`, { cache: "no-store" }); if (response.status === 401) throw new Error("نشست هنرمند معتبر نیست یا پایان یافته است."); if (!response.ok) throw new Error("درخواست‌های خدمات دریافت نشدند."); const parsed = parseRequestPage(await response.json(), requestPageNumber, 10); if (!parsed) throw new Error("ساختار درخواست‌های خدمات معتبر نیست."); setRequestPage(parsed); setSelected(current => current ? parsed.items.find(item => item.id === current.id) ?? null : null); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با درخواست‌های خدمات برقرار نشد."); }
    finally { setLoading(false); }
  }, [requestPageNumber, session]);
  useEffect(() => { void loadCatalog(); }, [loadCatalog]); useEffect(() => { void loadRequests(); }, [loadRequests]);
  async function openRequest(id: string) {
    setSelected(null); setError(""); setNotice(""); setSignedUrls({}); setLoading(true);
    try { const response = await fetch(`/api/artist/service-requests/${id}`, { cache: "no-store" }); if (response.status === 404) throw new Error("این درخواست در حساب هنرمند شما پیدا نشد."); if (!response.ok) throw new Error("جزئیات درخواست خدمات دریافت نشد."); const item = parseRequest(await response.json()); if (!item) throw new Error("پاسخ جزئیات خدمت معتبر نیست."); setSelected(item); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "جزئیات درخواست دریافت نشد."); }
    finally { setLoading(false); }
  }
  async function createRequest() {
    if (!selectedCatalog || busy) return;
    if (!description.trim()) { setError("شرح نیاز خود را بنویسید."); return; }
    if (!pendingCreate.current) pendingCreate.current = { idempotencyKey: crypto.randomUUID(), serviceId: selectedCatalog.id, description: description.trim() };
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/artist/service-requests", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(pendingCreate.current) });
      if (response.status === 409) { pendingCreate.current = null; throw new Error("درخواست با وضعیت فعلی ثبت نشد؛ خدمات را تازه کنید و دوباره بررسی کنید."); }
      if (response.status === 401) { pendingCreate.current = null; throw new Error("نشست هنرمند معتبر نیست؛ دوباره وارد شوید."); } if (response.status === 404) { pendingCreate.current = null; throw new Error("این خدمت دیگر برای ثبت درخواست فعال نیست."); } if (!response.ok) { if (response.status < 500) pendingCreate.current = null; throw new Error("ثبت درخواست خدمت انجام نشد."); }
      const item = parseRequest(await response.json()); if (!item) throw new Error("درخواست ثبت شد اما پاسخ سرور معتبر نیست."); pendingCreate.current = null; setDescription(""); setSelectedCatalog(null); await loadRequests(); setSelected(item); setNotice("درخواست ثبت شد؛ تخصیص همکار خدمات هنوز انجام نشده است.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "درخواست ثبت نشد؛ برای جلوگیری از ثبت تکراری همان تلاش را تکرار کنید."); }
    finally { setBusy(false); }
  }
  async function openFile(assignmentId: string, fileId: string) {
    setError("");
    try { const response = await fetch(`/api/artist/service-assignments/${assignmentId}/files/${fileId}`, { cache: "no-store" }); if (response.status === 404) throw new Error("این فایل برای درخواست شما در دسترس نیست."); if (!response.ok) throw new Error("پیوند امن فایل دریافت نشد."); const value: unknown = await response.json(); if (!record(value) || typeof value.url !== "string" || !value.url.startsWith("https://")) throw new Error("پاسخ فایل معتبر نیست."); setSignedUrls(current => ({ ...current, [fileId]: value.url as string })); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "دریافت فایل انجام نشد."); }
  }
  async function chooseGrant(id: string) { setSession("loading"); setError(""); try { const response = await fetch("/api/auth/context", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ grantId: id }) }); if (!response.ok) throw new Error(); setSession("ready"); } catch { setError("فعال‌سازی دسترسی هنرمند انجام نشد."); setSession("error"); } }
  async function logout() { await fetch("/api/auth/session", { method: "DELETE" }); location.assign("/"); }
  const execution = selected?.assignment?.execution ?? null;
  return <main className={styles.page} dir="rtl" lang="fa-IR"><aside className={styles.sidebar}><a className={styles.brand} href="/artist/storefront"><span>ن</span><strong>نگارین<small>پنل هنرمند</small></strong></a><nav aria-label="منوی هنرمند"><a href="/artist/storefront">فروشگاه من</a><a href="/artist/products">محصولات</a><a href="/artist/orders">سفارش‌ها</a><a href="/artist/corporate-orders">سفارش‌های سازمانی</a><a href="/artist/growth">رشد من</a><a className={styles.active} href="/artist/services" aria-current="page">خدمات</a><a href="/artist/finance">مالی</a><a href="/preview/artist">پیش‌نمایش سایر بخش‌ها</a></nav><button className={styles.logout} type="button" onClick={() => void logout()}>خروج امن</button></aside>
    <section className={styles.main}><header className={styles.header}><div><p>خانه نگارین / خدمات</p><h1>خدمات هنرمند</h1><span>خدمات فعال را درخواست کنید و وضعیت اجرای آن را پیگیری کنید.</span></div><span className={styles.badge}>اتصال زنده به API</span></header>
      {session === "loading" && <section className={styles.panel}>در حال بررسی نشست امن…</section>}{session === "signed-out" && <section className={styles.panel}><h2>ورود لازم است</h2><p>برای درخواست خدمت، نشست معتبر هنرمند لازم است.</p></section>}{session === "forbidden" && <section className={styles.panel}><h2>دسترسی هنرمند موجود نیست</h2><p>در نشست فعال حساب هنرمند در دسترس نیست.</p></section>}{session === "choose" && <section className={styles.panel}><h2>انتخاب حساب هنرمند</h2><p>برای ثبت یا پیگیری درخواست، دسترسی هنرمند را فعال کنید.</p><div className={styles.grants}>{grants.map(grant => <button key={grant.id} type="button" onClick={() => void chooseGrant(grant.id)}>فعال‌سازی حساب هنرمند</button>)}</div></section>}{session === "error" && <section className={styles.panel}><p className={styles.error} role="alert">{error || "نشست کاربری قابل بررسی نیست."}</p><button type="button" onClick={() => void loadSession()}>تلاش دوباره</button></section>}
      {session === "ready" && <>{error && <p className={styles.error} role="alert">{error}</p>}{notice && <p className={styles.notice} role="status">{notice}</p>}<section className={styles.panel}><div className={styles.toolbar}><div><h2>خدمات فعال</h2><p>فهرست از کاتالوگ زندهٔ نگارین دریافت می‌شود؛ قیمت یا زمان‌بندی پیش‌فرض تعریف نشده است.</p></div><button type="button" disabled={loading} onClick={() => void loadCatalog()}>تازه‌سازی</button></div>{loading && !catalogPage && <p className={styles.muted}>در حال دریافت خدمات…</p>}{catalogPage?.items.length ? <div className={styles.catalog}>{catalogPage.items.map(item => <article key={item.id}><h3>{item.title}</h3><p>{item.description}</p><button type="button" disabled={busy || !!pendingCreate.current} onClick={() => { setSelectedCatalog(item); setDescription(""); setError(""); }}>ثبت درخواست این خدمت</button></article>)}</div> : !loading && <p className={styles.muted}>خدمت فعالی برای درخواست در دسترس نیست.</p>}{catalogPage && (catalogPageNumber > 1 || catalogPage.hasMore) && <div className={styles.paging}><button type="button" disabled={loading || catalogPageNumber <= 1} onClick={() => setCatalogPageNumber(n => Math.max(1, n - 1))}>خدمات قبلی</button><span>{catalogPageNumber.toLocaleString("fa-IR")}</span><button type="button" disabled={loading || !catalogPage.hasMore} onClick={() => setCatalogPageNumber(n => n + 1)}>خدمات بعدی</button></div>}</section>
        {selectedCatalog && <section className={styles.requestForm}><header><div><h2>درخواست «{selectedCatalog.title}»</h2><p>خلاصهٔ نیاز خود را برای بررسی و تخصیص همکار توضیح دهید.</p></div><button type="button" disabled={busy || !!pendingCreate.current} onClick={() => setSelectedCatalog(null)}>بستن</button></header><label>شرح درخواست<textarea maxLength={2000} value={pendingCreate.current?.description ?? description} disabled={!!pendingCreate.current} onChange={event => setDescription(event.target.value)} placeholder="نیاز، هدف و دامنهٔ خدمتی که درخواست می‌کنید را بنویسید."/></label><small>ثبت این درخواست خرید یا پرداخت نیست؛ قیمت و مصرف اعتبار در این جریان تعریف نشده‌اند.</small><div className={styles.actions}><button type="button" disabled={busy || (!description.trim() && !pendingCreate.current)} onClick={() => void createRequest()}>{busy ? "در حال ثبت…" : pendingCreate.current ? "تلاش دوباره با همان درخواست" : "ثبت درخواست خدمت"}</button></div></section>}
        <div className={styles.columns}><section className={styles.panel}><div className={styles.toolbar}><div><h2>درخواست‌های من</h2><p>{requestPage ? `${requestPage.items.length.toLocaleString("fa-IR")} درخواست در این صفحه` : "تاریخچهٔ درخواست‌های هنرمند"}</p></div><button type="button" disabled={loading} onClick={() => void loadRequests()}>تازه‌سازی</button></div>{loading && !requestPage && <p className={styles.muted}>در حال دریافت درخواست‌ها…</p>}{!loading && requestPage?.items.length === 0 && <p className={styles.muted}>درخواستی ثبت نکرده‌اید.</p>}<div className={styles.requestList}>{requestPage?.items.map(item => <button type="button" key={item.id} className={styles.requestItem} aria-current={selected?.id === item.id ? "true" : undefined} onClick={() => void openRequest(item.id)}><strong>{item.title}</strong><span>{requestStatuses[item.status] ?? item.status}{item.assignment?.execution ? ` · ${executionStatuses[item.assignment.execution.status] ?? item.assignment.execution.status}` : ""}</span><small>{date(item.createdAt)}</small></button>)}</div>{requestPage && (requestPageNumber > 1 || requestPage.hasMore) && <div className={styles.paging}><button type="button" disabled={loading || requestPageNumber <= 1} onClick={() => setRequestPageNumber(n => Math.max(1, n - 1))}>درخواست‌های قبلی</button><span>{requestPageNumber.toLocaleString("fa-IR")}</span><button type="button" disabled={loading || !requestPage.hasMore} onClick={() => setRequestPageNumber(n => n + 1)}>درخواست‌های بعدی</button></div>}</section>
          <section className={styles.panel}>{!selected && <p className={styles.muted}>برای مشاهدهٔ وضعیت و تاریخچه، یک درخواست را انتخاب کنید.</p>}{selected && <><div className={styles.toolbar}><div><h2>{selected.title}</h2><p>شناسهٔ درخواست <bdi dir="ltr">{selected.id}</bdi></p></div><span className={styles.status}>{execution ? executionStatuses[execution.status] ?? execution.status : requestStatuses[selected.status] ?? selected.status}</span></div><section className={styles.detail}><h3>شرح درخواست</h3><p>{selected.description}</p><small>ثبت: {date(selected.createdAt)}</small></section>{selected.assignment?.responseSummary && <section className={styles.info}><h3>پاسخ همکار خدمات</h3><p>{selected.assignment.responseSummary}</p></section>}{execution && <><section className={styles.info}><h3>وضعیت اجرا</h3>{execution.scheduledStart && execution.scheduledEnd && <p><strong>زمان پیشنهادی همکار:</strong> {date(execution.scheduledStart)} تا {date(execution.scheduledEnd)}<small> این زمان‌بندی به معنی تأیید هنرمند نیست.</small></p>}{execution.scheduleSummary && <p>{execution.scheduleSummary}</p>}{execution.progressSummary && <p><strong>آخرین پیشرفت:</strong> {execution.progressSummary}</p>}{execution.submissionSummary && <p><strong>گزارش تحویل:</strong> {execution.submissionSummary}</p>}{execution.reviewSummary && <p><strong>نتیجهٔ بررسی نگارین:</strong> {execution.reviewSummary}</p>}</section>{execution.submittedFileIds.length > 0 && <section className={styles.info}><h3>فایل‌های تحویلی</h3><ul className={styles.files}>{execution.submittedFileIds.map(id => { const file = execution.files.find(item => item.id === id); return <li key={id}><span>{file?.label ?? "فایل تحویل"}{file && <small>{file.contentType} · {file.byteLength.toLocaleString("fa-IR")} بایت</small>}</span>{signedUrls[id] ? <a href={signedUrls[id]} target="_blank" rel="noreferrer">بازکردن فایل</a> : <button type="button" onClick={() => selected.assignment && void openFile(selected.assignment.id, id)}>دریافت پیوند امن</button>}</li>; })}</ul></section>}</>}
            <section className={styles.history}><h3>تاریخچه</h3><ol>{selected.history.map(event => <li key={event.version}><strong>{actionLabels[event.action] ?? event.action}</strong><small>نسخهٔ {event.version.toLocaleString("fa-IR")} · {date(event.createdAt)}</small></li>)}{execution?.history.map(event => <li key={`execution-${event.version}`}><strong>{actionLabels[event.toStatus] ?? executionStatuses[event.toStatus] ?? event.toStatus}</strong><p>{event.summary}</p><small>نسخهٔ اجرا {event.version.toLocaleString("fa-IR")} · {date(event.createdAt)}{event.fileIds.length > 0 ? ` · ${event.fileIds.length} فایل` : ""}</small></li>)}</ol></section></>}</section></div>
      </>}
    </section>
  </main>;
}
