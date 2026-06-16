-- ============================================================================
-- Inter Gulf Travels Ltd — Row Level Security & storage
-- 0002_policies.sql
--
-- Enables RLS on every public table, adds access policies, provisions the
-- storage buckets and wires up their policies. Run this after 0001_schema.sql.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Helper: is the current caller an admin?
-- SECURITY DEFINER so it can read profiles regardless of the caller's own RLS,
-- and stable so the planner can cache it within a statement.
-- ----------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;


-- ----------------------------------------------------------------------------
-- Enable RLS
-- ----------------------------------------------------------------------------
alter table public.profiles          enable row level security;
alter table public.blog_posts        enable row level security;
alter table public.site_settings     enable row level security;
alter table public.menu_items        enable row level security;
alter table public.footer_links      enable row level security;
alter table public.gallery_images    enable row level security;
alter table public.contact_requests  enable row level security;
alter table public.estimate_requests enable row level security;
alter table public.vault_items       enable row level security;


-- ----------------------------------------------------------------------------
-- profiles
--   * a user can read and update their own row
--   * admins can read every row
-- ----------------------------------------------------------------------------
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

drop policy if exists "profiles_select_admin" on public.profiles;
create policy "profiles_select_admin"
  on public.profiles for select
  to authenticated
  using (public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());


-- ----------------------------------------------------------------------------
-- blog_posts
--   * anyone may read published posts
--   * admins have full access
-- ----------------------------------------------------------------------------
drop policy if exists "blog_posts_select_published" on public.blog_posts;
create policy "blog_posts_select_published"
  on public.blog_posts for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "blog_posts_select_admin" on public.blog_posts;
create policy "blog_posts_select_admin"
  on public.blog_posts for select
  to authenticated
  using (public.is_admin());

drop policy if exists "blog_posts_insert_admin" on public.blog_posts;
create policy "blog_posts_insert_admin"
  on public.blog_posts for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "blog_posts_update_admin" on public.blog_posts;
create policy "blog_posts_update_admin"
  on public.blog_posts for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "blog_posts_delete_admin" on public.blog_posts;
create policy "blog_posts_delete_admin"
  on public.blog_posts for delete
  to authenticated
  using (public.is_admin());


-- ----------------------------------------------------------------------------
-- Public, admin-managed content: site_settings, menu_items,
-- footer_links, gallery_images.
--   * public SELECT
--   * admin INSERT / UPDATE / DELETE
-- ----------------------------------------------------------------------------

-- site_settings
drop policy if exists "site_settings_select_public" on public.site_settings;
create policy "site_settings_select_public"
  on public.site_settings for select
  to anon, authenticated
  using (true);

drop policy if exists "site_settings_insert_admin" on public.site_settings;
create policy "site_settings_insert_admin"
  on public.site_settings for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "site_settings_update_admin" on public.site_settings;
create policy "site_settings_update_admin"
  on public.site_settings for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "site_settings_delete_admin" on public.site_settings;
create policy "site_settings_delete_admin"
  on public.site_settings for delete
  to authenticated
  using (public.is_admin());

-- menu_items
drop policy if exists "menu_items_select_public" on public.menu_items;
create policy "menu_items_select_public"
  on public.menu_items for select
  to anon, authenticated
  using (true);

drop policy if exists "menu_items_insert_admin" on public.menu_items;
create policy "menu_items_insert_admin"
  on public.menu_items for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "menu_items_update_admin" on public.menu_items;
create policy "menu_items_update_admin"
  on public.menu_items for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "menu_items_delete_admin" on public.menu_items;
create policy "menu_items_delete_admin"
  on public.menu_items for delete
  to authenticated
  using (public.is_admin());

-- footer_links
drop policy if exists "footer_links_select_public" on public.footer_links;
create policy "footer_links_select_public"
  on public.footer_links for select
  to anon, authenticated
  using (true);

drop policy if exists "footer_links_insert_admin" on public.footer_links;
create policy "footer_links_insert_admin"
  on public.footer_links for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "footer_links_update_admin" on public.footer_links;
create policy "footer_links_update_admin"
  on public.footer_links for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "footer_links_delete_admin" on public.footer_links;
create policy "footer_links_delete_admin"
  on public.footer_links for delete
  to authenticated
  using (public.is_admin());

-- gallery_images
drop policy if exists "gallery_images_select_public" on public.gallery_images;
create policy "gallery_images_select_public"
  on public.gallery_images for select
  to anon, authenticated
  using (true);

