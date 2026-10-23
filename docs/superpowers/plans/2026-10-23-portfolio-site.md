# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, recruiter-facing portfolio for Nick Xylan Melloria from the resume, with a full-bleed portrait hero, three project case studies, a checkpoint rail, and playable architecture diagrams.

**Architecture:** Vite + React + TypeScript + Tailwind v4 static site. All copy lives in typed data files; components render it. A fixed checkpoint rail and two interactive SVG diagrams are the signature interactions. No backend, no router.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Fontsource (Instrument Sans, IBM Plex Mono), Playwright for end-to-end checks, Sharp for the portrait export.

**Spec:** `docs/superpowers/specs/2026-10-23-portfolio-design.md`

## Global Constraints

- Phone number must not appear in any shipped file, page text, link, meta tag, or image EXIF. No `tel:` links.
- The résumé PDF is not published; `public/` contains no PDF.
- Copy comes only from `resume.txt` facts. No invented metrics, users, dates, or screenshots.
- Accent `#9FD8B4` appears only on links, focus rings, rail active state, and diagram paths.
- No cursor-following effects, particle canvas, glow, glass, or gradients other than the portrait's bottom fade.
- External links use `target="_blank"` and `rel="noopener noreferrer"`.
- `prefers-reduced-motion: reduce` removes transforms and transitions; state changes remain.
- Layout must hold at 390×844, 768×1024, and 1440×900 with no horizontal overflow.
- Static output only: `npm run build` produces `dist/`.

## Review Focus

1. The phone number leaking through page copy, a stray PDF, or an image — `e2e/hero.spec.ts`, `e2e/meta.spec.ts`, and the `dist/` scan in Task 9.
2. Rail anchors landing underneath the fixed nav — `e2e/rail.spec.ts`.
3. Horizontal overflow from the hero name, portrait, or rail on small screens — `e2e/responsive.spec.ts`.
4. Diagram nodes losing keyboard focus, caption updates, or Escape clearing — `e2e/diagrams.spec.ts`.
5. Reduced-motion visitors seeing invisible reveal content — `e2e/a11y.spec.ts`.

---

### Task 1: Scaffold, tokens, and test harness

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `.gitignore`, `.env.example`, `playwright.config.ts`
- Create: `src/main.tsx`, `src/App.tsx`, `src/index.css`
- Test: `e2e/smoke.spec.ts`

**Interfaces:**
- Produces: a running Vite app at `/`; Tailwind tokens `bg`, `surface`, `ink`, `muted`, `line`, `accent`, `font-sans`, `font-mono`, breakpoint `mid` (900px).

- [ ] **Step 1: Initialize the repo and ignore local-only files**

```powershell
git init
```

`.gitignore`:

```
node_modules
dist
.superpowers
.worktrees
playwright-report
test-results
.env
.env.local
Melloria Resume.pdf
resume.txt
profile.jpg
profile-crop.jpg
```

- [ ] **Step 2: Create `package.json` and install**

Scripts: `dev` (`vite`), `build` (`tsc --noEmit && vite build`), `preview` (`vite preview`), `test:e2e` (`playwright test`), `optimize:portrait` (`node scripts/optimize-portrait.mjs`).

```powershell
npm i react react-dom @fontsource-variable/instrument-sans @fontsource/ibm-plex-mono
npm i -D vite @vitejs/plugin-react typescript @types/react @types/react-dom @types/node tailwindcss @tailwindcss/vite @playwright/test sharp
npx playwright install chromium
```

- [ ] **Step 3: Write the failing smoke test**

`e2e/smoke.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("hero heading renders", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Nick Xylan Melloria");
});
```

- [ ] **Step 4: Run it and confirm it fails**

Run: `npx playwright test e2e/smoke.spec.ts`
Expected: FAIL — no `h1` found.

- [ ] **Step 5: Implement the scaffold**

`index.html` sets `<title>Nick Xylan Melloria — Full-Stack Developer</title>`, `<div id="root">`, and loads `/src/main.tsx`.

`src/index.css`:

