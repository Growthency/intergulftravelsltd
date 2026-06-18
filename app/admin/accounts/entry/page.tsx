import { PageHeader } from '@/components/manage/ui';
import { VoucherForm, type HeadOption } from '@/components/manage/accounts/VoucherForm';
import { loadActiveHeads } from '@/lib/management/accounts-data';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Daily Entry' };

export default async function DailyEntryPage() {
  const heads = await loadActiveHeads();
  const options: HeadOption[] = heads.map((h) => ({
    id: h.id,
    name: h.name,
    type: h.type,
    subtype: h.subtype,
    code: h.code,
  }));

  return (
    <>
      <PageHeader
        title="Daily Entry"
        subtitle="Post the day's vouchers — income, expenses, cash/bank transfers and journals."
      />
      <VoucherForm heads={options} />
    </>
  );
}
