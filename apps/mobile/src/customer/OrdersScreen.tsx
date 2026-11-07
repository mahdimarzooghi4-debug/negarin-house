import { useEffect, useState } from "react";
import { ActivityIndicator, BackHandler, Pressable, ScrollView, Text, View } from "react-native";
import { ApiError } from "../api/client";
import { CustomerAccess } from "./CustomerAccount";
import { readOrder, readOrders, orderStatusLabels, paymentStatusLabels, preparationStatusLabels, shipmentIssueLabels, type CustomerOrder, type OrderPage } from "./orders";
import { Action, commerce as s, persian } from "./CommerceUI";
import { toman } from "./catalog";
export function OrdersScreen({ onBack }: { onBack: () => void }) {
  return <CustomerAccess render={({ token, onUnauthorized }) => <Orders key={token} token={token} onUnauthorized={onUnauthorized} onBack={onBack} />} />;
}
function Orders({ token, onUnauthorized, onBack }: { token: string; onUnauthorized: () => void; onBack: () => void }) {
  const [selected, setSelected] = useState<string | null>(null); const [page, setPage] = useState(1);
  const [data, setData] = useState<OrderPage | null>(null); const [error, setError] = useState(""); const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (selected) return;
    const controller = new AbortController(); setData(null); setError("");
    void readOrders(token, page, controller.signal).then(result => { if (!controller.signal.aborted) setData(result); }).catch(reason => {
      if (controller.signal.aborted) return;
      if (reason instanceof ApiError && reason.status === 401) onUnauthorized();
      else setError(reason instanceof Error ? reason.message : "دریافت سفارش‌ها انجام نشد.");
    });
    return () => controller.abort();
  }, [token, page, retry, selected, onUnauthorized]);
  useEffect(() => {
    const handler = BackHandler.addEventListener("hardwareBackPress", () => { if (selected) setSelected(null); else onBack(); return true; });
    return () => handler.remove();
  }, [selected, onBack]);
  return <View style={s.flex}><View style={s.header}><Text style={s.title}>{selected ? "جزئیات سفارش" : "سفارش‌های من"}</Text><Pressable accessibilityRole="button" accessibilityLabel="بازگشت" onPress={() => selected ? setSelected(null) : onBack()} style={s.back}><Text style={s.stepText}>←</Text></Pressable></View>
    {selected ? <OrderDetail key={selected} id={selected} token={token} onUnauthorized={onUnauthorized} /> : <ScrollView contentContainerStyle={s.content}>
      <Text style={s.muted}>همه سفارش‌های این حساب</Text>
      {!data && !error ? <ActivityIndicator color="#07858f" /> : null}
      {error ? <><Text accessibilityRole="alert" style={s.error}>{error}</Text><Action label="تلاش دوباره" onPress={() => setRetry(v => v + 1)} /></> : null}
      {data?.items.map(order => <Pressable key={order.id} accessibilityRole="button" accessibilityLabel="مشاهده جزئیات سفارش" onPress={() => setSelected(order.id)} style={s.card}><Text style={s.title}>{order.items[0]?.title}</Text><Text style={s.text}>{orderStatusLabels[order.status]}</Text><Text style={s.muted}>{paymentStatusLabels[order.paymentStatus]}</Text><Text style={s.price}>{toman(order.subtotalToman)}</Text><Text style={s.muted}>{persian(order.items.length)} اثر</Text></Pressable>)}
      {data?.items.length === 0 ? <Text style={s.muted}>سفارشی برای این حساب ثبت نشده است.</Text> : null}
      {data ? <View style={s.row}><Action label="قبلی" disabled={page === 1} onPress={() => setPage(v => v - 1)} /><Text style={s.text}>{persian(page)}</Text><Action label="بعدی" disabled={!data.hasMore || page >= 1000} onPress={() => setPage(v => v + 1)} /></View> : null}
    </ScrollView>}
  </View>;
}
function OrderDetail({ token, id, onUnauthorized }: { token: string; id: string; onUnauthorized: () => void }) {
  const [order, setOrder] = useState<CustomerOrder | null>(null); const [error, setError] = useState(""); const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController(); setOrder(null); setError("");
    void readOrder(token, id, controller.signal).then(result => { if (!controller.signal.aborted) setOrder(result); }).catch(reason => {
      if (controller.signal.aborted) return;
      if (reason instanceof ApiError && reason.status === 401) onUnauthorized();
      else setError(reason instanceof Error ? reason.message : "دریافت سفارش انجام نشد.");
    });
    return () => controller.abort();
  }, [token, id, retry, onUnauthorized]);
  return <ScrollView contentContainerStyle={s.content}>
    {!order && !error ? <ActivityIndicator color="#07858f" /> : null}
    {error ? <><Text accessibilityRole="alert" style={s.error}>{error}</Text><Action label="تلاش دوباره" onPress={() => setRetry(v => v + 1)} /></> : null}
    {order ? <>
      <View style={s.card}><Text style={s.title}>{orderStatusLabels[order.status]}</Text><Text style={s.text}>{paymentStatusLabels[order.paymentStatus]}</Text><Text style={s.muted}>شناسه سفارش</Text><Text selectable style={s.code}>{order.id}</Text></View>
      {order.preparation.map((group, index) => <View key={index} style={s.card}><Text style={s.title}>{preparationStatusLabels[group.status]}</Text>{group.items.map(id => <Text key={id} style={s.text}>{order.items.find(item => item.productId === id)?.title}</Text>)}
        {group.shipment ? <View style={s.note}><Text style={s.text}>گزارش ارسال هنرمند</Text><Text style={s.text}>{group.shipment.carrierName}</Text><Text selectable style={s.code}>{group.shipment.trackingCode}</Text><Text style={s.muted}>تأیید شرکت حمل ثبت نشده است.</Text>{group.shipment.receivedAt ? <Text style={s.text}>دریافت توسط مشتری تأیید شده است.</Text> : <Text style={s.muted}>دریافت توسط مشتری هنوز تأیید نشده است.</Text>}
          {group.shipment.issue ? <><Text style={s.text}>{shipmentIssueLabels[group.shipment.issue.kind]}</Text><Text style={s.text}>{group.shipment.issue.description}</Text><Text style={s.muted}>{group.shipment.issue.status === "closed" ? "بررسی بسته شده" : group.shipment.issue.status === "in_review" ? "در حال بررسی" : "مشکل ثبت شده"}</Text>{group.shipment.issue.resolutionSummary ? <Text style={s.text}>{group.shipment.issue.resolutionSummary}</Text> : null}{group.shipment.issue.refundReview ? <Text style={s.muted}>{group.shipment.issue.refundReview.decision === "approved" ? "بازپرداخت تأیید شده؛ اجرای وجه انجام نشده است." : "درخواست بازپرداخت رد شده است."}</Text> : null}</> : null}
        </View> : null}
      </View>)}
      {order.items.map(item => <View key={item.productId} style={s.card}><Text style={s.title}>{item.title}</Text><Text style={s.muted}>تعداد: {persian(item.quantity)}</Text><Text style={s.price}>{toman(item.lineSubtotalToman)}</Text></View>)}
      <View style={s.note}><Text style={s.title}>آدرس ثبت‌شده سفارش</Text><Text style={s.text}>{order.shippingAddress.recipientName}</Text><Text style={s.text}>{order.shippingAddress.province}، {order.shippingAddress.city}</Text><Text style={s.text}>{order.shippingAddress.fullAddress}</Text><Text style={s.text}>کد پستی: {persian(order.shippingAddress.postalCode)}</Text><Text style={s.text}>{persian(order.shippingAddress.recipientPhone)}</Text></View>
      <View style={s.card}><Text style={s.title}>خلاصه پرداخت</Text><Text style={s.text}>{paymentStatusLabels[order.paymentStatus]}</Text><Text style={s.price}>جمع کالاها: {toman(order.subtotalToman)}</Text></View>
    </> : null}
  </ScrollView>;
}
