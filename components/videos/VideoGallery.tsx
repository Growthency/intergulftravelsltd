'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import type { Video } from '@/lib/youtube';
import { youtubeEmbed, youtubeId, youtubeThumb } from '@/lib/youtube';
import { cn } from '@/lib/utils';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/videos';

/** Resolve the 11-char id from the stored column or by parsing the URL. */
function idOf(video: Video): string | null {
  return video.youtube_id || youtubeId(video.youtube_url);
}

export function VideoGallery({ videos }: { videos: Video[] }) {
  const t = getDict(useLocale()).gallery;
  // Only videos we can actually embed.
  const playable = videos.filter((v) => idOf(v));
  const [activeId, setActiveId] = useState<string>(() => playable[0]?.id ?? '');
  // Lite-loading: the iframe is mounted only once the viewer chooses to play.
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  if (playable.length === 0) return null;

  const active = playable.find((v) => v.id === activeId) ?? playable[0];
  const activeYt = idOf(active)!;

  function select(video: Video, autoplay: boolean) {
    setActiveId(video.id);
    setPlaying(autoplay);
    // Bring the player into view on smaller screens / when chosen from the grid.
    playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="space-y-12">
      {/* Featured player + playlist */}
      <div className="grid gap-6 lg:grid-cols-[1.65fr_1fr]">
        {/* Main player */}
        <div ref={playerRef} className="scroll-mt-28">
          <div className="overflow-hidden rounded-3xl bg-brand-900 shadow-soft ring-1 ring-black/5">
            <div className="relative aspect-video w-full">
              {playing ? (
                <iframe
                  key={activeYt}
                  src={`${youtubeEmbed(activeYt)}?autoplay=1&rel=0&modestbranding=1`}
                  title={active.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 h-full w-full"
                  aria-label={`${t.playLabel} ${active.title}`}
                >
                  <Image
                    src={youtubeThumb(activeYt)}
                    alt={active.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-brand-900/10 to-transparent" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-20 w-20 place-items-center rounded-full bg-gold-gradient text-brand-900 shadow-gold transition duration-300 group-hover:scale-110">
                      <Play className="h-9 w-9 translate-x-0.5 fill-current" />
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>
          <div className="mt-5">
            <h2 className="font-display text-2xl font-semibold leading-snug text-ink balance">
              {active.title}
            </h2>
            {active.description && (
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-muted">{active.description}</p>
            )}
          </div>
        </div>

        {/* Playlist */}
        <div className="lg:max-h-[34rem]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            {t.upNext}
          </p>
          <ul className="space-y-2.5 lg:max-h-[31rem] lg:overflow-y-auto lg:pr-1">
            {playable.map((video) => {
              const yt = idOf(video)!;
              const isActive = video.id === active.id;
              return (
                <li key={video.id}>
                  <button
                    type="button"
                    onClick={() => select(video, true)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-2xl border p-2 text-left transition',
                      isActive
                        ? 'border-brand-600/40 bg-brand-50 shadow-soft'
                        : 'border-border bg-card hover:border-brand-600/30 hover:bg-sand-soft',
                    )}
                  >
                    <span className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <Image
                        src={youtubeThumb(yt)}
                        alt={video.title}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                      <span className="absolute inset-0 grid place-items-center bg-brand-900/15">
                        <span
                          className={cn(
                            'grid h-8 w-8 place-items-center rounded-full text-white shadow transition',
                            isActive ? 'bg-gold-500 text-brand-900' : 'bg-black/45',
                          )}
                        >
                          <Play className="h-4 w-4 translate-x-px fill-current" />
                        </span>
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          'line-clamp-2 text-sm font-semibold leading-snug',
                          isActive ? 'text-brand-800' : 'text-ink',
                        )}
                      >
                        {video.title}
                      </span>
                      {isActive && (
                        <span className="mt-1 inline-block text-xs font-medium text-brand-600">
                          {t.nowPlaying}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* All videos grid */}
      {playable.length > 1 && (
        <div>
          <div className="mb-6 flex items-end justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold text-ink">{t.allVideos}</h3>
            <span className="text-sm text-ink-muted">
              {playable.length} {t.videoCount}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {playable.map((video) => {
              const yt = idOf(video)!;
              const isActive = video.id === active.id;
              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => select(video, true)}
                  className="group overflow-hidden rounded-3xl border border-border bg-card text-left shadow-soft transition hover:-translate-y-1 hover:shadow-emerald"
                >
                  <span className="relative block aspect-video overflow-hidden bg-muted">
                    <Image
                      src={youtubeThumb(yt)}
                      alt={video.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-brand-900/55 to-transparent opacity-0 transition group-hover:opacity-100" />
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-brand-700 shadow-soft transition duration-300 group-hover:scale-110 group-hover:bg-gold-gradient group-hover:text-brand-900">
                        <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                      </span>
                    </span>
                    {isActive && (
                      <span className="absolute left-3 top-3 rounded-full bg-gold-gradient px-2.5 py-0.5 text-xs font-semibold text-brand-900 shadow-gold">
                        {t.nowPlaying}
                      </span>
                    )}
                  </span>
                  <span className="block p-4">
                    <span className="line-clamp-2 font-display text-base font-semibold leading-snug text-ink">
                      {video.title}
                    </span>
                    {video.description && (
                      <span className="mt-1.5 line-clamp-2 block text-sm leading-relaxed text-ink-muted">
                        {video.description}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
