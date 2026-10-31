"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./live-products.module.css";

type Content = {
  title: string; description: string | null; category: string | null; preparationTime: string | null; dimensions: string | null;
  materials: string | null; weight: string | null; color: string | null; technique: string | null; careInstructions: string | null; imageIds: string[];
};
type Product = {
  id: string; title: string; description: string | null; category: string | null; preparationTime: string | null; dimensions: string | null;
  materials: string | null; weight: string | null; color: string | null; technique: string | null;
  careInstructions: string | null; imageIds: string[]; priceToman: string; publicationStatus: string;
  version: number; stockQuantity: number; inventoryVersion: number; inventoryConfigured: boolean; availability: string; archivedAt: string | null;
  pendingChange: { status: "draft" | "under_review" | "changes_requested"; content: Content; reason: string | null } | null;
};
type Form = Pick<Product, "title" | "description" | "category" | "preparationTime" | "dimensions" | "materials" | "weight" | "color" | "technique" | "careInstructions" | "priceToman">;
type Grant = { id: string; role: string };
type HistoryEvent = { action: string; fromStatus: string | null; toStatus: string | null; version: number; createdAt: string; reason: string | null };
type InventoryEvent = { id: string; previousQuantity: number; stockQuantity: number; inventoryVersion: number; reason: string | null; createdAt: string };
type Session = "loading" | "ready" | "choose" | "signed-out" | "forbidden" | "error";
const blank: Form = { title: "", description: "", category: "", preparationTime: "", dimensions: "", materials: "", weight: "", color: "", technique: "", careInstructions: "", priceToman: "" };
const contentFields: Array<[keyof Omit<Form, "priceToman">, string]> = [
  ["title", "نام محصول"], ["description", "توضیحات"], ["category", "دسته‌بندی"], ["preparationTime", "زمان آماده‌سازی"], ["dimensions", "ابعاد"],
  ["materials", "مواد اولیه"], ["weight", "وزن"], ["color", "رنگ"], ["technique", "تکنیک ساخت"], ["careInstructions", "روش نگهداری"]
];

function isRecord(value: unknown): value is Record<string, unknown> { return !!value && typeof value === "object" && !Array.isArray(value); }
function isContent(value: unknown): value is Content {
  return isRecord(value) && typeof value.title === "string" && (typeof value.description === "string" || value.description === null) &&
    ["category", "preparationTime", "dimensions", "materials", "weight", "color", "technique", "careInstructions"].every(key => typeof value[key] === "string" || value[key] === null) &&
    Array.isArray(value.imageIds) && value.imageIds.every(id => typeof id === "string");
}
function isProduct(value: unknown): value is Product {
  if (!isRecord(value)) return false;
  return typeof value.id === "string" && typeof value.title === "string" && (typeof value.description === "string" || value.description === null) &&
    ["category", "preparationTime", "dimensions", "materials", "weight", "color", "technique", "careInstructions"].every(key => typeof value[key] === "string" || value[key] === null) &&
    Array.isArray(value.imageIds) && value.imageIds.every(id => typeof id === "string") && typeof value.priceToman === "string" &&
    typeof value.publicationStatus === "string" && Number.isSafeInteger(value.version) && Number.isSafeInteger(value.stockQuantity) &&
    Number.isSafeInteger(value.inventoryVersion) && typeof value.inventoryConfigured === "boolean" && typeof value.availability === "string" && (typeof value.archivedAt === "string" || value.archivedAt === null) &&
    (value.pendingChange === null || (isRecord(value.pendingChange) && ["draft", "under_review", "changes_requested"].includes(value.pendingChange.status as string) && isContent(value.pendingChange.content) && (typeof value.pendingChange.reason === "string" || value.pendingChange.reason === null)));
}
function statusLabel(status: string) { return ({ draft: "پیش‌نویس", under_review: "در انتظار بازبینی", changes_requested: "نیازمند اصلاح", approved: "تأییدشده", published: "منتشرشده" } as Record<string, string>)[status] ?? status; }
const readinessLabels: Record<string, string> = { "title-category": "عنوان و دستهٔ محصول", image: "حداقل یک تصویر", "price-inventory": "قیمت و موجودی", "description-preparation-time": "توضیح و زمان آماده‌سازی" };
function formFrom(product: Product, content: Content = product.pendingChange?.content ?? product): Form {
  return { title: content.title, description: content.description ?? "", category: content.category ?? "", preparationTime: content.preparationTime ?? "", dimensions: content.dimensions ?? "", materials: content.materials ?? "", weight: content.weight ?? "", color: content.color ?? "", technique: content.technique ?? "", careInstructions: content.careInstructions ?? "", priceToman: product.priceToman };
}
function formPayload(form: Form) {
  return { title: form.title.trim(), description: form.description?.trim() || null, category: form.category?.trim() || null, preparationTime: form.preparationTime?.trim() || null, dimensions: form.dimensions?.trim() || null, materials: form.materials?.trim() || null, weight: form.weight?.trim() || null, color: form.color?.trim() || null, technique: form.technique?.trim() || null, careInstructions: form.careInstructions?.trim() || null };
}
function fileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("خواندن تصویر انجام نشد."));
    reader.onload = () => {
      const data = typeof reader.result === "string" ? reader.result : "";
      const comma = data.indexOf(",");
      if (comma < 0) reject(new Error("ساختار تصویر معتبر نیست.")); else resolve(data.slice(comma + 1));
    };
    reader.readAsDataURL(file);
  });
}

