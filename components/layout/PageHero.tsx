import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { WavyDivider } from '@/components/effects/WavyDivider';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/seo';

/** Consistent inner-page banner (breadcrumb + eyebrow + title + lead). */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs = [],
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-900 pb-24 pt-14 text-white sm:pt-16">
      <JsonLd
        data={breadcrumbSchema([{ name: 'Home', url: '/' }, ...crumbs.map((c) => ({ name: c.label, url: c.href }))])}
      />
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(110%_110%_at_20%_0%,#0e7c5a_0%,#074a37_45%,#06402b_75%,#04261c_100%)]" />
        <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-brand-500/25 blur-[110px]" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-gold-500/15 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(70%_70%_at_50%_30%,#000,transparent)]"
          style={{
            backgroundImage: 'linear-gradient(30deg,#e7c97a 1px,transparent 1px),linear-gradient(-30deg,#e7c97a 1px,transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-sm text-white/55">
          <Link href="/" className="hover:text-gold-300">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5" />
              {c.href ? (
                <Link href={c.href} className="hover:text-gold-300">{c.label}</Link>
              ) : (
                <span className="text-gold-200">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="mt-8 max-w-3xl">
          {eyebrow && <Eyebrow light>{eyebrow}</Eyebrow>}
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem] balance">
            {title}
          </h1>
          {lead && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">{lead}</p>}
        </div>
      </div>

      <WavyDivider position="bottom" variant="wave" fill="rgb(var(--background))" className="text-sand-soft" />
    </section>
  );
}
