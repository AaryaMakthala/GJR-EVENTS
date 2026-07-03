-- ============================================================
-- GJR EVENTS — Supabase Database Schema
-- Run this entire file in the Supabase SQL Editor
-- (Project → SQL Editor → New Query → paste → Run)
-- ============================================================

-- Extensions
create extension if not exists "pgcrypto";

-- ============================================================
-- TABLE: bookings
-- ============================================================
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  event_type text not null,
  event_date date not null,
  guest_count integer not null check (guest_count > 0),
  location text not null,
  package text,
  message text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);

-- ============================================================
-- TABLE: contact_messages
-- ============================================================
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

-- ============================================================
-- TABLE: gallery_images
-- ============================================================
create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  storage_path text not null,
  caption text,
  category text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists gallery_images_category_idx on public.gallery_images (category);
create index if not exists gallery_images_created_at_idx
  on public.gallery_images (created_at desc);

-- ============================================================
-- ROW LEVEL SECURITY
-- All tables are only written to via the Service Role Key from
-- trusted Server Actions / Route Handlers. Public reads are
-- granted only where the website needs them (gallery).
-- ============================================================

alter table public.bookings enable row level security;
alter table public.contact_messages enable row level security;
alter table public.gallery_images enable row level security;

-- Public can read published gallery images (used by the public gallery page).
drop policy if exists "Public can view gallery images" on public.gallery_images;
create policy "Public can view gallery images"
  on public.gallery_images
  for select
  using (true);

-- No public policies exist for bookings or contact_messages —
-- all access happens server-side through the Service Role Key,
-- which bypasses RLS. This keeps client-submitted PII private.

-- ============================================================
-- STORAGE: gallery bucket
-- ============================================================
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

-- Public can view/download files in the gallery bucket.
drop policy if exists "Public can view gallery bucket" on storage.objects;
create policy "Public can view gallery bucket"
  on storage.objects
  for select
  using (bucket_id = 'gallery');

-- Uploads/deletes to the gallery bucket happen only via the
-- Service Role Key in Server Actions, which bypasses these
-- storage policies — no public write/delete policy is defined.

-- ============================================================
-- ADMIN USER
-- Create the single admin account from:
-- Supabase Dashboard → Authentication → Users → Add User
-- Use the same email as ADMIN_EMAIL in your .env.local
-- Disable public sign-ups from:
-- Authentication → Providers → Email → toggle "Allow new users to sign up" OFF
-- ============================================================
