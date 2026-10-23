import { test, expect } from "@playwright/test";

test("three case studies render in order", async ({ page }) => {
  await page.goto("/");
  const headings = page.locator("#work article h3");
  await expect(headings).toHaveText(["SIMS", "LapSync", "COT-SBO System"]);
});

test("public repos are linked safely", async ({ page }) => {
  await page.goto("/");
  for (const [id, url] of [
    ["sims", "https://github.com/FiereEinar/sbo-sims"],
    ["lapsync", "https://github.com/FiereEinar/lapsync"],
  ] as const) {
    const link = page.locator(`#${id}`).getByRole("link", { name: /View source/ });
    await expect(link).toHaveAttribute("href", url);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  await expect(page.locator("#cot-sbo").getByRole("link", { name: /View source/ })).toHaveCount(0);
});
