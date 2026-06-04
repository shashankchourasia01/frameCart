# Supabase setup — show all 42 frames on the website

The API loads products from **Supabase** when `server/.env` has `SUPABASE_URL` and `SUPABASE_SERVICE_KEY`.  
If those are set but the database is **empty** (or only the old 2-product seed), the site will look **blank**.

You can either **fill Supabase** (recommended for production) or **use mock data** (quick local demo).

---

## Option A — Use Supabase (production)

### 1. Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) → New project.
2. Wait until the database is ready.

### 2. Run SQL in order (SQL Editor)

Open **SQL Editor** in Supabase and run each file **once**, in this order:

| Order | File | Purpose |
|-------|------|---------|
| 1 | `supabase/schema.sql` | Tables |
| 2 | `supabase/rls_policies.sql` | Public read access |
| 3 | `supabase/migrations/20250604_order_customer_address.sql` | Order address columns (if upgrading) |
| 4 | `supabase/seed.sql` | **6 categories + 42 frames + offers** |

After step 4, verify:

```sql
SELECT COUNT(*) FROM categories;  -- should be 6
SELECT COUNT(*) FROM products;    -- should be 42
```

### 3. Configure `server/.env`

Create `server/.env` (copy from `server/.env.example`):

```env
PORT=5000
CLIENT_URL=http://localhost:5173
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key
```

Get keys from Supabase → **Project Settings** → **API**:

- **Project URL** → `SUPABASE_URL` (use the base URL only, not `/rest/v1`)
- **service_role** key → `SUPABASE_SERVICE_KEY` (secret — server only, never put in the client)

### 4. Configure `client/.env` (admin login only)

```env
VITE_API_URL=/api/v1
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_public_key
VITE_BUSINESS_WHATSAPP=91XXXXXXXXXX
```

Create an admin user in Supabase **Authentication** → Users, then add a row in `admin_profiles` if you use admin login.

### 5. Start the app

```bash
# Terminal 1 — API
cd server
npm install
npm run dev

# Terminal 2 — Website
cd client
npm install
npm run dev
```

Open http://localhost:5173 — you should see frames on the home page and in each category.

### 6. Re-seed later (refresh all products)

**Option 1 — from your machine (easiest):**

```bash
npm run seed:supabase
npm run verify:supabase
```

**Option 2 — SQL Editor:** run `supabase/seed.sql` again (unlinks orders from products, then reloads 42 frames).

Or regenerate seed from code:

```bash
node scripts/generate-supabase-seed.js
```

Then run the new `supabase/seed.sql` in Supabase.

---

## Option B — No Supabase (local demo, 42 frames from code)

If you **do not** want Supabase yet:

1. **Do not** create `server/.env`, or **remove** `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` from it.
2. Start the server — it uses **in-memory mock data** (42 products).
3. Restart the server after any catalog change.

```bash
cd server && npm run dev
cd client && npm run dev
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Empty home page, no frames | Supabase connected but not seeded → run `seed.sql` **or** remove Supabase env vars to use mock |
| API error / network failed | Start `server` on port 5000; `VITE_API_URL=/api/v1` in client |
| Only 2 products in Supabase | Old seed — run the **new** `supabase/seed.sql` (42 products) |
| Images not loading | Pexels URLs need internet; check browser network tab |
| Admin shows no products | Admin uses same API; seed products and ensure `is_active = true` |

### Quick API check

With the server running:

```text
http://localhost:5000/api/v1/products
```

You should get a JSON array with **42** items.

```text
http://localhost:5000/api/v1/categories
```

You should get **6** categories.

---

## Summary

| You want… | Do this |
|-----------|---------|
| Data in Supabase | Run `schema.sql` → `rls_policies.sql` → `seed.sql`, set `server/.env` |
| Quick test without Supabase | Leave `SUPABASE_*` unset in `server/.env`, restart server |
