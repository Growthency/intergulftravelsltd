import { createAdminClient } from '@/lib/supabase/server';
import { PageHeader } from '@/components/admin/ui';
import { MenuBuilder, type BuilderItem } from '@/components/admin/MenuBuilder';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Menu Builder' };

async function loadHeaderItems(): Promise<BuilderItem[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('menu_items')
      .select('id, label, href, parent_id, sort_order, location')
      .eq('location', 'header')
      .order('sort_order', { ascending: true });

    if (error || !data) return [];
    return data as BuilderItem[];
  } catch {
    // menu_items may not exist yet — builder simply starts empty.
    return [];
  }
}

export default async function MenusPage() {
  const items = await loadHeaderItems();

  return (
    <>
      <PageHeader
        title="Menu Builder"
        description="Build your header menu. Add pages or custom links, reorder, and nest one item under another. Empty menu = the automatic default nav."
      />
      <MenuBuilder initial={items} />
    </>
  );
}
