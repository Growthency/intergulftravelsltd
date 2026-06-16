'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Living, parallaxing gradient backdrop. Soft emerald + gold blobs drift and
 * react to scroll, with a faint grid + grain on top — this is what makes every
 * section feel like "something is moving" behind the content.
 */
export function AuroraBackdrop({
  className,
  variant = 'light',
  grid = true,
}: {
  className?: string;
  variant?: 'light' | 'dark';
  grid?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ['-12%', '14%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['10%', '-16%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['-6%', '20%']);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
    >
      <motion.span
        style={{ y: y1 }}
        className="absolute -left-24 top-[-8%] h-[42vh] w-[42vh] rounded-full bg-brand-500/30 blur-[90px] animate-float-slow"
      />
      <motion.span
        style={{ y: y2 }}
        className="absolute right-[-6%] top-[12%] h-[38vh] w-[38vh] rounded-full bg-gold-400/25 blur-[100px] animate-float"
      />
      <motion.span
        style={{ y: y3 }}
        className="absolute bottom-[-12%] left-1/3 h-[46vh] w-[46vh] rounded-full bg-brand-700/25 blur-[110px] animate-float-slow"
      />
      {grid && (
        <div
          className={cn(
            'absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,#000_30%,transparent_100%)]',
            variant === 'dark' ? 'opacity-[0.08]' : 'opacity-[0.05]',
          )}
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '54px 54px',
            color: variant === 'dark' ? '#e7c97a' : '#06402b',
          }}
        />
      )}
    </div>
  );
}

/** Generic parallax wrapper — translate any element on scroll. */
export function Parallax({
  children,
  speed = 40,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
