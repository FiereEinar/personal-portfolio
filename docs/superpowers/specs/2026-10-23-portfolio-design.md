# Portfolio Site — Design

Date: 2026-10-23
Owner: Nick Xylan Melloria
Status: awaiting approval

## Intent

A recruiter-facing portfolio for full-stack and software engineering roles. The visitor is a recruiter or hiring engineer who has 60–90 seconds, may be on a phone, and wants to know three things: who this is, what they have built, and whether the work is real.

The site is not a freelance sales page and not a general personal homepage. Its job is to make the systems in the resume legible and credible, then hand over a way to contact.

## Goals

- Put a face, a name, a role, and a degree in front of the visitor within the first screen.
- Show SIMS and LapSync as real systems: what problem, what was built, how the parts connect.
- Make contact frictionless: email and GitHub, with source links on the two projects that have public repos.
- Look deliberate rather than templated. Dark is a chosen direction, not a default.
- Load fast and read well on a phone, keyboard, and screen reader.

## Non-goals

- No blog, CMS, admin panel, or database.
- No contact form. Email is the contact.
- No fabricated screenshots, metrics, testimonials, or client logos. The resume has no numbers to cite, so none are invented.
- No light/dark toggle. One declared theme.
- No multi-page routing. SIMS and LapSync get in-page case studies, not separate URLs.
- No cursor-following background, spotlight, particle canvas, or similar ambient effect. The signature interactions are functional.

## Anti-goals

- A page that could belong to any developer after swapping the name.
- Decorative architecture: glowing orbs, gradients, glass panels, bento grids, fake terminals.
- A photo that reads as a casual selfie on a page claiming professional work. The current crop ships only as the interim asset you asked for, in a slot built for replacement.

## Constraints

- Stack: Vite + React + TypeScript + Tailwind CSS (the resume stack, so the source is evidence).
- Static output only. Deployable to Netlify, Vercel, or GitHub Pages with no server.
- Content must come from the resume. Anything not on the resume is omitted, not guessed.
- Portrait source: `profile.jpg` (1536×2048). A temporary tight crop exists at `profile-crop.jpg`; it will be replaced by a proper portrait later.
- Phone number stays off the public site. The resume PDF is not published, because it contains the number; no résumé link ships until a phone-free copy exists.
- Public repos: `github.com/FiereEinar/sbo-sims` and `github.com/FiereEinar/lapsync`. COT-SBO has no public repo.

## Approaches considered

**A. Vite + React + TypeScript + Tailwind — chosen.** Matches the resume, builds to static files, small and easy to maintain. Trade-off: no CMS, and a single page means static meta tags rather than server-side SEO. Acceptable for one page.

**B. Astro + TypeScript.** Better defaults for a content site and less shipped JavaScript. Rejected: a framework absent from the resume, and the interactivity here is minimal.

**C. Next.js static export.** Familiar React with richer meta handling. Rejected: a heavy toolchain for one page, with most Next features unused under static export.

## Visual direction

Full-bleed portrait on the right, information on the left, dark ground. Picked from three mockups.

**Palette**

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0F1110` | page ground |
| `--surface` | `#161917` | raised blocks, image wells |
| `--ink` | `#F1EFE9` | headings and body |
| `--muted` | `#A9B0AA` | secondary text, metadata |
| `--line` | `#2A2E2B` | hairlines |
| `--connector` | `#5C665F` | idle diagram connectors |
| `--accent` | `#9FD8B4` | links, focus ring, active rail and diagram states |

Three neutrals plus one accent. The accent appears on links, focus, the rail's active state, and the diagram paths. Nowhere else. No second accent. `--connector` is a neutral step used only for diagram lines, never text or borders.

**Type**

- Display and body: Instrument Sans variable, self-hosted via Fontsource.
- Labels, dates, stack lines: IBM Plex Mono 400/500, self-hosted.
- Hero name `clamp(2.75rem, 6vw, 5rem)`, tracking `-0.03em`, line-height `1.02`.
- Section heading `clamp(1.625rem, 2.6vw, 2.25rem)`.
- Body `1rem/1.65`; mono meta `0.8125rem`, tracking `0.06em`, uppercase only for short labels.

**Form**

- Radius 0 on images and blocks; 2px on the focus ring only.
- No shadows and no glow. Depth comes from hairlines and the portrait panel.
- One gradient: a short bottom fade on the portrait to seat it against the page. Written reason: the photo's lighting is warmer than the palette, and the fade stops it from looking pasted on.
- Portrait treatment: `object-fit: cover`, `object-position: 50% 28%`, slight desaturation (`filter: saturate(.82) contrast(1.03)`) so the warm indoor light sits inside the cool-dark palette.
- Buttons and links are text with an underline offset, not pills.

**Motion**

Dial: 2 of 3 — restrained.

- Sections fade and rise 12px once on entry, 420ms, `cubic-bezier(.2,.6,.2,1)`.
- Nav gains a hairline and background after 24px of scroll.
- Links and focus rings transition in 120ms.
- `prefers-reduced-motion: reduce` removes all of it, including the nav transition. The checkpoint rail and diagram highlights still change state, because they carry information; they simply stop animating.

