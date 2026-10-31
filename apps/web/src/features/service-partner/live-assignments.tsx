"use client";

import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import styles from "./live-assignments.module.css";

type ExecutionEvent = { version: number; fromStatus: string | null; toStatus: string; summary: string; createdAt: string };
type ExecutionFile = { id: string; label: string; contentType: string; byteLength: number; sha256: string; uploadedExecutionVersion: number; createdAt: string };
type Execution = { status: string; version: number; scheduledStart: string | null; scheduledEnd: string | null; scheduleSummary: string | null; progressSummary: string | null; submissionSummary: string | null; reviewSummary: string | null; history: ExecutionEvent[]; files: ExecutionFile[] };
type UploadCommand = { assignmentId: string; version: number; idempotencyKey: string; kind: "image" | "text"; label: string; base64: string };
type Assignment = { id: string; requestId: string; serviceId: string | null; title: string; description: string; commandVersion: number; status: "assigned" | "accepted" | "declined"; responseSummary: string | null; assignedAt: string; respondedAt: string | null; execution: Execution | null };
type Page = { page: number; pageSize: number; hasMore: boolean; items: Assignment[] };
type Session = "loading" | "ready" | "choose" | "signed-out" | "forbidden" | "error";
type Grant = { id: string; organizationName?: string };
const uuid = (value: unknown): value is string => typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
function record(value: unknown): value is Record<string, unknown> { return !!value && typeof value === "object" && !Array.isArray(value); }
function parseExecution(value: unknown): Execution | null {
  if (value === null) return null;
  if (!record(value) || typeof value.status !== "string" || !Number.isSafeInteger(value.version) || !(typeof value.scheduledStart === "string" || value.scheduledStart === null) || !(typeof value.scheduledEnd === "string" || value.scheduledEnd === null) || !(typeof value.scheduleSummary === "string" || value.scheduleSummary === null) || !(typeof value.progressSummary === "string" || value.progressSummary === null) || !(typeof value.submissionSummary === "string" || value.submissionSummary === null) || !(typeof value.reviewSummary === "string" || value.reviewSummary === null) || !Array.isArray(value.history)) return null;
  const history = value.history.map(event => record(event) && Number.isSafeInteger(event.version) && (typeof event.fromStatus === "string" || event.fromStatus === null) && typeof event.toStatus === "string" && typeof event.summary === "string" && typeof event.createdAt === "string" ? { version: event.version as number, fromStatus: event.fromStatus as string | null, toStatus: event.toStatus, summary: event.summary, createdAt: event.createdAt } : null);
  if (history.some(event => event === null)) return null;
  if (!Array.isArray(value.files)) return null;
  const files = value.files.map(file => record(file) && uuid(file.id) && typeof file.label === "string" && typeof file.contentType === "string" && Number.isSafeInteger(file.byteLength) && (file.byteLength as number) > 0 && typeof file.sha256 === "string" && /^[a-f0-9]{64}$/.test(file.sha256) && Number.isSafeInteger(file.uploadedExecutionVersion) && typeof file.createdAt === "string" ? { id: file.id, label: file.label, contentType: file.contentType, byteLength: file.byteLength as number, sha256: file.sha256, uploadedExecutionVersion: file.uploadedExecutionVersion as number, createdAt: file.createdAt } : null);
  if (files.some(file => file === null)) return null;
  return { status: value.status, version: value.version as number, scheduledStart: value.scheduledStart as string | null, scheduledEnd: value.scheduledEnd as string | null, scheduleSummary: value.scheduleSummary as string | null, progressSummary: value.progressSummary as string | null, submissionSummary: value.submissionSummary as string | null, reviewSummary: value.reviewSummary as string | null, history: history as ExecutionEvent[], files: files as ExecutionFile[] };
}
function parseAssignment(value: unknown): Assignment | null {
  if (!record(value) || !uuid(value.id) || !uuid(value.requestId) || !(uuid(value.serviceId) || value.serviceId === null) || typeof value.title !== "string" || typeof value.description !== "string" || !Number.isSafeInteger(value.commandVersion) || !["assigned", "accepted", "declined"].includes(String(value.status)) || !(typeof value.responseSummary === "string" || value.responseSummary === null) || typeof value.assignedAt !== "string" || !(typeof value.respondedAt === "string" || value.respondedAt === null)) return null;
  const execution = parseExecution(value.execution); if (value.execution !== null && !execution) return null;
  return { id: value.id, requestId: value.requestId, serviceId: value.serviceId, title: value.title, description: value.description, commandVersion: value.commandVersion as number, status: value.status as Assignment["status"], responseSummary: value.responseSummary as string | null, assignedAt: value.assignedAt, respondedAt: value.respondedAt as string | null, execution };
}
function parsePage(value: unknown, page: number, pageSize: number): Page | null {
  if (!record(value) || value.page !== page || value.pageSize !== pageSize || typeof value.hasMore !== "boolean" || !Array.isArray(value.items)) return null;
  const items = value.items.map(parseAssignment); if (items.some(item => !item)) return null;
  return { page, pageSize, hasMore: value.hasMore, items: items as Assignment[] };
}
const date = (value: string) => { const d = new Date(value); return Number.isFinite(d.getTime()) ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(d) : "—"; };
const statusLabel: Record<Assignment["status"], string> = { assigned: "در انتظار پاسخ", accepted: "پذیرفته‌شده", declined: "ردشده" };
const executionLabels: Record<string, string> = { accepted: "پذیرفته‌شده · نیازمند زمان‌بندی", scheduled: "زمان‌بندی‌شده", in_progress: "در حال اجرا", submitted: "تحویل‌شده · در انتظار بررسی نگارین", changes_requested: "نیازمند اصلاح", completed: "تکمیل‌شده با تأیید نگارین" };
function fileBase64(file: File): Promise<string> { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onerror = () => reject(new Error("خواندن فایل انجام نشد.")); reader.onload = () => { const value = typeof reader.result === "string" ? reader.result : ""; const comma = value.indexOf(","); if (comma < 0) reject(new Error("فایل قابل پردازش نیست.")); else resolve(value.slice(comma + 1)); }; reader.readAsDataURL(file); }); }

