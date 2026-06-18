-- ============================================================================
--  0003_management.sql
--  Inter Gulf web-software: Accounting (double-entry) + Hajj/Umrah management
--  Run AFTER 0001_schema.sql and 0002_policies.sql.
-- ============================================================================

-- ---- staff roles -----------------------------------------------------------
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check
  check (role in ('user', 'admin', 'staff', 'accountant', 'operator'));

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('admin', 'accountant', 'operator', 'staff')
  );
$$;

-- ---- serial-number counters ------------------------------------------------
create table if not exists public.counters (
  key   text primary key,
  value bigint not null default 0
);

create or replace function public.next_counter(p_key text)
returns bigint language plpgsql security definer set search_path = public as $$
declare v bigint;
begin
  insert into public.counters(key, value) values (p_key, 1)
  on conflict (key) do update set value = public.counters.value + 1
  returning value into v;
  return v;
end; $$;

-- ---- chart of accounts -----------------------------------------------------
create table if not exists public.account_heads (
  id              uuid primary key default gen_random_uuid(),
  code            text,
  name            text not null,
  type            text not null check (type in ('asset','liability','income','expense','equity')),
  subtype         text not null default 'general'
                  check (subtype in ('cash','bank','customer','supplier','loan','expense','income','general','equity')),
  branch          text not null default 'general',
  is_system       boolean not null default false,
  opening_balance numeric(16,2) not null default 0,
  opening_is_debit boolean not null default true,
  debit_total     numeric(16,2) not null default 0,
  credit_total    numeric(16,2) not null default 0,
  bank_name       text,
  account_no      text,
  party_phone     text,
  ref_table       text,
  ref_id          uuid,
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);
create index if not exists idx_heads_subtype on public.account_heads(subtype);
create index if not exists idx_heads_ref on public.account_heads(ref_table, ref_id);

