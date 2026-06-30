import Link from 'next/link';
import type { ReactNode } from 'react';
import { ShieldCheck, BadgeCheck, Headset, Sparkles } from 'lucide-react';
import { LogoMark } from '@/components/brand/Logo';
import { LangToggle } from '@/components/layout/LangToggle';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ *
 *  AuthShell — full-screen split layout for the auth pages.
 *  Left: an emerald brand panel (logomark, tagline, trust points, aurora).
 *  Right: the form card on a light, sand background.
 *  On mobile the brand panel collapses into a compact header.
 * ------------------------------------------------------------------ */

type Variant = 'customer' | 'staff';

const trustPoints: Record<Variant, { icon: typeof ShieldCheck; text: string }[]> = {
  customer: [
    { icon: ShieldCheck, text: 'Government-licensed since 2002 (Hajj License No. 071)' },
    { icon: BadgeCheck, text: 'Track your bookings, documents & departures in one place' },
    { icon: Headset, text: 'Dedicated, Bangla-speaking support around the clock' },
  ],
  staff: [
    { icon: ShieldCheck, text: 'Restricted access — authorised personnel only' },
    { icon: BadgeCheck, text: 'Manage enquiries, bookings & site content securely' },
    { icon: Headset, text: 'Every session is protected and logged' },
  ],
};

export function AuthShell({
  title,
  subtitle,
  eyebrow,
  variant = 'staff',
  children,
}: {
  title: string;
  subtitle: string;
  eyebrow: string;
  variant?: Variant;
  children: ReactNode;
}) {
  const points = trustPoints[variant];

  return (
    <main className="relative min-h-screen w-full bg-sand-soft lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      {/* ----------------------------- Brand panel ----------------------------- */}
      <aside className="relative isolate overflow-hidden bg-brand-900 text-white">
        {/* aurora / mesh wash */}
        <div className="pointer-events-none absolute inset-0 bg-brand-gradient opacity-95" />
        <div className="pointer-events-none absolute inset-0 bg-mesh-emerald" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-gold-500/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-brand-400/25 blur-3xl"
        />
        {/* fine dotted pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        />

        {/* Mobile: compact header. Desktop: full column. */}
        <div className="relative flex h-full flex-col justify-between gap-8 px-6 py-7 sm:px-10 lg:px-12 lg:py-12 xl:px-16">
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="inline-flex w-fit items-center gap-3"
          >
            <LogoMark glow className="h-11 w-11 shrink-0" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-semibold tracking-tight">
                Inter <span className="text-gold-300">Gulf</span>
              </span>
              <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-gold-300/80">
                Travels Ltd
              </span>
            </span>
          </Link>

          {/* Hero copy — hidden on small screens to keep the header compact */}
          <div className="hidden max-w-md lg:block">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-200">
              <Sparkles className="h-3.5 w-3.5" />
              {variant === 'staff' ? 'Staff Portal' : 'Pilgrim Account'}
            </span>
            <h2 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight xl:text-[2.6rem]">
              A reliable name for your{' '}
              <span className="text-gold-300">sacred journey.</span>
            </h2>
            <p className="mt-4 text-[0.975rem] leading-relaxed text-white/75">
              {siteConfig.tagline}
            </p>

            <ul className="mt-9 space-y-4">
              {points.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3.5">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-inset ring-white/15">
                    <Icon className="h-[1.15rem] w-[1.15rem] text-gold-300" />
                  </span>
                  <span className="text-[0.925rem] leading-relaxed text-white/85">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer line on the brand panel (desktop only) */}
          <p className="hidden text-xs text-white/55 lg:block">
            © {new Date().getFullYear()} {siteConfig.legalName} · All rights reserved.
          </p>
        </div>
      </aside>

      {/* ------------------------------- Form side ------------------------------- */}
      <section className="relative flex flex-1 items-center justify-center px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="w-full max-w-md">
          <div className="mb-5 flex justify-center lg:justify-end">
            <LangToggle />
          </div>
          <header className="mb-7 text-center sm:mb-8 lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-700">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              {eyebrow}
            </span>
            <h1 className="mt-4 font-display text-[1.65rem] font-semibold tracking-tight text-ink sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{subtitle}</p>
          </header>

          <div
            className={cn(
              'rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8',
            )}
          >
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
