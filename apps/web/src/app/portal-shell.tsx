import type { PortalKey } from "../portal-registry";
import { getPortalNavigation } from "../portal-navigation";
import { getPartnerMessages } from "../partner-localization";
import type { PartnerLocale } from "@negarin/i18n";
import Image from "next/image";

export function PortalShell({
  portal,
  title,
  description,
  direction,
  locale = "en"
}: {
  portal: PortalKey;
  title: string;
  description: string;
  direction: "rtl" | "ltr";
  locale?: PartnerLocale;
}) {
  const items = getPortalNavigation(portal, locale);
  const partnerMessages = portal === "partner" ? getPartnerMessages(locale) : undefined;
  const isEnglish = direction === "ltr" && !partnerMessages;

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
    <div className={`portal-layout${direction === "ltr" ? " portal-layout-ltr" : ""}`} dir={direction} lang={partnerMessages ? locale : "fa-IR"}>
      <aside className="portal-sidebar" aria-label={partnerMessages?.navigationLabel ?? (direction === "rtl" ? "منوی پنل" : "Portal navigation")}>
        <a className="portal-brand" href="/" aria-label={partnerMessages?.returnLabel ?? (isEnglish ? "Return to Negarin" : "بازگشت به نگارین")}>
          <Image
            className="brand-mark brand-logo"
            src="/brand/negarin-logo.png"
            alt=""
            width={40}
            height={40}
            aria-hidden="true"
            priority
          />
          <span className="brand-copy">
            <strong>{partnerMessages || isEnglish ? "Negarin House" : "خانه نگارین"}</strong>
            <small>{partnerMessages?.brandDescription ?? (isEnglish ? "Art & opportunity marketplace" : "بازار هنر و فرصت‌ها")}</small>
          </span>
        </a>

        <nav className="portal-navigation" aria-label={partnerMessages?.sectionsLabel ?? (direction === "rtl" ? "بخش‌های پنل" : "Portal sections")}>
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
            <strong>{partnerMessages?.accountLabel ?? (isEnglish ? "Account" : "حساب کاربری")}</strong>
            <small>{partnerMessages?.accountDescription ?? (isEnglish ? "Shown after sign-in" : "پس از ورود نمایش داده می‌شود")}</small>
          </span>
        </div>
      </aside>

      <main className="portal-main">
        <header className="portal-header">
          <div>
            <p className="eyebrow">{partnerMessages?.workspaceLabel ?? (isEnglish ? "Negarin House / Workspace" : "خانه نگارین / فضای کاری")}</p>
            <h1>{title}</h1>
            <p className="portal-description">{description}</p>
          </div>
          <span className="connection-badge">
            {partnerMessages?.connectionInactive ?? (isEnglish ? "Account connection is inactive" : "اتصال به حساب فعال نیست")}
          </span>
        </header>

        <section className="portal-content-card" aria-labelledby="portal-empty-title">
          <div className="empty-state-mark" aria-hidden="true">{partnerMessages ? "N" : "ن"}</div>
          <h2 id="portal-empty-title">
            {partnerMessages?.shellReady ?? (isEnglish ? "Portal shell is ready" : "پوستهٔ پنل آماده است")}
          </h2>
          <p>
            {partnerMessages?.shellDescription ?? (isEnglish
              ? "This section will show your role-specific content after secure sign-in and live data are connected."
              : "پس از اتصال ورود امن و داده‌های واقعی، محتوای این بخش برای نقش شما نمایش داده می‌شود.")}
          </p>
          <p className="muted">
            {partnerMessages?.dataNotice ?? (isEnglish
              ? "This preview contains no sample operational or financial data."
              : "در این پیش‌نمایش، اطلاعات عملیاتی یا مالی نمونه نمایش داده نمی‌شود.")}
          </p>
        </section>
      </main>
    </div>
  );
}
