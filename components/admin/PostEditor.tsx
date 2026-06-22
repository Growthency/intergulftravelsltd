'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { toast } from 'sonner';
import {
  Loader2,
  Save,
  Eye,
  Pencil,
  ExternalLink,
  Trash2,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import { Card, Field, inputClass, AdminButton } from '@/components/admin/ui';
import { confirmDialog } from '@/components/admin/confirm';
import { ImageUploader } from '@/components/admin/ImageUploader';

export type PostFormData = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'hajj-umrah' | 'others';
  tags: string[];
  author_name: string;
  author_role: string;
  read_time: string;
  tone: 'emerald' | 'gold' | 'forest' | 'sand';
  featured_image: string | null;
  status: 'draft' | 'published' | 'scheduled';
  featured: boolean;
  meta_title: string;
  meta_description: string;
  published_at: string | null;
};

const EMPTY: PostFormData = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'hajj-umrah',
  tags: [],
  author_name: 'Inter Gulf Travels',
  author_role: 'Editorial Team',
  read_time: '',
  tone: 'emerald',
  featured_image: null,
  status: 'draft',
  featured: false,
  meta_title: '',
  meta_description: '',
  published_at: null,
};

const toneOptions: { value: PostFormData['tone']; label: string }[] = [
  { value: 'emerald', label: 'Emerald' },
  { value: 'gold', label: 'Gold' },
  { value: 'forest', label: 'Forest' },
  { value: 'sand', label: 'Sand' },
];

