<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: nextjs-wha-app-starter

Thai-language e-commerce learning app. Next.js 16 + React 19, MariaDB, Prisma v7, better-auth, shadcn/ui (radix-luma), Zustand.

# Development Guideline
for TypeScript code styles : @Ddocs/typescript-guidelines.md

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Dev server at `http://localhost:3000` |
| `npm run build` | Production build — outputs `.next/standalone` |
| `npm run start` | Production server |
| `npm run lint` | ESLint only — **no test or typecheck scripts** |
| `npx next clean` | Clears `.next` cache (fixes EPERM / stale build errors) |
| `npx prisma generate` | Regenerates Prisma client after schema changes |

## Framework quirks

- **shadcn/ui `radix-luma`**: Form fields use `Field`, `FieldLabel`, `FieldContent`, `FieldError` from `@/components/ui/field` — **NOT** the traditional `FormField`/`FormControl`/`FormMessage`. See `src/app/(auth)/login/page.tsx` for the canonical react-hook-form + `Controller` + `Field` pattern.
- **Tailwind v4**: No `tailwind.config`. Uses `@tailwindcss/postcss` plugin. CSS entry at `src/app/globals.css` imports `@import "tailwindcss"`.
- **Zod v4**: Import from `zod/v4`, e.g. `import { z } from 'zod/v4'`.
- **Prisma v7 driver adapter**: Client generated to `../generated/prisma`; import from `../../generated/prisma/client`, not `@prisma/client`. MySQL provider against MariaDB. `prisma.config.ts` loads `dotenv/config`.
- **`next.config.ts`**: `cacheComponents: true` (Next.js 16 feature). Images whitelist: `www.fffuel.co`, `api.codingthailand.com`.
- **Dynamic routes**: Call `await connection()` from `next/server` (`src/app/(front)/product/page.tsx:13`).
- **Sonner toast**: `<Toaster richColors />` in `(front)/layout.tsx`. Use `toast.error()` for network/server errors.
- **Icons**: Lucide (`lucide-react`) — not RemixIcon despite `components.json` `"iconLibrary": "remixicon"`.

## Route groups

- `(auth)` — login, signup; separate `<html>` + `<body>`, uses Thai Prompt font via `next/font/google`
- `(front)` — home, product, cart, course, about, contact; shared `<Navbar>` (calls `auth.api.getSession({ headers: await headers() })` server-side)
- Both layouts import `globals.css` independently

## Auth (better-auth 1.6.11)

- Email/password only, `autoSignIn: false`
- Handler: `src/app/api/auth/[...all]/route.ts`
- Client: `authClient` from `@/lib/auth-client` (`createAuthClient()` from `better-auth/react`)
- **`.env` keys**: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`

## Email (Contact form)

- `POST /api/contact` validates with Zod, sends via Resend
- Falls back to `console.log` if `RESEND_API_KEY` is unset
- **`.env` keys**: `RESEND_API_KEY`, `CONTACT_SENDER_EMAIL`, `CONTACT_RECEIVER_EMAIL`

## Data

- **Prisma + MariaDB**: `DATABASE_URL=mysql://root:pass@localhost:3307/ecommerce` (port 3307, not 3306). Docker setup in `docs/install_mariadb_with_docker.txt`.
- **External API (course)**: `src/lib/services/course-service.ts` fetches `https://api.codingthailand.com/api/course`.
- **Zustand cart**: Persisted to localStorage key `skill-cart`.
- **Static seed SQL**: `docs/create_table_ecommerce.sql`, `docs/insert_data_ecom_example.sql`.

## Architecture

```
src/
  app/
    (auth)/            login, signup
    (front)/           home, product, cart, course, about, contact
    api/
      auth/[...all]    better-auth handler
      contact/         POST - contact form email
  components/
    ui/                shadcn/ui radix-luma components
    navbar.tsx         server component with session check
    nav-menu.tsx       NavigationMenu links (add new pages here)
  lib/
    services/          business / data-access layer
    validations/       Zod schemas shared client + server
  types/               shared type definitions
```

## Notable

- No CI, no test framework, no typecheck (only `npm run lint`)
- `CLAUDE.md` delegates to `@AGENTS.md`
- `generated/` is gitignored — Prisma client regenerated per environment
- Docker build runs `npx prisma generate` then `npm run build` (standalone output)
- `import "dotenv/config"` in both `prisma.config.ts` and `src/lib/prisma.ts`
- `.env` is gitignored; contains DB credentials, auth secret, Resend API key
