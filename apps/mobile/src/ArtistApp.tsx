import { useEffect, useState } from "react";
import {
  ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View
} from "react-native";
import { apiJson } from "./api/client";
import {
  formatPersianDate, formatToman, parseArtistOrders, parseArtistProducts,
  type ArtistOrder, type ArtistOrdersPage, type ArtistProduct
} from "./domain/artist-data";
import type { IdentityContext } from "./auth/identity";
import { OrderDetailScreen } from "./screens/OrderDetailScreen";

type Tab = "home" | "products" | "orders";
type Props = { token: string; context: IdentityContext; onLogout: () => void };

const colors = {
  background: "#fcfcfc", surface: "#ffffff", brand: "#041b65", accent: "#07858f",
  accentSoft: "#eaf7f7", border: "#e5e7eb", text: "#111827", muted: "#6b7280",
  danger: "#b91c1c", dangerSoft: "#fee2e2"
};
const productStatus: Record<ArtistProduct["publicationStatus"], string> = {
  draft: "پیش‌نویس", under_review: "در حال بررسی", changes_requested: "نیاز به اصلاح",
  approved: "تأییدشده", published: "منتشرشده"
};
const orderStatus: Record<ArtistOrder["status"], string> = {
  awaiting_acceptance: "نیاز به اقدام", accepted: "پذیرفته‌شده", preparing: "در حال آماده‌سازی",
  packaging: "بسته‌بندی", ready_for_dispatch: "آماده ارسال"
};
const number = new Intl.NumberFormat("fa-IR");

