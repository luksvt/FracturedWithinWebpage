import { Instagram, Facebook, Youtube, Music, ExternalLink } from 'lucide-react';

import BandcampIcon from "@/assets/icons/bandcamp-button-circle-line-grey-512.png";

const SocialLinks = () => {
  const socialLinks = [
    {
      name: 'Bandcamp',
      url: 'https://fracturedwithin.bandcamp.com/',
      icon: BandcampIcon,
    },
    // {
    //   name: 'Spotify',
    //   url: 'https://spotify.fracturedwithin',
    //   icon: Music,
    // },
    {
      name: 'Instagram',
      url: 'https://instagram.com/fractured_within',
      icon: Instagram,
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61584607731568',
      icon: Facebook,
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@FracturedWithinMetal',
      icon: Youtube,
    },
  ];

  return (
    <div className="flex justify-center items-center gap-6 py-8 mt-auto">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-all duration-200 hover-scale"
        >
          {typeof link.icon === "string" ? (
            <img src={link.icon} alt={link.name} className="w-8 h-8" />
          ) : (
            <link.icon size={32} />
          )}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;