"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./product-review-live.module.css";

type Deliverable = { id: string; label: string; contentType: string; byteLength: number; sha256: string; uploadedExecutionVersion: number; createdAt: string };
type ExecutionEvent = { version: number; fromStatus: string | null; toStatus: string; summary: string; createdAt: string; fileIds: string[] };
type Execution = { status: string; version: number; submissionSummary: string | null; reviewSummary: string | null; submittedFileIds: string[]; files: Deliverable[]; history: ExecutionEvent[] };
type Assignment = { id: string; status: string; responseSummary: string | null; execution: Execution | null };
type ServiceRequest = { id: string; title: string; description: string; status: string; createdAt: string; assignments: Assignment[] };
type Page = { page: number; pageSize: number; hasMore: boolean; items: ServiceRequest[] };
type Grant = { id: string };
type Session = "loading" | "ready" | "choose" | "signed-out" | "forbidden" | "error";
const uuid = (value: unknown): value is string => typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
function record(value: unknown): value is Record<string, unknown> { return !!value && typeof value === "object" && !Array.isArray(value); }
function parseExecution(value: unknown): Execution | null {
  if (value === null) return null;
  if (!record(value) || typeof value.status !== "string" || !Number.isSafeInteger(value.version) || !(typeof value.submissionSummary === "string" || value.submissionSummary === null) || !(typeof value.reviewSummary === "string" || value.reviewSummary === null) || !Array.isArray(value.submittedFileIds) || !value.submittedFileIds.every(uuid) || !Array.isArray(value.files) || !Array.isArray(value.history)) return null;
  const files = value.files.map(file => record(file) && uuid(file.id) && typeof file.label === "string" && typeof file.contentType === "string" && Number.isSafeInteger(file.byteLength) && typeof file.sha256 === "string" && typeof file.createdAt === "string" ? { id: file.id, label: file.label, contentType: file.contentType, byteLength: file.byteLength as number, sha256: file.sha256, uploadedExecutionVersion: Number.isSafeInteger(file.uploadedExecutionVersion) ? file.uploadedExecutionVersion as number : 0, createdAt: file.createdAt } : null);
  const history = value.history.map(event => record(event) && Number.isSafeInteger(event.version) && (typeof event.fromStatus === "string" || event.fromStatus === null) && typeof event.toStatus === "string" && typeof event.summary === "string" && typeof event.createdAt === "string" && Array.isArray(event.fileIds) && event.fileIds.every(uuid) ? { version: event.version as number, fromStatus: event.fromStatus as string | null, toStatus: event.toStatus, summary: event.summary, createdAt: event.createdAt, fileIds: event.fileIds as string[] } : null);
  if (files.some(file => file === null) || history.some(event => event === null)) return null;
  return { status: value.status, version: value.version as number, submissionSummary: value.submissionSummary as string | null, reviewSummary: value.reviewSummary as string | null, submittedFileIds: value.submittedFileIds as string[], files: files as Deliverable[], history: history as ExecutionEvent[] };
}
function parseRequest(value: unknown): ServiceRequest | null {
  if (!record(value) || !uuid(value.id) || typeof value.title !== "string" || typeof value.description !== "string" || typeof value.status !== "string" || typeof value.createdAt !== "string" || !Array.isArray(value.assignments)) return null;
  const assignments = value.assignments.map(row => {
    if (!record(row) || !uuid(row.id) || typeof row.status !== "string" || !(typeof row.responseSummary === "string" || row.responseSummary === null)) return null;
    const execution = parseExecution(row.execution); if (row.execution !== null && !execution) return null;
    return { id: row.id, status: row.status, responseSummary: row.responseSummary as string | null, execution };
  });
  if (assignments.some(row => row === null)) return null;
  return { id: value.id, title: value.title, description: value.description, status: value.status, createdAt: value.createdAt, assignments: assignments as Assignment[] };
}
function parsePage(value: unknown, page: number, pageSize: number): Page | null {
  if (!record(value) || value.page !== page || value.pageSize !== pageSize || typeof value.hasMore !== "boolean" || !Array.isArray(value.items)) return null;
  const items = value.items.map(parseRequest); if (items.some(row => !row)) return null;
  return { page, pageSize, hasMore: value.hasMore, items: items as ServiceRequest[] };
}
const date = (value: string) => { const d = new Date(value); return Number.isFinite(d.getTime()) ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(d) : "—"; };
const states: Record<string, string> = { accepted: "پذیرفته‌شده", scheduled: "زمان‌بندی‌شده", in_progress: "در حال اجرا", submitted: "در انتظار بازبینی", changes_requested: "نیازمند اصلاح", completed: "تکمیل‌شده" };

