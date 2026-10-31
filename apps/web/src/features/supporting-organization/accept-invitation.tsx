"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./live-programs.module.css";

export function OrganizationInvitationAccept() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);

  useEffect(() => { setToken(new URLSearchParams(window.location.hash.slice(1)).get("token") ?? ""); }, []);

  async function accept() {
    if (!/^[A-Za-z0-9_-]{40,50}$/.test(token)) { setError("لینک دعوت معتبر نیست یا ناقص است."); return; }
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/identity/organization-invitations/accept", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ token }) });
      if (response.status === 401) throw new Error("ابتدا با شمارهٔ موبایلی که دعوت به آن ارسال شده وارد شوید.");
      if (response.status === 403) throw new Error("این دعوت برای شمارهٔ حساب فعلی صادر نشده است. با شمارهٔ دعوت‌شده وارد شوید.");
      if (response.status === 404) throw new Error("لینک دعوت پیدا نشد یا قبلاً استفاده شده است.");
      if (response.status === 409) throw new Error("این دعوت منقضی، لغو یا قبلاً استفاده شده است.");
      if (!response.ok) throw new Error("پذیرش دعوت انجام نشد.");
      const body: unknown = await response.json();
      if (!body || typeof body !== "object" || !("grantId" in body) || typeof body.grantId !== "string") throw new Error("دسترسی ساخته شد اما پاسخ معتبر نیست.");
      const selected = await fetch("/api/auth/context", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ grantId: body.grantId }) });
      setAccepted(true);
      if (selected.ok) router.replace("/supporting-organization/support-programs");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با سامانه برقرار نشد."); }
    finally { setBusy(false); }
  }

  return <main className={styles.page} dir="rtl" lang="fa-IR"><header className={styles.header}><div><p className={styles.eyebrow}>خانهٔ نگارین / دعوت سازمانی</p><h1>پذیرش دعوت همکار</h1><p>برای افزودن دسترسی سازمان، با شمارهٔ تلفنی وارد شوید که این دعوت برای آن ساخته شده است.</p></div><span className={styles.badge}>دعوت یک‌بارمصرف</span></header>
    <section className={styles.section}><h2>دسترسی به سازمان حمایتی</h2><p className={styles.explainer}>پس از پذیرش، دسترسی سازمان به حساب فعلی شما افزوده می‌شود. لینک پس از پذیرش دیگر قابل استفاده نیست.</p>
      {error && <p className={styles.error} role="alert">{error}</p>}{accepted && <p className={styles.notice} role="status">دعوت پذیرفته شد. اگر انتقال خودکار انجام نشد، وارد صفحهٔ برنامه‌های حمایتی شوید.</p>}
      <div className={styles.invitationActions}><button type="button" disabled={busy || accepted} onClick={() => void accept()}>{busy ? "در حال پذیرش…" : accepted ? "دعوت پذیرفته شد" : "پذیرش دعوت"}</button>{accepted && <a href="/supporting-organization/support-programs">رفتن به پنل سازمان</a>}</div>
    </section>
  </main>;
}
