export type IdentityContext = {
  userId: string;
  activeRole: string;
  organizationId?: string;
};

export type IdentityGrant = {
  id: string;
  role: string;
  organizationId: string | null;
  exportPartnerId: string | null;
};

function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function nullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

export function parseIdentityContext(value: unknown): IdentityContext | null {
  const context = record(value);
  if (!context || typeof context.userId !== "string" || typeof context.activeRole !== "string") return null;
  if (context.organizationId !== undefined && typeof context.organizationId !== "string") return null;
  return {
    userId: context.userId,
    activeRole: context.activeRole,
    ...(typeof context.organizationId === "string" ? { organizationId: context.organizationId } : {})
  };
}

export function isCorporateContext(context: IdentityContext): boolean {
  return context.activeRole === "corporate-buyer" && typeof context.organizationId === "string" && context.organizationId.length > 0;
}

export function parseCorporateGrantOptions(value: unknown): IdentityGrant[] | null {
  const payload = record(value);
  if (!payload || !Array.isArray(payload.grants)) return null;

  const grants: IdentityGrant[] = [];
  for (const raw of payload.grants) {
    const grant = record(raw);
    if (!grant || typeof grant.id !== "string" || typeof grant.role !== "string" ||
      !nullableString(grant.organizationId) || !nullableString(grant.exportPartnerId)) return null;
    if (grant.role === "corporate_buyer" && grant.organizationId) {
      grants.push({
        id: grant.id,
        role: grant.role,
        organizationId: grant.organizationId,
        exportPartnerId: grant.exportPartnerId
      });
    }
  }
  return grants;
}
