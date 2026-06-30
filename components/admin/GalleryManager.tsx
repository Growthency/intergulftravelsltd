'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, GalleryHorizontalEnd, X } from 'lucide-react';
import { Card, Field, inputClass, AdminButton, EmptyState, Badge } from '@/components/admin/ui';
import { confirmDialog } from '@/components/admin/confirm';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/adminwebsite';

export type GalleryImage = {
  id: string;
  title: string;
  url: string;
  category: string | null;
  sort_order: number | null;
};

export function GalleryManager({ images }: { images: GalleryImage[] }) {
  const router = useRouter();
  const t = getDict(useLocale()).galleryMgr;
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Hajj');
  const [sortOrder, setSortOrder] = useState('0');
  const [url, setUrl] = useState<string | null>(null);

  function resetForm() {
    setTitle('');
    setCategory('Hajj');
    setSortOrder('0');
    setUrl(null);
  }

  async function add() {
    if (!url) {
      toast.error(t.uploadFirstError);
      return;
    }
    if (title.trim().length < 1) {
      toast.error(t.addTitleError);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          url,
          category: category.trim() || 'general',
          sort_order: Number(sortOrder) || 0,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? t.couldNotAdd);
        return;
      }
      toast.success(t.imageAdded);
      resetForm();
      setOpen(false);
      router.refresh();
    } catch {
      toast.error(t.networkError);
    } finally {
      setSaving(false);
    }
  }

  async function remove(image: GalleryImage) {
    if (!(await confirmDialog({ message: t.confirmRemove(image.title), confirmText: t.confirmText, danger: true }))) return;
    setDeletingId(image.id);
    try {
      const res = await fetch(`/api/admin/gallery?id=${encodeURIComponent(image.id)}`, {
        method: 'DELETE',
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? t.couldNotDelete);
        return;
      }
      toast.success(t.imageRemoved);
      router.refresh();
    } catch {
      toast.error(t.networkError);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <AdminButton variant="primary" onClick={() => setOpen((o) => !o)}>
          <Plus className="h-4 w-4" /> {t.addImage}
        </AdminButton>
      </div>

      {open && (
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">{t.newImage}</p>
            <button
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-muted"
              aria-label={t.ariaClose}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
            <ImageUploader folder="gallery" label={t.galleryImageLabel} value={url} onChange={setUrl} />
            <div className="space-y-3">
              <Field label={t.titleLabel}>
                <input
                  className={inputClass}
                  value={title}
                  placeholder={t.titlePlaceholder}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label={t.categoryLabel}>
                  <input
                    className={inputClass}
                    value={category}
                    placeholder={t.categoryPlaceholder}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Field>
                <Field label={t.sortOrderLabel} hint={t.sortOrderHint}>
                  <input
                    type="number"
                    className={inputClass}
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  />
                </Field>
              </div>
              <AdminButton variant="primary" onClick={add} disabled={saving} className="w-full">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                {t.addToGallery}
              </AdminButton>
            </div>
          </div>
        </Card>
      )}

      {images.length === 0 ? (
        <EmptyState
          icon={<GalleryHorizontalEnd className="h-6 w-6" />}
          title={t.emptyTitle}
          description={t.emptyDesc}
          action={
            <AdminButton variant="primary" onClick={() => setOpen(true)}>
              <Plus className="h-4 w-4" /> {t.addImage}
            </AdminButton>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => remove(img)}
                  disabled={deletingId === img.id}
                  className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-rose-600 opacity-0 shadow transition group-hover:opacity-100 hover:bg-white disabled:opacity-100"
                  aria-label={t.ariaDelete(img.title)}
                >
                  {deletingId === img.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="space-y-1 p-3">
                <p className="truncate text-sm font-semibold text-ink">{img.title}</p>
                <div className="flex items-center justify-between gap-2">
                  {img.category && <Badge tone="emerald">{img.category}</Badge>}
                  <span className="text-xs text-ink-muted">#{img.sort_order ?? 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
