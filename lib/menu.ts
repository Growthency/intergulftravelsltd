import { unstable_cache } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/server';
import type { NavItem } from '@/lib/site';

type MenuRow = {
  id: string;
  label: string | null;
  href: string | null;
  parent_id: string | null;
  sort_order: number | null;
  location: string | null;
};

async function loadHeaderMenu(): Promise<NavItem[] | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('menu_items')
      .select('id, label, href, parent_id, sort_order, location')
      .eq('location', 'header')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) return null;

    const ordered = [...(data as MenuRow[])].sort(
      (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
    );
    const tops = ordered.filter((r) => !r.parent_id && r.label && r.href);

    const menu: NavItem[] = tops.map((top) => {
      const children = ordered
        .filter((r) => r.parent_id === top.id && r.label && r.href)
        .map((c) => ({ label: c.label as string, href: c.href as string }));
      const item: NavItem = { label: top.label as string, href: top.href as string };
      if (children.length) item.children = children;
      return item;
    });

    return menu.length ? menu : null;
  } catch {
    return null;
  }
}

/**
 * Cached header menu (cookieless → keeps public pages statically renderable).
 * Revalidates every 5 min; the menu-builder Save can also revalidate the tag.
 */
export const getHeaderMenu = unstable_cache(loadHeaderMenu, ['header-menu-v1'], {
  revalidate: 300,
  tags: ['header-menu'],
});
