import type { Metadata } from 'next';
import { Sparkles, HeartHandshake, Users, ShieldCheck, Sunrise, Scale, BookOpen, Gem } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CtaBand } from '@/components/hajj-umrah/shared';

export const metadata: Metadata = {
  title: 'Benefits of Hajj — Why the Fifth Pillar Transforms a Life',
  description:
    'Discover the spiritual and personal benefits of Hajj: forgiveness of sins, the reward of Paradise, the unity of the ummah, renewed taqwa and a fresh beginning — with authentic Qur’an and hadith references.',
  alternates: { canonical: '/hajj/benefit' },
};

const benefits = [
  {
    icon: Sparkles,
    title: 'Complete Forgiveness of Sins',
    body:
      'An accepted Hajj wipes away the sins of a lifetime. The Prophet ﷺ said: “Whoever performs Hajj for the sake of Allah and does not utter any obscene speech or commit any wrongdoing returns [free of sin] as the day his mother bore him.”',
    ref: 'Sahih al-Bukhari 1521',
  },
  {
    icon: Gem,
    title: 'The Reward is Paradise',
    body:
      'No reward is greater. The Prophet ﷺ said: “The reward of an accepted Hajj (Hajj Mabrur) is nothing but Paradise.” It is the highest of deeds a believer can hope to be honoured with.',
    ref: 'Sahih al-Bukhari 1773',
  },
  {
    icon: Users,
    title: 'Unity of the Ummah',
    body:
      'Rich and poor, every race and nation, stand shoulder to shoulder in identical Ihram. Hajj dissolves status and pride, teaching that before Allah all people are equal — a living lesson in brotherhood.',
    ref: 'Qur’an 49:13',
  },
  {
    icon: Sunrise,
    title: 'A Fresh, New Beginning',
    body:
      'Pilgrims return spiritually reborn, the slate wiped clean. Hajj marks a turning point — a chance to leave old habits behind and rebuild life upon sincerity, gratitude and obedience to Allah.',
    ref: 'A renewed soul',
  },
  {
    icon: HeartHandshake,
    title: 'Answered Supplications',
    body:
      'The pilgrim is a guest of Allah whose dua is not turned away. The Prophet ﷺ said the people of Hajj and Umrah are “a delegation to Allah; if they ask Him, He gives them, and if they seek His forgiveness, He forgives them.”',
    ref: 'Sunan Ibn Majah 2892',
  },
  {
    icon: Scale,
    title: 'Removal of Poverty & Sins',
    body:
      'The Prophet ﷺ said: “Perform Hajj and Umrah consecutively, for they remove poverty and sins as the bellows removes the impurity of iron, gold and silver.” Hajj purifies both the soul and the provision.',
    ref: 'Jami‘ at-Tirmidhi 810',
  },
  {
    icon: ShieldCheck,
    title: 'Strengthened Taqwa & Patience',
    body:
      'The crowds, the heat and the effort of the rites school the heart in patience, discipline and God-consciousness. The pilgrim returns with a resilience and humility that reshapes daily life.',
    ref: 'Qur’an 2:197',
  },
  {
    icon: BookOpen,
    title: 'Reviving the Sunnah of Ibrahim',
    body:
      'Every rite — the Sa‘i, the standing at Arafah, the sacrifice, the stoning — retraces the obedience of Ibrahim, Hajar and Isma‘il (peace be upon them), connecting the pilgrim to a legacy of submission millennia deep.',
    ref: 'Qur’an 22:27',
  },
];

const personal = [
  'A profound, unmatched sense of inner peace and closeness to Allah.',
  'Freedom from the grip of worldly anxiety and the love of material things.',
  'Renewed appreciation for life’s blessings, health and family on returning home.',
  'Deeper empathy after living simply alongside millions of fellow believers.',
  'Lifelong friendships and bonds formed with pilgrims from across the world.',
  'A clearer life purpose and stronger resolve to keep to prayer and good deeds.',
];

export default function HajjBenefitPage() {
  return (
    <>
      <PageHero
        eyebrow="Benefit of Hajj"
        title={<>Why a single Hajj can transform an entire life</>}
        lead="Hajj is not merely a journey of distance but a journey of the heart. Its rewards — forgiveness, Paradise, renewed faith and a purified soul — are unlike anything else in this world."
        crumbs={[{ label: 'Hajj', href: '/hajj' }, { label: 'Benefit of Hajj' }]}
      />

      {/* Intro */}
      <Section>
        <Container size="narrow">
          <Reveal className="text-center">
            <Eyebrow className="mx-auto">The reward of a lifetime</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink dark:text-white sm:text-4xl balance">
              A pillar of Islam, and a <span className="text-gradient">mercy from Allah</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
              Allah ﷻ promises in the Qur’an that the rewards of pilgrimage reach far beyond the days spent in Makkah:
              <em> “…that they may witness benefits for themselves and mention the name of Allah on known days…”</em>
              (Surah al-Hajj 22:28). Those benefits are both of this world and the next — drawing nearer to the
              Creator, joining the global ummah, and returning home with a heart made new. Below are the most
              treasured of them, each rooted in the Qur’an and the authentic Sunnah.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Spiritual benefits grid */}
      <Section className="bg-sand-soft pt-0">
        <SectionHeading
          eyebrow="Spiritual rewards"
          title={<>Eight blessings the pilgrim <span className="text-gradient">carries home</span></>}
          lead="Each of these rewards is established in revelation — the very reason the believer’s heart yearns for the Sacred House."
        />
        <Container className="mt-14">
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 0.08}>
                <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                    <b.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink dark:text-white">{b.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{b.body}</p>
                  <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                    {b.ref}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Personal benefits */}
      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Personal transformation</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink dark:text-white sm:text-4xl balance">
              The change pilgrims feel <span className="text-gradient">long after returning</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              Ask anyone who has stood at Arafah and they will tell you the same: Hajj reorders your priorities. The
              quiet that settles over the heart, the gratitude for simple blessings, the resolve to live better — these
              gifts travel home with you and stay for years.
            </p>
            <ul className="mt-7 space-y-3">
              {personal.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-gradient text-white">
                    <Sparkles className="h-3 w-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-gold-400/40 bg-brand-gradient p-8 text-white shadow-emerald sm:p-10">
              <div className="pointer-events-none absolute -left-10 -bottom-10 h-44 w-44 rounded-full bg-gold-300/20 blur-3xl" />
              <Gem className="h-9 w-9 text-gold-300" />
              <p className="mt-5 font-display text-xl italic leading-relaxed">
                “And proclaim to the people the Hajj; they will come to you on foot and on every lean camel; they will
                come from every distant pass.”
              </p>
              <p className="mt-4 text-sm text-white/75">Surah al-Hajj 22:27</p>
              <p className="mt-6 border-t border-white/15 pt-6 text-sm leading-relaxed text-white/80">
                This call, given to Ibrahim عليه السلام, still echoes today. When you answer it, you join a procession
                of believers stretching back across four thousand years — and step into the mercy and forgiveness Allah
                reserves for His guests.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title="Answer the call of a lifetime"
        lead="Let Inter Gulf Travels help you earn these rewards with a journey that is comfortable, well-guided and entirely in keeping with the Sunnah."
        message="Assalamu alaikum! I would like to learn more about performing Hajj."
      />
    </>
  );
}
