import { describe, expect, it } from "vitest";
import { tokens } from "./index.js";

function luminance(hex: string): number {
  const channels = hex.match(/[0-9a-f]{2}/gi)?.map((channel) => parseInt(channel, 16) / 255);
  if (!channels || channels.length !== 3) throw new Error("Expected a six-digit hex color");
  const linear = channels.map((channel) => channel <= 0.04045
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0]! + 0.7152 * linear[1]! + 0.0722 * linear[2]!;
}

function contrastRatio(foreground: string, background: string): number {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0]! + 0.05) / (values[1]! + 0.05);
}

describe("shared Negarin UI palette", () => {
  it("matches the approved teal portal-shell palette", () => {
    expect(tokens).toMatchObject({
      accent: "#0c7570",
      sidebarBackground: "#eaf6f3",
      sidebarActive: "#d3ede8",
      sidebarText: "#405654",
      sidebarActiveContent: "#0b6963"
    });
  });

  it("keeps primary and selected-sidebar text above WCAG AA contrast", () => {
    expect(contrastRatio(tokens.surface, tokens.accent)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(tokens.sidebarActiveContent, tokens.sidebarActive)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(tokens.sidebarText, tokens.sidebarBackground)).toBeGreaterThanOrEqual(4.5);
  });
});
