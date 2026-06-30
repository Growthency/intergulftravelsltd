import Image from 'next/image';
import { Plane, BedDouble } from 'lucide-react';
import { getAffiliations, type Affiliation } from '@/lib/affiliations';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { getLocale } from '@/lib/i18n-server';
import { getDictionary } from '@/lib/dictionaries';

/* ------------------------------------------------------------------ *
 *  Our Affiliations — public home section.
 *  Reads active partners (flight + hotel) via getAffiliations(), which
 *  gracefully falls back to names-only when the DB is not yet seeded.
 *  Renders logos inside clean white cards, or an elegant typographic
 *  card when a partner has no logo uploaded yet.
 * ------------------------------------------------------------------ */

/** Initials used in the typographic fallback card (max two letters). */
function initials(name: string) {
  const words = name.replace(/[^\p{L}\p{N}\s]/gu, ' ').trim().split(/\s+/);
  const letters = words.slice(0, 2).map((w) => w[0] ?? '');
  return letters.join('').toUpperCase() || name.slice(0, 2).toUpperCase();
}

function PartnerCard({ partner, index, visitLabel }: { partner: Affiliation; index: number; visitLabel: string }) {
  const inner = (
    <div className="group flex h-28 w-full items-center justify-center rounded-2xl border border-border bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/40 hover:shadow-gold sm:h-32 dark:bg-white">
      {partner.logo_url ? (
        <div className="relative h-full w-full">
          <Image
            src={partner.logo_url}
            alt={partner.name}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
            className="object-contain grayscale transition duration-500 group-hover:grayscale-0"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 font-display text-sm font-bold tracking-tight text-brand-700 ring-1 ring-inset ring-brand-600/15">
            {initials(partner.name)}
          </span>
          <span className="font-display text-sm font-semibold leading-snug text-ink balance">
            {partner.name}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <Reveal as="div" delay={Math.min(index * 0.05, 0.4)}>
      {partner.website_url ? (
        <a
          href={partner.website_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${visitLabel} ${partner.name}`}
          className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40 focus-visible:ring-offset-2"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </Reveal>
  );
}

function PartnerBlock({
  icon,
  title,
  subtitle,
  partners,
  visitLabel,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  partners: Affiliation[];
  visitLabel: string;
}) {
  if (partners.length === 0) return null;

  return (
    <div>
      <Reveal className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-600/15 dark:bg-brand-900/40 dark:text-gold-300">
          {icon}
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold text-ink dark:text-white sm:text-xl">
            {title}
          </h3>
          <p className="text-sm text-ink-muted">{subtitle}</p>
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {partners.map((partner, i) => (
          <PartnerCard key={partner.id} partner={partner} index={i} visitLabel={visitLabel} />
        ))}
      </div>
    </div>
  );
}

export async function Affiliations() {
  const t = getDictionary(getLocale()).home.affiliations;
  const affiliations = await getAffiliations();
  const flight = affiliations.filter((a) => a.category === 'flight');
  const hotel = affiliations.filter((a) => a.category === 'hotel');

  if (flight.length === 0 && hotel.length === 0) return null;

  return (
    <Section className="relative overflow-hidden bg-muted/40">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={
          <>
            {t.titleA}<span className="text-gradient">{t.titleHighlight}</span>
          </>
        }
        lead={t.lead}
      />

      <Container className="mt-14 space-y-14">
        <PartnerBlock
          icon={<Plane className="h-6 w-6" />}
          title={t.flightTitle}
          subtitle={t.flightSubtitle}
          partners={flight}
          visitLabel={t.visit}
        />
        <PartnerBlock
          icon={<BedDouble className="h-6 w-6" />}
          title={t.hotelTitle}
          subtitle={t.hotelSubtitle}
          partners={hotel}
          visitLabel={t.visit}
        />
      </Container>
    </Section>
  );
}
