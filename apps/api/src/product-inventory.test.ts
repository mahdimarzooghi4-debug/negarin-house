import { describe, expect, it } from "vitest";
import { BadRequestException } from "@nestjs/common";
import { parseInventoryWrite } from "./product-inventory.js";

describe("Inventory request bounds", () => {
  it("accepts zero stock, exact integers and an optional trimmed reason", () => {
    expect(parseInventoryWrite({ stockQuantity: 0, inventoryVersion: 2, reason: "  شمارش مجدد  " }))
      .toEqual({ stockQuantity: 0, inventoryVersion: 2, reason: "شمارش مجدد" });
  });
  it.each([-1, 1.5, "2", null, 2_147_483_648, NaN])("rejects invalid stock %s", stockQuantity => {
    expect(() => parseInventoryWrite({ stockQuantity, inventoryVersion: 0 })).toThrow(BadRequestException);
  });
  it("requires an exact version and rejects ownership or publication escalation", () => {
    for (const body of [{ stockQuantity: 2 }, { stockQuantity: 2, inventoryVersion: -1 },
      { stockQuantity: 2, inventoryVersion: 0, artistUserId: "other" },
      { stockQuantity: 2, inventoryVersion: 0, publicationStatus: "published" },
      { stockQuantity: 2, inventoryVersion: 0, reason: " " }]) {
      expect(() => parseInventoryWrite(body)).toThrow(BadRequestException);
    }
  });
});

