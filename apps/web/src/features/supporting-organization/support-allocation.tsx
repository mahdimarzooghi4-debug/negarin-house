"use client";

import { useState, type FormEvent } from "react";
import styles from "./live-programs.module.css";

function normalizeDigits(value: string) {
  return value.replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - 1776)).replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 1632));
}

export function SupportAllocation({ relationshipId, artistName, onCancel, onComplete }: {
  relationshipId: string;
  artistName: string;
  onCancel: () => void;
  onComplete: (amount: string) => void;
}) {
  const [amount, setAmount] = useState("");
  const [commandKey, setCommandKey] = useState<{ amount: string; key: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amountToman = normalizeDigits(amount).replace(/[^0-9]/g, "").replace(/^0+(?=\d)/, "");
    if (!amountToman || amountToman === "0") { setError("مبلغ تخصیص را به تومان وارد کنید."); return; }
    setBusy(true); setError("");
    try {
      const idempotencyKey = commandKey?.amount === amountToman ? commandKey.key : crypto.randomUUID();
      if (commandKey?.amount !== amountToman) setCommandKey({ amount: amountToman, key: idempotencyKey });
      const response = await fetch(`/api/supporting-organization/support-relationships/${relationshipId}/allocations`, {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ idempotencyKey, amountToman })
      });
      if (response.status === 401) throw new Error("برای تخصیص اعتبار وارد حساب سازمان حمایتی شوید.");
      if (response.status === 403) throw new Error("این بخش فقط برای نقش سازمان حمایتی در دسترس است.");
      if (response.status === 404) throw new Error("این رابطه هنوز تأیید نشده یا در دسترس نیست.");
      if (!response.ok) throw new Error("تخصیص اعتبار ثبت نشد. مبلغ را بررسی و دوباره تلاش کنید.");
      onComplete(amountToman);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "ارتباط با سامانه برقرار نشد.");
    } finally { setBusy(false); }
  }

  return <form className={styles.allocationForm} onSubmit={submit}>
    <label className={styles.field}>مبلغ تخصیص به تومان
      <input inputMode="numeric" dir="ltr" value={amount} onChange={event => setAmount(event.target.value)} placeholder="مثلاً ۵۰۰۰۰۰۰" maxLength={20} />
    </label>
    <div className={styles.referralActions}><span>برای «{artistName}»</span><div><button type="submit" disabled={busy}>{busy ? "در حال ثبت…" : "ثبت تخصیص"}</button><button type="button" className={styles.secondary} disabled={busy} onClick={onCancel}>انصراف</button></div></div>
    {error && <p className={styles.error} role="alert">{error}</p>}
    <p className={styles.explainer}>تخصیص پس از ثبت، در تاریخچهٔ اعتبار برنامه ثبت می‌شود و قابل پیگیری است.</p>
  </form>;
}
