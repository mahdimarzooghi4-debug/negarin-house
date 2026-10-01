import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator, Image, Pressable, RefreshControl, SafeAreaView, ScrollView,
  StyleSheet, Text, TextInput, View
} from 'react-native';
import {
  fetchCustomerCatalog, formatToman, getCustomerApiBaseUrl, searchCustomerCatalog,
  type CustomerCatalogItem
} from './src/customer-catalog';

const apiBaseUrl = getCustomerApiBaseUrl(process.env.EXPO_PUBLIC_API_URL);

export default function App() {
  const [items, setItems] = useState<CustomerCatalogItem[]>([]);
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<CustomerCatalogItem | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading');
  const [refreshing, setRefreshing] = useState(false);
  const catalogScrollRef = useRef<ScrollView>(null);

  const loadCatalog = useCallback(async () => {
    setStatus('loading');
    try {
      setItems(await fetchCustomerCatalog(apiBaseUrl));
      setStatus('ready');
    } catch {
      setStatus('unavailable');
    }
  }, []);
  useEffect(() => { void loadCatalog(); }, [loadCatalog]);
  const refresh = useCallback(async () => {
    setRefreshing(true);
    await loadCatalog();
    setRefreshing(false);
  }, [loadCatalog]);
  const visibleItems = useMemo(() => searchCustomerCatalog(items, query), [items, query]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.screen}>
        <View style={styles.header}>
          <View style={styles.brandGroup}>
            {/* Reuse the established Negarin brand asset already used by the web app. */}
            {/* eslint-disable-next-line @typescript-eslint/no-require-imports */}
            <Image source={require('../web/public/brand/negarin-logo.png')} style={styles.logo} resizeMode="contain" />
            <View>
              <Text style={styles.brandName}>خانه نگارین</Text>
              <Text style={styles.brandTagline}>روایتگر هنر اصیل ایرانی</Text>
            </View>
          </View>
          {selectedItem ? <Pressable accessibilityRole="button" onPress={() => setSelectedItem(null)} style={styles.backButton}>
            <Text style={styles.backButtonText}>بازگشت</Text>
          </Pressable> : null}
        </View>

        {selectedItem ? (
          <ScrollView contentContainerStyle={styles.detailContent}>
            {selectedItem.media[0]
              ? <Image source={{ uri: selectedItem.media[0].readUrl }} style={styles.detailImage} resizeMode="cover" />
              : <View style={[styles.detailImage, styles.imageFallback]}><Text style={styles.muted}>تصویری برای این اثر ثبت نشده است.</Text></View>}
            <Text style={styles.eyebrow}>اثر منتشرشده</Text>
            <Text style={styles.detailTitle}>{selectedItem.title}</Text>
            {selectedItem.description ? <Text style={styles.detailDescription}>{selectedItem.description}</Text> : null}
            <View style={styles.pricePanel}>
              <Text style={styles.priceLabel}>قیمت اعلام‌شده توسط هنرمند</Text>
              <Text style={styles.price}>{formatToman(selectedItem.priceToman)}</Text>
              <Text style={styles.priceLabel}>موجودی: {new Intl.NumberFormat('fa-IR').format(selectedItem.availableQuantity)} عدد</Text>
            </View>
            <Text style={styles.purchaseNote}>ثبت درخواست خرید و سفارش سازمانی از نسخهٔ وب در دسترس خریداران سازمانی است.</Text>
          </ScrollView>
        ) : (
          <ScrollView ref={catalogScrollRef} contentContainerStyle={styles.content}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={palette.teal} />}
            keyboardShouldPersistTaps="handled">
            <View style={styles.hero}>
              <Text style={styles.heroEyebrow}>بازار هنر و فرصت‌ها</Text>
              <Text style={styles.heroTitle}>هنر را کشف کن،{'\n'}هنرمند را دنبال کن</Text>
              <Text style={styles.heroBody}>آثار منتشرشدهٔ هنرمندان نگارین را ببین و روایت هر اثر را بخوان.</Text>
              <Pressable accessibilityRole="button" onPress={() => catalogScrollRef.current?.scrollTo({ y: 330, animated: true })} style={styles.heroButton}>
                <Text style={styles.heroButtonText}>کشف آثار</Text>
              </Pressable>
            </View>

            <View style={styles.searchBox}>
              <Text style={styles.searchIcon} accessibilityElementsHidden>⌕</Text>
              <TextInput accessibilityLabel="جست‌وجو در آثار منتشرشده" onChangeText={setQuery}
                placeholder="جست‌وجو در آثار منتشرشده" placeholderTextColor={palette.muted}
                returnKeyType="search" style={styles.searchInput} textAlign="right" value={query} />
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{query.trim() ? 'نتایج جست‌وجو' : 'آثار منتشرشده'}</Text>
              {status === 'ready' ? <Text style={styles.sectionCount}>{new Intl.NumberFormat('fa-IR').format(visibleItems.length)} اثر</Text> : null}
            </View>

            {status === 'loading' ? <View style={styles.stateCard} accessibilityLiveRegion="polite">
              <ActivityIndicator color={palette.teal} /><Text style={styles.stateText}>در حال دریافت آثار منتشرشده…</Text>
            </View> : status === 'unavailable' ? <View style={styles.stateCard} accessibilityLiveRegion="polite">
              <Text style={styles.stateTitle}>ارتباط با بازار برقرار نشد</Text>
              <Text style={styles.stateText}>اتصال اینترنت را بررسی کنید و دوباره تلاش کنید.</Text>
              <Pressable accessibilityRole="button" onPress={() => { void loadCatalog(); }} style={styles.retryButton}>
                <Text style={styles.retryButtonText}>تلاش دوباره</Text>
              </Pressable>
            </View> : visibleItems.length === 0 ? <View style={styles.stateCard}>
              <Text style={styles.stateTitle}>{query.trim() ? 'اثری پیدا نشد' : 'هنوز اثری برای نمایش نیست'}</Text>
              <Text style={styles.stateText}>{query.trim() ? 'واژهٔ دیگری را جست‌وجو کنید.' : 'آثار پس از تأیید و انتشار در این بخش دیده می‌شوند.'}</Text>
            </View> : <View style={styles.productList}>
              {visibleItems.map((item) => <Pressable accessibilityRole="button" accessibilityLabel={`مشاهدهٔ ${item.title}`}
                key={item.id} onPress={() => setSelectedItem(item)} style={({ pressed }) => [styles.productCard, pressed && styles.productCardPressed]}>
                {item.media[0] ? <Image source={{ uri: item.media[0].readUrl }} style={styles.productImage} resizeMode="cover" />
                  : <View style={[styles.productImage, styles.imageFallback]}><Text style={styles.imageFallbackText}>نگارین</Text></View>}
                <View style={styles.productCopy}>
                  <Text numberOfLines={2} style={styles.productTitle}>{item.title}</Text>
                  {item.description ? <Text numberOfLines={2} style={styles.productDescription}>{item.description}</Text> : null}
                  <Text style={styles.productPrice}>{formatToman(item.priceToman)}</Text>
                  <Text style={styles.productStock}>موجودی: {new Intl.NumberFormat('fa-IR').format(item.availableQuantity)} عدد</Text>
                </View>
                <Text style={styles.chevron} aria-hidden>‹</Text>
              </Pressable>)}
            </View>}
            <Text style={styles.footerNote}>خانه نگارین، بازار هنر و فرصت‌ها</Text>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const palette = { navy: '#071E63', teal: '#12AEB7', cream: '#FFF5E7', canvas: '#F8FAFC', white: '#FFFFFF', border: '#E6EAF0', text: '#12203E', muted: '#6C7890', paleTeal: '#E8F6F4' };
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.canvas }, screen: { flex: 1 },
  header: { minHeight: 64, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: palette.white, borderBottomWidth: 1, borderBottomColor: palette.border, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' },
  brandGroup: { flexDirection: 'row-reverse', alignItems: 'center', gap: 9 }, logo: { width: 36, height: 36 },
  brandName: { color: palette.navy, textAlign: 'right', writingDirection: 'rtl', fontSize: 14, fontWeight: '800' }, brandTagline: { color: palette.muted, textAlign: 'right', writingDirection: 'rtl', fontSize: 10, marginTop: 2 },
  backButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, backgroundColor: palette.paleTeal }, backButtonText: { color: palette.navy, fontSize: 12, fontWeight: '700', writingDirection: 'rtl' },
  content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 28, gap: 14 }, hero: { backgroundColor: palette.cream, borderRadius: 22, padding: 20, overflow: 'hidden' },
  heroEyebrow: { color: palette.teal, textAlign: 'right', writingDirection: 'rtl', fontSize: 11, fontWeight: '700' }, heroTitle: { color: palette.navy, textAlign: 'right', writingDirection: 'rtl', fontSize: 24, fontWeight: '800', lineHeight: 37, marginTop: 7 },
  heroBody: { color: '#5D6272', textAlign: 'right', writingDirection: 'rtl', fontSize: 12, lineHeight: 21, marginTop: 4 }, heroButton: { alignSelf: 'flex-end', backgroundColor: palette.navy, borderRadius: 10, paddingHorizontal: 22, paddingVertical: 10, marginTop: 15 }, heroButtonText: { color: palette.white, fontSize: 12, fontWeight: '700', writingDirection: 'rtl' },
  searchBox: { minHeight: 46, flexDirection: 'row-reverse', alignItems: 'center', gap: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: palette.border, borderRadius: 12, backgroundColor: palette.white }, searchIcon: { color: palette.muted, fontSize: 23, lineHeight: 26 }, searchInput: { flex: 1, color: palette.text, paddingVertical: 9, fontSize: 13, writingDirection: 'rtl' },
  sectionHeader: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }, sectionTitle: { color: palette.navy, textAlign: 'right', writingDirection: 'rtl', fontSize: 16, fontWeight: '800' }, sectionCount: { color: palette.muted, fontSize: 11, writingDirection: 'rtl' },
  productList: { gap: 10 }, productCard: { minHeight: 106, flexDirection: 'row-reverse', alignItems: 'center', gap: 12, padding: 10, borderWidth: 1, borderColor: palette.border, borderRadius: 16, backgroundColor: palette.white }, productCardPressed: { opacity: 0.78 }, productImage: { width: 82, height: 82, borderRadius: 12, backgroundColor: palette.paleTeal },
  imageFallback: { alignItems: 'center', justifyContent: 'center', backgroundColor: palette.paleTeal }, imageFallbackText: { color: palette.teal, fontSize: 12, fontWeight: '800' }, productCopy: { flex: 1, alignItems: 'flex-end' },
  productTitle: { width: '100%', color: palette.navy, textAlign: 'right', writingDirection: 'rtl', fontSize: 13, fontWeight: '800' }, productDescription: { width: '100%', color: palette.muted, textAlign: 'right', writingDirection: 'rtl', fontSize: 10, lineHeight: 16, marginTop: 4 }, productPrice: { color: palette.teal, textAlign: 'right', writingDirection: 'rtl', fontSize: 11, fontWeight: '700', marginTop: 6 }, productStock: { color: palette.muted, textAlign: 'right', writingDirection: 'rtl', fontSize: 10, marginTop: 4 }, chevron: { color: palette.muted, fontSize: 22 },
  stateCard: { minHeight: 126, alignItems: 'center', justifyContent: 'center', gap: 10, padding: 20, borderWidth: 1, borderColor: palette.border, borderRadius: 16, backgroundColor: palette.white }, stateTitle: { color: palette.navy, fontSize: 14, fontWeight: '800', textAlign: 'center', writingDirection: 'rtl' }, stateText: { color: palette.muted, fontSize: 12, lineHeight: 20, textAlign: 'center', writingDirection: 'rtl' },
  retryButton: { marginTop: 4, paddingVertical: 9, paddingHorizontal: 18, borderRadius: 9, backgroundColor: palette.navy }, retryButtonText: { color: palette.white, fontSize: 12, fontWeight: '700', writingDirection: 'rtl' }, footerNote: { paddingVertical: 14, color: palette.muted, textAlign: 'center', writingDirection: 'rtl', fontSize: 10 },
  detailContent: { padding: 16, paddingBottom: 32, gap: 14 }, detailImage: { width: '100%', height: 300, borderRadius: 20, backgroundColor: palette.paleTeal }, eyebrow: { color: palette.teal, textAlign: 'right', writingDirection: 'rtl', fontSize: 11, fontWeight: '700', marginTop: 6 }, detailTitle: { color: palette.navy, textAlign: 'right', writingDirection: 'rtl', fontSize: 22, fontWeight: '800' }, detailDescription: { color: palette.muted, textAlign: 'right', writingDirection: 'rtl', fontSize: 14, lineHeight: 25 },
  pricePanel: { padding: 16, borderWidth: 1, borderColor: palette.border, borderRadius: 14, backgroundColor: palette.white, gap: 8 }, priceLabel: { color: palette.muted, textAlign: 'right', writingDirection: 'rtl', fontSize: 11 }, price: { color: palette.navy, textAlign: 'right', writingDirection: 'rtl', fontSize: 18, fontWeight: '800' }, purchaseNote: { color: palette.muted, textAlign: 'center', writingDirection: 'rtl', fontSize: 11, lineHeight: 19 }, muted: { color: palette.muted, fontSize: 11, textAlign: 'center', writingDirection: 'rtl' }
});
