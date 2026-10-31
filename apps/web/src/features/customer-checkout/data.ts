function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}
const uuid = (value: unknown): value is string => typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
const money = (value: unknown): value is string => typeof value === "string" && /^(0|[1-9]\d*)$/.test(value);
const instant = (value: unknown): value is string => typeof value === "string" && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value;
export type ShippingAddress = { id: string; recipientName: string; recipientPhone: string; province: string; city: string; postalCode: string; fullAddress: string; isDefault: boolean };
export type AddressBook = { version: number; addresses: ShippingAddress[] };
export type CustomerShipment = { id: string; customerVersion: number; receipt: { source: "customer_confirmation"; receivedAt: string } | null; issue: { status: "open" | "in_review" | "closed"; version: number; resolution: "customer_follow_up_complete" | "referred_for_refund_review" | null; resolutionSummary: string | null; kind: "not_received" | "damaged" | "wrong_items" | "missing_items"; description: string; reportedAt: string } | null; carrierName: string; trackingCode: string; reportedAt: string };
export type CustomerOrder = { id: string; version: number; status: "reserved" | "cancelled" | "expired" | "placed"; paymentStatus: "unpaid" | "paid" | "reconciliation_required"; paidAt: string | null; subtotalToman: string; reservedUntil: string; releasedAt: string | null; createdAt: string; shippingAddress: Omit<ShippingAddress, "id" | "isDefault">; items: Array<{ productId: string; title: string; quantity: number; unitPriceToman: string; lineSubtotalToman: string; imageIds: string[] }>; preparation: Array<{ items: string[]; status: "awaiting_acceptance" | "accepted" | "preparing" | "packaging" | "ready_for_dispatch"; shipment: CustomerShipment | null }> };

export function parseAddressBook(value: unknown): AddressBook | null {
  const book = record(value);
  if (!book || !Number.isInteger(book.version) || (book.version as number) < 0 || !Array.isArray(book.addresses) || book.addresses.length > 20) return null;
  const addresses = book.addresses.map(value => {
    const address = record(value);
    if (!address || !uuid(address.id) || ["recipientName", "recipientPhone", "province", "city", "postalCode", "fullAddress"].some(key => typeof address[key] !== "string") || typeof address.isDefault !== "boolean") return null;
    return { id: address.id, recipientName: address.recipientName as string, recipientPhone: address.recipientPhone as string,
      province: address.province as string, city: address.city as string, postalCode: address.postalCode as string,
      fullAddress: address.fullAddress as string, isDefault: address.isDefault };
  });
  if (addresses.some(address => address === null)) return null;
  const result = addresses as ShippingAddress[];
  if (new Set(result.map(address => address.id.toLowerCase())).size !== result.length || result.filter(address => address.isDefault).length !== (result.length ? 1 : 0)) return null;
  return { version: book.version as number, addresses: result };
}

