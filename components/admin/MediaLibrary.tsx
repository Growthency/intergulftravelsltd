'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Copy, Check, ImageOff, ExternalLink } from 'lucide-react';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { Card, EmptyState } from '@/components/admin/ui';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/adminwebsite';

export type MediaItem = {
  name: string;
  url: string;
  size: number | null;
  createdAt: string | null;
};

function formatBytes(bytes: number | null) {
  if (!bytes || bytes <= 0) return '—';
  const units = ['B', 'KB', 'MB'];
  let v = bytes;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(v < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}

export function MediaLibrary({ items }: { items: MediaItem[] }) {
  const router = useRouter();
  const t = getDict(useLocale()).mediaLib;
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      toast.success(t.urlCopied);
      setTimeout(() => setCopied((c) => (c === url ? null : c)), 1500);
    } catch {
      toast.error(t.copyFailed);
    }
  }

  return (
    <div className="space-y-6">
      <Card className="space-y-3">
        <p className="text-sm font-semibold text-ink">{t.uploadTitle}</p>
        <ImageUploader
          folder="media"
          label={t.mediaAssetLabel}
          value={null}
          onChange={(url) => {
            if (url) {
              toast.success(t.uploadedRefreshing);
              router.refresh();
            }
          }}
        />
        <p className="text-xs text-ink-muted">{t.uploadHint}</p>
      </Card>

      {items.length === 0 ? (
        <EmptyState
          icon={<ImageOff className="h-6 w-6" />}
          title={t.emptyTitle}
          description={t.emptyDesc}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.name}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-square overflow-hidden bg-muted"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-ink-muted opacity-0 shadow transition group-hover:opacity-100">
                  <ExternalLink className="h-4 w-4" />
                </span>
              </a>
              <div className="space-y-2 p-3">
                <p className="truncate text-xs font-medium text-ink" title={item.name}>
                  {item.name}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[0.7rem] text-ink-muted">{formatBytes(item.size)}</span>
                  <button
                    onClick={() => copy(item.url)}
                    className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[0.7rem] font-semibold text-ink-muted transition hover:border-brand-600/40 hover:text-brand-700"
                  >
                    {copied === item.url ? (
                      <>
                        <Check className="h-3 w-3 text-brand-600" /> {t.copied}
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" /> {t.copyUrl}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
