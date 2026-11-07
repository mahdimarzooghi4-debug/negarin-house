import { CustomerAccount } from "./CustomerAccount";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { ActivityIndicator, BackHandler, Image, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { apiJson, getApiBaseUrl } from "../api/client";
import { parseProductImageRead } from "../domain/product-media";
import { catalogPath, parseProductPage, readProduct, toman, type Product, type ProductPage, type Sort } from "./catalog";

// Metro resolves bundled fonts as native asset modules.
/* eslint-disable @typescript-eslint/no-require-imports */
const fonts = {
  Vazirmatn: require("../../assets/fonts/Vazirmatn-400.ttf"),
  VazirmatnBold: require("../../assets/fonts/Vazirmatn-700.ttf"),
  MaterialIconsRound: require("../../assets/fonts/MaterialIconsRound.ttf")
};
/* eslint-enable @typescript-eslint/no-require-imports */
const categories = ["میناکاری", "سفال", "گلیم", "چرم", "چوب", "پارچه", "زیور", "فلز"];
const sortLabels: Array<[Sort, string]> = [["newest", "جدیدترین"], ["price_asc", "ارزان‌ترین"], ["price_desc", "گران‌ترین"]];
const color = { navy: "#041b65", teal: "#07858f", border: "#c3dbdf", light: "#eaf5f6", muted: "#6d7892" };
function Icon({ code, active = false }: { code: number; active?: boolean }) { return <Text accessible={false} style={{ fontFamily: "MaterialIconsRound", fontSize: 25, color: active ? color.teal : color.navy }}>{String.fromCodePoint(code)}</Text>; }

function ProductImage({ product, hero = false }: { product: Product; hero?: boolean }) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    const controller = new AbortController(); let timer: ReturnType<typeof setTimeout> | undefined;
    setUrl(null);
    if (product.coverImageId) {
      void apiJson(`/api/v1/catalog/products/${product.id}/images/${product.coverImageId}`, null, { signal: controller.signal })
        .then(body => {
          const read = parseProductImageRead(body, product.coverImageId!, __DEV__);
          if (!read || controller.signal.aborted) return;
          setUrl(read.url);
          timer = setTimeout(() => setUrl(null), read.expiresInSeconds * 1000);
        }).catch(() => {});
    }
    return () => { controller.abort(); if (timer) clearTimeout(timer); };
  }, [product.id, product.coverImageId]);
  return <View style={hero ? styles.hero : styles.imageBox}>
    {url ? <Image source={{ uri: url }} accessibilityLabel={product.title} resizeMode={hero ? "cover" : "contain"} style={styles.image} onError={() => setUrl(null)} /> : <Text style={styles.imageFallback}>تصویر در دسترس نیست</Text>}
  </View>;
}

export function CustomerApp() {
  const [loaded, fontError] = useFonts(fonts);
  const [tab, setTab] = useState<"catalog" | "account">("catalog");
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    const handler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (tab === "account") { setTab("catalog"); return true; }
      if (!selected) return false;
      setSelected(null); return true;
    });
    return () => handler.remove();
  }, [selected, tab]);
  if (!loaded) return <SafeAreaView style={styles.safe}><View style={styles.center}>{fontError ? <Text>بارگذاری قلم انجام نشد؛ برنامه را دوباره باز کنید.</Text> : <ActivityIndicator color={color.teal} />}</View></SafeAreaView>;
  return <SafeAreaView style={styles.safe}>
    <StatusBar barStyle="dark-content" />
    {tab === "catalog" ? <View style={styles.header}>
      <Text style={styles.headerTitle}>{selected ? "جزئیات اثر" : "آثار"}</Text>
      {selected ? <Pressable accessibilityRole="button" accessibilityLabel="بازگشت به آثار" onPress={() => setSelected(null)} style={styles.back}><Icon code={0xe5c8} /></Pressable> : null}
    </View> : null}
    {!getApiBaseUrl() ? <View style={styles.center}><Text style={styles.title}>اتصال به نگارین</Text><Text style={styles.muted}>سرویس نگارین برای این نسخه تنظیم نشده است.</Text></View>
      : tab === "account" ? <CustomerAccount /> : selected ? <Detail key={selected} id={selected} /> : <Catalog onSelect={setSelected} />}
    {!selected ? <View accessibilityRole="tablist" style={styles.navigation}>
      {[ ["خانه", 0xe88a], ["جستجو", 0xe8b6], ["روایت‌ها", 0xea14], ["سبد", 0xe8cc], ["حساب", 0xe7fd] ].map(([label, code]) => <Pressable key={label} accessibilityRole="tab" disabled={label !== "جستجو" && label !== "حساب"} accessibilityState={{ disabled: label !== "جستجو" && label !== "حساب", selected: label === (tab === "account" ? "حساب" : "جستجو") }} onPress={() => { setSelected(null); setTab(label === "حساب" ? "account" : "catalog"); }} style={styles.navItem}>
        <Icon code={code as number} active={label === (tab === "account" ? "حساب" : "جستجو")} /><Text style={[styles.navText, label === (tab === "account" ? "حساب" : "جستجو") && styles.activeText]}>{label}</Text>
      </Pressable>)}
    </View> : null}
  </SafeAreaView>;
}

