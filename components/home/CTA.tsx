import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { contact } from '@/lib/site';
import { whatsappLink } from '@/lib/utils';

export function CTA() {
  return (
    <section className="relative py-20 sm:py-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient px-7 py-14 text-center shadow-emerald sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-10 -top-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-16 right-0 h-72 w-72 rounded-full bg-gold-300/20 blur-3xl" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(30deg, #fff 1px, transparent 1px), linear-gradient(-30deg, #fff 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl balance">
              Ready to begin your sacred journey?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">
              Speak to a Hajj &amp; Umrah advisor today. Free consultation, honest pricing and a plan
              tailored to you — with no obligation.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/estimate" variant="gold" size="lg">
                Get a Free Estimate <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href={whatsappLink(contact.whatsapp, 'Assalamu alaikum! I would like a free Hajj/Umrah consultation.')}
                external
                variant="light"
                size="lg"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </Button>
            </div>
            <a
              href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white"
            >
              <Phone className="h-4 w-4" /> Or call us directly: {contact.phones[0]}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
