import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { SocialIcon } from '@/components/layout/SocialIcons';
import { WavyDivider } from '@/components/effects/WavyDivider';
import { footerLinks, contact, social, siteConfig, affiliations } from '@/lib/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden bg-brand-900 text-white/80">
      <WavyDivider position="top" variant="curve" fill="rgb(var(--background))" className="text-sand-soft" />
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-gold-500/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-4">
            <Logo href="/" variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {affiliations.map((a) => (
                <span key={a.short} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-gold-200">
                  {a.short}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:border-gold-400/40 hover:bg-gold-500/10 hover:text-gold-300"
                >
                  <SocialIcon name={s.icon as never} />
                </a>
              ))}
            </div>
          </div>

          {/* help & support */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-base font-semibold text-white">Help &amp; Support</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {footerLinks.helpSupport.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/65 transition hover:text-gold-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* useful links */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-base font-semibold text-white">Useful Links</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {footerLinks.usefulLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-white/65 transition hover:text-gold-300"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-base font-semibold text-white">Contact Us</h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span className="text-white/65">{contact.address.full}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span className="flex flex-col text-white/65">
                  {contact.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-gold-300">{p}</a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span className="flex flex-col text-white/65">
                  {contact.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="hover:text-gold-300">{e}</a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span className="text-white/65">{contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© {year} {siteConfig.legalName} All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/terms" className="hover:text-gold-300">Terms &amp; Conditions</Link>
            <Link href="/privacy" className="hover:text-gold-300">Privacy Policy</Link>
            <Link href="/sitemap.xml" className="hover:text-gold-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
