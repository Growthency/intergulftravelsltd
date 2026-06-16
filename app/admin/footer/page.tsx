import { createAdminClient } from '@/lib/supabase/server';
import { PageHeader } from '@/components/admin/ui';
import { FooterManager, type FooterLink } from '@/components/admin/FooterManager';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Footer' };

async function loadFooter(): Promise<FooterLink[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('footer_links')
      .select('id, label, href, column_key, sort_order')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('[admin/footer] load failed:', error.message);
      return [];
    }
    return (data ?? []) as FooterLink[];
  } catch (err) {
    console.error('[admin/footer] unexpected error:', err);
    return [];
  }
}

export default async function FooterPage() {
  const links = await loadFooter();

  return (
    <>
      <PageHeader
        title="Footer"
        description="Manage the links shown in the site footer, organised into columns."
      />
      <FooterManager links={links} />
    </>
  );
}
