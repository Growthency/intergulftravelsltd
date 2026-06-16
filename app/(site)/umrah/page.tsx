import type { Metadata } from 'next';
import { ArrowRight, Plane, BedDouble, Utensils, MapPinned, Bus, BadgeCheck } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { packages, processSteps, whyUs } from '@/lib/site';
import { Icon } from '@/components/ui/Icon';
import { PackageCard, CtaBand, NavLinkCard } from '@/components/hajj-umrah/shared';

export const metadata: Metadata = {
  title: 'Umrah Packages — Year-Round Umrah from Bangladesh',
  description:
    'Perform Umrah any time of year with Inter Gulf Travels Ltd (Hajj License No. 071). Economy, Family and Premium Umrah packages from Dhaka with air tickets, e-visa, hotels near the Haramain and guided Ziyarat.',
  alternates: { canonical: '/umrah' },
};

const umrahPackages = packages.filter((p) => p.type === 'umrah');

const inclusions = [
  { icon: Plane, title: 'Air Ticket & Visa', body: 'Return air tickets from Dhaka and a hassle-free Umrah e-visa — fast-track processing on premium plans.' },
  { icon: BedDouble, title: 'Haramain Hotels', body: 'Comfortable accommodation in Makkah and Madinah within easy reach of the Haram, by package tier.' },
  { icon: Bus, title: 'All Transfers', body: 'Airport pickups and Makkah ⇄ Madinah transport in air-conditioned coaches or private vehicles.' },
  { icon: MapPinned, title: 'Guided Ziyarat', body: 'Visits to the blessed historical sites of Makkah and Madinah with a knowledgeable guide.' },
  { icon: Utensils, title: 'Meals', body: 'Daily breakfast and dinner on premium plans, with Bengali cuisine to keep you nourished.' },
  { icon: BadgeCheck, title: '24/7 Support', body: 'A dedicated ground team in Saudi Arabia reachable around the clock for anything you need.' },
];

const subPages = [
  { href: '/umrah/benefit', title: 'Benefit of Umrah', description: 'The forgiveness, reward and spiritual refreshment of the lesser pilgrimage.' },
  { href: '/umrah/packages', title: 'Umrah Packages', description: 'Year-round Economy, Family and Premium plans with full inclusions.' },
  { href: '/umrah/guide', title: 'Umrah Guide', description: 'How to perform Umrah correctly — Ihram, Tawaf, Sa‘i and Halq/Taqsir.' },
  { href: '/umrah/guideline', title: 'Umrah Guideline', description: 'Visa, documents, the best time to travel and a packing checklist.' },
  { href: '/umrah/faq', title: 'FAQ of Umrah', description: 'Answers to the questions pilgrims ask about Umrah.' },
];

export default function UmrahPage() {
  return (
    <>
      <PageHero
        eyebrow="The Lesser Pilgrimage"
        title={<>Answer the call to the Haramain, any time of year</>}
        lead="Umrah is a beloved Sunnah and a journey of renewal that can be undertaken throughout the year. Inter Gulf Travels makes it simple, comfortable and affordable — from your visa to your return."
        crumbs={[{ label: 'Umrah' }]}
      />

      {/* What Umrah is */}
      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>What is Umrah</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink dark:text-white sm:text-4xl balance">
              A blessed pilgrimage you can perform <span className="text-gradient">at any time</span>
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-muted">
              <p>
                Umrah, the “lesser pilgrimage,” is a deeply rewarded act of worship performed by entering Ihram and
                completing Tawaf around the Kaaba, Sa‘i between Safa and Marwah, and Halq or Taqsir (shaving or
                trimming the hair). Unlike Hajj, it has no fixed time — it may be performed in any month of the year.
              </p>
              <p>
                The Prophet ﷺ said: <em>“Umrah to Umrah is an expiation for what is between them, and an accepted Hajj
                has no reward but Paradise”</em> (Bukhari & Muslim). He also taught that performing Umrah in Ramadan
                equals the reward of a Hajj performed with him.
              </p>
              <p>
                Whether it is your first visit to the House of Allah or a return to refresh your faith, Umrah offers a
                gentle, profound reconnection with the Creator — and we are honoured to make it possible for you.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/umrah/packages" variant="primary">
                View Umrah Packages <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/umrah/guide" variant="outline">
                Read the Umrah Guide
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-brand-gradient p-8 text-white shadow-emerald sm:p-10">
              <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gold-300/20 blur-3xl" />
              <p className="font-display text-lg italic leading-relaxed">
                “And complete the Hajj and Umrah for Allah…”
              </p>
              <p className="mt-3 text-sm text-white/75">Surah al-Baqarah 2:196</p>
              <div className="mt-7 space-y-4 border-t border-white/15 pt-6 text-sm text-white/85">
                <p className="flex items-start gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" /> Four simple rites — Ihram, Tawaf, Sa‘i, Halq/Taqsir.</p>
                <p className="flex items-start gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" /> Available every month, with flexible departure dates.</p>
                <p className="flex items-start gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" /> 10 to 21-day plans for individuals and families.</p>
                <p className="flex items-start gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" /> Especially rewarded when performed in Ramadan.</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Why us */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="Why Inter Gulf"
          title={<>Why pilgrims choose us for <span className="text-gradient">their Umrah</span></>}
          lead="A government-licensed agency with 24 years of service — every detail arranged so your journey is pure worship and rest."
        />
        <Container className="mt-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                    <Icon name={item.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Packages */}
      <Section>
        <SectionHeading
          eyebrow="Year-round departures"
          title={<>Umrah packages for <span className="text-gradient">every traveller</span></>}
          lead="Transparent, all-inclusive pricing with flexible dates. Choose a plan below, or let us tailor one to your family and budget."
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
            Prices are indicative and may vary with airline fares and hotel availability.{' '}
            <a href="/umrah/packages" className="font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300">
              See full package details →
            </a>
          </p>
        </Container>
      </Section>

      {/* Inclusions */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="What’s included"
          title={<>A complete journey, <span className="text-gradient">arranged for you</span></>}
          lead="From your visa in Dhaka to your safe return home, every essential is taken care of."
        />
        <Container className="mt-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {inclusions.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="flex h-full gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white shadow-emerald">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink dark:text-white">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeading
          eyebrow="How it works"
          title={<>Four simple steps to <span className="text-gradient">the House of Allah</span></>}
          lead="We have refined the journey into a calm, guided process — you focus on your intention, we take care of everything else."
        />
        <Container className="mt-14">
          <div className="relative">
            <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-brand-600/30 to-transparent lg:block" />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, i) => (
                <Reveal key={step.step} delay={i * 0.1} className="relative text-center lg:text-left">
                  <div
                    className="relative z-10 mx-auto grid place-items-center rounded-2xl bg-brand-gradient font-display text-2xl font-semibold text-white shadow-emerald lg:mx-0"
                    style={{ height: '4.5rem', width: '4.5rem' }}
                  >
                    {step.step}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink dark:text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Explore */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="Explore Umrah"
          title={<>Plan your Umrah with <span className="text-gradient">complete confidence</span></>}
          lead="Learn the rewards, the rites, the requirements and the answers to your questions."
        />
        <Container className="mt-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {subPages.map((p, i) => (
              <Reveal key={p.href} delay={i * 0.05}>
                <NavLinkCard {...p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Begin your Umrah journey today"
        lead="Tell us your preferred dates and we will arrange everything — visa, flights, hotels and guidance — for a smooth, blessed Umrah."
        message="Assalamu alaikum! I am interested in your Umrah packages."
      />
    </>
  );
}
