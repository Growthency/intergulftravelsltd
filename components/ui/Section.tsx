import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn('relative py-20 sm:py-24 lg:py-28', className)}>
      {children}
    </section>
  );
}

/** Standard centered section header (eyebrow + heading + lead). */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  light = false,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  light?: boolean;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <Container>
      <Reveal
        className={cn(
          'flex flex-col gap-4',
          align === 'center' ? 'mx-auto max-w-2xl items-center text-center' : 'max-w-2xl items-start text-left',
          className,
        )}
      >
        {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
        <h2
          className={cn(
            'font-display text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.75rem] balance',
            light ? 'text-white' : 'text-ink dark:text-white',
          )}
        >
          {title}
        </h2>
        {lead && (
          <p className={cn('text-base leading-relaxed sm:text-lg balance', light ? 'text-white/70' : 'text-ink-muted')}>
            {lead}
          </p>
        )}
      </Reveal>
    </Container>
  );
}
