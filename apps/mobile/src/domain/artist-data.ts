export type ArtistProduct = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  priceToman: string;
  publicationStatus: "draft" | "under_review" | "changes_requested" | "approved" | "published";
  version: number;
  inventoryVersion: number;
  stockQuantity: number;
  availability: "in_stock" | "out_of_stock";
  archivedAt: string | null;
  updatedAt: string;
  imageIds: string[];
};

export type ArtistOrderStatus = "awaiting_acceptance" | "accepted" | "preparing" | "packaging" | "ready_for_dispatch";
export type ArtistOrder = {
  orderId: string;
  status: ArtistOrderStatus;
  version: number;
  createdAt: string;
  updatedAt: string;
  shipment: unknown;
  merchandiseSubtotalToman: string;
  items: Array<{
    productId: string;
    title: string;
    quantity: number;
    unitPriceToman: string;
    imageIds: string[];
  }>;
};
export type ArtistOrdersPage = { page: number; pageSize: number; hasMore: boolean; items: ArtistOrder[] };

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const productStates = new Set(["draft", "under_review", "changes_requested", "approved", "published"]);
const orderStates: ArtistOrderStatus[] = ["awaiting_acceptance", "accepted", "preparing", "packaging", "ready_for_dispatch"];

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}
function validVersion(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) >= 0 && Number(value) <= 2_147_483_647;
}
function canonicalDate(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString() === value;
}
function decimalString(value: unknown, allowZero = false): value is string {
  return typeof value === "string" && (allowZero ? /^(0|[1-9][0-9]*)$/ : /^[1-9][0-9]*$/).test(value);
}

export function parseArtistProduct(value: unknown): ArtistProduct | null {
  const product = record(value);
  if (!product || typeof product.id !== "string" || !uuid.test(product.id) ||
    typeof product.title !== "string" || !product.title.trim() ||
    !(product.description === null || typeof product.description === "string") ||
    !(product.category === null || typeof product.category === "string") ||
    !decimalString(product.priceToman) || product.priceToman.length > 19 ||
    BigInt(product.priceToman) > 9_223_372_036_854_775_807n ||
    !productStates.has(String(product.publicationStatus)) ||
    !validVersion(product.version) || !validVersion(product.inventoryVersion) || !validVersion(product.stockQuantity) ||
    !(product.availability === "in_stock" || product.availability === "out_of_stock") ||
    (product.stockQuantity === 0) !== (product.availability === "out_of_stock") ||
    !(product.archivedAt === null || canonicalDate(product.archivedAt)) || !canonicalDate(product.updatedAt) ||
    !Array.isArray(product.imageIds) || !product.imageIds.every((id) => typeof id === "string" && uuid.test(id)) ||
    new Set(product.imageIds.map((id) => String(id).toLowerCase())).size !== product.imageIds.length) return null;

  return {
    id: product.id,
    title: product.title,
    description: product.description as string | null,
    category: product.category as string | null,
    priceToman: product.priceToman,
    publicationStatus: product.publicationStatus as ArtistProduct["publicationStatus"],
    version: product.version,
    inventoryVersion: product.inventoryVersion,
    stockQuantity: product.stockQuantity,
    availability: product.availability,
    archivedAt: product.archivedAt as string | null,
    updatedAt: product.updatedAt,
    imageIds: product.imageIds as string[]
  };
}

export function parseArtistProducts(value: unknown): ArtistProduct[] | null {
  if (!Array.isArray(value)) return null;
  const products = value.map(parseArtistProduct);
  if (products.some((product) => product === null)) return null;
  const result = products as ArtistProduct[];
  return new Set(result.map((product) => product.id.toLowerCase())).size === result.length ? result : null;
}

export function parseArtistOrders(value: unknown): ArtistOrdersPage | null {
  const root = record(value);
  if (!root || !Array.isArray(root.items) || typeof root.hasMore !== "boolean" ||
    !validVersion(root.page) || root.page < 1 || root.page > 1000 ||
    !validVersion(root.pageSize) || root.pageSize < 1 || root.pageSize > 50) return null;

  const orders: ArtistOrder[] = [];
  for (const rawOrder of root.items) {
    const order = record(rawOrder);
    if (!order || typeof order.orderId !== "string" || !uuid.test(order.orderId) ||
      !orderStates.includes(order.status as ArtistOrderStatus) || !validVersion(order.version) ||
      !canonicalDate(order.createdAt) || !canonicalDate(order.updatedAt) ||
      !decimalString(order.merchandiseSubtotalToman, true) || !Array.isArray(order.items)) return null;

    const items: ArtistOrder["items"] = [];
    for (const rawItem of order.items) {
      const item = record(rawItem);
      if (!item || typeof item.productId !== "string" || !uuid.test(item.productId) ||
        typeof item.title !== "string" || !Number.isSafeInteger(item.quantity) || Number(item.quantity) < 1 ||
        !decimalString(item.unitPriceToman) || !Array.isArray(item.imageIds) ||
        !item.imageIds.every((id) => typeof id === "string" && uuid.test(id))) return null;
      items.push({
        productId: item.productId,
        title: item.title,
        quantity: Number(item.quantity),
        unitPriceToman: item.unitPriceToman,
        imageIds: item.imageIds as string[]
      });
    }
    orders.push({
      orderId: order.orderId,
      status: order.status as ArtistOrderStatus,
      version: order.version,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      shipment: order.shipment,
      merchandiseSubtotalToman: order.merchandiseSubtotalToman,
      items
    });
  }

  if (new Set(orders.map((order) => order.orderId.toLowerCase())).size !== orders.length) return null;
  return { page: root.page, pageSize: root.pageSize, hasMore: root.hasMore, items: orders };
}

export function formatToman(value: string): string {
  if (!decimalString(value, true)) return "—";
  return new Intl.NumberFormat("fa-IR").format(BigInt(value)) + " تومان";
}

export function formatPersianDate(value: string): string {
  return new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "long" }).format(new Date(value));
}