## Signature interactions

Two interactions give the page its identity. Both come from LapSync, both do a job, and neither is ambient decoration.

### Checkpoint rail

A fixed vertical track on the left edge of the page, desktop and tablet only.

- A 1px `--line` track, 58vh tall, vertically centered, sitting in the left gutter.
- Five checkpoints: `01 HERO`, `02 SIMS`, `03 LAPSYNC`, `04 EXPERIENCE`, `05 CONTACT`.
- A mint fill grows down the track with scroll progress. Each passed checkpoint ticks mint and its label moves from `--muted` to `--ink`.
- The active section is derived from `IntersectionObserver`; the fill is driven by one `requestAnimationFrame`-throttled scroll listener.
- Each checkpoint is a real anchor link with a 44px hit area, a visible focus ring, and `aria-current="true"` on the active one.
- Below 900px the rail is replaced by a 2px mint progress line under the nav. No labels, no extra chrome.
- This is the race-timing idea turned into navigation. It earns its place by showing where you are and letting you jump.

### Playable system diagrams

The SIMS and LapSync diagrams respond to hover and keyboard focus.

- Diagram nodes are real `<button>` elements laid over an SVG connector layer, so they are tabbable, focusable, and readable by screen readers. Each button carries an `aria-describedby` pointing at its caption.
- Hovering or focusing a node lights its outgoing path and the downstream nodes it feeds, in `--accent` at 1px. Everything else dims to `--line`.
- A mono caption below the diagram updates to one factual line about that node, e.g. "raw ws — high-frequency RFID telemetry" or "Socket.IO — live updates to dashboard and mobile app".
- On first entry the connectors draw once via `stroke-dashoffset`, 600ms. After that they hold. No looping pulse, no travel animation.
- Tabbing through the nodes is the keyboard equivalent of hovering. `Escape` or blur clears the highlight.
- With reduced motion, the highlight and caption remain; the draw-in is skipped.

## Structure

Single page, four anchors: Work, Experience, Contact. A monogram link returns to top.

**Nav.** Fixed, opaque `--bg` at every scroll position, gaining a hairline after 24px of scroll. On desktop it holds the monogram and an Email link; the checkpoint rail handles section navigation. Below 900px, where the rail loses its labels, the nav swaps the Email link for Work, Experience, and Contact so section links are always reachable. No hamburger.

### Checkpoint rail (fixed chrome)

Fixed to the left gutter, outside the content column, from 900px up. The page gutter accounts for it so text never collides with the track. On smaller screens it becomes the top progress line described under Signature interactions.

### 1. Hero — `100svh` desktop, portrait panel right

Desktop grid: 56% content / 44% portrait, portrait bleeding to the right edge and the bottom of the section. The content column starts after the rail gutter.

Left, vertically centered:
- Name, two lines maximum.
- One sentence: full-stack developer building real-time systems, multi-tenant platforms, and the APIs behind them.
- Degree line: BS Information Technology, Bukidnon State University.
- Links: GitHub, Email.
- A short status line: "Open to software engineering roles." — true and useful to a recruiter.

Mobile (<900px): portrait banner at 58svh above the copy, then the same information. No phone number.

### 2. Selected work

Three entries separated by hairlines, each with a mono index (`01`–`03`), an `h2`, a one-line summary, a short case study, the stack, and — for SIMS and LapSync — a hand-built SVG architecture diagram.

Entry layout alternates on desktop: text left / visual right, then reversed. Mobile stacks the visual under the text. Diagrams are labelled with the real components from the resume, never decorative lines.

Each entry has a visual column. For now it holds the architecture diagram. Project screenshots can be added above the diagram later without a layout change; no placeholder image ships, and no screenshot is faked. COT-SBO has no visual column; it is a compact, full-width entry.

SIMS and LapSync carry an external "View source" link with a visible external-link affordance and focus state. COT-SBO carries no link.

**01 — SIMS**
- Multi-tenant student information system for campus-wide use.
- Case study: student profiles, organizational collections, and financial transaction history across tenants; an Electron desktop client that keeps working offline and syncs to the cloud when connectivity returns; caching, pagination, and tuned queries for large datasets.
- Stack: TypeScript, React, Express, Node, MongoDB.
- Source: `https://github.com/FiereEinar/sbo-sims`.
- Diagram: React web client and Electron client → Express REST API → MongoDB, with a sync arrow from the desktop client.

**02 — LapSync**
- Real-time race timing platform: admin dashboard, REST API, participant mobile app.
- Case study: dual-socket architecture, Socket.IO for client updates and raw WebSockets for high-frequency RFID telemetry; a pipeline that maps scans to checkpoints and computes participant progress in milliseconds.
- Stack: TypeScript, React, Express, Node, MongoDB, Socket.IO.
- Source: `https://github.com/FiereEinar/lapsync`.
- Diagram: RFID readers → raw `ws` ingest → checkpoint pipeline → Socket.IO → dashboard and mobile app.

