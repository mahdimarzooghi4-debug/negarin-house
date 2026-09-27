const portals = [
  ["احراز هویت", "/auth"],
  ["مشتری", "/customer"],
  ["هنرمند", "/artist"],
  ["ادمین نگارین", "/admin"],
  ["همکار خدمات", "/service-partner"],
  ["سازمان حامی", "/supporting-organization"],
  ["خریدار سازمانی", "/corporate-buyer"],
  ["شریک صادراتی", "/partner"]
] as const;

export default function HomePage() {
  return (
    <main>
      <section className="panel">
        <h1>خانه نگارین</h1>
        <p className="muted">اسکلت فنی Phase 1 — Sprint 0</p>
        <ul>
          {portals.map(([label, href]) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
