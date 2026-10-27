import { describe, expect, it } from "vitest";
import type { PrismaService } from "./prisma.service.js";
import {
  CorporateProcurementService, parseCorporatePurchaseRequestCreate, parseCorporatePurchaseRequestSubmit, requireCorporateBuyer
} from "./corporate-procurement.js";

const a = "00000000-0000-4000-8000-000000000001";
const b = "00000000-0000-4000-8000-000000000002";

describe("Corporate procurement contracts", () => {
  it("accepts only product identity and quantity and canonicalizes item order", () => {
    expect(parseCorporatePurchaseRequestCreate({
      idempotencyKey: a,
      items: [{ productId: b, quantity: 2 }, { productId: a, quantity: 1 }]
    })).toEqual({
      idempotencyKey: a,
      items: [{ productId: a, quantity: 1 }, { productId: b, quantity: 2 }]
    });
    for (const body of [
      { idempotencyKey: a, items: [] },
      { idempotencyKey: a, items: [{ productId: a, quantity: 0 }] },
      { idempotencyKey: a, items: [{ productId: a, quantity: 1.5 }] },
      { idempotencyKey: a, items: [{ productId: a, quantity: 1, priceToman: "1" }] },
      { idempotencyKey: a, items: [{ productId: a, quantity: 1 }, { productId: a, quantity: 2 }] },
      { idempotencyKey: a, items: [{ productId: a, quantity: 1 }], buyerOrganizationId: b },
      { idempotencyKey: a, items: [{ productId: a, quantity: 1 }], commercialPriceToman: "1" }
    ]) expect(() => parseCorporatePurchaseRequestCreate(body)).toThrow();
  });

  it("uses a strict optimistic submit version", () => {
    expect(parseCorporatePurchaseRequestSubmit({ version: 0 })).toEqual({ version: 0 });
    for (const body of [{ version: -1 }, { version: 1.5 }, { version: "0" }, { version: 0, priceToman: "1" }]) {
      expect(() => parseCorporatePurchaseRequestSubmit(body)).toThrow();
    }
  });

  it("requires corporate-buyer organization context and orders-domain staff for admin reads", async () => {
    expect(() => requireCorporateBuyer({ userId: a, activeRole: "customer" })).toThrow();
    expect(() => requireCorporateBuyer({ userId: a, activeRole: "corporate-buyer" })).toThrow();
    expect(() => requireCorporateBuyer({ userId: a, activeRole: "corporate-buyer", organizationId: b })).not.toThrow();

    const service = new CorporateProcurementService({} as PrismaService);
    await expect(service.list({ userId: a, activeRole: "staff", staffPermissionDomains: ["reports"] }, 1, 20, true)).rejects.toThrow();
  });
});
