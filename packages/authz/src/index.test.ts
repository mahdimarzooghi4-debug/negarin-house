import { describe, expect, it } from "vitest";
import {
  canEditArtistProduct,
  canReadArtistDomesticFinance,
  canReadCorporateOrder,
  canReadSupportRelationship,
  canAccessStaffDomain,
  canReadServiceRequest,
  denyByDefault,
  roles,
  type AuthorizationContext
} from "./index.js";

describe("authorization foundation", () => {
  it("contains exactly the current canonical roles", () => {
    expect(roles).toEqual([
      "customer",
      "artist",
      "staff",
      "service-partner",
      "supporting-organization",
      "corporate-buyer",
      "export-partner"
    ]);
  });

  it("denies by default", () => {
    expect(denyByDefault()).toEqual({ allowed: false, reason: "forbidden" });
  });
});

describe("server-side relationship policies", () => {
  const context = (activeRole: AuthorizationContext["activeRole"], overrides: Partial<AuthorizationContext> = {}): AuthorizationContext => ({
    userId: "user-a",
    activeRole,
    ...overrides
  });

  it("allows an Artist to edit only their own product", () => {
    expect(canEditArtistProduct(context("artist"), { artistUserId: "user-a" })).toEqual({ allowed: true });
    expect(canEditArtistProduct(context("artist"), { artistUserId: "user-b" })).toEqual({ allowed: false, reason: "not-found" });
    expect(canEditArtistProduct(context("staff", { staffPermissionDomains: ["products"] }), { artistUserId: "user-a" })).toEqual({ allowed: false, reason: "forbidden" });
  });

  it("isolates Corporate Buyer orders by organization", () => {
    const order = { buyerOrganizationId: "buyer-a" };
    expect(canReadCorporateOrder(context("corporate-buyer", { organizationId: "buyer-a" }), order)).toEqual({ allowed: true });
    expect(canReadCorporateOrder(context("corporate-buyer", { organizationId: "buyer-b" }), order)).toEqual({ allowed: false, reason: "not-found" });
    expect(canReadCorporateOrder(context("corporate-buyer"), order)).toEqual({ allowed: false, reason: "not-found" });
    for (const role of roles.filter((candidate) => candidate !== "corporate-buyer")) {
      expect(canReadCorporateOrder(context(role, { organizationId: "buyer-a" }), order)).toEqual({
        allowed: false,
        reason: "forbidden"
      });
    }
  });

  it("allows a Supporting Organization to read only its persisted support relationships", () => {
    const relationship = { supportingOrganizationId: "support-org-a" };
    expect(canReadSupportRelationship(context("supporting-organization", { organizationId: "support-org-a" }), relationship)).toEqual({ allowed: true });
    expect(canReadSupportRelationship(context("supporting-organization", { organizationId: "support-org-b" }), relationship)).toEqual({ allowed: false, reason: "not-found" });
    expect(canReadSupportRelationship(context("supporting-organization"), relationship)).toEqual({ allowed: false, reason: "not-found" });
    expect(canReadSupportRelationship(context("artist", { userId: "artist-a", organizationId: "support-org-a" }), relationship)).toEqual({ allowed: false, reason: "forbidden" });
    expect(canReadSupportRelationship(context("staff", { staffPermissionDomains: ["reports"], organizationId: "support-org-a" }), relationship)).toEqual({ allowed: false, reason: "forbidden" });
  });

  it("requires an actual Service Partner assignment", () => {
    const partner = context("service-partner", { organizationId: "partner-a" });
    expect(canReadServiceRequest(partner, { assignedPartnerOrganizationId: "partner-a" })).toEqual({ allowed: true });
    expect(canReadServiceRequest(partner, { assignedPartnerOrganizationId: "partner-b" })).toEqual({ allowed: false, reason: "not-found" });
    expect(canReadServiceRequest(partner, { assignedPartnerOrganizationId: null })).toEqual({ allowed: false, reason: "not-found" });
    expect(canReadServiceRequest(partner, { assignedPartnerOrganizationId: "partner-a", assignedPartnerUserId: "user-b" })).toEqual({ allowed: false, reason: "not-found" });
    expect(canReadServiceRequest(partner, { assignedPartnerOrganizationId: "partner-a", assignedPartnerUserId: "user-a" })).toEqual({ allowed: true });
  });

  it("requires organization context and denies the same assignment to every other role", () => {
    const assignment = { assignedPartnerOrganizationId: "partner-a", assignedPartnerUserId: "user-a" };
    expect(canReadServiceRequest(context("service-partner"), assignment)).toEqual({ allowed: false, reason: "not-found" });

    for (const role of roles.filter((candidate) => candidate !== "service-partner")) {
      expect(canReadServiceRequest(context(role, { organizationId: "partner-a" }), assignment)).toEqual({
        allowed: false,
        reason: "forbidden"
      });
    }
  });

  it("keeps domestic Artist finance private and checks staff finance permission", () => {
    const finance = { artistUserId: "user-a" };
    expect(canReadArtistDomesticFinance(context("artist"), finance)).toEqual({ allowed: true });
    expect(canReadArtistDomesticFinance(context("artist", { userId: "user-b" }), finance)).toEqual({ allowed: false, reason: "not-found" });
    expect(canReadArtistDomesticFinance(context("supporting-organization", { organizationId: "org-a" }), finance)).toEqual({ allowed: false, reason: "forbidden" });
    expect(canReadArtistDomesticFinance(context("export-partner", { exportPartnerId: "partner-a" }), finance)).toEqual({ allowed: false, reason: "forbidden" });
    expect(canReadArtistDomesticFinance(context("staff", { staffPermissionDomains: ["artists"] }), finance)).toEqual({ allowed: false, reason: "forbidden" });
    expect(canReadArtistDomesticFinance(context("staff", { staffPermissionDomains: ["finance"] }), finance)).toEqual({ allowed: true });
  });

  it("denies external roles and staff without a required permission domain", () => {
    expect(canAccessStaffDomain(context("corporate-buyer"), "artists")).toEqual({ allowed: false, reason: "forbidden" });
    expect(canAccessStaffDomain(context("staff", { staffPermissionDomains: [] }), "artists")).toEqual({ allowed: false, reason: "forbidden" });
    expect(canAccessStaffDomain(context("staff", { staffPermissionDomains: ["artists"] }), "artists")).toEqual({ allowed: true });
  });
});
