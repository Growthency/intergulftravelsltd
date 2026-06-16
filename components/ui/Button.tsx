import Link from 'next/link';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'gold' | 'outline' | 'ghost' | 'light';
type Size = 'sm' | 'md' | 'lg';

const base =
  'relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 overflow-hidden group';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-emerald hover:bg-brand-700 hover:shadow-[0_22px_60px_-18px_rgba(14,124,90,0.7)] hover:-translate-y-0.5',
  gold:
    'bg-gold-gradient text-brand-900 shadow-gold hover:-translate-y-0.5 hover:shadow-[0_22px_55px_-15px_rgba(201,162,75,0.75)]',
  outline:
    'border border-brand-600/30 text-brand-700 hover:border-brand-600 hover:bg-brand-50 dark:text-brand-200 dark:hover:bg-brand-900/40',
  ghost: 'text-brand-700 hover:bg-brand-50 dark:text-brand-200 dark:hover:bg-brand-900/40',
  light:
    'bg-white/95 text-brand-800 shadow-soft hover:bg-white hover:-translate-y-0.5',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-[0.95rem]',
  lg: 'h-13 px-8 text-base py-3.5',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, external, className, children, ...props }, ref) => {
    const classes = cn(base, variants[variant], sizes[size], className);
    const shine = (
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    );

    if (href) {
      if (external) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
            {shine}
            <span className="relative inline-flex items-center gap-2">{children}</span>
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {shine}
          <span className="relative inline-flex items-center gap-2">{children}</span>
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {shine}
        <span className="relative inline-flex items-center gap-2">{children}</span>
      </button>
    );
  },
);
Button.displayName = 'Button';
