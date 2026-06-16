import type { Metadata } from 'next';
import { Plane, FileText, CalendarHeart, Luggage, Syringe, Check, Sparkles, Sun } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CtaBand } from '@/components/hajj-umrah/shared';

export const metadata: Metadata = {
  title: 'Umrah Guideline — Visa, Documents, Best Time & Checklist',
  description:
    'A practical Umrah preparation guide: the Umrah e-visa process, required documents, the best time of year to travel (Ramadan, winter, off-peak), vaccinations and a complete packing checklist for pilgrims from Bangladesh.',
  alternates: { canonical: '/umrah/guideline' },
};

const visaSteps = [
  'Submit your passport (valid 6+ months) and a recent photograph to us.',
  'We complete and lodge your Umrah e-visa application on your behalf.',
  'The e-visa is typically issued within a few working days (fast-track on premium plans).',
  'You receive your visa, confirmed flights and hotel vouchers before departure.',
];

const documents = [
  'Passport valid for at least 6 months with blank pages',
  'Recent passport-size photographs (white background)',
  'Completed Umrah application form (we provide it)',
  'Meningitis (ACWY) vaccination certificate',
  'Mahram documentation for women per the applicable rules',
  'Booking confirmation & payment receipts',
];

const bestTimes = [
  { icon: Sparkles, season: 'Ramadan', note: 'The most rewarded time — Umrah in Ramadan equals the reward of Hajj. Expect crowds and higher prices; book early.' },
  { icon: Sun, season: 'Winter (Nov–Feb)', note: 'Pleasant, cooler weather across Makkah and Madinah — ideal for elderly pilgrims and families.' },
  { icon: CalendarHeart, season: 'Off-peak months', note: 'Quieter Haram, easier Tawaf and the best prices — perfect for a calm, unhurried Umrah.' },
];

const packing = {
  Ihram: ['Two Ihram sets (men)', 'Modest dress (women)', 'Ihram belt with pocket', 'Unscented toiletries'],
  Clothing: ['Light cotton clothing', 'Light jacket for cool nights', 'Comfortable walking sandals', 'Several pairs of socks'],
  Essentials: ['Passport, visa & vouchers', 'Money belt & small backpack', 'Prayer mat, tasbih & dua book', 'Power bank & adapter', 'Reusable water bottle', 'Personal medicines'],
};

export default function UmrahGuidelinePage() {
  return (
    <>
      <PageHero
        eyebrow="Umrah Guideline"
        title={<>Plan a smooth, well-prepared Umrah</>}
        lead="From the Umrah e-visa and the documents you’ll need to the best time of year to travel and a complete packing checklist — here is your practical, stress-free preparation guide."
        crumbs={[{ label: 'Umrah', href: '/umrah' }, { label: 'Umrah Guideline' }]}
      />

      {/* Visa process */}
      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Umrah e-visa</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink dark:text-white sm:text-4xl balance">
              The visa, <span className="text-gradient">handled for you</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              Saudi Arabia’s Umrah e-visa has made travelling to the Haram simpler than ever. As a licensed agency we
              process the whole application for you — you only provide your passport and a photograph, and we take care
              of the rest.
            </p>
            <ol className="mt-7 space-y-4">
              {visaSteps.map((s, i) => (
                <li key={s} className="flex items-start gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-gradient font-display text-sm font-semibold text-white shadow-emerald">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-sm leading-relaxed text-ink-muted">{s}</span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-brand-gradient p-8 text-white shadow-emerald sm:p-10">
              <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gold-300/20 blur-3xl" />
              <Plane className="h-9 w-9 text-gold-300" />
              <h3 className="mt-5 font-display text-xl font-semibold">Good to know</h3>
              <ul className="mt-5 space-y-3 text-sm text-white/85">
                <li className="flex items-start gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" /> The Umrah e-visa is generally valid for travel within a set window and permits a stay of up to 90 days.</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" /> A single e-visa allows multiple entries and lets you visit both Makkah and Madinah.</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" /> Visa rules are set by Saudi authorities and can change — we always confirm the current requirements with you.</li>
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Documents & vaccination */}
      <Section className="bg-sand-soft">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-8">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                <FileText className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold text-ink dark:text-white">Required documents</h2>
              <ul className="mt-6 space-y-3">
                {documents.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-8">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                <Syringe className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold text-ink dark:text-white">Health & vaccination</h2>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink-muted">
                <li className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> Meningococcal meningitis (ACWY) vaccine — required, at least 10 days before travel.</li>
                <li className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> Seasonal flu and Covid-19 vaccination as advised by Saudi requirements that season.</li>
                <li className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> A general check-up for elderly pilgrims or those with chronic conditions.</li>
                <li className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> Carry your regular medicines with a written prescription and a small first-aid kit.</li>
              </ul>
              <p className="mt-5 rounded-2xl bg-brand-50/70 p-4 text-xs leading-relaxed text-brand-800 dark:bg-brand-900/30 dark:text-brand-200">
                Requirements are set by the Saudi Ministry of Health and can change. We confirm the exact list with you
                before departure.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Best time */}
      <Section>
        <SectionHeading
          eyebrow="When to go"
          title={<>The best time to <span className="text-gradient">perform Umrah</span></>}
          lead="Umrah is available all year — here is how the seasons differ so you can choose what suits you best."
        />
        <Container className="mt-14">
          <div className="grid gap-6 sm:grid-cols-3">
            {bestTimes.map((t, i) => (
              <Reveal key={t.season} delay={i * 0.07}>
                <div className="h-full rounded-3xl border border-border bg-card p-7 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-emerald">
                    <t.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink dark:text-white">{t.season}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Packing */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="Packing checklist"
          title={<>Pack light, <span className="text-gradient">pack smart</span></>}
          lead="Everything you genuinely need for Umrah, grouped so nothing essential is left behind."
        />
        <Container className="mt-14">
          <div className="grid gap-6 sm:grid-cols-3">
            {Object.entries(packing).map(([group, items], i) => (
              <Reveal key={group} delay={i * 0.07}>
                <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <div className="flex items-center gap-2">
                    <Luggage className="h-5 w-5 text-brand-600" />
                    <h3 className="font-display text-lg font-semibold text-ink dark:text-white">{group}</h3>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Let us prepare everything"
        lead="From your e-visa and flights to hotels near the Haramain and guided Ziyarat, Inter Gulf arranges every detail of your Umrah."
        message="Assalamu alaikum! I have a question about preparing for Umrah."
      />
    </>
  );
}
