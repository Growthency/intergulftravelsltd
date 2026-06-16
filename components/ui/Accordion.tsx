'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Accordion({
  items,
  className,
}: {
  items: { q: string; a: React.ReactNode }[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn('divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card', className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-brand-50/50 dark:hover:bg-brand-900/20"
            >
              <span className="font-display text-base font-semibold text-ink dark:text-white sm:text-lg">{item.q}</span>
              <span
                className={cn(
                  'grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition-all duration-300 dark:bg-brand-900/40 dark:text-brand-200',
                  isOpen && 'rotate-45 bg-brand-600 text-white',
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-sm leading-relaxed text-ink-muted sm:text-[0.95rem]">{item.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
