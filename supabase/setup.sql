-- Run in Supabase → SQL Editor (Step 2 — tables + RLS)
-- Your app tables live in the "public" schema (Table Editor → schema dropdown → public)

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  attending boolean not null,
  timestamp timestamptz not null
);

alter table public.wishes enable row level security;
alter table public.rsvps enable row level security;

create policy "Anyone can read wishes"
  on public.wishes for select using (true);

create policy "Anyone can insert wishes"
  on public.wishes for insert with check (true);

create policy "Anyone can insert rsvps"
  on public.rsvps for insert with check (true);

-- Step 3 — LIVE guestbook: add wishes to Realtime publication
-- (Table Editor "realtime" schema is NOT where you enable this)
alter publication supabase_realtime add table public.wishes;
