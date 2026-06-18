import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/manage/ui';
import { PilgrimForm } from '@/components/manage/hajj/PilgrimForm';
import { loadHajjPackages } from '@/lib/management/hajj';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'New Pre-registration' };

const CURRENT_YEAR = new Date().getFullYear();

export default async function NewPilgrimPage() {
  const packages = await loadHajjPackages();
  const options = packages
    .filter((p) => p.active)
    .map((p) => ({ id: p.id, name: p.name, price: p.price, year: p.year }));

  return (
    <>
      <Link
        href="/admin/hajj"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" /> Back to pilgrims
      </Link>
      <PageHeader
        title="New Pre-registration"
        subtitle="Enter a pilgrim for Hajj pre-registration or full registration."
      />
      <PilgrimForm packages={options} defaultYear={CURRENT_YEAR + 1} />
    </>
  );
}
