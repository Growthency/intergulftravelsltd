'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Landmark, Moon, Users, GraduationCap, Mountain, Plane, MapPin, Building2 } from 'lucide-react';
import Image from 'next/image';
import type { GalleryImage } from '@/lib/gallery';
import { blurFor } from '@/lib/blur';
import { cn } from '@/lib/utils';

type Category = 'makkah' | 'madinah' | 'pilgrims' | 'training' | 'ziyarat' | 'tours';

type Tile = {
  caption: string;
  location: string;
  category: Category;
  icon: 'kaaba' | 'mosque' | 'pilgrims' | 'training' | 'mountain' | 'plane' | 'pin' | 'city';
  tone: string;
  span?: boolean; // taller tile for masonry variety
  image?: string; // real photo (WebP) — overrides the gradient tile
  aspect?: string; // tailwind aspect class override
  fit?: 'cover' | 'contain';
};

const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All moments' },
  { id: 'makkah', label: 'Makkah' },
  { id: 'madinah', label: 'Madinah' },
  { id: 'pilgrims', label: 'Our Pilgrims' },
  { id: 'ziyarat', label: 'Ziyarat' },
  { id: 'training', label: 'Training & Events' },
  { id: 'tours', label: 'Tours' },
];

const iconMap = {
  kaaba: Landmark,
  mosque: Moon,
  pilgrims: Users,
  training: GraduationCap,
  mountain: Mountain,
  plane: Plane,
  pin: MapPin,
  city: Building2,
};

const tiles: Tile[] = [
  {
    caption: 'Our Hajj pilgrims before the Holy Kaaba',
    location: 'Masjid al-Haram, Makkah',
    category: 'pilgrims',
    icon: 'pilgrims',
    tone: '',
    image: '/gallery/pilgrims-haram.webp',
    aspect: 'aspect-[4/3]',
    span: true,
  },
  {
    caption: 'Inter Gulf Hajj group at the Haram',
    location: 'Masjid al-Haram, Makkah',
    category: 'makkah',
    icon: 'kaaba',
    tone: '',
    image: '/gallery/group-haram.webp',
    aspect: 'aspect-[16/10]',
  },
  {
    caption: 'Handing over travel documents to our Hujjaj',
    location: 'Inter Gulf Office, Purana Paltan, Dhaka',
    category: 'training',
    icon: 'training',
    tone: '',
    image: '/gallery/office-handover.webp',
    aspect: 'aspect-[4/3]',
  },
  {
    caption: 'Hajj 2027 — pre-registration now open',
    location: 'Inter Gulf Travels Ltd · License No. 071',
    category: 'training',
    icon: 'training',
    tone: '',
    image: '/gallery/hajj-2027-mokbul.webp',
    fit: 'contain',
    aspect: 'aspect-[3/4]',
    span: true,
  },
  {
    caption: 'Tawaf at the Holy Kaaba',
    location: 'Masjid al-Haram, Makkah',
    category: 'makkah',
    icon: 'kaaba',
    tone: 'from-brand-700 via-brand-800 to-brand-950',
    span: true,
  },
  {
    caption: 'Masjid an-Nabawi at dawn',
    location: 'Madinah al-Munawwarah',
    category: 'madinah',
    icon: 'mosque',
    tone: 'from-gold-600 via-gold-700 to-brand-900',
  },
  {
    caption: 'Our pilgrims in Mina',
    location: 'Tent City, Mina',
    category: 'pilgrims',
    icon: 'pilgrims',
    tone: 'from-brand-600 via-brand-700 to-brand-900',
  },
  {
    caption: 'Pre-Hajj training workshop',
    location: 'Inter Gulf Office, Dhaka',
    category: 'training',
    icon: 'training',
    tone: 'from-brand-800 via-brand-900 to-gold-800',
    span: true,
  },
  {
    caption: 'Jabal al-Rahmah, Arafah',
    location: 'Mount of Mercy, Arafah',
    category: 'ziyarat',
    icon: 'mountain',
    tone: 'from-amber-600 via-gold-700 to-brand-900',
  },
  {
    caption: 'Praying at the Rawdah',
    location: "The Prophet's Mosque, Madinah",
    category: 'madinah',
    icon: 'mosque',
    tone: 'from-emerald-600 via-brand-700 to-brand-950',
  },
  {
    caption: 'Group departure from Dhaka',
    location: 'Hazrat Shahjalal Intl. Airport',
    category: 'pilgrims',
    icon: 'plane',
    tone: 'from-sky-700 via-brand-800 to-brand-950',
  },
  {
    caption: 'The Clock Tower, Makkah',
    location: 'Abraj Al-Bait, Makkah',
    category: 'makkah',
    icon: 'city',
    tone: 'from-brand-700 via-gold-700 to-brand-900',
    span: true,
  },
  {
    caption: 'Sa’i between Safa & Marwah',
    location: 'Masa’a, Masjid al-Haram',
    category: 'ziyarat',
    icon: 'kaaba',
    tone: 'from-brand-600 via-brand-800 to-brand-950',
  },
  {
    caption: 'Quba Mosque visit',
    location: 'Masjid Quba, Madinah',
    category: 'ziyarat',
    icon: 'mosque',
    tone: 'from-teal-600 via-brand-700 to-brand-950',
  },
  {
    caption: 'Hajj orientation seminar',
    location: 'Purana Paltan, Dhaka',
    category: 'training',
    icon: 'training',
    tone: 'from-brand-700 via-brand-800 to-gold-700',
  },
  {
    caption: 'Umrah group of 2024',
    location: 'Makkah al-Mukarramah',
    category: 'pilgrims',
    icon: 'pilgrims',
    tone: 'from-gold-600 via-brand-700 to-brand-950',
  },
  {
    caption: 'Burj Khalifa, evening',
    location: 'Dubai, UAE — Tour',
    category: 'tours',
    icon: 'city',
    tone: 'from-amber-500 via-gold-600 to-brand-900',
  },
  {
    caption: 'Shikara on Dal Lake',
    location: 'Srinagar, Kashmir — Tour',
    category: 'tours',
    icon: 'pin',
    tone: 'from-sky-600 via-brand-600 to-brand-900',
    span: true,
  },
  {
    caption: 'Stoning the Jamarat',
    location: 'Jamarat Bridge, Mina',
    category: 'ziyarat',
    icon: 'mountain',
    tone: 'from-brand-700 via-brand-900 to-brand-950',
  },
  {
    caption: 'Cappadocia balloons, sunrise',
    location: 'Türkiye — Tour',
    category: 'tours',
    icon: 'pin',
    tone: 'from-rose-600 via-gold-700 to-brand-900',
  },
  {
    caption: 'Document & visa briefing',
    location: 'Inter Gulf Office, Dhaka',
    category: 'training',
    icon: 'training',
    tone: 'from-brand-800 via-brand-900 to-brand-950',
  },
  {
    caption: 'Madinah dates market',
    location: 'Madinah al-Munawwarah',
    category: 'madinah',
    icon: 'pin',
    tone: 'from-gold-600 via-gold-800 to-brand-900',
  },
];

