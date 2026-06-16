'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type Milestone = {
  year: string;
  title: string;
  body: string;
};

/**
 * Vertical company timeline. A gradient spine runs down the centre (left on
 * mobile) with alternating cards on desktop.
 */
export function Timeline({ items }: { items: Milestone[] }) {
  return (
    <ol className="relative mx-auto max-w-4xl">
      {/* spine */}
      <span
        aria-hidden
        className="absolute left-[22px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-brand-600 via-gold-500 to-brand-600/0 sm:left-1/2 sm:-translate-x-1/2"
      />

      {items.map((item, i) => {
        const isLeft = i % 2 === 0;
        return (
          <motion.li
            key={item.year + item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'relative mb-9 pl-16 last:mb-0 sm:w-1/2 sm:pl-0',
              isLeft ? 'sm:pr-12 sm:text-right' : 'sm:ml-auto sm:pl-12',
            )}
          >
            {/* node */}
            <span
              aria-hidden
              className={cn(
                'absolute top-1.5 grid h-11 w-11 place-items-center rounded-full border border-gold-400/40 bg-brand-gradient font-display text-xs font-bold text-white shadow-emerald',
                'left-0 sm:left-auto',
                isLeft ? 'sm:-right-[22px]' : 'sm:-left-[22px]',
              )}
            >
              {item.year}
            </span>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-colors duration-300 hover:border-gold-400/40">
              <h3 className="font-display text-lg font-semibold text-ink dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
