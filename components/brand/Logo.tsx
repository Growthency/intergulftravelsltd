import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/* Inter Gulf Travels Ltd — official logo mark, shown site-wide. */
const LOGO_SRC = '/branches/inter-gulf-travels.webp';

export function LogoMark({ className, glow = false }: { className?: string; glow?: boolean }) {
  return (
    <span
      className={cn(
        'inline-grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-1.5 ring-1 ring-black/5',
        glow && 'shadow-[0_8px_22px_-6px_rgba(6,64,43,0.45)]',
        className,
      )}
    >
      <Image
        src={LOGO_SRC}
        alt="Inter Gulf Travels Ltd"
        width={44}
        height={44}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

export function Logo({
  className,
  variant = 'dark',
  href = '/',
  withTagline = false,
}: {
  className?: string;
  variant?: 'dark' | 'light';
  href?: string | null;
  withTagline?: boolean;
}) {
  const text = variant === 'light' ? 'text-white' : 'text-ink';
  const sub = variant === 'light' ? 'text-gold-300/90' : 'text-brand-600';

  const inner = (
    <span className={cn('group inline-flex items-center gap-3', className)}>
      <LogoMark glow className="h-11 w-11 transition-transform duration-500 group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span className={cn('whitespace-nowrap font-display text-[1.3rem] font-semibold leading-[1.05] tracking-tight', text)}>
          Inter <span className="text-gradient">Gulf</span>
        </span>
        <span className={cn('mt-0.5 whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.3em]', sub)}>
          Travels Ltd
        </span>
        {withTagline && (
          <span className={cn('mt-1 text-[0.6rem] font-medium tracking-wide', variant === 'light' ? 'text-white/55' : 'text-ink-muted')}>
            Hajj &amp; Umrah · since 2002
          </span>
        )}
      </span>
    </span>
  );

  if (href === null) return inner;
  return (
    <Link href={href} aria-label="Inter Gulf Travels Ltd — home">
      {inner}
    </Link>
  );
}
