import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const partners = [
  {
    name: 'Fractured Studios',
    href: 'https://fracturedstudios.de/',
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/70 bg-background">
      <div className="w-full max-w-[1400px] mx-auto px-6 py-8 md:px-8">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Partners
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {partners.map((partner) => (
                <a
                  key={partner.href}
                  href={partner.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  {partner.name}
                  <ExternalLink className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 text-left md:items-end md:text-right">
            <Link
              to="/impressum"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Impressum
            </Link>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Fractured Within
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
