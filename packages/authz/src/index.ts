export const roles = [
  "customer",
  "artist",
  "staff",
  "service-partner",
  "supporting-organization",
  "corporate-buyer",
  "export-partner"
] as const;

export type Role = (typeof roles)[number];

export type StaffPermissionDomain =
  | "artists"
  | "products"
  | "orders"
  | "services"
  | "growth"
  | "opportunities"
  | "finance"
  | "international"
  | "reports"
  | "settings";

export type AuthorizationContext = {
  userId: string;
  activeRole: Role;
  organizationId?: string;
  exportPartnerId?: string;
  staffPermissionDomains?: readonly StaffPermissionDomain[];
};

export type AuthorizationDecision =
  | { allowed: true }
  | { allowed: false; reason: "forbidden" | "not-found" };

export type Policy<Resource, Action extends string> = (
  context: AuthorizationContext,
  resource: Resource,
  action: Action
) => AuthorizationDecision;

export function denyByDefault(): AuthorizationDecision {
  return { allowed: false, reason: "forbidden" };
}

const allow: AuthorizationDecision = { allowed: true };
const conceal: AuthorizationDecision = { allowed: false, reason: "not-found" };

/** Inputs are resolved from a trusted session and server-side resource query. */
export function canEditArtistProduct(
  context: AuthorizationContext,
  product: Readonly<{ artistUserId: string }>
): AuthorizationDecision {
  if (context.activeRole !== "artist") return denyByDefault();
  return context.userId === product.artistUserId ? allow : conceal;
}

export function canReadCorporateOrder(
  context: AuthorizationContext,
  order: Readonly<{ buyerOrganizationId: string }>
): AuthorizationDecision {
  if (context.activeRole !== "corporate-buyer") return denyByDefault();
  return context.organizationId === order.buyerOrganizationId ? allow : conceal;
}

/**
 * The resource must already be a persisted SupportRelationship selected by a
 * server-side query. A matching organization may read that relationship only;
 * this policy does not grant Artist administration or finance access.
 */
export function canReadSupportRelationship(
  context: AuthorizationContext,
  relationship: Readonly<{ supportingOrganizationId: string }>
): AuthorizationDecision {
  if (context.activeRole !== "supporting-organization") return denyByDefault();
  return context.organizationId === relationship.supportingOrganizationId ? allow : conceal;
}

export function canReadServiceRequest(
  context: AuthorizationContext,
  request: Readonly<{
    assignedPartnerOrganizationId: string | null;
    assignedPartnerUserId?: string | null;
  }>
): AuthorizationDecision {
  if (context.activeRole !== "service-partner") return denyByDefault();
  return context.organizationId &&
    context.organizationId === request.assignedPartnerOrganizationId &&
    (!request.assignedPartnerUserId || context.userId === request.assignedPartnerUserId)
    ? allow
    : conceal;
}

export function canReadArtistDomesticFinance(
  context: AuthorizationContext,
  finance: Readonly<{ artistUserId: string }>
): AuthorizationDecision {
  if (context.activeRole === "artist") {
    return context.userId === finance.artistUserId ? allow : conceal;
  }
  if (context.activeRole === "staff") {
    return context.staffPermissionDomains?.includes("finance") ? allow : denyByDefault();
  }
  return denyByDefault();
}

export function canAccessStaffDomain(
  context: AuthorizationContext,
  domain: StaffPermissionDomain
): AuthorizationDecision {
  return context.activeRole === "staff" && context.staffPermissionDomains?.includes(domain)
    ? allow
    : denyByDefault();
}
