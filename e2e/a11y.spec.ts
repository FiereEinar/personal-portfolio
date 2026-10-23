import { test, expect } from "@playwright/test";

test("skip link is first and focus is visible", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle);
  expect(outline).not.toBe("none");
});

test("skip link moves focus to main", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});

test("reveal content becomes visible after scrolling", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("[data-reveal]").last();
  await section.scrollIntoViewIfNeeded();
  await expect(section).toHaveAttribute("data-visible", "true");
  await expect
    .poll(() => section.evaluate((el) => getComputedStyle(el).opacity))
    .toBe("1");
});

test("reduced motion keeps content visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const section = page.locator("[data-reveal]").first();
  await expect(section).toBeVisible();
  const style = await section.evaluate((el) => {
    const s = getComputedStyle(el);
    return { opacity: s.opacity, transform: s.transform, transition: s.transitionDuration };
  });
  expect(style.opacity).toBe("1");
  expect(style.transform).toBe("none");
  expect(style.transition).toBe("0s");
});
