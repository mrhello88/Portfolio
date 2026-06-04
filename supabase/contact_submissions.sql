-- Run in Supabase → SQL Editor (once)

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  source text not null default 'header',
  status text not null default 'new'
);

alter table public.contact_submissions enable row level security;

-- No public policies: inserts go through Server Action + service role key only.

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);
