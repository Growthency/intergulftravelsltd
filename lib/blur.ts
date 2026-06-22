/** Tiny inline blur placeholders for next/image (perceived perf + less CLS). */
export const BLUR: Record<string, string> = {
  '/gallery/pilgrims-haram.webp': 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAADQAQCdASoOAAoAA8BgJQBOgCHPLSFmAAD9TZXYwsK4KfRQWDl7mNkeYgEjvgAA',
  '/gallery/group-haram.webp': 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACQAQCdASoOAAYAA8BgJZQCdACCbOAA3FZucRjbdAhdav1vvSgAAA==',
  '/gallery/office-handover.webp': 'data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADQAQCdASoOAAoAA8BgJQBOmT+AXBWbwAD+PuYzdXPeVPKDX61ieTtV6MfAQSRdtadEAAAA',
  '/gallery/hajj-2027-mokbul.webp': 'data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAADwAwCdASoOABUAPwFsrU8rJiQiMAgBYCAJZQC2yBoitfE0FS0LJHyAAP7QuX4LSkiLY+FvaXm2OxLA5SdjKbUgxGpgcUlE5nJNWeGL+SjzXyci4AA=',
};

export function blurFor(src?: string | null): string | undefined {
  return src && BLUR[src] ? BLUR[src] : undefined;
}
