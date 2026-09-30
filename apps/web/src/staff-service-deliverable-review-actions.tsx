"use client";

import { useState } from "react";
import { Button } from "@negarin/ui";
import type { StaffServiceDeliverableSubmission } from "./artist-api";

export function StaffServiceDeliverableReviewActions({ item }: { item: StaffServiceDeliverableSubmission }) {
  const [review, setReview] = useState(item.review);
  const [completedAt, setCompletedAt] = useState(item.assignmentCompletedAt);
  const [feedback, setFeedback] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function decide(decision: "approved" | "changes_requested") {
    if (busy || (decision === "changes_requested" && !feedback.trim())) {
      if (decision === "changes_requested" && !feedback.trim()) setError("برای درخواست اصلاح، توضیح لازم است.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/service-deliverables/${encodeURIComponent(item.deliverableId)}/review`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision, ...(feedback.trim() ? { feedback: feedback.trim() } : {}) }), cache: "no-store"
      });
      if (response.status === 409) { setError("این تحویل قبلاً بررسی شده یا خدمت تکمیل شده است. صفحه را تازه کنید."); return; }
      if (response.status === 401 || response.status === 403) { setError("دسترسی خدمات فعال نیست؛ صفحه را تازه کنید."); return; }
      if (!response.ok) { setError("ثبت نتیجهٔ بررسی انجام نشد."); return; }
      const result = await response.json() as { decision: "approved" | "changes_requested"; feedback: string | null; reviewedAt: string; completedAt: string | null };
      setReview({ decision: result.decision, feedback: result.feedback, reviewedAt: result.reviewedAt });
      setCompletedAt(result.completedAt);
    } catch {
      setError("ارتباط با سرویس بررسی تحویل برقرار نشد.");
    } finally {
      setBusy(false);
    }
  }

  if (review) return <p className="staff-service-review-outcome" role="status">
    {review.decision === "approved" ? "تحویل تأیید شد و خدمت تکمیل شد." : "اصلاح برای شریک خدماتی درخواست شد."}
    {review.feedback && <span>{review.feedback}</span>}
  </p>;
  if (completedAt) return <p className="staff-service-review-outcome" role="status">این خدمت قبلاً تکمیل شده است.</p>;

  return <div className="staff-service-review-actions">
    {error && <p className="artist-products-error" role="alert">{error}</p>}
    <label><span>یادداشت برای شریک خدماتی</span><textarea rows={3} maxLength={5000} value={feedback} onChange={(event) => setFeedback(event.target.value)}
      placeholder="برای درخواست اصلاح، موارد لازم را روشن بنویس." /></label>
    <div>
      <Button disabled={busy} onClick={() => void decide("approved")}>{busy ? "در حال ثبت…" : "تأیید تحویل و تکمیل خدمت"}</Button>
      <Button variant="secondary" disabled={busy} onClick={() => void decide("changes_requested")}>درخواست اصلاح</Button>
    </div>
  </div>;
}
