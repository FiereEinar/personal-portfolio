import { test, expect } from "@playwright/test";

test("experience rows show roles and periods", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#experience");
  await expect(section.getByText("Head of Committee on ICT (SSC)")).toBeVisible();
  await expect(section.getByText("Aug 2026")).toBeVisible();
  await expect(section.getByText("ML Digital Marketing Agency")).toBeVisible();
  await expect(section.getByText("COT-SBO System Administrator")).toBeVisible();
});

test("stack groups and education render", async ({ page }) => {
  await page.goto("/");
  for (const label of ["Languages", "Frameworks & Libraries", "Databases", "Tools"]) {
    await expect(page.locator("#stack").getByText(label, { exact: true })).toBeVisible();
  }
  await expect(page.locator("#stack").getByText("TypeScript", { exact: true })).toBeVisible();
  await expect(page.locator("#education").getByText("The Odin Project")).toBeVisible();
  await expect(page.locator("#education").getByText("Apr 2023 – Sep 2024")).toBeVisible();
});