function ErrorPanel({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <View style={styles.errorPanel}>
    <Text style={styles.errorText}>{message}</Text>
    <Pressable accessibilityRole="button" onPress={onRetry} style={styles.retryButton}>
      <Text style={styles.retryText}>تلاش دوباره</Text>
    </Pressable>
  </View>;
}

function LoadingPanel() {
  return <View style={styles.statePanel}>
    <ActivityIndicator color={colors.accent} />
    <Text style={styles.mutedText}>در حال دریافت اطلاعات از نگارین…</Text>
  </View>;
}

function ProductCard({ product }: { product: ArtistProduct }) {
  return <View style={styles.card}>
    <View style={styles.cardHeading}>
      <Text style={styles.cardTitle} numberOfLines={2}>{product.title}</Text>
      <Text style={styles.status}>{productStatus[product.publicationStatus]}</Text>
    </View>
    {product.category ? <Text style={styles.mutedText}>{product.category}</Text> : null}
    <View style={styles.cardFooter}>
      <Text style={styles.amount}>{formatToman(product.priceToman)}</Text>
      <Text style={styles.mutedText}>موجودی: {number.format(product.stockQuantity)}</Text>
    </View>
  </View>;
}

function OrderCard({ order, onSelect }: { order: ArtistOrder; onSelect: (orderId: string) => void }) {
  const title = order.items.length === 1 ? order.items[0]!.title
    : order.items.length > 1 ? "سفارش چندمحصولی" : "سفارش";
  const quantity = order.items.reduce((total, item) => total + item.quantity, 0);
  return <Pressable accessibilityRole="button" onPress={() => onSelect(order.orderId)} style={styles.card}>
    <View style={styles.cardHeading}>
      <Text style={styles.cardTitle} numberOfLines={2}>{title}</Text>
      <Text style={styles.status}>{orderStatus[order.status]}</Text>
    </View>
    <Text style={styles.mutedText}>{formatPersianDate(order.createdAt)} · {number.format(quantity)} عدد</Text>
    <View style={styles.cardFooter}>
      <Text style={styles.amount}>{formatToman(order.merchandiseSubtotalToman)}</Text>
      <Text style={styles.mutedText}>{number.format(order.items.length)} قلم کالا</Text>
    </View>
    <Text style={styles.detailAction}>مشاهده جزئیات سفارش ←</Text>
  </Pressable>;
}

function HomeScreen({ token, onNavigate, onSelectOrder }: { token: string; onNavigate: (tab: Tab) => void; onSelectOrder: (orderId: string) => void }) {
  const [data, setData] = useState<{ products: ArtistProduct[]; orders: ArtistOrdersPage } | null>(null);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setData(null);
    setError("");
    void Promise.all([
      apiJson("/api/v1/artist/products", token, { signal: controller.signal }),
      apiJson("/api/v1/artist/orders?page=1&pageSize=20", token, { signal: controller.signal })
    ]).then(([productValue, orderValue]) => {
      const products = parseArtistProducts(productValue);
      const orders = parseArtistOrders(orderValue);
      if (!products || !orders) throw new Error("پاسخ اطلاعات هنرمند معتبر نیست؛ داده نمایشی جایگزین نمی‌شود.");
      if (!controller.signal.aborted) setData({ products, orders });
    }).catch((reason: unknown) => {
      if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : "دریافت اطلاعات انجام نشد.");
    });
    return () => controller.abort();
  }, [token, retry]);

  if (error) return <ErrorPanel message={error} onRetry={() => setRetry((value) => value + 1)} />;
  if (!data) return <LoadingPanel />;

  const latestOrders = data.orders.items.slice(0, 3);
  const latestProducts = data.products.slice(0, 3);
  return <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={styles.welcome}>
      <Text style={styles.welcomeTitle}>داشبورد هنرمند</Text>
      <Text style={styles.welcomeText}>وضعیت محصولات و سفارش‌های حساب هنرمند شما</Text>
    </View>
    <View style={styles.metrics}>
      <Pressable style={styles.metricCard} onPress={() => onNavigate("products")} accessibilityRole="button">
        <Text style={styles.metricValue}>{number.format(data.products.length)}</Text>
        <Text style={styles.metricLabel}>محصول ثبت‌شده</Text>
      </Pressable>
      <Pressable style={styles.metricCard} onPress={() => onNavigate("orders")} accessibilityRole="button">
        <Text style={styles.metricValue}>{number.format(data.orders.items.length)}</Text>
        <Text style={styles.metricLabel}>سفارش در صفحه اول</Text>
      </Pressable>
    </View>
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>محصولات من</Text>
      <Pressable onPress={() => onNavigate("products")}><Text style={styles.linkText}>مشاهده همه</Text></Pressable>
    </View>
    {latestProducts.length ? latestProducts.map((product) => <ProductCard key={product.id} product={product} />)
      : <Text style={styles.emptyText}>هنوز محصولی در حساب هنرمند ثبت نشده است.</Text>}
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>سفارش‌های اخیر</Text>
      <Pressable onPress={() => onNavigate("orders")}><Text style={styles.linkText}>مشاهده همه</Text></Pressable>
    </View>
    {latestOrders.length ? latestOrders.map((order) => <OrderCard key={order.orderId} order={order} onSelect={onSelectOrder} />)
      : <Text style={styles.emptyText}>در صفحه دریافت‌شده، سفارشی وجود ندارد.</Text>}
    {data.orders.hasMore ? <Text style={styles.noteText}>سفارش‌های بیشتری در صفحات بعدی قرار دارند.</Text> : null}
  </ScrollView>;
}

function ProductsScreen({ token }: { token: string }) {
  const [products, setProducts] = useState<ArtistProduct[] | null>(null);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setProducts(null);
    setError("");
    void apiJson("/api/v1/artist/products", token, { signal: controller.signal })
      .then((value) => {
        const parsed = parseArtistProducts(value);
        if (!parsed) throw new Error("پاسخ فهرست محصولات معتبر نیست.");
        if (!controller.signal.aborted) setProducts(parsed);
      }).catch((reason: unknown) => {
        if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : "دریافت محصولات انجام نشد.");
      });
    return () => controller.abort();
  }, [token, retry]);

  if (error) return <ErrorPanel message={error} onRetry={() => setRetry((value) => value + 1)} />;
  if (!products) return <LoadingPanel />;
  return <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <Text style={styles.pageTitle}>محصولات من</Text>
    <Text style={styles.pageSubtitle}>{number.format(products.length)} محصول از حساب هنرمند دریافت شد</Text>
    {products.length ? products.map((product) => <ProductCard key={product.id} product={product} />)
      : <Text style={styles.emptyText}>هنوز محصولی ثبت نشده است.</Text>}
  </ScrollView>;
}

