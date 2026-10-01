import Link from "next/link";
import type { ReactNode } from "react";

export type OverviewMetric = { label: string; value: string | number; detail?: string };
export type OverviewEntry = { title: string; description?: string | null; meta?: string; status?: string; href?: string };
export type OverviewAction = { label: string; href: string; description?: string };

export function OverviewUnavailable({ kind }: { kind: "connection-required" | "access-denied" | "unavailable" }) {
  const copy = kind === "access-denied" ? "این نقش به این بخش دسترسی ندارد."
    : kind === "connection-required" ? "برای دیدن اطلاعات این نقش، ورود امن هنوز باید تکمیل شود."
      : "اطلاعات این بخش در دسترس نیست. کمی بعد دوباره تلاش کنید.";
  return <div className="overview-empty" role="status"><p>{copy}</p></div>;
}

export function OperationalOverview({
  eyebrow, title, description, metrics, entries, actions, entryHeading, emptyCopy, note
}: {
  eyebrow: string;
  title: string;
  description: string;
  metrics: OverviewMetric[];
  entries: OverviewEntry[];
  actions: OverviewAction[];
  entryHeading: string;
  emptyCopy: string;
  note?: ReactNode;
}) {
  return <div className="operational-overview">
    <section className="overview-identity">
      <div><p className="overview-eyebrow">{eyebrow}</p><h2>{title}</h2><p>{description}</p></div>
      <span className="overview-live-status"><span aria-hidden="true" />اطلاعات زنده</span>
    </section>

    <section className="overview-metrics" aria-label="خلاصهٔ وضعیت">
      {metrics.map((metric) => <article className="overview-metric" key={metric.label}>
        <span>{metric.label}</span><strong>{typeof metric.value === "number" ? new Intl.NumberFormat("fa-IR").format(metric.value) : metric.value}</strong>
        {metric.detail ? <small>{metric.detail}</small> : null}
      </article>)}
    </section>

    <section className="overview-actions" aria-label="دسترسی سریع">
      <div className="overview-section-heading"><h2>دسترسی سریع</h2></div>
      <div className="overview-action-list">
        {actions.map((action) => <Link className="overview-action" href={action.href} key={action.href}>
          <strong>{action.label}</strong>{action.description ? <small>{action.description}</small> : null}<span aria-hidden="true">←</span>
        </Link>)}
      </div>
    </section>

    <section className="overview-activity" aria-labelledby="overview-activity-title">
      <div className="overview-section-heading"><h2 id="overview-activity-title">{entryHeading}</h2></div>
      {entries.length === 0 ? <div className="overview-empty"><p>{emptyCopy}</p></div> :
        <ul>{entries.map((entry, index) => <li key={`${entry.title}-${index}`}>
          <div className="overview-entry-copy">
            {entry.href ? <Link href={entry.href}>{entry.title}</Link> : <strong>{entry.title}</strong>}
            {entry.description ? <p>{entry.description}</p> : null}
          </div>
          <div className="overview-entry-meta">
            {entry.status ? <span>{entry.status}</span> : null}{entry.meta ? <small>{entry.meta}</small> : null}
          </div>
        </li>)}</ul>}
    </section>
    {note ? <p className="overview-note">{note}</p> : null}
  </div>;
}
