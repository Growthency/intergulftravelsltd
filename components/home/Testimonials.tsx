'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { useDictionary } from '@/components/providers/LocaleProvider';

export function Testimonials() {
  const t = useDictionary().home.testimonials;
  const testimonials = t.items;
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);
  const tr = testimonials[index];

  return (
    <Section className="bg-sand-soft">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={<>{t.titleA}<span className="text-gradient">{t.titleHighlight}</span></>}
        lead={t.lead}
      />

      <Container size="narrow" className="mt-12">
        <div className="relative rounded-[2rem] border border-border bg-card p-8 shadow-soft sm:p-12">
          <Quote className="absolute -top-5 left-8 h-12 w-12 text-gold-400/40" />
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-1 text-gold-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="mt-5 font-display text-xl leading-relaxed text-ink dark:text-white sm:text-2xl balance">
                “{tr.quote}”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-gradient font-display text-lg font-semibold text-white">
                  {tr.name.charAt(0)}
                </span>
                <div>
                  <div className="font-semibold text-ink dark:text-white">{tr.name}</div>
                  <div className="text-sm text-ink-muted">{tr.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`${t.reviewLabel} ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === index ? 'w-7 bg-brand-600' : 'w-2 bg-brand-600/25 hover:bg-brand-600/50'}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => go(-1)} aria-label={t.prev} className="grid h-11 w-11 place-items-center rounded-full border border-border text-brand-700 transition hover:bg-brand-50">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={() => go(1)} aria-label={t.next} className="grid h-11 w-11 place-items-center rounded-full border border-border text-brand-700 transition hover:bg-brand-50">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
