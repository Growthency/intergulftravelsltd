'use client';

import { motion } from 'framer-motion';
import { processSteps } from '@/lib/site';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { revealItem } from '@/components/ui/Reveal';

export function Process() {
  return (
    <Section className="bg-sand-soft">
      <SectionHeading
        eyebrow="How it works"
        title={<>Four simple steps to <span className="text-gradient">standing before the Kaaba</span></>}
        lead="We have refined the journey into a calm, guided process — you focus on your intention, we take care of everything else."
      />

      <Container className="mt-14">
        <div className="relative">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-brand-600/30 to-transparent lg:block" />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {processSteps.map((step) => (
              <motion.div key={step.step} variants={revealItem} className="relative text-center lg:text-left">
                <div className="relative z-10 mx-auto grid h-18 w-18 place-items-center rounded-2xl bg-brand-gradient font-display text-2xl font-semibold text-white shadow-emerald lg:mx-0" style={{ height: '4.5rem', width: '4.5rem' }}>
                  {step.step}
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
