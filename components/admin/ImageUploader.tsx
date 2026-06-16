'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { UploadCloud, Loader2, ImageIcon, X, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type Folder = 'blog' | 'gallery' | 'media' | 'settings';

export function ImageUploader({
  value,
  onChange,
  folder = 'media',
  label = 'Image',
  aspect = 'video',
  className,
}: {
  value?: string | null;
  onChange: (url: string | null) => void;
  folder?: Folder;
  label?: string;
  aspect?: 'video' | 'square';
  className?: string;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);

  const upload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        toast.error('Please choose an image file.');
        return;
      }
      setBusy(true);
      try {
        const body = new FormData();
        body.append('file', file);
        body.append('folder', folder);

        const res = await fetch('/api/admin/upload', { method: 'POST', body });
        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data?.ok || !data?.url) {
          toast.error(data?.error ?? 'Upload failed. Please try again.');
          return;
        }
        onChange(data.url as string);
        toast.success('Image uploaded and converted to WebP.');
      } catch {
        toast.error('Network error while uploading. Please try again.');
      } finally {
        setBusy(false);
      }
    },
    [folder, onChange],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) void upload(file);
    },
    [upload],
  );

  return (
    <div className={cn('space-y-2', className)}>
      {value ? (
        <div className="group relative overflow-hidden rounded-2xl border border-border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={label}
            className={cn(
              'w-full object-cover',
              aspect === 'square' ? 'aspect-square' : 'aspect-video',
            )}
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-ink/80 to-transparent p-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white">
              <CheckCircle2 className="h-3.5 w-3.5 text-gold-300" /> WebP · stored
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={busy}
                className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-800 transition hover:bg-white disabled:opacity-60"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={() => onChange(null)}
                className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-rose-600 transition hover:bg-white"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition',
            dragging
              ? 'border-brand-600 bg-brand-50'
              : 'border-border bg-background/40 hover:border-brand-600/50 hover:bg-brand-50/50',
            busy && 'pointer-events-none opacity-70',
          )}
        >
          {busy ? (
            <Loader2 className="h-7 w-7 animate-spin text-brand-600" />
          ) : (
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
              {dragging ? <ImageIcon className="h-6 w-6" /> : <UploadCloud className="h-6 w-6" />}
            </span>
          )}
          <span className="text-sm font-semibold text-ink">
            {busy ? 'Uploading…' : 'Drop an image or click to upload'}
          </span>
          <span className="text-xs text-ink-muted">
            JPG, PNG, GIF, AVIF, TIFF or BMP · auto-converted to WebP
          </span>
        </label>
      )}

      <input
        id={inputId}
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void upload(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}
