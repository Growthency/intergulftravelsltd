'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { revealItem } from '@/components/ui/Reveal';
import { useDictionary, useLocale } from '@/components/providers/LocaleProvider';
import { localizedPath } from '@/lib/i18n';

const SERVICE_ICON: Record<string, string> = {
  hajj: 'kaaba',
  umrah: 'moon',
  visa: 'passport',
  'air-ticket': 'plane',
  'hotel-booking': 'building',
  tour: 'globe',
};

export function Services() {
  const sv = useDictionary().home.services;
  const locale = useLocale();
  return (
    <Section id="services" className="bg-sand-soft">
      <SectionHeading
        eyebrow={sv.eyebrow}
        title={<>{sv.titleA}<span className="text-gradient">{sv.titleHighlight}</span>{sv.titleB}</>}
        lead={sv.lead}
      />

      <Container className="mt-14">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {sv.items.map((s) => (
            <motion.div key={s.slug} variants={revealItem}>
              <Link
                href={localizedPath(locale, s.slug === 'hajj' || s.slug === 'umrah' ? `/${s.slug}` : `/services/${s.slug}`)}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/30 hover:shadow-emerald"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/0 blur-2xl transition-all duration-500 group-hover:bg-brand-500/15" />
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient text-white shadow-emerald transition-transform duration-300 group-hover:scale-105">
                    <Icon name={SERVICE_ICON[s.slug] ?? 'kaaba'} className="h-7 w-7" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-ink dark:text-white">{s.title}</h3>
                <p className="mt-1 text-sm font-medium text-gold-600">{s.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{s.description}</p>
                <ul className="mt-5 space-y-2 border-t border-border pt-5">
                  {s.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink/80 dark:text-white/80">
                      <Check className="h-4 w-4 shrink-0 text-brand-600" /> {f}
                    </li>
                  ))}
                </ul>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
