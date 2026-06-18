'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';

type Status = 'active' | 'cancelled' | 'completed';

export function StatusControl({ pilgrimId, current }: { pilgrimId: string; current: Status }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>(current);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (saving || status === current) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/hajj/${pilgrimId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'status', status }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not update status.');
        return;
      }
      toast.success('Status updated.');
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex items-end gap-3">
      <label className="block flex-1">
        <span className="mb-1 block text-sm font-medium text-ink">Status</span>
        <select className={inputClass} value={status} onChange={(e) => setStatus(e.target.value as Status)}>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </label>
      <Button type="button" variant="outline" size="sm" onClick={save} disabled={saving || status === current}>
        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
        Update
      </Button>
    </div>
  );
}
