# رواد كلية الطب — Pioneers of the College of Medicine

A beautiful Arabic landing page for the "Pioneers of the College of Medicine" student cell — a space where medical students come together to support each other academically, professionally, and humanitarianly.

## Run & Operate

- `pnpm --filter @workspace/pioneers-med run dev` — run the frontend (port 24273)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Framer Motion, shadcn/ui
- API: Express 5 (scaffold only, not used by the landing page)
- Routing: wouter
- Font: Cairo (Google Fonts, Arabic)

## Where things live

- `artifacts/pioneers-med/` — the main React+Vite landing page
- `artifacts/pioneers-med/src/pages/Home.tsx` — the full single-page landing
- `artifacts/pioneers-med/src/index.css` — theme (medical blue + teal + gold/amber palette, Cairo font)
- `artifacts/pioneers-med/src/assets/images/` — AI-generated hero/team/volunteer images
- `artifacts/pioneers-med/index.html` — RTL HTML shell (`lang="ar" dir="rtl"`)
- `artifacts/api-server/` — shared Express API server (scaffold, unused by this app)
- `lib/api-spec/openapi.yaml` — API contract (scaffold)

## Architecture decisions

- Frontend-only app: no backend needed for a landing page; API server is present but unused.
- RTL layout: `dir="rtl"` in index.html, Cairo Arabic font, all UI text in Arabic.
- Framer Motion scroll-triggered animations for section reveal effects.
- AI-generated images (hero.png, team.png, volunteer.png) for visual richness.
- Theme: deep medical blue (primary), teal (secondary), warm gold/amber (accent).

## Product

A single-page Arabic landing site for the "رواد كلية الطب" student cell with:
- Cinematic hero with the cell motto
- About / mission section
- 6 goals/activities grid with icons
- Values section with imagery
- Join/contact CTA
- Footer with social links

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Google Font `@import url(...)` must be the very first line of index.css (before `@import "tailwindcss"`).
- The `GoalCard` helper component is defined at the bottom of Home.tsx (below the default export).

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
