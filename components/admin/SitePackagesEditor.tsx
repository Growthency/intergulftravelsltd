'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Save, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { inputClass } from '@/components/manage/ui';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { L10n, SitePackage, SitePackagesDoc } from '@/lib/site-packages';

type PkgType = 'hajj' | 'umrah';

const LABELS = {
  en: {
    hajj: 'Hajj Packages',
    umrah: 'Umrah Packages',
    name: 'Package name',
    price: 'Price',
    priceNote: 'Price note',
    duration: 'Duration',
    badge: 'Badge (optional)',
    featured: 'Featured — highlight this card',
    features: 'Features / inclusions',
    addFeature: 'Add feature',
    addPackage: 'Add package',
    remove: 'Remove',
    save: 'Save packages',
    saved: 'Packages saved',
    saveFail: 'Could not save',
    network: 'Network error',
    empty: 'No packages yet — add one.',
    en: 'English',
    bn: 'বাংলা',
    pricePh: 'e.g. ৳1,15,000',
    hint: 'Each card has an English and a Bangla field — both show on the matching version of the site.',
  },
  bn: {
    hajj: 'হজ প্যাকেজ',
    umrah: 'উমরাহ প্যাকেজ',
    name: 'প্যাকেজের নাম',
    price: 'মূল্য',
    priceNote: 'মূল্যের নোট',
    duration: 'সময়কাল',
    badge: 'ব্যাজ (ঐচ্ছিক)',
    featured: 'ফিচার্ড — এই কার্ডটি হাইলাইট করুন',
    features: 'সুবিধা / অন্তর্ভুক্ত',
    addFeature: 'সুবিধা যোগ করুন',
    addPackage: 'প্যাকেজ যোগ করুন',
    remove: 'সরান',
    save: 'প্যাকেজ সংরক্ষণ করুন',
    saved: 'প্যাকেজ সংরক্ষিত হয়েছে',
    saveFail: 'সংরক্ষণ করা যায়নি',
    network: 'নেটওয়ার্ক সমস্যা',
    empty: 'এখনও কোনো প্যাকেজ নেই — একটি যোগ করুন।',
    en: 'English',
    bn: 'বাংলা',
    pricePh: 'যেমন ৳১,১৫,০০০',
    hint: 'প্রতিটি কার্ডে ইংরেজি ও বাংলা ঘর আছে — যেটি যে ভাষার সাইটে দেখানো হবে।',
  },
};

const emptyL10n = (): L10n => ({ en: '', bn: '' });

function blankPackage(): SitePackage {
  return {
    id: '',
    name: emptyL10n(),
    price: '',
    priceNote: emptyL10n(),
    duration: emptyL10n(),
    badge: emptyL10n(),
    featured: false,
    highlights: [emptyL10n()],
  };
}

