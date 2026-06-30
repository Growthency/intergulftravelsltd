'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { inputClass } from '@/components/manage/ui';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/adminumrah';

export function StatusControl({ passengerId, status }: { passengerId: string; status: string }) {
  const t = getDict(useLocale());
  const STATUSES = [
    { value: 'active', label: t.scActive },
    { value: 'completed', label: t.scCompleted },
    { value: 'cancelled', label: t.scCancelled },
  ];
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);

  async function change(next: string) {
    const prev = value;
    setValue(next);
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/umrah/${passengerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? t.toastStatusFail);
        setValue(prev);
        return;
      }
      toast.success(t.toastStatusUpdated);
      router.refresh();
    } catch {
      toast.error(t.toastNetwork);
      setValue(prev);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <select
        className={inputClass}
        value={value}
        disabled={saving}
        onChange={(e) => void change(e.target.value)}
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      {saving && <Loader2 className="h-4 w-4 animate-spin text-ink-muted" />}
    </div>
  );
}
