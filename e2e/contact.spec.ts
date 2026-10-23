import { test, expect } from "@playwright/test";

test("contact exposes email and github only", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#contact");
  await expect(section.getByRole("link", { name: "nickxylanmelloria@gmail.com" }))
    .toHaveAttribute("href", "mailto:nickxylanmelloria@gmail.com");
  await expect(section.getByRole("link", { name: "github.com/FiereEinar" }))
    .toHaveAttribute("href", "https://github.com/FiereEinar");
  await expect(section.locator('a[href$=".pdf"]')).toHaveCount(0);
});

test("footer credits the stack", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("contentinfo")).toContainText("Built with React, TypeScript, and Tailwind");
});
