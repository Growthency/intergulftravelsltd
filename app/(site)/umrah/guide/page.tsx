import type { Metadata } from 'next';
import { Shirt, RefreshCw, Footprints, Scissors, MapPin, CheckCircle2 } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CtaBand } from '@/components/hajj-umrah/shared';

export const metadata: Metadata = {
  title: 'Umrah Guide — How to Perform Umrah Step by Step',
  description:
    'A clear, step-by-step guide to performing Umrah correctly: entering Ihram at the Miqat, the Talbiyah, Tawaf around the Kaaba, Sa‘i between Safa and Marwah, and Halq or Taqsir — exactly as the Prophet ﷺ taught.',
  alternates: { canonical: '/umrah/guide' },
};

const rites = [
  {
    icon: Shirt,
    title: 'Enter Ihram & make the intention',
    body:
      'Before reaching the Miqat (the appointed boundary), perform ghusl, apply unscented care, and put on Ihram — two white unstitched cloths for men, modest dress for women. At the Miqat, make the intention for Umrah: “Allahumma labbaika ‘Umrah,” and begin the Talbiyah. From here the rules of Ihram apply: no cutting hair or nails, no perfume, no marital relations, no arguing or harming any living thing.',
    detail: 'Recite abundantly: “Labbaik Allahumma labbaik, labbaika laa shareeka laka labbaik…”',
  },
  {
    icon: MapPin,
    title: 'Arrive at Masjid al-Haram',
    body:
      'Enter the Sacred Mosque with the right foot, reciting the dua of entering the masjid. Upon seeing the Kaaba for the first time, raise your hands and make sincere dua — it is a moment when supplications are answered. Men stop reciting the Talbiyah as they begin Tawaf.',
    detail: 'Maintain wudu — it is required for Tawaf, just as it is for prayer.',
  },
  {
    icon: RefreshCw,
    title: 'Perform Tawaf (seven circuits)',
    body:
      'Circle the Kaaba seven times anti-clockwise, beginning and ending at the Black Stone (al-Hajar al-Aswad), pointing to it and saying “Allahu Akbar” each round. Men perform Raml (brisk walking) in the first three circuits and Idtiba (uncovering the right shoulder) throughout. Make dua freely; between the Yemeni Corner and the Black Stone, recite “Rabbana atina fid-dunya hasanah…”.',
    detail: 'After Tawaf, pray two rak‘ahs behind Maqam Ibrahim if possible, then drink Zamzam water.',
  },
  {
    icon: Footprints,
    title: 'Perform Sa‘i (Safa to Marwah)',
    body:
      'Proceed to Mount Safa, recite the verse “Indeed Safa and Marwah are among the symbols of Allah…”, face the Kaaba and make dua. Walk to Marwah — that is one circuit — and continue until you complete seven, ending at Marwah. Men jog lightly between the two green markers. Make dua and dhikr throughout; this re-enacts Hajar’s search for water for her son Isma‘il.',
    detail: 'Safa → Marwah counts as one. Seven trips end at Marwah.',
  },
  {
    icon: Scissors,
    title: 'Halq or Taqsir — exit Ihram',
    body:
      'Finally, men shave the head completely (halq — the more rewarded) or trim the hair evenly (taqsir); women trim a fingertip’s length from the end of their hair. With this, your Umrah is complete and the restrictions of Ihram are fully lifted. You may now change into ordinary clothes.',
    detail: 'Your Umrah is accepted, in sha’ Allah — make dua that Allah accepts it and invites you back.',
  },
];

export default function UmrahGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Umrah Guide"
        title={<>How to perform Umrah, step by step</>}
        lead="Umrah is performed in four simple, beautiful rites. Follow this ordered guide — from entering Ihram to Halq — to complete your Umrah correctly, exactly as the Prophet ﷺ taught his companions."
        crumbs={[{ label: 'Umrah', href: '/umrah' }, { label: 'Umrah Guide' }]}
      />

      {/* Intro */}
      <Section>
        <Container size="narrow">
          <Reveal className="text-center">
            <Eyebrow className="mx-auto">Before you begin</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink dark:text-white sm:text-4xl balance">
              Four rites, performed <span className="text-gradient">with the heart</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
              The whole of Umrah rests on four pillars and acts: entering Ihram, Tawaf, Sa‘i, and Halq or Taqsir. Most
              pilgrims complete them in a few hours. Every Inter Gulf guide stays beside you through each step — and our
              advisors brief you fully before you travel — so you can focus entirely on your worship and dua, without
              any worry about getting a detail wrong.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Steps */}
      <Section className="bg-sand-soft pt-0">
        <SectionHeading
          eyebrow="The rites in order"
          title={<>Your step-by-step <span className="text-gradient">Umrah</span></>}
          lead="Five clearly explained steps, in the exact sequence you will perform them."
        />
        <Container size="narrow" className="mt-14">
          <ol className="relative space-y-8 border-l-2 border-brand-600/20 pl-6 sm:pl-8">
            {rites.map((r, i) => (
              <Reveal as="li" key={r.title} delay={(i % 3) * 0.05} className="relative">
                <span className="absolute -left-[2.35rem] grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-emerald sm:-left-[3.1rem]">
                  <r.icon className="h-5 w-5" />
                </span>
                <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-7">
                  <span className="font-display text-sm font-semibold text-gold-600">Step {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-1.5 font-display text-xl font-semibold text-ink dark:text-white">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-[0.95rem]">{r.body}</p>
                  <p className="mt-4 flex items-start gap-2 rounded-2xl bg-brand-50/70 p-3 text-xs leading-relaxed text-brand-800 dark:bg-brand-900/30 dark:text-brand-200">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> {r.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* After Umrah note */}
      <Section className="pt-0">
        <Container size="narrow">
          <Reveal className="rounded-3xl border border-gold-400/40 bg-card p-7 shadow-soft sm:p-8">
            <h3 className="font-display text-lg font-semibold text-ink dark:text-white">After your Umrah</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Spend your remaining days in worship — pray in the Haram, make abundant dua, recite Qur’an and give in
              charity. Most pilgrims also travel to Madinah to visit the Prophet’s Mosque (Masjid an-Nabawi), where a
              prayer is worth a thousand elsewhere, and to send salam upon the Prophet ﷺ. While the visit to Madinah is
              not part of Umrah itself, it is a beloved and deeply rewarding part of the journey, and our packages
              include guided Ziyarat there.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title="Perform Umrah with a guide at your side"
        lead="Our Bangla-speaking guides and clear pre-departure briefing ensure you perform every rite correctly and with peace of mind."
        message="Assalamu alaikum! I have a question about performing Umrah."
      />
    </>
  );
}
