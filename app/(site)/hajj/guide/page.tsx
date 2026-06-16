import type { Metadata } from 'next';
import { Shirt, RefreshCw, Footprints, Tent, Mountain, MoonStar, Target, Beef, Scissors, Heart, CalendarDays } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CtaBand } from '@/components/hajj-umrah/shared';

export const metadata: Metadata = {
  title: 'Hajj Guide — Step-by-Step Rites of Pilgrimage',
  description:
    'A clear, ordered guide to the rites of Hajj: entering Ihram, Tawaf, Sa‘i, Mina, the standing at Arafah, Muzdalifah, Rami al-Jamarat, Qurbani, Halq, Tawaf al-Ifadah and the farewell Tawaf — day by day.',
  alternates: { canonical: '/hajj/guide' },
};

const rites = [
  {
    day: '8th Dhul-Hijjah — Yawm at-Tarwiyah',
    icon: Shirt,
    title: 'Enter the state of Ihram',
    body:
      'At the appointed Miqat, the pilgrim performs ghusl, dons the two white unstitched cloths (men) or modest dress (women), makes the intention (niyyah) for Hajj and begins the Talbiyah: “Labbaik Allahumma labbaik…”. From this moment the rules of Ihram apply — no cutting hair or nails, no perfume, no marital relations, no arguing or harming any living thing.',
  },
  {
    day: '8th Dhul-Hijjah',
    icon: Tent,
    title: 'Travel to Mina',
    body:
      'Pilgrims proceed to the tent city of Mina and remain there, praying Dhuhr, Asr, Maghrib, Isha and the next day’s Fajr — each prayer shortened (qasr) but at its own time. The day is spent in worship, supplication and rest in preparation for the great day of Arafah.',
  },
  {
    day: '9th Dhul-Hijjah — Yawm al-Arafah',
    icon: Mountain,
    title: 'The Standing at Arafah (Wuquf)',
    body:
      'This is the pillar and essence of Hajj — “Hajj is Arafah,” said the Prophet ﷺ. After sunrise the pilgrims move to the plain of Arafah and remain from midday until sunset in earnest dua, dhikr and repentance. Dhuhr and Asr are combined and shortened. It is the day Allah descends His mercy and frees the most souls from the Fire — no pilgrim should let it pass without sincere supplication.',
  },
  {
    day: '9th Dhul-Hijjah — after sunset',
    icon: MoonStar,
    title: 'Muzdalifah & gathering pebbles',
    body:
      'After sunset, without praying Maghrib at Arafah, pilgrims travel to Muzdalifah where Maghrib and Isha are combined. They rest under the open sky, perform Fajr, make dua, and collect small pebbles for the stoning ritual to come.',
  },
  {
    day: '10th Dhul-Hijjah — Yawm an-Nahr (Eid)',
    icon: Target,
    title: 'Rami of Jamrat al-Aqabah',
    body:
      'On the morning of Eid al-Adha, pilgrims return to Mina and stone the largest pillar, Jamrat al-Aqabah, with seven pebbles, saying “Allahu Akbar” with each throw. This re-enacts Ibrahim عليه السلام rejecting Shaytan and symbolises the believer’s own struggle against evil.',
  },
  {
    day: '10th Dhul-Hijjah',
    icon: Beef,
    title: 'Qurbani — the sacrifice',
    body:
      'The pilgrim offers an animal sacrifice (or arranges it through an authorised service), commemorating Ibrahim’s willingness to sacrifice his son in obedience to Allah, and Allah’s ransom of him with a great sacrifice. The meat is distributed to the poor.',
  },
  {
    day: '10th Dhul-Hijjah',
    icon: Scissors,
    title: 'Halq or Taqsir',
    body:
      'Men shave the head (halq) — the most rewarded — or trim it (taqsir); women trim a fingertip’s length of hair. With this, the first level of release from Ihram (tahallul) is complete: most restrictions are lifted, and the pilgrim may change into ordinary clothes.',
  },
  {
    day: '10th–11th Dhul-Hijjah',
    icon: RefreshCw,
    title: 'Tawaf al-Ifadah & Sa‘i',
    body:
      'The pilgrim returns to Makkah to perform Tawaf al-Ifadah — seven circuits around the Kaaba — a pillar of Hajj, followed by the Sa‘i between Safa and Marwah (seven trips) if not already done. After this, all restrictions of Ihram, including marital relations, are fully lifted.',
  },
  {
    day: '11th–13th Dhul-Hijjah — Ayyam at-Tashreeq',
    icon: Footprints,
    title: 'Return to Mina & complete the Rami',
    body:
      'Pilgrims spend the days of Tashreeq in Mina, and on each day after Dhuhr stone all three Jamarat (small, middle, then large) with seven pebbles each. Those who wish to leave early may depart after the 12th before sunset; the rest complete the 13th — both are permitted in the Sunnah.',
  },
  {
    day: 'Before leaving Makkah',
    icon: Heart,
    title: 'Tawaf al-Wada — the farewell',
    body:
      'The final rite of Hajj is the farewell Tawaf: seven last circuits of the Kaaba before departing Makkah. The Prophet ﷺ commanded that no one leave until their last act is at the House. Pilgrims make their parting duas, hearts full, asking Allah to accept their Hajj and invite them back.',
  },
];

