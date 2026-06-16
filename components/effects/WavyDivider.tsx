import { cn } from '@/lib/utils';

/**
 * Curved ("akabaka") section divider. Place at the top or bottom of a section
 * to get the flowing, non-straight edges the brief asks for.
 */
export function WavyDivider({
  position = 'bottom',
  className,
  fill = 'currentColor',
  variant = 'wave',
}: {
  position?: 'top' | 'bottom';
  className?: string;
  fill?: string;
  variant?: 'wave' | 'curve' | 'tilt';
}) {
  const paths = {
    wave: 'M0,64 C240,128 480,0 720,32 C960,64 1200,128 1440,80 L1440,160 L0,160 Z',
    curve: 'M0,96 C480,160 960,160 1440,96 L1440,160 L0,160 Z',
    tilt: 'M0,160 L1440,32 L1440,160 Z',
  };

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-x-0 z-10 h-[60px] w-full overflow-hidden leading-none sm:h-[90px]',
        position === 'top' ? 'top-0 -translate-y-[1px] rotate-180' : 'bottom-0 translate-y-[1px]',
        className,
      )}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={paths[variant]} fill={fill} />
      </svg>
    </div>
  );
}
