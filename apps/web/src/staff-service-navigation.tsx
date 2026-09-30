export function StaffServiceNavigation({ active }: { active: "assignments" | "submissions" }) {
  return (
    <nav className="staff-service-navigation" aria-label="بخش خدمات">
      <a href="/admin/service-assignments" aria-current={active === "assignments" ? "page" : undefined}>
        تخصیص درخواست
      </a>
      <a href="/admin/service-deliverables" aria-current={active === "submissions" ? "page" : undefined}>
        فایل‌های ارسال‌شده
      </a>
    </nav>
  );
}
