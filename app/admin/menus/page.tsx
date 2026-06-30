import { createAdminClient } from '@/lib/supabase/server';
import { getLocale } from '@/lib/i18n-server';
import { getDict } from '@/lib/dictionaries/areas/adminsystem';
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
  const t = getDict(getLocale());
  const items = await loadHeaderItems();

  return (
    <>
      <PageHeader
        title={t.menusTitle}
        description={t.menusDesc}
      />
      <MenuBuilder initial={items} />
    </>
  );
}