export function SitePackagesEditor({ initial }: { initial: SitePackagesDoc }) {
  const L = LABELS[useLocale()];
  const router = useRouter();
  const [doc, setDoc] = useState<SitePackagesDoc>(() => JSON.parse(JSON.stringify(initial)) as SitePackagesDoc);
  const [saving, setSaving] = useState(false);

  const mutate = (type: PkgType, fn: (list: SitePackage[]) => SitePackage[]) =>
    setDoc((d) => ({ ...d, [type]: fn(d[type]) }));
  const patchPkg = (type: PkgType, i: number, patch: Partial<SitePackage>) =>
    mutate(type, (list) => list.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  const addPkg = (type: PkgType) => mutate(type, (list) => [...list, blankPackage()]);
  const removePkg = (type: PkgType, i: number) => mutate(type, (list) => list.filter((_, idx) => idx !== i));
  const setHi = (type: PkgType, i: number, hi: number, val: L10n) =>
    patchPkg(type, i, { highlights: doc[type][i].highlights.map((h, idx) => (idx === hi ? val : h)) });
  const addHi = (type: PkgType, i: number) =>
    patchPkg(type, i, { highlights: [...doc[type][i].highlights, emptyL10n()] });
  const removeHi = (type: PkgType, i: number, hi: number) =>
    patchPkg(type, i, { highlights: doc[type][i].highlights.filter((_, idx) => idx !== hi) });

  async function save() {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/site-packages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hajj: clean(doc.hajj), umrah: clean(doc.umrah) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? L.saveFail);
        return;
      }
      toast.success(L.saved);
      router.refresh();
    } catch {
      toast.error(L.network);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-ink-muted">{L.hint}</p>

      {(['hajj', 'umrah'] as const).map((type) => (
        <section key={type}>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">{L[type]}</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => addPkg(type)}>
              <Plus className="h-4 w-4" /> {L.addPackage}
            </Button>
          </div>

          {doc[type].length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-card/60 px-5 py-10 text-center text-sm text-ink-muted">
              {L.empty}
            </p>
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {doc[type].map((pkg, i) => (
                <div key={i} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
                  <BiField label={L.name} value={pkg.name} onChange={(v) => patchPkg(type, i, { name: v })} L={L} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-muted">{L.price}</span>
                      <input className={inputClass} value={pkg.price} placeholder={L.pricePh} onChange={(e) => patchPkg(type, i, { price: e.target.value })} />
                    </label>
                    <div />
                  </div>
                  <BiField label={L.priceNote} value={pkg.priceNote} onChange={(v) => patchPkg(type, i, { priceNote: v })} L={L} />
                  <BiField label={L.duration} value={pkg.duration} onChange={(v) => patchPkg(type, i, { duration: v })} L={L} />
                  <BiField label={L.badge} value={pkg.badge} onChange={(v) => patchPkg(type, i, { badge: v })} L={L} />

                  <label className="flex items-center gap-2 text-sm font-medium text-ink">
                    <input
                      type="checkbox"
                      checked={pkg.featured}
                      onChange={(e) => patchPkg(type, i, { featured: e.target.checked })}
                      className="h-4 w-4 rounded border-border text-brand-600 focus:ring-brand-600/30"
                    />
                    <Star className="h-3.5 w-3.5 text-gold-500" /> {L.featured}
                  </label>

                  <div>
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">{L.features}</p>
                    <div className="space-y-2">
                      {pkg.highlights.map((h, hi) => (
                        <div key={hi} className="flex items-start gap-2">
                          <div className="grid flex-1 grid-cols-2 gap-2">
                            <input className={inputClass} value={h.en} placeholder={L.en} onChange={(e) => setHi(type, i, hi, { ...h, en: e.target.value })} />
                            <input className={inputClass} value={h.bn} placeholder={L.bn} onChange={(e) => setHi(type, i, hi, { ...h, bn: e.target.value })} />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeHi(type, i, hi)}
                            className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-muted transition hover:bg-rose-50 hover:text-rose-600"
                            aria-label={L.remove}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => addHi(type, i)}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:underline"
                    >
                      <Plus className="h-3.5 w-3.5" /> {L.addFeature}
                    </button>
                  </div>

                  <div className="mt-auto border-t border-border pt-3">
                    <button
                      type="button"
                      onClick={() => removePkg(type, i)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> {L.remove}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      <div className="sticky bottom-4 flex justify-end">
        <Button type="button" onClick={save} disabled={saving} className="shadow-emerald">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {L.save}
        </Button>
      </div>
    </div>
  );
}

function BiField({
  label,
  value,
  onChange,
  L,
}: {
  label: string;
  value: L10n;
  onChange: (v: L10n) => void;
  L: (typeof LABELS)['en'];
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</span>
      <div className="grid grid-cols-2 gap-2">
        <input className={inputClass} value={value.en} placeholder={L.en} onChange={(e) => onChange({ ...value, en: e.target.value })} />
        <input className={inputClass} value={value.bn} placeholder={L.bn} onChange={(e) => onChange({ ...value, bn: e.target.value })} />
      </div>
    </label>
  );
}

/** Drop packages with no name and blank feature lines before saving. */
function clean(list: SitePackage[]): SitePackage[] {
  return list
    .filter((p) => p.name.en.trim() || p.name.bn.trim())
    .map((p) => ({
      ...p,
      highlights: p.highlights.filter((h) => h.en.trim() || h.bn.trim()),
    }));
}