```css
@import "tailwindcss";
@import "@fontsource-variable/instrument-sans";
@import "@fontsource/ibm-plex-mono/400.css";
@import "@fontsource/ibm-plex-mono/500.css";

@theme {
  --color-bg: #0f1110;
  --color-surface: #161917;
  --color-ink: #f1efe9;
  --color-muted: #a9b0aa;
  --color-line: #2a2e2b;
  --color-accent: #9fd8b4;
  --font-sans: "Instrument Sans Variable", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
  --breakpoint-mid: 900px;
}

html { background: var(--color-bg); color: var(--color-ink); }
body { font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }
```

`vite.config.ts` uses `react()` and `tailwindcss()`; `base: process.env.VITE_BASE_PATH || "/"`. `tsconfig.json` uses `"types": ["vite/client", "node"]`. `playwright.config.ts` uses `webServer: { command: "npm run dev -- --port 5173", url: "http://localhost:5173", reuseExistingServer: true }`, `use: { baseURL: "http://localhost:5173" }`.

`src/App.tsx` renders a minimal `<main><h1>Nick Xylan Melloria</h1></main>`.

- [ ] **Step 6: Run the test and confirm it passes**

Run: `npx playwright test e2e/smoke.spec.ts`
Expected: 1 passed.

- [ ] **Step 7: Commit**

```powershell
git add -A
git commit -m "chore: scaffold vite react typescript tailwind app"
```

---

### Task 2: Profile data, nav, and hero

**Files:**
- Create: `src/data/profile.ts`, `src/components/Nav.tsx`, `src/components/Hero.tsx`, `src/components/Reveal.tsx`
- Modify: `src/App.tsx`, `src/index.css`
- Test: `e2e/hero.spec.ts`

**Interfaces:**
- Produces: `profile: Profile`, `Project`, `ExperienceEntry`, `StackGroup`, `EducationEntry` types; `<Nav />`, `<Hero />`, `<Reveal>`. `Reveal` renders a `div[data-reveal]` that fades and rises 12px once via `IntersectionObserver`, and renders visible with no transform when `prefers-reduced-motion: reduce`.

```ts
export type Project = {
  id: "sims" | "lapsync" | "cot-sbo";
  index: string;
  name: string;
  summary: string;
  context: string;
  build: string[];
  stack: string[];
  source?: string;
  diagram?: "sims" | "lapsync";
};
export type Profile = {
  name: string;
  role: string;
  degree: string;
  status: string;
  email: string;
  github: string;
  location: string;
  projects: Project[];
  experience: { period: string; title: string; org: string; points: string[] }[];
  stack: { label: string; items: string[] }[];
  education: { school: string; program: string; period: string }[];
};
```

Content values:
- name `Nick Xylan Melloria`; email `nickxylanmelloria@gmail.com`; github `https://github.com/FiereEinar`.
- role `Full-stack developer building real-time systems, multi-tenant platforms, and the APIs behind them.`
- degree `BS Information Technology · Bukidnon State University`; status `Open to software engineering roles.`
- Projects, experience, stack, and education exactly as the spec's sections 2–5.

- [ ] **Step 1: Write the failing hero tests**

`e2e/hero.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("hero shows identity, links, and portrait", async ({ page }) => {
  await page.goto("/");
  const hero = page.getByTestId("hero");
  await expect(hero.getByRole("heading", { level: 1 })).toHaveText("Nick Xylan Melloria");
  await expect(hero.getByText("Full-stack developer building real-time systems")).toBeVisible();
  await expect(hero.getByRole("link", { name: "Email" })).toHaveAttribute("href", "mailto:nickxylanmelloria@gmail.com");
  await expect(hero.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/FiereEinar");
  const portrait = hero.getByRole("img", { name: "Nick Xylan Melloria" });
  await expect(portrait).toHaveAttribute("width", "900");
});

test("no phone number is published", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).not.toContainText("[redacted]");
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
});

test("desktop nav shows Email, mobile nav shows sections", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  await expect(nav.getByRole("link", { name: "Email" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Work" })).toBeHidden();

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(nav.getByRole("link", { name: "Work" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Email" })).toBeHidden();
});

test("nav gains its scrolled state", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  await expect(nav).toHaveAttribute("data-scrolled", "false");
  await page.evaluate(() => window.scrollTo(0, 200));
  await expect(nav).toHaveAttribute("data-scrolled", "true");
});
```

- [ ] **Step 2: Run and confirm failures**

Run: `npx playwright test e2e/hero.spec.ts`
Expected: FAIL — `data-testid="hero"` missing.

