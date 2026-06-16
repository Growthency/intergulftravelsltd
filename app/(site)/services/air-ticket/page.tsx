import type { Metadata } from 'next';
import {
  ArrowRight,
  MessageCircle,
  Phone,
  Check,
  Plane,
  BadgeDollarSign,
  Zap,
  Users,
  Map,
} from 'lucide-react';
import { contact, partners } from '@/lib/site';
import { whatsappLink } from '@/lib/utils';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Air Ticket',
  description:
    'Domestic, regional and international air tickets from Dhaka across 40+ airlines including Biman, Saudia, Emirates and Qatar Airways. Best-fare promise, instant e-ticket issuance and group fares from Inter Gulf Travels Ltd.',
  alternates: { canonical: '/services/air-ticket' },
};

const promises = [
  {
    icon: BadgeDollarSign,
    title: 'Best-fare promise',
    body: 'We compare fares across 40+ carriers and routings to find you the lowest workable price — every time.',
  },
  {
    icon: Zap,
    title: 'Instant e-ticket issuance',
    body: 'Confirmed seats and e-tickets issued on the spot, with clear fare rules explained before you pay.',
  },
  {
    icon: Users,
    title: 'Group & Hajj fares',
    body: 'Special negotiated group fares for families, corporate travel and our Hajj & Umrah departures.',
  },
  {
    icon: Plane,
    title: 'Re-issue & support',
    body: 'Date changes, re-routings and refunds handled by our ticketing desk — no endless airline call queues.',
  },
];

const routeGroups = [
  {
    label: 'Pilgrimage routes',
    routes: [
      { from: 'Dhaka', to: 'Jeddah', code: 'DAC → JED' },
      { from: 'Dhaka', to: 'Madinah', code: 'DAC → MED' },
      { from: 'Dhaka', to: 'Riyadh', code: 'DAC → RUH' },
    ],
  },
  {
    label: 'Gulf & Middle East',
    routes: [
      { from: 'Dhaka', to: 'Dubai', code: 'DAC → DXB' },
      { from: 'Dhaka', to: 'Abu Dhabi', code: 'DAC → AUH' },
      { from: 'Dhaka', to: 'Doha', code: 'DAC → DOH' },
    ],
  },
  {
    label: 'Asia & beyond',
    routes: [
      { from: 'Dhaka', to: 'Kuala Lumpur', code: 'DAC → KUL' },
      { from: 'Dhaka', to: 'Istanbul', code: 'DAC → IST' },
      { from: 'Dhaka', to: 'Bangkok', code: 'DAC → BKK' },
    ],
  },
];

const ticketTypes = [
  {
    title: 'Domestic',
    body: 'Dhaka, Chattogram, Sylhet, Cox’s Bazar, Jashore, Saidpur and more — quick connections across Bangladesh.',
  },
  {
    title: 'Regional',
    body: 'Short-haul fares to India, Nepal, Bhutan, Malaysia, Thailand, the UAE and the wider Gulf.',
  },
  {
    title: 'International',
    body: 'Long-haul tickets to Saudi Arabia, Europe, the Far East and North America with the best routings.',
  },
];

export default function AirTicketPage() {
  return (
    <>
      <PageHero
        eyebrow="Air Ticket"
        title={
          <>
            Fly for less, <span className="text-gradient-gold">worldwide</span>
          </>
        }
        lead="Domestic, regional and international air tickets across 40+ airlines, issued instantly at fares we are confident you will not beat — with a real human desk behind every booking."
        crumbs={[{ label: 'Services', href: '/services' }, { label: 'Air Ticket' }]}
      />

      {/* Best-fare promise */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="Why book with us"
          title={
            <>
              A ticketing desk that <span className="text-gradient">works for you</span>
            </>
          }
          lead="Online portals leave you on your own. We do the searching, issue the ticket and stand by it from booking to boarding."
        />
        <Container className="mt-14">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.05}
                className="group rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-emerald">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink dark:text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Ticket types */}
      <Section>
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {ticketTypes.map((t, i) => (
              <Reveal
                key={t.title}
                delay={i * 0.06}
                className="relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft"
              >
                <span className="font-display text-5xl font-semibold text-brand-600/15">{`0${i + 1}`}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink dark:text-white">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Popular routes */}
      <Section className="bg-sand-soft pt-0">
        <SectionHeading
          eyebrow="Popular routes from Dhaka"
          title={
            <>
              Where our travellers <span className="text-gradient">fly most</span>
            </>
          }
          lead="From the holy cities to the Gulf and the Far East — fares updated daily across our airline partners."
        />
        <Container className="mt-14">
          <div className="grid gap-5 lg:grid-cols-3">
            {routeGroups.map((g, gi) => (
              <Reveal
                key={g.label}
                delay={gi * 0.06}
                className="rounded-3xl border border-border bg-card p-7 shadow-soft"
              >
                <div className="flex items-center gap-2 text-gold-600">
                  <Map className="h-5 w-5" />
                  <h3 className="font-display text-lg font-semibold text-ink dark:text-white">{g.label}</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {g.routes.map((r) => (
                    <li
                      key={r.code}
                      className="flex items-center justify-between rounded-2xl border border-border bg-background/50 px-4 py-3"
                    >
                      <span className="flex items-center gap-2 text-sm font-medium text-ink dark:text-white">
                        {r.from}
                        <Plane className="h-3.5 w-3.5 text-brand-600" />
                        {r.to}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{r.code}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Airline partners */}
      <Section>
        <SectionHeading
          eyebrow="40+ airline partners"
          title={
            <>
              Booked across the world&apos;s <span className="text-gradient">leading carriers</span>
            </>
          }
          lead="As an IATA-linked agency we issue on every major airline serving Bangladesh — and dozens more worldwide."
        />
        <Container className="mt-12">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((p, i) => (
              <Reveal
                key={p}
                delay={i * 0.03}
                className="flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-soft transition-colors hover:border-brand-600/30"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                  <Plane className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-ink dark:text-white">{p}</span>
              </Reveal>
            ))}
            <Reveal
              delay={partners.length * 0.03}
              className="flex items-center justify-center rounded-2xl border border-dashed border-brand-600/40 bg-brand-50/50 px-4 py-3.5 text-sm font-semibold text-brand-700 dark:bg-brand-900/20 dark:text-brand-200"
            >
              + 30 more carriers
            </Reveal>
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-ink-muted">
            <Check className="h-4 w-4 text-brand-600" /> Can&apos;t see your preferred airline? Just ask — we
            most likely issue on it.
          </p>
        </Container>
      </Section>

      <ServiceCTA
        heading="Looking for your best fare?"
        body="Tell us your route and dates. Our ticketing desk will come back with the lowest workable fare across our 40+ carriers."
        waMessage="Assalamu alaikum! I would like a fare quote for an air ticket."
      />
    </>
  );
}

function ServiceCTA({
  heading,
  body,
  waMessage,
}: {
  heading: string;
  body: string;
  waMessage: string;
}) {
  return (
    <Section className="bg-sand-soft pt-0">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient px-7 py-14 text-center shadow-emerald sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-10 -top-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-16 right-0 h-72 w-72 rounded-full bg-gold-300/20 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl balance">{heading}</h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">{body}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/estimate" variant="gold" size="lg">
                Get a Free Estimate <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={whatsappLink(contact.whatsapp, waMessage)} external variant="light" size="lg">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </Button>
            </div>
            <a
              href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white"
            >
              <Phone className="h-4 w-4" /> Or call us directly: {contact.phones[0]}
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
