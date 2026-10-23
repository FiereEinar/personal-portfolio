import { test, expect } from "@playwright/test";

test("meta tags and portrait are correct", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Nick Xylan Melloria — Full-Stack Developer");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /SIMS.*LapSync/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Nick Xylan Melloria — Full-Stack Developer");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /profile\.jpg$/);
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", /favicon\.svg$/);
  const width = await page.getByRole("img", { name: "Nick Xylan Melloria" }).evaluate((el) => (el as HTMLImageElement).naturalWidth);
  expect(width).toBe(900);
});
