declare const __DEV__: boolean;

const rawApiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim() ?? "";

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string | null,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function getApiBaseUrl(): string | null {
  if (!rawApiBaseUrl) return null;
  try {
    const url = new URL(rawApiBaseUrl);
    if (url.username || url.password || url.search || url.hash || (url.pathname !== "/" && url.pathname !== "")) return null;
    if (url.protocol !== "https:" && !__DEV__) return null;
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

function apiErrorCode(value: unknown): string | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const error = (value as Record<string, unknown>).error;
  if (!error || typeof error !== "object" || Array.isArray(error)) return null;
  const code = (error as Record<string, unknown>).code;
  return typeof code === "string" && code.length > 0 ? code : null;
}

export async function apiJson(
  path: string,
  token: string | null,
  init: RequestInit = {}
): Promise<unknown> {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) throw new ApiError(0, "api-base-url-missing", "آدرس امن API برای اپلیکیشن تنظیم نشده است.");
  if (!path.startsWith("/api/v1/")) throw new ApiError(0, "invalid-api-path", "مسیر درخواست API معتبر نیست.");

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(token ? { Authorization: "Bearer " + token } : {}),
    ...(init.body === undefined ? {} : { "Content-Type": "application/json" }),
    ...(init.headers && !(init.headers instanceof Headers) && !Array.isArray(init.headers)
      ? init.headers as Record<string, string>
      : {})
  };
  const response = await fetch(baseUrl + path, { ...init, headers });
  if (response.status === 204) {
    if (!response.ok) throw new ApiError(response.status, null, "درخواست در سرور تأیید نشد.");
    return null;
  }

  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const code = apiErrorCode(payload);
    const message = response.status === 401
      ? "نشست معتبر نیست؛ دوباره وارد شوید."
      : response.status === 403
        ? "این عملیات برای نقش فعال مجاز نیست."
        : response.status === 503
          ? "سرویس ارسال کد ورود هنوز فعال نشده است."
          : response.status === 429
            ? "تعداد درخواست‌ها زیاد است؛ کمی صبر کنید."
          : response.status === 409
          ? "اطلاعات تغییر کرده است؛ ابتدا وضعیت تازه را دریافت کنید."
          : "درخواست از سرور تأیید نشد.";
    throw new ApiError(response.status, code, message);
  }
  if (payload === null) throw new ApiError(response.status, "invalid-json-response", "پاسخ API معتبر نیست.");
  return payload;
}
