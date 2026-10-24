import { test, expect } from "@playwright/test";

test("meta tags and portrait are correct", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Nick Xylan Melloria — Full-Stack Developer");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /SIMS.*LapSync/);
  await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute("content", "dark");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Nick Xylan Melloria — Full-Stack Developer");
  const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(ogImage).toMatch(/^https?:\/\/.+profile\.jpg$/);
  expect(ogImage).not.toContain("%VITE_");
  expect(ogImage).not.toContain("%BASE_URL%");
  expect(ogImage).not.toContain("localhost");
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "1200");
  await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute("href", /favicon\.svg$/);
  await expect(page.locator('link[rel="icon"][type="image/png"]')).toHaveAttribute("href", /favicon\.png$/);
  const portrait = page.getByRole("img", { name: "Nick Xylan Melloria" });
  await expect(portrait).toBeVisible();
  await portrait.evaluate((el) => (el as HTMLImageElement).decode());
  const dimensions = await portrait.evaluate((el) => {
    const image = el as HTMLImageElement;
    return {
      complete: image.complete,
      width: image.naturalWidth,
      height: image.naturalHeight,
    };
  });
  expect(dimensions.complete).toBe(true);
  expect(dimensions.width).toBeGreaterThan(0);
  expect(dimensions.height / dimensions.width).toBeCloseTo(4 / 3, 2);
});
