import type { Metadata } from 'next';
import { Check, ArrowRight, Plane, BedDouble, Utensils, MapPinned, GraduationCap, Bus } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { packages, processSteps, whyUs, siteConfig } from '@/lib/site';
import { Icon } from '@/components/ui/Icon';
import { PackageCard, CtaBand, NavLinkCard } from '@/components/hajj-umrah/shared';

export const metadata: Metadata = {
  title: 'Hajj Packages 2026 — Government-Licensed Hajj from Bangladesh',
  description:
    'Perform Hajj with Inter Gulf Travels Ltd (Hajj License No. 071). Economy, Standard and Premium Hajj 2026 packages from Dhaka with direct flights, hotels near the Haram, full Ziyarat and Bangla-speaking guides.',
  alternates: { canonical: '/hajj' },
};

const hajjPackages = packages.filter((p) => p.type === 'hajj');

const inclusions = [
  { icon: Plane, title: 'Return Air Tickets', body: 'Direct Saudia or Biman Bangladesh flights between Dhaka and Jeddah / Madinah, with all airport assistance.' },
  { icon: BedDouble, title: 'Haram-side Hotels', body: 'Accommodation in Makkah and Madinah within walking distance of the Haramain, by package tier.' },
  { icon: Utensils, title: 'Daily Meals', body: 'Bengali full-board meals — breakfast, lunch and dinner — throughout your stay in the Kingdom.' },
  { icon: MapPinned, title: 'Complete Ziyarat', body: 'Guided visits to the historic and sacred sites of Makkah and Madinah with a knowledgeable da’ee.' },
  { icon: Bus, title: 'All Ground Transport', body: 'Maktab service and transfers in Mina, Arafah and Muzdalifah, plus Makkah ⇄ Madinah coaches.' },
  { icon: GraduationCap, title: 'Pre-Hajj Training', body: 'A dedicated workshop in Dhaka so you arrive knowing every rite and dua before you depart.' },
];

const subPages = [
  { href: '/hajj/benefit', title: 'Benefit of Hajj', description: 'The spiritual rewards and lasting transformation of the fifth pillar of Islam.' },
  { href: '/hajj/packages', title: 'Hajj Packages', description: 'Full 2026 Economy, Standard and Premium plans with a side-by-side comparison.' },
  { href: '/hajj/guide', title: 'Hajj Guide', description: 'A clear, ordered timeline of every rite from Ihram to the farewell Tawaf.' },
  { href: '/hajj/guideline', title: 'Hajj Guideline', description: 'Documents, vaccinations, packing checklist, key dates and money tips.' },
  { href: '/hajj/faq', title: 'FAQ of Hajj', description: 'Honest answers to the questions pilgrims ask us most often.' },
];

export default function HajjPage() {
  return (
    <>
      <PageHero
        eyebrow="The Fifth Pillar of Islam"
        title={<>Stand before the Kaaba with a team you can trust</>}
        lead="Hajj is the journey of a lifetime — a divine invitation answered once with your whole heart. Since 2002, Inter Gulf Travels Ltd has guided Bangladeshi pilgrims through every rite with honesty, comfort and care."
        crumbs={[{ label: 'Hajj' }]}
      />

      {/* What Hajj is */}
      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>What is Hajj</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink dark:text-white sm:text-4xl balance">
              An obligation upon every able Muslim, <span className="text-gradient">once in a lifetime</span>
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-muted">
              <p>
                Hajj is the annual pilgrimage to Makkah, performed in the month of Dhul-Hijjah, and the fifth pillar
                of Islam. Allah commands in the Qur’an: <em>“And [due] to Allah from the people is a pilgrimage to the
                House — for whoever is able to find thereto a way”</em> (Surah Aal-Imran 3:97). It is obligatory once
                in a lifetime upon every adult Muslim who is physically and financially able.
              </p>
              <p>
                Over roughly five days, millions of pilgrims from every nation gather in unity — dressed alike in
                simple Ihram, rich and poor indistinguishable — to perform the rites established by the Prophet
                Ibrahim and revived by the Prophet Muhammad ﷺ in his Farewell Hajj. It is a journey of submission,
                sacrifice, supplication and renewal.
              </p>
              <p>
                Whoever performs Hajj sincerely, the Prophet ﷺ said, <em>“and does not commit any obscenity or
                wrongdoing, returns [free of sin] as the day his mother bore him”</em> (Bukhari). That promise of a
                fresh, forgiven beginning is what draws the heart back to the House of Allah.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/hajj/packages" variant="primary">
                View 2026 Packages <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/hajj/guide" variant="outline">
                Read the Hajj Guide
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-brand-gradient p-8 text-white shadow-emerald sm:p-10">
              <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gold-300/20 blur-3xl" />
              <p className="font-display text-lg italic leading-relaxed">
                “Labbaik Allahumma labbaik. Labbaika laa shareeka laka labbaik. Innal-hamda wan-ni‘mata laka wal-mulk.
                Laa shareeka lak.”
              </p>
              <p className="mt-4 text-sm text-white/75">
                Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, grace and
                sovereignty belong to You. You have no partner.
              </p>
              <div className="mt-7 grid grid-cols-3 gap-4 border-t border-white/15 pt-6 text-center">
                <div>
                  <div className="font-display text-2xl font-semibold text-gold-300">{new Date().getFullYear() - siteConfig.founded}+</div>
                  <div className="mt-1 text-xs text-white/65">Years guiding pilgrims</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-semibold text-gold-300">071</div>
                  <div className="mt-1 text-xs text-white/65">Hajj License No.</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-semibold text-gold-300">100%</div>
                  <div className="mt-1 text-xs text-white/65">Govt. licensed</div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Why travel with us */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="Why Inter Gulf"
          title={<>Reasons pilgrims trust us with <span className="text-gradient">their most important journey</span></>}
          lead="A government-licensed agency with 24 years of unbroken service — every detail handled so you can devote yourself entirely to worship."
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

      {/* Packages summary */}
      <Section>
        <SectionHeading
          eyebrow="2026 Season"
          title={<>Hajj packages for <span className="text-gradient">every pilgrim</span></>}
          lead="Transparent, all-inclusive pricing with no hidden charges. Choose a plan below, or let us tailor one to your family and budget."
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
            Prices are indicative and may vary with airline fares and hotel availability.{' '}
            <a href="/hajj/packages" className="font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300">
              Compare all packages in detail →
            </a>
          </p>
        </Container>
      </Section>

      {/* Key inclusions */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="What’s included"
          title={<>Everything taken care of, <span className="text-gradient">end to end</span></>}
          lead="From the moment you leave Dhaka until you return home, every essential is arranged for you."
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
          title={<>Four simple steps to <span className="text-gradient">standing before the Kaaba</span></>}
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

      {/* Explore sub-pages */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="Explore Hajj"
          title={<>Everything you need to <span className="text-gradient">prepare with confidence</span></>}
          lead="Dive deeper into the rewards, the rites, the requirements and the answers to your questions."
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
        title="Your invitation to the House of Allah awaits"
        lead="Pre-registration for Hajj 2026 is open and quotas fill fast. Speak to an advisor today for honest guidance and a package made for you."
        message="Assalamu alaikum! I am interested in your Hajj 2026 packages."
      />
    </>
  );
}
