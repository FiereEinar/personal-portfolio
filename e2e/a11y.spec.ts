import { test, expect } from "@playwright/test";

test("skip link is first and focus is visible", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle);
  expect(outline).not.toBe("none");
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
