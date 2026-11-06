import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View
} from "react-native";
import { ApiError, apiJson } from "../api/client";
import {
  formatPersianDate, formatToman, nextPreparationStatus, parseArtistOrderDetail,
  type ArtistOrderDetail, type ArtistOrderStatus
} from "../domain/artist-data";

const colors = {
  background: "#fcfcfc", surface: "#ffffff", brand: "#041b65", accent: "#07858f",
  accentSoft: "#eaf7f7", border: "#e5e7eb", muted: "#6b7280", danger: "#b91c1c",
  dangerSoft: "#fee2e2"
};
const statusLabels: Record<ArtistOrderStatus, string> = {
  awaiting_acceptance: "نیاز به اقدام", accepted: "پذیرفته‌شده",
  preparing: "در حال آماده‌سازی", packaging: "بسته‌بندی", ready_for_dispatch: "آماده ارسال"
};
const nextLabels: Record<ArtistOrderStatus, string> = {
  awaiting_acceptance: "پذیرش سفارش",
  accepted: "شروع آماده‌سازی",
  preparing: "ثبت پایان آماده‌سازی و ورود به بسته‌بندی",
  packaging: "اعلام آمادگی برای ارسال",
  ready_for_dispatch: "ثبت اطلاعات ارسال"
};
const number = new Intl.NumberFormat("fa-IR");

type Props = { token: string; orderId: string; onBack: () => void };

