import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Compass,
  Eye,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Star,
  BadgeCheck,
  HandHeart,
  Scale,
} from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealGroup, revealItem } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { AuroraBackdrop } from '@/components/effects/AuroraBackdrop';
import { StatsBand } from '@/components/about/StatsBand';
import { Timeline, type Milestone } from '@/components/about/Timeline';
import { siteConfig, contact, whyUs } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Us — Our Story Since 2002',
  description:
    'Inter Gulf Travels Ltd has guided Bangladeshi pilgrims on Hajj & Umrah since 2002. Government-licensed (Hajj License No. 071), we serve every pilgrim with honesty, comfort and care.',
  alternates: { canonical: '/about' },
};

const values = [
  {
    icon: ShieldCheck,
    title: 'Trust & Integrity',
    body: 'We earn trust the only way that lasts — by keeping every promise and pricing every package with complete honesty. No hidden charges, ever.',
  },
  {
    icon: HandHeart,
    title: 'Service from the Heart',
    body: 'We treat every pilgrim the way we would want our own parents treated — with patience, respect and genuine care from first call to safe return.',
  },
  {
    icon: BadgeCheck,
    title: 'Accountability',
    body: 'As a licensed agency answerable to the Ministry of Religious Affairs and HAAB, we hold ourselves to the highest standard at every step.',
  },
  {
    icon: Scale,
    title: 'Fairness & Transparency',
    body: 'Clear itineraries, itemised costs and honest advice — even when it means recommending a smaller package than you came in for.',
  },
  {
    icon: Sparkles,
    title: 'Excellence in Detail',
    body: 'From hotel proximity to the Haram to the experience of every guide, we obsess over the details that make a sacred journey effortless.',
  },
  {
    icon: HeartHandshake,
    title: 'A Family, Not a Number',
    body: 'Thousands of pilgrims return to us, year after year, and send their relatives too. That trust is the heart of who we are.',
  },
];

const milestones: Milestone[] = [
  {
    year: '2002',
    title: 'A trusted name is founded',
    body: 'Inter Gulf Travels Ltd opens its doors in Purana Paltan, Dhaka, with a single mission: to make Hajj & Umrah honest, comfortable and worry-free for Bangladeshi families.',
  },
  {
    year: '2005',
    title: 'Government Hajj licence',
    body: 'The agency is formally approved by the Ministry of Religious Affairs under Hajj License No. 071, earning the right to operate full government-recognised Hajj programmes.',
  },
  {
    year: '2009',
    title: 'HAAB & ATAB membership',
    body: 'We join the Hajj Agencies Association of Bangladesh and the Association of Travel Agents of Bangladesh, anchoring our work to the country’s leading industry bodies.',
  },
  {
    year: '2014',
    title: 'Year-round Umrah programmes',
    body: 'Demand grows, and we expand into flexible 10 to 21-day Umrah departures throughout the year, with on-ground support teams stationed in Makkah and Madinah.',
  },
  {
    year: '2018',
    title: 'IATA-accredited ticketing',
    body: 'Partnerships with 40+ airlines and IATA accreditation let us issue worldwide air tickets in-house, securing the best fares and routings for our pilgrims.',
  },
  {
    year: '2024',
    title: 'Over 12,000 pilgrims served',
    body: 'More than two decades on, we have guided over twelve thousand pilgrims — and the families who travelled with us in 2002 now send their children and grandchildren.',
  },
];

