'use client';

import { useState } from 'react';
import { Facebook, Link2, Check, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn, whatsappLink } from '@/lib/utils';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/blog';

type ShareButtonsProps = {
  /** Absolute or root-relative URL of the article being shared. */
  url: string;
  /** Article title, used to seed share text. */
  title: string;
  className?: string;
};

/** Inline share row for blog articles — WhatsApp, Facebook, X and copy-link. */
export function ShareButtons({ url, title, className }: ShareButtonsProps) {
  const t = getDict(useLocale()).share;
  const [copied, setCopied] = useState(false);

  // Resolve to an absolute URL on the client so shared links always work off-site.
  const absoluteUrl =
    typeof window !== 'undefined' && url.startsWith('/') ? `${window.location.origin}${url}` : url;

  const shareText = `${title} — ${t.brandSuffix}`;

  const links = {
    whatsapp: whatsappLink('', `${shareText}\n${absoluteUrl}`),
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(absoluteUrl)}`,
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(absoluteUrl)}`,
  };

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      toast.success(t.copied);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t.copyFailed);
    }
  }

  const iconBtn =
    'inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-ink-muted shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600/40 hover:text-brand-700 hover:shadow-emerald focus-visible:outline-none';

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="text-sm font-semibold text-ink-muted">{t.label}</span>
      <div className="flex items-center gap-2">
        <a
          href={links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.whatsapp}
          title={t.whatsapp}
          className={iconBtn}
        >
          <MessageCircle className="h-4 w-4" />
        </a>
        <a
          href={links.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.facebook}
          title={t.facebook}
          className={iconBtn}
        >
          <Facebook className="h-4 w-4" />
        </a>
        <a
          href={links.x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.x}
          title={t.x}
          className={iconBtn}
        >
          <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
          </svg>
        </a>
        <button type="button" onClick={copyLink} aria-label={t.copy} title={t.copy} className={iconBtn}>
          {copied ? <Check className="h-4 w-4 text-brand-600" /> : <Link2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