**03 — COT-SBO System**
- Administrative system for the Council of Organizations and Teams–Student Body Organization at BSU.
- Case study: replaced manual record handling for SBO operations and cut the data-entry workload.
- Stack: PHP, Laravel, Livewire, MySQL.
- No diagram and no link. A short entry is honest here; the resume does not describe the architecture and there is no public repo.

### 3. Experience

Compact hairline rows, mono period on the left, role and organization on the right with two or three bullets each. No cards.

- Head of Committee on ICT (SSC), Bukidnon State University — Aug 2026
- Web Developer (Part-Time), ML Digital Marketing Agency — since Apr 2025
- COT-SBO System Administrator, Bukidnon State University — Dec 2024

Periods are written exactly as the resume supports them. No end dates are invented.

### 4. Stack

Four plain groups, no logos and no icon chips: Languages, Frameworks & Libraries, Databases, Tools. Two columns on desktop, one on mobile.

### 5. Education

Bukidnon State University — BS Information Technology, Apr 2023–present. The Odin Project — Full Stack Development, Apr 2023–Sep 2024.

### 6. Contact and footer

- Large email link and GitHub link. No résumé download until a phone-free PDF exists.
- Footer: name, year, and one line: "Built with React, TypeScript, and Tailwind."

## Content rules

- Every sentence traces to the resume. No invented users, scale, uptime, or performance numbers.
- Copy is plain and specific. No "passionate", "innovative", "cutting-edge", "journey".
- No emoji anywhere in the interface.
- Project links point to `https://github.com/FiereEinar/sbo-sims` and `https://github.com/FiereEinar/lapsync`.
- Contact links: `mailto:nickxylanmelloria@gmail.com`, `https://github.com/FiereEinar`.

## Implementation

```
src/
  main.tsx
  App.tsx
  index.css              tokens, base type, utilities
  data/profile.ts        all content, typed
  components/
    Nav.tsx
    CheckpointRail.tsx
    Hero.tsx
    Work.tsx
    SystemDiagram.tsx    interactive SIMS and LapSync SVGs
    Experience.tsx
    Stack.tsx
    Education.tsx
    Contact.tsx
    Reveal.tsx           IntersectionObserver wrapper
public/
  profile.jpg            optimized portrait
  favicon.svg
```

- Content lives in `profile.ts`; components render it. No prose buried in JSX except diagram labels.
- `Reveal` uses a single `IntersectionObserver` and unobserves after firing. It renders children normally when reduced motion is set.
- Tailwind for layout and spacing; a small `@layer base` block holds the tokens and type scale. Arbitrary one-off values are avoided in favor of the tokens.
- Fonts via `@fontsource-variable/instrument-sans` and `@fontsource/ibm-plex-mono`; only Latin subsets.
- Portrait exported at 900×1200 (the crop's native region is 600×800, so this is a 1.5× resample), quality 82, with `width`/`height` set to prevent layout shift; `profile-crop.jpg` is the starting asset.

## Meta and deployment

- Title: `Nick Xylan Melloria — Full-Stack Developer`.
- Description: one line covering SIMS, LapSync, and the stack.
- Open Graph and Twitter tags, using the portrait as the share image.
- Favicon: `NM` monogram as SVG.
- Absolute URLs come from `VITE_SITE_URL`, with Vite `base` driven by `VITE_BASE_PATH`, so the same build works on Netlify, Vercel, or a GitHub Pages project path. Both are documented in `.env.example`.
- `npm run build` outputs `dist/`. README covers deploy steps for the three hosts.
- No analytics.

## Verification

- `npm run build` and `npm run preview` succeed with no type errors.
- Playwright screenshots at 390×844, 768×1024, and 1440×900: no horizontal overflow, hero readable, diagrams legible.
- Keyboard pass: skip link, nav, checkpoint rail anchors, diagram nodes, work links, contact links, visible focus ring.
- Rail pass: active checkpoint tracks the section at 390, 768, and 1440; the fill matches scroll position; links land on the right heading offset.
- Diagram pass: hover and focus light the same path, captions change, and blur clears them.
- Reduced-motion pass: no transforms or transitions.
- Contrast check on `--muted`, `--accent`, and body text against `--bg`.

## Decisions made on your behalf

- Case studies for each project rather than a compact list. SIMS and LapSync have enough material; COT-SBO stays short.
- Mint accent chosen to fit the dark ground without the usual blue or purple.
- No résumé download until you send a phone-free PDF. The site's email and GitHub links carry contact in the meantime.
- No phone number.
- Repo links for SIMS and LapSync, none for COT-SBO.
- Architecture diagrams as the project visual now; screenshots slot in above them when you attach them.
- Checkpoint rail as the page-level signature, and playable diagrams as the content-level one.
- No active-section highlight in the nav, because the rail carries that job and a second highlight would flicker against it.

## Left to the builder

- Exact diagram geometry, label placement, and responsive scaling.
- Checkpoint rail geometry, and the handoff between the rail and the mobile nav at 900px.
- Copy tightening within the facts above.
- Final portrait asset replacement when the new photo arrives.
- Screenshot slot when project images arrive.
- Breakpoint fine-tuning between 900px and 1200px.
