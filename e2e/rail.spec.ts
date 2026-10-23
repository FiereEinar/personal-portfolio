import { test, expect } from "@playwright/test";

test("rail tracks the active section and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const rail = page.getByTestId("checkpoint-rail");
  await expect(rail).toBeVisible();
  await expect(rail.getByRole("link")).toHaveCount(5);

  await page.locator("#lapsync").scrollIntoViewIfNeeded();
  await expect(rail.getByRole("link", { name: /LAPSYNC/ })).toHaveAttribute("aria-current", "true");

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight / 2));
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
  const fillScale = await page.getByTestId("rail-fill").evaluate((el) => {
    return new DOMMatrix(getComputedStyle(el).transform).d;
  });
  expect(fillScale).toBeGreaterThan(0);

  await rail.getByRole("link", { name: /CONTACT/ }).click();
  await expect(page).toHaveURL(/#contact$/);
  const heading = page.locator("#contact h2");
  await expect(heading).toBeInViewport();
  const box = await heading.boundingBox();
  expect(box!.y).toBeGreaterThanOrEqual(56);
});

test("rail links show a keyboard focus outline", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  for (let i = 0; i < 10; i += 1) {
    await page.keyboard.press("Tab");
    const inRail = await page.evaluate(() =>
      Boolean(document.activeElement?.closest('[data-testid="checkpoint-rail"]')),
    );
    if (inRail) break;
  }
  const focusedRailLink = page.locator('[data-testid="checkpoint-rail"] a:focus');
  await expect(focusedRailLink).toHaveCount(1);
  const outline = await focusedRailLink.evaluate(
    (el) => getComputedStyle(el).outlineStyle,
  );
  expect(outline).not.toBe("none");
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
