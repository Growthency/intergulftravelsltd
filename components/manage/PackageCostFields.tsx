'use client';

import { Plus, Trash2 } from 'lucide-react';
import { inputClass } from '@/components/manage/ui';
import { money } from '@/lib/management/format';
import { totalCost, type CostItem } from '@/lib/management/package-meta';
import { useLocale } from '@/components/providers/LocaleProvider';

const LABELS = {
  en: {
    costs: 'Cost breakdown',
    hint: 'Add each cost (food, hotel, air fare…). The total is the package cost per seat, used to show profit.',
    amount: 'Amount',
    add: 'Add cost item',
    total: 'Total cost',
    note: 'Note (optional)',
    labelPh: 'e.g. Hotel',
  },
  bn: {
    costs: 'খরচের বিবরণ',
    hint: 'প্রতিটি খরচ যোগ করুন (খাবার, হোটেল, বিমান ভাড়া…)। মোট = প্রতি আসনের খরচ, যা দিয়ে লাভ দেখানো হয়।',
    amount: 'পরিমাণ',
    add: 'খরচ যোগ করুন',
    total: 'মোট খরচ',
    note: 'নোট (ঐচ্ছিক)',
    labelPh: 'যেমন হোটেল',
  },
};

export function PackageCostFields({
  costs,
  note,
  onCosts,
  onNote,
  className,
}: {
  costs: CostItem[];
  note: string;
  onCosts: (c: CostItem[]) => void;
  onNote: (n: string) => void;
  className?: string;
}) {
  const L = LABELS[useLocale()];
  const setItem = (i: number, patch: Partial<CostItem>) =>
    onCosts(costs.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
  const add = () => onCosts([...costs, { label: '', amount: 0 }]);
  const remove = (i: number) => onCosts(costs.filter((_, idx) => idx !== i));
  const total = totalCost(costs);

  return (
    <div className={className}>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm font-medium text-ink">{L.costs}</span>
        <span className="text-xs text-ink-muted">
          {L.total}: <span className="font-semibold text-ink">{money(total)}</span>
        </span>
      </div>
      <p className="mb-2 text-xs text-ink-muted">{L.hint}</p>

      <div className="space-y-2">
        {costs.map((c, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              className={inputClass}
              placeholder={L.labelPh}
              value={c.label}
              onChange={(e) => setItem(i, { label: e.target.value })}
            />
            <input
              type="number"
              min={0}
              step="0.01"
              className={`${inputClass} w-32 shrink-0`}
              placeholder={L.amount}
              value={c.amount || ''}
              onChange={(e) => setItem(i, { amount: Number(e.target.value) || 0 })}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-ink-muted transition hover:bg-rose-50 hover:text-rose-600"
              aria-label={L.total}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:underline"
      >
        <Plus className="h-3.5 w-3.5" /> {L.add}
      </button>

      <div className="mt-3">
        <span className="mb-1 block text-sm font-medium text-ink">{L.note}</span>
        <textarea className={inputClass} rows={2} value={note} onChange={(e) => onNote(e.target.value)} />
      </div>
    </div>
  );
}
