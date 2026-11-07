import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { ApiError } from "../api/client";
import { CustomerAccess } from "./CustomerAccount";
import { changeCart, readCart, type CustomerCart } from "./cart";
import { ProductImage } from "./ProductImage";
import { toman } from "./catalog";
import { Action, commerce as s, persian } from "./CommerceUI";
export type PendingProduct = { id: string; title: string };
export function CartScreen({ pending, onAdded }: { pending: PendingProduct | null; onAdded: () => void }) {
  return <CustomerAccess render={({ token, onUnauthorized }) => <Cart key={token} token={token} onUnauthorized={onUnauthorized} pending={pending} onAdded={onAdded} />} />;
}
function Cart({ token, onUnauthorized, pending, onAdded }: { token: string; onUnauthorized: () => void; pending: PendingProduct | null; onAdded: () => void }) {
  const [cart, setCart] = useState<CustomerCart | null>(null); const [error, setError] = useState("");
  const [busy, setBusy] = useState(false); const [blocked, setBlocked] = useState(true); const [retry, setRetry] = useState(0);
  const lock = useRef(false);
  useEffect(() => {
    const controller = new AbortController(); setCart(null); setError(""); setBlocked(true);
    void readCart(token, controller.signal).then(result => { if (!controller.signal.aborted) { setCart(result); setBlocked(false); } })
      .catch(reason => {
        if (controller.signal.aborted) return;
        if (reason instanceof ApiError && reason.status === 401) onUnauthorized();
        else setError(reason instanceof Error ? reason.message : "دریافت سبد انجام نشد.");
      });
    return () => controller.abort();
  }, [token, retry, onUnauthorized]);
  async function change(id: string, quantity?: number, added = false) {
    if (!cart || blocked || lock.current) return;
    lock.current = true; setBusy(true); setError("");
    try { setCart(await changeCart(token, cart, id, quantity)); if (added) onAdded(); }
    catch (reason) {
      setBlocked(true);
      if (reason instanceof ApiError && reason.status === 401) onUnauthorized();
      else setError(reason instanceof Error ? reason.message : "تغییر سبد انجام نشد؛ تازه‌سازی کنید.");
    } finally { lock.current = false; setBusy(false); }
  }
  const disabled = busy || blocked || !cart;
  const statuses = { available: "موجود", out_of_stock: "ناموجود", insufficient_stock: "موجودی کافی نیست", unavailable: "این اثر دیگر در دسترس نیست" };
  const pendingQuantity = pending ? (cart?.items.find(item => item.productId === pending.id)?.quantity ?? 0) + 1 : 1;
  return <View style={s.flex}><View style={s.header}><Text style={s.title}>سبد خرید</Text></View><ScrollView contentContainerStyle={s.content}>
    {!cart && !error ? <ActivityIndicator color="#07858f" /> : null}
    {error ? <><Text accessibilityRole="alert" style={s.error}>{error}</Text><Action label="تازه‌سازی سبد" disabled={busy} onPress={() => setRetry(v => v + 1)} /></> : null}
    {pending ? <View style={s.note}><Text style={s.text}>{pending.title}</Text><Action label="افزودن اثر انتخاب‌شده" disabled={disabled || pendingQuantity > 100} onPress={() => void change(pending.id, pendingQuantity, true)} /></View> : null}
    {cart ? <Text style={s.muted}>{persian(cart.items.length)} محصول در سبد</Text> : null}
    {cart?.items.map(item => <View key={item.productId} style={s.card}>
      <View style={s.row}>{item.product ? <ProductImage product={item.product} compact /> : null}<View style={s.flex}><Text style={s.title}>{item.product?.title ?? "اثر خارج از دسترس"}</Text>{item.lineSubtotalToman !== null ? <Text style={s.price}>{toman(item.lineSubtotalToman)}</Text> : null}<Text style={s.muted}>{statuses[item.status]}</Text></View></View>
      <View style={s.row}>
        <View style={s.row}><Pressable accessibilityRole="button" accessibilityLabel={`افزایش تعداد ${item.product?.title ?? "اثر"}`} disabled={disabled || item.quantity >= 100 || item.status !== "available"} style={s.step} onPress={() => void change(item.productId, item.quantity + 1)}><Text style={s.stepText}>+</Text></Pressable><Text style={s.text}>{persian(item.quantity)}</Text><Pressable accessibilityRole="button" accessibilityLabel={`کاهش تعداد ${item.product?.title ?? "اثر"}`} disabled={disabled || item.quantity <= 1 || item.status === "unavailable"} style={s.step} onPress={() => void change(item.productId, item.quantity - 1)}><Text style={s.stepText}>−</Text></Pressable></View>
        <Pressable accessibilityRole="button" disabled={disabled} onPress={() => void change(item.productId)}><Text style={s.danger}>حذف اثر</Text></Pressable>
      </View>
    </View>)}
    {cart?.items.length === 0 ? <Text style={s.muted}>سبد خرید شما خالی است.</Text> : null}
    {cart ? <View style={s.card}><Text style={s.title}>خلاصه سفارش</Text><Text style={s.muted}>جمع کالاها</Text><Text style={s.price}>{cart.subtotalToman === null ? "برخی آثار در دسترس نیستند" : toman(cart.subtotalToman)}</Text><Text style={s.muted}>هزینه ارسال در مرحله ثبت سفارش مشخص می‌شود.</Text>{!cart.canCheckout && cart.items.length > 0 ? <Text style={s.error}>موجودی و وضعیت آثار سبد را بررسی کنید.</Text> : null}</View> : null}
  </ScrollView><View style={s.footer}><Text style={s.muted}>ثبت سفارش در این نسخه هنوز فعال نیست.</Text><Action label="ادامه به اطلاعات ارسال" disabled onPress={() => {}} /></View></View>;
}