export default function HajjGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Hajj Guide"
        title={<>The rites of Hajj, explained step by step</>}
        lead="Hajj unfolds over roughly five days, each with its own sacred rite. Follow this ordered timeline — from entering Ihram to the farewell Tawaf — to perform every step with knowledge and confidence."
        crumbs={[{ label: 'Hajj', href: '/hajj' }, { label: 'Hajj Guide' }]}
      />

      {/* Intro */}
      <Section>
        <Container size="narrow">
          <Reveal className="text-center">
            <Eyebrow className="mx-auto">Before you begin</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink dark:text-white sm:text-4xl balance">
              Perform Hajj as the <span className="text-gradient">Prophet ﷺ did</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
              In his Farewell Hajj the Prophet Muhammad ﷺ said, <em>“Take your rites of Hajj from me.”</em> Every
              Bangla-speaking muallim who travels with Inter Gulf is trained to walk you through these rites exactly,
              moment by moment. The timeline below shows what to expect on each day so you arrive prepared in heart
              and mind — and our pre-Hajj workshop in Dhaka covers it all in person before you fly.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Timeline */}
      <Section className="bg-sand-soft pt-0">
        <SectionHeading
          eyebrow="The rites in order"
          title={<>Your day-by-day <span className="text-gradient">Hajj journey</span></>}
          lead="Ten clearly explained steps, in the sequence you will perform them."
        />
        <Container size="narrow" className="mt-14">
          <ol className="relative space-y-8 border-l-2 border-brand-600/20 pl-6 sm:pl-8">
            {rites.map((r, i) => (
              <Reveal as="li" key={r.title} delay={(i % 3) * 0.05} className="relative">
                <span className="absolute -left-[2.35rem] grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-emerald sm:-left-[3.1rem]">
                  <r.icon className="h-5 w-5" />
                </span>
                <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                      <CalendarDays className="h-3.5 w-3.5" /> {r.day}
                    </span>
                    <span className="font-display text-sm font-semibold text-gold-600">Step {String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink dark:text-white">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-[0.95rem]">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Note */}
      <Section className="pt-0">
        <Container size="narrow">
          <Reveal className="rounded-3xl border border-gold-400/40 bg-card p-7 shadow-soft sm:p-8">
            <h3 className="font-display text-lg font-semibold text-ink dark:text-white">A note on the types of Hajj</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Most Bangladeshi pilgrims perform <strong>Hajj at-Tamattu‘</strong> — performing Umrah first on arrival,
              releasing from Ihram, then re-entering Ihram for Hajj on the 8th of Dhul-Hijjah (this requires a Qurbani).
              The other forms are <strong>Hajj al-Qiran</strong> (Umrah and Hajj in a single Ihram, with Qurbani) and
              <strong> Hajj al-Ifrad</strong> (Hajj alone, without Qurbani). Your muallim will confirm the correct
              intention for your group and guide you precisely — there is no need to worry about getting it wrong.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title="Travel with a guide who knows every rite"
        lead="Our experienced muallims and pre-Hajj training make sure you perform each step correctly and with peace of mind."
        message="Assalamu alaikum! I have a question about performing the rites of Hajj."
      />
    </>
  );
}