- [ ] **Step 3: Implement data, Nav, and Hero**

`Hero.tsx`: `<section id="hero" data-testid="hero">`, desktop `mid:grid mid:grid-cols-[56%_44%] mid:min-h-svh`, content column with `mid:pl-24`, portrait column `relative h-[58svh] mid:h-auto` with `img src="/profile.jpg" width={900} height={1200} alt="Nick Xylan Melloria"` and `object-cover object-[50%_28%]`, plus an absolute bottom fade from `bg-bg`.

`Nav.tsx`: fixed, `h-14`, monogram `NXM` linking to `#hero`, `aria-label="Primary"`, `data-scrolled` driven by a passive scroll listener at 24px. Desktop link Email; mobile links Work, Experience, Contact using `mid:` to swap.

`App.tsx` adds a `Skip to content` link as the first focusable element, pointing at `#main`. Wrap each section's content in `<Reveal>`; `Reveal` uses a single `IntersectionObserver`, unobserves after firing, and checks `window.matchMedia("(prefers-reduced-motion: reduce)")` to render visible immediately.

- [ ] **Step 4: Run and confirm passes**

Run: `npx playwright test e2e/hero.spec.ts`
Expected: 4 passed. The portrait test needs `public/profile.jpg`; run `Copy-Item profile-crop.jpg public/profile.jpg` for now. Task 8 replaces it with the 900×1200 export.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: add profile data, nav, and portrait hero"
```

---

### Task 3: Selected work

**Files:**
- Create: `src/components/Work.tsx`
- Modify: `src/App.tsx`, `src/index.css` (scroll margins)
- Test: `e2e/work.spec.ts`

**Interfaces:**
- Consumes: `profile.projects`, `Project`.
- Produces: `<Work />` with article ids `sims`, `lapsync`, `cot-sbo`.

- [ ] **Step 1: Write the failing work tests**

`e2e/work.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("three case studies render in order", async ({ page }) => {
  await page.goto("/");
  const headings = page.locator("#work article h2");
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
```

- [ ] **Step 2: Run and confirm failure**

Run: `npx playwright test e2e/work.spec.ts`
Expected: FAIL — no `#work`.

- [ ] **Step 3: Implement `Work.tsx`**

Section `id="work"` with an `h2` "Selected work" (visually hidden or small mono label) and three `<article>` elements. Each article: mono index, `h2` name, summary, context paragraph, `build` bullets, stack line, source link when present. SIMS and LapSync reserve a `data-testid="visual-${id}"` column for the diagram; COT-SBO is full width. Add `scroll-mt-20` to each article.

- [ ] **Step 4: Run and confirm passes**

Run: `npx playwright test e2e/work.spec.ts`
Expected: 2 passed.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: add selected work case studies and repo links"
```

---

### Task 4: Interactive system diagrams

**Files:**
- Create: `src/data/diagrams.ts`, `src/components/SystemDiagram.tsx`
- Modify: `src/components/Work.tsx`, `src/index.css`
- Test: `e2e/diagrams.spec.ts`

**Interfaces:**
- Produces: `<SystemDiagram id="sims" | "lapsync" />`; `Diagram`, `DiagramNode`, `DiagramEdge` types.

```ts
export type DiagramNode = { id: string; label: string; caption: string; x: number; y: number };
export type DiagramEdge = { from: string; to: string; d: string };
export type Diagram = { id: "sims" | "lapsync"; nodes: DiagramNode[]; edges: DiagramEdge[] };
```

Node captions (exact):
- SIMS: Web client — "React — student profiles and collections"; Electron desktop — "Offline-first client with automated cloud sync"; REST API — "Express endpoints tuned for large datasets"; MongoDB — "Tenant data, paginated and cached".
- LapSync: RFID readers — "High-frequency RFID scans at each checkpoint"; raw ws — "Raw WebSocket ingest for hardware telemetry"; checkpoint pipeline — "Maps scans to checkpoints in milliseconds"; Socket.IO — "Live updates to dashboard and mobile app"; Dashboard — "Race control and results"; Mobile app — "Participant progress".

- [ ] **Step 1: Write the failing diagram tests**

`e2e/diagrams.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("focusing a node updates the caption and path", async ({ page }) => {
  await page.goto("/");
  const diagram = page.getByTestId("diagram-lapsync");
  const caption = diagram.getByTestId("diagram-caption");
  await expect(caption).toContainText("Hover or tab a component");
  await diagram.getByRole("button", { name: "RFID readers" }).focus();
  await expect(caption).toContainText("High-frequency RFID");
  await expect(diagram.locator('[data-active="true"]').first()).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(caption).toContainText("Hover or tab a component");
});

test("nodes are reachable by keyboard", async ({ page }) => {
  await page.goto("/");
  const first = page.getByTestId("diagram-sims").getByRole("button").first();
  await first.focus();
  await page.keyboard.press("Tab");
  await expect(page.getByTestId("diagram-sims").getByRole("button").nth(1)).toBeFocused();
});
```

- [ ] **Step 2: Run and confirm failure**

Run: `npx playwright test e2e/diagrams.spec.ts`
Expected: FAIL — no `data-testid="diagram-lapsync"`.

- [ ] **Step 3: Implement `SystemDiagram.tsx`**

Container `data-testid={`diagram-${id}`}`, `onKeyDown` clearing on Escape. SVG layer with `aria-hidden="true"` and `viewBox="0 0 100 60"`, paths from `edges` with `data-edge`, `data-active` when `from === activeId` or downstream. Nodes are absolutely positioned `<button>` elements at `left: x%`, `top: y%`, with `aria-describedby` pointing at the caption. Active set: the focused/hovered node plus everything reachable from it. Caption `<p data-testid="diagram-caption" aria-live="polite">`.

Draw-in: `.diagram-path { stroke-dasharray: 1; stroke-dashoffset: 1; }` with a `[data-drawn="true"]` class transition to `0`, set by an IntersectionObserver once. Under `prefers-reduced-motion`, offset is `0` from the start.

- [ ] **Step 4: Run and confirm passes**

Run: `npx playwright test e2e/diagrams.spec.ts`
Expected: 2 passed.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: add playable system diagrams"
```

---

### Task 5: Experience, stack, education

**Files:**
- Create: `src/components/Experience.tsx`, `src/components/Stack.tsx`, `src/components/Education.tsx`
- Modify: `src/App.tsx`
- Test: `e2e/sections.spec.ts`

**Interfaces:**
- Consumes: `profile.experience`, `profile.stack`, `profile.education`.
- Produces: sections `#experience`, `#stack`, `#education`.

- [ ] **Step 1: Write the failing tests**

`e2e/sections.spec.ts`:

```ts
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
  await expect(page.locator("#education").getByText("The Odin Project")).toBeVisible();
});
```

- [ ] **Step 2: Run and confirm failure**

Run: `npx playwright test e2e/sections.spec.ts`
Expected: FAIL — no `#experience`.

- [ ] **Step 3: Implement the three sections**

Hairline rows, mono period, no cards. Stack groups in a two-column definition list. Education as two hairline rows. Every section carries `scroll-mt-20`.

- [ ] **Step 4: Run and confirm passes**

Run: `npx playwright test e2e/sections.spec.ts`
Expected: 2 passed.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: add experience, stack, and education sections"
```

---

### Task 6: Contact and footer

**Files:**
- Create: `src/components/Contact.tsx`
- Modify: `src/App.tsx`
- Test: `e2e/contact.spec.ts`

**Interfaces:**
- Produces: `#contact` section and footer.

- [ ] **Step 1: Write the failing tests**

`e2e/contact.spec.ts`:

```ts
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
```

- [ ] **Step 2: Run and confirm failure**

Run: `npx playwright test e2e/contact.spec.ts`
Expected: FAIL — no `#contact`.

- [ ] **Step 3: Implement `Contact.tsx`**

`#contact` with an `h2` "Contact", a large email link, GitHub link, and one sentence inviting contact. `<footer>` as `contentinfo` with the name, year, and stack line.

- [ ] **Step 4: Run and confirm passes**

Run: `npx playwright test e2e/contact.spec.ts`
Expected: 2 passed.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: add contact section and footer"
```

---

### Task 7: Checkpoint rail

**Files:**
- Create: `src/data/sections.ts`, `src/components/CheckpointRail.tsx`
- Modify: `src/App.tsx`, `src/index.css`
- Test: `e2e/rail.spec.ts`

**Interfaces:**
- Produces: `SECTIONS: { id: string; label: string; index: string }[]`; `<CheckpointRail />` with `data-testid="checkpoint-rail"`, `data-testid="rail-fill"`, and `data-testid="mobile-progress"`.

- [ ] **Step 1: Write the failing rail tests**

`e2e/rail.spec.ts`:

```ts
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
  const scale = await page.getByTestId("mobile-progress").evaluate((el) => {
    const fill = el.firstElementChild as HTMLElement;
    return new DOMMatrix(getComputedStyle(fill).transform).a;
  });
  expect(scale).toBeGreaterThan(0.8);
});
```

- [ ] **Step 2: Run and confirm failure**

Run: `npx playwright test e2e/rail.spec.ts`
Expected: FAIL — no checkpoint rail.

- [ ] **Step 3: Implement `CheckpointRail.tsx`**

`SECTIONS` = hero, sims, lapsync, experience, contact with labels `HERO`, `SIMS`, `LAPSYNC`, `EXPERIENCE`, `CONTACT` and indices `01`–`05`.

Track: fixed `left-6`, vertically centered, `h-[58vh] w-px bg-line`, hidden below `mid:`. Fill: absolute inset with `transform: scaleY(progress)` and `origin-top`. Checkpoints positioned at `top: index/(n-1)*100%`, each an `<a>` with `aria-current` on the active id, a 44px hit area, mono label, and a 9px tick that turns accent when passed.

Active section: one rAF-throttled scroll handler; active is the last section whose `getBoundingClientRect().top <= innerHeight * 0.4`. Progress is `scrollY / (scrollHeight - innerHeight)`, clamped. Update via state at most once per frame.

Mobile progress: fixed under the 56px nav, 2px tall, `scaleX(progress)`, visible below `mid:` only.

`scroll-mt-20` on every target section (already added in Tasks 3 and 5; add to hero and contact).

- [ ] **Step 4: Run and confirm passes**

Run: `npx playwright test e2e/rail.spec.ts`
Expected: 2 passed.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: add checkpoint rail and mobile progress line"
```

