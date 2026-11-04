"use client";

import { useState } from "react";
import { Button } from "@negarin/ui";
import { usePreview } from "../../artist/preview-state";

const buttonStyle = {
  border: "1px solid #cbd5e1",
  borderRadius: 8,
  background: "#fff",
  color: "#0f172a",
  cursor: "pointer",
  font: "600 14px Vazirmatn Variable, sans-serif",
  padding: "10px 18px",
  whiteSpace: "nowrap" as const,
};

export function GroupReferralButton() {
  const preview = usePreview();
  const [open, setOpen] = useState(false);
  const [artists, setArtists] = useState("");
  const [consent, setConsent] = useState(false);

  function submit() {
    const rows = artists.split("\n").map((row) => row.trim()).filter(Boolean);
    if (rows.length < 2) {
      preview.notify("برای معرفی گروهی، اطلاعات دست‌کم دو هنرمند را در سطرهای جدا وارد کنید.");
      return;
    }
    if (!consent) {
      preview.notify("تأیید مجوز ارائه اطلاعات تماس همه هنرمندان را انتخاب کنید.");
      return;
    }
    preview.notify("معرفی گروهی " + rows.length + " هنرمند در پیش‌نمایش ثبت شد؛ هنوز به سرور ارسال نشده است.");
    setOpen(false);
    setArtists("");
    setConsent(false);
  }

  return (
    <>
      <Button type="button" variant="unstyled" style={buttonStyle} onClick={() => setOpen(true)}>معرفی گروهی</Button>
      {open && (
        <div
          role="presentation"
          onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}
          style={{ position: "fixed", inset: 0, zIndex: 1000, display: "grid", placeItems: "center", padding: 24, background: "rgba(15,23,42,.42)" }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="group-referral-title"
            dir="rtl"
            style={{ width: "min(560px, 100%)", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, background: "#fff", boxShadow: "0 24px 70px rgba(15,23,42,.2)", fontFamily: "Vazirmatn Variable, sans-serif", color: "#0f172a" }}
          >
            <h2 id="group-referral-title" style={{ margin: "0 0 8px", fontSize: 18 }}>معرفی گروهی هنرمندان</h2>
            <p style={{ margin: "0 0 16px", color: "#64748b", fontSize: 13, lineHeight: 1.8 }}>
              اطلاعات هر هنرمند را در یک سطر وارد کنید: نام، شماره تماس، رشته هنری و شهر.
            </p>
            <textarea
              autoFocus
              aria-label="اطلاعات هنرمندان برای معرفی گروهی"
              value={artists}
              onChange={(event) => setArtists(event.target.value)}
              placeholder={"فاطمه احمدی، ۰۹۱۲۳۴۵۶۷۸۹، میناکاری، اصفهان\nمریم رضایی، ۰۹۱۲۳۴۵۶۷۸۰، خاتم‌کاری، شیراز"}
              style={{ boxSizing: "border-box", width: "100%", minHeight: 150, resize: "vertical", border: "1px solid #cbd5e1", borderRadius: 8, background: "#f8fafc", padding: 12, color: "#334155", font: "14px/1.9 Vazirmatn Variable, sans-serif", outlineColor: "#0ea5e9" }}
            />
            <label style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 14, color: "#475569", fontSize: 12, lineHeight: 1.8 }}>
              <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} style={{ marginTop: 4 }} />
              مجوز ارائه اطلاعات تماس همه هنرمندان را دارم.
            </label>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-start", marginTop: 20 }}>
              <Button type="button" variant="unstyled" style={buttonStyle} onClick={() => setOpen(false)}>انصراف</Button>
              <Button type="button" variant="unstyled" style={{ ...buttonStyle, borderColor: "#0f172a", background: "#0f172a", color: "#fff" }} onClick={submit}>ثبت معرفی گروهی</Button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
