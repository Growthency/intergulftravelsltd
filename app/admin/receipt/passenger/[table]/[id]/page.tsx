import { notFound } from 'next/navigation';
import { mgmtDb } from '@/lib/management/server';
import { getStaffScope } from '@/lib/management/scope';
import { naturalBalance, type AccountHead, type Payment } from '@/lib/management/types';
import { money } from '@/lib/management/format';
import { branchLabel } from '@/lib/management/branches';
import { siteConfig, contact } from '@/lib/site';
import { getLocale } from '@/lib/i18n-server';
import { Receipt, type ReceiptData } from '@/components/manage/Receipt';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Receipt', robots: { index: false, follow: false } };

function fmt(d: string) {
  const dt = new Date(d);
  return Number.isNaN(dt.getTime()) ? d : dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

const TABLES: Record<string, string> = { umrah: 'umrah_passengers', hajj: 'hajj_pilgrims' };

export default async function PassengerReceiptPage({ params }: { params: { table: string; id: string } }) {
  const locale = getLocale();
  const table = TABLES[params.table];
  if (!table) notFound();

  const db = mgmtDb();
  const scope = await getStaffScope();

  const { data: personRow } = await db
    .from(table)
    .select('name, phone, address, package_id, account_head_id, branch, passport_no')
    .eq('id', params.id)
    .maybeSingle();
  if (!personRow) notFound();
  const person = personRow as {
    name: string;
    phone: string | null;
    address: string | null;
    package_id: string | null;
    account_head_id: string | null;
    branch: string;
    passport_no: string | null;
  };
  if (scope.branch && person.branch !== scope.branch) notFound();

  const [{ data: payRows }, pkgRes, headRes] = await Promise.all([
    db
      .from('payments')
      .select('*')
      .eq('party_table', table)
      .eq('party_id', params.id)
      .order('date', { ascending: true })
      .order('created_at', { ascending: true }),
    person.package_id
      ? db.from('mgmt_packages').select('name').eq('id', person.package_id).maybeSingle()
      : Promise.resolve({ data: null }),
    person.account_head_id
      ? db.from('account_heads').select('*').eq('id', person.account_head_id).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const payments = (payRows ?? []) as Payment[];
  const packageName = (pkgRes.data as { name?: string } | null)?.name ?? '';
  const due = headRes.data ? Math.max(0, naturalBalance(headRes.data as AccountHead)) : 0;
  const paid = payments.reduce((s, p) => s + (p.type === 'refund' ? -Number(p.amount) : Number(p.amount)), 0);

  const methodMap: Record<string, string> =
    locale === 'bn' ? { cash: 'নগদ', bank: 'ব্যাংক' } : { cash: 'Cash', bank: 'Bank' };
  const typeMap: Record<string, string> =
    locale === 'bn'
      ? { advance: 'অগ্রিম', installment: 'কিস্তি', token: 'টোকেন', full: 'সম্পূর্ণ', refund: 'রিফান্ড' }
      : { advance: 'Advance', installment: 'Installment', token: 'Token', full: 'Full', refund: 'Refund' };

  const data: ReceiptData = {
    company: {
      name: siteConfig.name,
      address: contact.address.full,
      phone: contact.phones.join(', '),
      email: contact.emails[0],
      license: siteConfig.license,
    },
    program: params.table === 'hajj' ? (locale === 'bn' ? 'হজ' : 'Hajj') : locale === 'bn' ? 'উমরাহ' : 'Umrah',
    receiptNo: person.passport_no || params.id.slice(0, 8).toUpperCase(),
    date: fmt(new Date().toISOString()),
    branch: branchLabel(person.branch),
    partyName: person.name,
    partyPhone: person.phone || '—',
    partyAddress: person.address || '',
    packageName,
    amount: money(paid, false),
    amountWords: '',
    method: '',
    type: '',
    narration: '',
    paid: money(paid, false),
    due: money(due, false),
    isRefund: false,
    payments: payments.map((p) => ({
      date: fmt(p.date),
      type: typeMap[p.type] ?? p.type,
      method: methodMap[p.method] ?? p.method,
      amount: money(p.type === 'refund' ? -Number(p.amount) : Number(p.amount), false),
    })),
  };

  return <Receipt data={data} locale={locale} />;
}
