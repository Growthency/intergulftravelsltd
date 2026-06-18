import type { Metadata } from 'next';
import { ArrowRight, MessageCircle, PlayCircle } from 'lucide-react';
import { contact } from '@/lib/site';
import { whatsappLink } from '@/lib/utils';
import { getVideos } from '@/lib/videos';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { VideoGallery } from '@/components/videos/VideoGallery';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Our Videos',
  description:
    'Watch our Hajj and Umrah guidance videos — step-by-step rituals, pilgrim experiences, travel tips and answers to the questions we hear most, from the team at Inter Gulf Travels Ltd.',
  alternates: { canonical: '/videos' },
};

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <>
      <PageHero
        eyebrow="Watch"
        title={
          <>
            Our <span className="text-gradient-gold">Videos</span>
          </>
        }
        lead="Clear, practical guidance for your sacred journey — from how each rite of Hajj and Umrah is performed to the experiences of pilgrims who travelled with us. Watch, learn and prepare with confidence."
        crumbs={[{ label: 'Videos' }]}
      />

      <Section className="bg-sand-soft">
        <Container size="wide">
          {videos.length === 0 ? (
            <Reveal className="mx-auto max-w-xl rounded-3xl border border-dashed border-brand-600/25 bg-card px-6 py-16 text-center shadow-soft">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <PlayCircle className="h-8 w-8" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold text-ink">Videos coming soon</h2>
              <p className="mx-auto mt-3 max-w-md text-base text-ink-muted">
                We are putting together a library of Hajj and Umrah guidance videos to help you prepare for
                every step of your journey. Check back shortly — or speak to an advisor in the meantime.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/estimate" variant="primary">
                  Get a Free Estimate <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  href={whatsappLink(
                    contact.whatsapp,
                    'Assalamu alaikum! I have a question about Hajj and Umrah.',
                  )}
                  external
                  variant="outline"
                >
                  <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
                </Button>
              </div>
            </Reveal>
          ) : (
            <VideoGallery videos={videos} />
          )}
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
                Ready to begin your own journey?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">
                Our advisors are here to guide you from your first question to your safe return. Plan your Hajj,
                Umrah or holiday with a team that has served pilgrims since 2002.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/estimate" variant="gold" size="lg">
                  Get a Free Estimate <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  href={whatsappLink(
                    contact.whatsapp,
                    'Assalamu alaikum! I would like to plan a journey with Inter Gulf Travels.',
                  )}
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
