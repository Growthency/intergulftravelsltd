# Supabase — Inter Gulf Travels Ltd

The database layer for the Inter Gulf Travels website: schema, Row Level Security
policies, storage buckets and seed content.

```
supabase/
├── migrations/
│   ├── 0001_schema.sql     # extensions, tables, functions, triggers
│   └── 0002_policies.sql   # RLS, storage buckets, storage policies
├── seed.sql                # site settings, blog posts, gallery, menu, footer
└── README.md
```

## Run order

Always apply the files in this order — `0002` depends on the tables created in
`0001`, and `seed.sql` depends on both:

1. `migrations/0001_schema.sql`
2. `migrations/0002_policies.sql`
3. `seed.sql`

## How to run

### Option A — Supabase SQL Editor (no tooling required)

1. Open your project at <https://supabase.com/dashboard> → **SQL Editor**.
2. Paste the contents of `0001_schema.sql`, run it.
3. Paste `0002_policies.sql`, run it.
4. Paste `seed.sql`, run it.

The SQL is idempotent: tables use `create table if not exists`, policies are
`drop policy if exists` then `create policy`, and every seed insert uses
`on conflict do nothing`, so you can safely re-run any file.

### Option B — Supabase CLI

With the CLI installed and linked (`supabase link --project-ref <ref>`):

```bash
# push the two migration files to the linked project
supabase db push

# load seed data
supabase db execute --file supabase/seed.sql
```

If you develop locally with `supabase start`, the files in `supabase/migrations`
are applied automatically and `supabase/seed.sql` is run on `supabase db reset`.

### Option C — psql

Using the connection string from **Project Settings → Database**:

```bash
psql "$DATABASE_URL" -f supabase/migrations/0001_schema.sql
psql "$DATABASE_URL" -f supabase/migrations/0002_policies.sql
psql "$DATABASE_URL" -f supabase/seed.sql
```

## What gets created

### Tables (schema `public`)

| Table               | Purpose                                                      |
| ------------------- | ----------------------------------------------------------- |
| `profiles`          | One row per auth user; carries `role` (`user`/`admin`/`staff`). |
| `blog_posts`        | Editorial content. Public reads see `status = 'published'`. |
| `site_settings`     | Key/JSONB store for contact, social and theme settings.     |
| `menu_items`        | Header navigation (self-referencing `parent_id` for dropdowns). |
| `footer_links`      | Footer link columns (`help`, `useful`).                     |
| `gallery_images`    | Public gallery images.                                      |
| `contact_requests`  | Contact-form submissions (lead capture).                    |
| `estimate_requests` | Quote / estimate submissions (lead capture).                |
| `vault_items`       | Private per-user document records.                          |

### Triggers & functions

- **`set_updated_at()`** — a generic `BEFORE UPDATE` trigger that bumps
  `updated_at = now()`. Attached to `blog_posts` and `site_settings`.
- **`handle_new_user()`** — a `SECURITY DEFINER` trigger on `auth.users`. On
  every signup it inserts a matching `public.profiles` row (`id`, `email`,
  name/avatar from the auth metadata). If the new user's email is in the
  hardcoded allowlist (`admin@intergulftravelsltd.com`) the profile is created
  with `role = 'admin'`; otherwise `role = 'user'`.
- **`is_admin()`** — a `STABLE SECURITY DEFINER` helper returning `true` when the
  calling user's profile has `role = 'admin'`. It is used throughout the RLS
  policies so admin checks stay consistent and avoid recursive policy lookups.

### Row Level Security (summary)

| Table                                | anon / authenticated read | write                                    |
| ------------------------------------ | ------------------------- | ---------------------------------------- |
| `profiles`                           | own row; admins read all  | update own row                           |
| `blog_posts`                         | `status = 'published'`    | admins full access                       |
| `site_settings` / `menu_items` / `footer_links` / `gallery_images` | public read | admins write |
| `contact_requests` / `estimate_requests` | admins only           | **anyone may INSERT**; admins SELECT/UPDATE |
| `vault_items`                        | own rows; admins read all | full access to own rows                  |

### Storage buckets

Created in `0002_policies.sql`:

- **`media`** (public) — site images: gallery, blog covers, logos.
  Anyone can read; only admins can upload, update or delete.
- **`vault`** (private) — per-user documents. Files must be stored under a
  top-level folder named after the owner's user id, e.g.
  `vault/<auth.uid()>/passport.pdf`. The policies use
  `(storage.foldername(name))[1] = auth.uid()::text` so a user can only read,
  upload, update and delete files inside their own folder. Admins may read every
  vault file.

  When uploading from the app, always prefix the object path with the user's id:

  ```ts
  const path = `${user.id}/${file.name}`;
  await supabase.storage.from('vault').upload(path, file);
  ```

## Making a user an admin

Three ways, depending on the situation:

1. **Allowlisted email (automatic).** Sign up / log in with
   `admin@intergulftravelsltd.com`. The `handle_new_user()` trigger provisions
   that account as an admin automatically. To change or extend the list, edit the
   `admin_emails` array inside `handle_new_user()` in `0001_schema.sql` (it should
   stay in sync with `DEFAULT_ADMINS` / `ADMIN_EMAILS` used by `lib/admin.ts`).

2. **Promote an existing user by email.** Run in the SQL Editor:

   ```sql
   update public.profiles
   set role = 'admin'
   where email = 'someone@example.com';
   ```

3. **Promote by Supabase user id** (from **Authentication → Users**):

   ```sql
   update public.profiles
   set role = 'admin'
   where id = '00000000-0000-0000-0000-000000000000';
   ```

After promotion the user gains full access to admin-protected reads/writes the
next time their session is evaluated, because every policy resolves admin status
through `is_admin()`.
