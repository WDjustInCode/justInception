# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

**intake-wizard** is the JustInception Studio website — a Next.js App Router application that combines a portfolio/marketing site with a project quote intake system.

### Key directories

- `app/` — App Router pages and API routes
- `components/` — Reusable React components, organized by page (`site/`, `blog/`, `projects/`)
- `lib/` — Core business logic: quote engine, blog data, project data
- `content/blog/` — MDX blog posts with frontmatter
- `content/projects/` — MDX project files with frontmatter

### Data sources

- **Projects**: MDX files in `content/projects/`, parsed by `lib/projects.ts` via gray-matter; add a new `.mdx` file to add a project — no code change needed. The homepage gallery reads from `getAllProjects()` dynamically, so new files appear automatically.
- **Blog posts**: MDX files in `content/blog/`, parsed by `lib/blog.ts` via gray-matter; draft posts are hidden in production
- **Quote submissions**: Written to Google Sheets via service account (`api/intake/route.ts`)

### Quote/intake system

`lib/quote.ts` is the pricing engine. It calculates project quotes from:
- Site type (Billboard, Service Business, SaaS/Web App, etc.)
- Platform (Builder, Webflow, Next.js — each adds a price adjustment)
- Pages, sections, content handling, integrations, and add-ons
- Timeline multipliers (fast-track, standard, relaxed)

The intake form lives in `app/intake/` and is split across several files:
- `page.tsx` — thin orchestrator: step state, submit logic, navigation, layout
- `IntakeContext.tsx` — `FormData` type, `IntakeProvider`, `useIntake()` hook, localStorage persistence
- `steps/Step1Contact.tsx` through `Step5Review.tsx` — one component per form step
- `components/ui.tsx` — shared primitives: `Field`, `TextAreaField`, `Checkbox`, `SummaryRow`
- `components/SuccessView.tsx` — post-submit confirmation screen

`app/api/intake/route.ts` handles submission by calling the quote engine, writing to Google Sheets, and sending a Resend email.

### API routes

- `POST /api/contact` — Contact form → Resend email
- `POST /api/intake` — Quote form → Google Sheets row + Resend email

### Environment variables

Required in `.env.local`:
```
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=
GOOGLE_SHEETS_ID=
RESEND_API_KEY=
```

### About section

`components/site/about.tsx` — the about section below the hero. Key details:

- **Image**: `/helmet-headshot-padding-0.png`, stationary at bottom-left (`absolute bottom-[25px] left-0`), stretched vertically via `object-fill`
- **Video**: `/about.mp4` overlaid absolutely on top of the image; plays on hover, pauses and resets on mouse-out via `useRef`
- **Hover effect**: Tailwind `group` + `group-hover:opacity-*` crossfades image out and video in; parent container gets a `brand-yellow` outline on hover
- No top padding (`pb-32 sm:pb-40` only) so it sits flush under the hero

### Portfolio gallery

The homepage gallery (`components/site/gallery.tsx`) is a server component that calls `getAllProjects()` and renders a `ProjectCard` per project (`components/site/project-card.tsx`). Cards display:

- **Combination mark** (full visual area) → **logomark** (centered, more padding) → **title text** fallback — in that priority order
- **Brand color swatches** — dot row below the image area; always rendered at fixed height so all cards stay the same size
- **Services** — single truncated line below the title (`line-clamp-1`)
- **Logomark thumbnail** in the footer row only when both `logoMark` and `combinationMark` are set

To add a project: create `content/projects/[slug].mdx` with frontmatter fields defined in `lib/projects.ts` (`Project` interface). Drop logo assets in `public/` and reference them via `logoMark` and `combinationMark` frontmatter fields.

Current projects: JustInception Studio, LOCOAL, Azul Pool Services, The Cupcake Dream Shop, Dan River Window Company, Dunavant Engineering & Construction.

### Tech stack

- React 19 + Next.js 16 (App Router), TypeScript strict mode
- Tailwind CSS 4
- next-mdx-remote for blog and project rendering
- googleapis for Sheets, resend for email
- React Compiler enabled (next.config.ts)
- Path alias: `@/*` → root

## Needs improvement

**#1 — No client-side form validation before submission**
The intake form has no validation on required fields before calling the API. Users only discover missing fields when the server responds. At minimum, email format and required fields (name, email, site type) should be checked before `handleSubmit` fires.

**#2 — `app/api/contact/route.ts` lacks the validation added to the intake route**
The contact form API was not updated alongside the intake API. It should receive the same treatment: typed request body, required field enforcement (name, email), and HTML-escaping of any user-supplied fields before they are interpolated into email templates.

**#3 — No rate limiting on `POST /api/contact`**
`/api/intake` is covered by a Vercel WAF rule (Fixed Window, 10 req/60s/IP, returns 429). The contact route shares that rule, but unlike the intake route it has no server-side input validation or HTML-escaping — see #3.
