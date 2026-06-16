import type { Metadata } from 'next';
import { FileText, Syringe, Luggage, CheckCircle2, XCircle, CalendarRange, Wallet, Check } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CtaBand } from '@/components/hajj-umrah/shared';

export const metadata: Metadata = {
  title: 'Hajj Guideline — Documents, Vaccination, Packing & Preparation',
  description:
    'A practical Hajj preparation guide: required documents, mandatory meningitis & Covid vaccinations, a complete packing checklist, do’s and don’ts of Ihram, important Dhul-Hijjah dates and money tips for pilgrims from Bangladesh.',
  alternates: { canonical: '/hajj/guideline' },
};

const documents = [
  'Passport valid for at least 6 months beyond travel, with blank pages',
  'Recent passport-size photographs (white background, as per Saudi spec)',
  'National ID card (NID) and a photocopy',
  'Completed Hajj pre-registration & e-Hajj details (we handle this)',
  'Meningitis (ACWY) vaccination certificate',
  'Mahram documents for women travelling under the relevant rules',
  'Booking confirmation & package payment receipts',
];

const packing = {
  Ihram: ['Two sets of white Ihram cloth (men)', 'Modest, loose clothing (women)', 'Ihram belt with zip pocket', 'Unscented soap & toiletries'],
  Clothing: ['Comfortable cotton clothing for the heat', 'Light jacket for cool nights at Mina', 'Several pairs of breathable socks', 'Easy slip-on sandals'],
  Health: ['Personal & prescription medicines', 'Small first-aid kit & plasters', 'Sunscreen & lip balm (unscented in Ihram)', 'Vaseline for chafing, anti-blister kit'],
  Essentials: ['Pilgrim ID card & lanyard', 'Small backpack & money belt', 'Reusable water bottle', 'Prayer mat, tasbih & dua book', 'Power bank & universal adapter', 'Umbrella for sun & light rain'],
};

const dos = [
  'Make sincere intention (niyyah) and seek forgiveness before departing',
  'Keep reciting the Talbiyah and abundant dhikr while in Ihram',
  'Stay hydrated, eat lightly and rest whenever possible',
  'Keep your group ID, hotel card and guide’s number on you at all times',
  'Be patient and gentle in the crowds — good character is part of Hajj',
  'Note your tent and pillar numbers in Mina before moving',
];

const donts = [
  'Do not cut hair or nails, or use scented products, while in Ihram',
  'Do not argue, use foul language or harm any living thing',
  'Avoid marital relations and proposals of marriage in Ihram',
  'Do not push or rush at the Jamarat or during Tawaf — patience first',
  'Do not stray from your group or ignore your guide’s instructions',
  'Do not overpack or carry valuables you cannot keep close',
];

const dates = [
  { date: '8th Dhul-Hijjah', label: 'Yawm at-Tarwiyah', note: 'Enter Ihram and travel to Mina' },
  { date: '9th Dhul-Hijjah', label: 'Yawm al-Arafah', note: 'The standing at Arafah — the essence of Hajj' },
  { date: '10th Dhul-Hijjah', label: 'Eid al-Adha (Yawm an-Nahr)', note: 'Rami, Qurbani, Halq and Tawaf al-Ifadah' },
  { date: '11th–13th Dhul-Hijjah', label: 'Ayyam at-Tashreeq', note: 'Stay in Mina and stone the three Jamarat' },
];

const moneyTips = [
  'Carry a mix of Saudi Riyals in small and large denominations.',
  'Keep cash split between a money belt and the hotel safe — never all in one place.',
  'A few ATM/debit cards accepted in KSA are useful as a backup.',
  'Budget separately for Qurbani, gifts, Zamzam and personal expenses.',
  'Exchange most of your money in Bangladesh at a fair rate before travelling.',
  'Keep small notes ready for tips, transport and quick purchases.',
];