const promises = [
  'Hotels within walking distance of the Haramain',
  'Experienced, Bangla-speaking muallims with every group',
  'Transparent, fully itemised package pricing',
  'Dedicated 24/7 on-ground support in Saudi Arabia',
  'Complete visa, ticketing and documentation handled for you',
  'Pre-departure training so you arrive prepared and at peace',
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Inter Gulf Travels"
        title={
          <>
            Guiding pilgrims home to the <span className="text-gradient-gold">House of Allah</span> since 2002
          </>
        }
        lead="For over two decades, Inter Gulf Travels Ltd has been a reliable name of smooth travelling for Hajj & Umrah — built on honesty, comfort and the care we would give our own family."
        crumbs={[{ label: 'About Us' }]}
      />

      {/* Our story */}
      <Section className="relative overflow-hidden">
        <AuroraBackdrop />
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow>Our story</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.12] text-ink dark:text-white sm:text-4xl balance">
                A journey that began with a single, simple promise
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted">
                <p>
                  In 2002, in a modest office on the fifth floor of KR Plaza in Purana Paltan, Inter Gulf
                  Travels Ltd was founded on one conviction: that every Bangladeshi who longs to stand
                  before the Kaaba deserves a journey that is honest, dignified and free of worry.
                </p>
                <p>
                  In those early years the pilgrimage could be daunting — confusing paperwork, unclear
                  costs and the fear of being far from home in an unfamiliar land. We set out to change
                  that, treating each pilgrim not as a customer but as a guest we were personally
                  responsible for, from the moment they called us to the moment they returned safely to
                  their families.
                </p>
                <p>
                  More than twenty years and over twelve thousand pilgrims later, that promise has not
                  changed. The same families who travelled with us in 2002 now send their children and
                  grandchildren — and that quiet, generational trust is the achievement we are proudest of.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/hajj/packages">
                  View Hajj Packages <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/contact" variant="outline">
                  Talk to an Advisor
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative">
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-brand-gradient p-8 text-white shadow-emerald sm:p-10">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gold-300/20 blur-3xl" />
                  <Star className="h-9 w-9 text-gold-300" />
                  <p className="mt-5 font-display text-xl leading-relaxed sm:text-2xl balance">
                    “A reliable name of smooth travelling for Hajj &amp; Umrah.”
                  </p>
                  <p className="mt-4 text-sm text-white/70">
                    The principle we were founded on in 2002 — and live by to this day.
                  </p>
                  <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-white/15 pt-6">
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-white/55">Established</dt>
                      <dd className="mt-1 font-display text-2xl font-semibold text-gold-300">2002</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-white/55">Hajj Licence</dt>
                      <dd className="mt-1 font-display text-2xl font-semibold text-gold-300">No. 071</dd>
                    </div>
                  </dl>
                </div>
                <div className="mt-4 rounded-3xl border border-border bg-card p-5 text-sm text-ink-muted shadow-soft">
                  <span className="font-semibold text-ink dark:text-white">Head office:</span>{' '}
                  {contact.address.full}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-sand-soft">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
              <span className="ring-gradient grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-gold-300">
                <Compass className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-ink dark:text-white">Our Mission</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                To make the sacred journey of Hajj &amp; Umrah accessible, comfortable and completely
                worry-free for every Bangladeshi pilgrim — through honest pricing, meticulous planning and
                unwavering personal care, so that our guests can devote their hearts entirely to worship.
              </p>
            </Reveal>

            <Reveal
              delay={0.1}
              className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10"
            >
              <span className="ring-gradient grid h-14 w-14 place-items-center rounded-2xl bg-gold-50 text-brand-700 dark:bg-brand-900/40 dark:text-gold-300">
                <Eye className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-ink dark:text-white">Our Vision</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                To be the most trusted Hajj &amp; Umrah agency in Bangladesh — a name passed down through
                generations of families — by setting the benchmark for integrity, service and spiritual
                hospitality in every journey we arrange.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Core values */}
      <Section className="relative overflow-hidden">
        <AuroraBackdrop />
        <SectionHeading
          eyebrow="What we stand for"
          title={
            <>
              The values that have guided us for <span className="text-gradient">over two decades</span>
            </>
          }
          lead="Six principles shape every decision we make — from the hotels we choose to the advice we give."
        />
        <Container className="mt-14">
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <Reveal key={v.title} className="h-full">
                <article className="group h-full rounded-3xl border border-border bg-card/70 p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-gold">
                  <span className="ring-gradient grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-gold-300">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink dark:text-white">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{v.body}</p>
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Animated stats band */}
      <StatsBand />

      {/* Company timeline */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="Our journey"
          title={
            <>
              From a single office to a trusted <span className="text-gradient">household name</span>
            </>
          }
          lead="Two decades of milestones — each one a step toward serving pilgrims better."
        />
        <Container className="mt-14">
          <Timeline items={milestones} />
        </Container>
      </Section>

      {/* Why families trust us */}
      <Section className="relative overflow-hidden">
        <AuroraBackdrop />
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <Eyebrow>Why families trust us</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.12] text-ink dark:text-white sm:text-4xl balance">
                The reassurance of a licensed, experienced team
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-muted">
                A pilgrimage is a once-in-a-lifetime trust. Families choose Inter Gulf because we remove
                every uncertainty — and because, after twenty-four years, we have done this thousands of
                times before.
              </p>
              <div className="mt-7">
                <Button href="/contact">
                  Plan Your Journey <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>

            <RevealGroup className="grid gap-3 sm:grid-cols-2">
              {promises.map((p) => (
                <Reveal key={p}>
                  <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-gold-300">
                      <BadgeCheck className="h-4 w-4" />
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-ink dark:text-white/90">{p}</p>
                  </div>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
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
                Let our family guide yours to the Haramain
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">
                Speak to a {siteConfig.shortName} advisor today for honest guidance and a plan tailored to
                your dates and budget — with no obligation.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/contact" variant="gold" size="lg">
                  Contact Us <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/about/team" variant="light" size="lg">
                  Meet Our Team
                </Button>
              </div>
              <Link
                href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
                className="mt-6 inline-block text-sm font-semibold text-white/85 hover:text-white"
              >
                Or call us directly: {contact.phones[0]}
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