function ExecutionWorkspace({ execution, busy, uploading, pendingUpload, scheduledStart, scheduledEnd, scheduleSummary, executionSummary, selectedFileIds, fileUrls, onStartChange, onEndChange, onScheduleSummaryChange, onExecutionSummaryChange, onSchedule, onProgress, onUpload, onRetryUpload, onSelectFile, onOpenFile }: {
  execution: Execution; busy: boolean; uploading: boolean; pendingUpload: boolean; scheduledStart: string; scheduledEnd: string; scheduleSummary: string; executionSummary: string; selectedFileIds: string[]; fileUrls: Record<string, string>;
  onStartChange: (value: string) => void; onEndChange: (value: string) => void; onScheduleSummaryChange: (value: string) => void; onExecutionSummaryChange: (value: string) => void;
  onSchedule: (event: FormEvent<HTMLFormElement>) => void; onProgress: (action: "start" | "update" | "submit") => void; onUpload: (file: File, kind: "image" | "text") => void; onRetryUpload: () => void; onSelectFile: (id: string) => void; onOpenFile: (id: string) => void;
}) {
  const canSchedule = execution.status === "accepted" || execution.status === "scheduled";
  const canStart = execution.status === "scheduled" || execution.status === "changes_requested";
  const canReport = execution.status === "in_progress";
  return <section className={styles.execution}><header><div><h3>اجرای خدمت</h3><p>نسخهٔ اجرا {execution.version.toLocaleString("fa-IR")} · {executionLabels[execution.status] ?? execution.status}</p></div></header>
    {execution.scheduledStart && execution.scheduledEnd && <div className={styles.scheduleInfo}><strong>زمان پیشنهادی (زمان محلی دستگاه)</strong><span>{date(execution.scheduledStart)} تا {date(execution.scheduledEnd)}</span>{execution.scheduleSummary && <p>{execution.scheduleSummary}</p>}</div>}
    {canSchedule && <form className={styles.responseForm} onSubmit={onSchedule}><label>شروع پیشنهادی <input type="datetime-local" value={scheduledStart} onChange={event => onStartChange(event.target.value)} /></label><label>پایان پیشنهادی <input type="datetime-local" value={scheduledEnd} onChange={event => onEndChange(event.target.value)} /></label><label>توضیح زمان‌بندی<textarea maxLength={4000} value={scheduleSummary} onChange={event => onScheduleSummaryChange(event.target.value)} placeholder="زمان پیشنهادی را برای هماهنگی با هنرمند توضیح دهید." /></label><small>زمان به UTC ذخیره می‌شود. زمان‌بندی پیشنهاد همکار است و تأیید هنرمند را نشان نمی‌دهد.</small><div className={styles.actions}><button type="submit" disabled={busy || !scheduledStart || !scheduledEnd || !scheduleSummary.trim()}>ثبت یا به‌روزرسانی زمان‌بندی</button></div></form>}
    {canStart && <div className={styles.responseForm}><label>گزارش شروع اجرا</label><textarea maxLength={4000} value={executionSummary} onChange={event => onExecutionSummaryChange(event.target.value)} placeholder="شرح کوتاهی از شروع کار ثبت کنید."/><div className={styles.actions}><button type="button" disabled={busy || !executionSummary.trim()} onClick={() => onProgress("start")}>شروع اجرا</button></div></div>}
    {canReport && <div className={styles.responseForm}><label>گزارش پیشرفت یا تحویل متنی</label><textarea maxLength={4000} value={executionSummary} onChange={event => onExecutionSummaryChange(event.target.value)} placeholder="پیشرفت کار یا نتیجهٔ نهایی را توضیح دهید."/><small>تحویل متنی برای بررسی نگارین ارسال می‌شود؛ این عمل به‌معنی تکمیل تأییدشده یا دریافت مشتری نیست.</small><div className={styles.actions}><button type="button" disabled={busy || !executionSummary.trim()} onClick={() => onProgress("update")}>ثبت گزارش پیشرفت</button><button type="button" disabled={busy || !executionSummary.trim()} onClick={() => onProgress("submit")}>ارسال تحویل برای بررسی</button></div></div>}
    {canReport && <section className={styles.files}><header><div><h4>فایل‌های تحویل</h4><p>تصویر JPEG/PNG/WebP تا ۵ مگابایت یا متن UTF‑8 تا ۱ مگابایت.</p></div><span>{execution.files.length}/۱۰۰</span></header><div className={styles.uploadActions}><label>افزودن تصویر<input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy || uploading || pendingUpload || execution.files.length >= 100} onChange={(event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) onUpload(file, "image"); event.currentTarget.value = ""; }}/></label><label>افزودن فایل متنی<input type="file" accept="text/plain,.txt" disabled={busy || uploading || pendingUpload || execution.files.length >= 100} onChange={(event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) onUpload(file, "text"); event.currentTarget.value = ""; }}/></label>{pendingUpload && <button type="button" disabled={uploading} onClick={onRetryUpload}>{uploading ? "در حال بارگذاری…" : "تلاش دوباره با همان درخواست"}</button>}</div>{execution.files.length > 0 ? <ul className={styles.fileList}>{execution.files.map(file => <li key={file.id}><label><input type="checkbox" checked={selectedFileIds.includes(file.id)} disabled={busy || (selectedFileIds.length >= 8 && !selectedFileIds.includes(file.id))} onChange={() => onSelectFile(file.id)}/><span>{file.label}<small>{file.contentType} · {(file.byteLength / 1024).toLocaleString("fa-IR", { maximumFractionDigits: 1 })} کیلوبایت · نسخهٔ {file.uploadedExecutionVersion.toLocaleString("fa-IR")}</small></span></label>{fileUrls[file.id] ? <a className={styles.fileOpen} href={fileUrls[file.id]} target="_blank" rel="noreferrer">بازکردن فایل</a> : <button type="button" onClick={() => onOpenFile(file.id)}>دریافت پیوند امن</button>}</li>)}</ul> : <p className={styles.muted}>فایلی برای این تخصیص بارگذاری نشده است.</p>}<small>برای تحویل فایل‌دار، حداکثر ۸ فایل را انتخاب کنید؛ بدون انتخاب هم می‌توانید گزارش متنی بفرستید.</small></section>}
    {execution.status === "accepted" && !canSchedule && <p className={styles.muted}>برای شروع اجرا ابتدا زمان‌بندی را ثبت کنید.</p>}
    {execution.status === "submitted" && <div className={styles.response}><strong>گزارش تحویل در انتظار بررسی نگارین</strong><p>{execution.submissionSummary}</p></div>}
    {execution.status === "completed" && <div className={styles.response}><strong>تکمیل با بررسی نگارین</strong><p>{execution.reviewSummary}</p></div>}
    {execution.status === "changes_requested" && execution.reviewSummary && <div className={styles.response}><strong>درخواست اصلاح نگارین</strong><p>{execution.reviewSummary}</p></div>}
    {!!execution.history.length && <ol className={styles.executionHistory}>{execution.history.map(event => <li key={event.version}><strong>{executionLabels[event.toStatus] ?? event.toStatus}</strong><span>نسخهٔ {event.version.toLocaleString("fa-IR")} · {date(event.createdAt)}</span><p>{event.summary}</p></li>)}</ol>}
  </section>;
}