-- ---- management packages (separate from the public marketing packages) ------
create table if not exists public.mgmt_packages (
  id          uuid primary key default gen_random_uuid(),
  type        text not null check (type in ('hajj','umrah')),
  name        text not null,
  year        int,
  price       numeric(16,2) not null default 0,
  seats       int,
  branch      text not null default 'general',
  description text,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ---- transactions (double-entry: one debit head + one credit head) ----------
create table if not exists public.transactions (
  id                uuid primary key default gen_random_uuid(),
  voucher_no        text,
  date              date not null default current_date,
  type              text not null default 'journal'
                    check (type in ('receipt','payment','contra','journal','expense','income')),
  debit_account_id  uuid not null references public.account_heads(id),
  credit_account_id uuid not null references public.account_heads(id),
  amount            numeric(16,2) not null check (amount > 0),
  narration         text,
  branch            text not null default 'general',
  method            text check (method in ('cash','bank','adjustment')),
  ref_table         text,
  ref_id            uuid,
  created_by        uuid,
  created_at        timestamptz not null default now()
);
create index if not exists idx_tx_date   on public.transactions(date desc);
create index if not exists idx_tx_debit  on public.transactions(debit_account_id);
create index if not exists idx_tx_credit on public.transactions(credit_account_id);

-- keep account balances in sync (transactions are immutable: insert / delete only)
create or replace function public.apply_transaction()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    update public.account_heads set debit_total  = debit_total  + new.amount where id = new.debit_account_id;
    update public.account_heads set credit_total = credit_total + new.amount where id = new.credit_account_id;
    return new;
  elsif tg_op = 'DELETE' then
    update public.account_heads set debit_total  = debit_total  - old.amount where id = old.debit_account_id;
    update public.account_heads set credit_total = credit_total - old.amount where id = old.credit_account_id;
    return old;
  end if;
  return null;
end; $$;

drop trigger if exists trg_apply_transaction on public.transactions;
create trigger trg_apply_transaction
  after insert or delete on public.transactions
  for each row execute function public.apply_transaction();

-- ---- Hajj pilgrims (pre-registration + registration) ------------------------
create table if not exists public.hajj_pilgrims (
  id              uuid primary key default gen_random_uuid(),
  tracking_no     text,
  name            text not null,
  name_bn         text,
  father_name     text,
  mother_name     text,
  nid             text,
  passport_no     text,
  dob             date,
  gender          text,
  phone           text,
  address         text,
  district        text,
  year            int not null,
  reg_type        text not null default 'pre-registration'
                  check (reg_type in ('pre-registration','registered')),
  pre_reg_no      text,
  govt_serial     text,
  package_id      uuid references public.mgmt_packages(id),
  account_head_id uuid references public.account_heads(id),
  branch          text not null default 'general',
  status          text not null default 'active' check (status in ('active','cancelled','completed')),
  token_money     numeric(16,2) default 0,
  photo_url       text,
  note            text,
  created_by      uuid,
  created_at      timestamptz not null default now()
);
create index if not exists idx_hajj_year on public.hajj_pilgrims(year);
create index if not exists idx_hajj_pkg  on public.hajj_pilgrims(package_id);

-- ---- Umrah passengers -------------------------------------------------------
create table if not exists public.umrah_passengers (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  name_bn         text,
  passport_no     text,
  passport_issue  date,
  passport_expiry date,
  dob             date,
  phone           text,
  address         text,
  package_id      uuid references public.mgmt_packages(id),
  account_head_id uuid references public.account_heads(id),
  branch          text not null default 'general',
  status          text not null default 'active' check (status in ('active','cancelled','completed')),
  token_money     numeric(16,2) default 0,
  photo_url       text,
  note            text,
  created_by      uuid,
  created_at      timestamptz not null default now()
);
create index if not exists idx_umrah_pkg on public.umrah_passengers(package_id);

-- auto-create a customer account head the moment a pilgrim/passenger is entered
create or replace function public.create_customer_head()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_head uuid; v_code text;
begin
  if new.account_head_id is null then
    v_code := 'C-' || lpad(public.next_counter('customer_code')::text, 5, '0');
    insert into public.account_heads(code, name, type, subtype, branch, party_phone, ref_table, ref_id)
    values (v_code, new.name, 'asset', 'customer', new.branch, new.phone, tg_table_name, new.id)
    returning id into v_head;
    new.account_head_id := v_head;
  end if;
  return new;
end; $$;

drop trigger if exists trg_hajj_head on public.hajj_pilgrims;
create trigger trg_hajj_head before insert on public.hajj_pilgrims
  for each row execute function public.create_customer_head();

drop trigger if exists trg_umrah_head on public.umrah_passengers;
create trigger trg_umrah_head before insert on public.umrah_passengers
  for each row execute function public.create_customer_head();

-- ---- payments / installments ------------------------------------------------
create table if not exists public.payments (
  id              uuid primary key default gen_random_uuid(),
  voucher_no      text,
  date            date not null default current_date,
  party_table     text,                 -- 'hajj_pilgrims' | 'umrah_passengers'
  party_id        uuid,
  account_head_id uuid references public.account_heads(id),
  amount          numeric(16,2) not null check (amount > 0),
  method          text not null default 'cash' check (method in ('cash','bank')),
  bank_account_id uuid references public.account_heads(id),
  type            text not null default 'installment'
                  check (type in ('advance','installment','token','full','refund')),
  narration       text,
  branch          text not null default 'general',
  transaction_id  uuid references public.transactions(id),
  created_by      uuid,
  created_at      timestamptz not null default now()
);
create index if not exists idx_pay_party on public.payments(party_table, party_id);

-- ---- loans given / taken ----------------------------------------------------
create table if not exists public.loans (
  id              uuid primary key default gen_random_uuid(),
  party_name      text not null,
  party_phone     text,
  type            text not null check (type in ('given','taken')),
  principal       numeric(16,2) not null,
  date            date not null default current_date,
  due_date        date,
  status          text not null default 'open' check (status in ('open','partial','closed')),
  narration       text,
  branch          text not null default 'general',
  account_head_id uuid references public.account_heads(id),
  created_by      uuid,
  created_at      timestamptz not null default now()
);

-- ---- activity log -----------------------------------------------------------
create table if not exists public.activity_log (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid,
  user_email  text,
  action      text not null,
  entity      text,
  entity_id   text,
  detail      jsonb,
  branch      text,
  created_at  timestamptz not null default now()
);
create index if not exists idx_activity_date on public.activity_log(created_at desc);

-- ---- seed: system account heads --------------------------------------------
insert into public.account_heads (code, name, type, subtype, is_system, branch)
select v.code, v.name, v.type, v.subtype, true, 'general'
from (values
  ('1001','Cash in Hand',        'asset',     'cash'),
  ('4001','Hajj Package Income',  'income',    'income'),
  ('4002','Umrah Package Income', 'income',    'income'),
  ('4003','Air Ticket Income',    'income',    'income'),
  ('4004','Visa Service Income',  'income',    'income'),
  ('5001','Office Rent',          'expense',   'expense'),
  ('5002','Salary & Wages',       'expense',   'expense'),
  ('5003','Utility Bills',        'expense',   'expense'),
  ('5004','Office Expense',       'expense',   'expense'),
  ('5005','Travelling & Conveyance','expense', 'expense'),
  ('1501','Loan Receivable',      'asset',     'loan'),
  ('2501','Loan Payable',         'liability', 'loan'),
  ('3001','Capital',              'equity',    'equity')
) as v(code, name, type, subtype)
where not exists (select 1 from public.account_heads h where h.name = v.name and h.is_system);

-- ---- RLS (staff read; all writes go through the service-role API) -----------
alter table public.account_heads   enable row level security;
alter table public.mgmt_packages   enable row level security;
alter table public.transactions    enable row level security;
alter table public.hajj_pilgrims   enable row level security;
alter table public.umrah_passengers enable row level security;
alter table public.payments        enable row level security;
alter table public.loans           enable row level security;
alter table public.activity_log    enable row level security;
alter table public.counters        enable row level security;

do $$
declare t text;
begin
  foreach t in array array[
    'account_heads','mgmt_packages','transactions','hajj_pilgrims',
    'umrah_passengers','payments','loans','activity_log'
  ] loop
    execute format('drop policy if exists "staff read %1$s" on public.%1$s;', t);
    execute format('create policy "staff read %1$s" on public.%1$s for select using (public.is_staff());', t);
  end loop;
end $$;

-- public marketing packages can also be auto-seeded into mgmt_packages later by the app
