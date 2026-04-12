import type React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TRACKS } from "@/assets/tracks";
import { PLATFORMS } from "@/assets/platforms";

import {
  FaSpotify,
  FaYoutube,
  FaSoundcloud,
  FaBandcamp,
  FaAmazon,
  FaApple,
  FaTiktok
} from "react-icons/fa";

import {
  SiTidal,
  SiPandora,
  SiApplemusic,
  SiAmazonmusic,
  SiYoutubemusic
} from "react-icons/si";

const ICONS: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  FaSpotify,
  FaYoutube,
  FaSoundcloud,
  FaBandcamp,
  FaAmazon,
  FaApple,
  SiTidal,
  SiPandora,
  SiApplemusic,
  SiAmazonmusic,
  SiYoutubemusic,
  FaTiktok
};

const formatDate = (yyyyMmDd: string) => {
  const [y, m, d] = yyyyMmDd.split("-");
  return `${d}.${m}.${y.slice(2)}`;
};

export function ListenNowCard({ trackId }: { trackId: string }) {
  const track = TRACKS.find((t) => t.id === trackId);
  if (!track) return null;

  const platforms = PLATFORMS.filter((p) => !!track.links?.[p.id]).map((p) => ({
    platform: p,
    url: track.links[p.id]!,
  }));

  return (
    <>
      <div className="text-center mb-6">
        <p className="text-2xl font-semibold text-foreground">
          {formatDate(track.releaseDate)}
        </p>
      </div>

      <section className="w-full max-w-4xl mx-auto mb-16">
        <Card className="overflow-hidden bg-card/80 border border-primary/40 shadow-xl">
          <CardHeader className="text-center space-y-3 py-10">
            {track.badge && (
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-5 py-1.5 text-sm md:text-base font-medium uppercase tracking-[0.25em] text-emerald-400 mx-auto">
                <span>{track.badge}</span>
              </div>
            )}

            <CardTitle   
                className="
                    font-messiah
                    text-3xl tracking-[0.2em]
                    sm:text-4xl sm:tracking-[0.25em]
                    md:text-6xl md:tracking-[0.35em]
                    uppercase
                    text-foreground
                    drop-shadow-[0_0_18px_rgba(0,0,0,0.8)]
                "
                >
              {track.title}
            </CardTitle>

            {track.subtitle && (
              <CardDescription className="text-base md:text-lg text-foreground/80">
                {track.subtitle}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="pb-10">
            {/* Platforms */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
              {platforms.map(({ platform, url }) => {
                const Icon = platform.iconKey ? ICONS[platform.iconKey] : null;

                return (
                  <a
                    key={platform.id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 transition-all hover:bg-black/60 hover:border-primary/40 hover:shadow-lg hover:-translate-y-[1px]"
                  >
                    {Icon ? (
                      <Icon size={28} className="text-foreground/80 group-hover:text-foreground" />
                    ) : (
                      <img
                        src={platform.iconSrc}
                        alt={platform.label}
                        className="w-7 h-7 object-contain opacity-80 group-hover:opacity-100"
                      />
                    )}

                    <div className="flex flex-col leading-tight">
                      <span className="text-sm md:text-base font-semibold text-foreground">
                        {platform.label}
                      </span>
                      <span className="text-xs text-foreground/60">
                        Open ↗
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* SoundCloud */}
            {track.soundcloudEmbed && (
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <iframe
                  title={track.title}
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={track.soundcloudEmbed}
                />
              </div>
            )}

            <p className="mt-6 text-center text-base md:text-lg font-semibold text-foreground/80">
              Add it to your playlist &amp; share it 🤘
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}