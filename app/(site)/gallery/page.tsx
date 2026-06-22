import type { Metadata } from 'next';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { contact } from '@/lib/site';
import { whatsappLink } from '@/lib/utils';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { getGalleryImages } from '@/lib/gallery';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Moments from the journey — Tawaf at the Holy Kaaba, Masjid an-Nabawi in Madinah, our pilgrims in Mina and Arafah, pre-Hajj training workshops in Dhaka and tours abroad with Inter Gulf Travels Ltd.',
  alternates: { canonical: '/gallery' },
};

export default async function GalleryPage() {
  const images = await getGalleryImages().catch(() => []);
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Moments from <span className="text-gradient-gold">the journey</span>
          </>
        }
        lead="From Tawaf at the Holy Kaaba to training workshops in Dhaka and holidays abroad — a glimpse of the journeys our pilgrims and travellers have shared with us since 2002."
        crumbs={[{ label: 'Gallery' }]}
      />

      <Section className="bg-sand-soft">
        <Container>
          <GalleryGrid extra={images} />
        </Container>
      </Section>

      {/* CTA */}
      <Section className="pt-0">
        <Container>
          <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient px-7 py-14 text-center shadow-emerald sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-10 -top-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-16 right-0 h-72 w-72 rounded-full bg-gold-300/20 blur-3xl" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl balance">
                Picture yourself on this journey
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">
                Every photo here began with a single conversation. Let yours be next — speak to an advisor and
                start planning your Hajj, Umrah or holiday today.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/estimate" variant="gold" size="lg">
                  Get a Free Estimate <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  href={whatsappLink(contact.whatsapp, 'Assalamu alaikum! I would like to plan a journey with Inter Gulf Travels.')}
                  external
                  variant="light"
                  size="lg"
                >
                  <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
