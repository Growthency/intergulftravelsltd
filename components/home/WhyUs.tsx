'use client';

import { motion } from 'framer-motion';
import { whyUs } from '@/lib/site';
import { Icon } from '@/components/ui/Icon';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { AuroraBackdrop } from '@/components/effects/AuroraBackdrop';
import { revealItem } from '@/components/ui/Reveal';

export function WhyUs() {
  return (
    <Section className="relative overflow-hidden">
      <AuroraBackdrop />
      <SectionHeading
        eyebrow="Why pilgrims choose us"
        title={<>A name families trust with their <span className="text-gradient">most important journey</span></>}
        lead="For over two decades we have earned trust the only way that lasts — by treating every pilgrim like family and keeping every promise we make."
      />

      <Container className="mt-14">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {whyUs.map((item) => (
            <motion.div
              key={item.title}
              variants={revealItem}
              className="group relative rounded-3xl border border-border bg-card/70 p-7 backdrop-blur transition-all duration-300 hover:border-gold-400/40 hover:shadow-gold"
            >
              <span className="ring-gradient grid h-14 w-14 place-items-center rounded-2xl bg-gold-50 text-brand-700 dark:bg-brand-900/40 dark:text-gold-300">
                <Icon name={item.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
