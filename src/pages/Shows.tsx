import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import Footer from '@/components/Footer';
import SocialLinks from '@/components/SocialLinks';
import Navigation from '@/components/Navigation';
interface Tour {
  id: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  ticketUrl?: string;
  soldOut?: boolean;
  upcoming: boolean;
}
const Shows = () => {
  // Sample tour data - easily maintainable
  const tours: Tour[] = [
    
  //   {
  //   id: '1',
  //   date: '2024-03-15',
  //   venue: 'Madison Square Garden',
  //   city: 'New York',
  //   country: 'USA',
  //   ticketUrl: 'https://example.com/tickets',
  //   upcoming: true
  // }, 
  // {
  //   id: '2',
  //   date: '2024-03-18',
  //   venue: 'The Forum',
  //   city: 'Los Angeles',
  //   country: 'USA',
  //   ticketUrl: 'https://example.com/tickets',
  //   upcoming: true
  // }, {
  //   id: '3',
  //   date: '2024-03-22',
  //   venue: 'O2 Arena',
  //   city: 'London',
  //   country: 'UK',
  //   soldOut: true,
  //   upcoming: true
  // }, {
  //   id: '4',
  //   date: '2024-03-25',
  //   venue: 'Olympiastadion',
  //   city: 'Berlin',
  //   country: 'Germany',
  //   ticketUrl: 'https://example.com/tickets',
  //   upcoming: true
  // }, {
  //   id: '5',
  //   date: '2024-02-10',
  //   venue: 'Sydney Opera House',
  //   city: 'Sydney',
  //   country: 'Australia',
  //   upcoming: false
  // }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const upcomingTours = tours.filter(tour => tour.upcoming);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 flex-1 flex flex-col">
        <div className="text-center mb-12">
          {/* <Calendar className="w-16 h-16 mx-auto mb-6 text-primary" /> */}
          <h1 className="text-4xl font-bold text-foreground mb-4">Shows</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {/* Join us on our journey around the world. Get your tickets now! */}
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Upcoming Shows</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-foreground font-semibold">Date</th>
                  <th className="text-left py-4 px-4 text-foreground font-semibold">Venue</th>
                  <th className="text-left py-4 px-4 text-foreground font-semibold">Location</th>
                  <th className="text-left py-4 px-4 text-foreground font-semibold">Status</th>
                  <th className="text-left py-4 px-4 text-foreground font-semibold">Tickets</th>
                </tr>
              </thead>
              <tbody>
                {upcomingTours.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-10 text-center text-xl text-muted-foreground"
                    >
                      To be announced
                    </td>
                  </tr>
                ) : (
                  upcomingTours.map(tour => (
                    <tr
                      key={tour.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4 px-4 text-foreground">
                        {formatDate(tour.date)}
                      </td>
                      <td className="py-4 px-4 text-foreground font-medium">
                        {tour.venue}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {tour.city}, {tour.country}
                      </td>
                      <td className="py-4 px-4">
                        {tour.soldOut ? (
                          <Badge variant="destructive">Sold Out</Badge>
                        ) : (
                          <Badge variant="secondary">Available</Badge>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {tour.ticketUrl && !tour.soldOut ? (
                          <Button asChild size="sm">
                            <a
                              href={tour.ticketUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink size={14} className="mr-1" />
                              Get Tickets
                            </a>
                          </Button>
                        ) : (
                          <Button disabled size="sm">
                            {tour.soldOut ? "Sold Out" : "Coming Soon"}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>
      
        {/* Social Media Links */}
        <div className="mt-20">
          <SocialLinks />
        </div>
      </main>
    </div>
  );
};
export default Shows;