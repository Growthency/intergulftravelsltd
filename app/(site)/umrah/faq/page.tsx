import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Accordion } from '@/components/ui/Accordion';
import { umrahFaqs } from '@/lib/site';
import { CtaBand } from '@/components/hajj-umrah/shared';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Umrah FAQ — Your Questions About Umrah Answered',
  description:
    'Frequently asked questions about Umrah from Bangladesh: visa timing, cost, best time to travel, how long Umrah takes, travelling with children or elders, women without a mahram, Madinah visits and more — answered by Inter Gulf Travels Ltd.',
  alternates: { canonical: '/umrah/faq' },
};

const extraFaqs = [
  {
    q: 'How much does Umrah cost from Bangladesh?',
    a: 'Our Umrah packages start from ৳1,15,000 for Economy, ৳1,55,000 for Family and ৳1,85,000 for Premium, per person. Prices vary with the season — Ramadan and winter are busier and cost more — as well as airline fares and hotel choice. Contact us for a precise, current quote based on your dates.',
  },
  {
    q: 'How long does an Umrah trip take?',
    a: 'The rites of Umrah themselves take only a few hours, but most packages run 10 to 21 days to include time for worship in Makkah and a visit to Madinah. We can also arrange shorter or longer stays to suit your schedule.',
  },
  {
    q: 'When is the best time to perform Umrah?',
    a: 'Umrah in Ramadan carries the greatest reward — equal to a Hajj — but is the busiest and most expensive. Winter (November–February) offers pleasant weather, while off-peak months mean a quieter Haram and the best prices. We help you choose what fits your goals and budget.',
  },
  {
    q: 'Can I take children on Umrah?',
    a: 'Yes. Children are welcome and our Family package is designed with connecting rooms, flexible pacing and support for younger travellers. Umrah is a beautiful experience to share with the whole family.',
  },
  {
    q: 'Do I need to visit Madinah as part of Umrah?',
    a: 'Visiting Madinah is not one of the rites of Umrah, but it is a beloved and highly rewarding part of the journey — to pray in the Prophet’s Mosque and send salam upon him ﷺ. Our packages include guided Ziyarat in Madinah for this reason.',
  },
  {
    q: 'Can women perform Umrah without a mahram?',
    a: 'Saudi Arabia currently permits women to perform Umrah without a mahram, typically as part of an organised group. As the classical ruling encourages travelling with a mahram, we suggest discussing your circumstances with us and a trusted scholar. We arrange women’s groups with dedicated assistance throughout.',
  },
  {
    q: 'Is the Umrah visa difficult to obtain?',
    a: 'Not at all. With the Saudi e-visa system, obtaining an Umrah visa is straightforward. You provide your passport and a photograph and we process the entire application — it is typically issued within a few working days, with fast-track processing on our premium plans.',
  },
  {
    q: 'What support do I have while in Saudi Arabia?',
    a: 'Every Inter Gulf group has a Bangla-speaking guide and access to our 24/7 on-ground support team in Saudi Arabia. Whether it is a question about the rites, a transport detail or any need that arises, help is always a phone call away.',
  },
];

export default function UmrahFaqPage() {
  return (
    <>
      <JsonLd data={faqSchema([...umrahFaqs, ...extraFaqs])} />
      <PageHero
        eyebrow="FAQ of Umrah"
        title={<>Your Umrah questions, honestly answered</>}
        lead="Planning an Umrah and want clear answers first? Here are the questions Bangladeshi pilgrims ask us most about cost, timing, visas and travel — and our advisors are always happy to help with more."
        crumbs={[{ label: 'Umrah', href: '/umrah' }, { label: 'FAQ of Umrah' }]}
      />

      <Section>
        <Container size="narrow">
          <Reveal className="text-center">
            <Eyebrow className="mx-auto">Common questions</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink dark:text-white sm:text-4xl balance">
              Everything you want to know about <span className="text-gradient">your Umrah</span>
            </h2>
          </Reveal>

          <Reveal className="mt-12">
            <h3 className="mb-4 font-display text-lg font-semibold text-ink dark:text-white">Booking & travel</h3>
            <Accordion items={umrahFaqs} />
          </Reveal>

          <Reveal className="mt-10">
            <h3 className="mb-4 font-display text-lg font-semibold text-ink dark:text-white">More questions, answered</h3>
            <Accordion items={extraFaqs} />
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title="Still have a question?"
        lead="Our Umrah advisors are happy to help with anything not covered here — call, message or visit our Purana Paltan office for a free consultation."
        message="Assalamu alaikum! I have a question about Umrah that isn’t on your FAQ."
      />
    </>
  );
}
