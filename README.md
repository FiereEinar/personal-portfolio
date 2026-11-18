# Nick Xylan Melloria — Personal Portfolio Website

A clean, responsive, single-page portfolio website showcasing web development, full-stack systems engineering, and interactive architectural diagrams. Built with React, TypeScript, Vite, and Tailwind CSS.

---

## Live Website

- **Live Deployed URL:** [https://personal-portfolio-delta-sage.vercel.app](https://personal-portfolio-delta-sage.vercel.app) _(or your deployed Vercel / GitHub Pages link)_

---

## Technologies Used

### Frontend & Core

- **React 19 (`react`, `react-dom`)** — Modern component-driven UI architecture.
- **TypeScript 5+** — Strict type safety across profiles, project data, and component interfaces.
- **Vite 8** — Next-generation frontend tooling and ultra-fast static bundling.
- **React Router 7 (`react-router-dom`)** — Client-side SPA routing with smooth transitions and history navigation.
- **Tailwind CSS v4 (`@tailwindcss/vite`)** — High-performance utility CSS with native CSS custom properties for dynamic theming.

### Design, Icons & Typography

- **Simple Icons (`simple-icons`)** — Official developer and technology brand SVGs.
- **Fontsource (`@fontsource-variable/instrument-sans`, `@fontsource/ibm-plex-mono`)** — Self-hosted variable typography (Instrument Sans + IBM Plex Mono) for zero layout shifts and fast local font delivery.

---

## Pages & Routes

| Route       | Description                                                                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`         | **Home Page:** Hero introduction, interactive case studies (SIMS & LapSync), experience timeline, technical stack categories, education, and quick contact. |
| `/projects` | **Projects Index:** Comprehensive showcase of 7 applications across enterprise SaaS, real-time telemetry, games, and developer CLI tools.                   |
| `/contact`  | **Dedicated Contact Page:** Complete message form, live availability status, and direct communication channels.                                             |

---

## Getting Started

### Prerequisites

- **Node.js** `^20.19.0` or `>=22.12.0`
- **npm** `^10.0.0`

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/FiereEinar/personal-portfolio.git
   cd personal-portfolio
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   ```powershell
   Copy-Item .env.example .env
   # Or on Unix: cp .env.example .env
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## Available Scripts

| Command              | Purpose                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------- |
| `npm run dev`        | Starts the Vite local development server.                                                 |
| `npm run build`      | Runs TypeScript type checking (`tsc --noEmit`) and compiles production assets to `dist/`. |
| `npm run preview`    | Serves the production build locally for verification.                                     |
| `npm run test:e2e`   | Executes Playwright end-to-end tests against local builds.                                |
| `npm run check:base` | Verifies repository base path routing and asset links.                                    |