export default function HajjGuidelinePage() {
  return (
    <>
      <PageHero
        eyebrow="Hajj Guideline"
        title={<>Everything you need to prepare for Hajj</>}
        lead="From the documents and vaccinations required to a complete packing checklist, the etiquette of Ihram and the key dates of Dhul-Hijjah — here is your practical, no-stress preparation guide."
        crumbs={[{ label: 'Hajj', href: '/hajj' }, { label: 'Hajj Guideline' }]}
      />

      {/* Documents & vaccination */}
      <Section>
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-8">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                <FileText className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold text-ink dark:text-white">Required documents</h2>
              <p className="mt-2 text-sm text-ink-muted">Have these ready — our team prepares and submits the rest on your behalf.</p>
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
              <p className="mt-2 text-sm text-ink-muted">Saudi Arabia requires proof of vaccination on entry for Hajj.</p>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink-muted">
                <li className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> Meningococcal meningitis (ACWY) vaccine — mandatory, taken at least 10 days before travel.</li>
                <li className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> Seasonal influenza and Covid-19 vaccination as advised by Saudi requirements that season.</li>
                <li className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> Polio vaccination certificate where required for travellers from certain regions.</li>
                <li className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> A general medical check-up — especially for elderly pilgrims or those with chronic conditions.</li>
                <li className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> Carry a written list of your medicines and a basic first-aid kit.</li>
              </ul>
              <p className="mt-5 rounded-2xl bg-brand-50/70 p-4 text-xs leading-relaxed text-brand-800 dark:bg-brand-900/30 dark:text-brand-200">
                Requirements are set by the Saudi Ministry of Health and can change each year. We confirm the exact,
                up-to-date list with you well before departure.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Packing checklist */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="Packing checklist"
          title={<>Pack light, <span className="text-gradient">pack smart</span></>}
          lead="Everything you genuinely need, grouped so nothing essential is left behind — and nothing unnecessary weighs you down."
        />
        <Container className="mt-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(packing).map(([group, items], i) => (
              <Reveal key={group} delay={i * 0.06}>
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

      {/* Do's & Don'ts */}
      <Section>
        <SectionHeading
          eyebrow="Etiquette of Ihram"
          title={<>The do’s and <span className="text-gradient">don’ts</span></>}
          lead="Small things matter on Hajj. Keep to these and your journey will be smoother, safer and more rewarded."
        />
        <Container className="mt-14">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-8">
                <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-ink dark:text-white">
                  <CheckCircle2 className="h-6 w-6 text-brand-600" /> Do
                </h3>
                <ul className="mt-6 space-y-3">
                  {dos.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-8">
                <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-ink dark:text-white">
                  <XCircle className="h-6 w-6 text-gold-600" /> Don’t
                </h3>
                <ul className="mt-6 space-y-3">
                  {donts.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" /> {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Important dates */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="Key dates"
          title={<>The important days of <span className="text-gradient">Dhul-Hijjah</span></>}
          lead="The core rites of Hajj fall across just a few days. Know them so you can plan and prepare your heart."
        />
        <Container className="mt-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dates.map((d, i) => (
              <Reveal key={d.date} delay={i * 0.06}>
                <div className="h-full rounded-3xl border border-border bg-card p-6 text-center shadow-soft">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-emerald">
                    <CalendarRange className="h-6 w-6" />
                  </div>
                  <div className="mt-4 font-display text-base font-semibold text-gradient">{d.date}</div>
                  <div className="mt-1 font-display text-sm font-semibold text-ink dark:text-white">{d.label}</div>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted">{d.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-ink-muted">
            Gregorian dates shift each year with the sighting of the moon; we confirm the exact dates for your season.
          </p>
        </Container>
      </Section>

      {/* Money tips */}
      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Money tips</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink dark:text-white sm:text-4xl balance">
              Manage your money <span className="text-gradient">wisely on Hajj</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              You will not need to carry large sums — your package covers the essentials. A modest, well-organised
              budget for personal expenses keeps you free to focus on worship.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-8">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                <Wallet className="h-6 w-6" />
              </div>
              <ul className="mt-6 space-y-3">
                {moneyTips.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title="Let us handle the details"
        lead="From visas and vaccinations to pre-departure training, Inter Gulf takes the stress out of preparing for Hajj — so you can focus on your worship."
        message="Assalamu alaikum! I have a question about preparing for Hajj."
      />
    </>
  );
}
