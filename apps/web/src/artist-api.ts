import { cookies } from "next/headers";

export type ArtistProduct = {
  id: string;
  title: string;
  description: string | null;
  priceToman: string;
  publicationStatus: "draft" | "under_review" | "changes_requested" | "approved" | "published";
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

const sessionCookieName = "negarin_session";

function apiOrigin() {
  const value = process.env.NEGARIN_API_URL ?? "http://127.0.0.1:4000";
  return new URL(value).origin;
}

export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  return origin !== null && origin === new URL(request.url).origin;
}

export async function requestArtistApi(path: string, init: RequestInit = {}) {
  const session = (await cookies()).get(sessionCookieName)?.value;
  if (!session) return { status: 401, data: null } as const;

  try {
    const headers = new Headers(init.headers);
    headers.set("Authorization", `Bearer ${session}`);
    if (init.body) headers.set("Content-Type", "application/json");
    const response = await fetch(`${apiOrigin()}/api/v1/${path.replace(/^\//, "")}`, {
      ...init,
      cache: "no-store",
      headers
    });
    const data = response.ok && response.status !== 204 ? await response.json() as unknown : null;
    return { status: response.status, data } as const;
  } catch {
    return { status: 503, data: null } as const;
  }
}

export async function loadArtistProducts() {
  const result = await requestArtistApi("artist/products?includeArchived=true");
  if (result.status === 200 && Array.isArray(result.data)) {
    return { kind: "ready", products: result.data as ArtistProduct[] } as const;
  }
  if (result.status === 401 || result.status === 403) return { kind: "connection-required" } as const;
  return { kind: "unavailable" } as const;
}
