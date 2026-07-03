# GJR EVENTS — Premium Event Management Platform

A production-ready event management website built with Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Supabase, React Hook Form, and Zod. No separate backend — everything runs inside Next.js via Server Actions and Route Handlers.

## Tech Stack

- **Next.js 15** (App Router, Server Actions, Route Handlers)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (hand-wired components in `components/ui`)
- **Supabase** (Postgres + Auth + Storage)
- **React Hook Form + Zod**
- **Telegram Bot API** for booking/contact notifications

## 1. Install dependencies

```bash
npm install
```

## 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** → paste the contents of `supabase/schema.sql` → **Run**.
   This creates the `bookings`, `contact_messages`, and `gallery_images` tables, enables Row Level Security, and creates the public `gallery` storage bucket.
3. Go to **Authentication → Users → Add User** and create the single admin account (email + password). Use the same email in `ADMIN_EMAIL` below.
4. Go to **Authentication → Providers → Email** and turn **OFF** "Allow new users to sign up" (no public registration).

## 3. Set up Telegram notifications (optional but recommended)

1. Message [@BotFather](https://t.me/BotFather) on Telegram, run `/newbot`, and copy the token → `TELEGRAM_BOT_TOKEN`.
2. Message your new bot, then visit `https://api.telegram.org/bot<token>/getUpdates` to find your `chat.id` → `TELEGRAM_CHAT_ID`.

## 4. Configure environment variables

Fill in `.env.local` (already present in the project root):

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

WHATSAPP_PHONE=

ADMIN_EMAIL=
```

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → `anon` `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → `service_role` key (**never expose client-side**) |
| `TELEGRAM_BOT_TOKEN` | From BotFather |
| `TELEGRAM_CHAT_ID` | From the Telegram `getUpdates` API |
| `WHATSAPP_PHONE` | Your WhatsApp Business number, digits only with country code, e.g. `919000000000` |
| `ADMIN_EMAIL` | The email of the single admin account created in Supabase Auth |

## 5. Run the app

```bash
npm run dev
```

Visit `http://localhost:3000`. Admin login is at `http://localhost:3000/admin`.

## 6. Build for production

```bash
npm run build
npm run start
```

> Note: `next/font/google` fetches font files from Google Fonts at build time, so an internet connection is required during `npm run build` / `npm run dev`.

## Project Structure

```
app/
  (site)/            Public marketing site (shares the Navbar/Footer layout)
    page.tsx          Home
    about/            About
    services/         Services
    gallery/          Gallery (Supabase Storage images)
    packages/         Packages
    booking/          Booking form (Server Action -> Supabase + Telegram)
    contact/          Contact form (Server Action -> Supabase + Telegram)
    privacy-policy/
    terms-conditions/
  admin/
    page.tsx           Admin login
    dashboard/         Protected dashboard (middleware + requireAdmin())
      page.tsx          Overview stats
      gallery/          Upload / delete / edit captions
      bookings/         Search, filter, mark completed, delete
      messages/         Read / delete contact messages
  api/
    gallery/route.ts    Public Route Handler for filtered/paginated gallery images
  sitemap.ts / robots.ts
  not-found.tsx / error.tsx

components/
  ui/                 shadcn/ui primitives (button, input, dialog, table, form, etc.)
  layout/             Navbar, Footer
  home/                Hero, service highlights, testimonials
  shared/             PageHeader, CTA, FAQ, ServiceCard, PackageCard, TestimonialCard, WhatsApp button
  booking/ contact/    Public forms
  gallery/            Public gallery grid + lightbox
  admin/              Dashboard sidebar/header, gallery manager, bookings table, messages list

lib/
  supabase/           client.ts (browser), server.ts (SSR), admin.ts (service role), middleware.ts
  actions/            Server Actions: booking, contact, gallery, booking-admin, messages, auth
  validations/        Zod schemas: booking, contact, auth, gallery
  constants.ts        Site content (nav, services, packages, testimonials, FAQ)
  telegram.ts         Telegram notification helper
  auth.ts             requireAdmin() / getAdminUser()
  env.ts              Environment variable validation
  utils.ts            cn(), formatDate(), formatCurrency(), etc.

types/                Database types + app-level types
middleware.ts         Refreshes Supabase session + protects /admin/* routes
supabase/schema.sql   Full DB schema, RLS policies, storage bucket setup
```

## Security Notes

- The **Service Role Key** is only ever imported in files marked `import "server-only"` (`lib/supabase/admin.ts`, `lib/actions/*`, `lib/auth.ts`) and is never sent to the client.
- All admin mutations (`lib/actions/booking-admin.ts`, `lib/actions/messages.ts`, `lib/actions/gallery.ts`) call `requireAdmin()` before touching the database, in addition to middleware-level route protection.
- `bookings` and `contact_messages` have **no public RLS policies** — they are only reachable through the Service Role Key in Server Actions, keeping submitted PII private even if the anon key leaks.
- Only `gallery_images` (read) and the `gallery` storage bucket (read) are publicly exposed via RLS, since they power the public gallery page.
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) are set globally in `next.config.ts`.

## Replacing the Logo

The navbar and footer currently render `GJR EVENTS` as styled text (`components/layout/navbar.tsx`, `components/layout/footer.tsx`). Once you have the final logo, replace the `<span>` with a `next/image` component pointing at your logo file in `public/`.
