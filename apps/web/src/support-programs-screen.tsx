"use client";

import { useState, type FormEvent } from "react";
import { Button, EmptyState } from "@negarin/ui";
import type { SupportProgram, loadSupportPrograms } from "./artist-api";

type InitialState = Awaited<ReturnType<typeof loadSupportPrograms>>;

function unavailable(state: Exclude<InitialState, { kind: "ready" }>) {
  const messages = {
    "connection-required": ["اتصال حساب سازمان حامی فعال نیست", "پس از فعال‌شدن ورود امن سازمان‌ها، برنامه‌های سازمان در دسترس خواهند بود."],
    "access-denied": ["دسترسی سازمان حامی لازم است", "این صفحه فقط برای سازمان حامی با دسترسی سازمانی معتبر در دسترس است."],
    unavailable: ["برنامه‌های حمایتی در دسترس نیستند", "دریافت برنامه‌های سازمان انجام نشد. کمی بعد دوباره تلاش کنید."]
  } as const;
  const [title, description] = messages[state.kind];
  return <EmptyState title={title} description={description} note="در این صفحه دادهٔ نمونه نمایش داده نمی‌شود." />;
}

export function SupportingOrganizationProgramsScreen({ initialState }: { initialState: InitialState }) {
  const [state, setState] = useState<InitialState>(initialState);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || !name.trim()) return;
    setSubmitting(true);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch(editingId
        ? `/api/supporting-organization/programs/${encodeURIComponent(editingId)}`
        : "/api/supporting-organization/programs", {
        method: editingId ? "PATCH" : "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description: description.trim() || null }), cache: "no-store"
      });
      if (response.status === 401) { setState({ kind: "connection-required" }); return; }
      if (response.status === 403) { setState({ kind: "access-denied" }); return; }
      if (!response.ok) {
        setError(response.status === 400 ? "نام یا شرح برنامه را بررسی کنید." : "ثبت برنامه انجام نشد.");
        return;
      }
      const created = await response.json() as SupportProgram;
      setState((current) => current.kind === "ready" ? { kind: "ready", programs: editingId
        ? current.programs.map((program) => program.id === editingId ? created : program)
        : [created, ...current.programs] } : current);
      setName("");
      setDescription("");
      setEditingId(null);
      setNotice(editingId ? "تغییرات برنامه ذخیره شد." : "برنامهٔ حمایتی ثبت شد.");
    } catch {
      setError("ارتباط با سرویس برنامه‌های حمایتی برقرار نشد.");
    } finally {
      setSubmitting(false);
    }
  }

  if (state.kind !== "ready") return unavailable(state);

  return <section className="artist-service-requests" aria-labelledby="support-programs-title">
    <div className="staff-review-heading"><div><h2 id="support-programs-title">برنامه‌های سازمان شما</h2>
      <p>اطلاعات پایهٔ برنامه را ثبت کنید. برنامه فقط در محدودهٔ همین سازمان نگهداری و نمایش داده می‌شود.</p></div></div>
    {error && <p className="artist-products-error" role="alert">{error}</p>}
    {notice && <p className="staff-review-notice" role="status">{notice}</p>}
    <form className="staff-service-assignment-form" onSubmit={(event) => void submit(event)}>
      <label><span>نام برنامه</span><input value={name} onChange={(event) => setName(event.target.value)} maxLength={200} required /></label>
      <label><span>شرح برنامه</span><textarea value={description} onChange={(event) => setDescription(event.target.value)} maxLength={5000} rows={4} /></label>
      <div className="staff-service-assignment-actions"><Button type="submit" disabled={submitting || !name.trim()}>
        {submitting ? "در حال ذخیره…" : editingId ? "ذخیرهٔ تغییرات" : "ثبت برنامه"}
      </Button></div>
      {editingId && <Button type="button" variant="secondary" onClick={() => {
        setEditingId(null); setName(""); setDescription(""); setError(null); setNotice(null);
      }}>لغو ویرایش</Button>}
    </form>
    <div className="artist-service-requests-list" aria-label="برنامه‌های حمایتی سازمان">
      <h3>برنامه‌های ثبت‌شده</h3>
      {state.programs.length === 0 ? <EmptyState title="برنامه‌ای ثبت نشده" description="برنامه‌های این سازمان پس از ثبت در اینجا نمایش داده می‌شوند." /> :
        state.programs.map((program) => <article className="artist-service-request-card" key={program.id}>
          <div className="staff-review-card-heading"><div><h4>{program.name}</h4></div>
            <div><time dateTime={program.createdAt}>ثبت: {new Date(program.createdAt).toLocaleDateString("fa-IR")}</time>
              <Button type="button" variant="secondary" onClick={() => {
                setEditingId(program.id); setName(program.name); setDescription(program.description ?? "");
                setError(null); setNotice(null);
              }}>ویرایش</Button></div></div>
          {program.description && <p className="staff-review-description">{program.description}</p>}
        </article>)}
    </div>
  </section>;
}
