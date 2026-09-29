"use client";

import { useState, type FormEvent } from "react";
import { Button, EmptyState, TextField } from "@negarin/ui";
import type { ArtistProduct } from "./artist-api";

type InitialState =
  | { kind: "ready"; products: ArtistProduct[] }
  | { kind: "connection-required" }
  | { kind: "unavailable" };

type EditorState = { id?: string; title: string; description: string; priceToman: string };

const statusLabels: Record<ArtistProduct["publicationStatus"], string> = {
  draft: "پیش‌نویس",
  under_review: "در حال بررسی",
  changes_requested: "نیازمند اصلاح",
  approved: "تأییدشده",
  published: "منتشرشده"
};

const faNumber = new Intl.NumberFormat("fa-IR");

function toman(value: string) {
  try { return `${faNumber.format(BigInt(value))} تومان`; } catch { return "—"; }
}

async function mutate(url: string, method: string, body?: unknown) {
  return fetch(url, {
    method,
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store"
  });
}

export function ArtistProductsScreen({ initialState }: { initialState: InitialState }) {
  const [products, setProducts] = useState(initialState.kind === "ready" ? initialState.products : []);
  const [connected, setConnected] = useState(initialState.kind === "ready");
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [archiveProduct, setArchiveProduct] = useState<ArtistProduct | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function reload() {
    const response = await fetch("/api/artist/products", { cache: "no-store" });
    if (response.status === 401 || response.status === 403) {
      setConnected(false);
      setProducts([]);
      return false;
    }
    if (!response.ok) throw new Error("دریافت فهرست محصولات انجام نشد.");
    setProducts(await response.json() as ArtistProduct[]);
    setConnected(true);
    return true;
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editor) return;
    setPending(true);
    setError(null);
    try {
      const response = await mutate(
        editor.id ? `/api/artist/products/${encodeURIComponent(editor.id)}` : "/api/artist/products",
        editor.id ? "PATCH" : "POST",
        { title: editor.title, description: editor.description || null, priceToman: editor.priceToman }
      );
      if (!response.ok) {
        setError(response.status === 409
          ? "این محصول در وضعیت فعلی قابل ویرایش نیست."
          : "ذخیرهٔ محصول انجام نشد؛ اطلاعات را بررسی کن.");
        return;
      }
      await reload();
      setEditor(null);
    } catch {
      setError("ارتباط با سرویس محصول برقرار نشد.");
    } finally {
      setPending(false);
    }
  }

  async function archive() {
    if (!archiveProduct) return;
    setPending(true);
    setError(null);
    try {
      const response = await mutate(`/api/artist/products/${encodeURIComponent(archiveProduct.id)}/archive`, "POST");
      if (!response.ok) {
        setError(response.status === 409 ? "وضعیت محصول تغییر کرده؛ فهرست را دوباره بارگذاری کن." : "بایگانی محصول انجام نشد.");
        return;
      }
      await reload();
      setArchiveProduct(null);
    } catch {
      setError("ارتباط با سرویس محصول برقرار نشد.");
    } finally {
      setPending(false);
    }
  }

  async function restore(product: ArtistProduct) {
    setPending(true);
    setError(null);
    try {
      const response = await mutate(`/api/artist/products/${encodeURIComponent(product.id)}/restore`, "POST");
      if (!response.ok) {
        setError("بازگردانی محصول انجام نشد؛ فهرست را دوباره بارگذاری کن.");
        return;
      }
      await reload();
    } catch {
      setError("ارتباط با سرویس محصول برقرار نشد.");
    } finally {
      setPending(false);
    }
  }

  async function submitReview(product: ArtistProduct) {
    setPending(true);
    setError(null);
    try {
      const response = await mutate(`/api/artist/products/${encodeURIComponent(product.id)}/submit-review`, "POST");
      if (!response.ok) {
        setError(response.status === 409
          ? "برای ارسال به بررسی، اطلاعات محصول و بارگذاری تصویرها باید کامل باشد."
          : "ارسال محصول برای بررسی انجام نشد.");
        return;
      }
      await reload();
    } catch {
      setError("ارتباط با سرویس محصول برقرار نشد.");
    } finally {
      setPending(false);
    }
  }

  if (!connected) {
    return (
      <EmptyState
        title={initialState.kind === "connection-required" ? "اتصال حساب هنرمند فعال نیست" : "محصول‌ها در دسترس نیستند"}
        description={initialState.kind === "connection-required"
          ? "پس از فعال‌شدن ورود امن، محصول‌های حساب هنرمند از سرویس دریافت می‌شوند."
          : "سرویس محصول در حال حاضر پاسخ نمی‌دهد. کمی بعد دوباره تلاش کن."}
        note="در این صفحه محصول یا قیمت نمونه نمایش داده نمی‌شود."
      />
    );
  }

  return (
    <section className="artist-products" aria-labelledby="artist-products-title">
      <div className="artist-products-heading">
        <div>
          <h2 id="artist-products-title">محصول‌های من</h2>
          <p>قیمت محصول را خودت تعیین می‌کنی؛ بررسی نگارین فقط دربارهٔ محتوا و کیفیت انتشار است.</p>
        </div>
        <Button onClick={() => { setError(null); setEditor({ title: "", description: "", priceToman: "" }); }}>
          افزودن محصول
        </Button>
      </div>

      {error && <p className="artist-products-error" role="alert">{error}</p>}

      {products.length === 0 ? (
        <EmptyState title="هنوز محصولی ثبت نشده" description="برای شروع، محصولی را با عنوان، توضیح و قیمت تومانی خودت ثبت کن." />
      ) : (
        <div className="artist-product-list">
          {products.map((product) => (
            <article className={`artist-product-card${product.archivedAt ? " is-archived" : ""}`} key={product.id}>
              <div className="artist-product-card-main">
                <div className="artist-product-card-title">
                  <h3>{product.title}</h3>
                  <span className={`product-status product-status-${product.publicationStatus}`}>
                    {product.archivedAt ? "بایگانی‌شده" : statusLabels[product.publicationStatus]}
                  </span>
                </div>
                {product.description && <p>{product.description}</p>}
                <strong className="artist-product-price">{toman(product.priceToman)}</strong>
              </div>
              <div className="artist-product-actions">
                {product.archivedAt ? (
                  <Button variant="secondary" disabled={pending} onClick={() => void restore(product)}>بازگردانی</Button>
                ) : (
                  <>
                    <Button variant="secondary" disabled={pending || product.publicationStatus === "under_review"}
                      onClick={() => { setError(null); setEditor({ id: product.id, title: product.title, description: product.description ?? "", priceToman: product.priceToman }); }}>
                      ویرایش
                    </Button>
                    {(product.publicationStatus === "draft" || product.publicationStatus === "changes_requested") && (
                      <Button disabled={pending} onClick={() => void submitReview(product)}>ارسال برای بررسی</Button>
                    )}
                    <button className="product-archive-link" disabled={pending} onClick={() => { setError(null); setArchiveProduct(product); }}>
                      بایگانی
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {editor && (
        <div className="product-editor-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget && !pending) setEditor(null);
        }}>
          <section className="product-editor" role="dialog" aria-modal="true" aria-labelledby="product-editor-title" dir="rtl">
            <h2 id="product-editor-title">{editor.id ? "ویرایش محصول" : "ثبت محصول"}</h2>
            <form onSubmit={(event) => void save(event)}>
              <TextField label="عنوان محصول" required maxLength={200} value={editor.title}
                onChange={(event) => setEditor({ ...editor, title: event.target.value })} />
              <label className="product-form-field">
                <span>توضیحات محصول</span>
                <textarea maxLength={20000} rows={4} value={editor.description}
                  onChange={(event) => setEditor({ ...editor, description: event.target.value })} />
              </label>
              <TextField label="قیمت به تومان" required inputMode="numeric" pattern="[1-9][0-9]*"
                value={editor.priceToman} onChange={(event) => setEditor({ ...editor, priceToman: event.target.value })}
                hint="قیمت را خود هنرمند ثبت می‌کند." />
              {error && <p className="artist-products-error" role="alert">{error}</p>}
              <div className="product-editor-actions">
                <Button type="button" variant="secondary" disabled={pending} onClick={() => setEditor(null)}>انصراف</Button>
                <Button type="submit" disabled={pending}>{pending ? "در حال ذخیره…" : "ذخیرهٔ محصول"}</Button>
              </div>
            </form>
          </section>
        </div>
      )}

      {archiveProduct && (
        <div className="product-archive-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget && !pending) setArchiveProduct(null);
        }}>
          <section className="product-archive-dialog" role="dialog" aria-modal="true" aria-labelledby="archive-title" dir="rtl">
            <div className="archive-dialog-icon" aria-hidden="true">⇩</div>
            <h2 id="archive-title">بایگانی کردن محصول؟</h2>
            <p className="archive-dialog-description">
              محصول از نمایش عمومی و فروش خارج می‌شود، اما حذف نخواهد شد. اطلاعات و سوابق آن حفظ می‌شوند و بعداً می‌توانی محصول را بازگردانی کنی.
            </p>
            <div className="archive-product-summary">
              <span>محصول</span>
              <strong>{archiveProduct.title}</strong>
              <span className="archive-product-status">{statusLabels[archiveProduct.publicationStatus]}</span>
            </div>
            <div className="archive-effects">
              <strong>بعد از بایگانی</strong>
              <ul>
                <li>صفحهٔ محصول از نمایش عمومی خارج می‌شود.</li>
                <li>امکان خرید و دریافت سفارش جدید برای این محصول متوقف می‌شود.</li>
                <li>سوابق سفارش و فروش قبلی حفظ می‌شوند و محصول قابل بازگردانی است.</li>
              </ul>
            </div>
            {error && <p className="artist-products-error" role="alert">{error}</p>}
            <div className="archive-dialog-actions">
              <Button variant="secondary" disabled={pending} onClick={() => setArchiveProduct(null)}>انصراف</Button>
              <button className="archive-confirm-button" disabled={pending} onClick={() => void archive()}>
                {pending ? "در حال بایگانی…" : "تأیید و بایگانی محصول"}
              </button>
            </div>
            <p className="archive-dialog-footnote">این عملیات محصول را حذف نمی‌کند؛ فقط آن را از چرخهٔ فعال فروش خارج می‌کند.</p>
          </section>
        </div>
      )}
    </section>
  );
}