export type ServicePartnerView = "assignments" | "schedule" | "deliveries" | "history";
const partnerViews: Record<ServicePartnerView, { title: string; empty: string }> = {
  assignments: { title: "درخواست‌های تخصیص‌یافته", empty: "درخواستی برای حساب فعال تخصیص داده نشده است." },
  schedule: { title: "برنامهٔ اجرا", empty: "در این صفحه اجرای زمان‌بندی‌شده یا در حال انجامی نیست." },
  deliveries: { title: "تحویل‌ها", empty: "در این صفحه تحویلی برای بررسی یا اصلاح وجود ندارد." },
  history: { title: "تاریخچه", empty: "در این صفحه تخصیص پایان‌یافته‌ای وجود ندارد." }
};
function matchesView(item: Assignment, view: ServicePartnerView) {
  const status = item.execution?.status;
  if (view === "assignments") return true;
  if (view === "schedule") return item.status === "accepted" && ["accepted", "scheduled", "in_progress"].includes(String(status));
  if (view === "deliveries") return ["submitted", "changes_requested", "completed"].includes(String(status));
  return item.status === "declined" || status === "completed";
}

export function ServicePartnerAssignmentsLive({ view = "assignments" }: { view?: ServicePartnerView } = {}) {
  const [session, setSession] = useState<Session>("loading"); const [grants, setGrants] = useState<Grant[]>([]); const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState<Page | null>(null); const [selected, setSelected] = useState<Assignment | null>(null); const [summary, setSummary] = useState("");
  const [scheduledStart, setScheduledStart] = useState(""); const [scheduledEnd, setScheduledEnd] = useState(""); const [scheduleSummary, setScheduleSummary] = useState(""); const [executionSummary, setExecutionSummary] = useState("");
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]); const [fileUrls, setFileUrls] = useState<Record<string, string>>({}); const [uploading, setUploading] = useState(false); const [preparingUpload, setPreparingUpload] = useState(false);
  const pendingUpload = useRef<UploadCommand | null>(null);
  const [loading, setLoading] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [notice, setNotice] = useState("");
  const loadSession = useCallback(async () => {
    setSession("loading"); setError("");
    try {
      const active = await fetch("/api/auth/context", { cache: "no-store" });
      if (active.ok) { const context: unknown = await active.json(); if (!record(context) || typeof context.activeRole !== "string") { setSession("error"); return; } if (context.activeRole === "service-partner") { setSession("ready"); return; } }
      else if (active.status !== 401) { setSession("error"); return; }
      const response = await fetch("/api/auth/grants", { cache: "no-store" }); if (response.status === 401) { setSession("signed-out"); return; } if (!response.ok) { setSession("error"); return; }
      const body: unknown = await response.json(); if (!record(body) || !Array.isArray(body.grants)) { setSession("error"); return; }
      const partnerGrants = body.grants.filter((grant): grant is Grant => record(grant) && typeof grant.id === "string" && grant.role === "service_partner").map(grant => ({ id: grant.id as string, ...(typeof grant.organizationName === "string" ? { organizationName: grant.organizationName } : {}) }));
      setGrants(partnerGrants); setSession(partnerGrants.length ? "choose" : "forbidden");
    } catch { setSession("error"); }
  }, []);
  useEffect(() => { void loadSession(); }, [loadSession]);
  const loadPage = useCallback(async () => {
    if (session !== "ready") return;
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/service-partner/assignments?page=${pageNumber}&pageSize=10&view=${view}`, { cache: "no-store" });
      if (response.status === 401) throw new Error("نشست شریک خدمت معتبر نیست یا پایان یافته است."); if (response.status === 403) throw new Error("دسترسی شریک خدمت فعال نیست."); if (!response.ok) throw new Error("فهرست درخواست‌های تخصیص‌یافته دریافت نشد.");
      const parsed = parsePage(await response.json(), pageNumber, 10); if (!parsed) throw new Error("ساختار فهرست تخصیص‌ها معتبر نیست."); setPage(parsed); setSelected(current => current ? parsed.items.find(item => item.id === current.id) ?? null : null);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با سرویس درخواست‌ها برقرار نشد."); }
    finally { setLoading(false); }
  }, [pageNumber, session, view]);
  useEffect(() => { void loadPage(); }, [loadPage]);
  async function openAssignment(id: string) {
    setSelected(null); setError(""); setNotice(""); setLoading(true);
    try { const response = await fetch(`/api/service-partner/assignments/${id}`, { cache: "no-store" }); if (response.status === 404) throw new Error("این تخصیص برای حساب و سازمان فعال شما در دسترس نیست."); if (!response.ok) throw new Error("جزئیات درخواست دریافت نشد."); const item = parseAssignment(await response.json()); if (!item) throw new Error("پاسخ تخصیص معتبر نیست."); setSelected(item); setSummary(item.responseSummary ?? ""); setExecutionSummary(item.execution?.progressSummary ?? item.execution?.submissionSummary ?? ""); setScheduledStart(""); setScheduledEnd(""); setScheduleSummary(item.execution?.scheduleSummary ?? ""); setSelectedFileIds([]); setFileUrls({}); pendingUpload.current = null; }
    catch (cause) { setError(cause instanceof Error ? cause.message : "جزئیات درخواست دریافت نشد."); }
    finally { setLoading(false); }
  }
  async function refreshAssignment(id: string) {
    const response = await fetch(`/api/service-partner/assignments/${id}`, { cache: "no-store" });
    if (!response.ok) throw new Error("آخرین وضعیت اجرا دریافت نشد.");
    const updated = parseAssignment(await response.json()); if (!updated) throw new Error("پاسخ وضعیت اجرا معتبر نیست.");
    setSelected(updated); setPage(current => current ? { ...current, items: current.items.map(row => row.id === updated.id ? updated : row) } : current);
    setSelectedFileIds(current => current.filter(id => updated.execution?.files.some(file => file.id === id)));
    setExecutionSummary(updated.execution?.progressSummary ?? updated.execution?.submissionSummary ?? ""); setScheduleSummary(updated.execution?.scheduleSummary ?? "");
    return updated;
  }
  async function respond(decision: "accepted" | "declined") {
    if (!selected || busy) return;
    if (!summary.trim()) { setError("خلاصهٔ پاسخ را وارد کنید."); return; }
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch(`/api/service-partner/assignments/${selected.id}/response`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ version: selected.commandVersion, decision, summary: summary.trim() }) });
      if (response.status === 409) { await openAssignment(selected.id); setNotice("وضعیت تخصیص تغییر کرده است؛ آخرین وضعیت بارگیری شد."); return; }
      if (response.status === 401) throw new Error("نشست شریک خدمت معتبر نیست؛ دوباره وارد شوید."); if (response.status === 404) throw new Error("این تخصیص دیگر برای حساب شما فعال نیست."); if (!response.ok) throw new Error("ثبت پاسخ به تخصیص انجام نشد.");
      const updated = parseAssignment(await response.json()); if (!updated) throw new Error("پاسخ ثبت شد اما دادهٔ بازگشتی معتبر نیست."); setSelected(updated); setPage(current => current ? { ...current, items: current.items.map(row => row.id === updated.id ? updated : row) } : current); setNotice(decision === "accepted" ? "درخواست پذیرفته شد؛ مرحلهٔ اجرا جداگانه ادامه پیدا می‌کند." : "درخواست رد شد و برای تخصیص دوباره به نگارین بازمی‌گردد.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "پاسخ ثبت نشد؛ وضعیت را تازه کنید."); }
    finally { setBusy(false); }
  }
  async function schedule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!selected?.execution || busy) return;
    const start = new Date(scheduledStart), end = new Date(scheduledEnd);
    if (!scheduledStart || !scheduledEnd || !Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || end <= start) { setError("زمان شروع و پایان معتبر را وارد کنید؛ پایان باید بعد از شروع باشد."); return; }
    if (!scheduleSummary.trim()) { setError("خلاصهٔ زمان‌بندی را وارد کنید."); return; }
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch(`/api/service-partner/assignments/${selected.id}/schedule`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ version: selected.execution.version, scheduledStart: start.toISOString(), scheduledEnd: end.toISOString(), summary: scheduleSummary.trim() }) });
      if (response.status === 409) { await refreshAssignment(selected.id); setNotice("وضعیت زمان‌بندی تغییر کرده است؛ آخرین وضعیت بارگیری شد."); return; }
      if (response.status === 401) throw new Error("نشست شریک خدمت معتبر نیست؛ دوباره وارد شوید."); if (!response.ok) throw new Error("ثبت زمان‌بندی انجام نشد؛ زمان شروع باید در آینده باشد.");
      await refreshAssignment(selected.id); setScheduledStart(""); setScheduledEnd(""); setNotice("پیشنهاد زمان‌بندی ثبت شد.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "زمان‌بندی ثبت نشد."); }
    finally { setBusy(false); }
  }
  async function progress(action: "start" | "update" | "submit") {
    if (!selected?.execution || busy) return;
    if (!executionSummary.trim()) { setError("گزارش مرحله را وارد کنید."); return; }
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch(`/api/service-partner/assignments/${selected.id}/execution`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ version: selected.execution.version, action, summary: executionSummary.trim(), ...(action === "submit" ? { fileIds: selectedFileIds } : {}) }) });
      if (response.status === 409) { await refreshAssignment(selected.id); setNotice("نسخهٔ اجرا تغییر کرده است؛ آخرین وضعیت بارگیری شد."); return; }
      if (response.status === 401) throw new Error("نشست شریک خدمت معتبر نیست؛ دوباره وارد شوید."); if (!response.ok) throw new Error("ثبت مرحلهٔ اجرا انجام نشد.");
      await refreshAssignment(selected.id); setNotice(action === "submit" ? "گزارش تحویل ثبت شد و برای بررسی نگارین ارسال شد." : action === "start" ? "شروع اجرا ثبت شد." : "گزارش پیشرفت ثبت شد.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "مرحلهٔ اجرا ثبت نشد."); }
    finally { setBusy(false); }
  }
  async function sendPendingUpload() {
    const command = pendingUpload.current; if (!command || uploading) return;
    setUploading(true); setError(""); setNotice("");
    try {
      const response = await fetch(`/api/service-partner/assignments/${command.assignmentId}/files`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(command) });
      if (response.status === 409) { pendingUpload.current = null; await refreshAssignment(command.assignmentId); throw new Error("نسخهٔ اجرا تغییر کرده است؛ فایل را دوباره انتخاب و بارگذاری کنید."); }
      if (response.status === 401) throw new Error("نشست شریک خدمت معتبر نیست؛ دوباره وارد شوید.");
      if (response.status === 413) { pendingUpload.current = null; throw new Error("حجم فایل از سقف مجاز بیشتر است."); }
      if (response.status === 503) throw new Error("فضای ذخیره‌سازی فایل موقتاً در دسترس نیست؛ همان درخواست را دوباره امتحان کنید.");
      if (!response.ok) { if (response.status < 500) pendingUpload.current = null; throw new Error("بارگذاری فایل انجام نشد؛ فایل یا وضعیت اجرا را بررسی کنید."); }
      const value: unknown = await response.json();
      if (!record(value) || !record(value.file) || !uuid(value.file.id) || !Number.isSafeInteger(value.version)) throw new Error("فایل ثبت شد اما پاسخ سرور معتبر نیست.");
      pendingUpload.current = null; await refreshAssignment(command.assignmentId); setNotice("فایل خصوصی به تاریخچهٔ اجرا اضافه شد؛ برای ارسال آن، گزینهٔ فایل را در فهرست تحویل انتخاب کنید.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "بارگذاری ناموفق بود؛ برای حفظ همان درخواست دوباره تلاش کنید."); }
    finally { setUploading(false); }
  }
  async function uploadFile(file: File, kind: "image" | "text") {
    if (!selected?.execution || selected.execution.status !== "in_progress" || selected.execution.files.length >= 100 || uploading || preparingUpload) return;
    if (kind === "image" && (file.size > 5 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(file.type))) { setError("فقط تصویر JPEG، PNG یا WebP تا ۵ مگابایت پذیرفته می‌شود."); return; }
    if (kind === "text" && (file.size > 1024 * 1024 || (file.type && file.type !== "text/plain") || !/\.txt$/i.test(file.name))) { setError("فقط فایل متنی TXT با UTF‑8 تا ۱ مگابایت پذیرفته می‌شود."); return; }
    const label = file.name.trim(); if (!label || label.length > 200 || /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u.test(label)) { setError("نام فایل معتبر نیست یا از ۲۰۰ نویسه بیشتر است."); return; }
    setError(""); setNotice(""); setPreparingUpload(true);
    try {
      pendingUpload.current = { assignmentId: selected.id, version: selected.execution.version, idempotencyKey: crypto.randomUUID(), kind, label, base64: await fileBase64(file) };
      await sendPendingUpload();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "خواندن فایل انجام نشد."); }
    finally { setPreparingUpload(false); }
  }
  function toggleSelectedFile(id: string) { setSelectedFileIds(current => current.includes(id) ? current.filter(value => value !== id) : current.length >= 8 ? current : [...current, id]); }
  async function openFile(id: string) {
    if (!selected) return;
    setError("");
    try { const response = await fetch(`/api/service-partner/assignments/${selected.id}/files/${id}`, { cache: "no-store" }); if (!response.ok) throw new Error("پیوند امن فایل دریافت نشد."); const value: unknown = await response.json(); if (!record(value) || !uuid(value.id) || typeof value.url !== "string" || !value.url.startsWith("https://")) throw new Error("پاسخ فایل معتبر نیست."); setFileUrls(current => ({ ...current, [id]: value.url as string })); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "دریافت فایل انجام نشد."); }
  }
  async function chooseGrant(id: string) { setSession("loading"); setError(""); try { const response = await fetch("/api/auth/context", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ grantId: id }) }); if (!response.ok) throw new Error(); setSession("ready"); } catch { setError("فعال‌سازی دسترسی شریک خدمت انجام نشد."); setSession("error"); } }
  async function logout() { await fetch("/api/auth/session", { method: "DELETE" }); location.assign("/"); }
  const visibleAssignments = page?.items.filter(item => matchesView(item, view)) ?? [];
  return <main className={styles.page} dir="rtl" lang="fa-IR"><aside className={styles.sidebar}><a className={styles.brand} href="/"><span className={styles.brandMark}>ن</span><strong>نگارین<small>پنل همکار خدمات</small></strong></a><nav aria-label="منوی همکار خدمات"><a className={view === "assignments" ? styles.active : undefined} href="/service-partner/assignments" aria-current={view === "assignments" ? "page" : undefined}>درخواست‌های تخصیص‌یافته</a><a className={view === "schedule" ? styles.active : undefined} href="/service-partner/schedule" aria-current={view === "schedule" ? "page" : undefined}>برنامهٔ اجرا</a><a className={view === "deliveries" ? styles.active : undefined} href="/service-partner/deliveries" aria-current={view === "deliveries" ? "page" : undefined}>تحویل‌ها</a><a className={view === "history" ? styles.active : undefined} href="/service-partner/history" aria-current={view === "history" ? "page" : undefined}>تاریخچه</a><a href="/preview/service-partner">پیش‌نمایش سایر بخش‌ها</a></nav><button className={styles.logout} type="button" onClick={() => void logout()}>خروج امن</button></aside>
    <section className={styles.main}><header className={styles.header}><div><p>خانه نگارین / همکار خدمات</p><h1>{partnerViews[view].title}</h1><span>اطلاعات بر اساس حساب و سازمان فعال شما نمایش داده می‌شود.</span></div><span className={styles.badge}>اتصال زنده به API</span></header>
      {session === "loading" && <section className={styles.panel}>در حال بررسی نشست امن…</section>}{session === "signed-out" && <section className={styles.panel}><h2>ورود لازم است</h2><p>برای مشاهدهٔ درخواست‌ها، نشست معتبر شریک خدمت لازم است.</p></section>}{session === "forbidden" && <section className={styles.panel}><h2>دسترسی شریک خدمت موجود نیست</h2><p>در نشست فعال حساب شریک خدمت در دسترس نیست.</p></section>}{session === "choose" && <section className={styles.panel}><h2>انتخاب سازمان و حساب همکار</h2><p>تخصیص‌ها بر اساس حساب و سازمان فعال محدود می‌شوند.</p><div className={styles.grants}>{grants.map(grant => <button key={grant.id} type="button" onClick={() => void chooseGrant(grant.id)}>{grant.organizationName ?? "فعال‌سازی حساب همکار خدمات"}</button>)}</div></section>}{session === "error" && <section className={styles.panel}><p className={styles.error} role="alert">{error || "نشست کاربری قابل بررسی نیست."}</p><button type="button" onClick={() => void loadSession()}>تلاش دوباره</button></section>}
      {session === "ready" && <div className={styles.columns}><section className={styles.panel}><div className={styles.toolbar}><div><h2>{partnerViews[view].title}</h2><p>{page ? `${visibleAssignments.length.toLocaleString("fa-IR")} مورد در این صفحه` : "درخواست‌های حساب فعال"}</p></div><button type="button" disabled={loading} onClick={() => void loadPage()}>تازه‌سازی</button></div>{error && <p className={styles.error} role="alert">{error}</p>}{notice && <p className={styles.notice} role="status">{notice}</p>}{loading && <p className={styles.muted}>در حال دریافت درخواست‌ها…</p>}{!loading && !error && visibleAssignments.length === 0 && <p className={styles.muted}>{partnerViews[view].empty}</p>}<div className={styles.list}>{visibleAssignments.map(item => <button type="button" key={item.id} className={styles.item} aria-current={selected?.id === item.id ? "true" : undefined} onClick={() => void openAssignment(item.id)}><strong>{item.title}</strong><span>{statusLabel[item.status]}{item.execution ? ` · ${executionLabels[item.execution.status] ?? item.execution.status}` : ""}</span><small>{date(item.assignedAt)} · شناسهٔ درخواست <bdi dir="ltr">{item.requestId.slice(0, 8)}…</bdi></small></button>)}</div>{page && (pageNumber > 1 || page.hasMore) && <div className={styles.paging}><button type="button" disabled={loading || pageNumber <= 1} onClick={() => setPageNumber(n => Math.max(1, n - 1))}>صفحهٔ قبل</button><span>{pageNumber.toLocaleString("fa-IR")}</span><button type="button" disabled={loading || !page.hasMore || pageNumber >= 1000} onClick={() => setPageNumber(n => n + 1)}>صفحهٔ بعد</button></div>}</section>
        <section className={styles.panel}>{!selected && <p className={styles.muted}>برای مشاهدهٔ شرح کار و پاسخ‌ها یک درخواست را انتخاب کنید.</p>}{selected && <><div className={styles.toolbar}><div><h2>{selected.title}</h2><p>شناسهٔ درخواست <bdi dir="ltr">{selected.requestId}</bdi></p></div><span className={styles.status}>{statusLabel[selected.status]}</span></div><div className={styles.detail}><h3>شرح کار</h3><p>{selected.description}</p><p>زمان تخصیص: {date(selected.assignedAt)}</p></div>{selected.responseSummary && <div className={styles.response}><strong>خلاصهٔ پاسخ ثبت‌شده</strong><p>{selected.responseSummary}</p>{selected.respondedAt && <small>{date(selected.respondedAt)}</small>}</div>}{selected.status === "assigned" ? <form className={styles.responseForm} onSubmit={(event: FormEvent) => event.preventDefault()}><label htmlFor="assignment-summary">خلاصهٔ پاسخ</label><textarea id="assignment-summary" maxLength={2000} value={summary} onChange={event => setSummary(event.target.value)} placeholder="پذیرش یا دلیل رد تخصیص را بنویسید."/><small>پذیرش، مرحلهٔ اجرای خدمت را ایجاد می‌کند. رد، درخواست را برای تخصیص دوباره به نگارین برمی‌گرداند.</small><div className={styles.actions}><button type="button" disabled={busy || !summary.trim()} onClick={() => void respond("accepted")}>{busy ? "در حال ثبت…" : "پذیرش درخواست"}</button><button type="button" disabled={busy || !summary.trim()} onClick={() => void respond("declined")}>رد و بازگرداندن برای تخصیص</button></div></form> : selected.status === "declined" ? <p className={styles.muted}>این تخصیص رد شده است و درخواست به صف تخصیص دوباره بازگشته است.</p> : <>{selected.execution && <ExecutionWorkspace execution={selected.execution} busy={busy} uploading={uploading || preparingUpload} pendingUpload={pendingUpload.current !== null} scheduledStart={scheduledStart} scheduledEnd={scheduledEnd} scheduleSummary={scheduleSummary} executionSummary={executionSummary} selectedFileIds={selectedFileIds} fileUrls={fileUrls} onStartChange={setScheduledStart} onEndChange={setScheduledEnd} onScheduleSummaryChange={setScheduleSummary} onExecutionSummaryChange={setExecutionSummary} onSchedule={event => void schedule(event)} onProgress={action => void progress(action)} onUpload={(file, kind) => void uploadFile(file, kind)} onRetryUpload={() => void sendPendingUpload()} onSelectFile={toggleSelectedFile} onOpenFile={id => void openFile(id)} />}</>}</>}</section></div>}
    </section>
  </main>;
}
