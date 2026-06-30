import { partners } from '@/lib/site';
import { Marquee } from '@/components/effects/Marquee';
import { Container } from '@/components/ui/Container';
import { getLocale } from '@/lib/i18n-server';
import { getDictionary } from '@/lib/dictionaries';

export function TrustBar() {
  const t = getDictionary(getLocale());
  return (
    <div className="border-y border-border bg-card/60 py-10">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
          {t.home.trustBar}
        </p>
        <div className="mt-7">
          <Marquee items={partners} />
        </div>
      </Container>
    </div>
  );
}
