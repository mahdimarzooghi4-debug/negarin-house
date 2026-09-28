import type { PortalKey } from "../portal-registry";
import { getPortalNavigation } from "../portal-navigation";

export function PortalShell({
  portal,
  title,
  description,
  direction
}: {
  portal: PortalKey;
  title: string;
  description: string;
  direction: "rtl" | "ltr";
}) {
  const items = getPortalNavigation(portal);
  const isEnglish = direction === "ltr";

  if (items.length === 0) {
    const isAuthentication = portal === "auth";
    return (
      <main className="public-shell" dir={direction}>
        <section className="portal-content-card">
          <p className="eyebrow">خانه نگارین</p>
          <h1>{title}</h1>
          <p>{description}</p>
          {isAuthentication ? (
            <p className="connection-notice">
              ورود کاربران پس از اتصال سرویس پیامک و تکمیل تنظیمات امنیتی فعال می‌شود.
            </p>
          ) : (
            <p className="connection-notice">فروشگاه مشتری پس از آماده‌شدن API و تجربهٔ خرید به این پوسته متصل می‌شود.</p>
          )}
        </section>
      </main>
    );
  }

  return (
    <div className={`portal-layout${direction === "ltr" ? " portal-layout-ltr" : ""}`} dir={direction}>
      <aside className="portal-sidebar" aria-label={direction === "rtl" ? "منوی پنل" : "Portal navigation"}>
        <a className="portal-brand" href="/" aria-label={isEnglish ? "Return to Negarin" : "بازگشت به نگارین"}>
          <span className="brand-mark" aria-hidden="true">{isEnglish ? "N" : "ن"}</span>
          <span className="brand-copy">
            <strong>{isEnglish ? "Negarin House" : "خانه نگارین"}</strong>
            <small>{isEnglish ? "Art & opportunity marketplace" : "بازار هنر و فرصت‌ها"}</small>
          </span>
        </a>

        <nav className="portal-navigation" aria-label={direction === "rtl" ? "بخش‌های پنل" : "Portal sections"}>
          {items.map((item) => (
            <span
              className={`portal-nav-item${item.active ? " is-active" : ""}`}
              key={item.label}
              aria-current={item.active ? "page" : undefined}
            >
              <span className="nav-marker" aria-hidden="true" />
              <span>{item.label}</span>
            </span>
          ))}
        </nav>

        <div className="portal-sidebar-footer">
          <span className="user-avatar" aria-hidden="true">{isEnglish ? "?" : "؟"}</span>
          <span>
            <strong>{isEnglish ? "Account" : "حساب کاربری"}</strong>
            <small>{isEnglish ? "Shown after sign-in" : "پس از ورود نمایش داده می‌شود"}</small>
          </span>
        </div>
      </aside>

      <main className="portal-main">
        <header className="portal-header">
          <div>
            <p className="eyebrow">{isEnglish ? "Negarin House / Workspace" : "خانه نگارین / فضای کاری"}</p>
            <h1>{title}</h1>
            <p className="portal-description">{description}</p>
          </div>
          <span className="connection-badge">
            {isEnglish ? "Account connection is inactive" : "اتصال به حساب فعال نیست"}
          </span>
        </header>

        <section className="portal-content-card" aria-labelledby="portal-empty-title">
          <div className="empty-state-mark" aria-hidden="true">ن</div>
          <h2 id="portal-empty-title">
            {isEnglish ? "Portal shell is ready" : "پوستهٔ پنل آماده است"}
          </h2>
          <p>
            {isEnglish
              ? "This section will show your role-specific content after secure sign-in and live data are connected."
              : "پس از اتصال ورود امن و داده‌های واقعی، محتوای این بخش برای نقش شما نمایش داده می‌شود."}
          </p>
          <p className="muted">
            {isEnglish
              ? "This preview contains no sample operational or financial data."
              : "در این پیش‌نمایش، اطلاعات عملیاتی یا مالی نمونه نمایش داده نمی‌شود."}
          </p>
        </section>
      </main>
    </div>
  );
}
