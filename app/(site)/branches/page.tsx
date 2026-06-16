import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Check, MapPin, Building2 } from 'lucide-react';
import { branches, siteConfig, affiliations } from '@/lib/site';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Our Branches',
  description:
    'The Inter Gulf family of companies — Inter Gulf Travels Ltd. (Hajj License No. 071), Mokbul Hajj Overseas Service and Inter Gulf Air Travels.',
  alternates: { canonical: '/branches' },
};

export default function BranchesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Group"
        title={<>The Inter Gulf <span className="text-gradient">family of companies</span></>}
        lead="One trusted group, three government-approved concerns — together covering Hajj, Umrah, visa, worldwide air ticketing, tours and hotel booking under one roof."
        crumbs={[{ label: 'Branches' }]}
      />

      <Section>
        <Container>
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-ink-muted">
              Since {siteConfig.founded}, the Inter Gulf group has grown from a single Hajj agency
              into a family of sister concerns serving pilgrims and travellers across Bangladesh.
              Every company shares the same office, team and promise of honest, personal service.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
              {affiliations.map((a) => (
                <span key={a.short} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-soft dark:text-brand-200">
                  {a.short}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {branches.map((b, i) => (
              <Reveal key={b.slug} delay={i * 0.08}>
                <Link
                  href={`/branches/${b.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/30 hover:shadow-emerald"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-[4.5rem] w-[4.5rem] place-items-center overflow-hidden rounded-2xl bg-white p-2.5 shadow-soft ring-1 ring-border transition-transform duration-300 group-hover:scale-105">
                      <Image src={b.logo} alt={`${b.name} logo`} width={64} height={64} className="h-full w-full object-contain" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600" />
                  </div>

                  <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                    {b.role}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink dark:text-white">{b.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{b.tagline}</p>

                  <ul className="mt-5 space-y-2 border-t border-border pt-5">
                    {b.services.slice(0, 3).map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-ink/80 dark:text-white/80">
                        <Check className="h-4 w-4 shrink-0 text-brand-600" /> {s}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                    Learn more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="One head office"
          title={<>All three companies, <span className="text-gradient">one trusted address</span></>}
          lead="Visit us at our head office in the heart of Dhaka — the home of the entire Inter Gulf group."
        />
        <Container className="mt-10">
          <Reveal className="mx-auto flex max-w-2xl items-start gap-4 rounded-3xl border border-border bg-card p-7 shadow-soft">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white">
              <Building2 className="h-6 w-6" />
            </span>
            <div>
              <div className="font-display text-lg font-semibold text-ink dark:text-white">Head Office</div>
              <p className="mt-1 flex items-start gap-2 text-sm text-ink-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                31, K.R. Plaza, 5th–6th Floor, Purana Paltan, Dhaka-1000
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href="/contact" variant="primary" size="sm">Contact us</Button>
                <Button href="/estimate" variant="outline" size="sm">Get a free estimate</Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
