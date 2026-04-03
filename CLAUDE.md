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

### Data sources

- **Projects**: Hardcoded in `lib/projects.ts` as a typed array — add new projects there
- **Blog posts**: MDX files in `content/blog/`, parsed by `lib/blog.ts` via gray-matter; draft posts are hidden in production
- **Quote submissions**: Written to Google Sheets via service account (`api/intake/route.ts`)

### Quote/intake system

`lib/quote.ts` is the pricing engine. It calculates project quotes from:
- Site type (Billboard, Service Business, SaaS/Web App, etc.)
- Platform (Builder, Webflow, Next.js — each adds a price adjustment)
- Pages, sections, content handling, integrations, and add-ons
- Timeline multipliers (fast-track, standard, relaxed)

`app/intake/page.tsx` is the form UI; `app/api/intake/route.ts` handles submission by calling the quote engine, writing to Google Sheets, and sending a Resend email.

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

### Tech stack

- React 19 + Next.js 16 (App Router), TypeScript strict mode
- Tailwind CSS 4
- next-mdx-remote for blog rendering
- googleapis for Sheets, resend for email
- React Compiler enabled (next.config.ts)
- Path alias: `@/*` → root

## Needs improvement

**#1 — `app/intake/page.tsx` is a monolithic 1000+ line client component**
All form state, multi-step logic, page toggle handlers, and rendering live in one `"use client"` file. This makes it difficult to test or modify individual steps. Each step should be its own component, with shared state lifted or managed via context/reducer.

**#2 — Projects are hardcoded in `lib/projects.ts`**
Adding or updating a project requires a code change and a full deployment. The blog already uses MDX files — projects should follow the same pattern so content can be updated without touching source code.

**#3 — No client-side form validation before submission**
The intake form has no validation on required fields before calling the API. Users only discover missing fields when the server responds. At minimum, email format and required fields (name, email, site type) should be checked before `handleSubmit` fires.

**#4 — `app/api/contact/route.ts` lacks the validation added to the intake route**
The contact form API was not updated alongside the intake API. It should receive the same treatment: typed request body, required field enforcement (name, email), and HTML-escaping of any user-supplied fields before they are interpolated into email templates.

**#5 — No rate limiting on `POST /api/contact`**
`/api/intake` is covered by a Vercel WAF rule (Fixed Window, 10 req/60s/IP, returns 429). The contact route shares that rule, but unlike the intake route it has no server-side input validation or HTML-escaping — see #4.
