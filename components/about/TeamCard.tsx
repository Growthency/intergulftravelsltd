'use client';

import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { revealItem } from '@/components/ui/Reveal';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/about';

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Tailwind gradient stops for the initial avatar, e.g. 'from-brand-600 to-brand-900' */
  gradient: string;
  email?: string;
};

/** Returns up to two uppercase initials from a person's name. */
function initials(name: string) {
  const parts = name.replace(/^(Md\.?|Mr\.?|Mrs\.?|Ms\.?|Dr\.?)\s+/i, '').trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export function TeamCard({ member }: { member: TeamMember }) {
  const t = getDict(useLocale());
  return (
    <motion.article
      variants={revealItem}
      className="group relative flex flex-col items-center rounded-3xl border border-border bg-card p-7 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-gold"
    >
      <div className="relative">
        <span
          className={cn(
            'grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br font-display text-2xl font-semibold text-white shadow-emerald',
            member.gradient,
          )}
          aria-hidden
        >
          {initials(member.name)}
        </span>
        <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border-2 border-card bg-gold-gradient text-[0.6rem] font-bold text-brand-900">
          IG
        </span>
      </div>

      <h3 className="mt-5 font-display text-lg font-semibold text-ink dark:text-white">{member.name}</h3>
      <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
        {member.role}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{member.bio}</p>

      <div className="mt-5 flex items-center gap-2">
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            aria-label={`${t.teamCard.emailAria} ${member.name}`}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-brand-700 transition hover:border-brand-600 hover:bg-brand-50 dark:text-brand-200 dark:hover:bg-brand-900/40"
          >
            <Mail className="h-4 w-4" />
          </a>
        )}
        <span className="grid h-9 w-9 place-items-center rounded-full border border-border text-brand-700 transition hover:border-brand-600 hover:bg-brand-50 dark:text-brand-200 dark:hover:bg-brand-900/40">
          <Linkedin className="h-4 w-4" />
        </span>
      </div>
    </motion.article>
  );
}