---

### Task 8: Portrait export, meta, favicon, and README

**Files:**
- Create: `scripts/optimize-portrait.mjs`, `public/favicon.svg`, `.env.example`, `README.md`
- Modify: `index.html`, `src/App.tsx`, `vite.config.ts`, `src/index.css`
- Test: `e2e/meta.spec.ts`

**Interfaces:**
- Produces: `public/profile.jpg` at 900×1200; `VITE_SITE_URL`, `VITE_BASE_PATH`.

- [ ] **Step 1: Write the failing meta test**

`e2e/meta.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("meta tags and portrait are correct", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Nick Xylan Melloria — Full-Stack Developer");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /SIMS.*LapSync/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Nick Xylan Melloria — Full-Stack Developer");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /profile\.jpg$/);
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", /favicon\.svg$/);
  const width = await page.getByRole("img", { name: "Nick Xylan Melloria" }).evaluate((el) => (el as HTMLImageElement).naturalWidth);
  expect(width).toBe(900);
});
```

- [ ] **Step 2: Run and confirm failure**

Run: `npx playwright test e2e/meta.spec.ts`
Expected: FAIL — missing description.

- [ ] **Step 3: Implement**

`scripts/optimize-portrait.mjs`:

```js
import sharp from "sharp";
await sharp("profile-crop.jpg")
  .resize(900, 1200, { fit: "cover" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("public/profile.jpg");
```

