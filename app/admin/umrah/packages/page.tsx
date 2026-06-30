import Link from 'next/link';
import { ChevronLeft, Package, Layers } from 'lucide-react';
import { PageHeader, Card, EmptyState } from '@/components/manage/ui';
import { PackageForm } from '@/components/manage/umrah/PackageForm';
import { PackageRow } from '@/components/manage/umrah/PackageRow';
import { PackageWiseList, type PkgPassenger } from '@/components/manage/umrah/PackageWiseList';
import { loadUmrahPackages, loadPassengers } from '@/lib/management/umrah';
import { getLocale } from '@/lib/i18n-server';
import { localizedPath } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries/areas/adminumrah';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Umrah Packages' };

export default async function UmrahPackagesPage() {
  const locale = getLocale();
  const t = getDict(locale);
  const [packages, passengers] = await Promise.all([loadUmrahPackages(), loadPassengers()]);

  // Aggregate per-package assigned counts and dues.
  const stats = new Map<string, { count: number; due: number }>();
  for (const p of passengers) {
    if (!p.package_id) continue;
    const s = stats.get(p.package_id) ?? { count: 0, due: 0 };
    s.count += 1;
    s.due += p.due;
    stats.set(p.package_id, s);
  }

  const pkgPassengers: PkgPassenger[] = passengers
    .filter((p) => p.package_id)
    .map((p) => ({
      id: p.id,
      name: p.name,
      passport_no: p.passport_no,
      phone: p.phone,
      package_id: p.package_id,
      paid: p.paid,
      due: p.due,
    }));

  return (
    <>
      <Link
        href={localizedPath(locale, '/admin/umrah')}
        className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-ink-muted transition hover:text-brand-700"
      >
        <ChevronLeft className="h-4 w-4" /> {t.backToPassengers}
      </Link>

      <PageHeader
        title={t.packagesTitle}
        subtitle={t.packagesSubtitle}
        actions={<PackageForm />}
      />

      {packages.length === 0 ? (
        <EmptyState
          title={t.noPackagesYet}
          hint={t.noPackagesHint}
          action={<PackageForm />}
        />
      ) : (
        <div className="space-y-8">
          <section className="space-y-3">
            {packages.map((pkg) => {
              const s = stats.get(pkg.id) ?? { count: 0, due: 0 };
              return <PackageRow key={pkg.id} pkg={pkg} assignedCount={s.count} totalDue={s.due} />;
            })}
          </section>

          <section>
            <Card className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Layers className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-lg font-semibold text-ink">{t.packageWiseTitle}</h2>
                  <p className="text-sm text-ink-muted">{t.packageWiseSubtitle}</p>
                </div>
              </div>
              <PackageWiseList
                packages={packages.map((p) => ({ id: p.id, name: p.name }))}
                passengers={pkgPassengers}
              />
            </Card>
          </section>
        </div>
      )}
    </>
  );
}