export function ArtistProductsLive() {
  const [session, setSession] = useState<Session>("loading"); const [grants, setGrants] = useState<Grant[]>([]);
  const [products, setProducts] = useState<Product[]>([]); const [selected, setSelected] = useState<Product | null>(null);
  const [inventoryInput, setInventoryInput] = useState("");
  const [inventoryReason, setInventoryReason] = useState("");
  const [history, setHistory] = useState<HistoryEvent[]>([]);
  const [inventoryHistory, setInventoryHistory] = useState<InventoryEvent[]>([]);
  const [inventoryHistoryUnavailable, setInventoryHistoryUnavailable] = useState(false);
  const [form, setForm] = useState<Form>(blank); const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [includeArchived, setIncludeArchived] = useState(false); const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [notice, setNotice] = useState("");

  const loadProducts = useCallback(async (include = includeArchived) => {
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/artist/products?includeArchived=${include}`, { cache: "no-store" });
      if (!response.ok) throw new Error(response.status === 401 ? "نشست معتبر نیست یا پایان یافته است." : response.status === 403 ? "دسترسی هنرمند فعال نیست." : "فهرست محصولات دریافت نشد.");
      const data: unknown = await response.json();
      if (!Array.isArray(data) || !data.every(isProduct)) throw new Error("ساختار فهرست محصولات معتبر نیست.");
      const rows = data as Product[]; setProducts(rows);
      setSelected(previous => previous ? rows.find(item => item.id === previous.id) ?? null : null);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "خطای نامشخص"); }
    finally { setLoading(false); }
  }, [includeArchived]);

  const loadSession = useCallback(async () => {
    setSession("loading");
    try {
      const response = await fetch("/api/auth/context", { cache: "no-store" });
      if (response.ok) {
        const context: unknown = await response.json();
        if (!isRecord(context) || typeof context.activeRole !== "string") { setSession("error"); return; }
        if (context.activeRole === "artist") { setSession("ready"); return; }
      } else if (response.status !== 401) { setSession("error"); return; }
      const grantsResponse = await fetch("/api/auth/grants", { cache: "no-store" });
      if (grantsResponse.status === 401) { setSession("signed-out"); return; }
      if (!grantsResponse.ok) { setSession("error"); return; }
      const body: unknown = await grantsResponse.json();
      if (!isRecord(body) || !Array.isArray(body.grants)) { setSession("error"); return; }
      const artists = body.grants.filter((grant): grant is Grant => isRecord(grant) && typeof grant.id === "string" && grant.role === "artist");
      setGrants(artists); setSession(artists.length ? "choose" : "forbidden");
    } catch { setSession("error"); }
  }, []);

  useEffect(() => { void loadSession(); }, [loadSession]);
  useEffect(() => { if (session === "ready") void loadProducts(); }, [session, loadProducts]);
  useEffect(() => {
    let cancelled = false;
    async function loadImages() {
      setImageUrls({});
      if (!selected) return;
      const imageIds = [...new Set([...selected.imageIds, ...(selected.pendingChange?.content.imageIds ?? [])])];
      const images = await Promise.all(imageIds.map(async id => {
        try {
          const response = await fetch(`/api/artist/products/${selected.id}/images/${id}`, { cache: "no-store" });
          if (!response.ok) return [id, ""] as const;
          const value: unknown = await response.json();
          return [id, isRecord(value) && typeof value.url === "string" ? value.url : ""] as const;
        } catch { return [id, ""] as const; }
      }));
      if (!cancelled) setImageUrls(Object.fromEntries(images.filter(([, url]) => !!url)));
    }
    void loadImages();
    return () => { cancelled = true; };
  }, [selected]);
  useEffect(() => {
    let cancelled = false;
    async function loadHistory() {
      setHistory([]);
      if (!selected) return;
      try {
        const response = await fetch(`/api/artist/products/${selected.id}/publication-history`, { cache: "no-store" });
        if (!response.ok) return;
        const value: unknown = await response.json();
        if (Array.isArray(value)) {
          const rows = value.filter((event): event is HistoryEvent => isRecord(event) && typeof event.action === "string" &&
            (typeof event.fromStatus === "string" || event.fromStatus === null) && (typeof event.toStatus === "string" || event.toStatus === null) &&
            Number.isSafeInteger(event.version) && typeof event.createdAt === "string" && (typeof event.reason === "string" || event.reason === null));
          if (!cancelled) setHistory(rows);
        }
      } catch { /* Product editing remains usable if history is temporarily unavailable. */ }
    }
    void loadHistory();
    return () => { cancelled = true; };
  }, [selected?.id, selected?.version]);

  useEffect(() => {
    let cancelled = false;
    async function loadInventoryHistory() {
      setInventoryHistory([]); setInventoryHistoryUnavailable(false);
      if (!selected) return;
      try {
        const response = await fetch(`/api/artist/products/${selected.id}/inventory-history`, { cache: "no-store" });
        if (!response.ok) { if (!cancelled) setInventoryHistoryUnavailable(true); return; }
        const value: unknown = await response.json();
        if (!Array.isArray(value)) { if (!cancelled) setInventoryHistoryUnavailable(true); return; }
        const rows = value.filter((event): event is InventoryEvent => isRecord(event) && typeof event.id === "string" &&
          Number.isSafeInteger(event.previousQuantity) && Number.isSafeInteger(event.stockQuantity) && Number.isSafeInteger(event.inventoryVersion) &&
          (typeof event.reason === "string" || event.reason === null) && typeof event.createdAt === "string");
        if (!cancelled) { setInventoryHistory(rows); setInventoryHistoryUnavailable(rows.length !== value.length); }
      } catch { if (!cancelled) setInventoryHistoryUnavailable(true); }
    }
    void loadInventoryHistory();
    return () => { cancelled = true; };
  }, [selected?.id, selected?.inventoryVersion]);

  function choose(product: Product) { setSelected(product); setForm(formFrom(product)); setInventoryInput(product.inventoryConfigured ? String(product.stockQuantity) : ""); setInventoryReason(""); setIsNew(false); setError(""); setNotice(""); }
  function newProduct() { setSelected(null); setForm(blank); setInventoryInput(""); setIsNew(true); setError(""); setNotice(""); setImageUrls({}); }
  function updateProduct(product: Product) { setSelected(product); setForm(formFrom(product)); setInventoryInput(product.inventoryConfigured ? String(product.stockQuantity) : ""); setProducts(rows => rows.some(row => row.id === product.id) ? rows.map(row => row.id === product.id ? product : row) : [product, ...rows]); }

  async function saveProposal(product: Product, imageIds = product.pendingChange?.content.imageIds ?? product.imageIds) {
    const value = await requestJson(`/api/artist/products/${product.id}/change-proposal`, "PUT", {
      version: product.version, content: { ...formPayload(form), imageIds }
    });
    if (!isProduct(value)) throw new Error("پیشنهاد تغییر ذخیره شد اما پاسخ سرور معتبر نیست؛ فهرست را تازه کنید.");
    return value;
  }
  function applyForm<K extends keyof Form>(key: K, value: Form[K]) { setForm(current => ({ ...current, [key]: value })); }

  async function requestJson(path: string, method: string, body?: unknown) {
    const response = await fetch(path, { method, headers: body === undefined ? undefined : { "content-type": "application/json" }, body: body === undefined ? undefined : JSON.stringify(body) });
    if (!response.ok) {
      if (response.status === 409) {
        try {
          const details: unknown = await response.json();
          if (isRecord(details) && details.code === "product-publication-incomplete" && Array.isArray(details.missingFields)) {
            const labels = details.missingFields.filter((field): field is string => typeof field === "string").map(field => readinessLabels[field] ?? field);
            throw new Error(`برای ادامه این موارد را کامل کنید: ${labels.join("، ")}.`);
          }
        } catch (cause) { if (cause instanceof Error && cause.message.startsWith("برای ادامه")) throw cause; }
      }
      throw new Error(response.status === 401 ? "نشست معتبر نیست یا پایان یافته است." : response.status === 403 ? "عملیات برای این حساب مجاز نیست." : response.status === 404 ? "محصول یا تصویر پیدا نشد." : response.status === 409 ? "وضعیت محصول عوض شده است؛ اطلاعات را تازه کنید." : response.status === 413 ? "حجم تصویر از حد مجاز بیشتر است." : "درخواست انجام نشد؛ اطلاعات را بررسی کنید.");
    }
    if (response.status === 204) return null;
    return await response.json() as unknown;
  }

  async function createProduct() {
    if (busy) return;
    if (!form.title.trim() || !/^[1-9]\d*$/.test(form.priceToman)) { setError("نام محصول و قیمت معتبر را وارد کنید."); return; }
    setBusy(true); setError(""); setNotice("");
    try {
      const value = await requestJson("/api/artist/products", "POST", { ...formPayload(form), title: form.title.trim(), priceToman: form.priceToman });
      if (!isProduct(value)) throw new Error("محصول ساخته شد اما پاسخ سرور معتبر نیست؛ فهرست را تازه کنید.");
      updateProduct(value); setIsNew(false); setNotice("محصول ذخیره شد. حالا می‌توانید تصویر اضافه و اطلاعات را تکمیل کنید.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ساخت محصول انجام نشد."); }
    finally { setBusy(false); }
  }

  async function saveContent() {
    if (!selected || isNew || busy) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const value = selected.publicationStatus === "published"
        ? await saveProposal(selected)
        : await requestJson(`/api/artist/products/${selected.id}`, "PATCH", { ...formPayload(form), version: selected.version });
      if (!isProduct(value)) throw new Error("اطلاعات ذخیره شد اما پاسخ سرور معتبر نیست؛ فهرست را تازه کنید.");
      updateProduct(value); setNotice(value.publicationStatus === "published" ? "پیش‌نویس تغییرات ذخیره شد؛ نسخهٔ عمومی فعلی بدون تغییر می‌ماند." : "اطلاعات محصول ذخیره شد.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ذخیرهٔ اطلاعات انجام نشد."); }
    finally { setBusy(false); }
  }

  async function savePrice() {
    if (!selected || isNew || busy) return;
    if (!/^[1-9]\d*$/.test(form.priceToman)) { setError("قیمت باید عدد صحیح مثبت باشد."); return; }
    setBusy(true); setError(""); setNotice("");
    try {
      const value = await requestJson(`/api/artist/products/${selected.id}`, "PATCH", { version: selected.version, priceToman: form.priceToman });
      if (!isProduct(value)) throw new Error("قیمت ذخیره شد اما پاسخ سرور معتبر نیست؛ فهرست را تازه کنید.");
      updateProduct(value); setNotice("قیمت هنرمند به‌صورت مستقل ذخیره شد.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ذخیرهٔ قیمت انجام نشد."); }
    finally { setBusy(false); }
  }

  async function saveInventory() {
    if (!selected || isNew || busy) return;
    if (!/^(0|[1-9]\d*)$/.test(inventoryInput) || Number(inventoryInput) > 2_147_483_647) { setError("موجودی را به‌شکل عدد صحیح صفر یا بیشتر وارد کنید."); return; }
    setBusy(true); setError(""); setNotice("");
    try {
      await requestJson(`/api/artist/products/${selected.id}/inventory`, "PATCH", { stockQuantity: Number(inventoryInput), inventoryVersion: selected.inventoryVersion, ...(inventoryReason.trim() ? { reason: inventoryReason.trim() } : {}) });
      const value = await requestJson(`/api/artist/products/${selected.id}`, "GET");
      if (!isProduct(value)) throw new Error("موجودی ذخیره شد اما به‌روزرسانی محصول دریافت نشد.");
      updateProduct(value); setInventoryReason(""); setNotice("موجودی ثبت شد؛ مقدار صفر هم یعنی محصول فعلاً ناموجود است.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ذخیرهٔ موجودی انجام نشد."); }
    finally { setBusy(false); }
  }

  async function uploadImage(file: File) {
    if (!selected || isNew || busy) return;
    if (file.size > 5 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) { setError("فقط تصویر JPEG، PNG یا WebP تا ۵ مگابایت پذیرفته می‌شود."); return; }
    setBusy(true); setError(""); setNotice("");
    try {
      const base64 = await fileAsBase64(file);
      if (selected.publicationStatus === "published") {
        const prepared = selected.pendingChange ? selected : await saveProposal(selected);
        await requestJson(`/api/artist/products/${prepared.id}/change-proposal/images`, "POST", { version: prepared.version, base64 });
      } else {
        await requestJson(`/api/artist/products/${selected.id}/images`, "POST", { version: selected.version, base64 });
      }
      const value = await requestJson(`/api/artist/products/${selected.id}`, "GET");
      if (!isProduct(value)) throw new Error("تصویر ذخیره شد اما به‌روزرسانی محصول دریافت نشد.");
      updateProduct(value); setNotice("تصویر امن محصول ذخیره شد.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "بارگذاری تصویر انجام نشد."); }
    finally { setBusy(false); }
  }

  async function saveGallery(imageIds: string[]) {
    if (!selected || busy) return;
    setBusy(true); setError(""); setNotice("");
    try {
      if (selected.publicationStatus === "published") {
        const prepared = selected.pendingChange ? selected : await saveProposal(selected);
        await requestJson(`/api/artist/products/${prepared.id}/change-proposal/images`, "PATCH", { version: prepared.version, imageIds });
      } else {
        await requestJson(`/api/artist/products/${selected.id}/images`, "PATCH", { version: selected.version, imageIds });
      }
      const value = await requestJson(`/api/artist/products/${selected.id}`, "GET");
      if (!isProduct(value)) throw new Error("گالری ذخیره شد اما به‌روزرسانی محصول دریافت نشد.");
      updateProduct(value); setNotice("ترتیب گالری ذخیره شد.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ویرایش گالری انجام نشد."); }
    finally { setBusy(false); }
  }

  const validPrice = /^[1-9]\d*$/.test(form.priceToman) && form.priceToman.length <= 19 && BigInt(form.priceToman || "0") <= 9_223_372_036_854_775_807n;
  const validInventory = /^(0|[1-9]\d*)$/.test(inventoryInput) && Number(inventoryInput) <= 2_147_483_647;
  const readinessSteps: Array<[string, boolean]> = [
    ["عنوان و دستهٔ محصول", !!form.title.trim() && !!form.category?.trim()],
    ["حداقل یک تصویر", (selected?.pendingChange?.content.imageIds.length ?? selected?.imageIds.length ?? 0) > 0],
    ["قیمت و موجودی ثبت‌شده", validPrice && validInventory],
    ["توضیح و زمان آماده‌سازی", !!form.description?.trim() && !!form.preparationTime?.trim()]
  ];
  const publicationReady = readinessSteps.every(([, complete]) => complete);
  const galleryImageIds = selected?.pendingChange?.content.imageIds ?? selected?.imageIds ?? [];

  async function transition(action: "submit" | "publish") {
    if (!selected || busy) return;
    if (!publicationReady) { setError("برای ارسال یا انتشار، چهار مورد آمادگی نمایش‌داده‌شده را کامل کنید."); return; }
    setBusy(true); setError(""); setNotice("");
    try {
      if (selected.publicationStatus === "published") {
        const prepared = await saveProposal(selected);
        const submitted = await requestJson(`/api/artist/products/${prepared.id}/change-proposal/submit`, "POST", { version: prepared.version });
        if (!isProduct(submitted)) throw new Error("تغییرات ارسال شد اما پاسخ سرور معتبر نیست؛ فهرست را تازه کنید.");
        updateProduct(submitted); setNotice("تغییرات برای بازبینی ارسال شد؛ نسخهٔ عمومی فعلی همچنان نمایش داده می‌شود."); return;
      }
      let current = selected;
      const nextContent = formPayload(form);
      const storedContent = formPayload(formFrom(current));
      if (JSON.stringify(nextContent) !== JSON.stringify(storedContent)) {
        const updated = await requestJson(`/api/artist/products/${current.id}`, "PATCH", { ...nextContent, version: current.version });
        if (!isProduct(updated)) throw new Error("ذخیرهٔ اطلاعات محصول کامل نشد.");
        current = updated;
        if (action === "publish" && current.publicationStatus !== "approved") {
          updateProduct(current); setNotice("محتوای تغییرکرده از تأیید خارج شد؛ پس از ارسال و تأیید دوباره می‌توانید منتشرش کنید."); return;
        }
      }
      if (form.priceToman !== current.priceToman) {
        const updated = await requestJson(`/api/artist/products/${current.id}`, "PATCH", { version: current.version, priceToman: form.priceToman });
        if (!isProduct(updated)) throw new Error("ذخیرهٔ قیمت محصول کامل نشد.");
        current = updated;
      }
      if (!/^(0|[1-9]\d*)$/.test(inventoryInput) || Number(inventoryInput) > 2_147_483_647) throw new Error("موجودی معتبر نیست.");
      if (!current.inventoryConfigured || Number(inventoryInput) !== current.stockQuantity) {
        await requestJson(`/api/artist/products/${current.id}/inventory`, "PATCH", { stockQuantity: Number(inventoryInput), inventoryVersion: current.inventoryVersion });
      }
      const refreshed = await requestJson(`/api/artist/products/${current.id}`, "GET");
      if (!isProduct(refreshed)) throw new Error("دریافت نسخهٔ تازهٔ محصول انجام نشد.");
      await requestJson(`/api/artist/products/${refreshed.id}/${action}`, "POST", { version: refreshed.version });
      const value = await requestJson(`/api/artist/products/${selected.id}`, "GET");
      if (!isProduct(value)) throw new Error("وضعیت ثبت شد اما پاسخ سرور معتبر نیست؛ فهرست را تازه کنید.");
      updateProduct(value); setNotice(action === "submit" ? "محصول برای بازبینی ارسال شد." : "انتشار عمومی محصول انجام شد.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "تغییر وضعیت انجام نشد."); }
    finally { setBusy(false); }
  }

  async function archive(action: "archive" | "restore") {
    if (!selected || busy) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const value = await requestJson(`/api/artist/products/${selected.id}/${action}`, "POST");
      if (!isProduct(value)) throw new Error("وضعیت بایگانی ثبت شد؛ فهرست را تازه کنید.");
      updateProduct(value); await loadProducts(true); setNotice(action === "archive" ? "محصول بایگانی شد؛ سابقه و تصاویر محفوظ‌اند." : "محصول بازیابی شد.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "عملیات بایگانی انجام نشد."); }
    finally { setBusy(false); }
  }

  async function selectGrant(id: string) {
    setSession("loading"); setError("");
    try { const response = await fetch("/api/auth/context", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ grantId: id }) }); if (!response.ok) throw new Error(); setSession("ready"); }
    catch { setError("فعال‌سازی دسترسی هنرمند انجام نشد."); setSession("error"); }
  }
  async function logout() { await fetch("/api/auth/session", { method: "DELETE" }); location.assign("/"); }

  const editable = !selected?.archivedAt && selected?.publicationStatus !== "under_review" && selected?.pendingChange?.status !== "under_review";
  return <main className={styles.page} dir="rtl" lang="fa-IR">
    <aside className={styles.sidebar}><a className={styles.brand} href="/artist/storefront"><span>ن</span><strong>نگارین<small>پنل هنرمند</small></strong></a><nav aria-label="منوی هنرمند"><a href="/artist/storefront">فروشگاه من</a><a className={styles.active} href="/artist/products" aria-current="page">محصولات من</a><a href="/artist/orders">سفارش‌ها</a><a href="/artist/corporate-orders">سفارش‌های سازمانی</a><a href="/artist/growth">رشد من</a><a href="/artist/services">خدمات</a><a href="/artist/finance">مالی</a><a href="/preview/artist">پیش‌نمایش سایر بخش‌ها</a></nav><button className={styles.logout} type="button" onClick={() => void logout()}>خروج امن</button></aside>
    <section className={styles.main}><header className={styles.header}><div><p>خانه نگارین / فروشگاه من</p><h1>مدیریت محصولات</h1><span>اطلاعات محصول و گالری را مدیریت کنید؛ قیمت‌گذاری همیشه در اختیار شماست.</span></div><span className={styles.badge}>اتصال زنده به API</span></header>
      {session === "loading" && <section className={styles.panel}>در حال بررسی نشست امن…</section>}{session === "signed-out" && <section className={styles.panel}><h2>ورود لازم است</h2><p>برای مدیریت محصولات، نشست معتبر هنرمند لازم است.</p></section>}{session === "forbidden" && <section className={styles.panel}><h2>دسترسی هنرمند موجود نیست</h2><p>در نشست فعال حساب هنرمند در دسترس نیست.</p></section>}{session === "choose" && <section className={styles.panel}><h2>انتخاب حساب هنرمند</h2><p>برای مدیریت محصولات، دسترسی هنرمند را انتخاب کنید.</p><div className={styles.grants}>{grants.map(grant => <button key={grant.id} type="button" onClick={() => void selectGrant(grant.id)}>فعال‌سازی حساب هنرمند</button>)}</div></section>}{session === "error" && <section className={styles.panel}><p className={styles.error} role="alert">{error || "نشست کاربری قابل بررسی نیست."}</p><button type="button" onClick={() => void loadSession()}>تلاش دوباره</button></section>}
      {session === "ready" && <div className={styles.layout}>
        <section className={styles.panel}><div className={styles.toolbar}><div><h2>محصول‌های هنرمند</h2><p>{products.length} محصول</p></div><button type="button" disabled={loading || busy} onClick={newProduct}>محصول جدید</button></div>{error && <p className={styles.error} role="alert">{error}</p>}{notice && <p className={styles.notice} role="status">{notice}</p>}<label className={styles.toggle}><input type="checkbox" checked={includeArchived} onChange={event => { setIncludeArchived(event.target.checked); void loadProducts(event.target.checked); }}/><span>نمایش بایگانی‌شده‌ها</span></label>{loading && <p className={styles.muted}>در حال دریافت محصولات…</p>}{!loading && !products.length && <p className={styles.muted}>محصولی ثبت نشده است.</p>}<div className={styles.productList}>{products.map(product => <button type="button" key={product.id} className={styles.productItem} aria-current={selected?.id === product.id ? "true" : undefined} onClick={() => choose(product)}><strong>{product.title}</strong><span>{statusLabel(product.publicationStatus)}{product.pendingChange ? ` · تغییرات ${statusLabel(product.pendingChange.status)}` : ""}{product.archivedAt ? " · بایگانی‌شده" : ""}</span><small>{product.imageIds.length} تصویر · نسخهٔ {product.version}</small></button>)}</div></section>
        <section className={styles.panel}>{!selected && !isNew && <p className={styles.muted}>برای ویرایش، یک محصول را انتخاب یا محصول تازه‌ای ایجاد کنید.</p>}{(selected || isNew) && <>
          <div className={styles.toolbar}><div><h2>{isNew ? "محصول جدید" : selected?.title}</h2><p>{isNew ? "ابتدا نام و قیمت را ذخیره کنید." : `وضعیت: ${statusLabel(selected!.publicationStatus)} · نسخه ${selected!.version}`}</p></div>{selected && <span className={styles.status}>{selected.archivedAt ? "بایگانی" : selected.pendingChange ? `تغییرات ${statusLabel(selected.pendingChange.status)}` : statusLabel(selected.publicationStatus)}</span>}</div>
          {selected?.publicationStatus === "published" && <p className={styles.notice}>{selected.pendingChange?.reason ? `درخواست اصلاح: ${selected.pendingChange.reason} ` : "نسخهٔ فعلی برای مشتریان فعال می‌ماند تا تغییرات پیشنهادی تأیید شود. "}{selected.pendingChange?.status === "under_review" ? "تغییرات در حال بررسی است و فعلاً قابل ویرایش نیست." : ""}</p>}
          <div className={styles.formGrid}>{contentFields.map(([key, label]) => <label key={key} className={key === "description" || key === "careInstructions" ? styles.wide : ""}>{label}{key === "description" || key === "careInstructions" ? <textarea disabled={!isNew && !editable} value={form[key] ?? ""} onChange={event => applyForm(key, event.target.value)} maxLength={key === "description" ? 20000 : 2000}/> : <input disabled={!isNew && !editable} value={form[key] ?? ""} onChange={event => applyForm(key, event.target.value)}/>}</label>)}<label>قیمت به تومان<input inputMode="numeric" dir="ltr" value={form.priceToman} onChange={event => applyForm("priceToman", event.target.value.replace(/[^0-9]/g, ""))} placeholder="قیمت را به تومان وارد کنید"/></label></div>
          {isNew ? <div className={styles.actions}><button className={styles.primary} disabled={busy} type="button" onClick={() => void createProduct()}>{busy ? "در حال ذخیره…" : "ساخت محصول"}</button><button type="button" onClick={() => { setSelected(null); setIsNew(false); }}>انصراف</button></div> : selected && <>
            <section className={styles.gallerySection}><div className={styles.toolbar}><div><h3>{selected.pendingChange ? "گالری نسخهٔ پیشنهادی" : "گالری محصول"}</h3><p>حداکثر ۸ تصویر؛ تصویر اول، تصویر اصلی است.</p></div><label className={styles.upload}>افزودن تصویر<input type="file" accept="image/jpeg,image/png,image/webp" disabled={!editable || busy || galleryImageIds.length >= 8} onChange={event => { const file = event.target.files?.[0]; if (file) void uploadImage(file); event.target.value = ""; }}/></label></div><div className={styles.gallery}>{galleryImageIds.map((id, index) => <figure key={id}>{imageUrls[id] ? <img src={imageUrls[id]} alt={`${selected.title} تصویر ${index + 1}`}/> : <div className={styles.imagePending}>در حال دریافت تصویر…</div>}<figcaption>{index === 0 ? "تصویر اصلی" : `تصویر ${index + 1}`}</figcaption><div className={styles.imageActions}><button type="button" disabled={!editable || busy || index === 0} onClick={() => { const ids = [...galleryImageIds]; [ids[index - 1], ids[index]] = [ids[index]!, ids[index - 1]!]; void saveGallery(ids); }}>بالا</button><button type="button" disabled={!editable || busy || index === galleryImageIds.length - 1} onClick={() => { const ids = [...galleryImageIds]; [ids[index], ids[index + 1]] = [ids[index + 1]!, ids[index]!]; void saveGallery(ids); }}>پایین</button><button type="button" disabled={!editable || busy} onClick={() => void saveGallery(galleryImageIds.filter(imageId => imageId !== id))}>حذف از گالری</button></div></figure>)}</div></section>
            <section className={styles.inventory}><h3>موجودی قابل فروش</h3><p>موجودی صفر هم مقدار معتبر است و محصول را ناموجود نشان می‌دهد.</p><div className={styles.inventoryRow}><label>تعداد موجود<input inputMode="numeric" dir="ltr" value={inventoryInput} onChange={event => setInventoryInput(event.target.value.replace(/[^0-9]/g, ""))} placeholder="مثلاً ۰" disabled={!!selected.archivedAt}/></label><label>دلیل تغییر <input value={inventoryReason} onChange={event => setInventoryReason(event.target.value)} maxLength={500} placeholder="مثلاً شمارش پایان روز" disabled={!!selected.archivedAt}/></label><button type="button" disabled={busy || !!selected.archivedAt || !validInventory} onClick={() => void saveInventory()}>ثبت موجودی</button><span>{selected.inventoryConfigured ? "موجودی ثبت شده" : "هنوز ثبت نشده"}</span></div></section>
            <section className={styles.inventoryHistory}><h3>تاریخچهٔ موجودی</h3>{inventoryHistoryUnavailable && <p className={styles.muted} role="status">دریافت تاریخچهٔ موجودی موقتاً ممکن نیست.</p>}{!inventoryHistoryUnavailable && inventoryHistory.length === 0 && <p className={styles.muted}>برای این محصول هنوز تغییری در موجودی ثبت نشده است.</p>}{inventoryHistory.length > 0 && <ol>{inventoryHistory.map(event => <li key={event.id}><strong>{event.previousQuantity.toLocaleString("fa-IR")} ← {event.stockQuantity.toLocaleString("fa-IR")} عدد</strong><small>نسخهٔ {event.inventoryVersion.toLocaleString("fa-IR")} · {new Date(event.createdAt).toLocaleString("fa-IR")}</small>{event.reason && <p>{event.reason}</p>}</li>)}</ol>}</section>
            <section className={styles.readiness}><h3>آمادگی برای ارسال به بازبینی</h3><p>این چهار مورد مطابق معیارهای صفحهٔ محصول در نگارین بررسی می‌شوند.</p><ul>{readinessSteps.map(([label, complete]) => <li key={label} data-complete={complete ? "true" : "false"}><span aria-hidden="true">{complete ? "✓" : "○"}</span>{label}</li>)}</ul></section>
            <p className={styles.hint}>حذف از گالری، فایل تاریخی را پاک نمی‌کند. تغییرات محصول منتشرشده تا زمان تأیید فقط در نسخهٔ پیشنهادی ذخیره می‌شوند و نسخهٔ فعلی فروشگاه حفظ می‌شود.</p>
            <section className={styles.history}><h3>تاریخچهٔ بازبینی و تغییرات</h3>{history.length ? <ol>{history.map(event => <li key={`${event.version}-${event.action}`}><strong>{event.action}</strong><span>{event.fromStatus ? `${statusLabel(event.fromStatus)} ← ` : ""}{statusLabel(event.toStatus ?? "ثبت‌شده")}</span><small>نسخهٔ {event.version} · {new Date(event.createdAt).toLocaleString("fa-IR")}</small>{event.reason && <p>{event.reason}</p>}</li>)}</ol> : <p className={styles.muted}>هنوز رویدادی ثبت نشده یا تاریخچه در دسترس نیست.</p>}</section>
            <div className={styles.actions}><button className={styles.primary} disabled={busy || !editable} type="button" onClick={() => void saveContent()}>ذخیرهٔ اطلاعات</button><button disabled={busy || !!selected.archivedAt} type="button" onClick={() => void savePrice()}>ذخیرهٔ مستقل قیمت</button>{(selected.publicationStatus === "draft" || selected.publicationStatus === "changes_requested") && <button className={styles.submit} disabled={busy || !!selected.archivedAt || !publicationReady} type="button" onClick={() => void transition("submit")}>ذخیره و ارسال برای بازبینی</button>}{selected.publicationStatus === "published" && selected.pendingChange && selected.pendingChange.status !== "under_review" && <button className={styles.submit} disabled={busy || !!selected.archivedAt || !publicationReady} type="button" onClick={() => void transition("submit")}>ارسال تغییرات برای بازبینی</button>}{selected.publicationStatus === "approved" && <button className={styles.submit} disabled={busy || !!selected.archivedAt || !publicationReady} type="button" onClick={() => void transition("publish")}>انتشار عمومی</button>}{selected.archivedAt ? <button disabled={busy} type="button" onClick={() => void archive("restore")}>بازیابی محصول</button> : <button className={styles.archive} disabled={busy} type="button" onClick={() => void archive("archive")}>بایگانی</button>}</div>
          </>}
        </>}</section>
      </div>}
    </section>
  </main>;
}
