-- ============================================================================
--  0005_secure_vault_branches.sql
--  • Secure Vault — encrypted credential store (passwords AES-256-GCM at rest)
--  • Branch tag on profiles — for branch-scoped admins
--  Run AFTER the earlier migrations.
-- ============================================================================

-- ---- Secure Vault credentials ----------------------------------------------
create table if not exists public.vault_credentials (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  url          text,
  username     text,
  password_enc text not null,            -- AES-256-GCM ciphertext (iv:tag:ct)
  icon_url     text,
  notes        text,
  created_by   uuid,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists idx_vault_created on public.vault_credentials(created_at desc);

-- Locked down: no client policies, so only the service-role admin API can read
-- or write. Passwords are never exposed to the browser except, decrypted, to a
-- signed-in administrator through that API.
alter table public.vault_credentials enable row level security;

-- ---- Branch-scoped admins --------------------------------------------------
-- A staff member tagged with a branch only ever sees that branch's data.
-- NULL branch = head office / super admin (sees everything).
alter table public.profiles add column if not exists branch text;
