'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Calculator, Loader2 } from 'lucide-react';
import { services } from '@/lib/site';
import { cn } from '@/lib/utils';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/estimate';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  package: string;
  travel_date: string;
  pax: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldBase =
  'w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-[0.95rem] text-ink outline-none transition focus:border-brand-600 focus:bg-card focus:ring-2 focus:ring-brand-600/15 dark:text-white';

export function EstimateForm() {
  const t = getDict(useLocale());
  const packageHints = t.form.packageHints;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: services[0]?.title ?? '',
      package: packageHints[0],
      travel_date: '',
      pax: '1',
      message: '',
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, pax: Number(values.pax) }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? t.form.toast.genericError);
        return;
      }

      toast.success(t.form.toast.success);
      reset();
    } catch {
      toast.error(t.form.toast.networkError);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.form.labels.name} error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            placeholder={t.form.placeholders.name}
            className={cn(fieldBase, errors.name && 'border-red-400 focus:ring-red-400/15')}
            {...register('name', {
              required: t.form.errors.nameRequired,
              minLength: { value: 2, message: t.form.errors.nameRequired },
            })}
          />
        </Field>
        <Field label={t.form.labels.phone} error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            placeholder={t.form.placeholders.phone}
            className={cn(fieldBase, errors.phone && 'border-red-400 focus:ring-red-400/15')}
            {...register('phone', {
              required: t.form.errors.phoneRequired,
              minLength: { value: 6, message: t.form.errors.phoneInvalid },
            })}
          />
        </Field>
      </div>

      <Field label={t.form.labels.email} error={errors.email?.message}>
        <input
          type="email"
          autoComplete="email"
          placeholder={t.form.placeholders.email}
          className={cn(fieldBase, errors.email && 'border-red-400 focus:ring-red-400/15')}
          {...register('email', {
            required: t.form.errors.emailRequired,
            pattern: { value: emailPattern, message: t.form.errors.emailInvalid },
          })}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.form.labels.service} error={errors.service?.message}>
          <select
            className={cn(fieldBase, errors.service && 'border-red-400 focus:ring-red-400/15')}
            {...register('service', { required: t.form.errors.serviceRequired })}
          >
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.form.labels.package} error={errors.package?.message}>
          <select className={fieldBase} {...register('package')}>
            {packageHints.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.form.labels.travelDate} error={errors.travel_date?.message}>
          <input
            type="date"
            className={cn(fieldBase, errors.travel_date && 'border-red-400 focus:ring-red-400/15')}
            {...register('travel_date')}
          />
        </Field>
        <Field label={t.form.labels.pax} error={errors.pax?.message}>
          <input
            type="number"
            min={1}
            max={500}
            inputMode="numeric"
            placeholder={t.form.placeholders.pax}
            className={cn(fieldBase, errors.pax && 'border-red-400 focus:ring-red-400/15')}
            {...register('pax', {
              required: t.form.errors.paxRequired,
              min: { value: 1, message: t.form.errors.paxMin },
              max: { value: 500, message: t.form.errors.paxMax },
            })}
          />
        </Field>
      </div>

      <Field label={t.form.labels.message} error={errors.message?.message}>
        <textarea
          rows={4}
          placeholder={t.form.placeholders.message}
          className={cn(fieldBase, 'resize-y')}
          {...register('message')}
        />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-600 px-7 font-semibold text-white shadow-emerald transition-all duration-300 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> {t.form.submitting}
          </>
        ) : (
          <>
            {t.form.submit} <Calculator className="h-4 w-4 transition-transform group-hover:scale-105" />
          </>
        )}
      </button>

      <p className="text-xs text-ink-muted">
        {t.form.disclaimer}
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-red-500">{error}</span>}
    </label>
  );
}
