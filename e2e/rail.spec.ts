import { test, expect } from "@playwright/test";

test("rail tracks the active section and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const rail = page.getByTestId("checkpoint-rail");
  await expect(rail).toBeVisible();
  await expect(rail.getByRole("link")).toHaveCount(5);

  await page.locator("#lapsync").scrollIntoViewIfNeeded();
  await expect(rail.getByRole("link", { name: /LAPSYNC/ })).toHaveAttribute("aria-current", "true");

  await rail.getByRole("link", { name: /CONTACT/ }).click();
  await expect(page).toHaveURL(/#contact$/);
  const heading = page.locator("#contact h2");
  await expect(heading).toBeInViewport();
  const box = await heading.boundingBox();
  expect(box!.y).toBeGreaterThanOrEqual(56);
});

test("mobile swaps the rail for a progress line", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByTestId("checkpoint-rail")).toBeHidden();
  await expect(page.getByTestId("mobile-progress")).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  // R5: let the scroll event and the rAF-throttled handler run before reading.
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
  const scale = await page.getByTestId("mobile-progress").evaluate((el) => {
    const fill = el.firstElementChild as HTMLElement;
    return new DOMMatrix(getComputedStyle(fill).transform).a;
  });
  expect(scale).toBeGreaterThan(0.8);
});
