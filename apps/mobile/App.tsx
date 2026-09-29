import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoFrame}>
            {/* React Native Metro needs a static require for bundled image assets. */}
            {/* eslint-disable-next-line @typescript-eslint/no-require-imports */}
            <Image source={require('../web/public/brand/negarin-logo.png')} style={styles.logo} resizeMode="contain" />
          </View>
          <Text style={styles.brand} accessibilityRole="header">خانه نگارین</Text>
          <Text style={styles.subtitle}>برنامهٔ همراه خانهٔ نگارین</Text>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>آماده‌سازی نسخهٔ Android</Text>
          </View>
          <Text style={styles.cardTitle} accessibilityRole="header">زیرساخت برنامه آماده است</Text>
          <Text style={styles.cardBody}>
            ورود امن و امکانات حساب پس از اتصال سرویس احراز هویت و تعیین جریان‌های موبایل فعال می‌شوند.
          </Text>
        </View>

        <Text style={styles.footer}>نسخهٔ آزمایشی داخلی</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    width: '100%',
  },
  logoFrame: {
    width: 108,
    height: 108,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 18,
  },
  logo: {
    width: 88,
    height: 88,
  },
  brand: {
    color: '#0F172A',
    fontSize: 26,
    fontWeight: '700',
    writingDirection: 'rtl',
  },
  subtitle: {
    color: '#64748B',
    fontSize: 15,
    marginTop: 8,
    writingDirection: 'rtl',
  },
  statusCard: {
    width: '100%',
    padding: 22,
    borderWidth: 1,
    borderColor: '#D6E8E3',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  statusPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: '#EAF6F3',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0C7570',
  },
  statusText: {
    color: '#0B6963',
    fontSize: 12,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
  cardTitle: {
    marginTop: 20,
    color: '#0F172A',
    fontSize: 19,
    fontWeight: '700',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  cardBody: {
    marginTop: 10,
    color: '#475569',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  footer: {
    color: '#64748B',
    fontSize: 12,
    writingDirection: 'rtl',
  },
});
