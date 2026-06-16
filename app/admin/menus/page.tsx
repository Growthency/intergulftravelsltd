import { createAdminClient } from '@/lib/supabase/server';
import { PageHeader } from '@/components/admin/ui';
import { MenusManager, type MenuItem } from '@/components/admin/MenusManager';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Navigation' };

async function loadMenus(): Promise<MenuItem[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('menu_items')
      .select('id, label, href, parent_id, sort_order, location')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('[admin/menus] load failed:', error.message);
      return [];
    }
    return (data ?? []) as MenuItem[];
  } catch (err) {
    console.error('[admin/menus] unexpected error:', err);
    return [];
  }
}

export default async function MenusPage() {
  const items = await loadMenus();

  return (
    <>
      <PageHeader
        title="Navigation"
        description="Manage the site's navigation links. Nest items under a parent to create dropdown submenus."
      />
      <MenusManager items={items} />
    </>
  );
}