export function OrderDetailScreen({ token, orderId, onBack }: Props) {
  const [detail, setDetail] = useState<ArtistOrderDetail | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [stale, setStale] = useState(false);
  const [busy, setBusy] = useState(false);
  const [retry, setRetry] = useState(0);
  const [carrierName, setCarrierName] = useState("");
  const [trackingCode, setTrackingCode] = useState("");

  const fetchFresh = useCallback(async (signal?: AbortSignal): Promise<ArtistOrderDetail> => {
    const value = await apiJson("/api/v1/artist/orders/" + orderId, token, { signal });
    const parsed = parseArtistOrderDetail(value);
    if (!parsed) throw new Error("پاسخ جزئیات سفارش معتبر نیست.");
    return parsed;
  }, [orderId, token]);

  useEffect(() => {
    const controller = new AbortController();
    setDetail(null);
    setError("");
    setMessage("");
    setStale(false);
    void fetchFresh(controller.signal).then((fresh) => {
      if (!controller.signal.aborted) setDetail(fresh);
    }).catch((reason: unknown) => {
      if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : "دریافت جزئیات سفارش انجام نشد.");
    });
    return () => controller.abort();
  }, [fetchFresh, retry]);

  async function refreshNow() {
    if (busy) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const fresh = await fetchFresh();
      setDetail(fresh);
      setStale(false);
      setMessage("وضعیت تازه سفارش از سرور دریافت شد.");
    } catch (reason) {
      setStale(true);
      setError(reason instanceof Error ? reason.message : "دریافت وضعیت تازه سفارش انجام نشد.");
    } finally {
      setBusy(false);
    }
  }

  async function sendCommand(path: string, body: Record<string, unknown>, successMessage: string) {
    if (!detail || busy || stale) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const value = await apiJson(path, token, { method: "POST", body: JSON.stringify(body) });
      const parsed = parseArtistOrderDetail(value);
      if (!parsed) throw new Error("پاسخ عملیات سفارش معتبر نیست؛ وضعیت تازه باید دریافت شود.");
      setDetail(parsed);
      setStale(false);
      setMessage(successMessage);
      if (parsed.shipment) {
        setCarrierName("");
        setTrackingCode("");
      }
    } catch (reason) {
      try {
        const fresh = await fetchFresh();
        setDetail(fresh);
        setStale(false);
        if (reason instanceof ApiError && reason.status === 409) {
          setError("وضعیت سفارش هم‌زمان تغییر کرده است؛ اطلاعات تازه دریافت شد. اقدام بعدی را بر اساس وضعیت جدید انجام دهید.");
        } else {
          setError("پاسخ عملیات دریافت نشد؛ وضعیت تازه از سرور جایگزین شد. پیش از تکرار، آن را بررسی کنید.");
        }
      } catch {
        setStale(true);
        setError("نتیجه عملیات مشخص نیست و دریافت وضعیت تازه از سرور ممکن نشد. تا بازیابی وضعیت، عملیات جدید غیرفعال است.");
      }
    } finally {
      setBusy(false);
    }
  }

  function advance() {
    if (!detail) return;
    const target = nextPreparationStatus(detail.status);
    if (!target) return;
    void sendCommand(
      "/api/v1/artist/orders/" + orderId + "/preparation",
      { version: detail.version, status: target },
      "وضعیت سفارش در سرور به‌روزرسانی شد."
    );
  }

  function reportShipment() {
    if (!detail || detail.status !== "ready_for_dispatch" || detail.shipment) return;
    if (!carrierName.trim() || !trackingCode.trim()) {
      setError("نام شرکت حمل و کد رهگیری را وارد کنید.");
      return;
    }
    void sendCommand(
      "/api/v1/artist/orders/" + orderId + "/shipment",
      { version: detail.version, carrierName: carrierName.trim(), trackingCode: trackingCode.trim() },
      "گزارش ارسال در سرور ثبت شد؛ این گزارش به معنی تأیید شرکت حمل یا تحویل سفارش نیست."
    );
  }

  if (!detail) {
    return <View style={styles.state}>
      {error ? <Text style={styles.errorText}>{error}</Text> : <ActivityIndicator color={colors.accent} />}
      <Pressable accessibilityRole="button" onPress={onBack} style={styles.secondaryButton}><Text style={styles.secondaryText}>بازگشت به سفارش‌ها</Text></Pressable>
      {error ? <Pressable accessibilityRole="button" onPress={() => setRetry((value) => value + 1)} style={styles.primaryButton}><Text style={styles.primaryText}>دریافت دوباره</Text></Pressable> : null}
    </View>;
  }

  const next = nextPreparationStatus(detail.status);
  return <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={styles.titleRow}>
      <Pressable accessibilityRole="button" onPress={onBack} style={styles.backButton}><Text style={styles.backText}>بازگشت</Text></Pressable>
      <Text style={styles.pageTitle}>جزئیات سفارش</Text>
    </View>
    <View style={styles.statusCard}>
      <Text style={styles.orderIdLabel}>شناسه سفارش</Text>
      <Text style={styles.orderId}>{detail.orderId}</Text>
      <View style={styles.statusPill}><Text style={styles.statusText}>{statusLabels[detail.status]}</Text></View>
      <Text style={styles.mutedText}>ثبت سفارش: {formatPersianDate(detail.createdAt)}</Text>
    </View>

    {message ? <View style={styles.successPanel}><Text style={styles.successText}>{message}</Text></View> : null}
    {error ? <View style={styles.errorPanel}><Text style={styles.errorText}>{error}</Text>
      <Pressable disabled={busy} onPress={() => void refreshNow()} style={styles.refreshButton}><Text style={styles.refreshText}>دریافت وضعیت تازه</Text></Pressable>
    </View> : null}
    {stale ? <Text style={styles.warningText}>به دلیل نامشخص بودن وضعیت سرور، فرمان‌های جدید تا دریافت اطلاعات معتبر غیرفعال هستند.</Text> : null}

    <Text style={styles.sectionTitle}>اقلام تخصیص‌یافته به شما</Text>
    {detail.items.map((item) => <View key={item.productId} style={styles.itemCard}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <View style={styles.itemFooter}>
        <Text style={styles.mutedText}>تعداد: {number.format(item.quantity)}</Text>
        <Text style={styles.amount}>{formatToman(item.unitPriceToman)} / هر عدد</Text>
      </View>
    </View>)}
    <View style={styles.totalCard}>
      <Text style={styles.totalLabel}>جمع سهم محصولات این سفارش</Text>
      <Text style={styles.totalAmount}>{formatToman(detail.merchandiseSubtotalToman)}</Text>
    </View>

    <Text style={styles.sectionTitle}>نشانی تحویل ثبت‌شده</Text>
    <View style={styles.card}>
      <Text style={styles.addressName}>{detail.shippingAddress.recipientName}</Text>
      <Text style={styles.addressText}>{detail.shippingAddress.recipientPhone}</Text>
      <Text style={styles.addressText}>{detail.shippingAddress.province}، {detail.shippingAddress.city}</Text>
      <Text style={styles.addressText}>کد پستی: {detail.shippingAddress.postalCode}</Text>
      <Text style={styles.addressText}>{detail.shippingAddress.fullAddress}</Text>
    </View>

    <Text style={styles.sectionTitle}>تاریخچه وضعیت</Text>
    {detail.history.length ? detail.history.map((entry) => <View key={entry.version} style={styles.historyRow}>
      <View style={styles.historyDot} />
      <View style={styles.historyTextWrap}>
        <Text style={styles.historyTitle}>از {statusLabels[entry.fromStatus]} به {statusLabels[entry.toStatus]}</Text>
        <Text style={styles.mutedText}>{formatPersianDate(entry.createdAt)} · نسخه {number.format(entry.version)}</Text>
      </View>
    </View>) : <Text style={styles.emptyText}>هنوز تغییری در وضعیت سفارش ثبت نشده است.</Text>}

    {next ? <View style={styles.actionCard}>
      <Text style={styles.sectionTitle}>اقدام بعدی</Text>
      <Text style={styles.mutedText}>تغییر وضعیت فقط به مرحله بعدی مجاز است و در سرور ثبت می‌شود.</Text>
      <Pressable accessibilityRole="button" disabled={busy || stale} onPress={advance} style={[styles.primaryButton, (busy || stale) && styles.disabledButton]}>
        {busy ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.primaryText}>{nextLabels[detail.status]}</Text>}
      </Pressable>
    </View> : null}

    {detail.status === "ready_for_dispatch" && !detail.shipment ? <View style={styles.actionCard}>
      <Text style={styles.sectionTitle}>ثبت گزارش ارسال</Text>
      <Text style={styles.mutedText}>اطلاعات شرکت حمل و کد رهگیری را مطابق رسید واقعی وارد کنید.</Text>
      <TextInput value={carrierName} onChangeText={setCarrierName} editable={!busy && !stale} maxLength={100}
        placeholder="نام شرکت حمل" placeholderTextColor={colors.muted} style={styles.input} textAlign="right" />
      <TextInput value={trackingCode} onChangeText={setTrackingCode} editable={!busy && !stale} maxLength={100}
        autoCapitalize="characters" placeholder="کد رهگیری" placeholderTextColor={colors.muted} style={styles.input} textAlign="right" />
      <Text style={styles.warningText}>ثبت این گزارش به معنی تأیید شرکت حمل، دریافت مرسوله یا تحویل به خریدار نیست.</Text>
      <Pressable accessibilityRole="button" disabled={busy || stale} onPress={reportShipment} style={[styles.primaryButton, (busy || stale) && styles.disabledButton]}>
        {busy ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.primaryText}>ثبت گزارش ارسال</Text>}
      </Pressable>
    </View> : null}

    {detail.shipment ? <View style={styles.shipmentCard}>
      <Text style={styles.sectionTitle}>گزارش ارسال ثبت‌شده</Text>
      <Text style={styles.addressText}>شرکت حمل: {detail.shipment.carrierName}</Text>
      <Text style={styles.addressText}>کد رهگیری: {detail.shipment.trackingCode}</Text>
      <Text style={styles.mutedText}>ثبت گزارش: {formatPersianDate(detail.shipment.reportedAt)}</Text>
      <Text style={styles.warningText}>گزارش ثبت‌شده توسط هنرمند است؛ شرکت حمل تأیید نشده و تحویل سفارش ثبت نشده است.</Text>
    </View> : null}
  </ScrollView>;
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 28, gap: 11, direction: "rtl" },
  state: { flex: 1, minHeight: 220, padding: 20, justifyContent: "center", alignItems: "center", gap: 14 },
  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  backButton: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: colors.border, borderRadius: 9 },
  backText: { color: colors.brand, fontSize: 11, fontWeight: "700" },
  pageTitle: { color: colors.brand, fontSize: 18, fontWeight: "800", textAlign: "right" },
  statusCard: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 14, padding: 14, gap: 7, alignItems: "flex-end" },
  orderIdLabel: { color: colors.muted, fontSize: 10 },
  orderId: { color: colors.brand, fontSize: 11, fontWeight: "700" },
  statusPill: { backgroundColor: colors.accentSoft, borderRadius: 16, paddingHorizontal: 11, paddingVertical: 6 },
  statusText: { color: colors.accent, fontSize: 11, fontWeight: "700" },
  sectionTitle: { color: colors.brand, fontSize: 14, fontWeight: "800", textAlign: "right" },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 13, padding: 14, gap: 6 },
  itemCard: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 12, padding: 13, gap: 9 },
  itemTitle: { color: colors.text, fontSize: 13, fontWeight: "700", textAlign: "right" },
  itemFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  amount: { color: colors.brand, fontSize: 11, fontWeight: "700", textAlign: "right" },
  mutedText: { color: colors.muted, fontSize: 11, lineHeight: 19, textAlign: "right" },
  totalCard: { backgroundColor: colors.accentSoft, borderRadius: 12, padding: 14, gap: 6, alignItems: "flex-end" },
  totalLabel: { color: colors.accent, fontSize: 11, fontWeight: "700" },
  totalAmount: { color: colors.brand, fontSize: 16, fontWeight: "800" },
  addressName: { color: colors.brand, fontSize: 13, fontWeight: "800", textAlign: "right" },
  addressText: { color: colors.text, fontSize: 11, lineHeight: 20, textAlign: "right" },
  historyRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 10, padding: 11 },
  historyDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent, marginTop: 5 },
  historyTextWrap: { flex: 1, gap: 3 },
  historyTitle: { color: colors.brand, fontSize: 12, fontWeight: "700", textAlign: "right" },
  actionCard: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 13, padding: 14, gap: 10 },
  input: { minHeight: 46, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 9, paddingHorizontal: 12, color: colors.text, fontSize: 12 },
  primaryButton: { minHeight: 44, backgroundColor: colors.brand, borderRadius: 10, alignItems: "center", justifyContent: "center", paddingHorizontal: 14, paddingVertical: 11 },
  primaryText: { color: "#ffffff", fontSize: 12, fontWeight: "800" },
  secondaryButton: { minHeight: 40, borderRadius: 10, borderColor: colors.border, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10 },
  secondaryText: { color: colors.brand, fontSize: 11, fontWeight: "700" },
  disabledButton: { opacity: 0.5 },
  errorPanel: { backgroundColor: colors.dangerSoft, borderColor: "#fecaca", borderWidth: 1, borderRadius: 11, padding: 12, gap: 8 },
  errorText: { color: colors.danger, fontSize: 11, lineHeight: 19, textAlign: "right" },
  refreshButton: { alignSelf: "flex-start", backgroundColor: colors.brand, borderRadius: 8, paddingHorizontal: 11, paddingVertical: 8 },
  refreshText: { color: "#ffffff", fontSize: 10, fontWeight: "700" },
  successPanel: { backgroundColor: colors.accentSoft, borderRadius: 10, padding: 11 },
  successText: { color: colors.accent, fontSize: 11, lineHeight: 18, textAlign: "right" },
  warningText: { color: "#92400e", fontSize: 10, lineHeight: 18, textAlign: "right" },
  emptyText: { color: colors.muted, fontSize: 11, textAlign: "center", padding: 12 }
});
