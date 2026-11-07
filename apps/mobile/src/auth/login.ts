import { apiJson } from "../api/client";

export function normalizePhone(input: string): string | null {
  const digits = input.trim().replace(/[۰-۹٠-٩]/g, digit => String("۰۱۲۳۴۵۶۷۸۹".includes(digit) ? "۰۱۲۳۴۵۶۷۸۹".indexOf(digit) : "٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
  if (/^09\d{9}$/.test(digits)) return "+98" + digits.slice(1);
  return /^\+989\d{9}$/.test(digits) ? digits : null;
}

export function normalizeCode(input: string): string {
  return input.replace(/[۰-۹٠-٩]/g, digit => String("۰۱۲۳۴۵۶۷۸۹".includes(digit) ? "۰۱۲۳۴۵۶۷۸۹".indexOf(digit) : "٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

export async function requestLogin(phone: string): Promise<void> {
  const result = await apiJson("/api/v1/identity/otp/request", null, { method: "POST", body: JSON.stringify({ phone }) });
  if (!result || typeof result !== "object" || !("retryAfterSeconds" in result) || result.retryAfterSeconds !== 60) throw new Error("پاسخ درخواست ورود معتبر نیست.");
}

export async function verifyLogin(phone: string, code: string): Promise<string> {
  const result = await apiJson("/api/v1/identity/otp/verify", null, { method: "POST", body: JSON.stringify({ phone, code }) });
  if (!result || typeof result !== "object" || !("sessionToken" in result) || typeof result.sessionToken !== "string" || !/^[A-Za-z0-9_-]{43}$/.test(result.sessionToken)) throw new Error("نشست دریافتی معتبر نیست.");
  return result.sessionToken;
}
