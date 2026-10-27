const DEFAULT_API_ORIGIN = "http://localhost:4000";
type Environment = Readonly<Record<string, string | undefined>>;
export const NEGARIN_SESSION_COOKIE = "negarin_session";
const SESSION_TOKEN = /^[A-Za-z0-9_-]{43}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function apiOrigin(environment: Environment = process.env): string {
  const raw = environment.NEGARIN_API_URL || DEFAULT_API_ORIGIN;
  const url = new URL(raw);
  if (!["http:", "https:"].includes(url.protocol) ||
      url.username || url.password || url.search || url.hash ||
      (url.pathname !== "/" && url.pathname !== "")) {
    throw new Error("NEGARIN_API_URL must be an http(s) origin without credentials, path, query or fragment");
  }
  return url.origin;
}

export function isSessionToken(value: unknown): value is string {
  return typeof value === "string" && SESSION_TOKEN.test(value);
}

export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID.test(value);
}

export function isSameOriginMutation(originHeader: string | null, requestOrigin: string): boolean {
  if (!originHeader) return false;
  try {
    return new URL(originHeader).origin === new URL(requestOrigin).origin;
  } catch {
    return false;
  }
}


export function apiUrl(path: string, environment: Environment = process.env): string {
  if (!path.startsWith("/api/v1/") || path.includes("\\") || /\s/.test(path)) {
    throw new Error("Only explicit Negarin API v1 paths may be proxied");
  }
  const origin = apiOrigin(environment);
  const url = new URL(path, origin);
  if (url.origin !== origin || !url.pathname.startsWith("/api/v1/")) {
    throw new Error("Invalid Negarin API path");
  }
  return url.toString();
}

export async function negarinFetch(
  path: string,
  sessionToken: string,
  init: RequestInit = {},
  requestId?: string | null
): Promise<Response> {
  if (!isSessionToken(sessionToken)) throw new Error("Invalid session token");
  const headers = new Headers(init.headers);
  headers.set("authorization", `Bearer ${sessionToken}`);
  headers.set("accept", "application/json");
  if (init.body != null && !headers.has("content-type")) headers.set("content-type", "application/json");
  if (requestId) headers.set("x-request-id", requestId);
  return fetch(apiUrl(path), {
    ...init,
    headers,
    cache: "no-store",
    redirect: "manual"
  });
}

export function devSessionAttachEnabled(environment: Environment = process.env): boolean {
  return environment.NODE_ENV !== "production" && environment.NEGARIN_DEV_SESSION_ATTACH === "1";
}

export function sessionCookieOptions(environment: Environment = process.env) {
  return {
    httpOnly: true,
    secure: environment.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 24 * 60 * 60
  };
}
