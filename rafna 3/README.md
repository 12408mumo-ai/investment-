# Rafna Investment — E-commerce Catalogue

Premium product catalogue for **Rafna Investment** (Kamkunji, Nairobi, Kenya).
Orthopaedic mattresses, beddings, and household goods — ordered via **WhatsApp**, not a shopping cart.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · Supabase (Postgres, Auth, Storage) · Vercel

---

## Features

- **No cart / no checkout / no online payment** — every product has **Order Now** → modal → pre-filled WhatsApp message to `+254 710 565 055`
- **Live catalogue** from Supabase `products` table (never hardcoded)
- **Category filters:** Orthopaedic Mattresses · Beddings · Households
- **Admin dashboard** (`/admin`) protected by Supabase email/password Auth
- **Image uploads** to Supabase Storage bucket `product-images`
- **RLS:** public read; insert/update/delete for authenticated users only
- Policies shown clearly: free Nairobi delivery, countrywide delivery, Pay on Delivery, Shop Pick Up at Kamkunji

---

## 1. Clone & install

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

---

## 2. Supabase setup

### 2.1 Create a project

1. Go to [https://supabase.com](https://supabase.com) and create a project.
2. Wait until the database is ready.

### 2.2 Run the SQL setup script

1. Open **SQL Editor** → **New query**.
2. Paste the entire contents of [`supabase/setup.sql`](./supabase/setup.sql).
3. Click **Run**.

This creates:

- `products` table (`id`, `title`, `category`, `price`, `description`, `image_url`, `created_at`, `updated_at`)
- Row Level Security policies (public `SELECT`; authenticated `INSERT` / `UPDATE` / `DELETE`)
- Public Storage bucket `product-images` with matching policies
- Auto-updating `updated_at` trigger

### 2.3 Create an admin user

1. Supabase Dashboard → **Authentication** → **Users** → **Add user**
2. Choose **Email** + password (this is your admin login for `/admin`)
3. Confirm the user is created (disable email confirmation in Auth settings if you want immediate login without verifying email)

> There are **no hardcoded credentials** in the app. Only this Supabase user can manage products.

### 2.4 Copy API keys

Dashboard → **Project Settings** → **API**:

| Value | Env variable |
|--------|----------------|
| Project URL | `VITE_SUPABASE_URL` |
| `anon` `public` key | `VITE_SUPABASE_ANON_KEY` |

Use **only** the anon/public key on the frontend. Never put the `service_role` key in the client.

---

## 3. Local environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY
```

Start the dev server:

```bash
npm run dev
```

- Public site: `/` and `/shop`
- Admin: `/admin` (sign in with the user you created)

---

## 4. Deploy with GitHub → Vercel

### 4.1 Push to GitHub

```bash
git init   # if needed
git add .
git commit -m "Initial Rafna Investment catalogue"
git branch -M main
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

### 4.2 Import on Vercel

1. [Vercel](https://vercel.com) → **Add New** → **Project** → import the GitHub repo.
2. Framework preset: **Vite** (auto-detected).
3. **Before the first deploy**, open **Environment Variables** and add:

| Name | Value |
|------|--------|
| `VITE_SUPABASE_URL` | same as local `.env` |
| `VITE_SUPABASE_ANON_KEY` | same as local `.env` |

4. Apply to **Production** (and **Preview** if you want preview deploys to work).
5. Click **Deploy**.

### 4.3 If you add or change env vars later

Vercel → Project → **Settings** → **Environment Variables** → save → then **Deployments** → **Redeploy** the latest deployment so Vite bakes the new values into the build.

---

## 5. Order flow (customer)

1. Open **Shop** → tap **Order Now** on a product.
2. Modal shows product image, name, and price.
3. Choose **Delivery** (enter location; note about free Nairobi / countrywide delivery) or **Shop Pick Up** (location auto-fills to `Kamkunji Pick Up`).
4. Enter full name and phone.
5. **Send Order via WhatsApp** opens:

```text
https://wa.me/254710565055?text=...
```

with a message like:

```text
Hello Rafna Investment,

I would like to order:
- Product: …
- Price: KES …
- Fulfillment: Delivery / Shop Pick Up
- Location: …
- Name: …
- Phone: …
```

---

## 6. Admin flow

1. Go to `/admin` and sign in.
2. **Add New Product** — title, category, price (KES), description, image file.
3. On submit: image → Storage `product-images` → public URL → insert into `products`.
4. **Edit** pre-fills the form; optional new image replaces the old file when possible.
5. **Delete** asks for confirmation, then removes the DB row and storage object when possible.
6. Click the logo to return to the public site. **Logout** ends the session.

---

## 7. Project structure

```text
src/
  components/     Header, Footer, Layout, ProductCard, OrderModal, …
  pages/          HomePage, ShopPage, AdminPage
  context/        AuthContext (Supabase session)
  lib/            supabase client, products API, WhatsApp helpers, types
supabase/
  setup.sql       Full DB + RLS + Storage setup
.env.example      Env template
```

---

## 8. Business contacts

| | |
|--|--|
| Business | Rafna Investment |
| Location | Kamkunji, Nairobi, Kenya |
| WhatsApp | +254 710 565 055 |
| Email | rafnainvestment@gmail.com |

---

## License

Private business use — Rafna Investment.
