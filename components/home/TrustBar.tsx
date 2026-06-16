import { partners } from '@/lib/site';
import { Marquee } from '@/components/effects/Marquee';
import { Container } from '@/components/ui/Container';

export function TrustBar() {
  return (
    <div className="border-y border-border bg-card/60 py-10">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
          Booking the world&apos;s leading airlines for you
        </p>
        <div className="mt-7">
          <Marquee items={partners} />
        </div>
      </Container>
    </div>
  );
}
