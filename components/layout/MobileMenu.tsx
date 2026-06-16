'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Phone, X } from 'lucide-react';
import { navigation, contact } from '@/lib/site';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/brand/Logo';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] lg:hidden"
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-sand-soft shadow-2xl dark:bg-ink"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Logo href="/" />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              {navigation.map((item) => (
                <div key={item.label} className="border-b border-border/60">
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
                        className="flex w-full items-center justify-between px-2 py-3.5 text-left font-display text-lg font-medium"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            'h-5 w-5 text-brand-600 transition-transform',
                            expanded === item.label && 'rotate-180',
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-0.5 pb-3 pl-3">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={onClose}
                                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.95rem] text-ink-muted hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900/30"
                                >
                                  {child.image ? (
                                    <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-lg bg-white p-1 ring-1 ring-border">
                                      <Image src={child.image} alt="" width={32} height={32} className="h-full w-full object-contain" />
                                    </span>
                                  ) : child.icon ? (
                                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                                      <Icon name={child.icon} className="h-4 w-4" />
                                    </span>
                                  ) : null}
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block px-2 py-3.5 font-display text-lg font-medium hover:text-brand-700"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="space-y-3 border-t border-border px-5 py-5">
              <Button href="/estimate" variant="gold" size="md" className="w-full" onClick={onClose as never}>
                Get Free Estimate
              </Button>
              <a
                href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-2 text-sm font-semibold text-brand-700"
              >
                <Phone className="h-4 w-4" /> {contact.phones[0]}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
