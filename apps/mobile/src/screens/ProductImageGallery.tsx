import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { apiJson } from "../api/client";
import type { ArtistProduct } from "../domain/artist-data";
import {
  maxProductGalleryImages, parseProductImageRead, parseProductImageUploadResult,
  productImageGalleryCommand, productImageUploadCommand
} from "../domain/product-media";

declare const __DEV__: boolean;

const colors = {
  surface: "#ffffff", brand: "#041b65", accent: "#07858f",
  accentSoft: "#eaf7f7", border: "#e5e7eb", muted: "#6b7280",
  danger: "#b91c1c", dangerSoft: "#fee2e2"
};
type Props = {
  product: ArtistProduct | null;
  token: string;
  disabled: boolean;
  onProductChange: (product: ArtistProduct) => void;
  onBusyChange: (busy: boolean) => void;
  onStale: (message: string) => void;
};
const number = new Intl.NumberFormat("fa-IR");

export function ProductImageGallery({ product, token, disabled, onProductChange, onBusyChange, onStale }: Props) {
  const [busy, setBusy] = useState(false);
  const [picking, setPicking] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [imageReadError, setImageReadError] = useState(false);
  const [imageRetry, setImageRetry] = useState(0);
  const operationLock = useRef(false);
  const pickerLock = useRef(false);
  const pendingResultChecked = useRef(false);

  const readProduct = useCallback(async (productId: string): Promise<ArtistProduct> => {
    const value = await apiJson("/api/v1/artist/products/" + productId, token);
    const fresh = value && typeof value === "object" && !Array.isArray(value)
      ? value as Record<string, unknown> : null;
    const parsed = fresh ? (await import("../domain/artist-data")).parseArtistProduct(fresh) : null;
    if (!parsed || parsed.id.toLowerCase() !== productId.toLowerCase()) {
      throw new Error("وضعیت محصول از سرور معتبر دریافت نشد.");
    }
    return parsed;
  }, [token]);

  useEffect(() => {
    if (!product || product.imageIds.length === 0) {
      setImageUrls({});
      setImageReadError(false);
      return;
    }
    const controller = new AbortController();
    setImageUrls({});
    setImageReadError(false);
    void Promise.all(product.imageIds.map(async imageId => {
      try {
        const value = await apiJson(
          "/api/v1/artist/products/" + product.id + "/images/" + imageId,
          token, { signal: controller.signal }
        );
        const parsed = parseProductImageRead(value, imageId, __DEV__);
        return parsed ? { id: imageId, url: parsed.url } : null;
      } catch {
        return null;
      }
    })).then(results => {
      if (controller.signal.aborted) return;
      setImageUrls(Object.fromEntries(results.filter((item): item is { id: string; url: string } => item !== null)
        .map(item => [item.id, item.url])));
      setImageReadError(results.some(item => item === null));
    });
    return () => controller.abort();
  }, [product, token, imageRetry]);

  const uploadAsset = useCallback(async (asset: ImagePicker.ImagePickerAsset, currentProduct: ArtistProduct) => {
    if (operationLock.current) return;
    const command = productImageUploadCommand(currentProduct, { type: asset.type, base64: asset.base64 });
    if (!command) {
      setError("تصویر معتبر نیست یا محدودیت ۵ مگابایت، ۸ تصویر یا وضعیت ویرایش محصول رعایت نشده است.");
      return;
    }
    operationLock.current = true;
    setBusy(true);
    onBusyChange(true);
    setError("");
    setMessage("");
    try {
      const value = await apiJson(
        "/api/v1/artist/products/" + currentProduct.id + "/images",
        token, { method: "POST", body: JSON.stringify(command) }
      );
      const acknowledgement = parseProductImageUploadResult(value, currentProduct);
      if (!acknowledgement) throw new Error("پاسخ ثبت تصویر با نسخه و گالری محصول تطابق ندارد.");
      const fresh = await readProduct(currentProduct.id);
      if (!fresh.imageIds.some(id => id.toLowerCase() === acknowledgement.id.toLowerCase())) {
        throw new Error("تصویر در وضعیت تازه سرور دیده نشد.");
      }
      onProductChange(fresh);
      setMessage("تصویر واقعی در گالری خصوصی محصول ثبت شد.");
    } catch (reason) {
      try {
        const fresh = await readProduct(currentProduct.id);
        onProductChange(fresh);
        const added = fresh.imageIds.filter(id => !currentProduct.imageIds.some(old => old.toLowerCase() === id.toLowerCase()));
        setError(added.length
          ? "نتیجه درخواست قطعی نبود، اما تصویر جدید در گالری سرور دیده می‌شود؛ آن را بررسی کنید و دوباره بارگذاری نکنید."
          : reason instanceof Error ? reason.message : "بارگذاری تصویر انجام نشد.");
      } catch {
        onStale("نتیجه بارگذاری تصویر نامشخص است و وضعیت تازه از سرور دریافت نشد. تا بازیابی وضعیت، عملیات محصول غیرفعال است.");
      }
    } finally {
      setBusy(false);
      onBusyChange(false);
      operationLock.current = false;
    }
  }, [onBusyChange, onProductChange, onStale, readProduct, token]);

  useEffect(() => {
    if (!product || pendingResultChecked.current) return;
    pendingResultChecked.current = true;
    void ImagePicker.getPendingResultAsync().then(pending => {
      if (!pending) return;
      if ("code" in pending) {
        setError("بازیابی انتخاب تصویر از Android انجام نشد: " + pending.message);
        return;
      }
      if (!pending.canceled && pending.assets?.[0]) {
        void uploadAsset(pending.assets[0], product);
      }
    }).catch(() => setError("بازیابی نتیجه انتخاب تصویر از Android ممکن نشد."));
  }, [product, uploadAsset]);

  async function chooseImage() {
    if (!product || disabled || busy || picking || pickerLock.current ||
      product.imageIds.length >= maxProductGalleryImages) return;
    pickerLock.current = true;
    setPicking(true);
    onBusyChange(true);
    setError("");
    setMessage("");
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        allowsMultipleSelection: false,
        base64: true,
        exif: false,
        quality: 0.9
      });
      if (!result.canceled && result.assets[0]) await uploadAsset(result.assets[0], product);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "انتخاب تصویر انجام نشد.");
    } finally {
      pickerLock.current = false;
      setPicking(false);
      onBusyChange(false);
    }
  }

  async function removeImage(imageId: string) {
    if (!product || disabled || busy || operationLock.current) return;
    const command = productImageGalleryCommand(product, product.imageIds.filter(id => id !== imageId));
    if (!command) {
      setError("برداشتن این تصویر از گالری با وضعیت فعلی محصول مجاز نیست.");
      return;
    }
    operationLock.current = true;
    setBusy(true);
    onBusyChange(true);
    setError("");
    setMessage("");
    try {
      await apiJson("/api/v1/artist/products/" + product.id + "/images", token, {
        method: "PATCH", body: JSON.stringify(command)
      });
      const fresh = await readProduct(product.id);
      onProductChange(fresh);
      setMessage("تصویر از گالری فعال برداشته شد؛ سابقه و فایل تصویر حذف نشده است.");
    } catch (reason) {
      try {
        onProductChange(await readProduct(product.id));
        setError(reason instanceof Error ? reason.message : "تغییر گالری انجام نشد؛ وضعیت تازه دریافت شد.");
      } catch {
        onStale("نتیجه تغییر گالری نامشخص است و وضعیت تازه از سرور دریافت نشد. تا بازیابی وضعیت، عملیات محصول غیرفعال است.");
      }
    } finally {
      setBusy(false);
      onBusyChange(false);
      operationLock.current = false;
    }
  }

  const canEditGallery = !!product && !disabled && !product.archivedAt &&
    ["draft", "changes_requested", "approved"].includes(product.publicationStatus);
  const canAdd = canEditGallery && product.imageIds.length < maxProductGalleryImages;

  return <View style={styles.container}>
    <View style={styles.heading}>
      <Text style={styles.count}>{number.format(product?.imageIds.length ?? 0)} از {number.format(maxProductGalleryImages)} تصویر</Text>
      {canAdd ? <Pressable accessibilityRole="button" disabled={busy || picking} onPress={() => void chooseImage()} style={styles.addButton}>
        {picking || busy ? <ActivityIndicator size="small" color={colors.accent} /> : <Text style={styles.addText}>＋ افزودن تصویر</Text>}
      </Pressable> : null}
    </View>
    {!product ? <View style={styles.empty}>
      <Text style={styles.hint}>ابتدا پیش‌نویس محصول را ذخیره کنید تا بتوانید تصویر واقعی آن را بارگذاری کنید.</Text>
    </View> : <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gallery}>
      {product.imageIds.map((imageId, index) => <View key={imageId} style={styles.imageCard}>
        {imageUrls[imageId] ? <Image accessibilityLabel={"تصویر محصول " + number.format(index + 1)}
          source={{ uri: imageUrls[imageId] }} resizeMode="cover" style={styles.image} onError={() => setImageReadError(true)} />
          : <View style={styles.imagePlaceholder}><Text style={styles.hint}>تصویر در دسترس نیست</Text></View>}
        <Text style={styles.imageLabel}>{index === 0 ? "تصویر اصلی" : "تصویر " + number.format(index + 1)}</Text>
        {canEditGallery ? <Pressable accessibilityRole="button" disabled={busy || picking}
          onPress={() => void removeImage(imageId)} style={styles.removeButton}>
          <Text style={styles.removeText}>برداشتن از گالری</Text>
        </Pressable> : null}
      </View>)}
      {canAdd ? <Pressable accessibilityRole="button" disabled={busy || picking}
        onPress={() => void chooseImage()} style={styles.addTile}>
        <Text style={styles.plus}>＋</Text>
        <Text style={styles.addTileText}>افزودن تصویر</Text>
      </Pressable> : null}
      {product.imageIds.length === 0 ? <View style={styles.empty}>
        <Text style={styles.hint}>هنوز تصویری برای این محصول ثبت نشده است.</Text>
      </View> : null}
    </ScrollView>}
    {imageReadError && product?.imageIds.length ? <Pressable accessibilityRole="button" disabled={busy}
      onPress={() => setImageRetry(value => value + 1)} style={styles.refreshButton}>
      <Text style={styles.refreshText}>تازه‌سازی پیش‌نمایش تصاویر</Text>
    </Pressable> : null}
    {product && canEditGallery ? <Text style={styles.hint}>حداکثر ۸ تصویر؛ برداشتن تصویر فقط گالری فعال را تغییر می‌دهد و فایل و سابقه را حذف نمی‌کند.</Text> : null}
    {product?.publicationStatus === "approved" ? <Text style={styles.hint}>ویرایش گالری محصول تأییدشده، طبق قرارداد سرور وضعیت آن را به پیش‌نویس بازمی‌گرداند.</Text> : null}
    {error ? <View style={styles.errorBox}><Text style={styles.error}>{error}</Text></View> : null}
    {message ? <View style={styles.successBox}><Text style={styles.success}>{message}</Text></View> : null}
  </View>;
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 16, gap: 9 },
  heading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  count: { color: colors.muted, fontSize: 11, textAlign: "right" },
  gallery: { gap: 9, flexDirection: "row", alignItems: "flex-start" },
  imageCard: { width: 124, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 6, gap: 6, backgroundColor: colors.surface },
  image: { width: 110, height: 94, borderRadius: 7, backgroundColor: "#f3f4f6" },
  imagePlaceholder: { width: 110, height: 94, borderRadius: 7, backgroundColor: "#f3f4f6", alignItems: "center", justifyContent: "center", padding: 5 },
  imageLabel: { color: colors.brand, fontSize: 10, fontWeight: "700", textAlign: "right" },
  removeButton: { paddingVertical: 6, borderRadius: 7, backgroundColor: colors.dangerSoft, alignItems: "center" },
  removeText: { color: colors.danger, fontSize: 9, fontWeight: "700" },
  addTile: { width: 110, height: 110, borderWidth: 1, borderStyle: "dashed", borderColor: "#bce7e8",
    borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: "#f7fcfc", gap: 4 },
  plus: { color: colors.accent, fontSize: 28 },
  addTileText: { color: colors.accent, fontSize: 10, fontWeight: "700" },
  addButton: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 8, backgroundColor: colors.accentSoft },
  addText: { color: colors.accent, fontSize: 11, fontWeight: "800" },
  empty: { minHeight: 86, borderWidth: 1, borderStyle: "dashed", borderColor: colors.border,
    borderRadius: 10, backgroundColor: colors.surface, justifyContent: "center", padding: 14 },
  hint: { color: colors.muted, fontSize: 10, lineHeight: 17, textAlign: "right" },
  refreshButton: { alignSelf: "flex-start", paddingVertical: 6, paddingHorizontal: 9, borderRadius: 7, backgroundColor: colors.accentSoft },
  refreshText: { color: colors.accent, fontSize: 10, fontWeight: "700" },
  errorBox: { backgroundColor: colors.dangerSoft, padding: 9, borderRadius: 8 },
  error: { color: colors.danger, fontSize: 10, lineHeight: 17, textAlign: "right" },
  successBox: { backgroundColor: colors.accentSoft, padding: 9, borderRadius: 8 },
  success: { color: colors.accent, fontSize: 10, lineHeight: 17, textAlign: "right" }
});
