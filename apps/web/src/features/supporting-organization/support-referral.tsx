"use client";

import { useState } from "react";
import styles from "./live-programs.module.css";

type Program = { id: string; title: string };
type Artist = { artistUserId: string; storeName: string; shortIntro: string };
type ArtistPage = { page: number; pageSize: number; hasMore: boolean; items: Artist[] };
const uuid = (value: unknown): value is string => typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
function parseArtists(value: unknown, page: number): ArtistPage | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const root = value as Record<string, unknown>;
  if (root.page !== page || root.pageSize !== 10 || typeof root.hasMore !== "boolean" || !Array.isArray(root.items)) return null;
  const items = root.items.map(value => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const item = value as Record<string, unknown>;
    return uuid(item.artistUserId) && typeof item.storeName === "string" && typeof item.shortIntro === "string"
      ? { artistUserId: item.artistUserId, storeName: item.storeName, shortIntro: item.shortIntro } : null;
  });
  return items.some(item => item === null) ? null : { page, pageSize: 10, hasMore: root.hasMore, items: items as Artist[] };
}

export function SupportReferral({ programs, initialProgramId, onCancel, onComplete }: {
  programs: Program[]; initialProgramId: string; onCancel: () => void; onComplete: (artistName: string) => void;
}) {
  const [programId, setProgramId] = useState(initialProgramId);
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState<ArtistPage | null>(null);
  const [selected, setSelected] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  async function searchArtists(nextPage = 1) {
    if (query.trim().length < 2 || loading) return;
    setLoading(true); setError(""); setNotice("");
    try {
      const params = new URLSearchParams({ q: query.trim(), page: String(nextPage), pageSize: "10" });
      const response = await fetch(`/api/supporting-organization/artists?${params.toString()}`, { cache: "no-store" });
      if (response.status === 401) throw new Error("برای جست‌وجوی هنرمند وارد حساب سازمان شوید.");
      if (response.status === 403) throw new Error("دسترسی سازمان حمایتی فعال نیست.");
      if (!response.ok) throw new Error("جست‌وجوی هنرمندان انجام نشد.");
      const result = parseArtists(await response.json(), nextPage);
      if (!result) throw new Error("پاسخ جست‌وجوی هنرمندان معتبر نیست.");
      setPage(result); setPageNumber(nextPage); setSelected(null);
      if (!result.items.length) setNotice("هنرمند منتشرشده‌ای با این نام یا معرفی پیدا نشد.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با فهرست هنرمندان برقرار نشد."); }
    finally { setLoading(false); }
  }
  async function submit() {
    if (!selected || !programId || saving) return;
    setSaving(true); setError(""); setNotice("");
    try {
      const response = await fetch(`/api/supporting-organization/support-programs/${programId}/relationships`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ artistUserId: selected.artistUserId }) });
      if (response.status === 404) throw new Error("برنامه یا هنرمند دیگر در دسترس نیست.");
      if (response.status === 401) throw new Error("نشست سازمان نیازمند ورود دوباره است.");
      if (!response.ok) throw new Error("ثبت ارتباط حمایتی انجام نشد.");
      onComplete(selected.storeName);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ثبت ارتباط حمایتی انجام نشد."); }
    finally { setSaving(false); }
  }
  return <section className={styles.referral} aria-labelledby="support-referral-title"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>ارجاع هنرمند</p><h2 id="support-referral-title">ثبت ارتباط با برنامه</h2></div><button type="button" className={styles.close} onClick={onCancel}>بستن</button></div>
    <label className={styles.field}>برنامهٔ حمایتی<select value={programId} onChange={event => setProgramId(event.target.value)}><option value="">انتخاب برنامه</option>{programs.map(program => <option key={program.id} value={program.id}>{program.title}</option>)}</select></label>
    <form className={styles.searchForm} onSubmit={event => { event.preventDefault(); void searchArtists(1); }}><label className={styles.field}>نام فروشگاه یا معرفی<input minLength={2} maxLength={120} value={query} onChange={event => { setQuery(event.target.value); setPage(null); setSelected(null); }} placeholder="حداقل دو نویسه" /></label><button type="submit" disabled={loading || query.trim().length < 2}>{loading ? "در حال جست‌وجو…" : "جست‌وجو"}</button></form>
    {error && <p className={styles.error} role="alert">{error}</p>}{notice && <p className={styles.notice} role="status">{notice}</p>}
    {page && page.items.length > 0 && <><div className={styles.artistResults}>{page.items.map(artist => <button key={artist.artistUserId} type="button" className={styles.artistResult} aria-pressed={selected?.artistUserId === artist.artistUserId} onClick={() => setSelected(artist)}><strong>{artist.storeName}</strong><span>{artist.shortIntro || "معرفی کوتاهی ثبت نشده است."}</span></button>)}</div><div className={styles.referralActions}>{page.hasMore && <button type="button" className={styles.secondary} disabled={loading} onClick={() => void searchArtists(pageNumber + 1)}>نتایج بعدی</button>}{selected && <span>انتخاب‌شده: {selected.storeName}</span>}</div></>}
    <p className={styles.explainer}>فقط هنرمندانی با دست‌کم یک اثر منتشرشده در فهرست جست‌وجو می‌شوند. ثبت ارتباط از طرف سازمان انجام می‌شود و واجدشرایط‌شدن نهایی به تأیید نگارین وابسته است.</p>
    <div className={styles.referralActions}><button type="button" disabled={!selected || !programId || saving} onClick={() => void submit()}>{saving ? "در حال ثبت…" : "ثبت ارتباط حمایتی"}</button><button type="button" className={styles.secondary} disabled={saving} onClick={onCancel}>انصراف</button></div>
  </section>;
}