/** Convert an ISO timestamp to a value the datetime-local input accepts. */
function toLocalInput(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
    d.getMinutes(),
  )}`;
}

export function PostEditor({ initial }: { initial?: Partial<PostFormData> }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  const [form, setForm] = useState<PostFormData>({ ...EMPTY, ...initial });
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [tagsInput, setTagsInput] = useState((initial?.tags ?? []).join(', '));
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const set = <K extends keyof PostFormData>(key: K, value: PostFormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const previewHtml = useMemo(() => {
    const raw = marked.parse(form.content || '', { async: false }) as string;
    return DOMPurify.sanitize(raw);
  }, [form.content]);

  async function save() {
    if (form.title.trim().length < 2) {
      toast.error('Please add a title before saving.');
      return;
    }
    setSaving(true);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const body = {
      ...form,
      slug: form.slug || slugify(form.title),
      tags,
      featured_image: form.featured_image || '',
      published_at: form.published_at ? new Date(form.published_at).toISOString() : null,
    };

    try {
      const res = await fetch(isEdit ? `/api/admin/posts/${initial!.id}` : '/api/admin/posts', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not save the post.');
        return;
      }

      toast.success(isEdit ? 'Post updated.' : 'Post created.');
      router.push('/admin/posts');
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!isEdit) return;
    if (!(await confirmDialog({ message: 'Delete this post permanently? This cannot be undone.', confirmText: 'Delete', danger: true }))) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/posts/${initial!.id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not delete the post.');
        return;
      }
      toast.success('Post deleted.');
      router.push('/admin/posts');
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border text-ink-muted transition hover:bg-muted"
            aria-label="Back to posts"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
              {isEdit ? 'Edit post' : 'New post'}
            </h1>
            <p className="text-sm text-ink-muted">
              {isEdit ? 'Update and re-publish this article.' : 'Compose a new blog article.'}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isEdit && form.status === 'published' && form.slug && (
            <AdminButton href={`/blog/${form.slug}`} variant="outline" size="sm">
              <ExternalLink className="h-4 w-4" /> View live
            </AdminButton>
          )}
          {isEdit && (
            <AdminButton variant="danger" size="sm" onClick={remove} disabled={deleting}>
              {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              Delete
            </AdminButton>
          )}
          <AdminButton variant="primary" onClick={save} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isEdit ? 'Save changes' : 'Create post'}
          </AdminButton>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_20rem]">
        {/* Main column */}
        <div className="space-y-6">
          <Card className="space-y-4">
            <Field label="Title">
              <input
                className={inputClass}
                value={form.title}
                placeholder="e.g. Preparing spiritually for your first Umrah"
                onChange={(e) => {
                  const title = e.target.value;
                  set('title', title);
                  if (!slugTouched) set('slug', slugify(title));
                }}
              />
            </Field>

            <Field label="Slug" hint="URL path · /blog/your-slug">
              <input
                className={inputClass}
                value={form.slug}
                placeholder="auto-generated-from-title"
                onChange={(e) => {
                  setSlugTouched(true);
                  set('slug', slugify(e.target.value));
                }}
              />
            </Field>

            <Field label="Excerpt" hint="Shown on cards & meta">
              <textarea
                className={`${inputClass} resize-y`}
                rows={2}
                value={form.excerpt}
                placeholder="A short, inviting summary of the article."
                onChange={(e) => set('excerpt', e.target.value)}
              />
            </Field>
          </Card>

          <Card className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">Content</p>
              <div className="flex rounded-full border border-border p-0.5">
                <button
                  type="button"
                  onClick={() => setPreview(false)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
                    !preview ? 'bg-brand-600 text-white' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <Pencil className="h-3.5 w-3.5" /> Write
                </button>
                <button
                  type="button"
                  onClick={() => setPreview(true)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
                    preview ? 'bg-brand-600 text-white' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" /> Preview
                </button>
              </div>
            </div>

            {preview ? (
              <div
                className="prose-igt min-h-[20rem] rounded-2xl border border-border bg-background/40 px-5 py-4"
                dangerouslySetInnerHTML={{
                  __html: previewHtml || '<p class="text-ink-muted">Nothing to preview yet.</p>',
                }}
              />
            ) : (
              <textarea
                className={`${inputClass} resize-y font-mono text-sm leading-relaxed`}
                rows={20}
                value={form.content}
                placeholder={'Write in Markdown or HTML.\n\n## A heading\n\nA paragraph of body text, **bold**, _italic_ and [links](https://example.com).'}
                onChange={(e) => set('content', e.target.value)}
              />
            )}
            <p className="text-xs text-ink-muted">
              Markdown and HTML are both supported. Content is sanitised on save.
            </p>
          </Card>

          <Card className="space-y-4">
            <p className="text-sm font-semibold text-ink">Search appearance</p>
            <Field label="Meta title" hint="Defaults to the post title">
              <input
                className={inputClass}
                value={form.meta_title}
                placeholder="Leave blank to use the title"
                onChange={(e) => set('meta_title', e.target.value)}
              />
            </Field>
            <Field label="Meta description" hint={`${form.meta_description.length}/160`}>
              <textarea
                className={`${inputClass} resize-y`}
                rows={2}
                value={form.meta_description}
                placeholder="A concise description for search engines and social previews."
                onChange={(e) => set('meta_description', e.target.value)}
              />
            </Field>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="space-y-4">
            <p className="text-sm font-semibold text-ink">Publishing</p>
            <Field label="Status">
              <select
                className={inputClass}
                value={form.status}
                onChange={(e) => set('status', e.target.value as PostFormData['status'])}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </Field>

            {(form.status === 'scheduled' || form.status === 'published') && (
              <Field
                label="Publish date"
                hint={form.status === 'scheduled' ? 'Goes live at this time' : 'Optional'}
              >
                <input
                  type="datetime-local"
                  className={inputClass}
                  value={toLocalInput(form.published_at)}
                  onChange={(e) =>
                    set('published_at', e.target.value ? new Date(e.target.value).toISOString() : null)
                  }
                />
              </Field>
            )}

            <label className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/40 px-3.5 py-3">
              <span className="text-sm font-medium text-ink">Feature this post</span>
              <Toggle checked={form.featured} onChange={(v) => set('featured', v)} />
            </label>
          </Card>

          <Card className="space-y-3">
            <p className="text-sm font-semibold text-ink">Featured image</p>
            <ImageUploader
              folder="blog"
              label="Featured image"
              value={form.featured_image}
              onChange={(url) => set('featured_image', url)}
            />
          </Card>

          <Card className="space-y-4">
            <p className="text-sm font-semibold text-ink">Organisation</p>
            <Field label="Category">
              <select
                className={inputClass}
                value={form.category}
                onChange={(e) => set('category', e.target.value as PostFormData['category'])}
              >
                <option value="hajj-umrah">Hajj &amp; Umrah</option>
                <option value="others">Others</option>
              </select>
            </Field>
            <Field label="Card tone" hint="Cover gradient">
              <select
                className={inputClass}
                value={form.tone}
                onChange={(e) => set('tone', e.target.value as PostFormData['tone'])}
              >
                {toneOptions.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Tags" hint="Comma-separated">
              <input
                className={inputClass}
                value={tagsInput}
                placeholder="umrah, guide, preparation"
                onChange={(e) => setTagsInput(e.target.value)}
              />
            </Field>
            <Field label="Read time" hint="Auto if blank">
              <input
                className={inputClass}
                value={form.read_time}
                placeholder="5 min read"
                onChange={(e) => set('read_time', e.target.value)}
              />
            </Field>
          </Card>

          <Card className="space-y-4">
            <p className="text-sm font-semibold text-ink">Author</p>
            <Field label="Name">
              <input
                className={inputClass}
                value={form.author_name}
                onChange={(e) => set('author_name', e.target.value)}
              />
            </Field>
            <Field label="Role">
              <input
                className={inputClass}
                value={form.author_role}
                onChange={(e) => set('author_role', e.target.value)}
              />
            </Field>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
        checked ? 'bg-brand-600' : 'bg-border'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}