drop policy if exists "gallery_images_insert_admin" on public.gallery_images;
create policy "gallery_images_insert_admin"
  on public.gallery_images for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "gallery_images_update_admin" on public.gallery_images;
create policy "gallery_images_update_admin"
  on public.gallery_images for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "gallery_images_delete_admin" on public.gallery_images;
create policy "gallery_images_delete_admin"
  on public.gallery_images for delete
  to authenticated
  using (public.is_admin());


-- ----------------------------------------------------------------------------
-- Lead capture: contact_requests, estimate_requests.
--   * anyone (incl. anonymous visitors) may INSERT
--   * only admins may SELECT / UPDATE
-- ----------------------------------------------------------------------------

-- contact_requests
drop policy if exists "contact_requests_insert_anyone" on public.contact_requests;
create policy "contact_requests_insert_anyone"
  on public.contact_requests for insert
  to anon, authenticated
  with check (true);

drop policy if exists "contact_requests_select_admin" on public.contact_requests;
create policy "contact_requests_select_admin"
  on public.contact_requests for select
  to authenticated
  using (public.is_admin());

drop policy if exists "contact_requests_update_admin" on public.contact_requests;
create policy "contact_requests_update_admin"
  on public.contact_requests for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- estimate_requests
drop policy if exists "estimate_requests_insert_anyone" on public.estimate_requests;
create policy "estimate_requests_insert_anyone"
  on public.estimate_requests for insert
  to anon, authenticated
  with check (true);

drop policy if exists "estimate_requests_select_admin" on public.estimate_requests;
create policy "estimate_requests_select_admin"
  on public.estimate_requests for select
  to authenticated
  using (public.is_admin());

drop policy if exists "estimate_requests_update_admin" on public.estimate_requests;
create policy "estimate_requests_update_admin"
  on public.estimate_requests for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());


-- ----------------------------------------------------------------------------
-- vault_items
--   * a user has full access to their own rows
--   * admins may read every row
-- ----------------------------------------------------------------------------
drop policy if exists "vault_items_select_own" on public.vault_items;
create policy "vault_items_select_own"
  on public.vault_items for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "vault_items_select_admin" on public.vault_items;
create policy "vault_items_select_admin"
  on public.vault_items for select
  to authenticated
  using (public.is_admin());

drop policy if exists "vault_items_insert_own" on public.vault_items;
create policy "vault_items_insert_own"
  on public.vault_items for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "vault_items_update_own" on public.vault_items;
create policy "vault_items_update_own"
  on public.vault_items for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "vault_items_delete_own" on public.vault_items;
create policy "vault_items_delete_own"
  on public.vault_items for delete
  to authenticated
  using (user_id = auth.uid());


-- ============================================================================
-- Storage buckets
-- ============================================================================
-- "media"  — public images for the site (gallery, blog covers, logos).
-- "vault"  — private per-user document storage. Files are namespaced under a
--            top-level folder equal to the owner's auth.uid(), e.g.
--            vault/<uid>/passport.pdf
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values
  ('media', 'media', true),
  ('vault', 'vault', false)
on conflict (id) do nothing;


-- ----------------------------------------------------------------------------
-- Storage policies
--   media → public read, admin write
--   vault → owner read/write only (path prefixed by auth.uid()), admin read
-- ----------------------------------------------------------------------------

-- media: anyone may read.
drop policy if exists "media_read_public" on storage.objects;
create policy "media_read_public"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

-- media: admins may upload / change / remove.
drop policy if exists "media_insert_admin" on storage.objects;
create policy "media_insert_admin"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media_update_admin" on storage.objects;
create policy "media_update_admin"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media_delete_admin" on storage.objects;
create policy "media_delete_admin"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and public.is_admin());

-- vault: a user may read their own files (folder name = their uid).
drop policy if exists "vault_read_own" on storage.objects;
create policy "vault_read_own"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'vault'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- vault: admins may read every file.
drop policy if exists "vault_read_admin" on storage.objects;
create policy "vault_read_admin"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'vault' and public.is_admin());

-- vault: a user may upload into their own folder.
drop policy if exists "vault_insert_own" on storage.objects;
create policy "vault_insert_own"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'vault'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- vault: a user may update their own files.
drop policy if exists "vault_update_own" on storage.objects;
create policy "vault_update_own"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'vault'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'vault'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- vault: a user may delete their own files.
drop policy if exists "vault_delete_own" on storage.objects;
create policy "vault_delete_own"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'vault'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
