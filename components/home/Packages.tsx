'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Star, ArrowRight } from 'lucide-react';
import { packages } from '@/lib/site';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useDictionary, useLocale } from '@/components/providers/LocaleProvider';
import { localizedPath } from '@/lib/i18n';

export function Packages() {
  const t = useDictionary().home.packages;
  const locale = useLocale();
  const [tab, setTab] = useState<'hajj' | 'umrah'>('hajj');
  const list = packages
    .filter((p) => p.type === tab)
    .map((p) => {
      const tr = t.items.find((it) => it.id === p.id);
      return {
        ...p,
        name: tr?.name ?? p.name,
        badge: tr?.badge ?? p.badge,
        priceNote: tr?.priceNote ?? p.priceNote,
        duration: tr?.duration ?? p.duration,
        highlights: tr?.highlights ?? p.highlights,
      };
    });

  return (
    <Section className="relative overflow-hidden bg-brand-900 text-white">
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-60">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-brand-500/25 blur-[110px]" />
        <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-gold-500/15 blur-[120px]" />
      </div>

      <div className="relative">
        <SectionHeading
          light
          eyebrow={t.eyebrow}
          title={<>{t.titleA}<span className="text-gradient-gold">{t.titleHighlight}</span></>}
          lead={t.lead}
        />

        <Container className="mt-10">
          {/* toggle */}
          <div className="mx-auto mb-10 flex w-fit items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur">
            {(['hajj', 'umrah'] as const).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setTab(tabKey)}
                className={cn(
                  'relative rounded-full px-6 py-2.5 text-sm font-semibold capitalize transition-colors',
                  tab === tabKey ? 'text-brand-900' : 'text-white/70 hover:text-white',
                )}
              >
                {tab === tabKey && (
                  <motion.span
                    layoutId="pkg-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gold-gradient"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                  />
                )}
                {tabKey === 'hajj' ? t.tabHajj : t.tabUmrah}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid gap-6 lg:grid-cols-3"
            >
              {list.map((p) => (
                <div
                  key={p.id}
                  className={cn(
                    'relative flex flex-col rounded-3xl border p-7 transition-all duration-300',
                    p.featured
                      ? 'border-gold-400/50 bg-white/[0.07] shadow-gold lg:-translate-y-3'
                      : 'border-white/12 bg-white/[0.04] hover:border-white/25',
                  )}
                >
                  {p.badge && (
                    <span className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-gold-gradient px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-brand-900">
                      <Star className="h-3 w-3 fill-current" /> {p.badge}
                    </span>
                  )}
                  <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                  <div className="mt-1 flex items-center gap-1.5 text-sm text-white/60">
                    <Clock className="h-3.5 w-3.5" /> {p.duration}
                  </div>
                  <div className="mt-5 flex items-end gap-2">
                    <span className="font-display text-3xl font-semibold text-gold-300">{p.price}</span>
                    <span className="pb-1 text-xs text-white/55">{p.priceNote}</span>
                  </div>
                  <ul className="mt-6 flex-1 space-y-3 border-t border-white/10 pt-5">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm text-white/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> {h}
                      </li>
                    ))}
                  </ul>
                  <Button
                    href={localizedPath(locale, '/estimate')}
                    variant={p.featured ? 'gold' : 'light'}
                    size="md"
                    className="mt-7 w-full"
                  >
                    {t.book} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <p className="mt-8 text-center text-sm text-white/55">
            {t.disclaimer}{' '}
            <a href={localizedPath(locale, '/contact')} className="font-semibold text-gold-300 hover:text-gold-200">
              {t.contactCta}
            </a>
          </p>
        </Container>
      </div>
    </Section>
  );
}
