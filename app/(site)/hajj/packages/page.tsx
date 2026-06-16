import type { Metadata } from 'next';
import { Check, X, CreditCard, CalendarClock, FileText, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Accordion } from '@/components/ui/Accordion';
import { packages, hajjFaqs } from '@/lib/site';
import { PackageCard, CtaBand } from '@/components/hajj-umrah/shared';

export const metadata: Metadata = {
  title: 'Hajj Packages 2026 — Economy, Standard & Premium from Dhaka',
  description:
    'Compare Inter Gulf Travels’ Hajj 2026 packages: Economy from ৳4,83,000, Standard ৳5,95,000 and Premium ৳8,50,000. Full inclusions, comparison table, what’s included and not, payment terms and FAQs.',
  alternates: { canonical: '/hajj/packages' },
};

const hajjPackages = packages.filter((p) => p.type === 'hajj');

const compareRows: { label: string; economy: string; standard: string; premium: string }[] = [
  { label: 'Itinerary length', economy: '40–42 days', standard: '30–35 days', premium: '21–25 days' },
  { label: 'Flights', economy: 'Direct Saudia / Biman', standard: 'Direct, premium routing', premium: 'Direct, best schedules' },
  { label: 'Makkah hotel distance', economy: 'Shuttle service', standard: 'Within 700m of Haram', premium: '5-star facing Haram' },
  { label: 'Madinah hotel distance', economy: 'Walking / shuttle', standard: 'Within 500m of Masjid an-Nabawi', premium: 'Premium, Haram-side' },
  { label: 'Meals', economy: 'Breakfast, lunch & dinner', standard: 'Full-board buffet', premium: 'Premium buffet & à la carte' },
  { label: 'Room occupancy', economy: '4–5 per room', standard: '3–4 per room', premium: '2 per room' },
  { label: 'Mina & Arafah camp', economy: 'Standard Maktab tent', standard: 'Maktab service', premium: 'VIP upgraded camp' },
  { label: 'Guide', economy: 'Group Bangla guide', standard: 'Dedicated Bangla guide', premium: 'Senior guide, small group' },
  { label: 'Ziyarat', economy: 'Group Ziyarat', standard: 'Complete Makkah & Madinah', premium: 'Complete, private transport' },
  { label: 'Pre-Hajj training', economy: 'Included', standard: 'Included', premium: 'Included + 1-to-1 briefing' },
];

const included = [
  'Return air tickets (Dhaka ⇄ Jeddah / Madinah)',
  'Hajj visa processing & e-Hajj registration',
  'Hotel accommodation in Makkah & Madinah',
  'Daily Bengali meals (full board)',
  'Maktab service & tents in Mina, Arafah, Muzdalifah',
  'All internal transport & airport transfers',
  'Complete Ziyarat with experienced da’ee',
  'Bangla-speaking muallim throughout',
  'Pre-Hajj training workshop in Dhaka',
  'Zamzam water (as per airline allowance)',
];

const notIncluded = [
  'Passport issuance / renewal fees',
  'Qurbani (sacrifice) cost — payable separately',
  'Personal expenses, shopping & phone/SIM',
  'Travel & health insurance (optional, arranged on request)',
  'Excess baggage charges beyond airline limit',
  'Any expense due to flight delays beyond our control',
];

const bookingNotes = [
  { icon: CreditCard, title: 'Booking & Payment', body: 'A booking confirms your seat with an initial deposit; the balance is payable in agreed instalments before departure. We accept bank transfer, cheque and cash — every payment is receipted.' },
  { icon: CalendarClock, title: 'Pre-registration', body: 'Hajj requires government pre-registration through the e-Hajj system. We complete your pre-registration the same day you book and keep you updated on quota and serial status.' },
  { icon: FileText, title: 'Documents', body: 'A passport valid for at least six months, recent photographs, national ID and a meningitis vaccination certificate are required. Our team prepares and submits the rest on your behalf.' },
  { icon: ShieldCheck, title: 'Our Guarantee', body: 'Transparent, itemised pricing with no hidden charges. Should the Saudi authorities change any fee or service, we inform you immediately and adjust honestly.' },
];

export default function HajjPackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Hajj Packages 2026"
        title={<>Choose the Hajj package that fits your journey</>}
        lead="From a budget-friendly Economy plan to a VIP Premium experience, every package is government-approved, all-inclusive and built around your comfort and worship."
        crumbs={[{ label: 'Hajj', href: '/hajj' }, { label: 'Hajj Packages' }]}
      />

      {/* Cards */}
      <Section>
        <SectionHeading
          eyebrow="2026 Season"
          title={<>Three tiers, <span className="text-gradient">one promise of care</span></>}
          lead="All prices are per person and clearly itemised. Tell us your dates and budget and we will tailor the perfect plan for you."
        />
        <Container className="mt-14">
          <div className="grid gap-6 lg:grid-cols-3">
            {hajjPackages.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.07}>
                <PackageCard pkg={p} />
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-ink-muted">
            Prices are indicative for the 2026 season and may vary with airline fares, hotel availability and Saudi
            government charges.
          </p>
        </Container>
      </Section>

      {/* Comparison table */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="Side by side"
          title={<>Compare every <span className="text-gradient">inclusion</span></>}
          lead="A clear, honest breakdown of how the three packages differ — so you can choose with complete confidence."
        />
        <Container className="mt-14">
          <Reveal className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-brand-gradient text-white">
                    <th className="px-5 py-4 font-display text-base font-semibold">Feature</th>
                    <th className="px-5 py-4 font-display text-base font-semibold">Economy</th>
                    <th className="px-5 py-4 font-display text-base font-semibold">
                      Standard <span className="ml-1 rounded-full bg-gold-gradient px-2 py-0.5 text-[0.65rem] font-bold uppercase text-brand-900">Most chosen</span>
                    </th>
                    <th className="px-5 py-4 font-display text-base font-semibold">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 1 ? 'bg-brand-50/40 dark:bg-brand-900/15' : ''}>
                      <th className="px-5 py-4 font-semibold text-ink dark:text-white">{row.label}</th>
                      <td className="px-5 py-4 text-ink-muted">{row.economy}</td>
                      <td className="px-5 py-4 text-ink-muted">{row.standard}</td>
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
          lead="No surprises. Here is exactly what your package covers, and the few items that fall outside it."
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

      {/* Payment & booking notes */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="Booking & payment"
          title={<>How booking your Hajj <span className="text-gradient">works</span></>}
          lead="A simple, honest process backed by 24 years of experience and full government licensing."
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
            <Eyebrow className="mx-auto">Hajj packages FAQ</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink dark:text-white sm:text-4xl balance">
              Questions about <span className="text-gradient">our packages</span>
            </h2>
          </div>
          <Reveal className="mt-10">
            <Accordion items={hajjFaqs} />
          </Reveal>
          <p className="mt-6 text-center text-sm text-ink-muted">
            Have a different question?{' '}
            <a href="/hajj/faq" className="font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300">
              See the full Hajj FAQ →
            </a>
          </p>
        </Container>
      </Section>

      <CtaBand
        title="Reserve your place for Hajj 2026"
        lead="Quotas are limited and fill quickly. Secure your package today with a free, no-obligation consultation."
        message="Assalamu alaikum! I would like to book a Hajj 2026 package."
      />
    </>
  );
}