function Catalog({ onSelect }: { onSelect: (id: string) => void }) {
  const [draft, setDraft] = useState(""); const [q, setQ] = useState("");
  const [category, setCategory] = useState(""); const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState<Sort>("newest"); const [panel, setPanel] = useState<"filter" | "sort" | null>(null);
  const [page, setPage] = useState(1); const [retry, setRetry] = useState(0);
  const [data, setData] = useState<ProductPage | null>(null); const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController(); setLoading(true); setData(null); setError("");
    const path = catalogPath({ page, q, category, inStock, sort });
    void apiJson(path, null, { signal: controller.signal }).then(body => {
      const parsed = parseProductPage(body, page);
      if (!controller.signal.aborted) setData(parsed);
    }).catch(reason => { if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : "دریافت آثار انجام نشد."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [page, q, category, inStock, sort, retry]);
  return <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
    <View style={styles.intro}><Icon code={0xe660} active /><View style={styles.flex}><Text style={styles.title}>کشف آثار نگارین</Text><Text style={styles.muted}>آثار هنرمندان را بر اساس دسته، سلیقه و موجودی کشف کن.</Text></View></View>
    <View style={styles.row}><TextInput accessibilityLabel="جستجوی آثار" placeholder="نام اثر را جستجو کن" maxLength={200} value={draft} onChangeText={setDraft} onSubmitEditing={() => { setQ(draft); setPage(1); }} returnKeyType="search" style={styles.search} /><Pressable accessibilityRole="button" accessibilityLabel="جستجو" onPress={() => { setQ(draft); setPage(1); }} style={styles.searchButton}><Icon code={0xe8b6} active /></Pressable></View>
    <View style={styles.row}>
      <Pressable accessibilityRole="button" accessibilityState={{ expanded: panel === "filter" }} onPress={() => setPanel(panel === "filter" ? null : "filter")} style={styles.filterButton}><Icon code={0xe152} active /><Text style={styles.bold}>فیلتر</Text></Pressable>
      <Pressable accessibilityRole="button" accessibilityState={{ expanded: panel === "sort" }} onPress={() => setPanel(panel === "sort" ? null : "sort")} style={styles.filterButton}><Icon code={0xe164} active /><Text style={styles.bold}>مرتب‌سازی</Text></Pressable>
    </View>
    {panel === "filter" ? <View style={styles.panel}><View style={styles.row}><Text style={styles.text}>فقط آثار موجود</Text><Switch accessibilityLabel="فقط آثار موجود" value={inStock} onValueChange={value => { setInStock(value); setPage(1); }} /></View><Pressable accessibilityRole="button" onPress={() => { setCategory(""); setInStock(false); setQ(""); setDraft(""); setPage(1); }}><Text style={styles.activeText}>پاک کردن فیلترها</Text></Pressable></View> : null}
    {panel === "sort" ? <View style={styles.panel}>{sortLabels.map(([value, label]) => <Pressable key={value} accessibilityRole="radio" accessibilityState={{ checked: sort === value }} onPress={() => { setSort(value); setPage(1); setPanel(null); }}><Text style={[styles.text, sort === value && styles.activeText]}>{label}</Text></Pressable>)}</View> : null}
    <Text style={styles.title}>{category || "همه آثار"}</Text>
    {loading ? <ActivityIndicator accessibilityLabel="دریافت آثار" color={color.teal} /> : null}
    {error ? <View style={styles.panel}><Text accessibilityRole="alert" style={styles.error}>{error}</Text><Pressable accessibilityRole="button" onPress={() => setRetry(value => value + 1)}><Text style={styles.activeText}>تلاش دوباره</Text></Pressable></View> : null}
    {data?.items.map(product => <Pressable key={product.id} accessibilityRole="button" accessibilityLabel={`مشاهده ${product.title}`} onPress={() => onSelect(product.id)} style={styles.card}>
      <ProductImage product={product} /><View style={styles.cardText}><Text numberOfLines={2} style={styles.productTitle}>{product.title}</Text>{product.category ? <Text style={styles.muted}>{product.category}</Text> : null}<Text style={styles.price}>{toman(product.priceToman)}</Text><Text style={styles.muted}>{product.availability === "in_stock" ? "موجود" : "ناموجود"}</Text></View>
    </Pressable>)}
    {data && data.items.length === 0 ? <Text style={styles.muted}>اثری با این فیلترها پیدا نشد.</Text> : null}
    {data ? <View style={styles.row}><Pressable accessibilityRole="button" disabled={page === 1} onPress={() => setPage(value => value - 1)} style={styles.pageButton}><Text style={styles.text}>قبلی</Text></Pressable><Text style={styles.text}>{String(page).replace(/\d/g, digit => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]!)}</Text><Pressable accessibilityRole="button" disabled={!data.hasMore || page >= 1000} onPress={() => setPage(value => value + 1)} style={styles.pageButton}><Text style={styles.text}>بعدی</Text></Pressable></View> : null}
    <View style={styles.note}><Text style={styles.title}>کشف بر اساس دسته</Text><Text style={styles.muted}>برای دیدن آثار بیشتر، یک دسته هنری را انتخاب کن.</Text></View>
    <View style={styles.chips}>{categories.map(name => <Pressable key={name} accessibilityRole="button" accessibilityState={{ selected: category === name }} onPress={() => { setCategory(category === name ? "" : name); setPage(1); }} style={[styles.chip, category === name && styles.chipActive]}><Text style={styles.text}>{name}</Text></Pressable>)}</View>
  </ScrollView>;
}

