import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, BackHandler, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { ApiError, apiJson } from "../api/client";
import { discoverCustomerAccess, selectCustomerGrant, type IdentityGrant } from "../auth/identity";
import { clearSessionToken, readSessionToken } from "../auth/session";
import { LoginScreen } from "../screens/LoginScreen";
import { readProfile, saveProfile, type Profile } from "./profile";

type Access = { kind: "checking" } | { kind: "signed-out" } | { kind: "error"; message: string } |
  { kind: "missing"; token: string } | { kind: "choose"; token: string; grants: IdentityGrant[] } | { kind: "ready"; token: string };
export type CustomerSession = { token: string; busyLogout: boolean; onLogout: () => void; onUnauthorized: () => void };
export function CustomerAccount({ onOrders }: { onOrders?: () => void }) {
  return <CustomerAccess render={access => <AccountProfile {...access} onOrders={onOrders} />} />;
}

export function CustomerAccess({ render }: { render: (access: CustomerSession) => ReactNode }) {
  const [state, setState] = useState<Access>({ kind: "checking" });
  const [busy, setBusy] = useState(false); const lock = useRef(false);
  const restore = useCallback(async () => {
    setState({ kind: "checking" });
    try {
      const token = await readSessionToken();
      if (!token) { setState({ kind: "signed-out" }); return; }
      const access = await discoverCustomerAccess(token);
      if (access.kind === "ready") setState({ kind: "ready", token });
      else if (access.kind === "choose") setState({ kind: "choose", token, grants: access.grants });
      else setState({ kind: "missing", token });
    } catch (reason) {
      if (reason instanceof ApiError && reason.status === 401) { await clearSessionToken(); setState({ kind: "signed-out" }); }
      else setState({ kind: "error", message: reason instanceof Error ? reason.message : "بررسی حساب انجام نشد." });
    }
  }, []);
  useEffect(() => { void restore(); }, [restore]);
  async function logout() {
    if (!("token" in state) || lock.current) return;
    lock.current = true; setBusy(true);
    try {
      await apiJson("/api/v1/identity/session/revoke", state.token, { method: "POST" });
      await clearSessionToken(); setState({ kind: "signed-out" });
    } catch (reason) { Alert.alert("خروج انجام نشد", reason instanceof Error ? reason.message : "دوباره تلاش کنید."); }
    finally { lock.current = false; setBusy(false); }
  }
  async function choose(id: string) {
    if (state.kind !== "choose" || lock.current) return;
    lock.current = true; setBusy(true);
    try { await selectCustomerGrant(state.token, id); await restore(); }
    catch (reason) { Alert.alert("انتخاب حساب انجام نشد", reason instanceof Error ? reason.message : "دوباره تلاش کنید."); }
    finally { lock.current = false; setBusy(false); }
  }
  if (state.kind === "signed-out") return <LoginScreen audience="خریدار" onSignedIn={restore} />;
  if (state.kind === "ready") return <View key={state.token} style={styles.flex}>{render({ token: state.token, busyLogout: busy, onLogout: () => void logout(), onUnauthorized: restore })}</View>;
  return <View style={styles.center}>
    <Text style={styles.title}>حساب من</Text>
    {state.kind === "checking" ? <ActivityIndicator color="#07858f" /> : null}
    {state.kind === "error" ? <><Text accessibilityRole="alert" style={styles.message}>{state.message}</Text><Button label="تلاش دوباره" onPress={() => void restore()} /></> : null}
    {state.kind === "missing" ? <><Text style={styles.message}>این حساب دسترسی خریدار ندارد.</Text><Button label="بررسی دوباره" disabled={busy} onPress={() => void restore()} /></> : null}
    {state.kind === "choose" ? <><Text style={styles.message}>حساب خریدار را انتخاب کنید.</Text>{state.grants.map((grant, index) => <Button key={grant.id} disabled={busy} label={`حساب خریدار ${String(index + 1).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]!)}`} onPress={() => void choose(grant.id)} />)}</> : null}
    {"token" in state ? <Button label="خروج از حساب" disabled={busy} onPress={() => void logout()} /> : null}
  </View>;
}
function Button({ label, onPress, disabled = false }: { label: string; onPress: () => void; disabled?: boolean }) {
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={[styles.button, disabled && styles.disabled]}><Text style={styles.white}>{label}</Text></Pressable>;
}
function AccountProfile({ token, busyLogout, onLogout, onUnauthorized, onOrders }: CustomerSession & { onOrders?: () => void }) {
  const [profile, setProfile] = useState<Profile | null>(null); const [name, setName] = useState("");
  const [edit, setEdit] = useState(false); const [busy, setBusy] = useState(false);
  const [error, setError] = useState(""); const [success, setSuccess] = useState(""); const [retry, setRetry] = useState(0);
  const [needsReload, setNeedsReload] = useState(false); const lock = useRef(false);
  useEffect(() => {
    const controller = new AbortController(); setProfile(null); setError(""); setSuccess(""); setNeedsReload(true);
    void readProfile(token, controller.signal).then(result => {
      if (!controller.signal.aborted) { setProfile(result); setName(result.displayName); setNeedsReload(false); }
    }).catch(reason => {
      if (controller.signal.aborted) return;
      if (reason instanceof ApiError && reason.status === 401) onUnauthorized();
      else setError(reason instanceof Error ? reason.message : "دریافت مشخصات انجام نشد.");
    });
    return () => controller.abort();
  }, [token, retry, onUnauthorized]);
  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      if (!edit) return false;
      if (!lock.current) setEdit(false);
      return true;
    });
    return () => subscription.remove();
  }, [edit]);
  async function save() {
    if (!profile || needsReload || lock.current || busyLogout) return;
    lock.current = true; setBusy(true); setError(""); setSuccess("");
    try {
      const fresh = await saveProfile(token, profile, name);
      setProfile(fresh); setName(fresh.displayName); setSuccess("تغییرات ذخیره شد.");
    } catch (reason) {
      setNeedsReload(true);
      if (reason instanceof ApiError && reason.status === 401) onUnauthorized();
      else setError(reason instanceof Error ? reason.message : "ذخیره انجام نشد؛ اطلاعات را تازه‌سازی کنید.");
    } finally { lock.current = false; setBusy(false); }
  }
  return <View style={styles.flex}>
    <View style={styles.header}><Text style={styles.title}>{edit ? "اطلاعات حساب" : "حساب من"}</Text>{edit ? <Pressable accessibilityRole="button" accessibilityLabel="بازگشت به حساب" disabled={busy} style={styles.back} onPress={() => setEdit(false)}><Text style={styles.chevron}>←</Text></Pressable> : null}</View>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
      {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
      {!profile && !error ? <ActivityIndicator color="#07858f" /> : null}
      {needsReload && error ? <Button label="تازه‌سازی اطلاعات" onPress={() => setRetry(v => v + 1)} disabled={busy} /> : null}
      {profile && !edit ? <>
        <Pressable accessibilityRole="button" disabled={busyLogout} onPress={() => setEdit(true)} style={styles.profileCard}><Text style={styles.title}>{profile.displayName || "پروفایل من"}</Text><Text style={styles.message}>اطلاعات حساب و ترجیحاتت را مدیریت کن.</Text></Pressable>
        <Text style={styles.title}>دسترسی سریع</Text>
        <View style={styles.tiles}>{["سفارش‌های من", "ذخیره‌شده‌ها", "دنبال‌شده‌ها", "آدرس‌ها"].map(label => <Pressable key={label} accessibilityRole="button" disabled={label !== "سفارش‌های من" || !onOrders} onPress={onOrders} style={styles.tile}><Text style={styles.label}>{label}</Text><Text style={styles.message}>{label === "سفارش‌های من" ? "پیگیری سفارش‌های جاری و گذشته" : "در این نسخه فعال نیست"}</Text></Pressable>)}</View>
        <Text style={styles.title}>حساب و پشتیبانی</Text>
        <Pressable accessibilityRole="button" disabled={busyLogout} onPress={() => setEdit(true)} style={styles.field}><Text style={styles.label}>اطلاعات حساب</Text><Text style={styles.message}>ویرایش اطلاعات پایه حساب</Text></Pressable>
        <Button label={busyLogout ? "در حال خروج…" : "خروج از حساب"} disabled={busyLogout || busy} onPress={onLogout} />
      </> : null}
      {profile && edit ? <>
        <View style={styles.profileCard}><Text style={styles.label}>اطلاعات پایه حساب</Text><Text style={styles.message}>نام و مشخصات حساب خود را مدیریت کن.</Text></View>
        <Text style={styles.title}>اطلاعات شخصی</Text>
        <View style={styles.field}><Text style={styles.message}>نام و نام خانوادگی</Text><TextInput accessibilityLabel="نام و نام خانوادگی" value={name} onChangeText={value => { setName(value); setSuccess(""); }} editable={!busy && !needsReload} maxLength={100} style={styles.input} /></View>
        <View style={styles.field}><Text style={styles.message}>شماره موبایل</Text><Text style={styles.phone}>{profile.phone.replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]!)}</Text></View>
        {success ? <Text accessibilityRole="alert" style={styles.success}>{success}</Text> : null}
        <Button label={busy ? "در حال ذخیره…" : "ذخیره تغییرات"} onPress={() => void save()} disabled={busy || needsReload || busyLogout || !name.trim() || name.trim() === profile.displayName} />
      </> : null}
    </ScrollView>
  </View>;
}
const styles = StyleSheet.create({
  flex: { flex: 1 }, center: { flex: 1, padding: 24, gap: 18, justifyContent: "center" },
  header: { height: 58, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  back: { position: "absolute", right: 16, padding: 8 }, chevron: { color: "#041b65", fontSize: 26 },
  content: { padding: 16, gap: 16, paddingBottom: 32 },
  title: { fontFamily: "VazirmatnBold", fontSize: 18, color: "#041b65", textAlign: "right", lineHeight: 30 },
  label: { fontFamily: "VazirmatnBold", color: "#041b65", textAlign: "right", fontSize: 14 },
  message: { fontFamily: "Vazirmatn", fontSize: 12, color: "#6d7890", lineHeight: 23, textAlign: "right" },
  profileCard: { backgroundColor: "#edf7f8", borderWidth: 1, borderColor: "#c3dbdf", borderRadius: 18, padding: 22, gap: 12, minHeight: 112 },
  tiles: { flexDirection: "row-reverse", flexWrap: "wrap", gap: 12 }, tile: { width: "48%", backgroundColor: "#fff", borderWidth: 1, borderColor: "#d1dbe3", borderRadius: 16, padding: 16, gap: 8, minHeight: 96, opacity: 0.65 },
  field: { borderWidth: 1, borderColor: "#d7e2ea", borderRadius: 14, backgroundColor: "#fff", minHeight: 76, padding: 14, gap: 8 },
  input: { fontFamily: "Vazirmatn", fontSize: 15, color: "#041b65", textAlign: "right", padding: 0 },
  phone: { fontFamily: "Vazirmatn", fontSize: 15, color: "#041b65", textAlign: "right", writingDirection: "ltr" },
  button: { backgroundColor: "#041b65", borderRadius: 14, padding: 14, alignItems: "center" }, white: { fontFamily: "VazirmatnBold", color: "#fff", fontSize: 15 }, disabled: { opacity: 0.5 },
  error: { fontFamily: "Vazirmatn", color: "#b91c1c", lineHeight: 24, textAlign: "right" }, success: { fontFamily: "Vazirmatn", color: "#07858f", lineHeight: 24, textAlign: "right" }
});
