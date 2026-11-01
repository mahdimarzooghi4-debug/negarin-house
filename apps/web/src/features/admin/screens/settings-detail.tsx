"use client";

import { useEffect, useState } from "react";
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

type Field = { label: string; placeholder: string; helper?: string };
type Section = { title: string; description: string; fields: Field[] };

const sections: Record<string, Section> = {
  general: {
    title: "تنظیمات عمومی",
    description: "اطلاعات پایه، زبان، ارز پیش‌فرض و مشخصات نمایشی پرتال نگارین را تنظیم کنید.",
    fields: [
      { label: "نام نمایشی پرتال", placeholder: "خانه نگارین" },
      { label: "زبان پیش‌فرض", placeholder: "فارسی" },
      { label: "واحد پولی پیش‌فرض", placeholder: "تومان" },
      { label: "ایمیل پشتیبانی", placeholder: "support@negarin.house" },
    ],
  },
  operations: {
    title: "پیکربندی عملیاتی",
    description: "گردش بررسی آثار و تخصیص کارشناسان را برای پیش‌نمایش تنظیم کنید.",
    fields: [
      { label: "مرحله آغاز بررسی", placeholder: "بررسی اولیه مدارک" },
      { label: "روش تخصیص کارشناس", placeholder: "تخصیص دستی توسط مدیر" },
      { label: "مهلت بررسی (روز)", placeholder: "۳" },
      { label: "سطح تأیید انتشار", placeholder: "تأیید مدیر عملیات" },
    ],
  },
  membership: {
    title: "پیکربندی عضویت",
    description: "شهریه، مدت اعتبار و سهمیه‌های پایه عضویت هنرمندان را تنظیم کنید.",
    fields: [
      { label: "شهریه سالانه (تومان)", placeholder: "۰" },
      { label: "مدت عضویت (ماه)", placeholder: "۱۲" },
      { label: "سهمیه پیش‌فرض دوره‌ها", placeholder: "۲" },
      { label: "اعتبار پیش‌فرض ارزیابی", placeholder: "بدون اعتبار نقدی" },
    ],
  },
  services: {
    title: "پیکربندی خدمات",
    description: "دسته‌بندی خدمات رشد و قواعد تخصیص اعتبارهای عملیاتی را مدیریت کنید.",
    fields: [
      { label: "دسته‌های فعال خدمات", placeholder: "آموزش، مشاوره، توانمندسازی" },
      { label: "حداکثر درخواست هم‌زمان", placeholder: "۲" },
      { label: "واحد اعتبار خدمات", placeholder: "اعتبار غیرنقدی" },
      { label: "نیازمند تأیید مدیر", placeholder: "بله" },
    ],
  },
  opportunities: {
    title: "پیکربندی فرصت‌ها",
    description: "قالب فراخوان‌ها، مهلت درخواست و مراحل بررسی فرصت‌ها را مشخص کنید.",
    fields: [
      { label: "مدت پیش‌فرض فراخوان (روز)", placeholder: "۳۰" },
      { label: "مرحله بررسی درخواست", placeholder: "بررسی ظرفیت و مدارک" },
      { label: "تأیید انتشار فرصت", placeholder: "تأیید مدیر عملیات" },
      { label: "وضعیت آغازین فرصت", placeholder: "پیش‌نویس" },
    ],
  },
  international: {
    title: "پیکربندی بین‌المللی",
    description: "بازارهای هدف، ارزهای مبادلاتی و زبان‌های پیش‌فرض صادرات را تنظیم کنید.",
    fields: [
      { label: "بازارهای هدف فعال", placeholder: "اروپا، آسیای غربی" },
      { label: "ارز مبادلاتی پیش‌فرض", placeholder: "EUR" },
      { label: "زبان کاتالوگ", placeholder: "انگلیسی" },
      { label: "کد پیش‌فرض شریک صادراتی", placeholder: "EXP" },
    ],
  },
};

