"use client";

import type { HTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "داشبورد", icon: "dashboard", href: "/preview/admin/dashboard", activeOn: ["dashboard"] },
  { label: "هنرمندان", icon: "groups", href: "/preview/admin/artists", activeOn: ["artists", "credential"] },
  { label: "بازار", icon: "storefront", href: "/preview/admin/products", activeOn: ["product"] },
  { label: "سفارش و ارسال", icon: "local_shipping", href: "/preview/admin/orders", activeOn: ["order", "shipment"] },
  { label: "رشد و خدمات", icon: "trending_up", href: "/preview/admin/growth-overview", activeOn: ["growth", "service"] },
  { label: "فرصت‌ها", icon: "work_outline", href: "/preview/admin/opportunities", activeOn: ["opportunit", "corporate"] },
  { label: "مالی و عضویت", icon: "account_balance_wallet", href: "/preview/admin/finance-overview", activeOn: ["finance", "settlement", "membership", "transaction"] },
  { label: "محتوا و روایت‌ها", icon: "menu_book", href: "/preview/admin/stories", activeOn: ["stor", "content"] },
  { label: "بین‌الملل", icon: "public", href: "/preview/admin/export-partners", activeOn: ["export", "market"] },
  { label: "گزارش‌ها", icon: "bar_chart", href: "/preview/admin/reports", activeOn: ["report", "audit"] },
  { label: "تنظیمات و دسترسی‌ها", icon: "settings", href: "/preview/admin/settings", activeOn: ["setting", "staff", "role", "access"] },
];

export function AdminSidebar({ children, className, ...props }: HTMLAttributes<HTMLElement> & { children?: ReactNode }) {
  void children;
  const pathname = usePathname() ?? "";
  const current = pathname.split("/").filter(Boolean).at(-1) ?? "";

  return (
    <aside
      {...props}
      className={`${className ?? ""} admin-sidebar`.trim()}
      aria-label="منوی مدیریت"
      data-name="Sidebar"
    >
      <div className="admin-sidebar-brand" data-name="Brand">
        <img src="/admin-assets/9f534c0e.png" alt="" />
        <strong>خانه نگارین</strong>
      </div>

      <nav className="admin-sidebar-nav" aria-label="بخش‌های مدیریت" data-name="Navigation">
        {navigation.map((item) => {
          const active = item.activeOn.some((part) => current.toLowerCase().includes(part));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-sidebar-link${active ? " is-active" : ""}`}
              aria-current={active ? "page" : undefined}
              data-name={`Navigation / ${item.label}`}
            >
              <span className="admin-sidebar-label" dir="rtl">{item.label}</span>
              <span className="material-icons-round admin-sidebar-icon" aria-hidden="true">{item.icon}</span>
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar-profile" data-name="Staff Profile">
        <div className="admin-sidebar-profile-copy">
          <strong>کارشناس عملیات</strong>
          <span>مدیر عملیات سیستم</span>
        </div>
        <img src="/admin-assets/a36aa18d.png" alt="" />
      </div>
    </aside>
  );
}
