import { test, expect } from "@playwright/test";

test("hero shows identity, links, and portrait", async ({ page }) => {
  await page.goto("/");
  const hero = page.getByTestId("hero");
  await expect(hero.getByRole("heading", { level: 1 })).toHaveText("Nick Xylan Melloria");
  await expect(hero.getByText("Full-stack developer building real-time systems")).toBeVisible();
  await expect(hero.getByRole("link", { name: "Email" })).toHaveAttribute("href", "mailto:nickxylanmelloria@gmail.com");
  await expect(hero.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/FiereEinar");
  const portrait = hero.getByRole("img", { name: "Nick Xylan Melloria" });
  await expect(portrait).toHaveAttribute("width", "900");
});

test("no phone number is published", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).not.toContainText("[redacted]");
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
});

test("desktop nav shows Email, mobile nav shows sections", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  await expect(nav.getByRole("link", { name: "Email" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Work" })).toBeHidden();

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(nav.getByRole("link", { name: "Work" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Email" })).toBeHidden();
});

test("nav gains its scrolled state", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  await expect(nav).toHaveAttribute("data-scrolled", "false");
  await page.evaluate(() => window.scrollTo(0, 200));
  await expect(nav).toHaveAttribute("data-scrolled", "true");
});
