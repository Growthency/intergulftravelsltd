'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone, Star, ShieldCheck, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Typewriter } from '@/components/effects/AnimatedHeadline';
import { Counter } from '@/components/ui/Counter';
import { WavyDivider } from '@/components/effects/WavyDivider';
import { contact } from '@/lib/site';
import { useDictionary, useLocale } from '@/components/providers/LocaleProvider';
import { localizedPath } from '@/lib/i18n';

export function Hero() {
  const t = useDictionary();
  const locale = useLocale();
  return (
    <section className="relative isolate overflow-hidden bg-brand-900 pb-28 pt-16 text-white sm:pt-20 lg:min-h-[92vh] lg:pb-36">
      {/* layered moving background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_10%,#0e7c5a_0%,#074a37_42%,#06402b_70%,#032018_100%)]" />
        <motion.span
          animate={{ y: [0, -28, 0], x: [0, 14, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-10 top-10 h-[46vh] w-[46vh] rounded-full bg-brand-500/30 blur-[110px]"
        />
        <motion.span
          animate={{ y: [0, 30, 0], x: [0, -16, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[-6%] top-1/4 h-[40vh] w-[40vh] rounded-full bg-gold-400/22 blur-[120px]"
        />
        {/* faint islamic-geometry grid */}
        <div
          className="absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(80%_70%_at_50%_30%,#000_30%,transparent_100%)]"
          style={{
            backgroundImage:
              'linear-gradient(30deg, #e7c97a 1px, transparent 1px), linear-gradient(-30deg, #e7c97a 1px, transparent 1px)',
            backgroundSize: '46px 46px',
          }}
        />
        {/* drifting stars */}
        {[
          [12, 22], [78, 16], [88, 60], [22, 70], [60, 30], [40, 14], [70, 78], [8, 52],
        ].map(([l, t], i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold-200"
            style={{ left: `${l}%`, top: `${t}%` }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.6, 1] }}
            transition={{ duration: 2.6 + (i % 4), repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        {/* copy */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-200 backdrop-blur"
          >
            <ShieldCheck className="h-4 w-4" /> {t.hero.badge}
          </motion.div>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.6rem]">
            <span className="block text-white/95">{t.hero.titleTop}</span>
            <span className="mt-1 block">
              <Typewriter phrases={[...t.hero.phrases]} />
            </span>
            <span className="mt-1 block text-white/95">{t.hero.titleBottom}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg lg:mx-0">
            {t.hero.lead}
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start">
            <Button href={localizedPath(locale, '/hajj/packages')} variant="gold" size="lg">
              {t.cta.explorePackages} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href={`tel:${contact.phones[0].replace(/\s/g, '')}`} variant="light" size="lg">
              <Phone className="h-4 w-4" /> {contact.phones[0]}
            </Button>
          </div>

          {/* stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-7 lg:max-w-lg">
            {[
              { to: 24, suffix: '+', label: t.hero.statYears },
              { to: 12000, suffix: '+', label: t.hero.statPilgrims },
              { to: 40, suffix: '+', label: t.hero.statAirlines },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-semibold text-gold-300 sm:text-4xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-white/60 sm:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* illustration */}
        <div className="relative z-10 hidden lg:block">
          <HaramScene />

          {/* floating glass cards */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-4 top-10 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md"
          >
            <div className="flex items-center gap-1 text-gold-300">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <div className="mt-1 text-sm font-semibold">{t.hero.rating}</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-2 -right-2 max-w-[15rem] rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gold-300">
              <MapPin className="h-3.5 w-3.5" /> {t.hero.season}
            </div>
            <p className="mt-1 text-sm font-semibold leading-snug">
              {t.hero.seasonNote}
            </p>
            <a href={localizedPath(locale, '/estimate')} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gold-200 hover:text-gold-100">
              {t.hero.reserve} <ArrowRight className="h-3 w-3" />
            </a>
          </motion.div>
        </div>
      </div>

      <WavyDivider position="bottom" variant="wave" fill="rgb(var(--background))" className="text-sand-soft" />
    </section>
  );
}

/** Vector Haramain scene — crisp at any size, on-brand, no raster image needed. */
function HaramScene() {
  return (
    <svg viewBox="0 0 460 460" className="mx-auto w-full max-w-md drop-shadow-2xl" fill="none">
      <defs>
        <radialGradient id="halo" cx="50%" cy="42%" r="50%">
          <stop offset="0%" stopColor="#e7c97a" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#c9a24b" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#c9a24b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dome" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#e7c97a" />
          <stop offset="1" stopColor="#b1853a" />
        </linearGradient>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#0f8a64" />
          <stop offset="1" stopColor="#074a37" />
        </linearGradient>
        <linearGradient id="kaaba" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#10221b" />
          <stop offset="1" stopColor="#06140f" />
        </linearGradient>
      </defs>

      {/* halo */}
      <circle cx="230" cy="200" r="200" fill="url(#halo)" />
      <circle cx="230" cy="200" r="150" stroke="#e7c97a" strokeOpacity="0.18" strokeWidth="1" />
      <circle cx="230" cy="200" r="178" stroke="#e7c97a" strokeOpacity="0.1" strokeWidth="1" />

      {/* crescent */}
      <g transform="translate(360 70)">
        <path d="M14 0a26 26 0 1 0 18 44A22 22 0 1 1 14 0Z" fill="url(#dome)" />
      </g>

      {/* minarets */}
      {[70, 390].map((x) => (
        <g key={x} transform={`translate(${x} 110)`}>
          <rect x="-7" y="40" width="14" height="200" rx="3" fill="url(#wall)" />
          <rect x="-11" y="120" width="22" height="6" fill="#e7c97a" opacity="0.5" />
          <rect x="-11" y="170" width="22" height="6" fill="#e7c97a" opacity="0.5" />
          <path d="M-9 40 Q0 6 9 40 Z" fill="url(#dome)" />
          <circle cx="0" cy="6" r="4" fill="#e7c97a" />
        </g>
      ))}

      {/* arches / wall */}
      <g transform="translate(0 250)">
        <rect x="95" y="-10" width="270" height="120" rx="10" fill="url(#wall)" />
        {[125, 185, 245, 305].map((x) => (
          <path key={x} d={`M${x} 110 V40 a20 20 0 0 1 40 0 V110 Z`} fill="#06352a" opacity="0.55" />
        ))}
      </g>

      {/* central dome */}
      <g transform="translate(230 150)">
        <path d="M-58 100 Q-58 0 0 -28 Q58 0 58 100 Z" fill="url(#dome)" />
        <path d="M0 -28 V-58" stroke="#e7c97a" strokeWidth="4" strokeLinecap="round" />
        <circle cx="0" cy="-62" r="6" fill="#e7c97a" />
        <path d="M-58 100 Q0 78 58 100" stroke="#fff5dc" strokeOpacity="0.25" strokeWidth="2" fill="none" />
      </g>

      {/* Kaaba */}
      <g transform="translate(230 330)">
        <rect x="-52" y="-78" width="104" height="78" rx="3" fill="url(#kaaba)" />
        <rect x="-52" y="-58" width="104" height="11" fill="#c9a24b" />
        <path d="M-52 -52 H52" stroke="#e7c97a" strokeWidth="1" strokeOpacity="0.7" />
        <path d="M-52 -46 H52" stroke="#e7c97a" strokeWidth="1" strokeOpacity="0.7" />
        <rect x="-10" y="-30" width="20" height="30" fill="#c9a24b" opacity="0.85" />
        {/* tawaf ground rings */}
        <ellipse cx="0" cy="8" rx="120" ry="20" fill="#0f8a64" opacity="0.18" />
        <ellipse cx="0" cy="8" rx="92" ry="14" fill="#0f8a64" opacity="0.2" />
      </g>
    </svg>
  );
}
