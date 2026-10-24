import { test, expect } from "@playwright/test";

test("contact exposes email, phone, and github", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#contact");
  await expect(section.getByRole("link", { name: "nickxylanmelloria@gmail.com" }))
    .toHaveAttribute("href", "mailto:nickxylanmelloria@gmail.com");
  const github = section.getByRole("link", { name: /github\.com\/FiereEinar/ });
  await expect(github).toHaveAttribute("href", "https://github.com/FiereEinar");
  await expect(github).toHaveAttribute("target", "_blank");
  await expect(github).toHaveAttribute("rel", "noopener noreferrer");
  await expect(github).toHaveAccessibleName(/opens in a new tab/);
  await expect(section.getByRole("link", { name: "+63 965 816 5470" }))
    .toHaveAttribute("href", "tel:+639658165470");
  await expect(section.locator('a[href$=".pdf"]')).toHaveCount(0);
});

test("footer credits the site without a stack line", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  await expect(footer).toContainText("Nick Xylan Melloria");
  await expect(footer).toContainText(String(new Date().getFullYear()));
  await expect(footer).not.toContainText("Built with React");
});
