import type { Metadata } from 'next';
import {
  ArrowRight,
  MessageCircle,
  Phone,
  Check,
  FileText,
  Plane,
  ClipboardCheck,
  Stamp,
  CalendarClock,
} from 'lucide-react';
import { contact } from '@/lib/site';
import { whatsappLink } from '@/lib/utils';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Accordion } from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'Visa Service',
  description:
    'End-to-end visa processing from Dhaka — Saudi Hajj, Umrah, work & business visas, plus UAE, Malaysia, Thailand and Schengen tourist visas. Document guidance and fast, accurate filing by Inter Gulf Travels Ltd.',
  alternates: { canonical: '/services/visa' },
};

const visaCountries = [
  {
    flag: '🇸🇦',
    country: 'Saudi Arabia',
    types: ['Hajj visa', 'Umrah e-visa', 'Work visa', 'Business / commercial visit'],
    note: 'Our core specialty since 2002 — Hajj and Umrah visas processed through approved Saudi channels.',
  },
  {
    flag: '🇦🇪',
    country: 'United Arab Emirates',
    types: ['Tourist visa (30 / 60 days)', 'Visit visa', 'Transit visa'],
    note: 'Fast UAE tourist and visit visas for Dubai, Abu Dhabi and Sharjah trips.',
  },
  {
    flag: '🇲🇾',
    country: 'Malaysia',
    types: ['eVISA tourist', 'Visit visa', 'eNTRI'],
    note: 'Straightforward Malaysian eVISA processing for holidays and family visits.',
  },
  {
    flag: '🇹🇭',
    country: 'Thailand',
    types: ['Tourist visa', 'e-Visa', 'Visa on arrival guidance'],
    note: 'Bangkok and Phuket tourist visas with full document preparation.',
  },
  {
    flag: '🇪🇺',
    country: 'Schengen States',
    types: ['Tourist / family visit', 'Business visa', 'Travel insurance support'],
    note: 'Schengen applications for France, Germany, Italy and more — appointment and cover-letter support.',
  },
  {
    flag: '🌍',
    country: 'Other Destinations',
    types: ['Turkey e-Visa', 'Singapore', 'Qatar & Kuwait', 'Country-specific guidance'],
    note: 'Tell us where you are going — our consultants advise on the right route and paperwork.',
  },
];

const documents = [
  'Passport valid for at least 6 months with blank pages',
  'Recent passport-size photographs (white background)',
  'Completed visa application form (we prepare this for you)',
  'Confirmed return air ticket or itinerary',
  'Hotel booking / accommodation proof',
  'Bank statement & solvency certificate (where required)',
  'National ID (NID) and / or trade license for business visas',
  'Vaccination certificate (meningitis for Hajj & Umrah)',
];

const processSteps = [
  {
    icon: ClipboardCheck,
    title: 'Free consultation',
    body: 'We assess your destination, purpose and eligibility, then list exactly what you need.',
  },
  {
    icon: FileText,
    title: 'Document preparation',
    body: 'Our team completes forms, checks every paper and corrects issues before submission.',
  },
  {
    icon: Stamp,
    title: 'Application & filing',
    body: 'We submit through the correct embassy or online portal and track your file daily.',
  },
  {
    icon: Plane,
    title: 'Visa & travel ready',
    body: 'You collect your visa and, if you wish, we arrange your flights and hotels too.',
  },
];

const faqs = [
  {
    q: 'How long does a Saudi Umrah e-visa take?',
    a: 'With complete documents, the Umrah e-visa is typically issued within a few working days. Our premium Umrah packages include fast-track processing for tighter departure dates.',
  },
  {
    q: 'Can you process a Schengen visa from Dhaka?',
    a: 'Yes. We prepare your full Schengen application — cover letter, itinerary, travel insurance and supporting documents — and guide you through the VFS / embassy appointment so your file is as strong as possible.',
  },
  {
    q: 'Do you guarantee that a visa will be approved?',
    a: 'No agency can guarantee approval — the final decision always rests with the embassy or immigration authority. What we guarantee is an accurate, complete and well-presented application that gives you the best possible chance.',
  },
  {
    q: 'Can I apply for a visa even if I book my flight elsewhere?',
    a: 'Absolutely. Our visa service is available on its own. Of course, many clients let us handle flights and hotels as well so the whole trip is coordinated by one team.',
  },
  {
    q: 'What is the difference between Hajj, Umrah and visit visas to Saudi Arabia?',
    a: 'A Hajj visa is issued only for the official Hajj season and only through licensed agencies like ours. An Umrah e-visa is available year-round for the lesser pilgrimage. A business or commercial visit visa is for trade and meetings and does not permit Hajj or Umrah rites.',
  },
];

