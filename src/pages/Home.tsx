import { useState } from "react";
import Navigation from "@/components/Navigation";
import SocialLinks from "@/components/SocialLinks";
import Seo from "@/components/Seo";
import { ChevronDown, ChevronUp } from "lucide-react";

import Wordmark from "@/assets/FracturedWithin_Logo_4C.svg";
import MessiahArtwork from "@/assets/Messiah_artwork.jpeg";
import PossessedArtwork from "@/assets/optimized/possessed.webp";
import LeftForDeadArtwork from "@/assets/optimized/left-for-dead.webp";

import { ListenNowCard } from "@/components/ListenNowCard";
import { ReleaseCard } from "@/components/ReleaseCard";
import { VideoCard } from "@/components/VideoCard";

const Home = () => {
  const [showOlderPosts, setShowOlderPosts] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo description="Fractured Within are a modern metal band from NRW, Germany. Listen to the latest releases, watch videos, find live dates and official merch." />
      <Navigation />

      <main className="container mx-auto px-4 pb-16 flex-1">
        <section className="relative flex min-h-[46vh] items-center justify-center overflow-hidden py-14 sm:min-h-[56vh]">
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-3xl" />
          <img
            src={Wordmark}
            alt="Fractured Within"
            className="relative z-10 w-full max-w-[620px] px-8 drop-shadow-[0_18px_45px_rgba(0,0,0,0.9)] sm:px-12"
          />
        </section>

        <div className="border-t border-white/10 pt-12">
          <ListenNowCard trackId="leftfordead" />

          <ReleaseCard
            dateLabel="15.05.26"
            title="LEFT FOR DEAD"
            releaseDateText="May 31, 2026"
            countdownDate="2026-05-31T00:00:00"
            presaveUrl="https://distrokid.com/hyperfollow/fracturedwithin1/left-for-dead"
            artwork={LeftForDeadArtwork}
          />

          <VideoCard
            dateLabel="26.03.26"
            title="Messiah Lyric Video"
            subtitle="Watch the official lyric video now."
            embedUrl="https://www.youtube.com/embed/WiG6m5aOY1w"
          />

          <ListenNowCard trackId="possessed" />

          {showOlderPosts && (
            <>
              <ReleaseCard
                dateLabel="08.01.26"
                title="POSSESSED"
                releaseDateText="February 01, 2026"
                countdownDate="2026-02-01T00:00:00"
                presaveUrl="https://distrokid.com/hyperfollow/fracturedwithin1/possessed"
                artwork={PossessedArtwork}
              />

              <ListenNowCard trackId="messiah" />

              <ReleaseCard
                dateLabel="01.12.25"
                title="MESSIAH"
                releaseDateText="December 15, 2025"
                countdownDate="2025-12-15T00:00:00"
                presaveUrl="https://distrokid.com/hyperfollow/fracturedwithin1/messiah"
                artwork={MessiahArtwork}
              />

              <VideoCard
                dateLabel="07.09.24"
                title="Left For Dead"
                subtitle="Live at BoMitRock."
                embedUrl="https://www.youtube.com/embed/QHVH-gsfR60"
              />
            </>
          )}

          <div className="flex justify-center py-2">
            <button
              type="button"
              onClick={() => setShowOlderPosts((value) => !value)}
              className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/45 hover:text-white"
              aria-expanded={showOlderPosts}
            >
              {showOlderPosts ? (
                <>
                  Hide older posts
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show older posts
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-12">
          <SocialLinks />
        </div>
      </main>
    </div>
  );
};

export default Home;
