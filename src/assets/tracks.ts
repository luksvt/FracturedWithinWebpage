// src/assets/tracks.ts
import type { PlatformId } from "@/assets/platforms";

export type Track = {
  id: string;
  title: string;
  releaseDate: string;   // "YYYY-MM-DD"
  badge?: string;        // "OUT NOW"
  subtitle?: string;
  soundcloudEmbed?: string;
  links: Partial<Record<PlatformId, string>>;
};

export const TRACKS: Track[] = [
  {
    id: "messiah",
    title: "MESSIAH",
    releaseDate: "2025-12-15",
    badge: "OUT NOW",
    subtitle: "Stream it everywhere & support the release",
    soundcloudEmbed:
      "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2229864533&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
    links: {
      spotify: "https://open.spotify.com/intl-de/track/4VyqidpgVYy9esR2QLAUAt?si=f80ca31b267b4b34",
      appleMusic: "https://music.apple.com/us/song/messiah/1892018395",
      itunes: "",
      youtube: "https://youtu.be/RcnMWgFXk4U?si=-0tgp5OSsarZOcCh",
      youtubeMusic: "https://music.youtube.com/watch?v=RcnMWgFXk4U&si=RozwRIVTdMAD2y-X",
      soundcloud: "https://soundcloud.com/fractured-within/messiah",
      bandcamp: "https://fracturedwithin.bandcamp.com/track/messiah",
      deezer: "https://link.deezer.com/s/32We8H2lrp51JJRcKuGDa",
      qobuz: "",
      tidal: "https://tidal.com/track/513948248/u",
      amazonMusic: "https://amazon.de/music/player/tracks/B0GWFRDN1W?marketplaceId=A1PA6795UKMFR9&musicTerritory=DE&ref=dm_sh_thNV7xKRXluMlTQIJFPHsxloc",
      amazon: "",
      pandora: "",
      tiktok: "", // oder Sound-Link
      shazam: "https://www.shazam.com/song/1892018395/messiah"
    },
  },
    {
    id: "possessed",
    title: "POSSESSED",
    releaseDate: "2026-02-01",
    badge: "OUT NOW",
    subtitle: "Stream it everywhere & support the release",
    soundcloudEmbed:
      "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2258807288&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
    links: {
      spotify: "https://open.spotify.com/intl-de/track/0WKlO4fEVArD1jNeszGVgt?si=ca6941d2d9794dac",
      appleMusic: "https://music.apple.com/us/album/possessed-single/1891902069",
      itunes: "",
      youtube: "https://youtu.be/s1vRmehbwXU?si=7edj0rMsJ43KK-WH",
      youtubeMusic: "https://music.youtube.com/watch?v=s1vRmehbwXU&si=yyzSeOtNd56zueQZ",
      soundcloud: "https://soundcloud.com/fractured-within/possessed",
      bandcamp: "https://fracturedwithin.bandcamp.com/track/possessed",
      deezer: "https://link.deezer.com/s/32We9dCUnnfxsHEccR784",
      qobuz: "",
      tidal: "https://tidal.com/track/514061941/u",
      amazonMusic: "https://amazon.de/music/player/tracks/B0GWGP491W?marketplaceId=A1PA6795UKMFR9&musicTerritory=DE&ref=dm_sh_0gVkDGdoAWgPfgIjGz8iXi4cD",
      amazon: "",
      pandora: "",
      tiktok: "", // oder Sound-Link
      shazam: "https://www.shazam.com/song/1891902070/possessed"
    },
  },
];
