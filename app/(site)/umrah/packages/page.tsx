import type { Metadata } from 'next';
import { Check, X, CreditCard, CalendarClock, FileText, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Accordion } from '@/components/ui/Accordion';
import { packages, umrahFaqs } from '@/lib/site';
import { PackageCard, CtaBand } from '@/components/hajj-umrah/shared';

export const metadata: Metadata = {
  title: 'Umrah Packages — Economy, Family & Premium from Dhaka',
  description:
    'Compare Inter Gulf Travels’ Umrah packages: Economy from ৳1,15,000, Family ৳1,55,000 and Premium ৳1,85,000 per person. Year-round departures, full inclusions, comparison table, booking notes and FAQs.',
  alternates: { canonical: '/umrah/packages' },
};

const umrahPackages = packages.filter((p) => p.type === 'umrah');

const compareRows: { label: string; economy: string; family: string; premium: string }[] = [
  { label: 'Duration', economy: '10–14 days', family: '12–14 days', premium: '14 days' },
  { label: 'Air ticket & visa', economy: 'Return ticket + Umrah visa', family: 'Return ticket + Umrah visa', premium: 'Return ticket + fast-track visa' },
  { label: 'Hotel rating', economy: 'Clean, comfortable', family: '3-star, family rooms', premium: '4-star near the Haramain' },
  { label: 'Room occupancy', economy: 'Shared (4–5)', family: 'Connecting family rooms', premium: '2–3 per room' },
  { label: 'Transport', economy: 'Group coach transfers', family: 'Group coach transfers', premium: 'Private AC transport' },
  { label: 'Meals', economy: 'Self / optional', family: 'Breakfast included', premium: 'Breakfast & dinner' },
  { label: 'Ziyarat', economy: 'Group Ziyarat with guide', family: 'Group Ziyarat with guide', premium: 'Complete Ziyarat, dedicated guide' },
  { label: 'Special assistance', economy: 'On request', family: 'Wheelchair & elder support', premium: 'Full concierge support' },
];

const included = [
  'Return air ticket (Dhaka ⇄ Jeddah / Madinah)',
  'Umrah e-visa processing',
  'Hotel accommodation in Makkah & Madinah',
  'Airport & Makkah ⇄ Madinah transfers',
  'Guided Ziyarat of the blessed sites',
  'Experienced Bangla-speaking guide',
  '24/7 on-ground support in Saudi Arabia',
  'Zamzam water (as per airline allowance)',
];

const notIncluded = [
  'Passport issuance / renewal fees',
  'Meals not specified in your package tier',
  'Personal expenses, shopping & SIM/phone',
  'Travel & health insurance (optional, on request)',
  'Excess baggage charges beyond airline limit',
  'Any cost due to flight delays beyond our control',
];

const bookingNotes = [
  { icon: CreditCard, title: 'Flexible Booking', body: 'Reserve with a deposit and settle the balance before departure. We accept bank transfer, cheque and cash, and every payment is receipted.' },
  { icon: CalendarClock, title: 'Year-Round Dates', body: 'Umrah runs all year. Tell us your preferred window — Ramadan, school holidays or any month — and we arrange the rest.' },
  { icon: FileText, title: 'Simple Documents', body: 'A passport valid for at least six months, photographs and a completed form are all that’s usually needed. We handle the e-visa for you.' },
  { icon: ShieldCheck, title: 'Honest Pricing', body: 'Clear, itemised costs with no hidden charges. If a Saudi fee or fare changes, we tell you immediately and adjust fairly.' },
];

