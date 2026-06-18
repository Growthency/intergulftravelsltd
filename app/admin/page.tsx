import Link from 'next/link';
import {
  Wallet,
  Banknote,
  HandCoins,
  TrendingUp,
  TrendingDown,
  Users,
  Moon,
  Inbox,
  Calculator,
  NotebookPen,
  BarChart3,
} from 'lucide-react';
import { mgmtDb } from '@/lib/management/server';
import type { AccountHead, Transaction } from '@/lib/management/types';
import { netDebit, naturalBalance } from '@/lib/management/types';
import { money } from '@/lib/management/format';
import { branchLabel } from '@/lib/management/branches';
import { formatDate } from '@/lib/utils';
import { PageHeader, Card, StatCard, EmptyState, TableWrap, thClass, tdClass, Money, Badge } from '@/components/manage/ui';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Dashboard' };

const today = () => new Date().toISOString().slice(0, 10);

type DashData = {
  cash: number;
  bank: number;
  receivable: number;
  todayIncome: number;
  todayExpense: number;
  hajjThisYear: number;
  umrahThisYear: number;
  newContacts: number;
  newEstimates: number;
  recentTx: { tx: Transaction; debitName: string; creditName: string }[];
  recentPilgrims: any[];
  hasManagement: boolean;
};

async function loadDashboard(): Promise<DashData> {
  const d: DashData = {
    cash: 0,
    bank: 0,
    receivable: 0,
    todayIncome: 0,
    todayExpense: 0,
    hajjThisYear: 0,
    umrahThisYear: 0,
    newContacts: 0,
    newEstimates: 0,
    recentTx: [],
    recentPilgrims: [],
    hasManagement: false,
  };

  const year = new Date().getFullYear();
  const t = today();

  // --- account heads: cash / bank / receivable balances ---
  let heads: AccountHead[] = [];
  try {
    const db = mgmtDb();
    const { data, error } = await db.from('account_heads').select('*').eq('active', true);
    if (!error && data) {
      heads = data as AccountHead[];
      d.hasManagement = true;
      for (const h of heads) {
        if (h.subtype === 'cash') d.cash += netDebit(h);
        else if (h.subtype === 'bank') d.bank += netDebit(h);
        else if (h.subtype === 'customer') {
          const due = naturalBalance(h);
          if (due > 0) d.receivable += due;
        }
      }
    }
  } catch {
    // management tables not present yet
  }

  // --- today's income & expense from today's vouchers ---
  try {
    const db = mgmtDb();
    const { data } = await db.from('transactions').select('*').eq('date', t);
    const todays = (data ?? []) as Transaction[];
    if (heads.length) {
      const byId = new Map(heads.map((h) => [h.id, h]));
      for (const tx of todays) {
        const credited = byId.get(tx.credit_account_id);
        const debited = byId.get(tx.debit_account_id);
        if (credited?.type === 'income') d.todayIncome += Number(tx.amount);
        if (debited?.type === 'expense') d.todayExpense += Number(tx.amount);
      }
    }
  } catch {
    // ignore
  }

  // --- recent transactions (with head names) ---
  try {
    const db = mgmtDb();
    const { data } = await db
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6);
    const recent = (data ?? []) as Transaction[];
    if (recent.length) {
      const ids = Array.from(
        new Set(recent.flatMap((tx) => [tx.debit_account_id, tx.credit_account_id])),
      );
      const nameOf = new Map(heads.map((h) => [h.id, h.name]));
      const missing = ids.filter((id) => !nameOf.has(id));
      if (missing.length) {
        const { data: extra } = await db.from('account_heads').select('id, name').in('id', missing);
        for (const h of extra ?? []) nameOf.set(h.id, h.name);
      }
      d.recentTx = recent.map((tx) => ({
        tx,
        debitName: nameOf.get(tx.debit_account_id) ?? 'Unknown',
        creditName: nameOf.get(tx.credit_account_id) ?? 'Unknown',
      }));
    }
  } catch {
    // ignore
  }

  // --- this-year pilgrim / passenger counts + recent pilgrims ---
  try {
    const db = mgmtDb();
    const head = { count: 'exact' as const, head: true };
    const [hajjCount, umrahCount, recent] = await Promise.all([
      db.from('hajj_pilgrims').select('id', head).eq('year', year),
      db.from('umrah_passengers').select('id', head),
      db
        .from('hajj_pilgrims')
        .select('id, tracking_no, name, reg_type, branch, created_at, year')
        .order('created_at', { ascending: false })
        .limit(6),
    ]);
    d.hajjThisYear = hajjCount.count ?? 0;
    d.umrahThisYear = umrahCount.count ?? 0;
    d.recentPilgrims = recent.data ?? [];
  } catch {
    // ignore
  }

  // --- website enquiries (existing tables) ---
  try {
    const db = mgmtDb();
    const head = { count: 'exact' as const, head: true };
    const [contacts, estimates] = await Promise.all([
      db.from('contact_requests').select('id', head).eq('handled', false),
      db.from('estimate_requests').select('id', head).eq('status', 'new'),
    ]);
    d.newContacts = contacts.count ?? 0;
    d.newEstimates = estimates.count ?? 0;
  } catch {
    // ignore
  }

  return d;
}

