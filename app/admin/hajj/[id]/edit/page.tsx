import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/manage/ui';
import { PilgrimForm } from '@/components/manage/hajj/PilgrimForm';
import { mgmtDb } from '@/lib/management/server';
import { loadHajjPackages } from '@/lib/management/hajj';
import type { HajjPilgrim } from '@/lib/management/types';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Edit Pilgrim' };

const CURRENT_YEAR = new Date().getFullYear();

export default async function EditPilgrimPage({ params }: { params: { id: string } }) {
  const db = mgmtDb();
  const { data: pilgrim } = await db
    .from('hajj_pilgrims')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  if (!pilgrim) notFound();

  const packages = await loadHajjPackages();
  const options = packages.map((p) => ({ id: p.id, name: p.name, price: p.price, year: p.year }));

  return (
    <>
      <Link
        href={`/admin/hajj/${params.id}`}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" /> Back to profile
      </Link>
      <PageHeader title="Edit pilgrim" subtitle={(pilgrim as HajjPilgrim).name} />
      <PilgrimForm
        mode="edit"
        pilgrimId={params.id}
        initial={pilgrim as HajjPilgrim}
        packages={options}
        defaultYear={CURRENT_YEAR + 1}
      />
    </>
  );
}
