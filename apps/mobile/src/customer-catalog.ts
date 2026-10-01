export type CustomerCatalogItem = {
  id: string;
  title: string;
  description: string | null;
  priceToman: string;
  updatedAt: string;
  media: Array<{ id: string; contentType: string; readUrl: string }>;
};

export type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;
const androidEmulatorApi = "http://10.0.2.2:4000";

export function getCustomerApiBaseUrl(value: string | undefined): string {
  return (value?.trim() || androidEmulatorApi).replace(/\/+$/, "");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseItem(value: unknown): CustomerCatalogItem | null {
  if (!isRecord(value) || typeof value.id !== "string" || typeof value.title !== "string" ||
      typeof value.priceToman !== "string" || !/^\d+$/.test(value.priceToman) ||
      !(typeof value.description === "string" || value.description === null) ||
      typeof value.updatedAt !== "string" || !Array.isArray(value.media)) return null;

  const media = value.media.map((entry) => {
    if (!isRecord(entry) || typeof entry.id !== "string" || typeof entry.contentType !== "string" ||
        typeof entry.readUrl !== "string") return null;
    try {
      const url = new URL(entry.readUrl);
      if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    } catch { return null; }
    return { id: entry.id, contentType: entry.contentType, readUrl: entry.readUrl };
  });
  if (media.some((entry) => entry === null)) return null;

  return {
    id: value.id,
    title: value.title,
    description: value.description,
    priceToman: value.priceToman,
    updatedAt: value.updatedAt,
    media: media as CustomerCatalogItem["media"]
  };
}

export function parseCustomerCatalog(payload: unknown): CustomerCatalogItem[] | null {
  if (!Array.isArray(payload)) return null;
  const items = payload.map(parseItem);
  return items.some((item) => item === null) ? null : items as CustomerCatalogItem[];
}

export async function fetchCustomerCatalog(baseUrl: string, fetcher: FetchLike = fetch): Promise<CustomerCatalogItem[]> {
  const response = await fetcher(`${baseUrl}/api/v1/customer/catalog`, {
    method: "GET",
    headers: { Accept: "application/json" }
  });
  if (!response.ok) throw new Error("catalog-unavailable");
  const items = parseCustomerCatalog(await response.json() as unknown);
  if (!items) throw new Error("catalog-invalid-response");
  return items;
}

export function normalizeSearchText(value: string): string {
  return value.normalize("NFKC")
    .replace(/[\u064A\u0649]/g, "ی")
    .replace(/\u0643/g, "ک")
    .replace(/[\u200c\u200f\u202a-\u202e]/g, "")
    .replace(/\s+/g, " ").trim().toLocaleLowerCase("fa-IR");
}

export function searchCustomerCatalog(items: CustomerCatalogItem[], query: string): CustomerCatalogItem[] {
  const term = normalizeSearchText(query);
  return term ? items.filter((item) => normalizeSearchText(`${item.title} ${item.description ?? ""}`).includes(term)) : items;
}

export function formatToman(value: string): string {
  try { return `${new Intl.NumberFormat("fa-IR").format(BigInt(value))} تومان`; }
  catch { return "قیمت ناموجود"; }
}
