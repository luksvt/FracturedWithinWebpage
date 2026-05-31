import Navigation from "@/components/Navigation";
import SocialLinks from "@/components/SocialLinks";

import Wallpaper from "@/assets/Wallpaper3_fullhd.png";
import MessiahArtwork from "@/assets/Messiah_artwork.jpeg";
import PossessedArtwork from "@/assets/FracturedWithin_Possessed_Cover.jpg";
import LeftfordeadArtwork from "@/assets/FracturedWithin_LeftForDead_Cover.jpg";

import { ListenNowCard } from "@/components/ListenNowCard";
import { ReleaseCard } from "@/components/ReleaseCard";
import { VideoCard } from "@/components/VideoCard";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-12 flex-1 flex flex-col">
        {/* Hero */}
        <div className="text-center mb-16 flex justify-center">
          <div className="relative w-full max-w-7xl">
            <img
              src={Wallpaper}
              alt="FracturedWithin logo"
              className="w-full h-auto mb-6 rounded-lg shadow-lg"
            />
          </div>
        </div>

        <ListenNowCard trackId="leftfordead" />

        <ReleaseCard
          dateLabel="15.05.26"
          title="LEFT FOR DEAD"
          releaseDateText="May 31, 2026"
          countdownDate="2026-05-31T00:00:00"
          presaveUrl="https://distrokid.com/hyperfollow/fracturedwithin1/left-for-dead"
          artwork={LeftfordeadArtwork}
        />

        <VideoCard
        dateLabel="26.03.26"
        title="Messiah Lyric Video"
        subtitle="Watch the official lyric video now."
        embedUrl="https://www.youtube.com/embed/WiG6m5aOY1w"
        />

        <ListenNowCard trackId="possessed" />

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

        <div className="mt-20">
          <SocialLinks />
        </div>
      </main>
    </div>
  );
};

export default Home;