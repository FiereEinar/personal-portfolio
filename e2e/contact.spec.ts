import { test, expect } from "@playwright/test";

test("contact exposes email and github only", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#contact");
  await expect(section.getByRole("link", { name: "nickxylanmelloria@gmail.com" }))
    .toHaveAttribute("href", "mailto:nickxylanmelloria@gmail.com");
  const github = section.getByRole("link", { name: /github\.com\/FiereEinar/ });
  await expect(github).toHaveAttribute("href", "https://github.com/FiereEinar");
  await expect(github).toHaveAttribute("target", "_blank");
  await expect(github).toHaveAttribute("rel", "noopener noreferrer");
  await expect(github).toHaveAccessibleName(/opens in a new tab/);
  await expect(section.locator('a[href$=".pdf"]')).toHaveCount(0);
});

test("footer credits the stack", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("contentinfo")).toContainText("Built with React, TypeScript, and Tailwind");
});
