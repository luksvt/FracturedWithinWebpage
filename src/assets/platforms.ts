// src/assets/platforms.ts
import BandcampIcon from "@/assets/icons/bandcamp-button-circle-line-grey-512.png";
import QobuzIcon from "@/assets/icons/qobuz.png";       // <- falls du eins anlegst
import DeezerIcon from "@/assets/icons/deezer.png";
import ShazamIcon from "@/assets/icons/shazam.png";

export type PlatformId =
    | "spotify"
    | "appleMusic"
    | "youtube"
    | "youtubeMusic"
    | "soundcloud"
    | "bandcamp"
    | "amazonMusic"
    | "itunes"
    | "deezer"
    | "tidal"
    | "qobuz"
    | "pandora"
    | "amazon"
    | "shazam"
    | "tiktok";



export type Platform = {
  id: PlatformId;
  label: string;
  iconKey?: string;   // react-icons key
  iconSrc?: string;   // imported asset
};

export const PLATFORMS: Platform[] = [
  // 🔥 Core streaming (highest conversion)
  { id: "spotify", label: "Spotify", iconKey: "FaSpotify" },
  { id: "appleMusic", label: "Apple Music", iconKey: "SiApplemusic" },
  { id: "youtube", label: "YouTube", iconKey: "FaYoutube" },
  { id: "youtubeMusic", label: "YouTube Music", iconKey: "SiYoutubemusic" },
  { id: "soundcloud", label: "SoundCloud", iconKey: "FaSoundcloud" },

  // 💎 Support / direct fan revenue
  { id: "bandcamp", label: "Bandcamp", iconSrc: BandcampIcon },

  // 📦 Big additional ecosystems
  { id: "amazonMusic", label: "Amazon Music", iconKey: "SiAmazonmusic" },
  { id: "itunes", label: "iTunes", iconKey: "FaApple" },

  // 🌍 Europe / secondary streaming
  { id: "deezer", label: "Deezer", iconSrc: DeezerIcon },

  // 🎧 HiFi / audiophile
  { id: "tidal", label: "TIDAL", iconKey: "SiTidal" },
  { id: "qobuz", label: "Qobuz", iconSrc: QobuzIcon },

  // 🇺🇸 US niche
  { id: "pandora", label: "Pandora", iconKey: "SiPandora" },

  // 🛒 Purchase / store link (optional but okay)
  { id: "amazon", label: "Amazon", iconKey: "FaAmazon" },

  // 🔎 Discovery / identification (best at the end)
  { id: "shazam", label: "Shazam", iconSrc: ShazamIcon },
  { id: "tiktok", label: "TikTok", iconKey: "FaTiktok" },
];

