import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

const lead = {
  src: '/gallery/pilgrims-haram.webp',
  caption: 'Our pilgrims before the Holy Kaaba',
};
const side = [
  { src: '/gallery/group-haram.webp', caption: 'Inter Gulf Hajj group, Makkah' },
  { src: '/gallery/office-handover.webp', caption: 'Handing over documents · Dhaka office' },
];

export function Moments() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Gallery"
        title={<>Moments from the <span className="text-gradient">journeys we&apos;ve shared</span></>}
        lead="Real pilgrims, real smiles — a glimpse of the families we have had the honour to serve."
      />
      <Container className="mt-12">
        <div className="grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <figure className="group relative h-72 overflow-hidden rounded-3xl border border-border shadow-soft sm:h-96 lg:h-[26.5rem]">
              <Image
                src={lead.src}
                alt={lead.caption}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-6 pt-16">
                <figcaption className="font-display text-xl font-semibold text-white drop-shadow">{lead.caption}</figcaption>
              </div>
            </figure>
          </Reveal>

          <div className="grid gap-5">
            {side.map((s, i) => (
              <Reveal key={s.src} delay={0.1 * (i + 1)}>
                <figure className="group relative h-48 overflow-hidden rounded-3xl border border-border shadow-soft sm:h-60 lg:h-[12.75rem]">
                  <Image
                    src={s.src}
                    alt={s.caption}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 pt-12">
                    <figcaption className="text-sm font-semibold text-white drop-shadow">{s.caption}</figcaption>
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button href="/gallery" variant="outline" size="md">
            View full gallery <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </Section>
  );
}
