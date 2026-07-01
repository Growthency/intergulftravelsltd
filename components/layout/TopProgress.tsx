'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * A lightweight top progress bar. It starts the moment an internal link is
 * clicked (so navigation never feels frozen while the server renders) and
 * completes as soon as the pathname changes. No dependency, no Suspense
 * requirement (it deliberately watches only the pathname).
 */
export function TopProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const fade = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    if (tick.current) return; // already running
    if (fade.current) clearTimeout(fade.current);
    setVisible(true);
    setProgress(8);
    tick.current = setInterval(() => {
      // Ease towards 90% and wait there until the route actually changes.
      setProgress((p) => (p < 90 ? p + Math.max(0.5, (90 - p) * 0.08) : p));
    }, 200);
  };

  const done = () => {
    if (tick.current) {
      clearInterval(tick.current);
      tick.current = null;
    }
    setProgress(100);
    fade.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 280);
  };

  // Start on any left-click of an internal link.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const anchor = (e.target as HTMLElement)?.closest?.('a');
      const href = anchor?.getAttribute('href');
      if (!anchor || !href) return;
      if (
        anchor.getAttribute('target') === '_blank' ||
        anchor.hasAttribute('download') ||
        href.startsWith('#') ||
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) {
        return;
      }
      start();
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // Complete whenever the route changes.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    done();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Safety net so the bar can never hang.
  useEffect(() => {
    if (!visible) return;
    const safety = setTimeout(done, 10000);
    return () => clearTimeout(safety);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[3px]">
      <div
        className="h-full rounded-r-full bg-gold-400 transition-[width,opacity] duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress >= 100 ? 0 : 1,
          boxShadow: '0 0 10px rgba(212,175,55,0.8), 0 0 4px rgba(212,175,55,0.9)',
        }}
      />
    </div>
  );
}
