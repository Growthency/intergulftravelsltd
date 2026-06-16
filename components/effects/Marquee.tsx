import { cn } from '@/lib/utils';

/** Seamless infinite marquee row (used for airline partners). */
export function Marquee({
  items,
  className,
  itemClassName,
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={cn('group relative flex overflow-hidden mask-fade-r', className)}>
      {[0, 1].map((dup) => (
        <div
          key={dup}
          aria-hidden={dup === 1}
          className="flex shrink-0 animate-marquee items-center gap-12 pr-12 group-hover:[animation-play-state:paused]"
        >
          {items.map((item, i) => (
            <span
              key={`${dup}-${i}`}
              className={cn(
                'whitespace-nowrap text-lg font-semibold tracking-tight text-ink-muted/70',
                itemClassName,
              )}
            >
              {item}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
