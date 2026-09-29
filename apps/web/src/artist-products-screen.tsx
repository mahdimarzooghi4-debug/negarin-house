"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { Button, EmptyState, TextField } from "@negarin/ui";
import type { ArtistProduct } from "./artist-api";

type InitialState =
  | { kind: "ready"; products: ArtistProduct[] }
  | { kind: "connection-required" }
  | { kind: "unavailable" };

type EditorState = { id?: string; title: string; description: string; priceToman: string };
type ProductMedia = {
  id: string;
  contentType: string;
  contentLength: number;
  status: "pending" | "ready";
  readUrl: string | null;
};

const acceptedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxImageBytes = 10 * 1024 * 1024;

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
  const [mediaByProduct, setMediaByProduct] = useState<Record<string, ProductMedia[]>>({});

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

  async function reloadMedia(productId: string) {
    const response = await fetch(`/api/artist/products/${encodeURIComponent(productId)}/media`, { cache: "no-store" });
    if (response.status === 401 || response.status === 403) {
      setConnected(false);
      setProducts([]);
      return;
    }
    if (!response.ok) throw new Error("دریافت تصویرهای محصول انجام نشد.");
    const media = await response.json() as ProductMedia[];
    setMediaByProduct((current) => ({ ...current, [productId]: media }));
  }

  useEffect(() => {
    const activeProducts = products.filter((product) => !product.archivedAt);
    void Promise.all(activeProducts.map((product) => reloadMedia(product.id))).catch(() => {
      setError("دریافت وضعیت تصویرهای محصول انجام نشد.");
    });
  }, [products]);

  async function uploadFile(product: ArtistProduct, file: File, existingMedia?: ProductMedia): Promise<boolean> {
    if (!acceptedImageTypes.has(file.type)) {
      setError("فقط تصویرهای JPEG، PNG یا WebP قابل بارگذاری هستند.");
      return false;
    }
    if (file.size < 1 || file.size > maxImageBytes) {
      setError("حجم هر تصویر باید حداکثر ۱۰ مگابایت باشد.");
      return false;
    }
    if (existingMedia && (existingMedia.contentType !== file.type || existingMedia.contentLength !== file.size)) {
      setError("برای تکمیل این بارگذاری، همان نوع و اندازهٔ فایل قبلی را انتخاب کن.");
      return false;
    }

    setPending(true);
    setError(null);
    try {
      let mediaId = existingMedia?.id;
      if (!mediaId) {
        const created = await mutate(`/api/artist/products/${encodeURIComponent(product.id)}/media`, "POST", {
          contentType: file.type,
          contentLength: file.size
        });
        if (!created.ok) {
          setError(created.status === 409
            ? "این محصول در وضعیت فعلی امکان تغییر تصویر ندارد."
            : "آماده‌سازی بارگذاری تصویر انجام نشد.");
          return false;
        }
        mediaId = (await created.json() as { id: string }).id;
      }

      const uploaded = await fetch(
        `/api/artist/products/${encodeURIComponent(product.id)}/media/${encodeURIComponent(mediaId)}`,
        { method: "PUT", headers: { "Content-Type": file.type }, body: file, cache: "no-store" }
      );
      if (!uploaded.ok) {
        setError(uploaded.status === 409
          ? "وضعیت محصول یا بارگذاری تغییر کرده است. تصویرها را تازه‌سازی کن."
          : "بارگذاری تصویر کامل نشد؛ فایل در انتظار باقی مانده و می‌توانی دوباره تلاش کنی.");
        await reloadMedia(product.id);
        return false;
      }
      await reloadMedia(product.id);
      return true;
    } catch {
      setError("ارتباط با سرویس تصویر برقرار نشد؛ اگر بارگذاری نیمه‌کاره مانده باشد می‌توانی دوباره تلاش کنی.");
      try { await reloadMedia(product.id); } catch { /* Keep the upload error visible. */ }
      return false;
    } finally {
      setPending(false);
    }
  }

  async function uploadSelected(product: ArtistProduct, files: FileList | null) {
    if (!files?.length) return;
    for (const file of Array.from(files)) {
      const uploaded = await uploadFile(product, file);
      if (!uploaded) break;
    }
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
          ? "وضعیت محصول اجازهٔ ارسال برای بازبینی را نمی‌دهد؛ فهرست را تازه کن."
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
          {products.map((product) => {
            const productMedia = mediaByProduct[product.id] ?? [];
            const hasPendingMedia = productMedia.some((media) => media.status === "pending");
            return (
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
                {!product.archivedAt && product.publicationStatus !== "under_review" && (
                  <div className="artist-product-media" aria-label="تصویرهای محصول">
                    <div className="artist-product-media-heading">
                      <strong>تصویرهای محصول</strong>
                      <label className="product-media-picker">
                        افزودن تصویر
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          multiple
                          disabled={pending}
                          onChange={(event) => {
                            void uploadSelected(product, event.currentTarget.files);
                            event.currentTarget.value = "";
                          }}
                        />
                      </label>
                    </div>
                    {hasPendingMedia && <p className="product-media-pending-note">برای ارسال محصول به بررسی، بارگذاری‌های ناتمام را تکمیل کن.</p>}
                    {productMedia.length > 0 ? (
                      <div className="artist-product-media-list">
                        {productMedia.map((media) => media.status === "ready" && media.readUrl ? (
                          <a key={media.id} href={media.readUrl} target="_blank" rel="noreferrer" aria-label="بازکردن تصویر محصول">
                            <Image src={media.readUrl} alt={`تصویر محصول ${product.title}`} width={128} height={96} unoptimized />
                          </a>
                        ) : (
                          <label key={media.id} className="product-media-pending">
                            <span>بارگذاری تصویر ناتمام است؛ همان فایل را دوباره انتخاب کن.</span>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              disabled={pending}
                              onChange={(event) => {
                                const file = event.currentTarget.files?.[0];
                                if (file) void uploadFile(product, file, media);
                                event.currentTarget.value = "";
                              }}
                            />
                          </label>
                        ))}
                      </div>
                    ) : <p className="artist-product-media-empty">هنوز تصویری برای این محصول بارگذاری نشده است.</p>}
                  </div>
                )}
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
                      <Button disabled={pending || hasPendingMedia} onClick={() => void submitReview(product)}>ارسال برای بررسی</Button>
                    )}
                    <button className="product-archive-link" disabled={pending} onClick={() => { setError(null); setArchiveProduct(product); }}>
                      بایگانی
                    </button>
                  </>
                )}
              </div>
            </article>
            );
          })}
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
