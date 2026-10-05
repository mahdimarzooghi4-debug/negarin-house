import { describe, expect, it } from "vitest";
import { growthLevelSchema, growthLevels, growthRegistrySchema } from "./index.js";

describe("Growth contract", () => {
  it("keeps the locked four levels in exact canonical order", () => {
    expect(growthLevels).toEqual(["جوانه", "شکوفه", "سرو زرین", "سفیر جهانی"]);
    expect(new Set(growthLevels).size).toBe(4);
  });

  it("accepts only canonical level values", () => {
    for (const level of growthLevels) expect(growthLevelSchema.parse(level)).toBe(level);
    for (const invalid of ["seed", "جوانه ", "سرو", "سفیر", "طلایی", ""]) {
      expect(() => growthLevelSchema.parse(invalid)).toThrow();
    }
  });

  it("requires Growth to remain non-purchasable in the registry contract", () => {
    expect(growthRegistrySchema.parse({
      purchasable: false,
      levels: growthLevels.map((name, index) => ({ order: index + 1, name }))
    }).purchasable).toBe(false);

    expect(() => growthRegistrySchema.parse({
      purchasable: true,
      levels: growthLevels.map((name, index) => ({ order: index + 1, name }))
    })).toThrow();

    expect(() => growthRegistrySchema.parse({
      purchasable: false,
      levels: [
        { order: 1, name: "شکوفه" },
        { order: 2, name: "جوانه" },
        { order: 3, name: "سرو زرین" },
        { order: 4, name: "سفیر جهانی" }
      ]
    })).toThrow();
  });
});
