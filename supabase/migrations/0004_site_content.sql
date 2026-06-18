-- ============================================================================
--  0004_site_content.sql — Videos + Affiliations (flight / hotel) — admin-managed
--  Run AFTER the earlier migrations.
-- ============================================================================

create table if not exists public.videos (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  youtube_url text not null,
  youtube_id  text,
  description text,
  sort_order  int not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists public.affiliations (
  id          uuid primary key default gen_random_uuid(),
  category    text not null check (category in ('flight', 'hotel')),
  name        text not null,
  logo_url    text,
  website_url text,
  sort_order  int not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

alter table public.videos enable row level security;
alter table public.affiliations enable row level security;

drop policy if exists "public read videos" on public.videos;
create policy "public read videos" on public.videos for select using (active = true);

drop policy if exists "public read affiliations" on public.affiliations;
create policy "public read affiliations" on public.affiliations for select using (active = true);

-- seed affiliations from the company's flight & hotel partners (logos added later in admin)
insert into public.affiliations (category, name, sort_order)
select v.category, v.name, v.sort_order
from (values
  ('flight', 'Biman Bangladesh Airlines', 1),
  ('flight', 'Saudia',                    2),
  ('flight', 'Emirates',                  3),
  ('flight', 'Qatar Airways',             4),
  ('flight', 'US-Bangla Airlines',        5),
  ('flight', 'SalamAir',                  6),
  ('flight', 'Jazeera Airways',           7),
  ('flight', 'Kuwait Airways',            8),
  ('flight', 'Air Arabia',                9),
  ('hotel',  'Hilton Suites Makkah',      1),
  ('hotel',  'InterContinental Dar Al Tawhid Makkah', 2),
  ('hotel',  'Hyatt Regency Makkah',      3),
  ('hotel',  'Shaza Makkah',              4),
  ('hotel',  'Conrad Makkah',             5),
  ('hotel',  'Raffles Makkah Palace',     6)
) as v(category, name, sort_order)
where not exists (
  select 1 from public.affiliations a where a.name = v.name and a.category = v.category
);
