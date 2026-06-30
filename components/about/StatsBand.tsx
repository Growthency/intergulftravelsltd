'use client';

import { motion } from 'framer-motion';
import { Counter } from '@/components/ui/Counter';
import { Container } from '@/components/ui/Container';
import { AuroraBackdrop } from '@/components/effects/AuroraBackdrop';
import { revealItem } from '@/components/ui/Reveal';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/about';

type Stat = {
  to: number;
  suffix?: string;
  label: string;
  sub?: string;
};

const statValues = [
  { to: 24, suffix: '+' },
  { to: 12000, suffix: '+' },
  { to: 40, suffix: '+' },
  { to: 100, suffix: '%' },
];

/** Animated emerald statistics band — reused across About pages. */
export function StatsBand() {
  const t = getDict(useLocale());
  const stats: Stat[] = statValues.map((v, i) => ({ ...v, ...t.stats.items[i] }));
  return (
    <section className="relative isolate overflow-hidden bg-brand-900 py-16 text-white sm:py-20">
      <AuroraBackdrop variant="dark" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_50%_0%,#0e7c5a_0%,#06402b_60%,#04261c_100%)]"
      />
      <Container>
        <motion.dl
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 gap-y-10 text-center lg:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={revealItem} className="px-2">
              <dd className="font-display text-4xl font-semibold tracking-tight text-gold-300 sm:text-5xl">
                <Counter to={s.to} suffix={s.suffix} />
              </dd>
              <dt className="mt-2 text-sm font-semibold text-white sm:text-base">{s.label}</dt>
              {s.sub && <p className="mt-1 text-xs text-white/55">{s.sub}</p>}
            </motion.div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
