'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Calculator, Loader2 } from 'lucide-react';
import { services } from '@/lib/site';
import { cn } from '@/lib/utils';

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

const packageHints = [
  'Economy',
  'Standard',
  'Premium / VIP',
  'Family',
  'Group',
  'Custom / not sure yet',
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldBase =
  'w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-[0.95rem] text-ink outline-none transition focus:border-brand-600 focus:bg-card focus:ring-2 focus:ring-brand-600/15 dark:text-white';

export function EstimateForm() {
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
        toast.error(data?.error ?? 'Something went wrong. Please try again or call us directly.');
        return;
      }

      toast.success('Request received! Our advisor will prepare your free estimate and contact you soon, insha’Allah.');
      reset();
    } catch {
      toast.error('Network error. Please check your connection and try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            placeholder="e.g. Md. Abdur Rahman"
            className={cn(fieldBase, errors.name && 'border-red-400 focus:ring-red-400/15')}
            {...register('name', {
              required: 'Please enter your full name.',
              minLength: { value: 2, message: 'Please enter your full name.' },
            })}
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="01XXX XXXXXX"
            className={cn(fieldBase, errors.phone && 'border-red-400 focus:ring-red-400/15')}
            {...register('phone', {
              required: 'Please enter your phone number.',
              minLength: { value: 6, message: 'Please enter a valid phone number.' },
            })}
          />
        </Field>
      </div>

      <Field label="Email" error={errors.email?.message}>
        <input
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={cn(fieldBase, errors.email && 'border-red-400 focus:ring-red-400/15')}
          {...register('email', {
            required: 'Please enter your email address.',
            pattern: { value: emailPattern, message: 'Please enter a valid email address.' },
          })}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Service" error={errors.service?.message}>
          <select
            className={cn(fieldBase, errors.service && 'border-red-400 focus:ring-red-400/15')}
            {...register('service', { required: 'Please select a service.' })}
          >
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Package / tier" error={errors.package?.message}>
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
        <Field label="Preferred travel date" error={errors.travel_date?.message}>
          <input
            type="date"
            className={cn(fieldBase, errors.travel_date && 'border-red-400 focus:ring-red-400/15')}
            {...register('travel_date')}
          />
        </Field>
        <Field label="Travellers (pax)" error={errors.pax?.message}>
          <input
            type="number"
            min={1}
            max={500}
            inputMode="numeric"
            placeholder="1"
            className={cn(fieldBase, errors.pax && 'border-red-400 focus:ring-red-400/15')}
            {...register('pax', {
              required: 'Please enter the number of travellers.',
              min: { value: 1, message: 'At least one traveller is required.' },
              max: { value: 500, message: 'Please contact us directly for groups over 500.' },
            })}
          />
        </Field>
      </div>

      <Field label="Anything else? (optional)" error={errors.message?.message}>
        <textarea
          rows={4}
          placeholder="Budget, hotel preference, special assistance, departure city — anything that helps us tailor your estimate."
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
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
          </>
        ) : (
          <>
            Get my free estimate <Calculator className="h-4 w-4 transition-transform group-hover:scale-105" />
          </>
        )}
      </button>

      <p className="text-xs text-ink-muted">
        No payment required. Submitting this form places you under no obligation — we will simply prepare a
        tailored quote and answer your questions.
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