export default function AdminSettingsDetailDesktop() {
  const [sectionKey, setSectionKey] = useState("general");
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("section") || "general";
    setSectionKey(sections[requested] ? requested : "general");
  }, []);
  const section = sections[sectionKey] || sections.general;

  return (
    <div className="fg-2f84151df8" data-node-id="903:739" data-name="Admin / Settings Detail — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="903:814" data-name="Main Workspace">
        <div className="fg-aa86f531f3" data-node-id="903:815" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="903:816" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="903:817" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
            </div>
            <DesignAction className="fg-2f3c66203e" data-node-id="903:818" data-name="Notification Bell Button" label="Notification Bell Button">
              <div className="fg-b04bb497e9" data-node-id="903:819" data-name="Notification dot">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
              </div>
              <div className="fg-ccdeeb4977" data-node-id="903:820" data-name="Icon Container">
                <div className="fg-58d29b27c0" data-node-id="903:1449" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/3afd6085.svg" />
                </div>
              </div>
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="903:822" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="903:823" data-name="Global Search" label="جستجو" placeholder="جستجو در تنظیمات، گزارش‌ها و شناسه‌ها...">
              <p className="fg-3a06ee4cfb" dir="auto" data-node-id="903:824">جستجو در تنظیمات، گزارش‌ها و شناسه‌ها...</p>
              <div className="fg-c5bca379c9" data-node-id="903:825" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1452" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
                </div>
              </div>
            </DesignField>
            <div className="fg-db65f399cd" data-node-id="903:827" data-name="Title and Path">
              <div className="fg-860c2f1554" data-node-id="903:828" data-name="Breadcrumbs">
                <div className="fg-f1a0c10dac" data-node-id="903:829" data-name="Frame">
                  <p className="fg-6089ad2d75" dir="auto" data-node-id="903:830">تنظیمات سیستمی</p>
                  <p className="fg-29a4797011" data-node-id="903:831">&gt;</p>
                </div>
                <div className="fg-e8210ba625" data-node-id="903:832" data-name="Frame">
                  <p className="fg-79f0034e69" dir="auto" data-node-id="903:833">{section.title}</p>
                </div>
              </div>
              <p className="fg-99f699cdc3" dir="auto" data-node-id="903:834">{section.title}</p>
            </div>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="903:835" data-name="Scrollable Content">
          <div className="fg-cd68a27429" data-node-id="903:836" data-name="Operational Description">
            <p className="fg-2ed64816ff" dir="auto" data-node-id="903:837">{section.title}</p>
            <p className="fg-1b90c6d8d3" dir="auto" data-node-id="903:838">{section.description}</p>
          </div>
          <section style={{ width: "100%", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(4,27,101,.08)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 20 }}>
              {section.fields.map((field) => (
                <label key={field.label} style={{ display: "flex", flexDirection: "column", gap: 8, color: "#374151", fontSize: 13, textAlign: "right" }}>
                  <span>{field.label}</span>
                  <DesignField
                    className="settings-detail-field"
                    label={field.label}
                    placeholder={field.placeholder}
                    style={{ position: "relative", width: "100%", height: 44, border: "1px solid #e5e7eb", borderRadius: 8, background: "#f9fafb" }}
                  >
                    <p style={{ width: "100%", color: "#6b7280", fontSize: 13, textAlign: "right", padding: "0 12px" }}>{field.placeholder}</p>
                  </DesignField>
                </label>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, paddingTop: 20, borderTop: "1px solid #e5e7eb" }}>
              <DesignAction label="بازگشت به تنظیمات" destination="settings" style={{ padding: "10px 16px", border: "1px solid #e5e7eb", borderRadius: 8, color: "#374151", background: "#fff", cursor: "pointer" }}>
                بازگشت به تنظیمات
              </DesignAction>
              <DesignAction label="ذخیره تنظیمات پیش‌نمایش" style={{ padding: "10px 18px", borderRadius: 8, color: "#fff", background: "#07858f", cursor: "pointer" }}>
                ذخیره تنظیمات پیش‌نمایش
              </DesignAction>
            </div>
          </section>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="903:890" data-name="Sidebar" />
    </div>
  );
}
