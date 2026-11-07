import { apiJson } from "../api/client";
export type Profile = { version: number; displayName: string; phone: string };
const invalidName = /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u;
export function parseProfile(value: unknown): Profile {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("اطلاعات حساب معتبر نیست.");
  const p = value as Record<string, unknown>;
  if (!Number.isInteger(p.version) || Number(p.version) < 0 || Number(p.version) > 2147483647 ||
    typeof p.displayName !== "string" || p.displayName.length > 100 || p.displayName !== p.displayName.trim() || invalidName.test(p.displayName) ||
    typeof p.phone !== "string" || !/^\+[1-9]\d{7,14}$/.test(p.phone)) throw new Error("اطلاعات حساب معتبر نیست.");
  return { version: Number(p.version), displayName: p.displayName, phone: p.phone };
}
export function profileCommand(profile: Profile, name: string): { version: number; displayName: string } {
  const displayName = name.trim();
  if (!displayName || displayName.length > 100 || invalidName.test(displayName) || profile.version >= 2147483647) throw new Error("نام را با حداکثر ۱۰۰ نویسه وارد کنید.");
  return { version: profile.version, displayName };
}
export async function readProfile(token: string, signal?: AbortSignal): Promise<Profile> {
  return parseProfile(await apiJson("/api/v1/customer/profile", token, { signal }));
}
export async function saveProfile(token: string, profile: Profile, name: string): Promise<Profile> {
  const command = profileCommand(profile, name);
  const result = parseProfile(await apiJson("/api/v1/customer/profile", token, { method: "PUT", body: JSON.stringify(command) }));
  if (result.version !== profile.version + 1 || result.displayName !== command.displayName || result.phone !== profile.phone) throw new Error("نتیجه ذخیره نیاز به بررسی دوباره دارد.");
  const fresh = await readProfile(token);
  if (fresh.version !== result.version || fresh.displayName !== result.displayName || fresh.phone !== result.phone) throw new Error("اطلاعات حساب تغییر کرده است؛ تازه‌سازی کنید.");
  return fresh;
}
