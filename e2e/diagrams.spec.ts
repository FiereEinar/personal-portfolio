import { test, expect } from "@playwright/test";

test("focusing a node updates the caption and path", async ({ page }) => {
  await page.goto("/");
  const diagram = page.getByTestId("diagram-lapsync");
  const caption = diagram.getByTestId("diagram-caption");
  await expect(caption).toContainText("Hover or tab a component");
  await diagram.getByRole("button", { name: "RFID readers" }).focus();
  await expect(caption).toContainText("High-frequency RFID");
  await expect(diagram.locator('[data-active="true"]').first()).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(caption).toContainText("Hover or tab a component");
});

test("nodes are reachable by keyboard", async ({ page }) => {
  await page.goto("/");
  const first = page.getByTestId("diagram-sims").getByRole("button").first();
  await first.focus();
  await page.keyboard.press("Tab");
  await expect(page.getByTestId("diagram-sims").getByRole("button").nth(1)).toBeFocused();
});
