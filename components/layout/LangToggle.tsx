'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { localizedPath, stripLocale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * EN / BN switch. Links to the same page in the other language version
 * (server-rendered — a real navigation, not a client text-swap).
 */
export function LangToggle({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  const locale = useLocale();
  const pathname = usePathname() || '/';
  const base = stripLocale(pathname); // path without the /en prefix

  const items: { code: 'bn' | 'en'; label: string; href: string }[] = [
    { code: 'bn', label: 'BN', href: localizedPath('bn', base) },
    { code: 'en', label: 'EN', href: localizedPath('en', base) },
  ];

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full p-0.5',
        tone === 'dark' ? 'border border-border bg-card' : 'border border-white/20 bg-white/10',
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {items.map((it) => {
        const active = locale === it.code;
        return (
          <Link
            key={it.code}
            href={it.href}
            aria-current={active ? 'true' : undefined}
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-bold tracking-wide transition',
              active
                ? 'bg-brand-600 text-white shadow-emerald'
                : tone === 'dark'
                  ? 'text-ink-muted hover:text-brand-700'
                  : 'text-white/70 hover:text-white',
            )}
          >
            {it.label}
          </Link>
        );
      })}
    </div>
  );
}