Run `npm run optimize:portrait`.

`index.html`: description "Full-stack developer in Bukidnon, Philippines. SIMS, LapSync, and the React, TypeScript, and Node systems behind them."; OG/Twitter tags; canonical and OG image from `%VITE_SITE_URL%`; favicon link; `<meta name="color-scheme" content="dark">`. Copy `.env.example` to `.env` so Vite can replace the placeholder in development; production builds set the same variable.

`vite.config.ts`: switch to `defineConfig(({ mode }) => ({ base: loadEnv(mode, process.cwd(), "").VITE_BASE_PATH || "/", plugins: [react(), tailwindcss()] }))` and import `loadEnv` from `vite`, because `process.env` is not populated from `.env` files at config time.

`src/index.css`: import Tailwind with `@import "tailwindcss" source(none);` and add explicit `@source "../index.html";` and `@source "../src/**/*.{ts,tsx}";` so the tracked docs are not scanned for class names.

`public/favicon.svg`: a 32×32 near-black square with `NM` in mint Instrument Sans fallback.

`README.md`: run/build commands; deploy to Netlify (publish `dist`), Vercel (Vite preset), GitHub Pages (`VITE_BASE_PATH=/repo/ npm run build`); note that originals and the PDF stay untracked and that a phone-free PDF is required before any résumé link returns. Document `VITE_SITE_URL` as required for correct share cards.

