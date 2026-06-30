import { Check, Clock, Star, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { contact, type Pkg } from '@/lib/site';
import { whatsappLink, cn } from '@/lib/utils';
import { getLocale } from '@/lib/i18n-server';
import { getDictionary } from '@/lib/dictionaries';
import { localizedPath } from '@/lib/i18n';

/* ------------------------------------------------------------------ *
 *  Shared building blocks for the Hajj & Umrah section pages.
 *  Server components only — keeps every page light and consistent.
 * ------------------------------------------------------------------ */

/** A single pricing / package card, matched to the brand light surface. */
export function PackageCard({ pkg }: { pkg: Pkg }) {
  const locale = getLocale();
  const pk = getDictionary(locale).home.packages;
  // Reuse the translated package copy (keyed by id); fall back to the raw data.
  const tr = pk.items.find((i) => i.id === pkg.id);
  const name = tr?.name ?? pkg.name;
  const duration = tr?.duration ?? pkg.duration;
  const priceNote = tr?.priceNote ?? pkg.priceNote;
  const highlights = tr?.highlights ?? pkg.highlights;
  const badge = tr?.badge ?? pkg.badge;

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-3xl border p-7 transition-all duration-300',
        pkg.featured
          ? 'border-gold-400/60 bg-card shadow-gold lg:-translate-y-2'
          : 'border-border bg-card shadow-soft hover:-translate-y-1 hover:shadow-emerald',
      )}
    >
      {badge && (
        <span className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-gold-gradient px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-brand-900">
          <Star className="h-3 w-3 fill-current" /> {badge}
        </span>
      )}
      <h3 className="font-display text-xl font-semibold text-ink dark:text-white">{name}</h3>
      {duration && (
        <div className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
          <Clock className="h-3.5 w-3.5" /> {duration}
        </div>
      )}
      <div className="mt-5 flex items-end gap-2">
        <span className="font-display text-3xl font-semibold text-gradient">{pkg.price}</span>
        <span className="pb-1 text-xs text-ink-muted">{priceNote}</span>
      </div>
      <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-5">
        {highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-sm text-ink-muted">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {h}
          </li>
        ))}
      </ul>
      <Button
        href={localizedPath(locale, '/estimate')}
        variant={pkg.featured ? 'gold' : 'primary'}
        size="md"
        className="mt-7 w-full"
      >
        {pk.book} <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

/** Reusable closing CTA band used at the foot of every page. */
export function CtaBand({
  title,
  lead,
  message,
}: {
  title?: string;
  lead?: string;
  message?: string;
}) {
  const locale = getLocale();
  const c = getDictionary(locale).home.cta;
  const finalTitle = title ?? c.title;
  const finalLead = lead ?? c.lead;
  const finalMessage = message ?? c.whatsappMsg;

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
                backgroundImage:
                  'linear-gradient(30deg, #fff 1px, transparent 1px), linear-gradient(-30deg, #fff 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl balance">
              {finalTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">{finalLead}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={localizedPath(locale, '/estimate')} variant="gold" size="lg">
                {c.getEstimate} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={whatsappLink(contact.whatsapp, finalMessage)} external variant="light" size="lg">
                <MessageCircle className="h-4 w-4" /> {c.whatsapp}
              </Button>
            </div>
            <a
              href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white"
            >
              <Phone className="h-4 w-4" /> {c.callDirect} {contact.phones[0]}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** A compact link card pointing to a sibling Hajj/Umrah sub-page. */
export function NavLinkCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  const locale = getLocale();
  return (
    <a
      href={localizedPath(locale, href)}
      className="group flex flex-col gap-2 rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/40 hover:shadow-emerald"
    >
      <h3 className="flex items-center justify-between font-display text-lg font-semibold text-ink dark:text-white">
        {title}
        <ArrowRight className="h-4 w-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-1" />
      </h3>
      <p className="text-sm leading-relaxed text-ink-muted">{description}</p>
    </a>
  );
}
