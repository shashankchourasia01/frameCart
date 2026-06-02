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

The API serves **mock products/categories/offers** when Supabase is not configured.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql`, then `supabase/rls_policies.sql`, then `supabase/seed.sql` in the SQL editor
3. Create a Storage bucket `uploads` (public or signed URLs)
4. Copy keys into `client/.env` and `server/.env` (see `.env.example` files)
5. Create an admin user in Supabase Auth and set JWT custom claim `role` to `admin` if using RLS admin policies

## Images

All hero, category banners, product gallery, and design thumbnails use **blank placeholders** until you upload assets via the admin panel or set URLs in the database.

## Scripts

| Command | Location | Description |
|---------|----------|-------------|
| `npm run dev` | client | Vite dev server |
| `npm run build` | client | Production build |
| `npm run dev` | server | Nodemon API |

## Admin

- URL: `/admin/login`
- Requires Supabase Auth when configured; any Bearer token works for mock admin routes in dev
