import { createAdminClient } from '@/lib/supabase/server';
import { PageHeader } from '@/components/admin/ui';
import { EstimatesTable, type EstimateRow } from '@/components/admin/EstimatesTable';
import { getLocale } from '@/lib/i18n-server';
import { getDict } from '@/lib/dictionaries/areas/adminwebsite';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Estimate Requests' };

async function loadEstimates(): Promise<EstimateRow[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('estimate_requests')
      .select('id, name, email, phone, service, package, travel_date, pax, message, status, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[admin/estimates] load failed:', error.message);
      return [];
    }
    return (data ?? []) as EstimateRow[];
  } catch (err) {
    console.error('[admin/estimates] unexpected error:', err);
    return [];
  }
}

export default async function EstimatesPage() {
  const rows = await loadEstimates();
  const t = getDict(getLocale());

  return (
    <>
      <PageHeader title={t.estimates.title} description={t.estimates.description} />
      <EstimatesTable rows={rows} />
    </>
  );
}
