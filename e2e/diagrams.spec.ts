import { test, expect } from "@playwright/test";

test("focusing a node updates the caption and path", async ({ page }) => {
  await page.goto("/");
  const diagram = page.getByTestId("diagram-lapsync");
  const caption = diagram.getByTestId("diagram-caption");
  await expect(caption).toContainText("Hover or tab a component");
  await diagram.getByRole("button", { name: "RFID readers" }).focus();
  await expect(caption).toContainText("High-frequency RFID");
  await expect(diagram.locator('[data-edge][data-active="true"]').first()).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(caption).toContainText("Hover or tab a component");
});

test("connectors rest solid after the draw-in", async ({ page }) => {
  await page.goto("/");
  const diagram = page.getByTestId("diagram-lapsync");
  await diagram.scrollIntoViewIfNeeded();
  await expect(diagram.locator('[data-drawn="true"]')).toHaveCount(1);
  const connector = diagram.locator("[data-edge]").first();
  await expect
    .poll(() =>
      connector.evaluate((el) => parseFloat(getComputedStyle(el).strokeDashoffset)),
    )
    .toBe(0);
});

test("nodes are reachable by keyboard", async ({ page }) => {
  await page.goto("/");
  const first = page.getByTestId("diagram-sims").getByRole("button").first();
  await first.focus();
  await page.keyboard.press("Tab");
  await expect(page.getByTestId("diagram-sims").getByRole("button").nth(1)).toBeFocused();
});

test("focus survives the pointer leaving another node", async ({ page }) => {
  await page.goto("/");
  const diagram = page.getByTestId("diagram-lapsync");
  const caption = diagram.getByTestId("diagram-caption");
  await diagram.getByRole("button", { name: "RFID readers" }).focus();
  await diagram.getByRole("button", { name: "Socket.IO" }).hover();
  await expect(caption).toContainText("Live updates to dashboard");
  await page.mouse.move(0, 0);
  await expect(caption).toContainText("High-frequency RFID");
});

test("hover clears when the pointer leaves", async ({ page }) => {
  await page.goto("/");
  const diagram = page.getByTestId("diagram-sims");
  const caption = diagram.getByTestId("diagram-caption");
  await diagram.getByRole("button", { name: "REST API" }).hover();
  await expect(caption).toContainText("Express endpoints");
  await page.mouse.move(0, 0);
  await expect(caption).toContainText("Hover or tab a component");
});