export function parseCustomerOrder(value: unknown): CustomerOrder | null {
  const order = record(value);
  if (!order || !uuid(order.id) || !Number.isInteger(order.version) || !["reserved", "cancelled", "expired", "placed"].includes(String(order.status)) ||
    !["unpaid", "paid", "reconciliation_required"].includes(String(order.paymentStatus)) || !(order.paidAt === null || (typeof order.paidAt === "string" && Number.isFinite(Date.parse(order.paidAt)))) ||
    !(order.releasedAt === null || (typeof order.releasedAt === "string" && Number.isFinite(Date.parse(order.releasedAt)))) || !money(order.subtotalToman) ||
    typeof order.reservedUntil !== "string" || !Number.isFinite(Date.parse(order.reservedUntil)) || typeof order.createdAt !== "string" || !Number.isFinite(Date.parse(order.createdAt)) || !Array.isArray(order.items) || !Array.isArray(order.preparation)) return null;
  const address = record(order.shippingAddress);
  if (!address || ["recipientName", "recipientPhone", "province", "city", "postalCode", "fullAddress"].some(key => typeof address[key] !== "string")) return null;
  const items = order.items.map(value => {
    const item = record(value);
    if (!item || !uuid(item.productId) || typeof item.title !== "string" || !Number.isInteger(item.quantity) || (item.quantity as number) < 1 ||
      !money(item.unitPriceToman) || !money(item.lineSubtotalToman) || !Array.isArray(item.imageIds) || !item.imageIds.every(uuid) ||
      new Set(item.imageIds.map(id => id.toLowerCase())).size !== item.imageIds.length) return null;
    return { productId: item.productId, title: item.title, quantity: item.quantity as number, unitPriceToman: item.unitPriceToman, lineSubtotalToman: item.lineSubtotalToman, imageIds: item.imageIds as string[] };
  });
  if (!items.length || items.some(item => item === null)) return null;
  const preparation = order.preparation.map(value => {
    const group = record(value);
    if (!group || !["awaiting_acceptance", "accepted", "preparing", "packaging", "ready_for_dispatch"].includes(String(group.status)) || !Array.isArray(group.items) || !group.items.every(uuid)) return null;
    let shipment: CustomerShipment | null = null;
    if (group.shipment !== null) {
      const raw = record(group.shipment);
      if (!raw || !uuid(raw.id) || !Number.isInteger(raw.customerVersion) || raw.status !== "reported_dispatched" || raw.source !== "artist_report" || raw.carrierVerified !== false ||
        typeof raw.carrierName !== "string" || typeof raw.trackingCode !== "string" || !instant(raw.reportedAt)) return null;
      let receipt: CustomerShipment["receipt"] = null;
      if (raw.receipt !== null) {
        const value = record(raw.receipt);
        if (!value || value.source !== "customer_confirmation" || !instant(value.receivedAt)) return null;
        receipt = { source: "customer_confirmation", receivedAt: value.receivedAt };
      }
      let issue: CustomerShipment["issue"] = null;
      if (raw.issue !== null) {
        const value = record(raw.issue);
        if (!value || !["open", "in_review", "closed"].includes(String(value.status)) || !Number.isInteger(value.version) ||
          !(value.resolution === null || ["customer_follow_up_complete", "referred_for_refund_review"].includes(String(value.resolution))) ||
          !(value.resolutionSummary === null || typeof value.resolutionSummary === "string") ||
          !["not_received", "damaged", "wrong_items", "missing_items"].includes(String(value.kind)) || typeof value.description !== "string" || !instant(value.reportedAt)) return null;
        issue = { status: value.status as NonNullable<CustomerShipment["issue"]>["status"], version: value.version as number,
          resolution: value.resolution as NonNullable<CustomerShipment["issue"]>["resolution"], resolutionSummary: value.resolutionSummary as string | null,
          kind: value.kind as NonNullable<CustomerShipment["issue"]>["kind"], description: value.description, reportedAt: value.reportedAt };
      }
      shipment = { id: raw.id, customerVersion: raw.customerVersion as number, receipt, issue, carrierName: raw.carrierName, trackingCode: raw.trackingCode, reportedAt: raw.reportedAt };
    }
    return { items: group.items as string[], status: group.status as CustomerOrder["preparation"][number]["status"], shipment };
  });
  if (preparation.some(group => group === null)) return null;
  const groups = preparation as CustomerOrder["preparation"];
  const productIds = (items as CustomerOrder["items"]).map(item => item.productId.toLowerCase());
  const preparedIds = groups.flatMap(group => group.items.map(id => id.toLowerCase()));
  if (order.status === "placed" ? preparedIds.length !== productIds.length || new Set(preparedIds).size !== preparedIds.length || preparedIds.some(id => !productIds.includes(id)) : groups.length !== 0) return null;
  return { id: order.id, version: order.version as number, status: order.status as CustomerOrder["status"], paymentStatus: order.paymentStatus as CustomerOrder["paymentStatus"],
    paidAt: order.paidAt as string | null, releasedAt: order.releasedAt as string | null, subtotalToman: order.subtotalToman,
    reservedUntil: order.reservedUntil, createdAt: order.createdAt,
    shippingAddress: { recipientName: address.recipientName as string, recipientPhone: address.recipientPhone as string,
      province: address.province as string, city: address.city as string, postalCode: address.postalCode as string, fullAddress: address.fullAddress as string },
    items: items as CustomerOrder["items"], preparation: groups };
}

export type CustomerOrderPage = { page: number; pageSize: number; hasMore: boolean; items: CustomerOrder[] };
export function parseCustomerOrderPage(value: unknown, page: number, pageSize: number): CustomerOrderPage | null {
  const result = record(value);
  if (!result || result.page !== page || result.pageSize !== pageSize || typeof result.hasMore !== "boolean" || !Array.isArray(result.items) || result.items.length > pageSize) return null;
  const items = result.items.map(parseCustomerOrder);
  if (items.some(item => item === null)) return null;
  const orders = items as CustomerOrder[];
  if (new Set(orders.map(order => order.id.toLowerCase())).size !== orders.length) return null;
  return { page, pageSize, hasMore: result.hasMore, items: orders };
}

export function formatToman(value: string) {
  return money(value) ? `${new Intl.NumberFormat("fa-IR").format(BigInt(value))} تومان` : "—";
}
