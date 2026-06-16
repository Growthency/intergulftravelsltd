-- ============================================================================
-- Inter Gulf Travels Ltd — schema
-- 0001_schema.sql
--
-- Tables, functions and triggers for the public website and admin dashboard.
-- Row Level Security policies live in 0002_policies.sql. Run this file first.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Extensions
-- ----------------------------------------------------------------------------
-- pgcrypto provides gen_random_uuid(). On Supabase it usually lives in the
-- "extensions" schema, so create it there and keep it on the search path.
create extension if not exists pgcrypto with schema extensions;


-- ----------------------------------------------------------------------------
-- Shared trigger functions
-- ----------------------------------------------------------------------------

-- Keep an updated_at column in sync on every UPDATE.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Create a profiles row whenever a new auth user signs up. The first matching
-- email in the hardcoded allowlist is provisioned as an admin, everyone else
-- starts as a regular user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_emails text[] := array['admin@intergulftravelsltd.com'];
  resolved_role text := 'user';
begin
  if new.email is not null and lower(new.email) = any (
    select lower(unnest(admin_emails))
  ) then
    resolved_role := 'admin';
  end if;

  insert into public.profiles (id, email, full_name, avatar_url, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url',
    resolved_role
  )
  on conflict (id) do nothing;

  return new;
end;
$$;


-- ----------------------------------------------------------------------------
-- profiles
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text,
  full_name   text,
  phone       text,
  avatar_url  text,
  role        text not null default 'user' check (role in ('user', 'admin', 'staff')),
  created_at  timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles (role);

-- Provision a profile on signup.
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ----------------------------------------------------------------------------
-- blog_posts
-- ----------------------------------------------------------------------------
create table if not exists public.blog_posts (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  title            text not null,
  excerpt          text,
  content          text,
  category         text not null default 'hajj-umrah' check (category in ('hajj-umrah', 'others')),
  tags             text[] not null default '{}',
  author_name      text default 'Inter Gulf Travels',
  author_role      text default 'Editorial Team',
  read_time        text,
  tone             text default 'emerald',
  featured_image   text,
  status           text not null default 'draft' check (status in ('draft', 'published', 'scheduled')),
  featured         boolean not null default false,
  meta_title       text,
  meta_description text,
  published_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create unique index if not exists blog_posts_slug_idx on public.blog_posts (slug);
create index if not exists blog_posts_status_published_idx
  on public.blog_posts (status, published_at desc);
create index if not exists blog_posts_category_idx on public.blog_posts (category);

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();


-- ----------------------------------------------------------------------------
-- site_settings
-- ----------------------------------------------------------------------------
create table if not exists public.site_settings (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();


-- ----------------------------------------------------------------------------
-- menu_items
-- ----------------------------------------------------------------------------
create table if not exists public.menu_items (
  id         uuid primary key default gen_random_uuid(),
  label      text not null,
  href       text not null,
  parent_id  uuid references public.menu_items (id) on delete cascade,
  sort_order int not null default 0,
  location   text not null default 'header'
);

create index if not exists menu_items_parent_idx on public.menu_items (parent_id);
create index if not exists menu_items_location_sort_idx on public.menu_items (location, sort_order);


-- ----------------------------------------------------------------------------
-- footer_links
-- ----------------------------------------------------------------------------
create table if not exists public.footer_links (
  id         uuid primary key default gen_random_uuid(),
  label      text not null,
  href       text not null,
  column_key text not null default 'help',
  sort_order int not null default 0
);

create index if not exists footer_links_column_sort_idx on public.footer_links (column_key, sort_order);


-- ----------------------------------------------------------------------------
-- gallery_images
-- ----------------------------------------------------------------------------
create table if not exists public.gallery_images (
  id         uuid primary key default gen_random_uuid(),
  title      text,
  url        text not null,
  category   text default 'general',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists gallery_images_category_sort_idx on public.gallery_images (category, sort_order);


-- ----------------------------------------------------------------------------
-- contact_requests
-- ----------------------------------------------------------------------------
create table if not exists public.contact_requests (
  id         uuid primary key default gen_random_uuid(),
  name       text,
  email      text,
  phone      text,
  subject    text,
  message    text,
  handled    boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists contact_requests_created_idx on public.contact_requests (created_at desc);
create index if not exists contact_requests_handled_idx on public.contact_requests (handled);


-- ----------------------------------------------------------------------------
-- estimate_requests
-- ----------------------------------------------------------------------------
create table if not exists public.estimate_requests (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  email       text,
  phone       text,
  service     text,
  package     text,
  travel_date date,
  pax         int,
  message     text,
  status      text not null default 'new',
  created_at  timestamptz not null default now()
);

create index if not exists estimate_requests_created_idx on public.estimate_requests (created_at desc);
create index if not exists estimate_requests_status_idx on public.estimate_requests (status);


-- ----------------------------------------------------------------------------
-- vault_items
-- ----------------------------------------------------------------------------
create table if not exists public.vault_items (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  title      text,
  doc_type   text default 'other',
  file_url   text,
  file_type  text,
  notes      text,
  created_at timestamptz not null default now()
);

create index if not exists vault_items_user_idx on public.vault_items (user_id, created_at desc);
