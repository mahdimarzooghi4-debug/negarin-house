import { describe, expect, it } from "vitest";
import { nextPreparation, parsePreparation, preparationSteps } from "./artist-orders.js";
describe("Artist preparation contract", () => {
  it("allows only consecutive execution states", () => {
    for (let i = 0; i < preparationSteps.length - 1; i++) expect(() => nextPreparation(preparationSteps[i]!, preparationSteps[i + 1]!)).not.toThrow();
    for (const [i, from] of preparationSteps.entries()) for (const [j, to] of preparationSteps.entries()) if (j !== i + 1) expect(() => nextPreparation(from, to)).toThrow();
  });
  it.each([null, [], {}, { version: "0", status: "accepted" }, { version: -1, status: "accepted" }, { version: 2147483647, status: "accepted" },
    { version: 0, status: "shipped" }, { version: 0, status: "awaiting_acceptance" }, { version: 0, status: "accepted", artistUserId: "other" }
  ])("rejects invalid/privileged commands %j", v => expect(() => parsePreparation(v)).toThrow());
  it("accepts a bounded execution revision", () => expect(parsePreparation({ version: 0, status: "accepted" })).toEqual({ version: 0, status: "accepted" }));
});
