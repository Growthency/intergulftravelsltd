import { cn } from '@/lib/utils';

type IconKey = 'facebook' | 'twitter' | 'instagram' | 'telegram' | 'whatsapp';

const paths: Record<IconKey, React.ReactNode> = {
  facebook: <path d="M14 8.5h2V5.8h-2.3c-2 0-3.2 1.2-3.2 3.3v1.6H8.4V13h2.1v6h2.7v-6h2l.3-2.3h-2.3V9.3c0-.6.2-.8.8-.8Z" />,
  twitter: (
    <path d="M17.3 5h2.5l-5.5 6.3L21 19h-4.9l-3.8-5-4.4 5H5.4l5.9-6.7L5 5h5l3.4 4.5L17.3 5Zm-.9 12.5h1.4L9 6.4H7.5l8.9 11.1Z" />
  ),
  instagram: (
    <>
      <rect x="4.5" y="4.5" width="15" height="15" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.4" cy="7.6" r="1" />
    </>
  ),
  telegram: <path d="M20.7 5.3 3.9 11.8c-1 .4-1 1.8.1 2.1l4 1.2 1.5 4.7c.3.9 1.4 1.1 2 .4l2.2-2.2 4 3c.7.5 1.7.1 1.9-.8l3-13.9c.2-1.1-.8-2-1.9-1.5Zm-2.7 3.3-6.8 6.2c-.2.2-.4.5-.4.8l-.3 2.2-1.2-3.8 8.4-5.6c.4-.3.8.2.3.5Z" />,
  whatsapp: (
    <path d="M12 4a8 8 0 0 0-6.8 12.2L4 20l3.9-1.1A8 8 0 1 0 12 4Zm0 1.6a6.4 6.4 0 1 1-3.3 11.9l-.3-.2-2 .6.6-2-.2-.3A6.4 6.4 0 0 1 12 5.6Zm-2.6 3c-.1 0-.4 0-.6.3-.2.2-.7.7-.7 1.7s.7 2 .8 2.1c.1.2 1.5 2.3 3.6 3.1 1.8.7 2.1.6 2.5.5.4 0 1.2-.5 1.4-1 .2-.5.2-.9.1-1l-.6-.3s-1.2-.6-1.4-.7c-.2 0-.3-.1-.5.1l-.6.8c-.1.1-.2.2-.4.1-.2-.1-.9-.4-1.7-1-.6-.6-1-1.2-1.2-1.4-.1-.2 0-.3.1-.4l.3-.4.2-.4v-.3l-.6-1.5c-.2-.4-.3-.3-.5-.4h-.5Z" />
  ),
};

export function SocialIcon({ name, className }: { name: IconKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn('h-[18px] w-[18px]', className)} aria-hidden>
      {paths[name]}
    </svg>
  );
}