function Detail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null); const [error, setError] = useState(""); const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController(); setProduct(null); setError("");
    void readProduct(id, controller.signal).then(result => { if (!controller.signal.aborted) setProduct(result); })
      .catch(reason => { if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : "دریافت اثر انجام نشد."); });
    return () => controller.abort();
  }, [id, retry]);
  if (error) return <View style={styles.center}><Text accessibilityRole="alert" style={styles.error}>{error}</Text><Pressable accessibilityRole="button" onPress={() => setRetry(value => value + 1)}><Text style={styles.activeText}>تلاش دوباره</Text></Pressable></View>;
  if (!product) return <View style={styles.center}><ActivityIndicator color={color.teal} /></View>;
  return <View style={styles.flex}><ScrollView contentContainerStyle={styles.content}>
    <ProductImage product={product} hero /><Text style={styles.detailTitle}>{product.title}</Text><Text style={styles.muted}>{product.category}</Text><Text style={styles.detailPrice}>{toman(product.priceToman)}</Text>
    {product.description ? <View style={styles.panel}><Text style={styles.title}>داستان این اثر</Text><Text style={styles.text}>{product.description}</Text></View> : null}
    {([ ["ابعاد", product.dimensions], ["جنس", product.materials], ["وزن", product.weight], ["رنگ", product.color], ["تکنیک", product.technique], ["روش نگهداری", product.careInstructions] ] as const).filter(([, value]) => value).map(([label, value]) => <View key={label} style={styles.panel}><Text style={styles.bold}>{label}</Text><Text style={styles.text}>{value}</Text></View>)}
    <View style={styles.shipping}><Text style={styles.text}>جزئیات ارسال و هزینه نهایی در مرحله خرید نمایش داده می‌شود.</Text><Text style={styles.muted}>ارسال خرده‌فروشی بر عهده خریدار است.</Text></View>
  </ScrollView><View style={styles.footer}><Text style={styles.muted}>خرید در این نسخه فعال نیست.</Text><Pressable accessibilityRole="button" disabled style={styles.disabledButton}><Text style={styles.white}>{product.availability === "out_of_stock" ? "ناموجود" : "افزودن به سبد"}</Text></Pressable></View></View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fcfcfc" }, flex: { flex: 1 },
  header: { height: 58, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" },
  headerTitle: { fontFamily: "VazirmatnBold", color: color.navy, fontSize: 20 }, back: { position: "absolute", right: 16, padding: 8 },
  content: { padding: 16, gap: 16, paddingBottom: 32 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24, gap: 16 },
  title: { fontFamily: "VazirmatnBold", fontSize: 18, color: color.navy, textAlign: "right", lineHeight: 30 },
  text: { fontFamily: "Vazirmatn", color: color.navy, fontSize: 13, textAlign: "right", lineHeight: 24 },
  bold: { fontFamily: "VazirmatnBold", color: color.navy, fontSize: 14, textAlign: "right" },
  muted: { fontFamily: "Vazirmatn", fontSize: 12, lineHeight: 22, color: color.muted, textAlign: "right" },
  intro: { flexDirection: "row-reverse", alignItems: "center", gap: 14, backgroundColor: color.light, borderColor: color.border, borderWidth: 1, borderRadius: 16, padding: 16, minHeight: 92 },
  row: { flexDirection: "row-reverse", alignItems: "center", gap: 12, justifyContent: "space-between" },
  search: { flex: 1, fontFamily: "Vazirmatn", textAlign: "right", color: color.navy, borderWidth: 1, borderColor: color.border, borderRadius: 14, padding: 12 },
  searchButton: { padding: 10 },
  filterButton: { flex: 1, minHeight: 44, borderWidth: 1, borderColor: color.border, backgroundColor: "#fff", borderRadius: 14, flexDirection: "row-reverse", justifyContent: "center", alignItems: "center", gap: 14 },
  panel: { borderWidth: 1, borderColor: "#e0e5ec", borderRadius: 18, padding: 16, backgroundColor: "#fff", gap: 12 },
  card: { borderWidth: 1, borderColor: "#dae5e8", backgroundColor: "#fff", borderRadius: 18, padding: 12, flexDirection: "row-reverse", gap: 14, minHeight: 154 },
  imageBox: { width: 114, height: 130, borderRadius: 14, overflow: "hidden", justifyContent: "center", backgroundColor: "#f4f6f8" },
  image: { width: "100%", height: "100%" }, imageFallback: { fontFamily: "Vazirmatn", fontSize: 11, color: color.muted, textAlign: "center", padding: 8 },
  cardText: { flex: 1, justifyContent: "space-between", gap: 8 }, productTitle: { fontFamily: "VazirmatnBold", color: color.navy, fontSize: 15, textAlign: "right", lineHeight: 25 },
  price: { fontFamily: "VazirmatnBold", color: color.teal, fontSize: 15, textAlign: "right" },
  pageButton: { borderWidth: 1, borderColor: color.border, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 20 },
  note: { backgroundColor: color.light, borderRadius: 16, padding: 20, gap: 10 },
  chips: { flexDirection: "row-reverse", flexWrap: "wrap", gap: 10 }, chip: { borderWidth: 1, borderColor: color.border, borderRadius: 19, paddingHorizontal: 18, paddingVertical: 8 }, chipActive: { backgroundColor: color.light },
  activeText: { fontFamily: "VazirmatnBold", color: color.teal, fontSize: 12, textAlign: "center" },
  navigation: { flexDirection: "row-reverse", minHeight: 84, paddingVertical: 12, backgroundColor: "#fff", borderTopWidth: 1, borderColor: "#dae5e8" },
  navItem: { flex: 1, alignItems: "center", justifyContent: "center", gap: 6, opacity: 0.8 }, navText: { fontFamily: "Vazirmatn", color: color.muted, fontSize: 11 },
  hero: { width: "100%", aspectRatio: 358 / 322, borderRadius: 20, overflow: "hidden", backgroundColor: "#f4f6f8", justifyContent: "center" },
  detailTitle: { fontFamily: "VazirmatnBold", fontSize: 21, color: color.navy, textAlign: "right", lineHeight: 36 },
  detailPrice: { fontFamily: "VazirmatnBold", fontSize: 19, color: color.teal, textAlign: "right" },
  shipping: { borderWidth: 1, borderColor: "#efd5b8", borderRadius: 18, backgroundColor: "#fff8ef", padding: 16, gap: 8 },
  footer: { borderTopWidth: 1, borderColor: "#e0e5ec", backgroundColor: "#fff", padding: 16, gap: 8 },
  disabledButton: { backgroundColor: color.navy, opacity: 0.5, borderRadius: 16, minHeight: 54, justifyContent: "center", alignItems: "center" },
  white: { fontFamily: "VazirmatnBold", color: "#fff", fontSize: 16 }, error: { fontFamily: "Vazirmatn", color: "#b91c1c", lineHeight: 24, textAlign: "right" }
});
