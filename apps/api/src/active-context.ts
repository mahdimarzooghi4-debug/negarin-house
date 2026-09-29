import type { AuthorizationContext, Role, StaffPermissionDomain } from "@negarin/authz";
import { hashSessionToken } from "./identity-core.js";
import type { PrismaService } from "./prisma.service.js";

const roleMap = {
  customer: "customer",
  artist: "artist",
  staff: "staff",
  service_partner: "service-partner",
  supporting_organization: "supporting-organization",
  corporate_buyer: "corporate-buyer",
  export_partner: "export-partner"
} as const satisfies Record<string, Role>;

const staffDomains: readonly StaffPermissionDomain[] = [
  "artists", "products", "orders", "services", "growth", "opportunities",
  "finance", "international", "reports", "settings"
];

type Grant = {
  userId: string;
  role: keyof typeof roleMap;
  organizationId: string | null;
  organization: { kind: "service_partner" | "supporting_organization" | "corporate_buyer" } | null;
  exportPartnerId: string | null;
  revokedAt: Date | null;
  staffDomains: Array<{ domain: string }>;
};

function contextFromGrant(grant: Grant): AuthorizationContext | null {
  if (grant.revokedAt) return null;
  const activeRole = roleMap[grant.role];
  const organizationKinds = {
    "service-partner": "service_partner",
    "supporting-organization": "supporting_organization",
    "corporate-buyer": "corporate_buyer"
  } as const;
  const expectedOrganizationKind = organizationKinds[activeRole as keyof typeof organizationKinds];

  if (expectedOrganizationKind) {
    if (!grant.organizationId || grant.exportPartnerId || grant.organization?.kind !== expectedOrganizationKind) return null;
    return { userId: grant.userId, activeRole, organizationId: grant.organizationId };
  }
  if (activeRole === "export-partner") {
    if (!grant.exportPartnerId || grant.organizationId) return null;
    return { userId: grant.userId, activeRole, exportPartnerId: grant.exportPartnerId };
  }
  if (grant.organizationId || grant.exportPartnerId) return null;
  if (activeRole === "staff") {
    const domains = grant.staffDomains.map(({ domain }) => domain);
    if (domains.some((domain) => !staffDomains.includes(domain as StaffPermissionDomain))) return null;
    return { userId: grant.userId, activeRole, staffPermissionDomains: domains as StaffPermissionDomain[] };
  }
  return { userId: grant.userId, activeRole };
}

/** Grant administration has no public endpoint. Context is re-read on every protected request. */
export class ActiveContextResolver {
  constructor(private readonly database: PrismaService) {}

  async resolve(token: string, now = new Date()): Promise<AuthorizationContext | null> {
    if (!token) return null;
    const session = await this.database.authSession.findUnique({
      where: { tokenHash: hashSessionToken(token) }
    });
    if (!session || session.revokedAt || session.expiresAt <= now || !session.activeGrantId) return null;

    const grant = await this.database.roleGrant.findFirst({
      where: { id: session.activeGrantId, userId: session.userId, revokedAt: null },
      include: { staffDomains: true, organization: { select: { kind: true } } }
    });
    return grant ? contextFromGrant(grant) : null;
  }

  async select(token: string, grantId: string, now = new Date()): Promise<AuthorizationContext | null> {
    if (!token || !grantId) return null;
    const tokenHash = hashSessionToken(token);
    const session = await this.database.authSession.findUnique({ where: { tokenHash } });
    if (!session || session.revokedAt || session.expiresAt <= now) return null;

    const grant = await this.database.roleGrant.findFirst({
      where: { id: grantId, userId: session.userId, revokedAt: null },
      include: { staffDomains: true, organization: { select: { kind: true } } }
    });
    const context = grant ? contextFromGrant(grant) : null;
    if (!context) return null;

    const updated = await this.database.authSession.updateMany({
      where: { id: session.id, revokedAt: null, expiresAt: { gt: now } },
      data: { activeGrantId: grantId }
    });
    if (updated.count !== 1) return null;
    return this.resolve(token, now);
  }
}
