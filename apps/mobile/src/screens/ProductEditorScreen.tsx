import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View
} from "react-native";
import { ApiError, apiJson } from "../api/client";
import { ProductImageGallery } from "./ProductImageGallery";
import { parseArtistProduct, type ArtistProduct } from "../domain/artist-data";
import {
  createProductCommand, inventoryCommand, parseStockInput, patchProductCommand,
  publicationCommand, type ProductForm
} from "../domain/product-commands";

const colors = {
  background: "#fcfcfc", surface: "#ffffff", brand: "#041b65",
  accent: "#07858f", accentSoft: "#eaf7f7", border: "#e5e7eb",
  text: "#111827", muted: "#6b7280", danger: "#b91c1c",
  dangerSoft: "#fee2e2"
};
const statuses: Record<ArtistProduct["publicationStatus"], string> = {
  draft: "پیش‌نویس", under_review: "در حال بررسی", changes_requested: "نیاز به اصلاح",
  approved: "تأیید شده", published: "منتشر شده"
};
type Props = { token: string; productId: string | null; onBack: () => void };
const emptyForm: ProductForm = { title: "", description: "", category: "", priceToman: "" };
const numbers = new Intl.NumberFormat("fa-IR");

function populate(product: ArtistProduct): ProductForm {
  return {
    title: product.title,
    description: product.description ?? "",
    category: product.category ?? "",
    priceToman: product.priceToman
  };
}