export default async function ManagementDashboard() {
  const d = await loadDashboard();
  const year = new Date().getFullYear();

  const quickActions = [
    { label: 'Daily Entry', href: '/admin/accounts/entry', icon: NotebookPen },
    { label: 'New Hajj Pre-reg', href: '/admin/hajj', icon: Users },
    { label: 'New Umrah Passenger', href: '/admin/umrah', icon: Moon },
    { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
  ];

  return (
    <>
      <PageHeader
        title="Management Dashboard"
        subtitle="A live financial and operational overview across Inter Gulf Travels, Mokbul Hajj Overseas and Inter Gulf Air."
        actions={
          <Link
            href="/admin/accounts/entry"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-emerald transition hover:bg-brand-700"
          >
            <NotebookPen className="h-4 w-4" /> New Entry
          </Link>
        }
      />

      {!d.hasManagement && (
        <div className="mb-6 rounded-2xl border border-gold-500/30 bg-gold-50 px-5 py-4 text-sm text-gold-800">
          The accounting tables are not set up yet. Figures will populate automatically once the
          management database migration has been applied.
        </div>
      )}

      {/* Money stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Cash in Hand" value={<Money value={d.cash} />} icon={Wallet} accent="emerald" />
        <StatCard label="Bank Balance" value={<Money value={d.bank} />} icon={Banknote} accent="emerald" />
        <StatCard
          label="Total Receivable"
          value={<Money value={d.receivable} />}
          icon={HandCoins}
          accent="gold"
          hint="Outstanding customer dues"
        />
        <StatCard
          label="Today's Income"
          value={<Money value={d.todayIncome} />}
          icon={TrendingUp}
          accent="emerald"
          hint={formatDate(today())}
        />
        <StatCard
          label="Today's Expense"
          value={<Money value={d.todayExpense} />}
          icon={TrendingDown}
          accent="red"
          hint={formatDate(today())}
        />
        <StatCard
          label={`Hajj Pilgrims ${year}`}
          value={d.hajjThisYear}
          icon={Users}
          accent="emerald"
          hint="Registered this year"
        />
      </div>

      {/* Operational stats */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Umrah Passengers" value={d.umrahThisYear} icon={Moon} accent="emerald" hint="Total on record" />
        <Link href="/admin/contacts" className="block">
          <StatCard
            label="Unhandled Contacts"
            value={d.newContacts}
            icon={Inbox}
            accent="gold"
            hint="Awaiting a reply"
          />
        </Link>
        <Link href="/admin/estimates" className="block">
          <StatCard
            label="New Estimates"
            value={d.newEstimates}
            icon={Calculator}
            accent="gold"
            hint="To be quoted"
          />
        </Link>
      </div>

      {/* Quick actions */}
      <Card className="mt-6">
        <p className="mb-3 text-sm font-semibold text-ink">Quick actions</p>
        <div className="flex flex-wrap gap-2.5">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.href}
                href={a.href}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2 text-sm font-medium text-ink transition hover:border-brand-600/40 hover:bg-brand-50 hover:text-brand-700"
              >
                <Icon className="h-4 w-4" />
                {a.label}
              </Link>
            );
          })}
        </div>
      </Card>

      {/* Recent activity */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Recent transactions */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">Recent transactions</h2>
            <Link href="/admin/accounts/vouchers" className="text-sm font-semibold text-brand-700 hover:underline">
              View all
            </Link>
          </div>
          {d.recentTx.length === 0 ? (
            <EmptyState
              title="No transactions yet"
              hint="Posted vouchers and daily entries will appear here."
            />
          ) : (
            <TableWrap className="min-w-0">
              <thead>
                <tr>
                  <th className={thClass}>Voucher</th>
                  <th className={thClass}>Particulars</th>
                  <th className={`${thClass} text-right`}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {d.recentTx.map(({ tx, debitName, creditName }) => (
                  <tr key={tx.id}>
                    <td className={`${tdClass} align-top`}>
                      <p className="font-mono text-xs text-ink">{tx.voucher_no ?? '—'}</p>
                      <p className="text-xs text-ink-muted">{formatDate(tx.date, { day: 'numeric', month: 'short' })}</p>
                    </td>
                    <td className={`${tdClass} align-top`}>
                      <p className="text-ink">
                        <span className="font-medium">Dr</span> {debitName}
                      </p>
                      <p className="text-ink-muted">
                        <span className="font-medium">Cr</span> {creditName}
                      </p>
                    </td>
                    <td className={`${tdClass} text-right align-top tabular-nums`}>{money(tx.amount, false)}</td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>
          )}
        </div>

        {/* Recent pilgrims */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">Recent pilgrims</h2>
            <Link href="/admin/hajj" className="text-sm font-semibold text-brand-700 hover:underline">
              View all
            </Link>
          </div>
          {d.recentPilgrims.length === 0 ? (
            <EmptyState
              title="No pilgrims yet"
              hint="New Hajj pre-registrations and registrations will appear here."
            />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <ul className="divide-y divide-border/70">
                {d.recentPilgrims.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-ink">{p.name}</p>
                      <p className="truncate text-xs text-ink-muted">
                        {p.tracking_no ? `${p.tracking_no} · ` : ''}
                        {branchLabel(p.branch)}
                      </p>
                    </div>
                    <Badge tone={p.reg_type === 'registered' ? 'emerald' : 'gold'}>
                      {p.reg_type === 'registered' ? 'Registered' : 'Pre-reg'}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
