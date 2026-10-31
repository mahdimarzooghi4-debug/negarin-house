"use client";

import { useState, type FormEvent } from "react";
import styles from "./live-programs.module.css";

type Values = { title: string; description: string; rules: string };

export function SupportProgramCreate({ onCancel, onComplete }: { onCancel: () => void; onComplete: () => void }) {
  const [values, setValues] = useState<Values>({ title: "", description: "", rules: "" });
  const [commandKey, setCommandKey] = useState<{ payload: string; key: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const update = (field: keyof Values, value: string) => setValues(current => ({ ...current, [field]: value }));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = { title: values.title.trim(), description: values.description.trim(), rules: values.rules.trim() };
    const payload = JSON.stringify(command);
    setBusy(true); setError("");
    try {
      const idempotencyKey = commandKey?.payload === payload ? commandKey.key : crypto.randomUUID();
      if (commandKey?.payload !== payload) setCommandKey({ payload, key: idempotencyKey });
      const response = await fetch("/api/supporting-organization/support-programs", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...command, idempotencyKey })
      });
      if (response.status === 401) throw new Error("برای ثبت برنامه وارد حساب سازمان حمایتی شوید.");
      if (response.status === 403) throw new Error("این بخش فقط برای نقش سازمان حمایتی در دسترس است.");
      if (!response.ok) throw new Error("برنامه ثبت نشد. عنوان، توضیحات و قواعد را بررسی کنید.");
      onComplete();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "ارتباط با سامانه برقرار نشد.");
    } finally { setBusy(false); }
  }

  return <form className={styles.programForm} onSubmit={submit}>
    <h3>برنامهٔ حمایتی تازه</h3>
    <label className={styles.field}>عنوان برنامه
      <input value={values.title} onChange={event => update("title", event.target.value)} maxLength={200} required />
    </label>
    <label className={styles.field}>توضیحات
      <textarea value={values.description} onChange={event => update("description", event.target.value)} maxLength={4000} rows={3} required />
    </label>
    <label className={styles.field}>قواعد و شرایط برنامه
      <textarea value={values.rules} onChange={event => update("rules", event.target.value)} maxLength={8000} rows={4} required />
    </label>
    <div className={styles.referralActions}><span>قواعد پس از ثبت برای تخصیص اعتبار ذخیره می‌شوند.</span><div><button type="submit" disabled={busy}>{busy ? "در حال ثبت…" : "ثبت برنامه"}</button><button type="button" className={styles.secondary} disabled={busy} onClick={onCancel}>انصراف</button></div></div>
    {error && <p className={styles.error} role="alert">{error}</p>}
  </form>;
}
