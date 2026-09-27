import { expect, test } from "@playwright/test";

test("Phase 1 web shell boots", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "خانه نگارین" })).toBeVisible();
  await expect(page.getByText("اسکلت فنی Phase 1 — Sprint 0")).toBeVisible();
});
