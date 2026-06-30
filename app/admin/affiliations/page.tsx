import { createAdminClient } from '@/lib/supabase/server';
import { PageHeader } from '@/components/admin/ui';
import { AffiliationsManager } from '@/components/admin/AffiliationsManager';
import type { Affiliation } from '@/lib/affiliations';
import { getLocale } from '@/lib/i18n-server';
import { getDict } from '@/lib/dictionaries/areas/adminwebsite';

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
  const t = getDict(getLocale());

  return (
    <>
      <PageHeader title={t.affiliations.title} description={t.affiliations.description} />
      <AffiliationsManager initial={affiliations} />
    </>
  );
}