function OrdersScreen({ token, onSelectOrder }: { token: string; onSelectOrder: (orderId: string) => void }) {
  const [page, setPage] = useState<ArtistOrdersPage | null>(null);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setPage(null);
    setError("");
    void apiJson("/api/v1/artist/orders?page=1&pageSize=20", token, { signal: controller.signal })
      .then((value) => {
        const parsed = parseArtistOrders(value);
        if (!parsed) throw new Error("پاسخ فهرست سفارش‌ها معتبر نیست.");
        if (!controller.signal.aborted) setPage(parsed);
      }).catch((reason: unknown) => {
        if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : "دریافت سفارش‌ها انجام نشد.");
      });
    return () => controller.abort();
  }, [token, retry]);

  async function loadMore() {
    if (!page || !page.hasMore || loadingMore) return;
    setLoadingMore(true);
    setError("");
    try {
      const value = await apiJson("/api/v1/artist/orders?page=" + (page.page + 1) + "&pageSize=20", token);
      const next = parseArtistOrders(value);
      if (!next || next.page !== page.page + 1) throw new Error("پاسخ صفحه بعد سفارش‌ها معتبر نیست.");
      setPage({ ...next, items: [...page.items, ...next.items] });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "دریافت صفحه بعد انجام نشد.");
    } finally {
      setLoadingMore(false);
    }
  }

  if (!page && !error) return <LoadingPanel />;
  return <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <Text style={styles.pageTitle}>سفارش‌ها</Text>
    <Text style={styles.pageSubtitle}>سفارش‌های پرداخت‌شده تخصیص‌یافته به حساب هنرمند</Text>
    {error ? <ErrorPanel message={error} onRetry={() => setRetry((value) => value + 1)} /> : null}
    {page?.items.length ? page.items.map((order) => <OrderCard key={order.orderId} order={order} onSelect={onSelectOrder} />)
      : page ? <Text style={styles.emptyText}>سفارشی در این فهرست وجود ندارد.</Text> : null}
    {page?.hasMore ? <Pressable disabled={loadingMore} style={styles.moreButton} onPress={() => void loadMore()}>
      <Text style={styles.moreButtonText}>{loadingMore ? "در حال دریافت…" : "نمایش سفارش‌های بیشتر"}</Text>
    </Pressable> : null}
  </ScrollView>;
}

