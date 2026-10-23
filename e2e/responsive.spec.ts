import { test, expect } from "@playwright/test";

for (const [w, h] of [[390, 844], [768, 1024], [1440, 900], [1440, 650]]) {
  test(`no horizontal overflow at ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test("hero fits a short desktop viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 650 });
  await page.goto("/");
  const box = await page.getByTestId("hero").boundingBox();
  expect(box!.height).toBeLessThanOrEqual(651);
});