const CATEGORY_MAP: Record<string, Category> = {
  hajj: 'pilgrims',
  umrah: 'makkah',
  makkah: 'makkah',
  mecca: 'makkah',
  madinah: 'madinah',
  medina: 'madinah',
  pilgrims: 'pilgrims',
  training: 'training',
  events: 'training',
  ziyarat: 'ziyarat',
  tours: 'tours',
  tour: 'tours',
};

/** Turn an admin-uploaded gallery row into a real-photo tile. */
function dbToTile(g: GalleryImage): Tile {
  const key = (g.category ?? '').toLowerCase().trim();
  const category = CATEGORY_MAP[key] ?? 'pilgrims';
  const label = g.category ? g.category.charAt(0).toUpperCase() + g.category.slice(1) : 'Inter Gulf Travels';
  return {
    caption: g.title,
    location: label,
    category,
    icon: 'pilgrims',
    tone: '',
    image: g.url,
    aspect: 'aspect-[4/3]',
  };
}

export function GalleryGrid({ extra = [] }: { extra?: GalleryImage[] }) {
  const [active, setActive] = useState<Category | 'all'>('all');

  // Admin-curated DB images first, then the built-in curated tiles.
  const allTiles = useMemo(() => [...extra.map(dbToTile), ...tiles], [extra]);

  const visible = useMemo(
    () => (active === 'all' ? allTiles : allTiles.filter((t) => t.category === active)),
    [active, allTiles],
  );

  return (
    <div>
      {/* Filter chips */}
      <div className="mb-10 flex flex-wrap justify-center gap-2.5">
        {categories.map((c) => {
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              aria-pressed={isActive}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300',
                isActive
                  ? 'border-brand-600 bg-brand-600 text-white shadow-emerald'
                  : 'border-border bg-card text-ink-muted hover:border-brand-600/40 hover:text-brand-700 dark:hover:text-brand-200',
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Masonry grid */}
      <motion.div layout className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        <AnimatePresence mode="popLayout">
          {visible.map((tile) => {
            const Glyph = iconMap[tile.icon];
            return (
              <motion.figure
                key={tile.caption}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group relative block break-inside-avoid overflow-hidden rounded-3xl border border-border shadow-soft"
              >
                <div
                  className={cn(
                    'relative w-full',
                    tile.aspect ?? (tile.span ? 'aspect-[4/5]' : 'aspect-[4/3]'),
                    tile.image ? 'bg-brand-950' : cn('bg-gradient-to-br', tile.tone),
                  )}
                >
                  {tile.image ? (
                    <Image
                      src={tile.image}
                      alt={tile.caption}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder={blurFor(tile.image) ? 'blur' : 'empty'}
                      blurDataURL={blurFor(tile.image)}
                      className={cn(
                        'transition-transform duration-500 group-hover:scale-105',
                        tile.fit === 'contain' ? 'object-contain' : 'object-cover',
                      )}
                    />
                  ) : (
                    <>
                      {/* Decorative vector texture */}
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30"
                        style={{
                          backgroundImage:
                            'radial-gradient(circle at 22% 28%, rgba(255,255,255,0.5) 0, transparent 35%), radial-gradient(circle at 82% 78%, rgba(255,255,255,0.3) 0, transparent 40%)',
                        }}
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-[0.12]"
                        style={{
                          backgroundImage:
                            'linear-gradient(30deg,#fff 1px,transparent 1px),linear-gradient(-30deg,#fff 1px,transparent 1px)',
                          backgroundSize: '30px 30px',
                        }}
                      />
                      {/* Centerpiece glyph */}
                      <div className="absolute inset-0 grid place-items-center">
                        <span className="grid h-20 w-20 place-items-center rounded-3xl bg-white/12 text-white/90 ring-1 ring-white/20 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                          <Glyph className="h-9 w-9" />
                        </span>
                      </div>
                    </>
                  )}
                  {/* Caption gradient */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 pt-12">
                    <figcaption className="font-display text-lg font-semibold leading-tight text-white drop-shadow-sm">
                      {tile.caption}
                    </figcaption>
                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-white/80">
                      <MapPin className="h-3 w-3" /> {tile.location}
                    </p>
                  </div>
                </div>
              </motion.figure>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-ink-muted">No moments in this category yet — check back soon.</p>
      )}
    </div>
  );
}
