'use client';

import { useEffect, useId, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Bottom-right scroll-to-top button wrapped in a circular reading-progress
 * ring (the "% scrolled" indicator), inspired by the reference site.
 */
export function ScrollToTop() {
  const id = useId().replace(/:/g, '');
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 450);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Scroll back to top"
      className={cn(
        'fixed bottom-6 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-white/90 text-brand-700 shadow-[0_12px_30px_-10px_rgba(6,64,43,0.55)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:text-brand-900 dark:bg-ink-soft/90 dark:text-brand-300',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <svg viewBox="0 0 56 56" className="absolute inset-0 h-full w-full -rotate-90">
        <defs>
          <linearGradient id={`stt-${id}`} x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0e7c5a" />
            <stop offset="1" stopColor="#c9a24b" />
          </linearGradient>
        </defs>
        <circle cx="28" cy="28" r="25" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="3" />
        <motion.circle
          cx="28"
          cy="28"
          r="25"
          fill="none"
          stroke={`url(#stt-${id})`}
          strokeWidth="3"
          strokeLinecap="round"
          style={{ pathLength }}
        />
      </svg>
      <ArrowUp className="relative h-5 w-5" strokeWidth={2.4} />
    </button>
  );
}
