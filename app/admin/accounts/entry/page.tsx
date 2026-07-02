import { PageHeader } from '@/components/manage/ui';
import { VoucherForm, type HeadOption } from '@/components/manage/accounts/VoucherForm';
import { loadActiveHeads } from '@/lib/management/accounts-data';
import { getLocale } from '@/lib/i18n-server';
import { getDict } from '@/lib/dictionaries/areas/adminaccounting';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Daily Entry' };

export default async function DailyEntryPage() {
  const t = getDict(getLocale());
  const heads = await loadActiveHeads();
  const options: HeadOption[] = heads.map((h) => ({
    id: h.id,
    name: h.name,
    type: h.type,
    subtype: h.subtype,
    code: h.code,
    party_phone: h.party_phone,
  }));

  return (
    <>
      <PageHeader
        title={t.entry.title}
        subtitle={t.entry.subtitle}
      />
      <VoucherForm heads={options} />
    </>
  );
}
