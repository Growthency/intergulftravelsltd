import type { Metadata } from 'next';
import {
  ArrowRight,
  Plane,
  Building2,
  BedDouble,
  Bus,
  Landmark,
  Handshake,
} from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { AuroraBackdrop } from '@/components/effects/AuroraBackdrop';
import { partners, affiliations, contact } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Business Associates — Partners & Affiliations',
  description:
    'The airlines, hotels, ground operators and regulatory bodies behind Inter Gulf Travels Ltd — including MoRA, HAAB, ATAB and IATA, plus 40+ airline partners and trusted Saudi hotel and transport providers.',
  alternates: { canonical: '/about/associates' },
};

const affiliationDetails: Record<string, string> = {
  MoRA: 'The government authority that licenses and regulates every Hajj operator in Bangladesh. Our Hajj License No. 071 is issued and overseen by the Ministry, ensuring full compliance and accountability.',
  HAAB: 'The Hajj Agencies Association of Bangladesh — the apex body for licensed Hajj agencies. Our membership binds us to its code of conduct and pilgrim-protection standards.',
  ATAB: 'The Association of Travel Agents of Bangladesh, the national platform for IATA and travel agencies, upholding professional and ethical standards across the industry.',
  IATA: 'International Air Transport Association accreditation lets us issue worldwide air tickets directly, securing better fares and trusted routings for our pilgrims and travellers.',
};

const affiliationIcons: Record<string, typeof Landmark> = {
  MoRA: Landmark,
  HAAB: Building2,
  ATAB: Handshake,
  IATA: Plane,
};

const saudiPartners = [
  {
    icon: BedDouble,
    title: 'Hotel Partners — Makkah',
    body: 'A trusted network of vetted hotels in the Ajyad and Jabal Omar districts, many within 300–700 metres of the Masjid al-Haram, secured at favourable group rates.',
    tags: ['Walking distance to Haram', 'Verified properties', 'Group allocations'],
  },
  {
    icon: BedDouble,
    title: 'Hotel Partners — Madinah',
    body: 'Quality accommodation in the Central Haram area, steps from the Masjid an-Nabawi, so pilgrims spend less time travelling and more time in prayer.',
    tags: ['Central Haram area', 'Family rooms', 'Best-rate booking'],
  },
  {
    icon: Bus,
    title: 'Ground Transport & Maktab',
    body: 'Licensed Saudi transport operators provide air-conditioned coaches for airport, inter-city and Ziyarat transfers, alongside accredited Maktab services in Mina and Arafah.',
    tags: ['AC coaches', 'Mina & Arafah Maktab', 'Ziyarat transfers'],
  },
  {
    icon: Handshake,
    title: 'On-ground Support Teams',
    body: 'Dedicated Bangla-speaking representatives stationed in Makkah and Madinah, reachable around the clock to assist our pilgrims with anything they need.',
    tags: ['24/7 assistance', 'Bangla-speaking', 'Local coordination'],
  },
];

export default function AssociatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Business Associates"
        title={
          <>
            The trusted partners behind every <span className="text-gradient-gold">smooth journey</span>
          </>
        }
        lead="A pilgrimage runs on the strength of its network. From regulators to airlines, hotels and ground operators, these are the associates who help us deliver on every promise."
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Business Associates' }]}
      />

      {/* Affiliations / regulatory bodies */}
      <Section className="relative overflow-hidden">
        <AuroraBackdrop />
        <SectionHeading
          eyebrow="Regulatory affiliations"
          title={
            <>
              Licensed, accredited and <span className="text-gradient">accountable</span>
            </>
          }
          lead="Our work is anchored to the country’s leading regulatory and industry bodies — your assurance of a legitimate, protected pilgrimage."
        />
        <Container className="mt-14">
          <RevealGroup className="grid gap-5 sm:grid-cols-2">
            {affiliations.map((a) => {
              const Icon = affiliationIcons[a.short] ?? Landmark;
              return (
                <Reveal key={a.short} className="h-full">
                  <article className="flex h-full items-start gap-5 rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:border-gold-400/40 hover:shadow-gold">
                    <span className="ring-gradient grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-gold-300">
                      <Icon className="h-7 w-7" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="font-display text-lg font-semibold text-ink dark:text-white">
                          {a.short}
                        </h3>
                        <span className="text-sm text-ink-muted">{a.name}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                        {affiliationDetails[a.short]}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* Airline partners */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="Airline partners"
          title={
            <>
              Booking across <span className="text-gradient">40+ airlines</span> worldwide
            </>
          }
          lead="As an IATA-accredited agency we issue tickets directly across a wide network of carriers, securing the best fares and most convenient routings to Jeddah, Madinah and beyond."
        />
        <Container className="mt-12">
          <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((name) => (
              <Reveal key={name}>
                <div className="group flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-5 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-gold">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-900/40 dark:text-gold-300">
                    <Plane className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-ink dark:text-white">{name}</span>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
          <p className="mt-6 text-center text-sm text-ink-muted">
            …and many more domestic, regional and international carriers.
          </p>
        </Container>
      </Section>

      {/* Saudi hotel & ground partners */}
      <Section className="relative overflow-hidden">
        <AuroraBackdrop />
        <SectionHeading
          eyebrow="On-ground in Saudi Arabia"
          title={
            <>
              Trusted hotels &amp; operators in the <span className="text-gradient">Holy Cities</span>
            </>
          }
          lead="Our long-standing relationships in Makkah and Madinah let us place pilgrims close to the Haramain and look after them at every step on the ground."
        />
        <Container className="mt-14">
          <RevealGroup className="grid gap-5 sm:grid-cols-2">
            {saudiPartners.map((p) => (
              <Reveal key={p.title} className="h-full">
                <article className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:border-gold-400/40 hover:shadow-gold">
                  <span className="ring-gradient grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-gold-300">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink dark:text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-sand-soft px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Become a partner CTA */}
      <section className="relative py-20 sm:py-24">
        <Container>
          <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient px-7 py-14 text-center shadow-emerald sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-10 -top-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-16 right-0 h-72 w-72 rounded-full bg-gold-300/20 blur-3xl" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-gold-300">
                <Handshake className="h-7 w-7" />
              </span>
              <h2 className="mt-6 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl balance">
                Become a partner of Inter Gulf Travels
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">
                Are you a hotel, airline, ground operator or agency looking to work with one of
                Bangladesh’s most trusted Hajj &amp; Umrah names? We would love to hear from you.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/contact" variant="gold" size="lg">
                  Partner With Us <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={`mailto:${contact.emails[0]}`} external variant="light" size="lg">
                  Email Our Team
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