export function AdminServiceReviewsLive() {
  const [session, setSession] = useState<Session>("loading"); const [grants, setGrants] = useState<Grant[]>([]); const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState<Page | null>(null); const [selected, setSelected] = useState<ServiceRequest | null>(null); const [summary, setSummary] = useState(""); const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [notice, setNotice] = useState("");
  const loadSession = useCallback(async () => {
    setSession("loading"); setError("");
    try { const active = await fetch("/api/auth/context", { cache: "no-store" }); if (active.ok) { const context: unknown = await active.json(); if (!record(context) || typeof context.activeRole !== "string") { setSession("error"); return; } if (context.activeRole === "staff") { setSession("ready"); return; } } else if (active.status !== 401) { setSession("error"); return; }
      const response = await fetch("/api/auth/grants", { cache: "no-store" }); if (response.status === 401) { setSession("signed-out"); return; } if (!response.ok) { setSession("error"); return; } const body: unknown = await response.json(); if (!record(body) || !Array.isArray(body.grants)) { setSession("error"); return; }
      const staff = body.grants.filter((grant): grant is Grant => record(grant) && typeof grant.id === "string" && grant.role === "staff"); setGrants(staff); setSession(staff.length ? "choose" : "forbidden");
    } catch { setSession("error"); }
  }, []);
  useEffect(() => { void loadSession(); }, [loadSession]);
  const loadQueue = useCallback(async () => {
    if (session !== "ready") return;
    setLoading(true); setError("");
    try { const response = await fetch(`/api/admin/service-requests?page=${pageNumber}&pageSize=20`, { cache: "no-store" }); if (response.status === 401) throw new Error("نشست کارشناسی معتبر نیست یا پایان یافته است."); if (response.status === 403) throw new Error("این صف به مجوز دامنهٔ خدمات نیاز دارد."); if (!response.ok) throw new Error("صف بازبینی خدمت دریافت نشد."); const parsed = parsePage(await response.json(), pageNumber, 20); if (!parsed) throw new Error("ساختار صف بازبینی معتبر نیست."); setPage(parsed); setSelected(current => current ? parsed.items.find(row => row.id === current.id) ?? null : null); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با سرویس درخواست‌ها برقرار نشد."); }
    finally { setLoading(false); }
  }, [pageNumber, session]);
  useEffect(() => { void loadQueue(); }, [loadQueue]);
  function submittedAssignment(row: ServiceRequest | null) { return row?.assignments.find(assignment => assignment.status === "accepted" && assignment.execution?.status === "submitted") ?? null; }
  const queueItems = (page?.items ?? []).filter(row => submittedAssignment(row));
  async function openRequest(id: string) {
    setSelected(null); setSummary(""); setSignedUrls({}); setError(""); setNotice(""); setLoading(true);
    try { const response = await fetch(`/api/admin/service-requests/${id}`, { cache: "no-store" }); if (response.status === 404) throw new Error("درخواست پیدا نشد."); if (response.status === 403) throw new Error("مجوز دامنهٔ خدمات فعال نیست."); if (!response.ok) throw new Error("جزئیات درخواست دریافت نشد."); const parsed = parseRequest(await response.json()); if (!parsed) throw new Error("ساختار جزئیات درخواست معتبر نیست."); setSelected(parsed); setSummary(parsed.assignments.find(a => a.execution?.status === "submitted")?.execution?.reviewSummary ?? ""); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "جزئیات درخواست دریافت نشد."); }
    finally { setLoading(false); }
  }
  async function review(decision: "completed" | "changes_requested") {
    const assignment = submittedAssignment(selected); if (!selected || !assignment?.execution || busy) return;
    if (!summary.trim()) { setError("خلاصهٔ بازبینی را وارد کنید."); return; }
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch(`/api/admin/service-assignments/${assignment.id}/execution-review`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ version: assignment.execution.version, decision, summary: summary.trim() }) });
      if (response.status === 409) { await openRequest(selected.id); setNotice("نسخهٔ اجرا تغییر کرده است؛ آخرین جزئیات بارگیری شد."); return; }
      if (response.status === 401) throw new Error("نشست کارشناسی معتبر نیست یا پایان یافته است."); if (response.status === 403) throw new Error("این عملیات به مجوز دامنهٔ خدمات نیاز دارد."); if (!response.ok) throw new Error("ثبت نتیجهٔ بازبینی انجام نشد.");
      const reviewedRequestId = selected.id; await loadQueue(); await openRequest(reviewedRequestId); setNotice(decision === "completed" ? "تکمیل خدمت با تصمیم کارشناس ثبت شد." : "درخواست اصلاح برای همکار خدمات ثبت شد.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "نتیجهٔ بازبینی ثبت نشد."); }
    finally { setBusy(false); }
  }
  async function openFile(assignmentId: string, fileId: string) {
    setError("");
    try { const response = await fetch(`/api/admin/service-assignments/${assignmentId}/files/${fileId}`, { cache: "no-store" }); if (response.status === 403) throw new Error("مجوز دامنهٔ خدمات فعال نیست."); if (!response.ok) throw new Error("پیوند امن فایل دریافت نشد."); const value: unknown = await response.json(); if (!record(value) || typeof value.url !== "string" || !value.url.startsWith("https://")) throw new Error("پاسخ فایل معتبر نیست."); setSignedUrls(current => ({ ...current, [fileId]: value.url as string })); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "دریافت فایل انجام نشد."); }
  }
  async function chooseGrant(id: string) { setSession("loading"); setError(""); try { const response = await fetch("/api/auth/context", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ grantId: id }) }); if (!response.ok) throw new Error(); setSession("ready"); } catch { setError("فعال‌سازی دسترسی کارشناسی انجام نشد."); setSession("error"); } }
  async function logout() { await fetch("/api/auth/session", { method: "DELETE" }); location.assign("/"); }
  const current = submittedAssignment(selected);
  const selectedAssignment = selected?.assignments.find(assignment => assignment.execution !== null) ?? null;
  const selectedExecution = selectedAssignment?.execution ?? null;
  return <main className={styles.page} dir="rtl" lang="fa-IR"><aside className={styles.sidebar}><a className={styles.brand} href="/"><span className={styles.brandMark}>ن</span><strong>نگارین<small>مدیریت محتوا و بازار</small></strong></a><nav aria-label="منوی مدیریت"><a href="/admin/product-reviews">بررسی محصولات</a><a href="/admin/shipment-issues">رسیدگی به مشکلات سفارش</a><a href="/admin/refund-reviews">بررسی مالی بازپرداخت</a><a href="/admin/domestic-finance">صورت‌وضعیت سفارش‌ها</a><a className={styles.active} href="/admin/service-reviews" aria-current="page">بازبینی تحویل خدمات</a><a href="/admin/support-reviews">بازبینی ارجاع حمایتی</a><a href="/admin/support-reports">گزارش حمایت‌ها</a><a href="/admin/support-programs">مدیریت برنامه‌های حمایتی</a><a href="/admin/support-allocations">تخصیص اعتبار حمایتی</a><a href="/admin/corporate-purchase-requests">درخواست‌های خرید سازمانی</a><a href="/preview/admin">سایر بخش‌های پنل</a></nav><button className={styles.logout} type="button" onClick={() => void logout()}>خروج امن</button></aside>
    <section className={styles.main}><header className={styles.header}><div><p>خانه نگارین / خدمات</p><h1>بازبینی تحویل خدمات</h1><span>تکمیل یا درخواست اصلاح فقط با تصمیم کارشناسی ثبت می‌شود.</span></div><span className={styles.badge}>اتصال زنده به API</span></header>
      {session === "loading" && <section className={styles.panel}>در حال بررسی نشست امن…</section>}{session === "signed-out" && <section className={styles.panel}><h2>ورود لازم است</h2><p>برای بازبینی تحویل، نشست معتبر پنل لازم است.</p></section>}{session === "forbidden" && <section className={styles.panel}><h2>دسترسی کارشناسی موجود نیست</h2><p>این صفحه به نقش کارشناس و مجوز دامنهٔ خدمات نیاز دارد.</p></section>}{session === "choose" && <section className={styles.panel}><h2>انتخاب دسترسی کارشناسی</h2><p>مجوز خدمات توسط API بررسی می‌شود.</p><div className={styles.grants}>{grants.map(grant => <button key={grant.id} type="button" onClick={() => void chooseGrant(grant.id)}>فعال‌سازی دسترسی کارشناسی</button>)}</div></section>}{session === "error" && <section className={styles.panel}><p className={styles.error} role="alert">{error || "نشست کاربری قابل بررسی نیست."}</p><button type="button" onClick={() => void loadSession()}>تلاش دوباره</button></section>}
      {session === "ready" && <div className={styles.columns}><section className={styles.panel}><div className={styles.toolbar}><div><h2>صف تحویل‌های منتظر بررسی</h2><p>{queueItems.length.toLocaleString("fa-IR")} مورد در این صفحه از درخواست‌ها</p></div><button type="button" disabled={loading} onClick={() => void loadQueue()}>تازه‌سازی</button></div>{error && <p className={styles.error} role="alert">{error}</p>}{notice && <p className={styles.notice} role="status">{notice}</p>}{loading && <p className={styles.muted}>در حال دریافت درخواست‌ها…</p>}{!loading && queueItems.length === 0 && <p className={styles.muted}>تحویل در انتظار بررسی در این صفحه وجود ندارد.</p>}<div className={styles.queue}>{queueItems.map(row => { const assignment = submittedAssignment(row)!; return <button type="button" key={row.id} className={styles.queueItem} aria-current={selected?.id === row.id ? "true" : undefined} onClick={() => void openRequest(row.id)}><strong>{row.title}</strong><span>{assignment.execution?.files.length ? `${assignment.execution.files.length.toLocaleString("fa-IR")} فایل پیوست` : "تحویل متنی"} · {date(row.createdAt)}</span><small>شناسهٔ درخواست <bdi dir="ltr">{row.id.slice(0, 8)}…</bdi></small></button>; })}</div>{page && (pageNumber > 1 || page.hasMore) && <div className={styles.paging}><button type="button" disabled={loading || pageNumber <= 1} onClick={() => setPageNumber(n => Math.max(1, n - 1))}>صفحهٔ قبل</button><span>{pageNumber.toLocaleString("fa-IR")}</span><button type="button" disabled={loading || !page.hasMore} onClick={() => setPageNumber(n => n + 1)}>صفحهٔ بعد</button></div>}</section>
        <section className={styles.panel}>{!selected && <p className={styles.muted}>یک تحویل را برای مشاهدهٔ شرح درخواست، گزارش و فایل‌های ارسالی انتخاب کنید.</p>}{selected && <><div className={styles.toolbar}><div><h2>{selected.title}</h2><p>درخواست <bdi dir="ltr">{selected.id}</bdi></p></div><span className={styles.status}>{selectedExecution ? states[selectedExecution.status] ?? selectedExecution.status : selected.status}</span></div><section className={styles.content}><h3>شرح درخواست</h3><p>{selected.description}</p></section>{selectedExecution && <><section className={styles.content}><h3>{selectedExecution.submissionSummary ? "گزارش تحویل" : "آخرین گزارش اجرا"}</h3><p>{selectedExecution.submissionSummary ?? "گزارش تحویل ثبت نشده است."}</p><p>نسخهٔ اجرا: {selectedExecution.version.toLocaleString("fa-IR")}</p></section><section className={styles.specs}><h3>فایل‌های تحویلی</h3>{selectedExecution.submittedFileIds.length ? <div className={styles.gallery}>{selectedExecution.submittedFileIds.map(id => { const file = selectedExecution.files.find(item => item.id === id); return <figure key={id}><figcaption>{file?.label ?? "فایل تحویل"}<br/><small>{file ? `${file.contentType} · ${file.byteLength.toLocaleString("fa-IR")} بایت` : "شناسهٔ فایل ثبت‌شده"}</small></figcaption>{signedUrls[id] ? <a href={signedUrls[id]} target="_blank" rel="noreferrer">بازکردن فایل</a> : <button type="button" onClick={() => selectedAssignment && void openFile(selectedAssignment.id, id)}>دریافت پیوند امن</button>}</figure>; })}</div> : <p className={styles.muted}>فایلی برای این تحویل انتخاب نشده است.</p>}</section><section className={styles.content}><h3>تاریخچهٔ اجرا</h3><ol className={styles.history}>{selectedExecution.history.map(event => <li key={event.version}><strong>{states[event.toStatus] ?? event.toStatus}</strong><span>نسخهٔ {event.version.toLocaleString("fa-IR")} · {date(event.createdAt)}</span><p>{event.summary}</p>{event.fileIds.length > 0 && <small>{event.fileIds.length.toLocaleString("fa-IR")} فایل در این نسخه ثبت شده</small>}</li>)}</ol></section>{current?.execution ? <section className={styles.decision}><label htmlFor="service-review-summary">خلاصهٔ تصمیم کارشناسی</label><textarea id="service-review-summary" maxLength={4000} value={summary} onChange={event => setSummary(event.currentTarget.value)} placeholder="مبنای تکمیل یا مواردی که باید اصلاح شوند را بنویسید."/><div className={styles.actions}><button className={styles.approve} type="button" disabled={busy || !summary.trim()} onClick={() => void review("completed")}>{busy ? "در حال ثبت…" : "تأیید تکمیل خدمت"}</button><button className={styles.requestChanges} type="button" disabled={busy || !summary.trim()} onClick={() => void review("changes_requested")}>درخواست اصلاح</button></div><p>تأیید تکمیل فقط وضعیت اجرای خدمت را ثبت می‌کند؛ پرداخت، تسویه یا دریافت مشتری را تغییر نمی‌دهد.</p></section> : selectedExecution.reviewSummary && <p className={styles.notice}>نتیجهٔ بازبینی: {selectedExecution.reviewSummary}</p>}</>}</>}</section></div>}
    </section>
  </main>;
}
