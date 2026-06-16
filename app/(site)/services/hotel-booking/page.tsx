import type { Metadata } from 'next';
import {
  ArrowRight,
  MessageCircle,
  Phone,
  Check,
  MapPin,
  Search,
  CalendarCheck,
  BedDouble,
  Star,
} from 'lucide-react';
import { contact } from '@/lib/site';
import { whatsappLink } from '@/lib/utils';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Hotel Booking',
  description:
    'Hand-picked hotels in Makkah and Madinah within walking distance of the Haramain, plus verified stays in Dubai, Istanbul, Kuala Lumpur and worldwide. Best-rate hotel booking from Inter Gulf Travels Ltd, Dhaka.',
  alternates: { canonical: '/services/hotel-booking' },
};

const haramHotels = [
  {
    city: 'Makkah',
    tone: 'from-brand-700 to-brand-900',
    headline: 'Steps from Masjid al-Haram',
    points: [
      'Properties within 300–800m of the Haram',
      'Clock Tower & Ajyad area options',
      'Rooms with Kaaba / Haram views on request',
      'Walking distance — no shuttle needed',
    ],
  },
  {
    city: 'Madinah',
    tone: 'from-gold-600 to-gold-800',
    headline: 'Facing Masjid an-Nabawi',
    points: [
      'Central Markaziyah district hotels',
      'A short walk to the Prophet’s Mosque',
      'Quiet, family-friendly accommodation',
      'Easy access to Ziyarat sites',
    ],
  },
];

const worldwideCities = [
  { city: 'Dubai', country: 'UAE' },
  { city: 'Istanbul', country: 'Turkey' },
  { city: 'Kuala Lumpur', country: 'Malaysia' },
  { city: 'Bangkok', country: 'Thailand' },
  { city: 'Singapore', country: 'Singapore' },
  { city: 'Male', country: 'Maldives' },
  { city: 'Srinagar', country: 'Kashmir' },
  { city: 'Doha', country: 'Qatar' },
];

const steps = [
  {
    icon: Search,
    title: 'Tell us your stay',
    body: 'Share your city, dates, budget and how close to the Haram you would like to be.',
  },
  {
    icon: BedDouble,
    title: 'We shortlist options',
    body: 'We send verified properties with real distances, room types and honest rates — no surprises.',
  },
  {
    icon: CalendarCheck,
    title: 'Confirm & relax',
    body: 'Choose your favourite, we secure the booking and you receive a confirmed voucher.',
  },
];

const assurances = [
  'Verified, inspected properties — not anonymous listings',
  'Best-rate booking with no hidden booking fees',
  'Group & family allotments for Hajj and Umrah parties',
  'Flexible dates and room configurations',
  'Combine with our flights, visa and transfers',
  'Support reachable throughout your stay',
];

export default function HotelBookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Hotel Booking"
        title={
          <>
            Rest just steps <span className="text-gradient-gold">from the Haram</span>
          </>
        }
        lead="Hand-picked hotels in Makkah and Madinah within walking distance of the Haramain — plus verified, best-rate stays across Dubai, Istanbul, Kuala Lumpur and the wider world."
        crumbs={[{ label: 'Services', href: '/services' }, { label: 'Hotel Booking' }]}
      />

      {/* Haramain hotels */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="Close to the Haramain"
          title={
            <>
              Spend less time travelling, <span className="text-gradient">more in worship</span>
            </>
          }
          lead="We secure accommodation as close to the holy mosques as your budget allows, so every prayer is just a short walk away."
        />
        <Container className="mt-14">
          <div className="grid gap-5 md:grid-cols-2">
            {haramHotels.map((h, i) => (
              <Reveal
                key={h.city}
                delay={i * 0.08}
                as="article"
                className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
              >
                <div className={`relative bg-gradient-to-br ${h.tone} px-7 py-10 text-white`}>
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage:
                        'linear-gradient(30deg,#fff 1px,transparent 1px),linear-gradient(-30deg,#fff 1px,transparent 1px)',
                      backgroundSize: '34px 34px',
                    }}
                  />
                  <div className="relative flex items-center gap-2 text-gold-200">
                    <MapPin className="h-5 w-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider">{h.city}, Saudi Arabia</span>
                  </div>
                  <h3 className="relative mt-3 font-display text-2xl font-semibold sm:text-3xl">{h.headline}</h3>
                </div>
                <ul className="space-y-3 p-7">
                  {h.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-ink/85 dark:text-white/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section>
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Booking a hotel, <span className="text-gradient">made effortless</span>
            </>
          }
          lead="Three simple steps from your request to a confirmed voucher in your inbox."
        />
        <Container className="mt-14">
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 0.06}
                className="relative rounded-3xl border border-border bg-card p-7 shadow-soft"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-emerald">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <span className="font-display text-4xl font-semibold text-brand-600/15">{`0${i + 1}`}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink dark:text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Worldwide + assurances */}
      <Section className="bg-sand-soft pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-700 dark:border-brand-400/20 dark:bg-brand-900/30 dark:text-brand-300">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" /> Worldwide hotels
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink dark:text-white sm:text-4xl">
                Quality stays well beyond the Kingdom
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                Travelling onward or planning a holiday? We book trusted hotels across the destinations our clients
                love most.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-2">
                {worldwideCities.map((c) => (
                  <div
                    key={c.city}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink dark:text-white">{c.city}</span>
                      <span className="block text-xs text-ink-muted">{c.country}</span>
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-700 dark:border-brand-400/20 dark:bg-brand-900/30 dark:text-brand-300">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" /> Our assurance
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink dark:text-white sm:text-4xl">
                Every booking, honestly handled
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                We treat your accommodation the way we would arrange our own family&apos;s — verified, fairly priced
                and exactly as described.
              </p>
              <ul className="mt-7 space-y-3">
                {assurances.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-ink/85 shadow-soft dark:text-white/85"
                  >
                    <Star className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" /> {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <ServiceCTA
        heading="Need a hotel near the Haram?"
        body="Share your city, dates and budget. We will send verified options with real distances and our best rates."
        waMessage="Assalamu alaikum! I would like help booking a hotel near the Haram."
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
    <Section className="pt-0">
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
