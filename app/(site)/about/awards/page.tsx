import type { Metadata } from 'next';
import {
  ArrowRight,
  Award,
  ShieldCheck,
  BadgeCheck,
  Plane,
  Building2,
  Handshake,
  Trophy,
  Star,
  ScrollText,
} from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { AuroraBackdrop } from '@/components/effects/AuroraBackdrop';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Awards & Affiliations — Recognition & Memberships',
  description:
    'Inter Gulf Travels Ltd holds Government Hajj License No. 071 and is a member of HAAB, ATAB and IATA-accredited — backed by two decades of recognition for trusted Hajj & Umrah service.',
  alternates: { canonical: '/about/awards' },
};

const certifications = [
  {
    icon: ShieldCheck,
    badge: 'No. 071',
    title: 'Government Hajj Licence',
    issuer: 'Ministry of Religious Affairs, Bangladesh',
    body: 'Our official licence to operate Hajj programmes, issued and regulated by the Government of Bangladesh — the foundation of every journey we arrange.',
    meaning: 'A guarantee that your pilgrimage is legitimate, regulated and fully accountable.',
  },
  {
    icon: Building2,
    badge: 'HAAB',
    title: 'HAAB Membership',
    issuer: 'Hajj Agencies Association of Bangladesh',
    body: 'Active membership of the apex body for licensed Hajj agencies, binding us to its code of conduct and pilgrim-protection standards.',
    meaning: 'Your interests are protected by an industry-wide framework of ethics and safeguards.',
  },
  {
    icon: Handshake,
    badge: 'ATAB',
    title: 'ATAB Membership',
    issuer: 'Association of Travel Agents of Bangladesh',
    body: 'Recognised membership of the national travel-agent association, the platform that upholds professional standards across the industry.',
    meaning: 'Confidence that you are dealing with an established, professionally accredited agency.',
  },
  {
    icon: Plane,
    badge: 'IATA',
    title: 'IATA Accreditation',
    issuer: 'International Air Transport Association',
    body: 'Accreditation that allows us to issue worldwide air tickets directly across 40+ airlines, with verified, secure ticketing.',
    meaning: 'Better fares, trusted routings and the assurance of an internationally recognised standard.',
  },
];

const recognitions = [
  {
    icon: Trophy,
    title: 'Two Decades of Trusted Service',
    year: 'Since 2002',
    body: 'Recognised within the Bangladeshi Hajj community for over twenty years of honest, reliable pilgrim service.',
  },
  {
    icon: Star,
    title: '4.9 / 5 Pilgrim Satisfaction',
    year: 'Ongoing',
    body: 'Consistently high ratings across thousands of pilgrim reviews — a reflection of care that families notice.',
  },
  {
    icon: Award,
    title: 'Excellence in Hajj Operations',
    year: 'Industry standing',
    body: 'Acknowledged among peers for meticulously organised Hajj group operations and on-ground support.',
  },
  {
    icon: BadgeCheck,
    title: '12,000+ Pilgrims Guided',
    year: 'Milestone',
    body: 'A milestone of trust — more than twelve thousand pilgrims have completed their journey with us.',
  },
];

const trustBadges = [
  'Government Licensed',
  'HAAB Member',
  'ATAB Member',
  'IATA Accredited',
  '100% Verified',
  'Since 2002',
];

export default function AwardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Awards & Affiliations"
        title={
          <>
            Recognition built on <span className="text-gradient-gold">two decades of trust</span>
          </>
        }
        lead="Our credentials are more than badges on a wall — they are your assurance that the agency holding your sacred journey is licensed, accredited and accountable."
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Awards & Affiliations' }]}
      />

      {/* Trust badges strip */}
      <Section className="relative overflow-hidden !py-14">
        <AuroraBackdrop />
        <Container>
          <RevealGroup className="flex flex-wrap items-center justify-center gap-3">
            {trustBadges.map((b) => (
              <Reveal key={b}>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-soft dark:text-brand-200">
                  <BadgeCheck className="h-4 w-4 text-gold-500" /> {b}
                </span>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Certifications */}
      <Section className="bg-sand-soft !pt-6">
        <SectionHeading
          eyebrow="Licences & accreditations"
          title={
            <>
              The credentials that <span className="text-gradient">protect you</span>
            </>
          }
          lead="Every certification below is a promise of legitimacy — and each one means something concrete for your peace of mind."
        />
        <Container className="mt-14">
          <RevealGroup className="grid gap-5 sm:grid-cols-2">
            {certifications.map((c) => (
              <Reveal key={c.title} className="h-full">
                <article className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-gold sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="ring-gradient grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-gold-300">
                      <c.icon className="h-7 w-7" />
                    </span>
                    <span className="rounded-full bg-gold-gradient px-4 py-1.5 font-display text-sm font-bold text-brand-900">
                      {c.badge}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink dark:text-white">{c.title}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
                    {c.issuer}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{c.body}</p>
                  <div className="mt-5 flex items-start gap-2 rounded-2xl border border-border bg-sand-soft p-4 dark:bg-brand-900/20">
                    <ScrollText className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                    <p className="text-sm font-medium text-ink dark:text-white/90">
                      <span className="text-ink-muted">What it means for you: </span>
                      {c.meaning}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Recognitions */}
      <Section className="relative overflow-hidden">
        <AuroraBackdrop />
        <SectionHeading
          eyebrow="Recognition & milestones"
          title={
            <>
              Honoured for <span className="text-gradient">service that lasts</span>
            </>
          }
          lead="The recognition we value most comes from the families who trust us — and the milestones we have reached together."
        />
        <Container className="mt-14">
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recognitions.map((r) => (
              <Reveal key={r.title} className="h-full">
                <article className="group h-full rounded-3xl border border-border bg-card/70 p-7 text-center backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-gold">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-gradient text-brand-900 shadow-gold">
                    <r.icon className="h-7 w-7" />
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
                    {r.year}
                  </p>
                  <h3 className="mt-1 font-display text-base font-semibold text-ink dark:text-white">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{r.body}</p>
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* CTA */}
      <section className="relative py-20 sm:py-24">
        <Container>
          <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient px-7 py-14 text-center shadow-emerald sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-10 -top-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-16 right-0 h-72 w-72 rounded-full bg-gold-300/20 blur-3xl" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl balance">
                Travel with a name you can verify and trust
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">
                {siteConfig.legalName} — {siteConfig.license}, member of HAAB &amp; ATAB. Begin your
                journey with the reassurance of full government licensing.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/contact" variant="gold" size="lg">
                  Get in Touch <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/about/associates" variant="light" size="lg">
                  View Our Partners
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
