import { describe, expect, it } from "vitest";
import { partnerLocales } from "@negarin/i18n";
import { getPartnerMessages } from "./partner-localization";

describe("Export Partner shell localization", () => {
  it("provides shell and navigation copy for all supported Partner locales", () => {
    for (const locale of partnerLocales) {
      const messages = getPartnerMessages(locale);
      expect(messages.title.length).toBeGreaterThan(0);
      expect(messages.description.length).toBeGreaterThan(0);
      expect(messages.navigation).toHaveLength(7);
      expect(messages.navigation.every((label) => label.length > 0)).toBe(true);
    }
  });

  it("localizes French navigation and keeps the order-draft destination", () => {
    expect(getPartnerMessages("fr").navigation).toEqual([
      "Tableau de bord",
      "Réseau d’artistes",
      "Produits d’exportation",
      "Commandes",
      "Brouillons de commandes",
      "Rapports",
      "Compte"
    ]);
  });
});