export default function UmrahPackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Umrah Packages"
        title={<>Choose the Umrah package made for you</>}
        lead="From a value Economy plan to a comfortable Premium experience and dedicated Family programmes, every package is all-inclusive, flexible and built around your needs."
        crumbs={[{ label: 'Umrah', href: '/umrah' }, { label: 'Umrah Packages' }]}
      />

      {/* Cards */}
      <Section>
        <SectionHeading
          eyebrow="Year-round departures"
          title={<>Three plans, <span className="text-gradient">one promise of care</span></>}
          lead="All prices are per person and clearly itemised. Tell us your dates and budget and we will tailor the perfect plan."
        />
        <Container className="mt-14">
          <div className="grid gap-6 lg:grid-cols-3">
            {umrahPackages.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.07}>
                <PackageCard pkg={p} />
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-ink-muted">
            Prices are indicative and may vary with airline fares, hotel availability and the season (Ramadan and
            peak periods cost more).
          </p>
        </Container>
      </Section>

      {/* Comparison */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="Side by side"
          title={<>Compare every <span className="text-gradient">inclusion</span></>}
          lead="A clear, honest breakdown of how the three packages differ — so you can choose with confidence."
        />
        <Container className="mt-14">
          <Reveal className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-brand-gradient text-white">
                    <th className="px-5 py-4 font-display text-base font-semibold">Feature</th>
                    <th className="px-5 py-4 font-display text-base font-semibold">Economy</th>
                    <th className="px-5 py-4 font-display text-base font-semibold">Family</th>
                    <th className="px-5 py-4 font-display text-base font-semibold">
                      Premium <span className="ml-1 rounded-full bg-gold-gradient px-2 py-0.5 text-[0.65rem] font-bold uppercase text-brand-900">Best value</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 1 ? 'bg-brand-50/40 dark:bg-brand-900/15' : ''}>
                      <th className="px-5 py-4 font-semibold text-ink dark:text-white">{row.label}</th>
                      <td className="px-5 py-4 text-ink-muted">{row.economy}</td>
                      <td className="px-5 py-4 text-ink-muted">{row.family}</td>
                      <td className="px-5 py-4 text-ink-muted">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="mt-4 text-center text-xs text-ink-muted">Scroll horizontally on smaller screens to view all columns.</p>
        </Container>
      </Section>

      {/* Included / Not included */}
      <Section>
        <SectionHeading
          eyebrow="Transparent pricing"
          title={<>What’s <span className="text-gradient">included</span> — and what’s not</>}
          lead="No surprises. Here is exactly what your Umrah package covers, and the few items outside it."
        />
        <Container className="mt-14">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-8">
                <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-ink dark:text-white">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-gradient text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  Included in your package
                </h3>
                <ul className="mt-6 space-y-3">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-8">
                <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-ink dark:text-white">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-gradient text-brand-900">
                    <X className="h-4 w-4" />
                  </span>
                  Not included
                </h3>
                <ul className="mt-6 space-y-3">
                  {notIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Booking notes */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="Booking & payment"
          title={<>How booking your Umrah <span className="text-gradient">works</span></>}
          lead="A simple, flexible process backed by 24 years of experience and full government licensing."
        />
        <Container className="mt-14">
          <div className="grid gap-6 sm:grid-cols-2">
            {bookingNotes.map((n, i) => (
              <Reveal key={n.title} delay={(i % 2) * 0.08}>
                <div className="flex h-full gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-7">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                    <n.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink dark:text-white">{n.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{n.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container size="narrow">
          <div className="text-center">
            <Eyebrow className="mx-auto">Umrah packages FAQ</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink dark:text-white sm:text-4xl balance">
              Questions about <span className="text-gradient">our packages</span>
            </h2>
          </div>
          <Reveal className="mt-10">
            <Accordion items={umrahFaqs} />
          </Reveal>
          <p className="mt-6 text-center text-sm text-ink-muted">
            Have a different question?{' '}
            <a href="/umrah/faq" className="font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300">
              See the full Umrah FAQ →
            </a>
          </p>
        </Container>
      </Section>

      <CtaBand
        title="Book your Umrah journey"
        lead="With year-round departures and flexible dates, your Umrah can begin whenever you are ready. Speak to an advisor for a free, no-obligation quote."
        message="Assalamu alaikum! I would like to book an Umrah package."
      />
    </>
  );
}
