# Nick Xylan Melloria — Portfolio

A single-page, recruiter-facing portfolio: Hero, selected work, experience, stack,
education, and contact. Built with Vite, React, TypeScript, and Tailwind CSS.

## Requirements

Node.js `^20.19.0` or `>=22.12.0` (Vite 8) and npm.

## Run locally

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

The dev server runs at <http://localhost:5173>.

`.env` is gitignored. It only needs the two variables described below.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check, then build static files to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run test:e2e` | Run the Playwright suite (starts its own dev server) |
| `npm run optimize:portrait` | Regenerate `public/profile.jpg` (900×1200) from `profile-crop.jpg` |

## Configuration

| Variable | Example in `.env.example` | Purpose |
| --- | --- | --- |
| `VITE_SITE_URL` | `http://localhost:5173` | Deployed origin used for the canonical link, `og:url`, and the absolute `og:image` / `twitter:image` URLs. **Required for correct share cards.** Use the real origin with no trailing slash. |
| `VITE_BASE_PATH` | `/` | Public base path. `/` for a root deploy; `/repo/` for a GitHub Pages project site. |

The values above are examples copied from `.env.example`, not built-in defaults. Vite
always replaces `%BASE_URL%` (it resolves to `/` unless `VITE_BASE_PATH` is set) and
replaces `%VITE_SITE_URL%` only when it is set; an unset `VITE_SITE_URL` leaves the
literal token in the built HTML.
Set both in the host's environment (or in `.env` before building). `VITE_SITE_URL`
has no production value committed because the domain is not known yet; set it to the
real origin, for example `https://example.com`. The localhost example is for local
development only and points share cards at localhost.

## Deploy

All three hosts serve the static `dist/` output. Run `npm run build` first (or let
the host run it) and set `VITE_SITE_URL` to the real origin in the project settings.

- **Netlify** — build command `npm run build`, publish directory `dist`.
- **Vercel** — import the repo and use the Vite preset; build command `npm run build`,
  output directory `dist`.
- **GitHub Pages** — build with the repository subpath and publish `dist`:

  ```powershell
  $env:VITE_BASE_PATH="/repo/"; npm run build
  ```

  Replace `repo` with the repository name, or set `VITE_BASE_PATH=/repo/` in the
  Pages workflow environment. `VITE_SITE_URL` stays the bare origin.

## Assets and privacy

- `profile.jpg` and `profile-crop.jpg` at the repository root are originals and stay
  untracked. Only the generated `public/profile.jpg` is committed.
- `npm run optimize:portrait` reads `profile-crop.jpg` and writes the 900×1200
  `public/profile.jpg` used by the hero and the share card.
- `Melloria Resume.pdf` is untracked and no résumé link is published. Before any
  résumé link returns, add a copy you want public to `public/`.
- The phone number is published in Contact at your request. It is visible in the
  page source and can be scraped.
- `.env`, `.env.local`, `.superpowers/`, and test/build output are gitignored.
