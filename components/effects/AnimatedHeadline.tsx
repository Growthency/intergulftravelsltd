'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Typewriter headline that cycles through phrases, with a shimmering gold
 * caret. Used in the hero — types a phrase, pauses, deletes, moves to the next.
 */
export function Typewriter({
  phrases,
  className,
  typingSpeed = 70,
  deletingSpeed = 38,
  pause = 1500,
}: {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
          );
        },
        deleting ? deletingSpeed : typingSpeed,
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, phrases, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={cn('inline-flex items-baseline', className)}>
      <span className="text-gradient">{text}</span>
      <span className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.08em] animate-blink rounded-full bg-gold-500" />
    </span>
  );
}