export function ArtistApp({ token, context, onLogout }: Props) {
  const [tab, setTab] = useState<Tab>("home");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  return <View style={styles.app}>
    <View style={styles.header}>
      <View>
        <Text style={styles.brand}>نگارین</Text>
        <Text style={styles.headerSubtitle}>پنل هنرمند</Text>
      </View>
      <Pressable accessibilityRole="button" onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>خروج</Text>
      </Pressable>
    </View>
    <View style={styles.body}>
      {context.activeRole !== "artist" ? <View style={styles.statePanel}><Text style={styles.errorText}>نقش فعال نشست دیگر هنرمند نیست؛ برای ادامه دوباره دسترسی را بررسی کنید.</Text></View>
        : selectedOrderId ? <OrderDetailScreen token={token} orderId={selectedOrderId} onBack={() => setSelectedOrderId(null)} />
          : tab === "home" ? <HomeScreen token={token} onNavigate={setTab} onSelectOrder={setSelectedOrderId} />
            : tab === "products" ? <ProductsScreen token={token} />
              : <OrdersScreen token={token} onSelectOrder={setSelectedOrderId} />}
    </View>
    <View style={styles.tabBar}>
      {([
        { id: "home" as const, label: "خانه", symbol: "⌂" },
        { id: "products" as const, label: "محصولات", symbol: "▦" },
        { id: "orders" as const, label: "سفارش‌ها", symbol: "▣" }
      ]).map((item) => <Pressable key={item.id} accessibilityRole="tab" accessibilityState={{ selected: tab === item.id }}
        onPress={() => { setSelectedOrderId(null); setTab(item.id); }} style={styles.tab}>
        <Text style={[styles.tabSymbol, tab === item.id && styles.tabSelected]}>{item.symbol}</Text>
        <Text style={[styles.tabLabel, tab === item.id && styles.tabSelected]}>{item.label}</Text>
      </Pressable>)}
    </View>
  </View>;
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.background, direction: "rtl" },
  header: { minHeight: 68, paddingHorizontal: 18, paddingVertical: 10, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brand: { color: colors.brand, fontSize: 20, fontWeight: "800", textAlign: "right" },
  headerSubtitle: { color: colors.muted, fontSize: 11, textAlign: "right", marginTop: 2 },
  logoutButton: { paddingHorizontal: 13, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: colors.border },
  logoutText: { color: colors.brand, fontSize: 12, fontWeight: "700" },
  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24, gap: 12 },
  welcome: { backgroundColor: colors.brand, padding: 18, borderRadius: 16, gap: 6 },
  welcomeTitle: { color: "#ffffff", fontSize: 18, fontWeight: "800", textAlign: "right" },
  welcomeText: { color: "#dbe8f5", fontSize: 12, lineHeight: 21, textAlign: "right" },
  metrics: { flexDirection: "row", gap: 10 },
  metricCard: { flex: 1, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 14, padding: 14, gap: 4 },
  metricValue: { color: colors.brand, fontSize: 20, fontWeight: "800", textAlign: "right" },
  metricLabel: { color: colors.muted, fontSize: 11, textAlign: "right" },
  sectionHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 },
  sectionTitle: { color: colors.brand, fontSize: 15, fontWeight: "800", textAlign: "right" },
  linkText: { color: colors.accent, fontSize: 12, fontWeight: "700" },
  pageTitle: { color: colors.brand, fontSize: 19, fontWeight: "800", textAlign: "right" },
  pageSubtitle: { color: colors.muted, fontSize: 12, textAlign: "right", marginBottom: 2 },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 14, padding: 14, gap: 8 },
  detailAction: { color: colors.accent, fontSize: 11, fontWeight: "700", textAlign: "right" },
  cardHeading: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 8 },
  cardTitle: { flex: 1, color: colors.brand, fontSize: 14, fontWeight: "700", textAlign: "right" },
  status: { backgroundColor: colors.accentSoft, color: colors.accent, borderRadius: 18, paddingHorizontal: 9, paddingVertical: 5, fontSize: 10, overflow: "hidden", textAlign: "center" },
  cardFooter: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 9, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  amount: { color: colors.brand, fontSize: 13, fontWeight: "800", textAlign: "right" },
  mutedText: { color: colors.muted, fontSize: 11, textAlign: "right" },
  emptyText: { color: colors.muted, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 12, padding: 18, textAlign: "center", fontSize: 12 },
  noteText: { color: colors.muted, fontSize: 10, textAlign: "right" },
  errorPanel: { backgroundColor: colors.dangerSoft, borderColor: "#fecaca", borderWidth: 1, borderRadius: 12, padding: 14, gap: 10 },
  errorText: { color: colors.danger, fontSize: 12, textAlign: "right", lineHeight: 20 },
  retryButton: { alignSelf: "flex-start", backgroundColor: colors.brand, borderRadius: 9, paddingHorizontal: 13, paddingVertical: 8 },
  retryText: { color: "#ffffff", fontSize: 11, fontWeight: "700" },
  statePanel: { flex: 1, minHeight: 180, alignItems: "center", justifyContent: "center", gap: 12 },
  moreButton: { backgroundColor: colors.brand, padding: 12, borderRadius: 10, alignItems: "center" },
  moreButtonText: { color: "#ffffff", fontSize: 12, fontWeight: "700" },
  tabBar: { minHeight: 62, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border, flexDirection: "row", justifyContent: "space-around", paddingTop: 8, paddingBottom: 5 },
  tab: { flex: 1, alignItems: "center", justifyContent: "center", gap: 2 },
  tabSymbol: { color: colors.muted, fontSize: 21, lineHeight: 24 },
  tabLabel: { color: colors.muted, fontSize: 10 },
  tabSelected: { color: colors.accent, fontWeight: "800" }
});
