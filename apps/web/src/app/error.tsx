"use client";

export default function GlobalError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <section className="panel" role="alert">
        <h1>خطایی رخ داد</h1>
        <p className="muted">لطفاً دوباره تلاش کنید.</p>
        <button type="button" onClick={reset}>تلاش دوباره</button>
      </section>
    </main>
  );
}
