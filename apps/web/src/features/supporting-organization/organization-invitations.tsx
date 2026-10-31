"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import styles from "./live-programs.module.css";

type Invitation = { id: string; maskedPhone: string; createdAt: string; expiresAt: string; acceptedAt: string | null; status: "pending" | "accepted" | "revoked" | "expired" };
type Page = { page: number; pageSize: number; hasMore: boolean; items: Invitation[] };
const pageSize = 20;
function record(value: unknown): Record<string, unknown> | null { return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null; }
function parsePage(value: unknown, page: number): Page | null {
  const root = record(value);
  if (!root || root.page !== page || root.pageSize !== pageSize || typeof root.hasMore !== "boolean" || !Array.isArray(root.items) || root.items.length > pageSize) return null;
  const items = root.items.map(value => {
    const item = record(value);
    if (!item || typeof item.id !== "string" || typeof item.maskedPhone !== "string" || typeof item.createdAt !== "string" || typeof item.expiresAt !== "string" || !(item.acceptedAt === null || typeof item.acceptedAt === "string") || !["pending", "accepted", "revoked", "expired"].includes(String(item.status))) return null;
    return { id: item.id, maskedPhone: item.maskedPhone, createdAt: item.createdAt, expiresAt: item.expiresAt, acceptedAt: item.acceptedAt as string | null, status: item.status as Invitation["status"] };
  });
  return items.some(item => item === null) ? null : { page, pageSize, hasMore: root.hasMore, items: items as Invitation[] };
}
function date(value: string) { const time = new Date(value); return Number.isFinite(time.getTime()) ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" }).format(time) : "—"; }
const statusLabel: Record<Invitation["status"], string> = { pending: "در انتظار پذیرش", accepted: "پذیرفته‌شده", revoked: "لغوشده", expired: "منقضی‌شده" };

export function OrganizationInvitations() {
  const [phone, setPhone] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState<Page | null>(null);
  const [invitationUrl, setInvitationUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);
  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/supporting-organization/invitations?page=${pageNumber}&pageSize=${pageSize}`, { cache: "no-store" });
      if (response.status === 401) throw new Error("برای دیدن دعوت‌ها وارد پنل سازمان شوید.");
      if (response.status === 403) throw new Error("این بخش فقط برای نقش سازمان حمایتی در دسترس است.");
      if (!response.ok) throw new Error("فهرست دعوت‌ها دریافت نشد.");
      const parsed = parsePage(await response.json(), pageNumber);
      if (!parsed) throw new Error("پاسخ دعوت‌ها معتبر نیست.");
      setPage(parsed);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با سامانه برقرار نشد."); }
    finally { setLoading(false); }
  }, [pageNumber]);
  useEffect(() => { void load(); }, [load]);

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setNotice(""); setInvitationUrl("");
    try {
      const response = await fetch("/api/supporting-organization/invitations", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ phone: phone.trim() }) });
      if (response.status === 409) throw new Error("این شماره هم‌اکنون به سازمان دسترسی دارد.");
      if (response.status === 401) throw new Error("نشست سازمانی معتبر نیست یا پایان یافته است.");
      if (response.status === 403) throw new Error("این بخش فقط برای نقش سازمان حمایتی در دسترس است.");
      if (response.status === 400) throw new Error("شماره را با قالب بین‌المللی یا شمارهٔ موبایل ایران وارد کنید.");
      if (!response.ok) throw new Error("دعوت‌نامه ساخته نشد.");
      const value = record(await response.json());
      if (!value || typeof value.token !== "string" || typeof value.expiresAt !== "string") throw new Error("پاسخ دعوت‌نامه معتبر نیست.");
      const url = new URL("/supporting-organization/accept-invitation", location.origin); url.hash = `token=${encodeURIComponent(value.token)}`;
      setInvitationUrl(url.toString()); setCopied(false); setPhone(""); setNotice(`لینک دعوت تا ${date(value.expiresAt)} معتبر است؛ آن را فقط برای همکار موردنظر بفرستید.`);
      setPageNumber(1); if (pageNumber === 1) await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "خطای ساخت دعوت‌نامه."); }
    finally { setBusy(false); }
  }
  async function revoke(item: Invitation) {
    if (busy) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch(`/api/supporting-organization/invitations/${item.id}/revoke`, { method: "POST" });
      if (response.status === 401) throw new Error("نشست سازمانی معتبر نیست یا پایان یافته است.");
      if (response.status === 403) throw new Error("این بخش فقط برای نقش سازمان حمایتی در دسترس است.");
      if (!response.ok) throw new Error("دعوت‌نامه لغو نشد؛ شاید قبلاً پذیرفته شده باشد.");
      setNotice("دعوت‌نامه لغو شد."); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "خطای لغو دعوت‌نامه."); }
    finally { setBusy(false); }
  }
  async function copyLink() {
    if (!invitationUrl) return;
    try { await navigator.clipboard.writeText(invitationUrl); setCopied(true); }
    catch { setNotice("کپی خودکار در این مرورگر فعال نیست؛ لینک را از کادر انتخاب و کپی کنید."); }
  }

  return <section className={styles.section}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>دعوت همکار</p><h2>دعوت و دسترسی اعضا</h2></div></div>
    <p className={styles.explainer}>شمارهٔ همکار را وارد کنید. لینک یک‌بارمصرف فقط همین‌جا نمایش داده می‌شود؛ همکار باید با همان شماره وارد شود و دعوت را بپذیرد. فعلاً همهٔ اعضای فعال اختیارات یکسان دارند.</p>
    <form className={styles.invitationForm} onSubmit={create}><label className={styles.field}>شمارهٔ موبایل همکار<input type="tel" inputMode="tel" dir="ltr" autoComplete="tel" maxLength={40} placeholder="0912… یا ‎+98912…" value={phone} onChange={event => setPhone(event.target.value)} required /></label><button type="submit" disabled={busy}>{busy ? "در حال ساخت…" : "ساخت لینک دعوت"}</button></form>
    {invitationUrl && <div className={styles.inviteLink}><label className={styles.field}>لینک دعوت<textarea readOnly rows={2} dir="ltr" value={invitationUrl} onFocus={event => event.currentTarget.select()} /></label><button type="button" onClick={() => void copyLink()}>{copied ? "کپی شد" : "کپی لینک"}</button></div>}
    {notice && <p className={styles.notice} role="status">{notice}</p>}{error && <p className={styles.error} role="alert">{error}</p>}
    <div className={styles.sectionHead}><div><p className={styles.eyebrow}>پیگیری</p><h2>دعوت‌های ارسال‌شده</h2></div><button type="button" disabled={loading || busy} onClick={() => void load()}>تازه‌سازی</button></div>
    {loading && <p className={styles.notice} role="status">در حال دریافت دعوت‌ها…</p>}
    {page && (page.items.length ? <div className={styles.invitations}>{page.items.map(item => <article key={item.id}><div><strong dir="ltr">{item.maskedPhone}</strong><span>{statusLabel[item.status]} · ایجاد {date(item.createdAt)}{item.status === "pending" ? ` · انقضا ${date(item.expiresAt)}` : ""}</span></div>{item.status === "pending" && <button type="button" className={styles.secondary} disabled={busy} onClick={() => void revoke(item)}>لغو دعوت</button>}</article>)}</div> : !loading && <p className={styles.empty}>دعوتی ثبت نشده است.</p>)}
    {page && (pageNumber > 1 || page.hasMore) && <nav className={styles.pagination} aria-label="صفحه‌بندی دعوت‌ها"><button type="button" disabled={loading || busy || pageNumber <= 1} onClick={() => setPageNumber(value => value - 1)}>صفحهٔ قبل</button><span>{pageNumber.toLocaleString("fa-IR")}</span><button type="button" disabled={loading || busy || !page.hasMore} onClick={() => setPageNumber(value => value + 1)}>صفحهٔ بعد</button></nav>}
  </section>;
}
