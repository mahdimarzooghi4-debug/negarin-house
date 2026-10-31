"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./live-storefront.module.css";

type Storefront = { id: string; storeName: string; shortIntro: string; about: string; coverImageId: string | null; avatarImageId: string | null; version: number; updatedAt: string };
type Form = Pick<Storefront, "storeName" | "shortIntro" | "about">;
const empty: Storefront = { id: "", storeName: "", shortIntro: "", about: "", coverImageId: null, avatarImageId: null, version: 0, updatedAt: "" };
const maxImageBytes = 5 * 1024 * 1024;

async function fileBase64(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 0x8000) binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  return btoa(binary);
}

function messageFor(status: number) {
  if (status === 401) return "برای ویرایش فروشگاه وارد حساب هنرمند شوید.";
  if (status === 403) return "این صفحه فقط برای نقش هنرمند در دسترس است.";
  if (status === 409) return "اطلاعات فروشگاه در جای دیگری تغییر کرده است؛ اطلاعات تازه بارگذاری شد.";
  return "ذخیرهٔ اطلاعات فروشگاه انجام نشد. دوباره تلاش کنید.";
}

export function ArtistStorefrontLive() {
  const [saved, setSaved] = useState<Storefront>(empty);
  const [form, setForm] = useState<Form>({ storeName: "", shortIntro: "", about: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageBusy, setImageBusy] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverUrl, setCoverUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const coverInput = useRef<HTMLInputElement>(null);
  const avatarInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    try {
      const response = await fetch("/api/artist/storefront", { cache: "no-store", signal });
      if (!response.ok) throw new Error(messageFor(response.status));
      const value: unknown = await response.json();
      if (!value || typeof value !== "object" || !("id" in value) || !("storeName" in value) || !("shortIntro" in value) || !("about" in value) ||
          !("version" in value) || typeof value.storeName !== "string" || typeof value.shortIntro !== "string" ||
          typeof value.id !== "string" || typeof value.about !== "string" || typeof value.version !== "number" || !Number.isInteger(value.version) ||
          !("coverImageId" in value) || !(value.coverImageId === null || typeof value.coverImageId === "string") ||
          !("avatarImageId" in value) || !(value.avatarImageId === null || typeof value.avatarImageId === "string")) {
        throw new Error("اطلاعات فروشگاه معتبر نیست.");
      }
      const next = { id: value.id, storeName: value.storeName, shortIntro: value.shortIntro, about: value.about,
        coverImageId: value.coverImageId, avatarImageId: value.avatarImageId, version: value.version,
        updatedAt: "updatedAt" in value && typeof value.updatedAt === "string" ? value.updatedAt : "" };
      setSaved(next);
      setForm({ storeName: next.storeName, shortIntro: next.shortIntro, about: next.about });
      const readImage = async (imageId: string | null) => {
        if (!imageId) return "";
        try {
          const response = await fetch(`/api/artist/storefront/${next.id}/images/${imageId}`, { cache: "no-store", signal });
          if (!response.ok) return "";
          const image: unknown = await response.json();
          return image && typeof image === "object" && "url" in image && typeof image.url === "string" ? image.url : "";
        } catch { return ""; }
      };
      const [nextCoverUrl, nextAvatarUrl] = await Promise.all([readImage(next.coverImageId), readImage(next.avatarImageId)]);
      if (!signal?.aborted) { setCoverUrl(nextCoverUrl); setAvatarUrl(nextAvatarUrl); }
      setError("");
    } catch (cause) {
      if (!signal?.aborted) setError(cause instanceof Error ? cause.message : "اطلاعات فروشگاه دریافت نشد.");
    } finally { if (!signal?.aborted) setLoading(false); }
  }, []);

  useEffect(() => { const controller = new AbortController(); void load(controller.signal); return () => controller.abort(); }, [load]);

  function edit(field: keyof Form, value: string) {
    setForm(current => ({ ...current, [field]: value }));
    setNotice("");
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving || imageBusy || !form.storeName.trim() || form.storeName.trim().length < 2) return;
    setSaving(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/artist/storefront", { method: "PATCH", headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, version: saved.version }) });
      if (response.status === 409) { await load(); setError(messageFor(409)); return; }
      if (!response.ok) throw new Error(messageFor(response.status));
      const value = await response.json() as Storefront;
      setSaved(value); setForm({ storeName: value.storeName, shortIntro: value.shortIntro, about: value.about });
      setNotice("تغییرات فروشگاه ذخیره شد.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ذخیرهٔ اطلاعات فروشگاه انجام نشد."); }
    finally { setSaving(false); }
  }

  async function uploadImage(kind: "cover" | "avatar") {
    const file = kind === "cover" ? coverFile : avatarFile;
    if (!file || saving || imageBusy) return;
    if (file.size < 1 || file.size > maxImageBytes) { setError("حجم تصویر باید حداکثر ۵ مگابایت باشد."); return; }
    setImageBusy(kind); setError(""); setNotice("");
    try {
      const response = await fetch("/api/artist/storefront/images", { method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ version: saved.version, kind, base64: await fileBase64(file) }) });
      if (response.status === 409) { await load(); setError(messageFor(409)); return; }
      if (!response.ok) throw new Error(messageFor(response.status));
      const value: unknown = await response.json();
      if (!value || typeof value !== "object" || !("id" in value) || typeof value.id !== "string" || !("url" in value) || typeof value.url !== "string" ||
          !("version" in value) || typeof value.version !== "number" || !Number.isInteger(value.version)) throw new Error("پاسخ تصویر معتبر نیست.");
      setSaved(current => ({ ...current, version: value.version as number, [kind === "cover" ? "coverImageId" : "avatarImageId"]: value.id as string }));
      if (kind === "cover") { setCoverUrl(value.url); setCoverFile(null); if (coverInput.current) coverInput.current.value = ""; }
      else { setAvatarUrl(value.url); setAvatarFile(null); if (avatarInput.current) avatarInput.current.value = ""; }
      setNotice(kind === "cover" ? "تصویر کاور فروشگاه به‌روز شد." : "تصویر نمایه به‌روز شد.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "بارگذاری تصویر انجام نشد."); }
    finally { setImageBusy(""); }
  }

  const dirty = form.storeName !== saved.storeName || form.shortIntro !== saved.shortIntro || form.about !== saved.about;
  return <main className={styles.page} dir="rtl" lang="fa-IR">
    <header className={styles.header}><div><p className={styles.eyebrow}>خانهٔ نگارین / فروشگاه من</p><h1>ویرایش صفحهٔ عمومی فروشگاه</h1><p>نام و معرفی فروشگاهت را برای مشتری‌ها تنظیم کن.</p></div><span className={styles.badge}>ذخیرهٔ نسخه‌دار</span></header>
    <nav className={styles.workspaceNav} aria-label="بخش‌های پنل هنرمند"><Link aria-current="page" href="/artist/storefront">فروشگاه من</Link><Link href="/artist/products">محصولات</Link><Link href="/artist/orders">سفارش‌ها</Link><Link href="/artist/corporate-orders">سفارش‌های سازمانی</Link><Link href="/artist/growth">رشد من</Link><Link href="/artist/services">خدمات</Link><Link href="/artist/finance">مالی</Link></nav>
    {loading && <p className={styles.message} role="status">در حال دریافت اطلاعات فروشگاه…</p>}
    {error && <p className={styles.error} role="alert">{error}</p>}
    {notice && <p className={styles.success} role="status">{notice}</p>}
    <div className={styles.grid}>
      <form className={styles.form} onSubmit={save}>
        <fieldset className={styles.imageField}><legend>تصویر کاور</legend><label>انتخاب تصویر کاور<input ref={coverInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={event => setCoverFile(event.target.files?.[0] ?? null)} /></label><button type="button" disabled={!coverFile || saving || !!imageBusy || loading} onClick={() => void uploadImage("cover")}>{imageBusy === "cover" ? "در حال بارگذاری…" : "بارگذاری کاور"}</button><small>JPG، PNG یا WebP · حداکثر ۵ مگابایت</small></fieldset>
        <fieldset className={styles.imageField}><legend>تصویر نمایه</legend><label>انتخاب تصویر نمایه<input ref={avatarInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={event => setAvatarFile(event.target.files?.[0] ?? null)} /></label><button type="button" disabled={!avatarFile || saving || !!imageBusy || loading} onClick={() => void uploadImage("avatar")}>{imageBusy === "avatar" ? "در حال بارگذاری…" : "بارگذاری تصویر نمایه"}</button><small>JPG، PNG یا WebP · حداکثر ۵ مگابایت</small></fieldset>
        <label>نام فروشگاه<input required minLength={2} maxLength={80} value={form.storeName} onChange={event => edit("storeName", event.target.value)} placeholder="نام فروشگاه هنری" /></label>
        <small className={styles.counter}>{form.storeName.length} / ۸۰</small>
        <label>معرفی کوتاه<textarea maxLength={180} rows={3} value={form.shortIntro} onChange={event => edit("shortIntro", event.target.value)} placeholder="در یک جمله از هنر و محصولاتت بگو." /></label>
        <small className={styles.counter}>{form.shortIntro.length} / ۱۸۰</small>
        <label>دربارهٔ فروشگاه<textarea maxLength={3000} rows={8} value={form.about} onChange={event => edit("about", event.target.value)} placeholder="داستان، روش ساخت و ویژگی‌های کارگاهت را بنویس." /></label>
        <small className={styles.counter}>{form.about.length} / ۳۰۰۰</small>
        <div className={styles.actions}><button type="submit" disabled={loading || saving || !!imageBusy || !dirty || form.storeName.trim().length < 2}>{saving ? "در حال ذخیره…" : "ذخیرهٔ تغییرات"}</button><button type="button" className={styles.secondary} disabled={saving || !!imageBusy || !dirty} onClick={() => { setForm({ storeName: saved.storeName, shortIntro: saved.shortIntro, about: saved.about }); setError(""); setNotice(""); }}>انصراف</button></div>
        <p className={styles.note}>این تغییرات فقط محتوای صفحهٔ عمومی را به‌روز می‌کند و روی قیمت، عضویت یا نشان تأیید اثر نمی‌گذارد. تصاویر پس از تبدیل امن و حذف فراداده ذخیره می‌شوند.</p>
      </form>
      <aside className={styles.preview} aria-label="پیش‌نمایش فروشگاه"><p className={styles.eyebrow}>پیش‌نمایش</p><h2>نمای تقریبی صفحهٔ عمومی</h2><div className={styles.cover} style={coverUrl ? { backgroundImage: `linear-gradient(#0002,#0002),url("${coverUrl}")` } : undefined}>{!coverUrl && <span>تصویر کاور فروشگاه</span>}</div><div className={styles.identity}><div className={styles.avatar} aria-hidden="true">{avatarUrl ? <img src={avatarUrl} alt="" /> : "ن"}</div><div><h3>{form.storeName.trim() || "نام فروشگاه"}</h3><span className={styles.verified}>هنرمند نگارین</span></div></div><p className={styles.intro}>{form.shortIntro.trim() || "معرفی کوتاه فروشگاه پس از ثبت در این قسمت نمایش داده می‌شود."}</p>{form.about.trim() && <div className={styles.about}><h3>دربارهٔ فروشگاه</h3><p>{form.about}</p></div>}<div className={styles.previewProducts}><h3>محصولات فروشگاه</h3><p>محصولات منتشرشدهٔ شما در این بخش نمایش داده خواهند شد.</p></div></aside>
    </div>
  </main>;
}
