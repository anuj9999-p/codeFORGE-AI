# CodeForge AI

**Forge Your Future. Master Every Interview.**

A premium, production-styled coding interview preparation platform — structured DSA learning, interactive algorithm visualizations, company-specific prep, roadmaps, notes, and an AI mentor, all running on local-first storage with **Clerk** as the only backend dependency.

---

## Tech stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · shadcn/ui (Radix primitives) · Framer Motion · Recharts · Monaco Editor · React Markdown · React Syntax Highlighter · React Hook Form + Zod · TanStack Query · Clerk Authentication

---

## 1. Requirements

- Node.js 18.18+ (Node 20+ recommended)
- npm

## 2. Install

```bash
npm install
```

## 3. Environment variables — **Clerk keys are required to run at all**

This app needs **zero** database, zero custom API, and zero infra — but it **will not start** without valid Clerk keys, because `<ClerkProvider>` throws immediately if `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is missing.

1. Create a free app at **https://dashboard.clerk.com** (takes ~2 minutes, no credit card).
2. Copy your **Publishable key** and **Secret key** from the Clerk dashboard (API Keys page).
3. Copy the example env file and paste your keys in:

```bash
cp .env.local.example .env.local
```

```env
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

That's it — **no other environment variables are needed**. Everything else (progress, XP, notes, bookmarks, roadmap checkmarks, AI chat history) is stored in the browser's `localStorage`, with no server-side persistence.

> If you skip this step, `npm run dev` will start but every page will crash with a Clerk configuration error the moment it tries to render `<ClerkProvider>`.

## 4. Run

```bash
npm run dev
```

Open **http://localhost:3000**.

## 5. Build for production

```bash
npm run build
npm start
```

---

## What's real vs. mocked

| Feature | Status |
|---|---|
| Auth (sign in/up, protected routes, profile) | **Real** — Clerk, fully wired |
| Progress, XP, streak, bookmarks, favorites | **Real** — persisted to `localStorage`, survives refresh |
| Notes (markdown, tags, pin, export/import) | **Real** — `localStorage`-backed |
| Roadmap milestone tracking | **Real** — `localStorage`-backed |
| Algorithm Visualizer (sorting) | **Real** — actual step-by-step sort algorithms, not canned animations |
| Data Structures Explorer (array/stack/queue) | **Real** — actual push/pop/enqueue/dequeue operations |
| Coding Playground | **Real editor** (Monaco), execution **not wired** — no backend to run code against yet |
| AI Assistant | **Real chat UI**, but the model behind it is a local mock (`services/ai-service.ts`) — see below |
| Leaderboard | **Mocked data** — no multi-user backend, so rankings are illustrative |
| Visualizer categories beyond sorting (trees, graphs, DP, etc.) | **Placeholder** — clearly marked "being forged," not faked |
| Data structures beyond array/stack/queue | **Placeholder** — same honesty policy |

## Swapping in a real AI provider

The assistant is intentionally provider-independent. Everything routes through one interface:

```
services/ai-service.ts
```

To connect a real model, implement the `AIProvider` interface (one method: `streamReply`) against whatever API you choose, and change the final export at the bottom of that file. No component code needs to change.

## Project structure

```
app/                  Next.js App Router pages
  (marketing)/        Public pages — landing, interview sheet, visualizer, patterns, companies, roadmaps, resources
  (app)/               Authenticated pages — dashboard, assistant, playground, notes, bookmarks, profile, settings, leaderboard
  (auth)/              Clerk sign-in / sign-up
components/
  ui/                  shadcn/ui primitives
  shared/              Cross-cutting components (heat bar, code block, command palette, theme/query providers)
  features/            Feature-specific components, grouped by domain
services/              Local persistence + AI provider abstraction layer
hooks/                 React hooks (progress, notes, conversations, local storage)
types/                 Shared TypeScript types
constants/             Seed content (topics, sample questions, patterns, companies, roadmaps)
lib/                   Utilities, fonts, algorithms, confetti
```

## Design system

A "forge/temper" visual identity — difficulty and progress are rendered on one heat scale (graphite → ember → molten gold → tempered blue) instead of generic progress bars, reused across XP, difficulty badges, and category mastery. Type system: Space Grotesk (display) + IBM Plex Sans (body) + JetBrains Mono (code). Dark mode by default, light mode supported via the theme toggle in Settings.

## Known limitations

- No automated test suite yet.
- Playground code execution requires a backend that isn't part of this build (by design — see brief).
- The service worker (`public/sw.js`) only activates in production builds; it caches the app shell for basic offline resilience, not full offline functionality.
