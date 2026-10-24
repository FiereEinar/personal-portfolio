import { test, expect } from "@playwright/test";

const projects = [
  ["sams", "https://github.com/FiereEinar/sams"],
  ["reboot-rebellion", "https://github.com/FiereEinar/reboot-rebellion"],
  ["statmastery", "https://github.com/FiereEinar/statmastery"],
  ["pulse", "https://github.com/FiereEinar/pulse"],
  ["inventory-cli", "https://github.com/FiereEinar/inventory-system-cli"],
  ["sims", "https://github.com/FiereEinar/sbo-sims"],
  ["lapsync", "https://github.com/FiereEinar/lapsync"],
] as const;

test("projects page has its own meta and navigation", async ({ page }) => {
  await page.goto("/projects.html");

  await expect(page).toHaveTitle("Projects · Nick Xylan Melloria");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /SAMS.*LapSync/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/projects\.html$/,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Projects · Nick Xylan Melloria",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /\/profile\.jpg$/,
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Projects");

  const nav = page.getByRole("navigation", { name: "Primary" });
  await expect(nav.getByTestId("nav-projects-desktop")).toBeVisible();
  await expect(nav.getByTestId("nav-projects-desktop")).toHaveAttribute(
    "aria-current",
    "page",
  );
});

test("all seven projects render in order", async ({ page }) => {
  await page.goto("/projects.html");

  await expect(page.getByRole("heading", { name: "Featured build" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "More projects" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Case studies" })).toBeVisible();

  const cards = page.getByTestId("project-card");
  await expect(cards).toHaveCount(7);
  await expect(cards.locator("h3")).toHaveText([
    "SAMS",
    "Reboot Rebellion",
    "StatMastery",
    "Pulse",
    "Inventory CLI",
    "SIMS",
    "LapSync",
  ]);
});

test("project links point to the public repositories", async ({ page }) => {
  await page.goto("/projects.html");

  for (const [id, repo] of projects) {
    const source = page.locator(`#${id}`).getByRole("link", { name: /Source/ });
    await expect(source).toHaveAttribute("href", repo);
    await expect(source).toHaveAttribute("target", "_blank");
    await expect(source).toHaveAttribute("rel", "noopener noreferrer");
    await expect(source).toHaveAccessibleName(/opens in a new tab/);
  }

  await expect(page.locator("#pulse").getByRole("link", { name: /Live demo/ })).toHaveAttribute(
    "href",
    "https://pulse-rosy.vercel.app/",
  );
  await expect(page.locator("#sims").getByRole("link", { name: "Read case study" })).toHaveAttribute(
    "href",
    "/#sims",
  );
  await expect(
    page.locator("#lapsync").getByRole("link", { name: "Read case study" }),
  ).toHaveAttribute("href", "/#lapsync");
});

test("real project screenshots load and typographic covers stay honest", async ({ page }) => {
  await page.goto("/projects.html");

  for (const [id, alt] of [
    ["sams", /SAMS dashboard/],
    ["reboot-rebellion", /Reboot Rebellion gameplay/],
    ["statmastery", /StatMastery course catalog/],
  ] as const) {
    const image = page.locator(`#${id}`).getByRole("img", { name: alt });
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((el) => (el as HTMLImageElement).decode());
    const dimensions = await image.evaluate((el) => {
      const img = el as HTMLImageElement;
      return { complete: img.complete, width: img.naturalWidth };
    });
    expect(dimensions.complete).toBe(true);
    expect(dimensions.width).toBeGreaterThan(0);
    await expect(image).toHaveAttribute("src", /\/projects\/.+\.webp$/);
  }

  await expect(page.locator("#pulse").locator("img")).toHaveCount(0);
  await expect(page.locator("#inventory-cli").locator("img")).toHaveCount(0);
  await expect(page.getByTestId("project-cover-pulse")).toContainText("Pulse");
  await expect(page.getByTestId("project-cover-inventory-cli")).toContainText(
    "Inventory CLI",
  );
});

test("case study links return to the home-page articles", async ({ page }) => {
  await page.goto("/projects.html");
  await page.locator("#sims").getByRole("link", { name: "Read case study" }).click();

  await expect(page).toHaveURL(/\/#sims$/);
  await expect(page.locator("#sims h3")).toBeInViewport();
});

test("projects nav marks the page and returns home", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/projects.html");

  const nav = page.getByRole("navigation", { name: "Primary" });
  await expect(nav.getByTestId("nav-home-desktop")).toHaveAttribute("href", "/");
  await nav.getByTestId("nav-home-desktop").click();

  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Nick Xylan Melloria",
  );
});

test("mobile nav keeps Projects visible and current", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/projects.html");

  const projectsLink = page.getByTestId("nav-projects-mobile");
  await expect(projectsLink).toBeVisible();
  await expect(projectsLink).toHaveAttribute("aria-current", "page");
});
