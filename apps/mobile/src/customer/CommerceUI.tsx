import { Pressable, StyleSheet, Text } from "react-native";
export function Action({ label, onPress, disabled = false }: { label: string; onPress: () => void; disabled?: boolean }) {
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={[commerce.button, disabled && commerce.disabled]}><Text style={commerce.white}>{label}</Text></Pressable>;
}
export function persian(value: string | number): string { return String(value).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]!); }
export const commerce = StyleSheet.create({
  flex: { flex: 1 }, content: { padding: 16, gap: 16, paddingBottom: 32 },
  header: { height: 58, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" },
  title: { fontFamily: "VazirmatnBold", fontSize: 18, color: "#041b65", textAlign: "right", lineHeight: 30 },
  text: { fontFamily: "Vazirmatn", fontSize: 13, color: "#041b65", textAlign: "right", lineHeight: 24 },
  muted: { fontFamily: "Vazirmatn", fontSize: 12, color: "#667085", textAlign: "right", lineHeight: 23 },
  price: { fontFamily: "VazirmatnBold", color: "#07858f", fontSize: 16, textAlign: "right", lineHeight: 28 },
  card: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#dee5eb", borderRadius: 18, padding: 16, gap: 12 },
  row: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between", gap: 12 },
  note: { backgroundColor: "#edf9f9", borderWidth: 1, borderColor: "#b8dbe0", borderRadius: 16, padding: 16, gap: 8 },
  button: { backgroundColor: "#041b65", borderRadius: 16, padding: 14, alignItems: "center" },
  white: { fontFamily: "VazirmatnBold", color: "#fff", fontSize: 15, textAlign: "center" },
  disabled: { opacity: 0.45 }, step: { borderWidth: 1, borderColor: "#dee5eb", borderRadius: 12, paddingVertical: 8, paddingHorizontal: 16 },
  stepText: { color: "#041b65", fontSize: 20 }, danger: { fontFamily: "Vazirmatn", color: "#df0c24", fontSize: 13, textAlign: "right", padding: 8 },
  error: { fontFamily: "Vazirmatn", color: "#b91c1c", textAlign: "right", lineHeight: 24 },
  footer: { backgroundColor: "#fff", borderTopWidth: 1, borderColor: "#dee5eb", padding: 16, gap: 12 },
  back: { position: "absolute", right: 16, padding: 8 }, code: { color: "#041b65", fontSize: 12, textAlign: "right", writingDirection: "ltr" }
});
