import { useEffect, useMemo, useState } from 'react';
import { CalendarPlus, ExternalLink, Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

const getCalendarTitle = (event: BandsintownEvent) =>
  event.title || `${ARTIST_NAME} at ${event.venue.name}`;

const parseLocalDateTime = (datetime: string) => {
  const match = datetime.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/);
  if (!match) return null;

  const [, year, month, day, hour, minute, second = '00'] = match;
  return {
    year: Number(year),
    month: Number(month),
    day: Number(day),
    hour: Number(hour),
    minute: Number(minute),
    second: Number(second),
  };
};

const toCalendarTimestamp = (parts: ReturnType<typeof parseLocalDateTime>) => {
  if (!parts) return null;
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${parts.year}${pad(parts.month)}${pad(parts.day)}T${pad(parts.hour)}${pad(parts.minute)}${pad(parts.second)}`;
};

const addHoursToLocalDateTime = (datetime: string, hours: number) => {
  const parts = parseLocalDateTime(datetime);
  if (!parts) return null;

  const date = new Date(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour + hours,
    parts.minute,
    parts.second,
  );

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
};

const buildGoogleCalendarUrl = (event: BandsintownEvent) => {
  const start = toCalendarTimestamp(parseLocalDateTime(event.datetime));
  const end = toCalendarTimestamp(addHoursToLocalDateTime(event.datetime, 3));
  if (!start || !end) return null;

  const location = [event.venue.name, formatLocation(event.venue)].filter(Boolean).join(', ');
  const details = [event.description, `Event: ${event.url}`].filter(Boolean).join('\n\n');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: getCalendarTitle(event),
    dates: `${start}/${end}`,
    location,
    details,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const escapeIcsText = (value: string) =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');

const downloadIcs = (event: BandsintownEvent) => {
  const start = toCalendarTimestamp(parseLocalDateTime(event.datetime));
  const end = toCalendarTimestamp(addHoursToLocalDateTime(event.datetime, 3));
  if (!start || !end) return;

  const location = [event.venue.name, formatLocation(event.venue)].filter(Boolean).join(', ');
  const description = [event.description, `Event: ${event.url}`].filter(Boolean).join('\n\n');
  const uid = `fractured-within-${event.id}@fracturedwithin.de`;
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Fractured Within//Shows//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeIcsText(getCalendarTitle(event))}`,
    `LOCATION:${escapeIcsText(location)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    `URL:${event.url}`,
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `fractured-within-${event.id}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const Shows = () => {
  const [events, setEvents] = useState<BandsintownEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const endpoint = import.meta.env.DEV
          ? (() => {
              const appId = import.meta.env.VITE_BANDSINTOWN_APP_ID;
              if (!appId) {
                throw new Error(
                  'Missing VITE_BANDSINTOWN_APP_ID. Add it to .env.local for local development.',
                );
              }

              const artist = encodeURIComponent(ARTIST_NAME);
              const params = new URLSearchParams({
                app_id: appId,
                date: 'upcoming',
              });
              return `https://rest.bandsintown.com/artists/${artist}/events?${params.toString()}`;
            })()
          : '/api/shows.php';

        const response = await fetch(endpoint, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Shows API request failed with status ${response.status}`);
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

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            <CalendarPlus className="mr-2 h-4 w-4" aria-hidden="true" />
                            Save to Calendar
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {buildGoogleCalendarUrl(event) && (
                            <DropdownMenuItem asChild>
                              <a
                                href={buildGoogleCalendarUrl(event) ?? '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Google Calendar
                              </a>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onSelect={() => downloadIcs(event)}>
                            Apple Calendar / Outlook (.ics)
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
