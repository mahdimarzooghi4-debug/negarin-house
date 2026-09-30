"use client";

import { useState } from "react";
import type { ServicePartnerAssignment } from "./artist-api";

const labels: Record<ServicePartnerAssignment["responseStatus"], string> = {
  awaiting_response: "در انتظار پاسخ شما",
  accepted: "تخصیص پذیرفته شد",
  declined: "تخصیص رد شد"
};

export function ServicePartnerAssignmentResponse({ assignment }: { assignment: ServicePartnerAssignment }) {
  const [status, setStatus] = useState(assignment.responseStatus);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function respond(response: "accepted" | "declined") {
    setBusy(true);
    setMessage("");
    try {
      const result = await fetch(`/api/service-partner/assignments/${encodeURIComponent(assignment.assignmentId)}/response`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response })
      });
      if (!result.ok) {
        setMessage(result.status === 409
          ? "این تخصیص قبلاً پاسخ داده شده است؛ صفحه را تازه کن."
          : "ثبت پاسخ انجام نشد. دوباره تلاش کن.");
        return;
      }
      const body = await result.json() as { responseStatus?: unknown };
      if (body.responseStatus !== "accepted" && body.responseStatus !== "declined") {
        setMessage("پاسخ ثبت شد؛ برای دیدن وضعیت نهایی صفحه را تازه کن.");
        return;
      }
      setStatus(body.responseStatus);
    } catch {
      setMessage("ارتباط با سرویس برقرار نشد. دوباره تلاش کن.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="service-partner-response" aria-labelledby="service-partner-response-title">
      <div>
        <h3 id="service-partner-response-title">پاسخ به تخصیص</h3>
        <p role="status">{assignment.completedAt ? "خدمت تکمیل شد" : labels[status]}</p>
      </div>
      {!assignment.completedAt && status === "awaiting_response" && (
        <div className="service-partner-response-actions">
          <button type="button" disabled={busy} onClick={() => void respond("accepted")}>پذیرش تخصیص</button>
          <button type="button" className="secondary" disabled={busy} onClick={() => void respond("declined")}>رد تخصیص</button>
        </div>
      )}
      {message && <p className="service-partner-response-message" role="alert">{message}</p>}
      {!assignment.completedAt && <small>این پاسخ فقط دریافت تخصیص را ثبت می‌کند و به معنی تکمیل یا تأیید کار نیست.</small>}
    </section>
  );
}
