import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Accordion } from '@/components/ui/Accordion';
import { hajjFaqs } from '@/lib/site';
import { CtaBand } from '@/components/hajj-umrah/shared';

export const metadata: Metadata = {
  title: 'Hajj FAQ — Your Questions About Hajj 2026 Answered',
  description:
    'Frequently asked questions about Hajj from Bangladesh: pre-registration, package inclusions, hotel distance, documents, vaccinations, costs, refunds, women travelling without a mahram and more — answered by Inter Gulf Travels Ltd.',
  alternates: { canonical: '/hajj/faq' },
};

const extraFaqs = [
  {
    q: 'How much does Hajj cost from Bangladesh in 2026?',
    a: 'Our 2026 packages start from ৳4,83,000 for Economy, ৳5,95,000 for Standard and ৳8,50,000 for Premium, per person. The difference reflects itinerary length, hotel proximity to the Haram, room occupancy and meal plans. Prices are indicative and may move with airline fares and Saudi government charges — contact us for a precise, current quote.',
  },
  {
    q: 'What is the difference between government and private Hajj?',
    a: 'Government Hajj is managed directly by the Ministry of Religious Affairs at a fixed package, while private Hajj is operated by licensed agencies like us with more flexibility in flights, hotels, itinerary length and service level. As a government-licensed agency (Hajj License No. 071), we offer private packages across every budget with the same official oversight.',
  },
  {
    q: 'Can a woman perform Hajj without a mahram?',
    a: 'Saudi Arabia now allows women to register for Hajj without a mahram, typically by travelling within an organised group. The classical ruling encourages travelling with a mahram, so we advise discussing your situation with us and a trusted scholar. We arrange women’s groups with dedicated support and assistance throughout.',
  },
  {
    q: 'Is Hajj suitable for elderly pilgrims?',
    a: 'Yes — we welcome elderly pilgrims and arrange wheelchair assistance, hotels closer to the Haram, slower-paced Ziyarat and dedicated support. We do recommend a medical check-up beforehand, and our Standard and Premium packages, with shorter itineraries and closer hotels, are especially comfortable for older travellers.',
  },
  {
    q: 'What happens if I need to cancel or change my booking?',
    a: 'Cancellation terms depend on how far the booking has progressed — visa issuance, ticketing and hotel reservations carry costs that may be non-refundable once confirmed. We always explain the policy clearly at the time of booking and handle any change as fairly and transparently as possible.',
  },
  {
    q: 'How long is the full Hajj trip from Dhaka?',
    a: 'It depends on your package: Economy runs about 40–42 days, Standard 30–35 days and Premium 21–25 days. Longer trips usually mean more time in Madinah and a lower price; shorter trips are more convenient but cost more.',
  },
  {
    q: 'Do you provide pre-Hajj training?',
    a: 'Yes. Every Inter Gulf pilgrim is invited to a pre-Hajj training workshop in Dhaka where we walk through each rite, the duas, what to pack and what to expect — so you arrive in Makkah prepared and at ease.',
  },
  {
    q: 'Are flights direct, and which airlines do you use?',
    a: 'We operate direct flights wherever possible, primarily on Saudia and Biman Bangladesh Airlines, with the best available routings to Jeddah or Madinah. Premium packages are scheduled for the most convenient timings and shortest travel.',
  },
];

export default function HajjFaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ of Hajj"
        title={<>Your Hajj questions, honestly answered</>}
        lead="Performing Hajj is a major decision and you deserve clear answers. Here are the questions Bangladeshi pilgrims ask us most — and if yours isn’t here, our advisors are a phone call away."
        crumbs={[{ label: 'Hajj', href: '/hajj' }, { label: 'FAQ of Hajj' }]}
      />

      <Section>
        <Container size="narrow">
          <Reveal className="text-center">
            <Eyebrow className="mx-auto">Common questions</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink dark:text-white sm:text-4xl balance">
              Everything you want to know about <span className="text-gradient">your Hajj</span>
            </h2>
          </Reveal>

          <Reveal className="mt-12">
            <h3 className="mb-4 font-display text-lg font-semibold text-ink dark:text-white">Booking & packages</h3>
            <Accordion items={hajjFaqs} />
          </Reveal>

          <Reveal className="mt-10">
            <h3 className="mb-4 font-display text-lg font-semibold text-ink dark:text-white">More questions, answered</h3>
            <Accordion items={extraFaqs} />
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title="Still have a question?"
        lead="Our Hajj advisors are happy to help with anything not covered here — call, message or visit our Purana Paltan office for a free consultation."
        message="Assalamu alaikum! I have a question about Hajj that isn’t on your FAQ."
      />
    </>
  );
}
