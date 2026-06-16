import type { Metadata } from 'next';
import { Sparkles, Gem, Moon, Scale, HeartHandshake, RefreshCw, Sunrise, Clock } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CtaBand } from '@/components/hajj-umrah/shared';

export const metadata: Metadata = {
  title: 'Benefits of Umrah — The Reward of the Lesser Pilgrimage',
  description:
    'Discover the benefits of Umrah: expiation of sins between two Umrahs, the reward of a Hajj when performed in Ramadan, removal of poverty, answered duas and spiritual renewal — with authentic Qur’an and hadith references.',
  alternates: { canonical: '/umrah/benefit' },
};

const benefits = [
  {
    icon: Sparkles,
    title: 'Expiation Between Two Umrahs',
    body:
      'The Prophet ﷺ said: “Umrah to Umrah is an expiation for the sins committed between them, and an accepted Hajj has no reward but Paradise.” Each Umrah wipes the slate clean of the minor sins since the last.',
    ref: 'Sahih al-Bukhari 1773',
  },
  {
    icon: Moon,
    title: 'Umrah in Ramadan = Hajj',
    body:
      'The Prophet ﷺ told a woman who missed Hajj: “Perform Umrah in Ramadan, for Umrah in it is equal to Hajj,” or in another narration, “a Hajj with me.” There is no more rewarding month to answer the call of the Haram.',
    ref: 'Sahih al-Bukhari 1782',
  },
  {
    icon: Scale,
    title: 'Removes Poverty & Sins',
    body:
      'The Prophet ﷺ said: “Perform Hajj and Umrah consecutively, for they remove poverty and sins as the bellows removes the impurity of iron, gold and silver.” Umrah purifies both wealth and soul.',
    ref: 'Jami‘ at-Tirmidhi 810',
  },
  {
    icon: HeartHandshake,
    title: 'A Guest of Allah, Answered',
    body:
      'The Prophet ﷺ said the pilgrims of Hajj and Umrah are “a delegation to Allah; if they call upon Him He answers them, and if they ask His forgiveness He forgives them.” Your dua at the Haram is precious.',
    ref: 'Sunan Ibn Majah 2893',
  },
  {
    icon: RefreshCw,
    title: 'Spiritual Renewal, Any Time',
    body:
      'Because Umrah may be performed in any month, it offers a recurring opportunity to refresh faith, repent and reconnect with Allah — a spiritual reset whenever the heart needs it most.',
    ref: 'Qur’an 2:196',
  },
  {
    icon: Sunrise,
    title: 'A Visit to the Best of Places',
    body:
      'Umrah brings you to Masjid al-Haram, where a single prayer equals 100,000 prayers elsewhere, and on to Madinah, where a prayer in the Prophet’s Mosque equals a thousand — immense reward in a few blessed days.',
    ref: 'Sunan Ibn Majah 1406',
  },
];

const personal = [
  'A profound sense of peace and nearness to Allah, even on a short trip.',
  'A practical taste of the rites of Hajj, ideal preparation for the greater pilgrimage.',
  'An accessible journey for those unable to commit to the full length of Hajj.',
  'Renewed motivation in prayer, charity and good character on returning home.',
  'A treasured spiritual experience to share with family across generations.',
  'The chance to make heartfelt dua for loved ones at the most blessed of sites.',
];

export default function UmrahBenefitPage() {
  return (
    <>
      <PageHero
        eyebrow="Benefit of Umrah"
        title={<>The lesser pilgrimage, the greater reward</>}
        lead="Though shorter than Hajj, Umrah carries immense blessing — the forgiveness of sins, the reward of Hajj in Ramadan, and a renewal of faith available to you in any month of the year."
        crumbs={[{ label: 'Umrah', href: '/umrah' }, { label: 'Benefit of Umrah' }]}
      />

      {/* Intro */}
      <Section>
        <Container size="narrow">
          <Reveal className="text-center">
            <Eyebrow className="mx-auto">A beloved Sunnah</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink dark:text-white sm:text-4xl balance">
              An act of worship Allah <span className="text-gradient">loves and rewards</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
              Allah ﷻ commands, <em>“And complete the Hajj and Umrah for Allah”</em> (Surah al-Baqarah 2:196). The
              Prophet Muhammad ﷺ performed Umrah four times in his life and encouraged his companions to perform it
              often. Its rewards — established firmly in the Qur’an and Sunnah — reach into both this world and the
              next, and unlike Hajj they are within reach all year round.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Benefits grid */}
      <Section className="bg-sand-soft pt-0">
        <SectionHeading
          eyebrow="Spiritual rewards"
          title={<>Six blessings of <span className="text-gradient">a sincere Umrah</span></>}
          lead="Each rooted in authentic narration — the very reasons the believer longs to stand before the Sacred House."
        />
        <Container className="mt-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 0.06}>
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

      {/* Personal */}
      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Personal benefits</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink dark:text-white sm:text-4xl balance">
              Why so many return <span className="text-gradient">again and again</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              Umrah’s gentle length and year-round availability make it a journey families return to throughout their
              lives — to give thanks, to seek help in hardship, or simply to feel close to Allah once more.
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
                “Umrah to Umrah is an expiation for what is between them.”
              </p>
              <p className="mt-4 text-sm text-white/75">The Prophet Muhammad ﷺ · Bukhari & Muslim</p>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/15 pt-6 text-center">
                <div>
                  <Clock className="mx-auto h-5 w-5 text-gold-300" />
                  <div className="mt-2 text-xs text-white/70">Any month, all year</div>
                </div>
                <div>
                  <Moon className="mx-auto h-5 w-5 text-gold-300" />
                  <div className="mt-2 text-xs text-white/70">Hajj-like reward in Ramadan</div>
                </div>
                <div>
                  <RefreshCw className="mx-auto h-5 w-5 text-gold-300" />
                  <div className="mt-2 text-xs text-white/70">Renew faith again & again</div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title="Earn the rewards of Umrah"
        lead="Let Inter Gulf Travels arrange a smooth, well-guided Umrah so you can devote yourself fully to worship and dua."
        message="Assalamu alaikum! I would like to learn more about performing Umrah."
      />
    </>
  );
}
