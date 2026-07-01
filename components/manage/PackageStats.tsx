'use client';

import { money } from '@/lib/management/format';
import { parsePackageMeta, totalCost } from '@/lib/management/package-meta';
import { useLocale } from '@/components/providers/LocaleProvider';
import { cn } from '@/lib/utils';

const LABELS = {
  en: {
    sell: 'Sell price', cost: 'Cost / seat', profit: 'Profit / seat',
    target: 'Target', filled: 'Booked', remaining: 'Remaining',
    earn: 'Expected earn', netProfit: 'Expected profit', netLoss: 'Expected loss',
    seats: 'seats', perSeat: 'per seat',
  },
  bn: {
    sell: 'বিক্রয় মূল্য', cost: 'খরচ / আসন', profit: 'লাভ / আসন',
    target: 'লক্ষ্য', filled: 'বুক হয়েছে', remaining: 'বাকি',
    earn: 'প্রত্যাশিত আয়', netProfit: 'প্রত্যাশিত লাভ', netLoss: 'প্রত্যাশিত ক্ষতি',
    seats: 'আসন', perSeat: 'প্রতি আসন',
  },
};

/**
 * At-a-glance costing + progress for a management package. Reads the itemised
 * cost from the package description meta and combines it with the seat target
 * and the number of pilgrims/passengers actually booked.
 */
export function PackageStats({
  price,
  description,
  seats,
  assignedCount,
}: {
  price: number | string;
  description: string | null | undefined;
  seats: number | null | undefined;
  assignedCount: number;
}) {
  const L = LABELS[useLocale()];
  const sell = Number(price) || 0;
  const cost = totalCost(parsePackageMeta(description).costs);
  const profitPerSeat = sell - cost;
  const target = seats && seats > 0 ? seats : 0;
  const filled = assignedCount;
  const remaining = Math.max(0, target - filled);
  const expectedEarn = sell * filled;
  const expectedProfit = profitPerSeat * filled;
  const pct = target ? Math.min(100, Math.round((filled / target) * 100)) : 0;

  return (
    <div className="mt-3 rounded-xl border border-border bg-background/40 p-3">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        <Tile label={L.sell} value={money(sell, false)} />
        <Tile label={L.cost} value={money(cost, false)} />
        <Tile
          label={L.profit}
          value={money(profitPerSeat, false)}
          tone={profitPerSeat >= 0 ? 'emerald' : 'red'}
        />
        <Tile label={L.target} value={target || '—'} />
        <Tile label={L.filled} value={filled} tone="emerald" />
        <Tile label={L.remaining} value={target ? remaining : '—'} tone="gold" />
      </div>

      {target > 0 && (
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-xs text-ink-muted">
            <span>
              {filled} / {target} {L.seats}
            </span>
            <span className="font-semibold text-ink">{pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-brand-gradient transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-border/70 pt-3 text-sm">
        <span className="text-ink-muted">
          {L.earn}: <span className="font-semibold text-ink tabular-nums">{money(expectedEarn)}</span>
        </span>
        <span className="text-ink-muted">
          {expectedProfit >= 0 ? L.netProfit : L.netLoss}:{' '}
          <span
            className={cn(
              'font-semibold tabular-nums',
              expectedProfit >= 0 ? 'text-brand-700' : 'text-red-600',
            )}
          >
            {money(Math.abs(expectedProfit))}
          </span>
        </span>
      </div>
    </div>
  );
}

function Tile({
  label,
  value,
  tone = 'slate',
}: {
  label: string;
  value: React.ReactNode;
  tone?: 'slate' | 'emerald' | 'red' | 'gold';
}) {
  const color = {
    slate: 'text-ink',
    emerald: 'text-brand-700',
    red: 'text-red-600',
    gold: 'text-gold-700',
  }[tone];
  return (
    <div className="rounded-lg bg-card px-2.5 py-2 text-center shadow-soft">
      <p className="truncate text-[0.65rem] font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
      <p className={cn('mt-0.5 font-display text-sm font-semibold tabular-nums', color)}>{value}</p>
    </div>
  );
}