export default function VisaServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Visa Service"
        title={
          <>
            Borders made simple, <span className="text-gradient-gold">paperwork done right</span>
          </>
        }
        lead="End-to-end visa processing for Saudi Arabia, the UAE, Malaysia, Thailand, Schengen states and beyond — handled by specialists who know exactly what each embassy expects."
        crumbs={[{ label: 'Services', href: '/services' }, { label: 'Visa Service' }]}
      />

      {/* Countries */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="Where we can take you"
          title={
            <>
              Visas for the destinations <span className="text-gradient">that matter most</span>
            </>
          }
          lead="From the holy cities of Makkah and Madinah to family holidays and business trips, we process the visas Bangladeshi travellers need most."
        />

        <Container className="mt-14">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visaCountries.map((c, i) => (
              <Reveal
                key={c.country}
                delay={i * 0.05}
                as="article"
                className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/30 hover:shadow-emerald"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-2xl dark:bg-brand-900/40" aria-hidden>
                    {c.flag}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-ink dark:text-white">{c.country}</h3>
                </div>
                <ul className="mt-5 space-y-2">
                  {c.types.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-ink/80 dark:text-white/80">
                      <Check className="h-4 w-4 shrink-0 text-brand-600" /> {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-ink-muted">{c.note}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Documents + Process */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-700 dark:border-brand-400/20 dark:bg-brand-900/30 dark:text-brand-300">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" /> Required documents
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink dark:text-white sm:text-4xl">
                What you will typically need
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                Exact requirements vary by country and visa type. Bring what you have and our consultants will
                tell you precisely what is missing — we handle the rest.
              </p>
              <ul className="mt-7 space-y-3">
                {documents.map((d) => (
                  <li key={d} className="flex items-start gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-ink/85 shadow-soft dark:text-white/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {d}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-700 dark:border-brand-400/20 dark:bg-brand-900/30 dark:text-brand-300">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" /> How it works
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink dark:text-white sm:text-4xl">
                Four simple steps to your visa
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                We have refined this process over 24 years so it is as smooth and stress-free as possible.
              </p>
              <ol className="mt-7 space-y-4">
                {processSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white shadow-emerald">
                      <s.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">Step {i + 1}</p>
                      <h3 className="mt-0.5 font-display text-lg font-semibold text-ink dark:text-white">{s.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Disclaimer banner */}
      <Section className="pt-0">
        <Container>
          <Reveal className="flex items-start gap-4 rounded-3xl border border-gold-500/30 bg-gold-50 p-6 dark:bg-gold-900/10 sm:p-8">
            <CalendarClock className="mt-1 h-6 w-6 shrink-0 text-gold-600" />
            <p className="text-sm leading-relaxed text-ink/80 dark:text-white/80">
              <strong className="text-ink dark:text-white">Please note:</strong> visa approval is always at the
              sole discretion of the relevant embassy or immigration authority. Inter Gulf Travels prepares and
              submits accurate, complete applications, but cannot influence or guarantee the final decision.
              Government and embassy fees are separate from our service charge and are non-refundable once paid.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="bg-sand-soft pt-0">
        <SectionHeading
          eyebrow="Visa FAQ"
          title={
            <>
              Your questions, <span className="text-gradient">answered</span>
            </>
          }
          lead="Still unsure about something? Call us — our consultants are happy to walk you through it."
        />
        <Container size="narrow" className="mt-12">
          <Accordion items={faqs} />
        </Container>
      </Section>

      <ServiceCTA
        heading="Ready to start your visa application?"
        body="Send us your destination and travel dates. We will tell you exactly what is needed and begin straight away."
        waMessage="Assalamu alaikum! I would like help with a visa application."
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
