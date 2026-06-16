'use client';

import { contact } from '@/lib/site';
import { whatsappLink } from '@/lib/utils';

/**
 * Bottom-left floating WhatsApp button. Real WhatsApp glyph, gentle pulse,
 * opens a chat with the client's number and a friendly prefilled message.
 */
export function WhatsAppFloat() {
  const href = whatsappLink(
    contact.whatsapp,
    "Assalamu alaikum! I'd like to know more about your Hajj / Umrah packages.",
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 left-5 z-50 flex items-center gap-0"
    >
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" />
        <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-red-500" />
        <svg viewBox="0 0 32 32" className="relative h-7 w-7" fill="currentColor" aria-hidden>
          <path d="M16.04 4C9.86 4 4.84 9.02 4.84 15.2c0 2.04.54 3.98 1.56 5.7L4 28l7.3-2.32a11.16 11.16 0 0 0 4.74 1.05h.01c6.18 0 11.2-5.02 11.2-11.2 0-2.99-1.16-5.8-3.27-7.92A11.13 11.13 0 0 0 16.04 4Zm0 2.05c2.43 0 4.71.95 6.43 2.67a9.07 9.07 0 0 1 2.66 6.45c0 5.04-4.1 9.14-9.14 9.14h-.01a9.1 9.1 0 0 1-4.64-1.27l-.33-.2-3.45 1.1 1.12-3.37-.22-.35a9.06 9.06 0 0 1-1.4-4.86c0-5.04 4.1-9.14 9.13-9.14Zm-5.22 5.04c-.25 0-.65.09-.99.46-.34.37-1.3 1.27-1.3 3.1 0 1.82 1.33 3.58 1.51 3.83.19.25 2.6 3.97 6.32 5.42 3.09 1.2 3.72.96 4.39.9.67-.06 2.17-.89 2.47-1.74.3-.86.3-1.59.21-1.74-.09-.16-.34-.25-.71-.43-.37-.19-2.17-1.07-2.51-1.2-.34-.12-.59-.18-.83.19-.25.37-.95 1.2-1.16 1.44-.21.25-.43.28-.8.09-.37-.19-1.55-.57-2.96-1.82-1.09-.98-1.83-2.18-2.04-2.55-.21-.37-.02-.57.16-.76.17-.17.37-.43.56-.65.18-.22.24-.37.37-.62.12-.25.06-.46-.03-.65-.09-.18-.83-2.01-1.16-2.75-.31-.71-.62-.62-.83-.62l-.7-.01Z" />
        </svg>
      </span>
      <span className="pointer-events-none ml-3 hidden whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-soft transition-all duration-300 group-hover:opacity-100 md:block">
        Chat with us
      </span>
    </a>
  );
}
