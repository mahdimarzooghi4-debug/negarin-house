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
