import { EmptyState } from "@negarin/ui";
import type { StaffServiceDeliverableSubmission } from "./artist-api";

type PageState =
  | { kind: "ready"; items: StaffServiceDeliverableSubmission[] }
  | { kind: "connection-required" | "access-denied" | "unavailable" };

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "—" : date.toLocaleString("fa-IR");
}

function formatBytes(value: number) {
  return `${new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 1 }).format(value / 1024)} کیلوبایت`;
}

export function StaffServiceDeliverableScreen({ initialState }: { initialState: PageState }) {
  if (initialState.kind !== "ready") {
    const messages = {
      "connection-required": ["ورود کارکنان فعال نیست", "پس از فعال‌شدن ورود امن کارکنان، فایل‌های واقعیِ ارسال‌شده از سرویس دریافت می‌شوند."],
      "access-denied": ["دسترسی خدمات فعال نیست", "این فهرست فقط برای کارمند نگارین با مجوز خدمات در دسترس است."],
      unavailable: ["فهرست فایل‌ها در دسترس نیست", "سرویس فایل‌های ارسال‌شده فعلاً پاسخ نمی‌دهد. کمی بعد دوباره تلاش کن."]
    } as const;
    const [title, description] = messages[initialState.kind];
    return <EmptyState title={title} description={description} note="در این صفحه دادهٔ نمونه نمایش داده نمی‌شود." />;
  }

  return (
    <section className="staff-service-submissions" aria-labelledby="staff-service-submissions-title">
      <div className="staff-service-submissions-heading">
        <h2 id="staff-service-submissions-title">فایل‌های ارسال‌شده برای بررسی</h2>
        <p>فایل‌هایی که شریک خدماتی برای نگارین فرستاده است. این صفحه فقط نمایش می‌دهد و نتیجهٔ بررسی ثبت نمی‌کند.</p>
      </div>
      {initialState.items.length === 0 ? (
        <EmptyState title="فایلی ارسال نشده" description="پس از ارسال یک فایل آماده از سوی شریک خدماتی، اطلاعات آن در این فهرست دیده می‌شود." />
      ) : (
        <ul className="staff-service-submissions-list">
          {initialState.items.map((item) => (
            <li key={item.deliverableId}>
              <div className="staff-service-submission-title">
                <h3>{item.title}</h3>
                {item.summary && <p>{item.summary}</p>}
              </div>
              <dl>
                <div><dt>شریک خدماتی</dt><dd>{item.partnerOrganizationName?.trim() || "سازمان ثبت‌شده"}</dd></div>
                <div><dt>فایل</dt><dd>{item.fileName}</dd></div>
                <div><dt>نوع فایل</dt><dd>{item.contentType}</dd></div>
                <div><dt>اندازه</dt><dd>{formatBytes(item.contentLength)}</dd></div>
                <div><dt>زمان ارسال</dt><dd><time dateTime={item.submittedAt}>{formatDate(item.submittedAt)}</time></dd></div>
              </dl>
              <a href={item.readUrl} target="_blank" rel="noreferrer">بازکردن فایل</a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