- [ ] **Step 4: Run and confirm passes**

Run: `npx playwright test e2e/meta.spec.ts`
Expected: 1 passed.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: add portrait export, meta tags, favicon, and readme"
```

---

### Task 9: Responsive, accessibility, and build verification

**Files:**
- Test: `e2e/responsive.spec.ts`, `e2e/a11y.spec.ts`
- Modify: `playwright.config.ts`, any component that fails these checks.

- [ ] **Step 1: Write the responsive tests**

`e2e/responsive.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

for (const [w, h] of [[390, 844], [768, 1024], [1440, 900]]) {
  test(`no horizontal overflow at ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}
```

- [ ] **Step 2: Write the accessibility tests**

`e2e/a11y.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("skip link is first and focus is visible", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle);
  expect(outline).not.toBe("none");
});

test("reduced motion keeps content visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const section = page.locator("[data-reveal]").first();
  await expect(section).toBeVisible();
  const style = await section.evaluate((el) => {
    const s = getComputedStyle(el);
    return { opacity: s.opacity, transform: s.transform, transition: s.transitionDuration };
  });
  expect(style.opacity).toBe("1");
  expect(style.transform).toBe("none");
  expect(style.transition).toBe("0s");
});
```

- [ ] **Step 3: Run the full suite and fix failures**

Run: `npx playwright test`
Expected: all specs pass. Fix overflow, focus, or motion issues in the owning component; do not weaken the assertions. Set `forbidOnly: true` in `playwright.config.ts` so a committed `test.only` cannot silently reduce coverage.

Known polish from earlier reviews, all owned here:
- `Hero.tsx`: make the portrait image `absolute inset-0 h-full w-full` inside its relative wrapper so the hero obeys `100svh` on short desktops (F6).
- `App.tsx`: add `tabIndex={-1}` to `<main id="main">` (F9).
- `Hero.tsx`: set the degree line's mono tracking to `0.06em` (F10).
- `Work.tsx`: add a visually hidden `h2` "Selected work" while keeping the visible mono label as a `<p>` (F11).
- `Work.tsx`, `Experience.tsx`, `Stack.tsx`, `Education.tsx`: give each section a real `h2` and demote entry headings to `h3`; update `e2e/work.spec.ts` and `e2e/sections.spec.ts` selectors accordingly (F11, F18).
- `Experience.tsx`: align periods with `mid:items-baseline` like Education (F20).
- `Stack.tsx`: hide the `·` separators from assistive tech, or render items as separate elements (F21); add a stack-item and education-period assertion to `sections.spec.ts` (F22).
- `Work.tsx`: drop the per-article `scroll-mt-20`; the global `scroll-mt` rule stays (F12).
- `SystemDiagram.tsx`: Escape clears both hovered and focused ids (F16).

- [ ] **Step 4: Build and inspect the output**

Run: `npm run build`
Expected: `dist/` created with no errors.

Run: `Get-ChildItem dist -Recurse -File | Select-String -Pattern "[redacted]"`
Expected: no matches.

Run: `Get-ChildItem dist -Recurse -Filter *.pdf`
Expected: no files.

- [ ] **Step 5: Capture screenshots for visual review**

Start `npm run preview -- --port 4173` in one terminal, then:

```powershell
New-Item -ItemType Directory -Force .superpowers\screenshots | Out-Null
npx playwright screenshot --viewport-size=1440,900 http://localhost:4173 .superpowers/screenshots/desktop.png
npx playwright screenshot --viewport-size=390,844 --full-page http://localhost:4173 .superpowers/screenshots/mobile.png
```

Inspect both. Check: portrait crop does not show the phone; rail does not collide with copy; diagrams are legible; no glow, gradient, or emoji.

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "test: add responsive and accessibility checks"
```