export function ProductEditorScreen({ token, productId, onBack }: Props) {
  const [product, setProduct] = useState<ArtistProduct | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [stock, setStock] = useState("0");
  const [loading, setLoading] = useState(productId !== null);
  const [busy, setBusy] = useState(false);
  const [stale, setStale] = useState(false);
  const [createUncertain, setCreateUncertain] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [retry, setRetry] = useState(0);
  const operationLock = useRef(false);
  const handleProductChange = useCallback((fresh: ArtistProduct) => {
    setProduct(fresh);
    setForm(populate(fresh));
    setStock(String(fresh.stockQuantity));
    setStale(false);
  }, []);
  const handleGalleryBusy = useCallback((next: boolean) => setBusy(next), []);
  const handleGalleryStale = useCallback((message: string) => {
    setStale(true);
    setError(message);
  }, []);
  const id = product?.id ?? productId;

  useEffect(() => {
    if (!productId) return;
    const controller = new AbortController();
    setLoading(true);
    setError("");
    void apiJson("/api/v1/artist/products/" + productId, token, { signal: controller.signal })
      .then(value => {
        const fresh = parseArtistProduct(value);
        if (!fresh) throw new Error("اطلاعات محصول از سرور معتبر نیست.");
        if (controller.signal.aborted) return;
        setProduct(fresh);
        setForm(populate(fresh));
        setStock(String(fresh.stockQuantity));
        setStale(false);
      }).catch((reason: unknown) => {
        if (!controller.signal.aborted) {
          setStale(true);
          setError(reason instanceof Error ? reason.message : "دریافت محصول انجام نشد.");
        }
      }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [productId, token, retry]);

  async function freshRead(productKey: string): Promise<ArtistProduct> {
    const value = await apiJson("/api/v1/artist/products/" + productKey, token);
    const result = parseArtistProduct(value);
    if (!result || result.id.toLowerCase() !== productKey.toLowerCase()) {
      throw new Error("پاسخ محصول با شناسه درخواستی تطابق ندارد.");
    }
    setProduct(result);
    setForm(populate(result));
    setStock(String(result.stockQuantity));
    setStale(false);
    return result;
  }

  async function refresh() {
    if (!id || operationLock.current) return;
    operationLock.current = true;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await freshRead(id);
      setMessage("وضعیت معتبر محصول دوباره از سرور دریافت شد.");
    } catch (reason) {
      setStale(true);
      setError(reason instanceof Error ? reason.message : "دریافت دوباره محصول انجام نشد.");
    } finally {
      setBusy(false);
      operationLock.current = false;
    }
  }

  // Every mutation must be reconciled against an owned API read. Never automatically replay
  // an uncertain command or infer successful publication, inventory or payment state.
  async function mutate(path: string, method: "PATCH" | "POST", body: Record<string, unknown>, success: string) {
    if (!product || operationLock.current || stale) return;
    operationLock.current = true;
    setBusy(true);
    setMessage("");
    setError("");
    try {
      await apiJson(path, token, { method, body: JSON.stringify(body) });
      await freshRead(product.id);
      setMessage(success);
    } catch (reason) {
      try {
        await freshRead(product.id);
        const conflict = reason instanceof ApiError && reason.status === 409;
        setError(conflict
          ? "نسخه محصول در سرور تغییر کرده است. وضعیت تازه دریافت شد؛ تغییرات را دوباره بررسی کنید."
          : "نتیجه اقدام قطعی نیست. وضعیت تازه از سرور دریافت شد؛ پیش از اقدام بعدی آن را بررسی کنید.");
      } catch {
        setStale(true);
        setError("نتیجه اقدام نامشخص است و دریافت وضعیت معتبر ممکن نشد. تا بازیابی وضعیت، عملیات جدید غیرفعال است.");
      }
    } finally {
      setBusy(false);
      operationLock.current = false;
    }
  }

  async function saveProduct() {
    if (operationLock.current || stale || createUncertain) return;
    const create = createProductCommand(form);
    if (!create) { setError("نام محصول، دسته، توضیحات و قیمت تومان را مطابق محدودیت‌های ثبت محصول بررسی کنید."); return; }
    if (product) {
      const patch = patchProductCommand(product, form);
      if (!patch) { setError("تغییر مجازی برای ذخیره وجود ندارد یا اطلاعات معتبر نیست."); return; }
      await mutate("/api/v1/artist/products/" + product.id, "PATCH", patch, "تغییرات محصول در سرور ثبت شد.");
      return;
    }
    operationLock.current = true;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const response = await apiJson("/api/v1/artist/products", token, { method: "POST", body: JSON.stringify(create) });
      const created = parseArtistProduct(response);
      if (!created) {
        setCreateUncertain(true);
        setError("پاسخ ساخت محصول معتبر نیست. برای جلوگیری از محصول تکراری دوباره ثبت نکنید؛ فهرست محصولات را بررسی کنید.");
        return;
      }
      setProduct(created);
      setForm(populate(created));
      setStock(String(created.stockQuantity));
      try {
        await freshRead(created.id);
        setMessage("پیش‌نویس محصول ثبت شد. موجودی را جداگانه ثبت کنید.");
      } catch {
        setStale(true);
        setError("محصول ایجاد شد، اما دریافت وضعیت تازه موفق نبود؛ پیش از اقدام بعدی وضعیت را بازیابی کنید.");
      }
    } catch (reason) {
      if (!(reason instanceof ApiError) || reason.status === 0) {
        setCreateUncertain(true);
        setError("نتیجه ساخت محصول نامشخص است. ساخت را تکرار نکنید؛ ابتدا فهرست محصولات را بررسی کنید.");
      } else {
        setError(reason.message);
      }
    } finally {
      setBusy(false);
      operationLock.current = false;
    }
  }

  function saveStock() {
    if (!product || stale || busy) return;
    if (parseStockInput(stock) === null) {
      setError("موجودی باید عدد صحیح نامنفی در محدوده مجاز باشد.");
      return;
    }
    const command = inventoryCommand(product, stock);
    if (!command) { setError("موجودی تغییری نکرده یا محصول برای این اقدام مجاز نیست."); return; }
    void mutate("/api/v1/artist/products/" + product.id + "/inventory", "PATCH", command, "موجودی مستقل محصول به‌روزرسانی شد.");
  }

  function publication(action: "submit" | "publish") {
    if (!product || stale || busy) return;
    const command = publicationCommand(product, action);
    if (!command) { setError("شرایط مرحله انتشار فراهم نیست؛ تصاویر و وضعیت محصول را بررسی کنید."); return; }
    const current = createProductCommand(form);
    if (!current || current.priceToman !== product.priceToman ||
      (!["published", "under_review"].includes(product.publicationStatus) &&
        (current.title !== product.title || current.description !== product.description || current.category !== product.category)) ||
      parseStockInput(stock) !== product.stockQuantity) {
      setError("پیش از این اقدام، تغییرات محصول و موجودی را ذخیره کنید.");
      return;
    }
    void mutate(
      "/api/v1/artist/products/" + product.id + "/" + action,
      "POST", command,
      action === "submit"
        ? "درخواست بررسی ثبت شد. تأیید محصول فقط توسط مسئول انسانی انجام می‌شود."
        : "انتشار پس از تأیید انسانی در سرور ثبت شد."
    );
  }

  const canEditContent = !product || ["draft", "changes_requested", "approved"].includes(product.publicationStatus);
  const allowed = !loading && !busy && !stale && !createUncertain && (!product || !product.archivedAt);
  const currentForm = createProductCommand(form);
  const hasUnsavedForm = !!product && (!currentForm || currentForm.title !== product.title ||
    currentForm.description !== product.description || currentForm.category !== product.category ||
    currentForm.priceToman !== product.priceToman);
  const hasUnsavedStock = !!product && parseStockInput(stock) !== product.stockQuantity;
  const galleryDisabled = !allowed || hasUnsavedForm || hasUnsavedStock;
  const maySubmit = product && publicationCommand(product, "submit") !== null;
  const mayPublish = product && publicationCommand(product, "publish") !== null;

  if (loading) {
    return <View style={styles.center}><ActivityIndicator color={colors.accent} />
      <Text style={styles.hint}>در حال دریافت محصول…</Text></View>;
  }
  return <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
    <View style={styles.header}>
      <Pressable accessibilityRole="button" disabled={busy} onPress={onBack} style={styles.back}>
        <Text style={styles.backLabel}>بازگشت</Text>
      </Pressable>
      <View style={styles.heading}>
        <Text style={styles.title}>{product ? "ویرایش محصول" : "افزودن محصول"}</Text>
        <Text style={styles.hint}>اطلاعات اثر هنری خود را تکمیل کنید</Text>
      </View>
    </View>

    {product && <View style={styles.info}>
      <Text style={styles.infoTitle}>وضعیت: {statuses[product.publicationStatus]}</Text>
      <Text style={styles.hint}>نسخه محصول: {numbers.format(product.version)} · نسخه موجودی: {numbers.format(product.inventoryVersion)}</Text>
      {product.archivedAt ? <Text style={styles.warning}>این محصول بایگانی شده است و ویرایش آن مجاز نیست.</Text> : null}
    </View>}
    {error ? <View style={styles.errorBox}><Text style={styles.error}>{error}</Text>
      {product ? <Pressable disabled={busy} onPress={() => void refresh()} style={styles.minorButton}><Text style={styles.minorText}>دریافت وضعیت تازه</Text></Pressable> : productId ? <Pressable disabled={busy} onPress={() => setRetry(value => value + 1)} style={styles.minorButton}><Text style={styles.minorText}>تلاش دوباره برای دریافت محصول</Text></Pressable> : null}
    </View> : null}
    {message ? <View style={styles.successBox}><Text style={styles.success}>{message}</Text></View> : null}
    {createUncertain ? <Text style={styles.warning}>تا بررسی فهرست محصولات، ثبت دوباره غیرفعال است.</Text> : null}

    <Text style={styles.section}>اطلاعات اصلی</Text>
    <View style={styles.sectionBody}>
      <Text style={styles.label}>نام محصول</Text>
      <TextInput accessibilityLabel="نام محصول" value={form.title} maxLength={200}
        editable={allowed && canEditContent} onChangeText={title => setForm(previous => ({ ...previous, title }))}
        placeholder="نام اثر هنری" placeholderTextColor={colors.muted} style={styles.input} textAlign="right" />
      <Text style={styles.label}>دسته هنری</Text>
      <TextInput accessibilityLabel="دسته هنری" value={form.category} maxLength={200}
        editable={allowed && canEditContent} onChangeText={category => setForm(previous => ({ ...previous, category }))}
        placeholder="دسته‌بندی اثر" placeholderTextColor={colors.muted} style={styles.input} textAlign="right" />
      <Text style={styles.label}>توضیحات محصول</Text>
      <TextInput accessibilityLabel="توضیحات محصول" value={form.description} maxLength={20_000} multiline
        editable={allowed && canEditContent} onChangeText={description => setForm(previous => ({ ...previous, description }))}
        placeholder="داستان، تکنیک ساخت و ویژگی‌های محصول" placeholderTextColor={colors.muted}
        style={[styles.input, styles.textArea]} textAlign="right" textAlignVertical="top" />
    </View>

    <Text style={styles.section}>تصاویر محصول</Text>
    <ProductImageGallery product={product} token={token} disabled={galleryDisabled}
      onProductChange={handleProductChange} onBusyChange={handleGalleryBusy} onStale={handleGalleryStale} />
    {product && (hasUnsavedForm || hasUnsavedStock) ? <Text style={styles.hint}>ابتدا تغییرات اطلاعات و موجودی را ذخیره کنید؛ سپس گالری تصاویر را تغییر دهید.</Text> : null}

    <Text style={styles.section}>قیمت و موجودی</Text>
    <View style={styles.sectionBody}>
      <Text style={styles.label}>قیمت فروش (تومان) — فقط به اختیار هنرمند</Text>
      <TextInput accessibilityLabel="قیمت فروش به تومان" value={form.priceToman}
        editable={allowed} onChangeText={priceToman => setForm(previous => ({ ...previous, priceToman }))}
        placeholder="۲٬۴۵۰٬۰۰۰" placeholderTextColor={colors.muted} keyboardType="numeric"
        maxLength={26} style={styles.input} textAlign="right" />
      <Pressable accessibilityRole="button" disabled={!allowed} onPress={() => void saveProduct()}
        style={[styles.saveButton, !allowed && styles.disabled]}>
        {busy ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.saveText}>{product ? "ذخیره تغییرات محصول" : "ذخیره پیش‌نویس محصول"}</Text>}
      </Pressable>
      <View style={styles.separator} />
      <Text style={styles.label}>موجودی قابل فروش</Text>
      <TextInput accessibilityLabel="موجودی قابل فروش" value={stock} editable={allowed && !!product}
        onChangeText={setStock} keyboardType="numeric" maxLength={10} style={styles.input} textAlign="right" />
      <Pressable accessibilityRole="button" disabled={!allowed || !product}
        onPress={saveStock} style={[styles.outlineButton, (!allowed || !product) && styles.disabled]}>
        <Text style={styles.outlineText}>ثبت تغییر موجودی</Text>
      </Pressable>
      {!product ? <Text style={styles.hint}>ابتدا پیش‌نویس محصول را بسازید؛ سپس موجودی مستقل ثبت می‌شود.</Text> : null}
    </View>

    {product ? <View style={styles.sectionBody}>
      <Text style={styles.section}>بررسی و انتشار</Text>
      <Text style={styles.hint}>ارسال برای بررسی، تأیید یا انتشار خودکار نیست. انتشار فقط پس از تأیید انسانی ممکن است.</Text>
      {product.imageIds.length === 0 ? <Text style={styles.warning}>برای درخواست بررسی، تصویر واقعی محصول باید ابتدا ثبت شود.</Text> : null}
      <Pressable accessibilityRole="button" disabled={!allowed || !maySubmit}
        onPress={() => publication("submit")} style={[styles.saveButton, (!allowed || !maySubmit) && styles.disabled]}>
        <Text style={styles.saveText}>ارسال برای بررسی</Text>
      </Pressable>
      <Pressable accessibilityRole="button" disabled={!allowed || !mayPublish}
        onPress={() => publication("publish")} style={[styles.outlineButton, (!allowed || !mayPublish) && styles.disabled]}>
        <Text style={styles.outlineText}>انتشار محصول تأییدشده</Text>
      </Pressable>
    </View> : null}
  </ScrollView>;
}

