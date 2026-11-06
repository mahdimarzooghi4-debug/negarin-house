import { apiJson } from "../api/client";

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type IdentityGrant = {
  id: string;
  role: string;
  organizationId: string | null;
  exportPartnerId: string | null;
};

export type IdentityContext = {
  userId: string;
  activeRole: string;
  organizationId?: string;
  exportPartnerId?: string;
  staffPermissionDomains?: string[];
};

export type ArtistAccess =
  | { kind: "ready"; context: IdentityContext }
  | { kind: "choose"; grants: IdentityGrant[] }
  | { kind: "missing" };

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("پاسخ سرویس هویت معتبر نیست.");
  return value as Record<string, unknown>;
}

function parseGrantDiscovery(value: unknown): { activeGrantId: string | null; grants: IdentityGrant[] } {
  const root = record(value);
  if (!(root.activeGrantId === null || (typeof root.activeGrantId === "string" && uuid.test(root.activeGrantId))) || !Array.isArray(root.grants)) {
    throw new Error("فهرست دسترسی‌های حساب معتبر نیست.");
  }
  const grants = root.grants.map((raw) => {
    const item = record(raw);
    if (typeof item.id !== "string" || !uuid.test(item.id) || typeof item.role !== "string" ||
      !(item.organizationId === null || typeof item.organizationId === "string") ||
      !(item.exportPartnerId === null || typeof item.exportPartnerId === "string")) {
      throw new Error("یکی از دسترسی‌های حساب معتبر نیست.");
    }
    return {
      id: item.id,
      role: item.role,
      organizationId: item.organizationId as string | null,
      exportPartnerId: item.exportPartnerId as string | null
    };
  });
  if (new Set(grants.map((grant) => grant.id.toLowerCase())).size !== grants.length) {
    throw new Error("فهرست دسترسی‌های حساب تکراری است.");
  }
  return { activeGrantId: root.activeGrantId as string | null, grants };
}

export function parseIdentityContext(value: unknown): IdentityContext {
  const root = record(value);
  if (typeof root.userId !== "string" || !uuid.test(root.userId) || typeof root.activeRole !== "string") {
    throw new Error("زمینه دسترسی حساب معتبر نیست.");
  }
  return {
    userId: root.userId,
    activeRole: root.activeRole,
    ...(typeof root.organizationId === "string" ? { organizationId: root.organizationId } : {}),
    ...(typeof root.exportPartnerId === "string" ? { exportPartnerId: root.exportPartnerId } : {}),
    ...(Array.isArray(root.staffPermissionDomains) && root.staffPermissionDomains.every((item) => typeof item === "string")
      ? { staffPermissionDomains: root.staffPermissionDomains as string[] }
      : {})
  };
}

export async function discoverArtistAccess(token: string): Promise<ArtistAccess> {
  const discovery = parseGrantDiscovery(await apiJson("/api/v1/identity/grants", token));
  const artistGrants = discovery.grants.filter((grant) => grant.role === "artist");
  if (discovery.activeGrantId) {
    const active = discovery.grants.find((grant) => grant.id === discovery.activeGrantId);
    if (active?.role === "artist") {
      const context = parseIdentityContext(await apiJson("/api/v1/identity/context", token));
      if (context.activeRole !== "artist") throw new Error("نقش فعال نشست با دسترسی هنرمند تطابق ندارد.");
      return { kind: "ready", context };
    }
  }
  return artistGrants.length > 0 ? { kind: "choose", grants: artistGrants } : { kind: "missing" };
}

export async function selectArtistGrant(token: string, grantId: string): Promise<IdentityContext> {
  if (!uuid.test(grantId)) throw new Error("شناسه دسترسی هنرمند معتبر نیست.");
  const context = parseIdentityContext(await apiJson("/api/v1/identity/context/select", token, {
    method: "POST",
    body: JSON.stringify({ grantId })
  }));
  if (context.activeRole !== "artist") throw new Error("سرور نقش هنرمند را برای این نشست فعال نکرد.");
  return context;
}
