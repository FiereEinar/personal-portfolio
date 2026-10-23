import { test, expect } from "@playwright/test";

test("hero heading renders", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Nick Xylan Melloria");
});
