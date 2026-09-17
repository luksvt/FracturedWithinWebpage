import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Seo from '@/components/Seo';
import SocialLinks from '@/components/SocialLinks';

interface BandsintownOffer {
  type?: string;
  url: string;
  status?: string;
}

interface BandsintownVenue {
  name: string;
  city?: string;
  region?: string;
  country?: string;
  type?: string;
}

interface BandsintownEvent {
  id: string;
  artist_id?: string;
  url: string;
  datetime: string;
  title?: string;
  description?: string;
  lineup?: string[];
  venue: BandsintownVenue;
  offers?: BandsintownOffer[];
}

const ARTIST_NAME = 'Fractured Within';
const BANDSINTOWN_APP_ID = import.meta.env.VITE_BANDSINTOWN_APP_ID?.trim();

const buildBandsintownUrl = (eventUrl: string, trigger: 'rsvp_going' | 'notify_me') => {
  const separator = eventUrl.includes('?') ? '&' : '?';
  return `${eventUrl}${separator}trigger=${trigger}`;
};

const getTicketOffer = (event: BandsintownEvent) =>
  event.offers?.find((offer) => {
    const isTicket = !offer.type || offer.type.toLowerCase().includes('ticket');
    const isUnavailable = offer.status?.toLowerCase() === 'unavailable';
    return isTicket && !isUnavailable && Boolean(offer.url);
  });

const formatEventDate = (datetime: string) => {
  // Bandsintown returns the venue-local date/time. Parsing only the date portion
  // avoids an accidental day shift when the visitor is in another timezone.
  const [datePart] = datetime.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return {
    day: new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date),
    month: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date).toUpperCase(),
    full: new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date),
  };
};

const formatLocation = (venue: BandsintownVenue) =>
  [venue.city, venue.region, venue.country].filter(Boolean).join(', ');

const Shows = () => {
  const [events, setEvents] = useState<BandsintownEvent[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(BANDSINTOWN_APP_ID));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!BANDSINTOWN_APP_ID) {
      setError('Bandsintown is not configured yet.');
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const loadEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const artist = encodeURIComponent(ARTIST_NAME);
        const appId = encodeURIComponent(BANDSINTOWN_APP_ID);
        const response = await fetch(
          `https://rest.bandsintown.com/artists/${artist}/events?app_id=${appId}&date=upcoming`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`Bandsintown request failed with status ${response.status}`);
        }

        const data: unknown = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Bandsintown returned an unexpected response.');
        }

        setEvents(data as BandsintownEvent[]);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        console.error('Could not load Bandsintown events:', err);
        setError('Shows are temporarily unavailable. Please check Bandsintown for the latest dates.');
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    loadEvents();
    return () => controller.abort();
  }, []);

  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => a.datetime.localeCompare(b.datetime)),
    [events],
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="Shows"
        path="/shows"
        description="Upcoming Fractured Within live shows and tour dates. Find venues, dates and ticket links."
      />
      <Navigation />

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Shows</h1>
          <p className="text-muted-foreground">Upcoming live dates. See you in the pit.</p>
        </div>

        <section className="w-full max-w-5xl mx-auto" aria-live="polite">
          {isLoading && (
            <div className="flex items-center justify-center gap-3 py-16 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              <span>Loading shows…</span>
            </div>
          )}

          {!isLoading && error && (
            <div className="border border-border rounded-lg p-8 text-center">
              <p className="text-muted-foreground mb-5">{error}</p>
              <Button asChild variant="outline">
                <a
                  href={`https://www.bandsintown.com/a/search?query=${encodeURIComponent(ARTIST_NAME)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Bandsintown
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          )}

          {!isLoading && !error && sortedEvents.length === 0 && (
            <div className="border border-border rounded-lg p-10 text-center">
              <h2 className="text-xl font-semibold mb-2">No upcoming shows announced</h2>
              <p className="text-muted-foreground">New dates will appear here automatically.</p>
            </div>
          )}

          {!isLoading && !error && sortedEvents.length > 0 && (
            <div className="divide-y divide-border border-y border-border">
              {sortedEvents.map((event) => {
                const date = formatEventDate(event.datetime);
                const location = formatLocation(event.venue);
                const ticketOffer = getTicketOffer(event);
                const actionUrl = ticketOffer?.url ?? buildBandsintownUrl(event.url, 'notify_me');
                const actionLabel = ticketOffer ? 'Tickets' : 'Notify Me';
                const lineup = event.lineup?.filter((artist) => artist !== ARTIST_NAME) ?? [];

                return (
                  <article
                    key={event.id}
                    className="grid gap-5 py-7 md:grid-cols-[90px_minmax(0,1fr)_auto] md:items-center"
                  >
                    <div className="flex md:block items-baseline gap-2 md:text-center">
                      <div className="text-3xl font-bold leading-none">{date.day}</div>
                      <div className="text-sm font-semibold tracking-[0.18em] text-muted-foreground mt-1">
                        {date.month}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p className="sr-only">{date.full}</p>
                      <h2 className="text-xl font-semibold text-foreground">
                        {event.title || event.venue.name}
                      </h2>

                      {event.title && event.venue.name && (
                        <p className="mt-1 text-foreground/90">{event.venue.name}</p>
                      )}

                      {location && (
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                          {location}
                        </p>
                      )}

                      {lineup.length > 0 && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          with {lineup.join(', ')}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 md:justify-end">
                      <Button asChild>
                        <a href={actionUrl} target="_blank" rel="noopener noreferrer">
                          {actionLabel}
                          <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                        </a>
                      </Button>

                      <Button asChild variant="outline">
                        <a href={event.url} target="_blank" rel="noopener noreferrer">
                          Event
                        </a>
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <div className="mt-20">
          <SocialLinks />
        </div>
      </main>
    </div>
  );
};

export default Shows;
