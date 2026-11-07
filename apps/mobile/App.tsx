import { LoginScreen } from "./src/screens/LoginScreen";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator, Alert, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View
} from "react-native";
import { ApiError, getApiBaseUrl, apiJson } from "./src/api/client";
import { ArtistApp } from "./src/ArtistApp";
import { discoverArtistAccess, selectArtistGrant, type IdentityContext, type IdentityGrant } from "./src/auth/identity";
import { clearSessionToken, readSessionToken } from "./src/auth/session";

type AppState =
  | { kind: "checking" }
  | { kind: "configuration" }
  | { kind: "signed-out" }
  | { kind: "error"; message: string }
  | { kind: "no-artist" }
  | { kind: "choose-artist"; token: string; grants: IdentityGrant[] }
  | { kind: "ready"; token: string; context: IdentityContext };

const colors = { background: "#fcfcfc", surface: "#ffffff", brand: "#041b65", accent: "#07858f", border: "#e5e7eb", muted: "#6b7280" };

export default function App() {
  const [state, setState] = useState<AppState>({ kind: "checking" });
  const [attempt, setAttempt] = useState(0);
  const [selecting, setSelecting] = useState<string | null>(null);

  const restore = useCallback(async () => {
    if (!getApiBaseUrl()) {
      setState({ kind: "configuration" });
      return;
    }
    try {
      const token = await readSessionToken();
      if (!token) {
        setState({ kind: "signed-out" });
        return;
      }
      const access = await discoverArtistAccess(token);
      if (access.kind === "ready") setState({ kind: "ready", token, context: access.context });
      else if (access.kind === "choose") setState({ kind: "choose-artist", token, grants: access.grants });
      else setState({ kind: "no-artist" });
    } catch (reason) {
      if (reason instanceof ApiError && reason.status === 401) {
        await clearSessionToken();
        setState({ kind: "signed-out" });
      } else {
        setState({ kind: "error", message: reason instanceof Error ? reason.message : "برقراری ارتباط با نگارین انجام نشد." });
      }
    }
  }, []);

  useEffect(() => { void restore(); }, [restore, attempt]);

  async function chooseGrant(grantId: string) {
    if (state.kind !== "choose-artist" || selecting) return;
    setSelecting(grantId);
    try {
      const context = await selectArtistGrant(state.token, grantId);
      setState({ kind: "ready", token: state.token, context });
    } catch (reason) {
      if (reason instanceof ApiError && reason.status === 401) {
        await clearSessionToken();
        setState({ kind: "signed-out" });
      } else {
        Alert.alert("فعال‌سازی دسترسی انجام نشد", reason instanceof Error ? reason.message : "وضعیت دسترسی را دوباره بررسی کنید.");
      }
    } finally {
      setSelecting(null);
    }
  }

  async function logout() {
    if (state.kind !== "ready") return;
    try {
      await apiJson("/api/v1/identity/session/revoke", state.token, { method: "POST" });
      await clearSessionToken();
      setState({ kind: "signed-out" });
    } catch (reason) {
      Alert.alert("خروج انجام نشد", reason instanceof Error ? reason.message : "نشست از سرور لغو نشد؛ دوباره تلاش کنید.");
    }
  }

  return <SafeAreaView style={styles.safe}>
    <StatusBar barStyle="dark-content" />
    {state.kind === "ready"
      ? <ArtistApp token={state.token} context={state.context} onLogout={() => void logout()} />
      : state.kind === "checking"
        ? <Centered title="نگارین هنرمند" message="در حال بررسی نشست امن…" loading />
        : state.kind === "configuration"
          ? <Centered title="تنظیم اتصال" message="آدرس API در تنظیمات ساخت Android تعریف نشده است. مقدار EXPO_PUBLIC_API_BASE_URL باید به نشانی قابل دسترس و امن بک‌اند نگارین اشاره کند." />
          : state.kind === "signed-out"
            ? <LoginScreen onSignedIn={restore} />
            : state.kind === "no-artist"
              ? <Centered title="دسترسی هنرمند موجود نیست" message="برای این نشست، دسترسی فعال هنرمند ثبت نشده است. مجوزهای حساب باید در سامانه هویت نگارین تعریف شوند." action="بررسی دوباره" onAction={() => setAttempt((value) => value + 1)} />
              : state.kind === "choose-artist"
                ? <View style={styles.page}>
                    <Text style={styles.title}>انتخاب حساب هنرمند</Text>
                    <Text style={styles.message}>برای ورود به فضای هنرمند، یکی از دسترسی‌های ثبت‌شده را انتخاب کنید.</Text>
                    {state.grants.map((grant) => <Pressable key={grant.id} disabled={selecting !== null} onPress={() => void chooseGrant(grant.id)} style={styles.grant}>
                      <Text style={styles.grantTitle}>حساب هنرمند</Text>
                      <Text style={styles.grantId}>{grant.id.slice(0, 8).toUpperCase()}</Text>
                      {selecting === grant.id ? <ActivityIndicator color={colors.accent} /> : null}
                    </Pressable>)}
                  </View>
                : <Centered title="اتصال به نگارین" message={state.message} action="تلاش دوباره" onAction={() => setAttempt((value) => value + 1)} />}
  </SafeAreaView>;
}

function Centered({ title, message, loading, action, onAction }: {
  title: string; message: string; loading?: boolean; action?: string; onAction?: () => void;
}) {
  return <ScrollView contentContainerStyle={styles.centered}>
    <View style={styles.mark}><Text style={styles.markText}>ن</Text></View>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.message}>{message}</Text>
    {loading ? <ActivityIndicator color={colors.accent} /> : null}
    {action && onAction ? <Pressable accessibilityRole="button" onPress={onAction} style={styles.action}>
      <Text style={styles.actionText}>{action}</Text>
    </Pressable> : null}
  </ScrollView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background, direction: "rtl" },
  centered: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 26, gap: 16 },
  mark: { width: 58, height: 58, borderRadius: 18, backgroundColor: colors.brand, alignItems: "center", justifyContent: "center" },
  markText: { color: "#ffffff", fontSize: 30, fontWeight: "800" },
  title: { color: colors.brand, fontSize: 20, fontWeight: "800", textAlign: "center" },
  message: { color: colors.muted, fontSize: 13, lineHeight: 23, textAlign: "center" },
  action: { backgroundColor: colors.brand, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 11, marginTop: 4 },
  actionText: { color: "#ffffff", fontSize: 12, fontWeight: "700" },
  page: { flex: 1, padding: 20, gap: 12 },
  grant: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 12, padding: 14, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  grantTitle: { color: colors.brand, fontSize: 13, fontWeight: "700" },
  grantId: { color: colors.muted, fontSize: 11 }
});