const styles = StyleSheet.create({
  content: { paddingBottom: 40, backgroundColor: colors.background, direction: "rtl", gap: 10 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 15 },
  header: { padding: 16, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  heading: { alignItems: "flex-end", gap: 4 },
  back: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, backgroundColor: colors.background },
  backLabel: { color: colors.brand, fontSize: 12, fontWeight: "700" },
  title: { color: colors.brand, fontSize: 18, fontWeight: "800", textAlign: "right" },
  hint: { color: colors.muted, fontSize: 11, lineHeight: 19, textAlign: "right" },
  section: { color: colors.brand, fontSize: 13, fontWeight: "800", backgroundColor: "#faf7f2",
    borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border, paddingVertical: 10,
    paddingHorizontal: 16, textAlign: "right" },
  sectionBody: { paddingHorizontal: 16, paddingTop: 8, gap: 9 },
  label: { color: colors.muted, fontSize: 12, textAlign: "right" },
  input: { backgroundColor: colors.surface, minHeight: 46, borderRadius: 10, borderWidth: 1,
    borderColor: colors.border, paddingHorizontal: 13, paddingVertical: 10,
    fontSize: 13, color: colors.text },
  textArea: { minHeight: 90 },
  info: { marginHorizontal: 16, backgroundColor: colors.accentSoft, borderRadius: 11, padding: 12, gap: 5 },
  infoTitle: { color: colors.brand, fontSize: 12, fontWeight: "800", textAlign: "right" },
  separator: { height: 1, backgroundColor: colors.border, marginVertical: 8 },
  saveButton: { borderRadius: 11, backgroundColor: colors.accent, minHeight: 46,
    alignItems: "center", justifyContent: "center", padding: 12 },
  saveText: { fontSize: 12, fontWeight: "800", color: "#ffffff" },
  outlineButton: { borderRadius: 11, borderWidth: 1, borderColor: colors.accent,
    minHeight: 46, alignItems: "center", justifyContent: "center", padding: 12 },
  outlineText: { fontSize: 12, fontWeight: "800", color: colors.accent },
  minorButton: { paddingVertical: 7, paddingHorizontal: 12, borderRadius: 8, backgroundColor: colors.surface, alignSelf: "flex-start" },
  minorText: { color: colors.brand, fontSize: 11, fontWeight: "700" },
  errorBox: { marginHorizontal: 16, padding: 12, gap: 8, backgroundColor: colors.dangerSoft, borderRadius: 10 },
  error: { color: colors.danger, fontSize: 11, lineHeight: 19, textAlign: "right" },
  successBox: { marginHorizontal: 16, padding: 12, backgroundColor: colors.accentSoft, borderRadius: 10 },
  success: { color: colors.accent, fontSize: 11, lineHeight: 19, textAlign: "right" },
  warning: { color: "#92400e", fontSize: 11, lineHeight: 19, textAlign: "right" },
  disabled: { opacity: 0.5 }
});
