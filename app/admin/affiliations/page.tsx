import { createAdminClient } from '@/lib/supabase/server';
import { PageHeader } from '@/components/admin/ui';
import { AffiliationsManager } from '@/components/admin/AffiliationsManager';
import type { Affiliation } from '@/lib/affiliations';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Affiliations' };

async function loadAffiliations(): Promise<Affiliation[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('affiliations')
      .select('id, category, name, logo_url, website_url, sort_order, active')
      .order('category', { ascending: true })
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      console.error('[admin/affiliations] load failed:', error.message);
      return [];
    }
    return (data ?? []) as Affiliation[];
  } catch (err) {
    console.error('[admin/affiliations] unexpected error:', err);
    return [];
  }
}

export default async function AffiliationsPage() {
  const affiliations = await loadAffiliations();

  return (
    <>
      <PageHeader
        title="Affiliations (Flight & Hotels)"
        description="Manage the airline and hotel partners shown on the public site. Upload a logo for each partner — every image is stored as optimized WebP."
      />
      <AffiliationsManager initial={affiliations} />
    </>
  );
}
