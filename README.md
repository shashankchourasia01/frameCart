# FrameCraft

Premium custom photo frame e-commerce — **Turn Memories Into Art**

WhatsApp-first ordering for the Indian market. Warm editorial luxury UI with React, Express, and Supabase.

## Stack

- **Client:** React 18 + Vite + TypeScript + Tailwind + Framer Motion + Zustand + TanStack Query
- **Server:** Node 20 + Express (MVC)
- **Database:** Supabase (PostgreSQL) — optional; mock data works without it

## Quick start

```bash
# Terminal 1 — API
cd server
npm install
npm run dev

# Terminal 2 — Frontend
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

The API serves **42 mock frames** when Supabase is not configured in `server/.env`.

**Site empty but Supabase is connected?** Your database likely has no products. See **[supabase/SUPABASE_SETUP.md](supabase/SUPABASE_SETUP.md)**.

## Supabase setup (42 frames)

1. Create a project at [supabase.com](https://supabase.com)
2. In SQL Editor, run in order: `schema.sql` → `rls_policies.sql` → `seed.sql` (full catalog)
3. Copy **Project URL** + **service_role** key into `server/.env`
4. Copy **anon** key into `client/.env` for admin login

Full steps: **[supabase/SUPABASE_SETUP.md](supabase/SUPABASE_SETUP.md)**

**Production deploy (services, costs, image storage — Hinglish):** **[docs/PRODUCTION_DEPLOYMENT_GUIDE.md](docs/PRODUCTION_DEPLOYMENT_GUIDE.md)**

Check API: `http://localhost:5000/health` should show `dataSource` and product count hints.

## Scripts

| Command | Location | Description |
|---------|----------|-------------|
| `npm run dev` | client | Vite dev server |
| `npm run build` | client | Production build |
| `npm run dev` | server | Nodemon API |

## Admin

- URL: `/admin/login`
- Requires Supabase Auth when configured; any Bearer token works for mock admin routes in dev
