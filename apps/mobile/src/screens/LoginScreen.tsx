import { useRef, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { normalizeCode, normalizePhone, requestLogin, verifyLogin } from "../auth/login";
import { storeSessionToken } from "../auth/session";

// React Native resolves bundled image modules through Metro.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const logo = require("../../assets/negarin-logo.png");

export function LoginScreen({ onSignedIn, audience = "هنرمند" }: { onSignedIn: () => Promise<void>; audience?: "هنرمند" | "خریدار" }) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [retryAt, setRetryAt] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const lock = useRef(false);

  async function submit(resend = false) {
    if (lock.current) return;
    const normalized = normalizePhone(phone);
    if (!normalized) { setError("شماره موبایل معتبر وارد کنید."); return; }
    const normalizedCode = normalizeCode(code);
    if (sentTo && !resend && !/^\d{6}$/.test(normalizedCode)) { setError("کد شش‌رقمی را وارد کنید."); return; }
    if ((!sentTo || resend) && Date.now() < retryAt) { setError("برای ارسال مجدد، یک دقیقه صبر کنید."); return; }
    lock.current = true; setBusy(true); setError("");
    try {
      if (!sentTo || resend) {
        await requestLogin(normalized);
        setSentTo(normalized); setCode(""); setRetryAt(Date.now() + 60_000);
      } else {
        const token = await verifyLogin(sentTo, normalizedCode);
        await storeSessionToken(token);
        await onSignedIn();
      }
    } catch (reason) { setError(reason instanceof Error ? reason.message : "ورود انجام نشد؛ دوباره تلاش کنید."); }
    finally { lock.current = false; setBusy(false); }
  }

  return <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.page}>
    <Image source={logo} style={styles.logo} resizeMode="contain" />
    <Text style={styles.title}>ورود به نگارین {audience}</Text>
    <Text style={styles.hint}>{sentTo ? "کد ارسال‌شده به شماره موبایل را وارد کنید." : `شماره موبایل حساب ${audience} خود را وارد کنید.`}</Text>
    <TextInput accessibilityLabel="شماره موبایل" placeholder="۰۹۱۲۳۴۵۶۷۸۹" value={phone} onChangeText={setPhone} editable={!busy && !sentTo} keyboardType="phone-pad" autoComplete="tel" maxLength={13} style={styles.input} />
    {sentTo ? <TextInput accessibilityLabel="کد ورود" placeholder="کد شش‌رقمی" value={code} onChangeText={setCode} editable={!busy} keyboardType="number-pad" autoComplete="sms-otp" maxLength={6} style={styles.input} /> : null}
    {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
    <Pressable accessibilityRole="button" disabled={busy} onPress={() => void submit()} style={styles.button}>{busy ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{sentTo ? "تأیید و ورود" : "دریافت کد ورود"}</Text>}</Pressable>
    {sentTo ? <>
      <Pressable disabled={busy} onPress={() => void submit(true)}><Text style={styles.link}>ارسال مجدد کد</Text></Pressable>
      <Pressable disabled={busy} onPress={() => { setSentTo(null); setCode(""); setError(""); }}><Text style={styles.link}>تغییر شماره موبایل</Text></Pressable>
    </> : null}
  </ScrollView>;
}

const styles = StyleSheet.create({
  page: { flexGrow: 1, justifyContent: "center", padding: 28, gap: 18 },
  logo: { width: 100, height: 100, alignSelf: "center" },
  title: { fontSize: 22, fontWeight: "800", textAlign: "center", color: "#041b65" },
  hint: { fontSize: 14, lineHeight: 24, textAlign: "center", color: "#6b7280" },
  input: { borderWidth: 1, borderColor: "#d1d5db", borderRadius: 12, padding: 14, textAlign: "center", writingDirection: "ltr", color: "#041b65", fontSize: 18 },
  button: { backgroundColor: "#07858f", borderRadius: 12, padding: 15, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  error: { color: "#b91c1c", textAlign: "center", lineHeight: 24 },
  link: { textAlign: "center", color: "#041b65", padding: 6 }
});
