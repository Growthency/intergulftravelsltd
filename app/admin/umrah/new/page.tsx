import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { PageHeader } from '@/components/manage/ui';
import { PassengerForm } from '@/components/manage/umrah/PassengerForm';
import { loadUmrahPackages } from '@/lib/management/umrah';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'New Umrah Passenger' };

export default async function NewUmrahPassengerPage() {
  const packages = await loadUmrahPackages();
  const active = packages.filter((p) => p.active);

  return (
    <>
      <Link
        href="/admin/umrah"
        className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-ink-muted transition hover:text-brand-700"
      >
        <ChevronLeft className="h-4 w-4" /> Back to passengers
      </Link>
      <PageHeader
        title="New Umrah Passenger"
        subtitle="Enter passport information and booking details. A customer ledger account is created automatically."
      />
      <PassengerForm
        packages={active.map((p) => ({ id: p.id, name: p.name, price: p.price, year: p.year }))}
      />
    </>
  );
}
